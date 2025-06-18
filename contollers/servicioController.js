const Servicio = require('../models/Servicio');

// Crear un nuevo servicio
exports.crearServicio = async (req, res) => {
  try {
    const { titulo, descripcion, precio, categoria } = req.body;
    const servicio = new Servicio({
      titulo,
      descripcion,
      precio,
      categoria,
      freelancer: req.usuario.id
    });
    await servicio.save();
    res.status(201).json(servicio);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear servicio', error });
  }
};

// Obtener todos los servicios disponibles
exports.obtenerServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find({ disponible: true }).populate('freelancer', 'nombre email tipo binance');
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener servicios', error });
  }
};

// Obtener servicios de un freelancer
exports.obtenerServiciosFreelancer = async (req, res) => {
  try {
    const servicios = await Servicio.find({ freelancer: req.usuario.id });
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener tus servicios', error });
  }
};
