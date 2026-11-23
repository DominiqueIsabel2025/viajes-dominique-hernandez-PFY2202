import { Link } from 'react-router-dom';
import { useViaje } from '../context/ViajeContext';
import { formatearFecha, formatearPrecio } from '../utils/formato';

// Panel lateral con lo que el usuario lleva elegido hasta el momento.
export default function ResumenViaje() {
  const { viaje, resumen } = useViaje();
  const { destino, vuelo, hotel } = viaje;

  return (
    <aside className="card lg:sticky lg:top-24" aria-label="Resumen de tu viaje">
      <h2 className="text-lg font-bold text-brand-900">Tu viaje</h2>
      <dl className="mt-3 space-y-3 text-sm">
        <div>
          <dt className="text-slate-500">Destino</dt>
          <dd className="font-semibold">{destino ? `${destino.nombre}, ${destino.pais}` : '—'}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Vuelo</dt>
          <dd className="font-semibold">
            {vuelo ? `${vuelo.aerolinea} · ${formatearFecha(vuelo.fechaSalida)}` : 'Aún sin elegir'}
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">Hotel (opcional)</dt>
          <dd className="font-semibold">{hotel ? hotel.nombre : 'Aún sin elegir'}</dd>
        </div>
      </dl>
      <p className="mt-4 border-t border-brand-100 pt-3 text-sm text-slate-500">
        Total estimado
        <span className="block text-2xl font-extrabold text-brand-800">{formatearPrecio(resumen.total)}</span>
      </p>
      <Link
        to="/mi-viaje"
        aria-disabled={!vuelo}
        className={`btn btn-accent mt-4 w-full ${!vuelo ? 'pointer-events-none opacity-50' : ''}`}
        tabIndex={vuelo ? 0 : -1}
      >
        Revisar mi viaje
      </Link>
      {!vuelo && <p className="mt-2 text-center text-xs text-slate-500">Elige un vuelo para continuar.</p>}
    </aside>
  );
}
