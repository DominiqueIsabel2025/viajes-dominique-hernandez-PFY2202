import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { calcularNoches } from '../utils/formato';

const ViajeContext = createContext(null);
const CLAVE = 'rumbo-sur:viaje';
const ESTADO_VACIO = { destino: null, vuelo: null, hotel: null, pasajeros: 1 };

function leerGuardado() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE));
    return guardado ? { ...ESTADO_VACIO, ...guardado } : ESTADO_VACIO;
  } catch {
    return ESTADO_VACIO;
  }
}

// Guarda el viaje que el usuario va armando (destino + vuelo + hotel) para compartirlo entre páginas.
export function ViajeProvider({ children }) {
  const [viaje, setViaje] = useState(leerGuardado);

  // Persistencia: el viaje sobrevive a recargas de la página.
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(viaje));
    } catch {
      /* si el navegador bloquea localStorage, la app sigue funcionando en memoria */
    }
  }, [viaje]);

  // Al cambiar de destino se descartan vuelo y hotel elegidos anteriormente.
  const elegirDestino = useCallback(
    (destino) =>
      setViaje((actual) => (actual.destino?.id === destino.id ? actual : { ...ESTADO_VACIO, destino })),
    []
  );
  const elegirVuelo = useCallback((vuelo) => setViaje((actual) => ({ ...actual, vuelo })), []);
  const elegirHotel = useCallback((hotel) => setViaje((actual) => ({ ...actual, hotel })), []);
  const quitarHotel = useCallback(() => setViaje((actual) => ({ ...actual, hotel: null })), []);
  const cambiarPasajeros = useCallback(
    (pasajeros) => setViaje((actual) => ({ ...actual, pasajeros: Math.max(1, pasajeros) })),
    []
  );
  const reiniciarViaje = useCallback(() => setViaje(ESTADO_VACIO), []);

  // Estado derivado: noches y total se calculan, no se guardan.
  const resumen = useMemo(() => {
    const noches = viaje.vuelo ? calcularNoches(viaje.vuelo.fechaSalida, viaje.vuelo.fechaRegreso) : 0;
    const totalVuelo = viaje.vuelo ? viaje.vuelo.precio * viaje.pasajeros : 0;
    const totalHotel = viaje.hotel ? viaje.hotel.precioNoche * noches : 0;
    return { noches, totalVuelo, totalHotel, total: totalVuelo + totalHotel };
  }, [viaje]);

  const valor = useMemo(
    () => ({ viaje, resumen, elegirDestino, elegirVuelo, elegirHotel, quitarHotel, cambiarPasajeros, reiniciarViaje }),
    [viaje, resumen, elegirDestino, elegirVuelo, elegirHotel, quitarHotel, cambiarPasajeros, reiniciarViaje]
  );

  return <ViajeContext.Provider value={valor}>{children}</ViajeContext.Provider>;
}

export function useViaje() {
  const contexto = useContext(ViajeContext);
  if (!contexto) throw new Error('useViaje debe usarse dentro de <ViajeProvider>');
  return contexto;
}
