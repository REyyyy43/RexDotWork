const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tipo: { type: String, enum: ['freelancer', 'cliente'], required: true },
  fechaRegistro: { type: Date, default: Date.now },
  binance: { type: String, required: true }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
