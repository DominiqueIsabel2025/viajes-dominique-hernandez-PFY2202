
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { apiUrl } from '../services/api';

export const crearClienteApollo = () =>
  new ApolloClient({
    link: new HttpLink({
      uri: apiUrl('graphql'),
      fetch: (uri, opciones) => {
        const { signal, ...opcionesSinSignal } = opciones;
        return fetch(uri, opcionesSinSignal);
      },
    }),
    cache: new InMemoryCache(),
  });
