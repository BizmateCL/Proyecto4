const express = require('express');
const { crearReservas, obtenerTodasLasReservas } = require('../controladores/reservas.controlador');

const router = express.Router();

// Ruta para crear múltiples reservas
router.post('/', crearReservas);


//router.get('/', obtenerTodasLasReservas);

module.exports = router;