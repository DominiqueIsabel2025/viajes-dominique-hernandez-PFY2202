import { formatearFecha, formatearPrecio } from '../utils/formato';
import Button from './Button';
import Disponibilidad from './Disponibilidad';

export default function VueloCard({ vuelo, seleccionado, onElegir }) {
  return (
    <article className={`card flex flex-col gap-4 sm:flex-row sm:items-center ${seleccionado ? 'ring-2 ring-brand-600' : ''}`}>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-bold text-brand-900">✈️ {vuelo.aerolinea}</h3>
          <Disponibilidad cantidad={vuelo.asientosDisponibles} unidad="asientos" />
        </div>
        <p className="mt-1 text-sm text-slate-600">
          {vuelo.origen} → destino · {vuelo.duracion} · {vuelo.escalas === 0 ? 'Directo' : `${vuelo.escalas} escala`}
        </p>
        <p className="mt-2 text-sm text-slate-700">
          <span className="font-semibold">Ida:</span> {formatearFecha(vuelo.fechaSalida)}
          <span className="mx-2 text-slate-300">|</span>
          <span className="font-semibold">Regreso:</span> {formatearFecha(vuelo.fechaRegreso)}
        </p>
      </div>
      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <p className="text-right">
          <span className="block text-2xl font-extrabold text-brand-800">{formatearPrecio(vuelo.precio)}</span>
          <span className="text-xs text-slate-500">por pasajero</span>
        </p>
        <Button
          variant={seleccionado ? 'secondary' : 'accent'}
          disabled={!vuelo.disponible}
          onClick={() => onElegir(vuelo)}
          aria-label={`${seleccionado ? 'Vuelo elegido' : 'Elegir vuelo'} ${vuelo.aerolinea} del ${formatearFecha(vuelo.fechaSalida)}`}
        >
          {!vuelo.disponible ? 'Sin cupos' : seleccionado ? '✓ Elegido' : 'Elegir vuelo'}
        </Button>
      </div>
    </article>
  );
}
