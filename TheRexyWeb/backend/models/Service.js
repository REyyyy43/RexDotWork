import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String, 
    required: true,
    trim: true
  },
  category: { 
    type: String, 
    required: true,
    trim: true
  },
  price: {
    amount: { type: Number, required: true, min: 0 },
    currency: { 
      type: String, 
      default: 'USD',
      enum: ['USD', 'EUR', 'MXN', 'COP', 'ARS', 'CLP', 'PEN', 'BRL']
    },
    type: { 
      type: String, 
      enum: ['fijo', 'por_hora', 'por_día', 'por_proyecto'],
      default: 'fijo'
    }
  },
  images: [{
    type: String,
    validate: {
      validator: function(v) {
        return v.length <= 5;
      },
      message: 'Máximo 5 imágenes permitidas'
    }
  }],
  location: {
    country: { type: String, required: true },
    countryCode: { type: String, required: true },
    state: { type: String },
    city: { type: String, required: true },
    remote: { type: Boolean, default: false }
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['activo', 'pausado', 'inactivo'],
    default: 'activo'
  },
  skills: [{
    type: String,
    trim: true
  }],
  experience: {
    type: String,
    enum: ['principiante', 'intermedio', 'avanzado', 'experto'],
    default: 'intermedio'
  },
  availability: {
    type: String,
    enum: ['disponible', 'ocupado', 'limitado'],
    default: 'disponible'
  },
  tags: [String],
  portfolio: [{
    title: String,
    description: String,
    image: String,
    url: String
  }],
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
serviceSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Índices para búsquedas eficientes
serviceSchema.index({ 'location.countryCode': 1, 'location.state': 1, 'location.city': 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ provider: 1 });
serviceSchema.index({ status: 1 });
serviceSchema.index({ createdAt: -1 });

const Service = mongoose.model("Service", serviceSchema);
export default Service; 