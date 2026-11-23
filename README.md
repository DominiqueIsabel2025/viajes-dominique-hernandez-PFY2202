# 🧭 Rumbo Sur – Agencia de viajes

Proyecto de la **Semana 5 – Integrando nuestro frontend con backend**
Asignatura: Desarrollo Frontend II (PFY2202) · Autor: _Dominique Hernandez_

📁 **Repositorio:** `https://github.com/TU-USUARIO/viajes-dominique-hernandez-PFY2202`
🌐 **Sitio publicado (gh-pages):** `https://TU-USUARIO.github.io/viajes-dominique-hernandez-PFY2202/`

Aplicación web para planificar viajes: el usuario explora destinos, elige uno y compara los **vuelos** y **hoteles**
disponibles (precios, fechas y cupos). Luego arma su viaje, revisa el total y confirma la reserva.

## Requerimientos del caso y dónde se cumplen

| Requerimiento | Dónde está |
| --- | --- |
| **API REST mock** para listar destinos (país y actividades populares) | `src/mocks/handlers.js` (`GET /api/destinos` y `GET /api/destinos/:id`), consumida desde `src/services/destinosService.js` y `src/hooks/useRest.js` |
| **API GraphQL mock** para consultar vuelos y hoteles de cada destino (precios, fechas, disponibilidad) | Esquema en `src/mocks/schema.js`, resolvers en `src/mocks/resolvers.js`, consultas en `src/graphql/queries.js` |
| Interfaz para **seleccionar un destino** y ver sus vuelos y hoteles | `src/pages/Destinos.jsx` → `src/pages/DetalleDestino.jsx` (pestañas Vuelos / Hoteles) |
| **React Router** para la navegación | `src/routes/AppRoutes.jsx`, `src/layouts/MainLayout.jsx`, `src/components/Navbar.jsx` |
| Interfaz funcional y **responsiva** | Tailwind CSS: grillas adaptables, menú hamburguesa en móvil, panel de resumen que se apila |
| **Manejo de estado** con `useState` y `useEffect` | `useRest.js` (carga/errores), filtros y pestañas (`useState`), `ViajeContext.jsx` (estado compartido + persistencia con `useEffect`) |
| Código **modular y reutilizable** | Componentes pequeños en `src/components/`, páginas en `src/pages/`, servicios, hooks y mocks separados |
| Publicación en **GitHub + gh-pages** | Scripts `predeploy` / `deploy` y sección "Publicación" de este README |

## Cómo funciona el backend mock

Se utiliza **MSW (Mock Service Worker)**: un Service Worker intercepta las peticiones `fetch` del navegador y responde
con datos simulados, por lo que no se necesita levantar ningún servidor.

**REST** (lista de destinos, con `fetch`):

```http
GET api/destinos        → [{ id, nombre, pais, continente, actividades: [...], ... }]
GET api/destinos/cusco  → { id: "cusco", nombre: "Cusco", pais: "Perú", ... }   (404 si no existe)
```

**GraphQL** (vuelos y hoteles, con **Apollo Client**) en un único endpoint `/graphql`:

```graphql
query ObtenerVuelos($destinoId: ID!) {
  vuelosPorDestino(destinoId: $destinoId) {
    id aerolinea fechaSalida fechaRegreso precio asientosDisponibles disponible
  }
}

mutation ReservarViaje($vueloId: ID!, $hotelId: ID, $pasajeros: Int!) {
  reservarViaje(vueloId: $vueloId, hotelId: $hotelId, pasajeros: $pasajeros) {
    codigo noches total estado
  }
}
```

El mock ejecuta cada consulta con `graphql-js` sobre un esquema real, así que el cliente recibe **solo los campos que pide**.
Las reservas descuentan asientos y habitaciones mientras la página siga abierta.

Además, la interfaz incluye **esqueletos de carga**, título de pestaña por página (`useDocumentTitle`), un
`ErrorBoundary` para errores inesperados y enlace de salto al contenido para navegación con teclado.

