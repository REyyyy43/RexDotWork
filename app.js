// Configuración básica de Express y conexión a MongoDB
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.static('views'));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/freelance', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error('Error conectando a MongoDB:', err));

// Rutas de ejemplo
app.get('/', (req, res) => {
  res.send('API Freelance funcionando');
});

// Importar rutas de usuario (ejemplo)
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Importar rutas de servicios
const servicioRoutes = require('./routes/servicioRoutes');
app.use('/api/servicios', servicioRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
