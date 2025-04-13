const express = require("express");
const {
  crearReservas,
  obtenerTodasLasReservas,
  obtenerReservaPorId,
  actualizarReservaPorId,
} = require("../controladores/reservas.controlador");
const router = express.Router();

router.post("/", crearReservas);

router.get("/", (req, res) => {
  const { tipo_habitacion, fecha_inicio, fecha_fin, hotel, grupos_grandes, estado_pago } = req.query;
  const reservas = require("../datos/reservas.json");

  // Filtro por tipo de habitación
  if (tipo_habitacion) {
    const reservasFiltradas = reservas.filter(
      (reserva) =>
        reserva.tipoHabitacion.toLowerCase() === tipo_habitacion.toLowerCase()
    );
    return res.status(200).json(reservasFiltradas);
  }

  // Filtro por rango de fechas
  if (fecha_inicio && fecha_fin) {
    const reservasFiltradasPorFecha = reservas.filter((reserva) => {
      const fechaReserva = new Date(reserva.fecha);
      const inicio = new Date(fecha_inicio);
      const fin = new Date(fecha_fin);
      return fechaReserva >= inicio && fechaReserva <= fin;
    });

    if (reservasFiltradasPorFecha.length === 0) {
      return res.status(404).send("No hay reservas en la fecha solicitada");
    }

    return res.status(200).json(reservasFiltradasPorFecha);
  }

  // Filtro por hotel
  if (hotel) {
    const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const reservasFiltradasPorHotel = reservas.filter(
      (reserva) => normalize(reserva.hotel.toLowerCase()) === normalize(hotel.toLowerCase())
    );

    if (reservasFiltradasPorHotel.length === 0) {
      return res.status(404).send("No hay reservas para el hotel solicitado");
    }

    return res.status(200).json(reservasFiltradasPorHotel);
  }

  // Filtro por cantidad de huéspedes (grupos grandes)
  if (grupos_grandes === "true") {
    const reservasGruposGrandes = reservas.filter(
      (reserva) => reserva.adultos + reserva.niños >= 5
    );

    if (reservasGruposGrandes.length === 0) {
      return res
        .status(404)
        .send("No hay reservas para invitados con grupos sobre 5 personas");
    }

    return res.status(200).json(reservasGruposGrandes);
  }

  // Filtro por estado de pago
  if (estado_pago) {
    const reservasFiltradasPorEstado = reservas.filter(
      (reserva) => reserva.estado_pago.toLowerCase() === estado_pago.toLowerCase()
    );

    if (reservasFiltradasPorEstado.length === 0) {
      return res.status(404).send("No hay reservas con el estado de pago solicitado");
    }

    return res.status(200).json(reservasFiltradasPorEstado);
  }

  // Si no hay filtros, devuelve todas las reservas
  res.status(200).json(reservas);
});

router.get("/:id", obtenerReservaPorId);
router.put("/:id", actualizarReservaPorId);

// eliminar una reserva por ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const reservas = require("../datos/reservas.json");
  const nuevaListaReservas = reservas.filter((reserva) => reserva.id !== id);

  if (reservas.length === nuevaListaReservas.length) {
    return res.status(404).send("Reserva no encontrada");
  }

  const fs = require("fs");
  fs.writeFileSync(
    "./src/datos/reservas.json",
    JSON.stringify(nuevaListaReservas, null, 2)
  );
  res.status(200).send(`Reserva con ID ${id} eliminada correctamente`);
});

module.exports = router;