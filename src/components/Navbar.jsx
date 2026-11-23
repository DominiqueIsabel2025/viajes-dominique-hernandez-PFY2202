import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useViaje } from '../context/ViajeContext';

const ENLACES = [
  { to: '/', etiqueta: 'Inicio', end: true },
  { to: '/destinos', etiqueta: 'Destinos' },
  { to: '/mi-viaje', etiqueta: 'Mi viaje' },
];

const claseEnlace = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? 'bg-white text-brand-800 shadow' : 'text-brand-50 hover:bg-white/15'}`;

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const { viaje } = useViaje();
  const pendientes = [viaje.vuelo, viaje.hotel].filter(Boolean).length;

  return (
    <header className="sticky top-0 z-30 bg-brand-800/95 shadow-md backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3" aria-label="Navegación principal">
        <Link to="/" className="flex items-center gap-2.5 text-xl font-extrabold text-white" onClick={() => setAbierto(false)}>
          <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
            <rect width="64" height="64" rx="16" fill="#fff" />
            <circle cx="44" cy="22" r="8" fill="#f97316" />
            <path d="M10 46c8-10 16-10 22-4s14 6 22-4v14H10z" fill="#188690" />
          </svg>
          Rumbo Sur
        </Link>

        <button
          type="button"
          className="rounded-lg p-2 text-xl text-white md:hidden"
          aria-expanded={abierto}
          aria-controls="menu-principal"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setAbierto((v) => !v)}
        >
          {abierto ? '✕' : '☰'}
        </button>

        <ul
          id="menu-principal"
          className={`${abierto ? 'flex' : 'hidden'} absolute left-0 top-full w-full flex-col gap-1 bg-brand-800 p-4 shadow-lg md:static md:flex md:w-auto md:flex-row md:bg-transparent md:p-0 md:shadow-none`}
        >
          {ENLACES.map(({ to, etiqueta, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} className={claseEnlace} onClick={() => setAbierto(false)}>
                {etiqueta}
                {to === '/mi-viaje' && pendientes > 0 && (
                  <span className="ml-1.5 rounded-full bg-sol-500 px-1.5 py-0.5 text-xs text-white" aria-label={`${pendientes} elementos elegidos`}>
                    {pendientes}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
