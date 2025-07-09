console.log("ESTE ES EL ARCHIVO QUE SE ESTÁ USANDO - userController.js");
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { getCountryFromCode, validatePhoneNumber, extractCountryCode, countryCodes } from "../utils/countryCodes.js";

// Registro de usuario
export const register = async (req, res) => {
  try {
    const { email, password, phone } = req.body;
    
    // Validaciones básicas
    if (!email || !password || !phone) {
      return res.status(400).json({ msg: "Faltan datos obligatorios" });
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
    const countryCode = extractCountryCode(phone);
    if (!countryCode) {
      return res.status(400).json({ msg: "Código de país inválido" });
    }

    const countryInfo = getCountryFromCode(countryCode);
    if (!countryInfo) {
      return res.status(400).json({ msg: "Código de país no soportado" });
    }

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
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

    // Crear nuevo usuario SOLO con los campos requeridos
    const user = new User({
      email,
      passwordHash,
      phone,
      country: countryInfo.name,
      countryCode: countryCode
    });

    await user.save();
    res.status(201).json({ 
      msg: "Usuario creado exitosamente",
      user: {
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
};

// Login de usuario
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validaciones
    if (!email || !password) {
      return res.status(400).json({ msg: "Faltan datos" });
    }

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1d" }
    );

    // Configurar cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    });

    res.json({
      token,
      user: {
        email: user.email,
        id: user._id,
        phone: user.phone,
        country: user.country,
        countryCode: user.countryCode
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// Obtener usuario actual
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    res.json({ 
      email: user.email, 
      id: user._id,
      phone: user.phone,
      country: user.country,
      countryCode: user.countryCode,
      test: "desde-authRoutes"
    });
  } catch (err) {
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// Logout
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ msg: "Logout exitoso" });
};

// Obtener países y estados
export const getCountries = (req, res) => {
  try {
    res.json(countryCodes);
  } catch (err) {
    res.status(500).json({ msg: "Error interno del servidor" });
  }
}; 

// Buscar usuarios por username (coincidencia parcial)
export const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) {
      return res.status(400).json({ msg: 'Debes ingresar al menos 2 caracteres' });
    }
    const users = await User.find({
      username: { $regex: q, $options: 'i' }
    }).select('username email country countryCode city state');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
}; 