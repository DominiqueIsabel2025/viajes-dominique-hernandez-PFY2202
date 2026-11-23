// Marcadores de posición animados mientras llegan los destinos (se ve más fluido que un spinner).
export default function EsqueletoTarjetas({ cantidad = 3 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Cargando destinos">
      {Array.from({ length: cantidad }, (_, i) => (
        <div key={i} className="card animate-pulse overflow-hidden !p-0">
          <div className="h-36 bg-brand-100" />
          <div className="space-y-3 p-5">
            <div className="h-3 w-1/3 rounded bg-brand-100" />
            <div className="h-5 w-2/3 rounded bg-brand-100" />
            <div className="h-3 w-1/2 rounded bg-brand-100" />
            <div className="h-10 rounded-xl bg-brand-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
