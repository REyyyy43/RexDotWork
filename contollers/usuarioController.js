const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro seguro de usuario
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, tipo, binance } = req.body;
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El email ya está registrado.' });
    }
    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const usuario = new Usuario({ nombre, email, password: passwordHash, tipo, binance });
    await usuario.save();
    res.status(201).json({ mensaje: 'Usuario creado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear usuario', error });
  }
};

// Login seguro
exports.loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }
    // Generar token JWT
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, tipo: usuario.tipo },
      process.env.JWT_SECRET || 'secreto',
      { expiresIn: '1d' }
    );
    res.json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email, tipo: usuario.tipo } });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
};

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error });
  }
};

// Obtener datos del usuario autenticado
exports.obtenerPerfil = async (req, res) => {
  console.log('Llamada a /api/users/me');
  console.log('Usuario autenticado:', req.usuario);
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-password');
    if (!usuario) {
      console.log('Usuario no encontrado');
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ mensaje: 'Error al obtener perfil', error });
  }
};
