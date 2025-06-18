const express = require('express');
const router = express.Router();
const usuarioController = require('../contollers/usuarioController');
const auth = require('../middleware/auth');

// Ruta para crear usuario
router.post('/', usuarioController.crearUsuario);
// Ruta para login de usuario
router.post('/login', usuarioController.loginUsuario);
// Ruta para obtener todos los usuarios
router.get('/', auth, usuarioController.obtenerUsuarios);
// Obtener perfil del usuario autenticado
router.get('/me', auth, usuarioController.obtenerPerfil);

module.exports = router;
