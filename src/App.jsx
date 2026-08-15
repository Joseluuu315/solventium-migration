import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Layout from './components/Layout.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import { servicios } from './data/servicios.js';

/**
 * Solo la portada entra en el paquete inicial. El resto se carga al navegar: antes, quien
 * abría la home se descargaba también los diez artículos del blog y las ocho fichas de
 * producto sin verlos.
 */
const Descubre = lazy(() => import('./pages/Descubre.jsx'));
const Contacto = lazy(() => import('./pages/Contacto.jsx'));
const Cargadores = lazy(() => import('./pages/Cargadores.jsx'));
const Marca = lazy(() => import('./pages/Marca.jsx'));
const Landing = lazy(() => import('./pages/Landing.jsx'));
const Servicio = lazy(() => import('./pages/Servicio.jsx'));
const Tienda = lazy(() => import('./pages/Tienda.jsx'));
const Producto = lazy(() => import('./pages/Producto.jsx'));
const Carrito = lazy(() => import('./pages/Carrito.jsx'));
const Blog = lazy(() => import('./pages/Blog.jsx'));
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'));
const Faq = lazy(() => import('./pages/Faq.jsx'));
const Comparativa = lazy(() => import('./pages/Comparativa.jsx'));
const TiempoCarga = lazy(() => import('./pages/TiempoCarga.jsx'));
const Legal = lazy(() => import('./pages/Legal.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

/** Reserva el alto de una pantalla para que la cabecera no salte durante la carga. */
function Cargando() {
  return <div className="min-h-[70svh]" aria-busy="true" />;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Cargando />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/descubre" element={<Descubre />} />
            <Route path="/contacto" element={<Contacto />} />

            <Route path="/cargadores" element={<Cargadores />} />
            <Route path="/policharger" element={<Marca slug="policharger" />} />
            <Route path="/v2c" element={<Marca slug="v2c" />} />
            <Route path="/tesla" element={<Marca slug="tesla" />} />
            <Route path="/wallbox" element={<Marca slug="wallbox" />} />
            <Route path="/woltio" element={<Marca slug="woltio" />} />
            {/* Landings por modelo del sitio original */}
            <Route path="/policharger-nw" element={<Landing modelo="policharger-nw" />} />
            <Route path="/v2c-trydan" element={<Landing modelo="v2c-trydan" />} />
            <Route path="/tesla-wall-conector" element={<Landing modelo="tesla-wall-conector" />} />

            {/* Servicios: lo que antes eran secciones de la portada sin URL propia */}
            {servicios.map((s) => (
              <Route key={s.slug} path={`/${s.slug}`} element={<Servicio slug={s.slug} />} />
            ))}

            <Route path="/tienda" element={<Tienda />} />
            <Route path="/tienda-online" element={<Navigate to="/tienda" replace />} />
            <Route path="/producto/:slug" element={<Producto />} />
            <Route path="/carrito" element={<Carrito />} />

            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            <Route path="/preguntas-frecuentes" element={<Faq />} />
            <Route path="/comparativa" element={<Comparativa />} />
            <Route path="/comparativa-herramienta" element={<Navigate to="/comparativa" replace />} />
            <Route path="/tiempo-de-carga" element={<TiempoCarga />} />
            <Route
              path="/tiempo-de-carga-herramienta"
              element={<Navigate to="/tiempo-de-carga" replace />}
            />

            <Route path="/terminos-legales" element={<Legal doc="terminos" />} />
            <Route path="/politica-de-privacidad" element={<Legal doc="privacidad" />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
