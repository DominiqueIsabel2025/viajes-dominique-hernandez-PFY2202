import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import { OBTENER_HOTELES } from '../graphql/queries';
import { useViaje } from '../context/ViajeContext';
import Cargando from './Cargando';
import EstadoVacio from './EstadoVacio';
import HotelCard from './HotelCard';
import MensajeError from './MensajeError';

// Hoteles del destino, obtenidos con GraphQL (Apollo Client).
export default function HotelesLista({ destinoId }) {
  const { viaje, elegirHotel, quitarHotel } = useViaje();
  const [estrellasMin, setEstrellasMin] = useState(0);

  const { data, loading, error, refetch } = useQuery(OBTENER_HOTELES, {
    variables: { destinoId },
    // Muestra lo guardado en caché y siempre confirma con el servidor (la disponibilidad cambia al reservar).
    fetchPolicy: 'cache-and-network',
  });

  const hoteles = useMemo(() => {
    const lista = data?.hotelesPorDestino ?? [];
    return lista.filter((h) => h.estrellas >= estrellasMin).sort((a, b) => a.precioNoche - b.precioNoche);
  }, [data, estrellasMin]);

  if (loading && !data) return <Cargando mensaje="Buscando hoteles disponibles…" />;
  if (error) return <MensajeError mensaje={error.message} onReintentar={() => refetch()} />;

  return (
    <section aria-labelledby="titulo-hoteles">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 id="titulo-hoteles" className="text-xl font-bold text-brand-900">
          Hoteles disponibles ({hoteles.length})
        </h2>
        <label className="flex items-center gap-2 text-sm">
          Categoría mínima
          <select value={estrellasMin} onChange={(e) => setEstrellasMin(Number(e.target.value))} className="input !w-auto !py-1.5">
            <option value={0}>Todas</option>
            <option value={3}>3 estrellas o más</option>
            <option value={4}>4 estrellas o más</option>
            <option value={5}>5 estrellas</option>
          </select>
        </label>
      </div>

      {hoteles.length === 0 ? (
        <EstadoVacio titulo="No hay hoteles en esa categoría" descripcion="Prueba con una categoría menor." />
      ) : (
        <div className="space-y-4">
          {hoteles.map((hotel) => {
            const elegido = viaje.hotel?.id === hotel.id;
            return <HotelCard key={hotel.id} hotel={hotel} seleccionado={elegido} onElegir={elegido ? quitarHotel : elegirHotel} />;
          })}
        </div>
      )}
    </section>
  );
}
