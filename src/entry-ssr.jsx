import { Writable } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';

/**
 * Punto de entrada del prerenderizado.
 *
 * Vive dentro de src/ para que lo cargue el mismo grafo de módulos que la aplicación: si el
 * script importara React Router por su cuenta habría dos instancias distintas y el contexto del
 * router no llegaría a los componentes.
 *
 * Usa `renderToPipeableStream` y no `renderToString` porque las páginas se cargan con
 * `React.lazy`: la versión síncrona se queda en el fallback del Suspense y escribiría un HTML
 * vacío. `onAllReady` espera a que todas las perezosas estén resueltas.
 */
export function render(url) {
  return new Promise((resolve, reject) => {
    const trozos = [];
    const destino = new Writable({
      write(trozo, _codificacion, callback) {
        trozos.push(Buffer.from(trozo));
        callback();
      },
      final(callback) {
        callback();
      },
    });

    destino.on('finish', () => resolve(Buffer.concat(trozos).toString('utf8')));

    const { pipe, abort } = renderToPipeableStream(
      <StaticRouter location={url}>
        <CartProvider>
          <App />
        </CartProvider>
      </StaticRouter>,
      {
        onAllReady() {
          pipe(destino);
        },
        onError(error) {
          abort();
          reject(error);
        },
      }
    );
  });
}
