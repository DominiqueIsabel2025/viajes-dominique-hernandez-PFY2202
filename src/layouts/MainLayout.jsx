import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  // Al cambiar de ruta se vuelve al inicio de la página.
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Enlace para saltar la navegación con teclado (se muestra solo al recibir foco) */}
      <button
        type="button"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-brand-800"
        onClick={() => document.getElementById('contenido')?.focus()}
      >
        Saltar al contenido
      </button>
      <Navbar />
      <main id="contenido" tabIndex={-1} className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 focus:outline-none">
        <Outlet />
      </main>
      <footer className="mt-8 bg-brand-900 text-brand-100">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-sm md:grid-cols-3">
          <div>
            <p className="text-lg font-extrabold text-white">🧭 Rumbo Sur</p>
            <p className="mt-1 text-brand-200">Planifica vuelos y hoteles en un solo lugar.</p>
          </div>
          <nav aria-label="Enlaces del pie de página">
            <p className="font-bold text-white">Navegación</p>
            <ul className="mt-1 space-y-1">
              <li><Link to="/destinos" className="hover:underline">Destinos</Link></li>
              <li><Link to="/mi-viaje" className="hover:underline">Mi viaje</Link></li>
            </ul>
          </nav>
          <div>
            <p className="font-bold text-white">Proyecto académico</p>
            <p className="mt-1 text-brand-200">Desarrollo Frontend II (PFY2202) · Dominique Hernandez</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
