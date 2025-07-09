import express from 'express';
import { Router } from 'express';

const router = Router();

// Simulación de base de datos en memoria
let products = [];

// POST /api/marketplace/producto - subir producto
router.post('/producto', (req, res) => {
  const { name, price, image, category, country, description, userId } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  const newProduct = {
    id: Date.now(),
    name,
    price,
    image: image || '',
    category,
    country: country || '',
    description: description || '',
    userId: userId || null,
    createdAt: new Date()
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// GET /api/marketplace/productos - obtener todos los productos
router.get('/productos', (req, res) => {
  res.json(products);
});

export default router;
