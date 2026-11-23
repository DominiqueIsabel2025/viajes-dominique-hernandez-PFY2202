
import { useCallback, useEffect, useState } from 'react';

// Hook genérico para consumir la API REST.
export default function useRest(peticion, dependencias = []) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let cancelado = false;

    setCargando(true);
    setError(null);

    peticion()
      .then((resultado) => {
        if (!cancelado) {
          setDatos(resultado);
        }
      })
      .catch((err) => {
        if (!cancelado) {
          setError(
            err.message || 'No se pudo conectar con el servidor'
          );
        }
      })
      .finally(() => {
        if (!cancelado) {
          setCargando(false);
        }
      });

    return () => {
      cancelado = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intento, ...dependencias]);

  const reintentar = useCallback(() => {
    setIntento((n) => n + 1);
  }, []);

  return { datos, cargando, error, reintentar };
}
