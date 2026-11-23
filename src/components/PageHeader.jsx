export default function PageHeader({ titulo, descripcion, children }) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-900">{titulo}</h1>
        {descripcion && <p className="mt-1 max-w-2xl text-slate-600">{descripcion}</p>}
      </div>
      {children}
    </header>
  );
}
