const mongoose = require('mongoose');

const ProyectoSchema = new mongoose.Schema({
  numero: { type: String, required: true, unique: true },
  titulo: { type: String, required: true },
  fechaIniciacion: { type: Date, required: true },
  fechaEntrega: { type: Date, required: true },
  valor: { type: Number, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now },
  cliente: { type: String, required: true },
  tipoProyecto: { type: String, required: true },
  universidad: { type: String, required: true },
  etapa: { type: String, required: true },
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);
