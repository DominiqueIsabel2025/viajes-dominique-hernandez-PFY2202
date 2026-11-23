import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { ViajeProvider } from './context/ViajeContext';
import { crearClienteApollo } from './graphql/client';
import { worker } from './mocks/browser';
import './index.css';

const cliente = crearClienteApollo();

// Primero se activa el backend mock (MSW) y recién después se dibuja la aplicación,
// así ninguna petición se pierde antes de que el Service Worker esté listo.
async function iniciar() {
  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
  });

  // HashRouter: funciona en GitHub Pages sin configurar redirecciones del servidor.
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ApolloProvider client={cliente}>
          <ViajeProvider>
            <App />
          </ViajeProvider>
        </ApolloProvider>
      </HashRouter>
    </React.StrictMode>
  );
}

iniciar();
