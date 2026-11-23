// Construye una URL absoluta a partir de la página actual.
// Así las peticiones funcionan tanto en localhost como en GitHub Pages (/nombre-del-repo/).
export const apiUrl = (ruta) => new URL(ruta, window.location.href).href;
