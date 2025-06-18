const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fechaCreacion: { type: Date, default: Date.now },
  disponible: { type: Boolean, default: true }
});

module.exports = mongoose.model('Servicio', servicioSchema);
