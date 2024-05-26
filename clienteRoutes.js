const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// Ruta para obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear un nuevo cliente
router.post('/', async (req, res) => {
  const cliente = new Cliente(req.body);
  try {
    const nuevoCliente = await cliente.save();
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para eliminar un cliente
router.delete('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json({ message: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para actualizar un cliente
router.put('/:id', async (req, res) => {
  try {
    const clienteActualizado = await Cliente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!clienteActualizado) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(clienteActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;