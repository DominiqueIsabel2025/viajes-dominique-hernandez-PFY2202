import { listarDestinos, obtenerDestino } from '../services/destinosService';
import useRest from './useRest';

export const useDestinos = () => useRest(listarDestinos);
export const useDestino = (id) => useRest((opciones) => obtenerDestino(id, opciones), [id]);
