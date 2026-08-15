import { useCallback, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import CookieBanner from './CookieBanner.jsx';
import MobileActionBar from './MobileActionBar.jsx';

/** Las páginas con hero a sangre llevan la cabecera transparente, como en el original. */
const TRANSPARENT_ROUTES = [
  '/',
  '/descubre',
  '/contacto',
  '/policharger',
  '/v2c',
  '/tesla',
  '/wallbox',
  '/woltio',
];

/** La tienda usa una cabecera blanca propia, sin navegación. */
const TIENDA_ROUTES = ['/tienda', '/tienda-online'];

export default function Layout() {
  const { pathname } = useLocation();
  const variant = TIENDA_ROUTES.includes(pathname) ? 'tienda' : 'default';
  const transparent = variant === 'default' && TRANSPARENT_ROUTES.includes(pathname);

  // La barra de acción no se monta mientras el aviso de cookies siga delante.
  const [cookiesResueltas, setCookiesResueltas] = useState(false);
  const alDecidir = useCallback((resuelto) => setCookiesResueltas(resuelto), []);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Ir al contenido
      </a>
      <Header transparent={transparent} variant={variant} />
      <main id="contenido" className={`flex-1 ${transparent ? '' : 'pt-[86px]'}`}>
        <Outlet />
      </main>
      <Footer />
      {/* Hueco para que la barra fija no tape el final del pie en móvil */}
      <div aria-hidden="true" className="h-[76px] bg-black lg:hidden" />
      {cookiesResueltas && <MobileActionBar />}
      <CookieBanner onDecidir={alDecidir} />
    </div>
  );
}
