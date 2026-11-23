// Indicador de carga accesible: se anuncia a lectores de pantalla con role="status".
export default function Cargando({ mensaje = 'Cargando…' }) {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-16 text-brand-700">
      <span className="h-9 w-9 animate-spin rounded-full border-4 border-brand-200 border-t-brand-700" aria-hidden="true" />
      <p className="text-sm font-medium">{mensaje}</p>
    </div>
  );
}
