import { gql } from '@apollo/client';

// Cada consulta pide únicamente los campos que la interfaz necesita.
export const OBTENER_VUELOS = gql`
  query ObtenerVuelos($destinoId: ID!) {
    vuelosPorDestino(destinoId: $destinoId) {
      id
      aerolinea
      origen
      fechaSalida
      fechaRegreso
      duracion
      escalas
      precio
      asientosDisponibles
      disponible
    }
  }
`;

export const OBTENER_HOTELES = gql`
  query ObtenerHoteles($destinoId: ID!) {
    hotelesPorDestino(destinoId: $destinoId) {
      id
      nombre
      estrellas
      ubicacion
      precioNoche
      fechaDesde
      fechaHasta
      habitacionesDisponibles
      disponible
      servicios
    }
  }
`;

export const RESERVAR_VIAJE = gql`
  mutation ReservarViaje($vueloId: ID!, $hotelId: ID, $pasajeros: Int!) {
    reservarViaje(vueloId: $vueloId, hotelId: $hotelId, pasajeros: $pasajeros) {
      codigo
      pasajeros
      noches
      total
      estado
    }
  }
`;
