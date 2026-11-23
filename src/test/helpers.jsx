import { ApolloProvider } from '@apollo/client';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { ViajeProvider } from '../context/ViajeContext';
import { crearClienteApollo } from '../graphql/client';

// Renderiza la app completa con router, Apollo y contexto, partiendo desde `ruta`.
export function renderizarApp(ruta = '/') {
  return render(
    <MemoryRouter initialEntries={[ruta]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ApolloProvider client={crearClienteApollo()}>
        <ViajeProvider>
          <App />
        </ViajeProvider>
      </ApolloProvider>
    </MemoryRouter>
  );
}
