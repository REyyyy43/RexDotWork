import express from 'express';
import Service from '../models/Service.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/services - Crear nuevo servicio
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      images = [],
      skills = [],
      experience = 'intermedio',
      tags = [],
      portfolio = []
    } = req.body;

    if (!title || !description || !category || !price) {
      return res.status(400).json({
        success: false,
        error: 'Faltan campos obligatorios'
      });
    }

    // Validar que haya máximo 5 imágenes
    if (images.length > 5) {
      return res.status(400).json({
        success: false,
        error: 'Máximo 5 imágenes permitidas'
      });
    }

    // Obtener ubicación del usuario
    const userLocation = {
      country: req.user.country,
      countryCode: req.user.countryCode,
      state: req.user.state,
      city: req.user.city,
      remote: false
    };

    const service = new Service({
      title,
      description,
      category,
      price,
      images,
      location: userLocation,
      provider: req.user._id,
      skills,
      experience,
      tags,
      portfolio
    });

    await service.save();

    const populatedService = await Service.findById(service._id)
      .populate('provider', 'email phone country city');

    res.status(201).json({
      success: true,
      service: populatedService
    });

  } catch (error) {
    console.error('❌ Error en POST /api/services:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/services - Obtener servicios por ubicación
router.get('/', async (req, res) => {
  try {
    const { 
      countryCode, 
      state, 
      city, 
      category, 
      experience,
      limit = 20, 
      offset = 0 
    } = req.query;

    if (!countryCode) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere el código de país'
      });
    }

    // Construir filtros
    const filters = {
      'location.countryCode': countryCode,
      status: 'activo'
    };

    if (state) filters['location.state'] = state;
    if (city) filters['location.city'] = city;
    if (category) filters.category = category;
    if (experience) filters.experience = experience;

    const services = await Service.find(filters)
      .populate('provider', 'email phone country city')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset));

    const total = await Service.countDocuments(filters);

    res.json({
      success: true,
      services: services,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: offset + parseInt(limit) < total
      }
    });

  } catch (error) {
    console.error('❌ Error en GET /api/services:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/services/search - Buscar servicios
router.get('/search', async (req, res) => {
  try {
    const { q, countryCode, state, city, limit = 20, offset = 0 } = req.query;
    
    if (!q || !countryCode) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere el término de búsqueda y código de país'
      });
    }

    console.log('🔍 Buscando servicios:', { q, countryCode, state, city });

    // Construir filtros de búsqueda
    const filters = {
      'location.countryCode': countryCode,
      status: 'activo',
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { skills: { $in: [new RegExp(q, 'i')] } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ]
    };

    if (state) filters['location.state'] = state;
    if (city) filters['location.city'] = city;

    const services = await Service.find(filters)
      .populate('provider', 'email phone country city')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset));

    const total = await Service.countDocuments(filters);

    res.json({
      success: true,
      services: services,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: offset + parseInt(limit) < total
      }
    });

  } catch (error) {
    console.error('❌ Error en GET /api/services/search:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/services/:id - Obtener servicio específico
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const service = await Service.findById(id)
      .populate('provider', 'email phone country city');
    
    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Servicio no encontrado'
      });
    }

    res.json({
      success: true,
      service: service
    });

  } catch (error) {
    console.error('❌ Error en GET /api/services/:id:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// PUT /api/services/:id - Actualizar servicio
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const service = await Service.findById(id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Servicio no encontrado'
      });
    }

    // Verificar que el usuario sea el proveedor
    if (service.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permisos para modificar este servicio'
      });
    }

    // Actualizar el servicio
    Object.assign(service, updateData);
    await service.save();

    const updatedService = await Service.findById(id)
      .populate('provider', 'email phone country city');

    res.json({
      success: true,
      service: updatedService
    });

  } catch (error) {
    console.error('❌ Error en PUT /api/services/:id:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// DELETE /api/services/:id - Eliminar servicio
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Servicio no encontrado'
      });
    }

    // Verificar que el usuario sea el proveedor
    if (service.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permisos para eliminar este servicio'
      });
    }

    await Service.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Servicio eliminado correctamente'
    });

  } catch (error) {
    console.error('❌ Error en DELETE /api/services/:id:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/services/categories - Obtener categorías disponibles
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

    const categories = await Service.distinct('category', filters);
    
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
    console.error('❌ Error en GET /api/services/categories:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

export default router; 