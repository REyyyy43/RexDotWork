import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  offer: { type: mongoose.Schema.Types.ObjectId, ref: 'JobOffer' },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  type: { type: String, enum: ['marketplace', 'postulacion', 'servicio'], default: 'marketplace' },
  messages: [messageSchema],
  updatedAt: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', chatSchema);
export default Chat; 