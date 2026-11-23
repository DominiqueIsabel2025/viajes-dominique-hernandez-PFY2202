import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import { OBTENER_VUELOS } from '../graphql/queries';
import { useViaje } from '../context/ViajeContext';
import Cargando from './Cargando';
import EstadoVacio from './EstadoVacio';
import MensajeError from './MensajeError';
import VueloCard from './VueloCard';

const ORDENES = {
  fecha: { etiqueta: 'Fecha de salida', fn: (a, b) => a.fechaSalida.localeCompare(b.fechaSalida) },
  precio: { etiqueta: 'Menor precio', fn: (a, b) => a.precio - b.precio },
};

// Vuelos del destino, obtenidos con GraphQL (Apollo Client).
export default function VuelosLista({ destinoId }) {
  const { viaje, elegirVuelo } = useViaje();
  const [orden, setOrden] = useState('fecha');
  const [soloDisponibles, setSoloDisponibles] = useState(false);

  const { data, loading, error, refetch } = useQuery(OBTENER_VUELOS, {
    variables: { destinoId },
    // Muestra lo guardado en caché y siempre confirma con el servidor (la disponibilidad cambia al reservar).
    fetchPolicy: 'cache-and-network',
  });

  // Lista derivada: no se modifica el resultado original de la consulta.
  const vuelos = useMemo(() => {
    const lista = data?.vuelosPorDestino ?? [];
    const filtrada = soloDisponibles ? lista.filter((v) => v.disponible) : lista;
    return [...filtrada].sort(ORDENES[orden].fn);
  }, [data, orden, soloDisponibles]);

  if (loading && !data) return <Cargando mensaje="Buscando vuelos disponibles…" />;
  if (error) return <MensajeError mensaje={error.message} onReintentar={() => refetch()} />;

  return (
    <section aria-labelledby="titulo-vuelos">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 id="titulo-vuelos" className="text-xl font-bold text-brand-900">
          Vuelos disponibles ({vuelos.length})
        </h2>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={soloDisponibles} onChange={(e) => setSoloDisponibles(e.target.checked)} className="h-4 w-4 accent-brand-700" />
            Solo con cupos
          </label>
          <label className="flex items-center gap-2">
            Ordenar por
            <select value={orden} onChange={(e) => setOrden(e.target.value)} className="input !w-auto !py-1.5">
              {Object.entries(ORDENES).map(([clave, { etiqueta }]) => (
                <option key={clave} value={clave}>
                  {etiqueta}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {vuelos.length === 0 ? (
        <EstadoVacio titulo="No hay vuelos con esos filtros" descripcion="Desactiva el filtro de cupos para ver todos los vuelos." />
      ) : (
        <div className="space-y-4">
          {vuelos.map((vuelo) => (
            <VueloCard key={vuelo.id} vuelo={vuelo} seleccionado={viaje.vuelo?.id === vuelo.id} onElegir={elegirVuelo} />
          ))}
        </div>
      )}
    </section>
  );
}
