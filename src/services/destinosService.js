import { apiUrl } from './api';

// Cliente de la API REST mock (fetch + JSON).
async function pedirJson(ruta, { signal } = {}) {
  const respuesta = await fetch(apiUrl(ruta), { signal });
  if (!respuesta.ok) {
    const cuerpo = await respuesta.json().catch(() => ({}));
    throw new Error(cuerpo.mensaje ?? `Error ${respuesta.status} al consultar el servidor`);
  }
  return respuesta.json();
}

export const listarDestinos = (opciones) => pedirJson('api/destinos', opciones);
export const obtenerDestino = (id, opciones) => pedirJson(`api/destinos/${encodeURIComponent(id)}`, opciones);
