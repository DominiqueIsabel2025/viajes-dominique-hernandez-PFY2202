import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { server } from '../mocks/server';
import { renderizarApp } from './helpers';

describe('API REST mock: destinos', () => {
  it('lista los destinos con su país y filtra por continente', async () => {
    const user = userEvent.setup();
    renderizarApp('/destinos');

    expect(await screen.findByRole('heading', { name: 'Cusco' })).toBeInTheDocument();
    expect(screen.getByText(/Mostrando 8 de 8/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Europa' }));
    expect(screen.getByText(/Mostrando 2 de 8/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Madrid' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Cusco' })).not.toBeInTheDocument();
  });

  it('busca por texto y muestra estado vacío si no hay resultados', async () => {
    const user = userEvent.setup();
    renderizarApp('/destinos');
    await screen.findByRole('heading', { name: 'Cusco' });

    await user.type(screen.getByLabelText(/Buscar destino/), 'tango');
    expect(screen.getByRole('heading', { name: 'Buenos Aires' })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(1);

    await user.clear(screen.getByLabelText(/Buscar destino/));
    await user.type(screen.getByLabelText(/Buscar destino/), 'zzzz');
    expect(screen.getByText('No encontramos destinos')).toBeInTheDocument();
  });

  it('muestra un mensaje de error y permite reintentar cuando falla el servidor', async () => {
    const user = userEvent.setup();
    server.use(http.get('*/api/destinos', () => HttpResponse.json({ mensaje: 'Servidor caído' }, { status: 500 })));
    renderizarApp('/destinos');

    expect(await screen.findByRole('alert')).toHaveTextContent('Servidor caído');

    server.resetHandlers();
    await user.click(screen.getByRole('button', { name: 'Reintentar' }));
    expect(await screen.findByRole('heading', { name: 'Cusco' })).toBeInTheDocument();
  });
});

describe('API GraphQL mock + navegación', () => {
  it('muestra vuelos y hoteles de un destino con precios, fechas y disponibilidad', async () => {
    const user = userEvent.setup();
    renderizarApp('/destinos/cusco');

    expect(await screen.findByRole('heading', { name: 'Cusco' })).toBeInTheDocument();
    expect(await screen.findByText('Vuelos disponibles (3)')).toBeInTheDocument();
    expect(screen.getByText(/LATAM/)).toBeInTheDocument();
    expect(screen.getByText('Agotado')).toBeInTheDocument(); // vuelo JetSMART sin asientos
    expect(screen.getByText(/¡Quedan 3 asientos!/)).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: /Hoteles/ }));
    expect(await screen.findByText('Hoteles disponibles (3)')).toBeInTheDocument();
    expect(screen.getByText(/Casa Andina Premium/)).toBeInTheDocument();
    expect(screen.getAllByText(/Fechas con cupo/).length).toBeGreaterThan(0);
  });

  it('ordena vuelos por precio y filtra los que tienen cupos', async () => {
    const user = userEvent.setup();
    renderizarApp('/destinos/cusco');
    await screen.findByText('Vuelos disponibles (3)');

    await user.selectOptions(screen.getByLabelText(/Ordenar por/), 'precio');
    const primero = screen.getAllByRole('article')[0];
    expect(within(primero).getByText(/JetSMART/)).toBeInTheDocument();

    await user.click(screen.getByLabelText(/Solo con cupos/));
    expect(screen.getByText('Vuelos disponibles (2)')).toBeInTheDocument();
  });

  it('informa un error cuando el destino no existe (404 REST)', async () => {
    renderizarApp('/destinos/atlantida');
    expect(await screen.findByRole('alert')).toHaveTextContent(/no existe/);
  });

  it('muestra la página 404 para rutas desconocidas', async () => {
    renderizarApp('/ruta-inventada');
    expect(await screen.findByText(/Error 404/)).toBeInTheDocument();
  });
});

describe('Flujo completo: elegir destino, vuelo, hotel y reservar', () => {
  it('arma el viaje, calcula el total y confirma la reserva con una mutation', async () => {
    const user = userEvent.setup();
    renderizarApp('/destinos');

    await user.click((await screen.findAllByRole('link', { name: /Ver vuelos y hoteles/ }))[1]); // Buenos Aires
    await screen.findByText('Vuelos disponibles (3)');

    await user.click(screen.getByRole('button', { name: /Elegir vuelo LATAM/ }));
    await user.click(screen.getByRole('tab', { name: /Hoteles/ }));
    await user.click(await screen.findByRole('button', { name: /Elegir hotel Hotel Palermo Soho/ }));

    const resumen = screen.getByRole('complementary', { name: /Resumen de tu viaje/ });
    // 169.000 vuelo + 7 noches x 78.000 = 715.000
    expect(within(resumen).getByText(/715\.000/)).toBeInTheDocument();

    await user.click(within(resumen).getByRole('link', { name: /Revisar mi viaje/ }));
    expect(await screen.findByRole('heading', { name: 'Mi viaje' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Agregar un pasajero/ }));
    // 2 x 169.000 + 546.000 = 884.000
    expect(screen.getAllByText(/884\.000/).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: 'Confirmar reserva' }));
    expect(await screen.findByText('¡Reserva confirmada!')).toBeInTheDocument();
    expect(screen.getByText('RS-1001')).toBeInTheDocument();
  });

  it('sin vuelo elegido, Mi viaje invita a explorar destinos', async () => {
    renderizarApp('/mi-viaje');
    expect(await screen.findByText(/Todavía no has elegido un vuelo/)).toBeInTheDocument();
  });
});
