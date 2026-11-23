import ErrorBoundary from './components/ErrorBoundary';
import AppRoutes from './routes/AppRoutes';

// App solo delega: la navegación vive en AppRoutes y los errores inesperados los captura ErrorBoundary.
export default function App() {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}
