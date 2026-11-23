import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Cargando from '../components/Cargando';
import MainLayout from '../layouts/MainLayout';

// Carga diferida: cada página se descarga solo cuando se visita su ruta.
const Inicio = lazy(() => import('../pages/Inicio'));
const Destinos = lazy(() => import('../pages/Destinos'));
const DetalleDestino = lazy(() => import('../pages/DetalleDestino'));
const MiViaje = lazy(() => import('../pages/MiViaje'));
const NoEncontrada = lazy(() => import('../pages/NoEncontrada'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Cargando />}>
      <Routes>
        {/* Layout común (navbar + footer); las páginas se renderizan en <Outlet /> */}
        <Route element={<MainLayout />}>
          <Route index element={<Inicio />} />
          <Route path="destinos" element={<Destinos />} />
          {/* Ruta dinámica: /destinos/cusco, /destinos/roma, ... */}
          <Route path="destinos/:destinoId" element={<DetalleDestino />} />
          <Route path="mi-viaje" element={<MiViaje />} />
          <Route path="*" element={<NoEncontrada />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
