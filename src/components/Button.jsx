const VARIANTES = {
  primary: 'btn-primary',
  accent: 'btn-accent',
  secondary: 'btn-secondary',
};

// Botón reutilizable con variantes de estilo.
export default function Button({ variant = 'primary', className = '', type = 'button', children, ...props }) {
  return (
    <button type={type} className={`btn ${VARIANTES[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
