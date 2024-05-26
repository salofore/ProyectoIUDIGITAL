const express = require('express');
const router = express.Router();
const Universidad = require('../models/Universidad'); // Asegúrate de que el modelo esté en la ruta correcta

// Ruta para obtener todas las universidades
router.get('/', async (req, res) => {
  try {
    const universidades = await Universidad.find();
    res.json(universidades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear una nueva universidad
router.post('/', async (req, res) => {
  const universidad = new Universidad(req.body);
  try {
    const nuevaUniversidad = await universidad.save();
    res.status(201).json(nuevaUniversidad);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para eliminar una universidad
router.delete('/:id', async (req, res) => {
  try {
    const universidad = await Universidad.findByIdAndDelete(req.params.id);
    if (!universidad) return res.status(404).json({ message: 'Universidad no encontrada' });
    res.json({ message: 'Universidad eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para actualizar una universidad
router.put('/:id', async (req, res) => {
  try {
    const universidadActualizada = await Universidad.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!universidadActualizada) return res.status(404).json({ message: 'Universidad no encontrada' });
    res.json(universidadActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
