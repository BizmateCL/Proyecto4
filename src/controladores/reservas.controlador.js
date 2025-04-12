const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Ruta al archivo de datos
const rutaDatos = path.join(__dirname, "../datos/reservas.json");

// Leer las reservas existentes
const obtenerReservas = () => {
  const datos = fs.readFileSync(rutaDatos, "utf-8");
  return JSON.parse(datos);
};

// Guardar reservas en el archivo
const guardarReservas = (reservas) => {
  fs.writeFileSync(rutaDatos, JSON.stringify(reservas, null, 2), "utf-8");
};

// Crear múltiples reservas
const crearReservas = (req, res) => {
  const nuevasReservas = req.body; // Se espera un arreglo de reservas

  // Validar que el cuerpo sea un arreglo
  if (!Array.isArray(nuevasReservas)) {
    return res
      .status(400)
      .send("El cuerpo de la solicitud debe ser un arreglo de reservas");
  }

  // Validar cada reserva
  const reservasValidas = [];
  for (const reserva of nuevasReservas) {
    const { hotel, fecha, tipoHabitacion, adultos, niños } = reserva;

    if (!hotel || !fecha || !tipoHabitacion || !adultos) {
      return res
        .status(400)
        .send("Faltan datos obligatorios en una o más reservas");
    }

    // Crear la reserva con un ID único
    reservasValidas.push({
      id: uuidv4(),
      hotel,
      fecha,
      tipoHabitacion,
      adultos,
      niños: niños || 0, // Valor predeterminado si no se envía
    });
  }

  // Guardar las reservas
  const reservasExistentes = obtenerReservas();
  const todasLasReservas = [...reservasExistentes, ...reservasValidas];
  guardarReservas(todasLasReservas);

  res.status(201).json(reservasValidas);
};

// Obtener todas las reservas
const obtenerTodasLasReservas = (req, res) => {
  const reservas = obtenerReservas(); // Cargar todas las reservas desde el archivo
  res.status(200).json(reservas); // Enviar las reservas como respuesta
};

// Obtener una reserva específica por ID
const obtenerReservaPorId = (req, res) => {
  const reservas = obtenerReservas();
  const { id } = req.params;

  // Buscar la reserva por ID
  const reserva = reservas.find((reserva) => reserva.id === id);

  if (!reserva) {
    return res.status(404).send("Reserva no encontrada"); // Si no se encuentra, devolver un error 404
  }

  res.status(200).json(reserva); // Enviar la reserva encontrada como respuesta
};

// Actualizar una reserva específica por ID
const actualizarReservaPorId = (req, res) => {
    const reservas = obtenerReservas(); // Cargar todas las reservas desde el archivo
    const { id } = req.params; // Obtener el ID de los parámetros de la URL
    const { hotel, fecha, tipoHabitacion, adultos, niños } = req.body; // Datos enviados en el cuerpo de la solicitud
  
    // Buscar la reserva por ID
    const indiceReserva = reservas.findIndex(reserva => reserva.id === id);
  
    if (indiceReserva === -1) {
      return res.status(404).send('Reserva no encontrada'); // Si no se encuentra, devolver un error 404
    }
  
    // Actualizar los datos de la reserva
    reservas[indiceReserva] = {
      ...reservas[indiceReserva], // Mantener los datos existentes
      hotel: hotel || reservas[indiceReserva].hotel, // Actualizar solo si se envía un nuevo valor
      fecha: fecha || reservas[indiceReserva].fecha,
      tipoHabitacion: tipoHabitacion || reservas[indiceReserva].tipoHabitacion,
      adultos: adultos || reservas[indiceReserva].adultos,
      niños: niños || reservas[indiceReserva].niños,
    };
  
    // Guardar las reservas actualizadas en el archivo
    guardarReservas(reservas);
  
    res.status(200).json(reservas[indiceReserva]); // Enviar la reserva actualizada como respuesta
  };

  module.exports = {
    crearReservas,
    obtenerTodasLasReservas,
    obtenerReservaPorId,
    actualizarReservaPorId, // Exportar la nueva función
  };
