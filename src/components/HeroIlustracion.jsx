// Ilustración vectorial del hero: montañas, sol y un avión siguiendo una ruta (sin imágenes externas).
export default function HeroIlustracion() {
  return (
    <svg viewBox="0 0 420 320" className="h-full w-full" role="img" aria-label="Ilustración de un avión sobre montañas al atardecer">
      <defs>
        <linearGradient id="cielo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdba74" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="300" cy="105" r="62" fill="url(#cielo)" />
      <circle cx="300" cy="105" r="36" fill="#fb923c" />
      <path d="M0 320V230l70-70 55 52 60-92 80 110 55-48 100 98v40z" fill="#0f5f68" opacity="0.65" />
      <path d="M0 320v-60l80-55 70 60 75-70 90 80 105-60v105z" fill="#0b3d44" />
      <path d="M30 150C110 70 200 120 270 60" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="2.5" strokeDasharray="2 9" strokeLinecap="round" />
      <g transform="translate(262 38) rotate(-28)" className="origin-center animate-flotar">
        <path d="M0 14L40 0 34 14 40 28z" fill="#fff" />
        <path d="M12 14L2 2v6l10 6z" fill="#e2e8f0" />
      </g>
      <g fill="#fff" opacity="0.85">
        <ellipse cx="70" cy="70" rx="34" ry="11" />
        <ellipse cx="92" cy="62" rx="22" ry="10" />
        <ellipse cx="350" cy="190" rx="30" ry="9" />
      </g>
    </svg>
  );
}
