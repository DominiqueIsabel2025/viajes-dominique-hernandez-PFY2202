import Button from './Button';

// Mensaje de error con opción de reintentar la operación fallida.
export default function MensajeError({ mensaje, onReintentar }) {
  return (
    <div role="alert" className="mx-auto max-w-lg rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
      <p className="text-2xl" aria-hidden="true">⚠️</p>
      <h3 className="mt-1 font-bold text-red-800">Ocurrió un problema</h3>
      <p className="mt-1 text-sm text-red-700">{mensaje}</p>
      {onReintentar && (
        <Button variant="secondary" className="mt-4" onClick={onReintentar}>
          Reintentar
        </Button>
      )}
    </div>
  );
}
