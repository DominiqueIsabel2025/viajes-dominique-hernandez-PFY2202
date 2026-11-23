import { delay, graphql as graphqlMsw, http, HttpResponse } from 'msw';
import { graphql } from 'graphql';
import { destinos } from './data';
import { resolvers } from './resolvers';
import { schema } from './schema';

// En las pruebas automáticas no queremos esperar; en el navegador simulamos latencia de red.
const RETARDO_MS = import.meta.env.MODE === 'test' ? 0 : 600;

export const handlers = [
  // ---------- API REST mock ----------
  // GET /api/destinos -> lista de destinos con país y actividades populares.
  http.get('*/api/destinos', async () => {
    await delay(RETARDO_MS);
    return HttpResponse.json(destinos);
  }),

  // GET /api/destinos/:id -> detalle de un destino (404 si no existe).
  http.get('*/api/destinos/:id', async ({ params }) => {
    await delay(RETARDO_MS);
    const destino = destinos.find((d) => d.id === params.id);
    if (!destino) {
      return HttpResponse.json({ mensaje: `El destino "${params.id}" no existe` }, { status: 404 });
    }
    return HttpResponse.json(destino);
  }),

  // ---------- API GraphQL mock ----------
  // Un único endpoint (/graphql) para queries y mutations. graphql-js ejecuta la consulta
  // contra el esquema, por lo que solo se devuelven los campos que pide el cliente.
  graphqlMsw.operation(async ({ query, variables, operationName }) => {
    await delay(RETARDO_MS);
    const resultado = await graphql({
      schema,
      source: query,
      rootValue: resolvers,
      variableValues: variables,
      operationName,
    });
    return HttpResponse.json(resultado);
  }),
];
