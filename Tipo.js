const mongoose = require('mongoose');

const TipoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true},
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tipo', TipoSchema);