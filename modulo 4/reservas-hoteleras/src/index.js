const express = require('express');
const reservasRutas = require('./rutas/reservas.rutas');
require('dotenv').config();

const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Rutas
app.use('/api/reservas', reservasRutas);

// Configuración del puerto
const puerto = process.env.PUERTO || 3000;
app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto :${puerto}`);

});