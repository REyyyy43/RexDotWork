import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String, 
    required: true,
    trim: true
  },
  price: { 
    type: Number, 
    required: true,
    min: 0
  },
  currency: { 
    type: String, 
    default: 'USD',
    enum: ['USD', 'EUR', 'MXN', 'COP', 'ARS', 'CLP', 'PEN', 'BRL']
  },
  images: {
    type: [String],
    validate: [arr => arr.length > 0 && arr.length <= 5, 'Debe tener entre 1 y 5 imágenes'],
    required: true
  },
  category: { 
    type: String, 
    required: true,
    trim: true
  },
  condition: { 
    type: String, 
    enum: ['nuevo', 'usado', 'reacondicionado'],
    default: 'nuevo'
  },
  location: {
    country: { type: String, required: true },
    countryCode: { type: String, required: true },
    state: { type: String },
    city: { type: String, required: true }
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['activo', 'vendido', 'pausado'],
    default: 'activo'
  },
  tags: [String],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Middleware para actualizar updatedAt
productSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Índices para búsquedas eficientes
productSchema.index({ 'location.countryCode': 1, 'location.state': 1, 'location.city': 1 });
productSchema.index({ category: 1 });
productSchema.index({ seller: 1 });
productSchema.index({ status: 1 });
productSchema.index({ createdAt: -1 });

const Product = mongoose.model("Product", productSchema);
export default Product; 