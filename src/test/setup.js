import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { reiniciarBaseDeDatos } from '../mocks/resolvers';
import { server } from '../mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  cleanup();
  server.resetHandlers();
  reiniciarBaseDeDatos();
  localStorage.clear();
});
afterAll(() => server.close());

// jsdom no implementa scrollTo.
window.scrollTo = () => {};
