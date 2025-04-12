const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Ruta al archivo de datos
const rutaDatos = path.join(__dirname, '../datos/reservas.json');

// Leer las reservas existentes
const obtenerReservas = () => {
  const datos = fs.readFileSync(rutaDatos, 'utf-8');
  return JSON.parse(datos);
};

// Guardar reservas en el archivo
const guardarReservas = (reservas) => {
  fs.writeFileSync(rutaDatos, JSON.stringify(reservas, null, 2), 'utf-8');
};

// Crear múltiples reservas
const crearReservas = (req, res) => {
  const nuevasReservas = req.body; // Se espera un arreglo de reservas

  // Validar que el cuerpo sea un arreglo
  if (!Array.isArray(nuevasReservas)) {
    return res.status(400).send('El cuerpo de la solicitud debe ser un arreglo de reservas');
  }

  // Validar cada reserva
  const reservasValidas = [];
  for (const reserva of nuevasReservas) {
    const { hotel, fecha, tipoHabitacion, adultos, niños } = reserva;

    if (!hotel || !fecha || !tipoHabitacion || !adultos) {
      return res.status(400).send('Faltan datos obligatorios en una o más reservas');
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

module.exports = {
  crearReservas,
  obtenerTodasLasReservas,
};




module.exports = {
  crearReservas,
};