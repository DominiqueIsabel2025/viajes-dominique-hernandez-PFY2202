import { Link } from 'react-router-dom';

// Tarjeta de un destino: portada con degradado + país + actividades populares.
export default function DestinoCard({ destino }) {
  return (
    <article className="card group flex flex-col overflow-hidden !p-0 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-900/10">
      <div
        className="portada flex h-40 items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${destino.colores[0]}, ${destino.colores[1]})` }}
        aria-hidden="true"
      >
        <span className="absolute left-3 top-3 z-10 rounded-full bg-black/25 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          {destino.continente}
        </span>
        <span className="relative z-10 text-7xl drop-shadow-lg transition duration-300 group-hover:scale-110 group-hover:-rotate-6">
          {destino.emoji}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-extrabold text-brand-900">{destino.nombre}</h3>
        <p className="text-sm text-slate-500">📍 {destino.pais} · Mejor época: {destino.mejorEpoca.toLowerCase()}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`Actividades populares en ${destino.nombre}`}>
          {destino.actividades.slice(0, 3).map((actividad) => (
            <li key={actividad} className="etiqueta bg-brand-50 text-brand-800">
              {actividad}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-5">
          <Link to={`/destinos/${destino.id}`} className="btn btn-primary w-full">
            Ver vuelos y hoteles <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
