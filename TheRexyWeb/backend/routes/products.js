import express from 'express';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Image from '../models/Image.js';
import Chat from '../models/Chat.js';

const router = express.Router();

// Configuración de almacenamiento para imágenes y PDFs
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Guardar imágenes en uploads/images y PDFs en uploads/pdfs
    const ext = path.extname(file.originalname).toLowerCase();
    let folder = 'uploads/others';
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
      folder = 'uploads/images';
    } else if (['.pdf'].includes(ext)) {
      folder = 'uploads/pdfs';
    }
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB máximo
  fileFilter: (req, file, cb) => {
    // Permitir cualquier tipo de archivo
    cb(null, true);
  }
});

// Configuración de almacenamiento en memoria para imágenes privadas en MongoDB
const memoryUpload = multer({ storage: multer.memoryStorage() });

// RUTAS FIJAS PRIMERO
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Rutas de productos funcionando correctamente'
  });
});

router.get('/search', async (req, res) => {
  try {
    const { q, countryCode, state, city, limit = 20, offset = 0 } = req.query;
    
    if (!q || !countryCode) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere el término de búsqueda y código de país'
      });
    }

    console.log('🔍 Buscando productos:', { q, countryCode, state, city });

    // Construir filtros de búsqueda
    const filters = {
      'location.countryCode': countryCode,
      status: 'activo',
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ]
    };

    if (state) filters['location.state'] = state;
    if (city) filters['location.city'] = city;

    const products = await Product.find(filters)
      .populate('seller', 'email phone country city')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset));

    const total = await Product.countDocuments(filters);
    
    res.json({
      success: true,
      products: products,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: offset + parseInt(limit) < total
      }
    });

  } catch (error) {
    console.error('❌ Error en GET /api/products/search:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// Endpoint para obtener todos los chats del usuario autenticado
router.get('/chats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    console.log('🔍 Buscando chats para usuario:', userId);
    const chats = await Chat.find({ participants: userId })
      .populate('participants', 'email country city')
      .populate({
        path: 'product',
        select: 'name images',
        populate: {
          path: 'images',
          model: 'Image',
          select: 'filename mimetype',
        }
      })
      .sort({ updatedAt: -1 });
    console.log('✅ Chats encontrados:', chats.length);
    res.json({ success: true, chats });
  } catch (err) {
    console.error('❌ Error en GET /api/products/chats:', err);
    res.status(500).json({ success: false, error: 'Error obteniendo chats', details: err.stack });
  }
});

// Crear un nuevo chat entre dos usuarios (directo o por producto)
router.post('/chats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { participantId, productId } = req.body;
    if (!participantId) {
      return res.status(400).json({ success: false, error: 'Falta participantId' });
    }
    // Buscar si ya existe un chat directo entre estos usuarios (y producto si aplica)
    let chat;
    if (productId) {
      chat = await Chat.findOne({
        participants: { $all: [userId, participantId] },
        product: productId
      });
    } else {
      chat = await Chat.findOne({
        participants: { $all: [userId, participantId] },
        product: { $exists: false }
      });
    }
    if (chat) {
      return res.json({ success: true, chat });
    }
    // Crear nuevo chat
    const newChat = new Chat({
      participants: [userId, participantId],
      product: productId || undefined,
      messages: [],
      updatedAt: new Date()
    });
    await newChat.save();
    // Popular participantes para el frontend
    await newChat.populate('participants', 'email username country city');
    res.status(201).json({ success: true, chat: newChat });
  } catch (err) {
    console.error('Error creando chat:', err);
    res.status(500).json({ success: false, error: 'Error creando chat', details: err.stack });
  }
});

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No se subió ningún archivo' });
  }
  // Devolver la URL pública del archivo de forma segura
  let fileUrl;
  if (req.file.path && req.file.path.includes('uploads/')) {
    const parts = req.file.path.split('uploads/');
    fileUrl = `/uploads/${parts[1] ? parts[1].replace(/\\/g, '/') : req.file.filename}`;
  } else {
    fileUrl = `/uploads/${req.file.filename}`;
  }
  res.json({ success: true, url: fileUrl });
});

router.post('/upload-image', memoryUpload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No se subió ningún archivo' });
  }
  try {
    const image = new Image({
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      data: req.file.buffer,
      uploadedBy: req.user ? req.user._id : undefined
    });
    await image.save();
    res.json({ success: true, imageId: image._id });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Error guardando la imagen' });
  }
});

router.get('/image/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).send('Imagen no encontrada');
    res.set('Content-Type', image.mimetype);
    res.send(image.data);
  } catch (err) {
    res.status(500).send('Error al obtener la imagen');
  }
});

