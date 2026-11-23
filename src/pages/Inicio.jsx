import { Link } from 'react-router-dom';
import DestinoCard from '../components/DestinoCard';
import EsqueletoTarjetas from '../components/EsqueletoTarjetas';
import HeroIlustracion from '../components/HeroIlustracion';
import MensajeError from '../components/MensajeError';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useDestinos } from '../hooks/useDestinos';

const PASOS = [
  { icono: '🗺️', titulo: '1. Elige tu destino', texto: 'Explora ciudades de Sudamérica, Norteamérica y Europa con sus actividades más populares.' },
  { icono: '✈️', titulo: '2. Compara vuelos y hoteles', texto: 'Revisa precios, fechas y disponibilidad en tiempo real antes de decidir.' },
  { icono: '✅', titulo: '3. Confirma tu reserva', texto: 'Arma tu viaje completo, revisa el total y obtén tu código de reserva.' },
];

export default function Inicio() {
  useDocumentTitle('Inicio');
  const { datos: destinos, cargando, error, reintentar } = useDestinos();

  return (
    <>
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 shadow-xl shadow-brand-900/20">
        <div className="grid items-center gap-6 p-8 text-white sm:p-12 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-50">
              Agencia de viajes
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              Tu próximo viaje empieza con un buen <span className="text-sol-400">rumbo</span>
            </h1>
            <p className="mt-4 max-w-md text-lg text-brand-50">
              Elige un destino, compara vuelos y hoteles y planifica todo en un solo lugar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/destinos" className="btn btn-accent !px-6 !py-3 text-base">
                Explorar destinos →
              </Link>
              <Link to="/mi-viaje" className="btn !px-6 !py-3 text-base text-white ring-1 ring-white/40 hover:bg-white/10">
                Ver mi viaje
              </Link>
            </div>
          </div>
          <div className="mx-auto hidden h-72 w-full max-w-md md:block">
            <HeroIlustracion />
          </div>
        </div>
        <dl className="grid grid-cols-3 divide-x divide-white/15 border-t border-white/15 bg-black/10 text-center text-white">
          {[
            ['8', 'destinos'],
            ['24', 'vuelos'],
            ['24', 'hoteles'],
          ].map(([cifra, etiqueta]) => (
            <div key={etiqueta} className="py-4">
              <dt className="text-xs uppercase tracking-wider text-brand-100">{etiqueta}</dt>
              <dd className="text-2xl font-extrabold">{cifra}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14" aria-labelledby="como-funciona">
        <h2 id="como-funciona" className="text-2xl font-extrabold text-brand-900">¿Cómo funciona?</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {PASOS.map((paso) => (
            <div key={paso.titulo} className="card transition hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-900/10">
              <p className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-2xl" aria-hidden="true">{paso.icono}</p>
              <h3 className="mt-3 font-bold text-brand-900">{paso.titulo}</h3>
              <p className="mt-1 text-sm text-slate-600">{paso.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14" aria-labelledby="destacados">
        <div className="mb-5 flex items-end justify-between">
          <h2 id="destacados" className="text-2xl font-extrabold text-brand-900">Destinos destacados</h2>
          <Link to="/destinos" className="text-sm font-semibold text-brand-700 hover:underline">Ver todos →</Link>
        </div>
        {cargando && <EsqueletoTarjetas cantidad={3} />}
        {error && <MensajeError mensaje={error} onReintentar={reintentar} />}
        {destinos && !cargando && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinos.slice(0, 3).map((destino) => (
              <DestinoCard key={destino.id} destino={destino} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
