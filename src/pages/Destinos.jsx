import { useMemo, useState } from 'react';
import EsqueletoTarjetas from '../components/EsqueletoTarjetas';
import DestinoCard from '../components/DestinoCard';
import EstadoVacio from '../components/EstadoVacio';
import FiltroContinentes from '../components/FiltroContinentes';
import MensajeError from '../components/MensajeError';
import PageHeader from '../components/PageHeader';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useDestinos } from '../hooks/useDestinos';

// Listado de destinos (API REST) con búsqueda y filtro por continente.
export default function Destinos() {
  useDocumentTitle('Destinos');
  const { datos: destinos, cargando, error, reintentar } = useDestinos();
  const [busqueda, setBusqueda] = useState('');
  const [continente, setContinente] = useState('Todos');

  const visibles = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    return (destinos ?? []).filter((d) => {
      const coincideContinente = continente === 'Todos' || d.continente === continente;
      const coincideTexto = !texto || `${d.nombre} ${d.pais} ${d.actividades.join(' ')}`.toLowerCase().includes(texto);
      return coincideContinente && coincideTexto;
    });
  }, [destinos, busqueda, continente]);

  return (
    <>
      <PageHeader titulo="Destinos" descripcion="Elige un destino para ver los vuelos y hoteles disponibles." />

      {cargando && <EsqueletoTarjetas cantidad={6} />}
      {error && <MensajeError mensaje={error} onReintentar={reintentar} />}

      {destinos && (
        <>
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <FiltroContinentes destinos={destinos} seleccionado={continente} onSeleccionar={setContinente} />
            <div className="md:w-80">
              <label htmlFor="busqueda" className="sr-only">Buscar destino, país o actividad</label>
              <input
                id="busqueda"
                type="search"
                className="input"
                placeholder="Buscar destino, país o actividad…"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>

          <p className="mb-4 text-sm text-slate-500" aria-live="polite">
            Mostrando {visibles.length} de {destinos.length} destinos.
          </p>

          {visibles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibles.map((destino) => (
                <DestinoCard key={destino.id} destino={destino} />
              ))}
            </div>
          ) : (
            <EstadoVacio titulo="No encontramos destinos" descripcion="Prueba con otra búsqueda o cambia el continente." />
          )}
        </>
      )}
    </>
  );
}
