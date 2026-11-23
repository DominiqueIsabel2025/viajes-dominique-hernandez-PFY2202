import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Cargando from '../components/Cargando';
import HotelesLista from '../components/HotelesLista';
import MensajeError from '../components/MensajeError';
import ResumenViaje from '../components/ResumenViaje';
import VuelosLista from '../components/VuelosLista';
import { useViaje } from '../context/ViajeContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useDestino } from '../hooks/useDestinos';

const PESTANAS = [
  { id: 'vuelos', etiqueta: '✈️ Vuelos' },
  { id: 'hoteles', etiqueta: '🏨 Hoteles' },
];

// Detalle del destino: datos por REST + vuelos y hoteles por GraphQL.
export default function DetalleDestino() {
  const { destinoId } = useParams();
  const { datos: destino, cargando, error, reintentar } = useDestino(destinoId);
  const { elegirDestino } = useViaje();
  useDocumentTitle(destino?.nombre);
  const [pestana, setPestana] = useState('vuelos');

  // Cuando el destino carga, queda registrado como parte del viaje en curso.
  useEffect(() => {
    if (destino) elegirDestino(destino);
  }, [destino, elegirDestino]);

  if (cargando) return <Cargando mensaje="Cargando destino…" />;
  if (error) {
    return (
      <>
        <MensajeError mensaje={error} onReintentar={reintentar} />
        <p className="mt-4 text-center">
          <Link to="/destinos" className="font-semibold text-brand-700 hover:underline">← Volver a destinos</Link>
        </p>
      </>
    );
  }

  return (
    <>
      <nav aria-label="Ruta de navegación" className="mb-4 text-sm text-slate-500">
        <Link to="/destinos" className="hover:underline">Destinos</Link> / <span className="font-semibold text-slate-700">{destino.nombre}</span>
      </nav>

      <section
        className="portada rounded-3xl p-8 text-white shadow-lg sm:p-10"
        style={{ background: `linear-gradient(135deg, ${destino.colores[0]}, ${destino.colores[1]})` }}
      >
        <span className="pointer-events-none absolute -right-4 -top-6 z-0 select-none text-[11rem] leading-none opacity-25" aria-hidden="true">
          {destino.emoji}
        </span>
        <div className="relative z-10">
          <p className="inline-block rounded-full bg-black/20 px-3 py-1 text-xs font-bold uppercase tracking-widest backdrop-blur">
            {destino.continente}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{destino.nombre}</h1>
          <p className="mt-1 font-semibold text-white/90">📍 {destino.pais}</p>
          <p className="mt-4 max-w-2xl text-lg text-white/95">{destino.descripcion}</p>
          <p className="mt-4 inline-block rounded-xl bg-white/20 px-3 py-1.5 text-sm backdrop-blur">
            🗓️ Mejor época: <strong>{destino.mejorEpoca}</strong>
          </p>
        </div>
      </section>

      <section className="mt-6" aria-labelledby="actividades">
        <h2 id="actividades" className="text-lg font-bold text-brand-900">Actividades populares</h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {destino.actividades.map((actividad) => (
            <li key={actividad} className="etiqueta !px-3.5 !py-1.5 bg-white text-brand-800 shadow-sm ring-1 ring-brand-100">
              {actividad}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
        <div>
          <div role="tablist" aria-label="Opciones de viaje" className="mb-6 flex gap-2">
            {PESTANAS.map(({ id, etiqueta }) => (
              <button
                key={id}
                role="tab"
                type="button"
                id={`pestana-${id}`}
                aria-selected={pestana === id}
                aria-controls={`panel-${id}`}
                onClick={() => setPestana(id)}
                className={`chip !px-5 !py-2 ${pestana === id ? 'chip-activo' : ''}`}
              >
                {etiqueta}
              </button>
            ))}
          </div>
          <div role="tabpanel" id={`panel-${pestana}`} aria-labelledby={`pestana-${pestana}`}>
            {pestana === 'vuelos' ? <VuelosLista destinoId={destino.id} /> : <HotelesLista destinoId={destino.id} />}
          </div>
        </div>
        <ResumenViaje />
      </div>
    </>
  );
}