// GET /api/products - Obtener productos por ubicación
router.get('/', async (req, res) => {
  try {
    const { countryCode, state, city, category, seller, limit = 20, offset = 0 } = req.query;
    
    if (!countryCode && !seller) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere el código de país o el ID del vendedor'
      });
    }

    console.log('🔍 Buscando productos para:', { countryCode, state, city, category, seller });

    // Construir filtros
    const filters = { status: 'activo' };

    // Si se proporciona seller, filtrar por vendedor (ignorar ubicación)
    if (seller) {
      filters.seller = seller;
    } else {
      // Si no hay seller, usar filtros de ubicación
      filters['location.countryCode'] = countryCode;
      if (state) filters['location.state'] = state;
      if (city) filters['location.city'] = city;
    }

    if (category) filters.category = category;

    const products = await Product.find(filters)
      .populate('seller', 'email phone country city')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset));

    const total = await Product.countDocuments(filters);

    res.json({
      success: true,
      products: products,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: offset + parseInt(limit) < total
      }
    });

  } catch (error) {
    console.error('❌ Error en GET /api/products:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// POST /api/products - Crear un nuevo producto
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      currency,
      images,
      category,
      condition,
      location,
      tags
    } = req.body;

    // Validar campos requeridos
    if (!name || !description || !price || !images || !Array.isArray(images) || images.length === 0 || !category || !location || !location.country || !location.countryCode || !location.city) {
      return res.status(400).json({
        success: false,
        error: 'Faltan campos obligatorios o formato incorrecto'
      });
    }

    const product = new Product({
      name,
      description,
      price,
      currency: currency || 'USD',
      images,
      category,
      condition: condition || 'nuevo',
      location: {
        country: location.country,
        countryCode: location.countryCode,
        state: location.state || '',
        city: location.city
      },
      seller: req.user._id,
      status: 'activo',
      tags: tags || []
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error('❌ Error en POST /api/products:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
});

// GET /api/products/categories - Obtener categorías disponibles
router.get('/categories', async (req, res) => {
  try {
    const { countryCode, state, city } = req.query;
    
    if (!countryCode) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere el código de país'
      });
    }

    const filters = {
      'location.countryCode': countryCode,
      status: 'activo'
    };
    
    if (state) filters['location.state'] = state;
    if (city) filters['location.city'] = city;

    const categories = await Product.distinct('category', filters);
    
    res.json({
      success: true,
      categories: categories.sort(),
      total: categories.length,
      filters: {
        countryCode: countryCode.replace('+', ''),
        state: state,
        city: city
      }
    });

  } catch (error) {
    console.error('❌ Error en GET /api/products/categories:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/products/vendors - Obtener vendedores disponibles
router.get('/vendors', async (req, res) => {
  try {
    const { countryCode, state, city } = req.query;
    
    if (!countryCode) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere el código de país'
      });
    }

    const filters = {
      'location.countryCode': countryCode,
      status: 'activo'
    };
    
    if (state) filters['location.state'] = state;
    if (city) filters['location.city'] = city;

    // Obtener vendedores únicos
    const vendors = await Product.distinct('seller', filters);
    
    // Obtener información de los vendedores
    const vendorsWithInfo = await User.find({
      _id: { $in: vendors }
    }).select('email phone country city');

    const vendorEmails = vendorsWithInfo.map(vendor => vendor.email);
    
    res.json({
      success: true,
      vendors: vendorEmails.sort(),
      total: vendorEmails.length,
      filters: {
        countryCode: countryCode.replace('+', ''),
        state: state,
        city: city
      }
    });

  } catch (error) {
    console.error('❌ Error en GET /api/products/vendors:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// RUTAS CON PARÁMETRO DESPUÉS
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findById(id)
      .populate('seller', 'email phone country city');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }

    res.json({
      success: true,
      product: product
    });

  } catch (error) {
    console.error('❌ Error en GET /api/products/:id:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }

    // Verificar que el usuario sea el vendedor
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permisos para modificar este producto'
      });
    }

    // Actualizar el producto
    Object.assign(product, updateData);
    await product.save();

    const updatedProduct = await Product.findById(id)
      .populate('seller', 'email phone country city');

    res.json({
      success: true,
      product: updatedProduct
    });

  } catch (error) {
    console.error('❌ Error en PUT /api/products/:id:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }

    // Verificar que el usuario sea el vendedor
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permisos para eliminar este producto'
      });
    }

    await Product.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Producto eliminado correctamente'
    });

  } catch (error) {
    console.error('❌ Error en DELETE /api/products/:id:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

router.post('/:id/message', authenticateToken, async (req, res) => {
  try {
    const { text } = req.body;
    const productId = req.params.id;
    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, error: 'El mensaje no puede estar vacío' });
    }
    const product = await Product.findById(productId).populate('seller');
    if (!product) {
      return res.status(404).json({ success: false, error: 'Producto no encontrado' });
    }
    const sellerId = product.seller._id.toString();
    const buyerId = req.user._id.toString();
    // Buscar chat existente entre ambos usuarios para este producto
    let chat = await Chat.findOne({
      participants: { $all: [sellerId, buyerId] },
      product: productId,
      type: 'marketplace'
    });
    if (!chat) {
      chat = new Chat({
        participants: [sellerId, buyerId],
        product: productId,
        type: 'marketplace',
        messages: []
      });
    }
    chat.messages.push({ sender: buyerId, text });
    chat.updatedAt = new Date();
    await chat.save();
    res.json({ success: true, chatId: chat._id });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Error enviando mensaje' });
  }
});

// Servir archivos estáticos de la carpeta uploads
const __dirname = path.resolve();
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

export default router; 