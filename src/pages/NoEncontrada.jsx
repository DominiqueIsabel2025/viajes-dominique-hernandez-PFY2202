import { Link } from 'react-router-dom';
import EstadoVacio from '../components/EstadoVacio';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function NoEncontrada() {
  useDocumentTitle('Página no encontrada');
  return (
    <EstadoVacio titulo="Error 404: esta página no existe" descripcion="Parece que te saliste de la ruta.">
      <Link to="/" className="btn btn-primary">Volver al inicio</Link>
    </EstadoVacio>
  );
}
