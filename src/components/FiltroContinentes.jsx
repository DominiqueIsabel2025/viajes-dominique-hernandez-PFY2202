import { useMemo } from 'react';

// Chips para filtrar por continente. Se generan a partir de los datos recibidos.
export default function FiltroContinentes({ destinos, seleccionado, onSeleccionar }) {
  const continentes = useMemo(() => ['Todos', ...new Set(destinos.map((d) => d.continente))], [destinos]);

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por continente">
      {continentes.map((continente) => (
        <button
          key={continente}
          type="button"
          aria-pressed={seleccionado === continente}
          onClick={() => onSeleccionar(continente)}
          className={`chip ${seleccionado === continente ? 'chip-activo' : ''}`}
        >
          {continente}
        </button>
      ))}
    </div>
  );
}
