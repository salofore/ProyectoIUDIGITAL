const express = require('express');
const router = express.Router();
const Proyecto = require('../models/Proyecto');

// Obtener todos los proyectos
router.get('/', async (req, res) => {
  try {
    const proyectos = await Proyecto.find().populate('cliente');
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo proyecto
router.post('/', async (req, res) => {
  const proyecto = new Proyecto(req.body);
  try {
    const nuevoProyecto = await proyecto.save();
    res.status(201).json(nuevoProyecto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un proyecto
router.delete('/:id', async (req, res) => {
  try {
    const proyecto = await Proyecto.findByIdAndDelete(req.params.id);
    if (!proyecto) return res.status(404).json({ message: 'Proyecto no encontrado' });
    res.json({ message: 'Proyecto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Modificar un proyecto
router.put('/:id', async (req, res) => {
  try {
    const proyectoActualizada = await Proyecto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!proyectoActualizada) return res.status(404).json({ message: 'Proyecto no encontrada' });
    res.json(proyectoActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;