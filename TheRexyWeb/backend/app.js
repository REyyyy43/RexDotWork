// Forzar redeploy en Render
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import { auth } from "./middleware/auth.js";
import { countryCodes, getCountryFromCode, validatePhoneNumber, extractCountryCode } from "./utils/countryCodes.js";
import Courses from "./routes/Courses.js";
import translateRouter from "./index.js";
import marketplaceRouter from "./routes/marketplace.js";
import offersRouter from "./routes/offers.js";
import productsRouter from "./routes/products.js";
import servicesRouter from "./routes/services.js";

const app = express();

app.use(cors({
  origin: ['https://rexdotwork.onrender.com', 'https://rexdotwork.onrender.com'],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// Registro de usuario
app.post("/api/register", async (req, res) => {
  try {
    const { email, password, phone } = req.body;
    if (!email || !password || !phone) {
      return res.status(400).json({ msg: "Faltan datos obligatorios" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Formato de email inválido" });
    }
    if (password.length < 6) {
      return res.status(400).json({ msg: "La contraseña debe tener al menos 6 caracteres" });
    }
    if (!validatePhoneNumber(phone)) {
      return res.status(400).json({ msg: "Formato de teléfono inválido. Use formato: +XX XXXX XXX XXX" });
    }
    const countryCode = extractCountryCode(phone);
    if (!countryCode) {
      return res.status(400).json({ msg: "Código de país inválido" });
    }
    const countryInfo = getCountryFromCode(countryCode);
    if (!countryInfo) {
      return res.status(400).json({ msg: "Código de país no soportado" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "Email ya registrado" });
    }
    const phoneExists = await User.findOne({ phone });
    if (phoneExists) {
      return res.status(400).json({ msg: "Número de teléfono ya registrado" });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
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
});

// Login de usuario
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Faltan datos" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Usuario no encontrado" });
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
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
});

// Obtener usuario actual
app.get("/api/me", auth, async (req, res) => {
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
      countryCode: user.countryCode
    });
  } catch (err) {
    res.status(500).json({ msg: "Error interno del servidor" });
  }
});

// Logout
app.post("/api/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ msg: "Logout exitoso" });
});

// Obtener países y estados - MOVIDO A index.js
// app.get("/api/countries", (req, res) => {
//   try {
//     res.json(countryCodes);
//   } catch (err) {
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// });

app.use("/api/marketplace", marketplaceRouter);
app.use("/api/offers", offersRouter);
app.use("/api/products", productsRouter);
app.use("/api/services", servicesRouter);
app.use("/api/courses", Courses);
app.use('/api', translateRouter);

app.get("/api/protected", auth, (req, res) => {
  res.json({ msg: "Ruta protegida", userId: req.userId });
});

export default app;

