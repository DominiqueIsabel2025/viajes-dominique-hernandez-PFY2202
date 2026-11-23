// Base de datos simulada (backend mock). Todos los precios están en pesos chilenos (CLP).
// Origen de todos los vuelos: Santiago de Chile (SCL).

export const destinos = [
  {
    id: 'cusco',
    nombre: 'Cusco',
    pais: 'Perú',
    continente: 'Sudamérica',
    descripcion: 'Antigua capital del Imperio Inca, rodeada de montañas y a un paso de Machu Picchu.',
    actividades: ['Machu Picchu', 'Valle Sagrado', 'Montaña de Colores', 'Gastronomía andina'],
    mejorEpoca: 'Mayo a septiembre',
    emoji: '🏔️',
    colores: ['#b45309', '#f59e0b'],
  },
  {
    id: 'buenos-aires',
    nombre: 'Buenos Aires',
    pais: 'Argentina',
    continente: 'Sudamérica',
    descripcion: 'Una ciudad elegante y bulliciosa donde conviven el tango, la parrilla y las librerías.',
    actividades: ['Show de tango', 'San Telmo', 'Teatro Colón', 'Parrilladas'],
    mejorEpoca: 'Marzo a mayo',
    emoji: '💃',
    colores: ['#0369a1', '#38bdf8'],
  },
  {
    id: 'rio-de-janeiro',
    nombre: 'Río de Janeiro',
    pais: 'Brasil',
    continente: 'Sudamérica',
    descripcion: 'Playas icónicas, cerros imponentes y mucha música: la ciudad maravillosa.',
    actividades: ['Cristo Redentor', 'Pan de Azúcar', 'Playa de Ipanema', 'Samba en Lapa'],
    mejorEpoca: 'Diciembre a marzo',
    emoji: '🏖️',
    colores: ['#15803d', '#4ade80'],
  },
  {
    id: 'cartagena',
    nombre: 'Cartagena de Indias',
    pais: 'Colombia',
    continente: 'Sudamérica',
    descripcion: 'Ciudad amurallada de calles coloridas frente al mar Caribe.',
    actividades: ['Centro histórico', 'Islas del Rosario', 'Castillo San Felipe', 'Atardecer en las murallas'],
    mejorEpoca: 'Diciembre a abril',
    emoji: '🏰',
    colores: ['#be185d', '#f472b6'],
  },
  {
    id: 'cancun',
    nombre: 'Cancún',
    pais: 'México',
    continente: 'Norteamérica',
    descripcion: 'Aguas turquesa, cenotes y ruinas mayas en plena Riviera Maya.',
    actividades: ['Chichén Itzá', 'Cenotes', 'Isla Mujeres', 'Snorkel en arrecife'],
    mejorEpoca: 'Noviembre a abril',
    emoji: '🌴',
    colores: ['#0891b2', '#67e8f9'],
  },
  {
    id: 'punta-cana',
    nombre: 'Punta Cana',
    pais: 'República Dominicana',
    continente: 'Norteamérica',
    descripcion: 'Resorts frente a playas de arena blanca y palmeras, ideales para descansar.',
    actividades: ['Isla Saona', 'Playa Bávaro', 'Paseo en catamarán', 'Buceo'],
    mejorEpoca: 'Diciembre a abril',
    emoji: '🐚',
    colores: ['#0d9488', '#5eead4'],
  },
  {
    id: 'madrid',
    nombre: 'Madrid',
    pais: 'España',
    continente: 'Europa',
    descripcion: 'Museos de primer nivel, plazas llenas de vida y tapas hasta la madrugada.',
    actividades: ['Museo del Prado', 'Parque del Retiro', 'Palacio Real', 'Ruta de tapas'],
    mejorEpoca: 'Abril a junio',
    emoji: '🏛️',
    colores: ['#b91c1c', '#fb7185'],
  },
  {
    id: 'roma',
    nombre: 'Roma',
    pais: 'Italia',
    continente: 'Europa',
    descripcion: 'Dos mil años de historia en cada esquina, con la mejor pasta como recompensa.',
    actividades: ['Coliseo', 'Fontana di Trevi', 'Ciudad del Vaticano', 'Trastevere'],
    mejorEpoca: 'Abril a octubre',
    emoji: '🍝',
    colores: ['#7c3aed', '#c4b5fd'],
  },
];

// Helpers para declarar vuelos y hoteles de forma compacta.
const vuelo = (destinoId, n, aerolinea, fechaSalida, fechaRegreso, duracion, escalas, precio, asientosDisponibles) => ({
  id: `${destinoId}-v${n}`,
  destinoId,
  aerolinea,
  origen: 'Santiago (SCL)',
  fechaSalida,
  fechaRegreso,
  duracion,
  escalas,
  precio,
  asientosDisponibles,
});

