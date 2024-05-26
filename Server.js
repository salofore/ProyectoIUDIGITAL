const express = require('express');
const mongoose = require('mongoose');
const clienteRoutes = require('./routes/clienteRoutes');
const etapaRoutes = require('./routes/etapaRoutes');
const tipoRoutes = require('./routes/tipoRoutes');
const universidadRoutes = require('./routes/universidadRoutes');
const proyectoRoutes = require('./routes/proyectoRoutes');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mi_base_de_datos', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión a MongoDB exitosa');
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use('/clientes', clienteRoutes);
app.use('/etapas', etapaRoutes);
app.use('/tipos', tipoRoutes);
app.use('/universidades', universidadRoutes);
app.use('/proyectos', proyectoRoutes); // Usa las rutas de proyectos

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
