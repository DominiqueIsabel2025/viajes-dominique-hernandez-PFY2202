import { Component } from 'react';

// Captura errores inesperados de renderizado para que la app no quede en blanco.
export default class ErrorBoundary extends Component {
  state = { hayError: false };

  static getDerivedStateFromError() {
    return { hayError: true };
  }

  render() {
    if (!this.state.hayError) return this.props.children;
    return (
      <div role="alert" className="mx-auto mt-20 max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow">
        <p className="text-4xl" aria-hidden="true">🛟</p>
        <h1 className="mt-2 text-xl font-bold text-brand-900">Algo salió mal</h1>
        <p className="mt-1 text-sm text-slate-600">Recarga la página para volver a intentarlo.</p>
        <button type="button" className="btn btn-primary mt-4" onClick={() => window.location.reload()}>
          Recargar
        </button>
      </div>
    );
  }
}
