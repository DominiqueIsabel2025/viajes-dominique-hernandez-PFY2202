export default function EstadoVacio({ titulo, descripcion, children }) {
  return (
    <div className="rounded-2xl border border-dashed border-brand-200 bg-white p-10 text-center">
      <p className="text-3xl" aria-hidden="true">🧭</p>
      <h3 className="mt-2 font-bold text-brand-900">{titulo}</h3>
      {descripcion && <p className="mt-1 text-sm text-slate-500">{descripcion}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