const hotel = (destinoId, n, nombre, estrellas, ubicacion, precioNoche, fechaDesde, fechaHasta, habitacionesDisponibles, servicios) => ({
  id: `${destinoId}-h${n}`,
  destinoId,
  nombre,
  estrellas,
  ubicacion,
  precioNoche,
  fechaDesde,
  fechaHasta,
  habitacionesDisponibles,
  servicios,
});

export const vuelos = [
  vuelo('cusco', 1, 'LATAM', '2027-01-15', '2027-01-22', '4 h 20 min', 1, 289000, 14),
  vuelo('cusco', 2, 'Sky Airline', '2027-02-05', '2027-02-12', '5 h 10 min', 1, 245000, 3),
  vuelo('cusco', 3, 'JetSMART', '2027-03-12', '2027-03-19', '4 h 50 min', 1, 219000, 0),

  vuelo('buenos-aires', 1, 'LATAM', '2027-01-10', '2027-01-17', '2 h 10 min', 0, 169000, 22),
  vuelo('buenos-aires', 2, 'Aerolíneas Argentinas', '2027-02-20', '2027-02-27', '2 h 05 min', 0, 182000, 9),
  vuelo('buenos-aires', 3, 'JetSMART', '2027-03-06', '2027-03-13', '2 h 15 min', 0, 129000, 2),

  vuelo('rio-de-janeiro', 1, 'LATAM', '2027-01-20', '2027-01-30', '4 h 40 min', 0, 359000, 11),
  vuelo('rio-de-janeiro', 2, 'GOL', '2027-02-08', '2027-02-18', '6 h 30 min', 1, 318000, 6),
  vuelo('rio-de-janeiro', 3, 'Sky Airline', '2027-03-15', '2027-03-24', '6 h 55 min', 1, 295000, 0),

  vuelo('cartagena', 1, 'Avianca', '2027-01-12', '2027-01-21', '7 h 30 min', 1, 489000, 8),
  vuelo('cartagena', 2, 'LATAM', '2027-02-14', '2027-02-23', '8 h 05 min', 1, 512000, 15),
  vuelo('cartagena', 3, 'Copa Airlines', '2027-03-20', '2027-03-29', '8 h 40 min', 1, 465000, 4),

  vuelo('cancun', 1, 'LATAM', '2027-01-25', '2027-02-04', '10 h 30 min', 1, 649000, 12),
  vuelo('cancun', 2, 'Copa Airlines', '2027-02-10', '2027-02-19', '11 h 15 min', 1, 598000, 5),
  vuelo('cancun', 3, 'Aeroméxico', '2027-03-03', '2027-03-12', '12 h 00 min', 1, 575000, 1),

  vuelo('punta-cana', 1, 'Copa Airlines', '2027-01-18', '2027-01-28', '9 h 40 min', 1, 612000, 10),
  vuelo('punta-cana', 2, 'Avianca', '2027-02-12', '2027-02-21', '10 h 20 min', 1, 585000, 7),
  vuelo('punta-cana', 3, 'LATAM', '2027-03-08', '2027-03-17', '10 h 45 min', 1, 640000, 0),

  vuelo('madrid', 1, 'Iberia', '2027-04-02', '2027-04-16', '13 h 10 min', 0, 989000, 18),
  vuelo('madrid', 2, 'LATAM', '2027-04-20', '2027-05-04', '13 h 30 min', 0, 945000, 6),
  vuelo('madrid', 3, 'Air Europa', '2027-05-10', '2027-05-24', '15 h 25 min', 1, 879000, 3),

  vuelo('roma', 1, 'ITA Airways', '2027-05-05', '2027-05-18', '16 h 40 min', 1, 1049000, 9),
  vuelo('roma', 2, 'Iberia', '2027-05-25', '2027-06-07', '17 h 15 min', 1, 998000, 2),
  vuelo('roma', 3, 'KLM', '2027-06-14', '2027-06-27', '18 h 05 min', 1, 1085000, 0),
];

