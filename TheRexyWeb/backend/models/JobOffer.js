import mongoose from "mongoose";

const jobOfferSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  company: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String, 
    required: true,
    trim: true
  },
  requirements: [{
    type: String,
    trim: true
  }],
  skills: [{
    type: String,
    trim: true
  }],
  salary: {
    min: { type: Number, min: 0 },
    max: { type: Number, min: 0 },
    currency: { 
      type: String, 
      default: 'USD',
      enum: ['USD', 'EUR', 'MXN', 'COP', 'ARS', 'CLP', 'PEN', 'BRL']
    },
    period: { 
      type: String, 
      enum: ['hora', 'día', 'semana', 'mes', 'año'],
      default: 'mes'
    }
  },
  workType: {
    type: String,
    enum: ['tiempo_completo', 'tiempo_parcial', 'freelance', 'contrato', 'pasantía'],
    required: true
  },
  location: {
    country: { type: String, required: true },
    countryCode: { type: String, required: true },
    state: { type: String },
    city: { type: String },
    remote: { type: Boolean, default: false }
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['activa', 'cerrada', 'pausada'],
    default: 'activa'
  },
  benefits: [String],
  experience: {
    type: String,
    enum: ['sin_experiencia', '1_año', '2_años', '3_años', '4_años', '5_años', 'mas_de_5'],
    default: 'sin_experiencia'
  },
  education: {
    type: String,
    enum: ['sin_estudios', 'secundaria', 'técnico', 'universitario', 'posgrado'],
    default: 'sin_estudios'
  },
  preguntas: [{ type: String, trim: true }],
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
jobOfferSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Índices para búsquedas eficientes
jobOfferSchema.index({ 'location.countryCode': 1, 'location.state': 1, 'location.city': 1 });
jobOfferSchema.index({ workType: 1 });
jobOfferSchema.index({ employer: 1 });
jobOfferSchema.index({ status: 1 });
jobOfferSchema.index({ createdAt: -1 });

const JobOffer = mongoose.model("JobOffer", jobOfferSchema);
export default JobOffer; 