const express = require('express');
const router = express.Router();
const Etapa = require('../models/Etapa');

// Ruta para obtener todas las etapas
router.get('/', async (req, res) => {
  try {
    const etapas = await Etapa.find();
    res.json(etapas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear una nueva etapa
router.post('/', async (req, res) => {
  const etapa = new Etapa(req.body);
  try {
    const nuevaEtapa = await etapa.save();
    res.status(201).json(nuevaEtapa);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para eliminar una etapa
router.delete('/:id', async (req, res) => {
  try {
    const etapa = await Etapa.findByIdAndDelete(req.params.id);
    if (!etapa) return res.status(404).json({ message: 'Etapa no encontrada' });
    res.json({ message: 'Etapa eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para actualizar una etapa
router.put('/:id', async (req, res) => {
  try {
    const etapaActualizada = await Etapa.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!etapaActualizada) return res.status(404).json({ message: 'Etapa no encontrada' });
    res.json(etapaActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;