export const hoteles = [
  hotel('cusco', 1, 'Casa Andina Premium', 5, 'Centro histórico', 118000, '2027-01-01', '2027-03-31', 6, ['Desayuno', 'Wi-Fi', 'Oxígeno en habitación']),
  hotel('cusco', 2, 'Hostal Plaza de Armas', 3, 'Plaza de Armas', 52000, '2027-01-01', '2027-03-31', 12, ['Desayuno', 'Wi-Fi']),
  hotel('cusco', 3, 'Inkaterra La Casona', 5, 'San Blas', 165000, '2027-02-01', '2027-03-31', 0, ['Spa', 'Desayuno', 'Terraza']),

  hotel('buenos-aires', 1, 'Alvear Palace Hotel', 5, 'Recoleta', 142000, '2027-01-01', '2027-03-31', 4, ['Spa', 'Desayuno', 'Gimnasio']),
  hotel('buenos-aires', 2, 'Hotel Palermo Soho', 4, 'Palermo', 78000, '2027-01-01', '2027-03-31', 9, ['Wi-Fi', 'Desayuno', 'Piscina']),
  hotel('buenos-aires', 3, 'Hostel San Telmo', 2, 'San Telmo', 31000, '2027-01-01', '2027-03-31', 15, ['Wi-Fi', 'Cocina compartida']),

  hotel('rio-de-janeiro', 1, 'Copacabana Palace', 5, 'Copacabana', 210000, '2027-01-01', '2027-03-31', 3, ['Piscina', 'Spa', 'Frente al mar']),
  hotel('rio-de-janeiro', 2, 'Ipanema Beach Hotel', 4, 'Ipanema', 98000, '2027-01-01', '2027-03-31', 8, ['Desayuno', 'Wi-Fi', 'Piscina']),
  hotel('rio-de-janeiro', 3, 'Lapa Urban Stay', 3, 'Lapa', 54000, '2027-01-01', '2027-03-31', 0, ['Wi-Fi', 'Aire acondicionado']),

  hotel('cartagena', 1, 'Hotel Santa Clara', 5, 'Ciudad amurallada', 185000, '2027-01-01', '2027-03-31', 5, ['Piscina', 'Desayuno', 'Spa']),
  hotel('cartagena', 2, 'Casa Getsemaní', 3, 'Getsemaní', 62000, '2027-01-01', '2027-03-31', 11, ['Wi-Fi', 'Aire acondicionado']),
  hotel('cartagena', 3, 'Bocagrande Suites', 4, 'Bocagrande', 96000, '2027-01-01', '2027-03-31', 7, ['Frente al mar', 'Piscina', 'Gimnasio']),

  hotel('cancun', 1, 'Riviera Beach Resort', 5, 'Zona Hotelera', 230000, '2027-01-01', '2027-03-31', 10, ['Todo incluido', 'Piscina', 'Club infantil']),
  hotel('cancun', 2, 'Hotel Centro Maya', 3, 'Centro de Cancún', 58000, '2027-01-01', '2027-03-31', 14, ['Wi-Fi', 'Desayuno']),
  hotel('cancun', 3, 'Isla Mujeres Boutique', 4, 'Isla Mujeres', 120000, '2027-02-01', '2027-03-31', 2, ['Desayuno', 'Terraza', 'Snorkel']),

  hotel('punta-cana', 1, 'Bávaro Palace All Inclusive', 5, 'Playa Bávaro', 260000, '2027-01-01', '2027-03-31', 8, ['Todo incluido', 'Piscina', 'Spa']),
  hotel('punta-cana', 2, 'Coral Reef Hotel', 4, 'Cabeza de Toro', 135000, '2027-01-01', '2027-03-31', 6, ['Desayuno', 'Piscina']),
  hotel('punta-cana', 3, 'Casa Caribe Apartamentos', 3, 'Los Corales', 72000, '2027-01-01', '2027-03-31', 0, ['Cocina', 'Wi-Fi']),

  hotel('madrid', 1, 'Gran Vía Palace', 5, 'Gran Vía', 190000, '2027-04-01', '2027-06-30', 7, ['Desayuno', 'Gimnasio', 'Wi-Fi']),
  hotel('madrid', 2, 'Hotel Retiro Park', 4, 'Barrio de las Letras', 115000, '2027-04-01', '2027-06-30', 10, ['Desayuno', 'Wi-Fi']),
  hotel('madrid', 3, 'Hostal Malasaña', 2, 'Malasaña', 54000, '2027-04-01', '2027-06-30', 4, ['Wi-Fi', 'Aire acondicionado']),

  hotel('roma', 1, 'Hotel Colosseo Luxury', 5, 'Monti', 245000, '2027-05-01', '2027-06-30', 3, ['Desayuno', 'Terraza', 'Spa']),
  hotel('roma', 2, 'Trastevere Inn', 3, 'Trastevere', 98000, '2027-05-01', '2027-06-30', 9, ['Wi-Fi', 'Desayuno']),
  hotel('roma', 3, 'Vaticano Suites', 4, 'Prati', 152000, '2027-05-01', '2027-06-30', 0, ['Wi-Fi', 'Gimnasio', 'Aire acondicionado']),
];
