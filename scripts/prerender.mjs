/**
 * Prerenderiza cada ruta a HTML estático después del build.
 *
 * Sin esto, dist/index.html no contiene más que <div id="root">: hasta que baja y se ejecuta el
 * bundle, la pantalla está en blanco, y los rastreadores de WhatsApp, LinkedIn o Facebook —que
 * no ejecutan JavaScript— ven el título genérico de la portada para cualquier enlace a una
 * marca, un artículo o una ficha de producto. Cuando alguien pega el enlace de preinstalaciones
 * en el grupo de la comunidad, que es un canal real de este negocio, sale una tarjeta sin foto.
 *
 * Es viable porque todos los datos son módulos estáticos: no hay una sola llamada a API.
 *
 *   npm run build   (ya lo encadena)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(RAIZ, 'dist');
const ORIGEN = 'https://solventium.es';

/** Escapa lo que se inyecta en atributos HTML. */
const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function main() {
  // Servidor de Vite en modo middleware: resuelve JSX y los alias igual que en desarrollo.
  const vite = await createServer({
    root: RAIZ,
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
    // Sin esto Vite externaliza react-router-dom y sus importaciones con nombre fallan en SSR.
    ssr: { noExternal: ['react-router-dom', 'react-router'] },
  });

  const { render } = await vite.ssrLoadModule('/src/entry-ssr.jsx');
  const { servicios } = await vite.ssrLoadModule('/src/data/servicios.js');
  const { posts } = await vite.ssrLoadModule('/src/data/posts.js');
  const { products } = await vite.ssrLoadModule('/src/data/products.js');
  const { chargers } = await vite.ssrLoadModule('/src/data/chargers.js');

  const rutas = [
    '/',
    '/descubre',
    '/contacto',
    '/cargadores',
    ...chargers.map((c) => `/${c.slug}`),
    '/policharger-nw',
    '/v2c-trydan',
    '/tesla-wall-conector',
    ...servicios.map((s) => `/${s.slug}`),
    '/tienda',
    '/carrito',
    '/blog',
    ...posts.map((p) => `/blog/${p.slug}`),
    ...products.map((p) => `/producto/${p.slug}`),
    '/preguntas-frecuentes',
    '/comparativa',
    '/tiempo-de-carga',
    '/terminos-legales',
    '/politica-de-privacidad',
  ];

  const plantilla = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
  let escritas = 0;

  for (const ruta of rutas) {
    // Seo.jsx escribe los metadatos en un useEffect, que no corre en SSR: se recogen aparte.
    const meta = { title: null, description: null, image: null };
    globalThis.__SEO__ = meta;

    let cuerpo = '';
    try {
      cuerpo = await render(ruta);
    } catch (e) {
      console.log(`  ! ${ruta}: ${e.message.slice(0, 80)}`);
      continue;
    }

    let html = plantilla.replace('<div id="root"></div>', `<div id="root">${cuerpo}</div>`);

    if (meta.title) {
      html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`);
    }
    if (meta.description) {
      html = html.replace(
        /<meta\s+name="description"[\s\S]*?\/>/,
        `<meta name="description" content="${esc(meta.description)}" />`
      );
    }

    const canonica = ORIGEN + (ruta === '/' ? '/' : ruta);
    const og = [
      `<link rel="canonical" href="${canonica}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:url" content="${canonica}" />`,
      `<meta property="og:title" content="${esc(meta.title ?? '')}" />`,
      `<meta property="og:description" content="${esc(meta.description ?? '')}" />`,
      meta.image ? `<meta property="og:image" content="${ORIGEN}${esc(meta.image)}" />` : '',
      `<meta name="twitter:card" content="summary_large_image" />`,
    ]
      .filter(Boolean)
      .join('\n    ');
    html = html.replace('</head>', `  ${og}\n  </head>`);

    const destino =
      ruta === '/' ? path.join(DIST, 'index.html') : path.join(DIST, ruta, 'index.html');
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.writeFileSync(destino, html);
    escritas += 1;
  }

  await vite.close();
  console.log(`prerender: ${escritas}/${rutas.length} rutas escritas`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
