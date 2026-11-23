import { GraphQLError } from 'graphql';
import { destinos, hoteles as hotelesBase, vuelos as vuelosBase } from './data';

// Copias en memoria: la mutación "reservarViaje" modifica la disponibilidad
// mientras la página siga abierta, como lo haría un servidor real.
let vuelos = [];
let hoteles = [];
let contadorReservas = 0;

export function reiniciarBaseDeDatos() {
  vuelos = vuelosBase.map((v) => ({ ...v }));
  hoteles = hotelesBase.map((h) => ({ ...h }));
  contadorReservas = 0;
}
reiniciarBaseDeDatos();

const vueloConDisponibilidad = (vuelo) => ({ ...vuelo, disponible: vuelo.asientosDisponibles > 0 });
const hotelConDisponibilidad = (hotel) => ({ ...hotel, disponible: hotel.habitacionesDisponibles > 0 });

function validarDestino(destinoId) {
  if (!destinos.some((d) => d.id === destinoId)) {
    throw new GraphQLError(`El destino "${destinoId}" no existe`, { extensions: { code: 'DESTINO_NO_ENCONTRADO' } });
  }
}

const diasEntre = (desde, hasta) => Math.max(1, Math.round((new Date(hasta) - new Date(desde)) / 86400000));

// Resolvers: cada función responde a un campo de Query o Mutation.
export const resolvers = {
  vuelosPorDestino: ({ destinoId }) => {
    validarDestino(destinoId);
    return vuelos.filter((v) => v.destinoId === destinoId).map(vueloConDisponibilidad);
  },

  hotelesPorDestino: ({ destinoId }) => {
    validarDestino(destinoId);
    return hoteles.filter((h) => h.destinoId === destinoId).map(hotelConDisponibilidad);
  },

  reservarViaje: ({ vueloId, hotelId, pasajeros }) => {
    const vuelo = vuelos.find((v) => v.id === vueloId);
    if (!vuelo) throw new GraphQLError('El vuelo seleccionado no existe');
    if (pasajeros < 1) throw new GraphQLError('Debes viajar al menos con 1 pasajero');
    if (vuelo.asientosDisponibles < pasajeros) {
      throw new GraphQLError(`Solo quedan ${vuelo.asientosDisponibles} asientos en este vuelo`, {
        extensions: { code: 'SIN_DISPONIBILIDAD' },
      });
    }

    const hotel = hotelId ? hoteles.find((h) => h.id === hotelId) : null;
    if (hotelId && !hotel) throw new GraphQLError('El hotel seleccionado no existe');
    if (hotel && hotel.habitacionesDisponibles < 1) {
      throw new GraphQLError('El hotel seleccionado ya no tiene habitaciones', { extensions: { code: 'SIN_DISPONIBILIDAD' } });
    }

    const noches = diasEntre(vuelo.fechaSalida, vuelo.fechaRegreso);
    const total = vuelo.precio * pasajeros + (hotel ? hotel.precioNoche * noches : 0);

    vuelo.asientosDisponibles -= pasajeros;
    if (hotel) hotel.habitacionesDisponibles -= 1;
    contadorReservas += 1;

    return {
      codigo: `RS-${1000 + contadorReservas}`,
      vuelo: vueloConDisponibilidad(vuelo),
      hotel: hotel ? hotelConDisponibilidad(hotel) : null,
      pasajeros,
      noches,
      total,
      estado: 'CONFIRMADA',
    };
  },
};