El manejo de errores incluye estados de **carga**, **mensajes de error con botón "Reintentar"** (servidor caído, destino
inexistente, sin disponibilidad) y estados vacíos.

## Tecnologías

- **React 18** + **Vite**
- **React Router v6** (layout con `<Outlet />`, ruta dinámica `/destinos/:destinoId`, `React.lazy` + `Suspense`, `HashRouter` para GitHub Pages)
- **Apollo Client** + **GraphQL** · **MSW 2** para los mocks
- **Tailwind CSS 3** con tema propio (`brand`, `sol`)
- **Vitest + Testing Library** (pruebas automáticas con el mismo backend mock)

## Estructura del proyecto

```
src/
├── components/   # DestinoCard, VueloCard, HotelCard, VuelosLista, HotelesLista, Navbar, EsqueletoTarjetas, ErrorBoundary, ...
├── context/      # ViajeContext: destino + vuelo + hotel elegidos (con persistencia)
├── graphql/      # Cliente Apollo y consultas/mutaciones
├── hooks/        # useRest (fetch + estado), useDestinos y useDocumentTitle
├── layouts/      # MainLayout (navbar + <Outlet /> + footer)
├── mocks/        # Backend mock: datos, esquema GraphQL, resolvers, handlers MSW
├── pages/        # Inicio, Destinos, DetalleDestino, MiViaje, NoEncontrada
├── routes/       # AppRoutes: todas las rutas en un solo archivo
├── services/     # Cliente de la API REST
├── test/         # Pruebas automáticas
└── utils/        # Formato de precios (CLP) y fechas
```

## Rutas

| Ruta | Pantalla |
| --- | --- |
| `/` | Inicio con destinos destacados |
| `/destinos` | Listado de destinos (REST) con búsqueda y filtro por continente |
| `/destinos/:destinoId` | Detalle del destino + vuelos y hoteles (GraphQL) |
| `/mi-viaje` | Resumen, pasajeros, total y confirmación de la reserva |
| `*` | Página 404 |

## Cómo ejecutarlo en local

Requisitos: [Node.js](https://nodejs.org) 18 o superior.

```bash
npm install      # instala dependencias
npm start        # levanta el sitio en http://localhost:5173
npm test         # ejecuta las pruebas automáticas
npm run build    # genera la versión de producción en /dist
```

> El archivo `public/mockServiceWorker.js` lo genera MSW (`npx msw init public`) y debe mantenerse en el repositorio.

## Publicación en GitHub Pages

```bash
git init
git add .
git commit -m "Proyecto Rumbo Sur - Semana 5"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/viajes-dominique-hernandez-PFY2202.git
git push -u origin main

npm run deploy   # compila y sube /dist a la rama gh-pages
```

Luego, en GitHub: **Settings → Pages → Source: Deploy from a branch → rama `gh-pages` / carpeta `/ (root)`**.
Vite usa `base: './'` y la app usa `HashRouter`, por lo que funciona con cualquier nombre de repositorio.

## Pruebas

### Automáticas (`npm test`)
9 pruebas que cubren: listado y filtro REST, búsqueda, error del servidor con reintento, consulta GraphQL de vuelos y
hoteles (precios, cupos y agotados), orden y filtros, destino inexistente, ruta 404 y el flujo completo
*destino → vuelo → hotel → total → reserva con mutation*.

### Navegadores

| Navegador | Resultado | Observaciones |
| --- | --- | --- |
| Chromium / Google Chrome (escritorio y móvil 390 px) | ✅ Correcto | Service Worker activo, flujo completo hasta el código de reserva, sitio servido bajo subcarpeta como en gh-pages |
| Mozilla Firefox | ☐ _completar_ | |
| Microsoft Edge | ☐ _completar_ | |
| Safari | ☐ _completar_ | |

Lista de verificación para cada navegador: carga de destinos · filtro por continente · detalle con vuelos/hoteles ·
pestañas · elegir vuelo y hotel · resumen · confirmar reserva · menú móvil · recargar la página.
