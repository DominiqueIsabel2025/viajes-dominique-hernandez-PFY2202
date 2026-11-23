import { formatearFecha, formatearPrecio } from '../utils/formato';
import Button from './Button';
import Disponibilidad from './Disponibilidad';
import Estrellas from './Estrellas';

export default function HotelCard({ hotel, seleccionado, onElegir }) {
  return (
    <article className={`card flex flex-col gap-4 sm:flex-row sm:items-center ${seleccionado ? 'ring-2 ring-brand-600' : ''}`}>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-bold text-brand-900">🏨 {hotel.nombre}</h3>
          <Disponibilidad cantidad={hotel.habitacionesDisponibles} unidad="habitaciones" />
        </div>
        <p className="mt-1 text-sm text-slate-600">
          <Estrellas cantidad={hotel.estrellas} /> · {hotel.ubicacion}
        </p>
        <p className="mt-1 text-sm text-slate-700">
          <span className="font-semibold">Fechas con cupo:</span> {formatearFecha(hotel.fechaDesde)} al {formatearFecha(hotel.fechaHasta)}
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {hotel.servicios.map((servicio) => (
            <li key={servicio} className="etiqueta bg-brand-50 text-brand-800">
              {servicio}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <p className="text-right">
          <span className="block text-2xl font-extrabold text-brand-800">{formatearPrecio(hotel.precioNoche)}</span>
          <span className="text-xs text-slate-500">por noche</span>
        </p>
        <Button
          variant={seleccionado ? 'secondary' : 'accent'}
          disabled={!hotel.disponible}
          onClick={() => onElegir(hotel)}
          aria-label={`${seleccionado ? 'Hotel elegido' : 'Elegir hotel'} ${hotel.nombre}`}
        >
          {!hotel.disponible ? 'Sin cupos' : seleccionado ? '✓ Elegido' : 'Elegir hotel'}
        </Button>
      </div>
    </article>
  );
}
