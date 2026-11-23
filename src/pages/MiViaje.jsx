import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import EstadoVacio from '../components/EstadoVacio';
import PageHeader from '../components/PageHeader';
import { useViaje } from '../context/ViajeContext';
import { RESERVAR_VIAJE } from '../graphql/queries';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { formatearFecha, formatearPrecio } from '../utils/formato';

// Resumen del viaje y confirmación mediante una mutation de GraphQL.
export default function MiViaje() {
  useDocumentTitle('Mi viaje');
  const { viaje, resumen, cambiarPasajeros, quitarHotel, reiniciarViaje } = useViaje();
  const { destino, vuelo, hotel, pasajeros } = viaje;
  const [reserva, setReserva] = useState(null);

  const [reservar, { loading, error }] = useMutation(RESERVAR_VIAJE, {
    onCompleted: (data) => {
      setReserva(data.reservarViaje);
      reiniciarViaje();
    },
  });

  const confirmar = () =>
    reservar({ variables: { vueloId: vuelo.id, hotelId: hotel?.id ?? null, pasajeros } }).catch(() => {
      /* el error queda disponible en `error` y se muestra en pantalla */
    });

  if (reserva) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-sm">
        <p className="text-5xl" aria-hidden="true">🎉</p>
        <h1 className="mt-2 text-2xl font-extrabold text-brand-900">¡Reserva confirmada!</h1>
        <p className="mt-1 text-slate-600">Tu código de reserva es</p>
        <p className="my-3 rounded-xl bg-brand-50 py-3 text-3xl font-extrabold tracking-widest text-brand-800">{reserva.codigo}</p>
        <p className="text-sm text-slate-600">
          {reserva.pasajeros} pasajero(s) · {reserva.noches} noches · Total <strong>{formatearPrecio(reserva.total)}</strong>
        </p>
        <Link to="/destinos" className="btn btn-primary mt-6">Seguir explorando</Link>
      </div>
    );
  }

  if (!vuelo) {
    return (
      <>
        <PageHeader titulo="Mi viaje" />
        <EstadoVacio titulo="Todavía no has elegido un vuelo" descripcion="Selecciona un destino y elige un vuelo para armar tu viaje.">
          <Link to="/destinos" className="btn btn-primary">Ver destinos</Link>
        </EstadoVacio>
      </>
    );
  }

  return (
    <>
      <PageHeader titulo="Mi viaje" descripcion={`Revisa los detalles de tu viaje a ${destino?.nombre ?? 'tu destino'} antes de confirmar.`} />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          <section className="card" aria-labelledby="mi-vuelo">
            <h2 id="mi-vuelo" className="font-bold text-brand-900">✈️ Vuelo</h2>
            <p className="mt-1 font-semibold">{vuelo.aerolinea} · {vuelo.origen} → {destino?.nombre}</p>
            <p className="text-sm text-slate-600">
              Ida {formatearFecha(vuelo.fechaSalida)} · Regreso {formatearFecha(vuelo.fechaRegreso)} · {vuelo.duracion}
            </p>
            <p className="mt-1 text-sm text-slate-600">{formatearPrecio(vuelo.precio)} por pasajero</p>
          </section>

          <section className="card" aria-labelledby="mi-hotel">
            <h2 id="mi-hotel" className="font-bold text-brand-900">🏨 Hotel</h2>
            {hotel ? (
              <>
                <p className="mt-1 font-semibold">{hotel.nombre} · {hotel.ubicacion}</p>
                <p className="text-sm text-slate-600">{formatearPrecio(hotel.precioNoche)} por noche · {resumen.noches} noches</p>
                <Button variant="secondary" className="mt-3" onClick={quitarHotel}>Quitar hotel</Button>
              </>
            ) : (
              <p className="mt-1 text-sm text-slate-600">
                No has elegido hotel. <Link to={`/destinos/${destino?.id}`} className="font-semibold text-brand-700 hover:underline">Ver hoteles</Link>
              </p>
            )}
          </section>

          <section className="card" aria-labelledby="mis-pasajeros">
            <h2 id="mis-pasajeros" className="font-bold text-brand-900">👥 Pasajeros</h2>
            <div className="mt-2 flex items-center gap-3">
              <Button variant="secondary" aria-label="Quitar un pasajero" disabled={pasajeros <= 1} onClick={() => cambiarPasajeros(pasajeros - 1)}>−</Button>
              <span className="w-8 text-center text-lg font-bold" aria-live="polite">{pasajeros}</span>
              <Button variant="secondary" aria-label="Agregar un pasajero" disabled={pasajeros >= vuelo.asientosDisponibles} onClick={() => cambiarPasajeros(pasajeros + 1)}>+</Button>
              <span className="text-sm text-slate-500">máx. {vuelo.asientosDisponibles} por disponibilidad</span>
            </div>
          </section>
        </div>

        <aside className="card h-fit" aria-label="Detalle del precio">
          <h2 className="text-lg font-bold text-brand-900">Resumen de pago</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between"><dt>Vuelos ({pasajeros})</dt><dd>{formatearPrecio(resumen.totalVuelo)}</dd></div>
            <div className="flex justify-between"><dt>Hotel ({resumen.noches} noches)</dt><dd>{formatearPrecio(resumen.totalHotel)}</dd></div>
            <div className="flex justify-between border-t border-brand-100 pt-2 text-lg font-extrabold text-brand-800">
              <dt>Total</dt><dd>{formatearPrecio(resumen.total)}</dd>
            </div>
          </dl>
          {error && <p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error.message}</p>}
          <Button variant="accent" className="mt-4 w-full" disabled={loading} onClick={confirmar}>
            {loading ? 'Confirmando…' : 'Confirmar reserva'}
          </Button>
          <Button variant="secondary" className="mt-2 w-full" onClick={reiniciarViaje}>Cancelar viaje</Button>
        </aside>
      </div>
    </>
  );
}
