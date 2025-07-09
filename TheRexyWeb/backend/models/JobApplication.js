import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const jobApplicationSchema = new mongoose.Schema({
  offer: { type: mongoose.Schema.Types.ObjectId, ref: 'JobOffer', required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  message: { type: String }, // Mensaje de postulación
  respuestas: [{ type: String }], // Respuestas a preguntas personalizadas
  cvUrl: { type: String }, // URL del currículum subido
  status: { type: String, enum: ['pendiente', 'aceptada', 'rechazada'], default: 'pendiente' }, // Estado de la postulación
  comments: [commentSchema] // Hilo de comentarios entre ofertante y postulante
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
export default JobApplication; 