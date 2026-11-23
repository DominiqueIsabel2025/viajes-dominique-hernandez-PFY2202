// Etiqueta de disponibilidad: agotado / pocas unidades / disponible.
export default function Disponibilidad({ cantidad, unidad }) {
  if (cantidad <= 0) {
    return <span className="etiqueta bg-slate-200 text-slate-600">Agotado</span>;
  }
  if (cantidad <= 3) {
    return (
      <span className="etiqueta bg-sol-100 text-sol-600">
        ¡Quedan {cantidad} {unidad}!
      </span>
    );
  }
  return (
    <span className="etiqueta bg-emerald-100 text-emerald-700">
      {cantidad} {unidad} disponibles
    </span>
  );
}
