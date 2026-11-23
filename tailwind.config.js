/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'subir-suave': { '0%': { opacity: 0, transform: 'translateY(12px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        flotar: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
      animation: {
        'subir-suave': 'subir-suave 0.5s ease-out both',
        flotar: 'flotar 5s ease-in-out infinite',
      },
      colors: {
        // Azul turquesa: color principal de la marca "Rumbo Sur".
        brand: {
          50: '#effcfb',
          100: '#d3f7f4',
          200: '#a9ede9',
          300: '#72ddda',
          400: '#3cc6c6',
          500: '#20a9ac',
          600: '#188690',
          700: '#176c75',
          800: '#18565f',
          900: '#18474f',
        },
        // Naranja atardecer: acentos y llamadas a la acción.
        sol: {
          50: '#fff7ed',
          100: '#ffedd5',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
      },
    },
  },
  plugins: [],
};
