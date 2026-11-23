export default function Estrellas({ cantidad }) {
  return (
    <span className="text-amber-500" role="img" aria-label={`${cantidad} estrellas`}>
      {'★'.repeat(cantidad)}
      <span className="text-slate-300">{'★'.repeat(5 - cantidad)}</span>
    </span>
  );
}
