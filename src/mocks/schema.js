import { buildSchema } from 'graphql';

// Esquema GraphQL del backend mock.
// El cliente decide qué campos pedir; el servidor solo responde con esos campos.
export const schema = buildSchema(/* GraphQL */ `
  type Vuelo {
    id: ID!
    destinoId: ID!
    aerolinea: String!
    origen: String!
    fechaSalida: String!
    fechaRegreso: String!
    duracion: String!
    escalas: Int!
    precio: Int!
    asientosDisponibles: Int!
    disponible: Boolean!
  }

  type Hotel {
    id: ID!
    destinoId: ID!
    nombre: String!
    estrellas: Int!
    ubicacion: String!
    precioNoche: Int!
    fechaDesde: String!
    fechaHasta: String!
    habitacionesDisponibles: Int!
    disponible: Boolean!
    servicios: [String!]!
  }

  type Reserva {
    codigo: ID!
    vuelo: Vuelo!
    hotel: Hotel
    pasajeros: Int!
    noches: Int!
    total: Int!
    estado: String!
  }

  type Query {
    vuelosPorDestino(destinoId: ID!): [Vuelo!]!
    hotelesPorDestino(destinoId: ID!): [Hotel!]!
  }

  type Mutation {
    reservarViaje(vueloId: ID!, hotelId: ID, pasajeros: Int!): Reserva!
  }
`);
