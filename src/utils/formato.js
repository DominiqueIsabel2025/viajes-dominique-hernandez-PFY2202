const formatoPrecio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

export const formatearPrecio = (valor) => formatoPrecio.format(valor);

// Las fechas llegan como "AAAA-MM-DD"; se agrega la hora para evitar desfases de zona horaria.
export const formatearFecha = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' });

export const calcularNoches = (desde, hasta) =>
  Math.max(1, Math.round((new Date(`${hasta}T12:00:00`) - new Date(`${desde}T12:00:00`)) / 86400000));
