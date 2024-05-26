const mongoose = require('mongoose');

const EtapaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true},
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Etapa', EtapaSchema);
