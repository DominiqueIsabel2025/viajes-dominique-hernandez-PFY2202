import { useEffect } from 'react';

// Actualiza el título de la pestaña del navegador según la página (mejora de usabilidad y accesibilidad).
export default function useDocumentTitle(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} | Rumbo Sur` : 'Rumbo Sur | Agencia de viajes';
  }, [titulo]);
}
