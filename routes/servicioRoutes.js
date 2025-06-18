const express = require('express');
const router = express.Router();
const servicioController = require('../contollers/servicioController');
const auth = require('../middleware/auth');

// Crear servicio (solo autenticado)
router.post('/', auth, servicioController.crearServicio);
// Obtener todos los servicios disponibles
router.get('/', servicioController.obtenerServicios);
// Obtener servicios del freelancer autenticado
router.get('/mios', auth, servicioController.obtenerServiciosFreelancer);

module.exports = router;
