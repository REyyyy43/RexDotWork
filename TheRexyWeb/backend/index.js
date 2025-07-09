// Forzar redeploy en Render
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import User from "./models/User.js";
import fetch from "node-fetch";
import { validatePhoneNumber, extractCountryCode, getCountryFromCode, countryCodes } from './utils/countryCodes.js';
import { getCountryByCode, getStatesByCountry, getCitiesByState, getCountryInfo } from "./utils/countryMap.js";
import productsRouter from "./routes/products.js";
import offersRouter from "./routes/offers.js";
import servicesRouter from "./routes/services.js";
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import Chat from './models/Chat.js';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_change_this';
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: ['https://rexdotwork.onrender.com', 'https://rexdotwork.onrender.com'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://rex-dot-work.vercel.app'
  ],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

// Conectar MongoDB usando la nueva configuración
connectDB();

// Registro
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password, confirmPassword, phone, countryCode } = req.body;
    
    // Validaciones básicas
    if (!username || !email || !password || !confirmPassword || !phone || !countryCode) {
      return res.status(400).json({ msg: "Faltan datos obligatorios" });
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Las contraseñas no coinciden" });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Formato de email inválido" });
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      return res.status(400).json({ msg: "La contraseña debe tener al menos 6 caracteres" });
    }

    // Validar número de teléfono
    if (!validatePhoneNumber(phone)) {
      return res.status(400).json({ msg: "Formato de teléfono inválido. Use formato: +XX XXXX XXX XXX" });
    }

    // Extraer código de país y validar
    const extractedCountryCode = extractCountryCode(phone);
    if (!extractedCountryCode) {
      return res.status(400).json({ msg: "Código de país inválido" });
    }

    const countryInfo = getCountryFromCode(extractedCountryCode);
    if (!countryInfo) {
      return res.status(400).json({ msg: "Código de país no soportado" });
    }

    // Verificar si el username ya existe
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ msg: "Nombre de usuario ya registrado" });
    }

    // Verificar si el email ya existe
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ msg: "Email ya registrado" });
    }

    // Verificar si el teléfono ya está registrado
    const phoneExists = await User.findOne({ phone });
    if (phoneExists) {
      return res.status(400).json({ msg: "Número de teléfono ya registrado" });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const user = new User({
      username,
      email,
      passwordHash,
      phone,
      country: countryInfo.name,
      countryCode: extractedCountryCode
    });

    await user.save();
    res.status(201).json({ 
      msg: "Usuario creado exitosamente",
      user: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        country: user.country,
        countryCode: user.countryCode
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "Faltan datos" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ msg: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      token,
      user: {
        email: user.email,
        id: user._id
      }
    });
  } catch (err) {
    res.status(500).json({ msg: "Error interno" });
  }
});

// Middleware auth
const auth = (req, res, next) => {
  // Buscar token en cookies primero, luego en Authorization header
  let token = req.cookies.token;
  
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }
  
  if (!token) return res.status(401).json({ msg: "No autorizado" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ msg: "Token inválido" });
  }
};

// Logout
app.post("/api/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ msg: "Logout exitoso" });
});

// Obtener usuario actual
app.get("/api/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    res.json({
      username: user.username,
      email: user.email,
      id: user._id,
      phone: user.phone,
      country: user.country,
      countryCode: user.countryCode,
      state: user.state || "",
      city: user.city || ""
    });
  } catch (err) {
    res.status(500).json({ msg: "Error interno del servidor" });
  }
});

// Proxy para traducción con LibreTranslate
app.post('/api/translate', async (req, res) => {
  const { q, source = 'en', target = 'es', format = 'text' } = req.body;
  try {
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q, source, target, format })
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ translatedText: q });
  }
});

// Ruta para obtener países y estados
app.get('/api/countries', (req, res) => {
  res.json(countryCodes);
});

// Nueva ruta para obtener información del país por código numérico
app.get('/api/country/:code', (req, res) => {
  const { code } = req.params;
  const countryInfo = getCountryInfo(code);
  
  if (!countryInfo) {
    return res.status(404).json({ msg: 'País no encontrado' });
  }
  
  res.json(countryInfo);
});

// Ruta para obtener estados de un país
app.get('/api/country/:code/states', (req, res) => {
  const { code } = req.params;
  const states = getStatesByCountry(code);
  
  if (states.length === 0) {
    return res.status(404).json({ msg: 'Estados no encontrados para este país' });
  }
  
  res.json({ states });
});

// Ruta para obtener ciudades de un estado
app.get('/api/country/:code/state/:state/cities', (req, res) => {
  const { code, state } = req.params;
  const cities = getCitiesByState(code, state);
  
  if (cities.length === 0) {
    return res.status(404).json({ msg: 'Ciudades no encontradas para este estado' });
  }
  
  res.json({ cities });
});

// Rutas de productos
app.use('/api/products', productsRouter);

// Rutas de ofertas de trabajo
app.use('/api/offers', offersRouter);

// Rutas de servicios
app.use('/api/services', servicesRouter);

// Montar rutas de autenticación y usuario
app.use('/api', authRoutes);

// Socket.IO: conexión básica y eventos de chat
io.on('connection', (socket) => {
  console.log('Usuario conectado al chat:', socket.id);

  socket.on('join', (userId) => {
    socket.join(userId);
  });

  // Evento para enviar mensaje a otro usuario y guardar en BD
  socket.on('send_message', async ({ toUserId, fromUserId, message, chatId }) => {
    try {
      const chat = await Chat.findById(chatId);
      if (!chat) return;
      chat.messages.push({ sender: fromUserId, text: message.text, createdAt: new Date(), read: false });
      chat.updatedAt = new Date();
      await chat.save();
      const lastMsg = chat.messages[chat.messages.length-1];
      if (toUserId === fromUserId) {
        io.to(toUserId).emit('receive_message', { message: lastMsg, chatId });
      } else {
        io.to(toUserId).emit('receive_message', { message: lastMsg, chatId });
        io.to(fromUserId).emit('receive_message', { message: lastMsg, chatId });
      }
    } catch (err) {
      console.error('Error guardando mensaje en chat:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
