const express = require('express');
const { crearReservas, obtenerTodasLasReservas, obtenerReservaPorId, actualizarReservaPorId } = require('../controladores/reservas.controlador');
const router = express.Router();

// Ruta para crear múltiples reservas
router.post('/', crearReservas);
router.get('/', obtenerTodasLasReservas);
router.get('/:id', obtenerReservaPorId);
router.put('/:id', actualizarReservaPorId);
module.exports = router;