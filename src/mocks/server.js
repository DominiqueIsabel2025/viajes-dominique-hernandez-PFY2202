import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Mismo backend mock, pero para Node: se usa en las pruebas automáticas (Vitest).
export const server = setupServer(...handlers);
