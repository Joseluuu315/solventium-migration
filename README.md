# Solventium — réplica en React

Recreación del sitio [solventium.es](https://solventium.es) (originalmente WordPress + Elementor +
WooCommerce) como aplicación React con Vite, Tailwind CSS v4 y React Router.

## Arranque

```bash
npm install
```

```bash
npm run dev
```

El sitio queda en `http://localhost:5173`. Para compilar a producción, `npm run build`; para
revisar el resultado compilado, `npm run preview`.

Al compilar se prerenderizan las 43 rutas a HTML estático, así que el resultado sigue siendo
un sitio de ficheros planos: `npm run build` encadena `vite build` y `scripts/prerender.mjs`.
Para compilar sin ese paso, `npm run build:only`.

## Estructura

```
public/
  fonts/            Archivo Variable autoalojada (35 kB el subconjunto latino)
  images/           115 imágenes del sitio original
  images/opt/       Variantes AVIF y WebP en 480/960/1440/1920, generadas por script
scripts/
  optimize-images.mjs   Genera las variantes y el manifiesto  (npm run images)
  prerender.mjs         Escribe el HTML de cada ruta tras el build
src/
  components/       Header, Footer, formularios, Picture, acordeón, tarjetas, iconos SVG
  context/          Carrito de compra (React Context + localStorage)
  data/             Todo el contenido, separado del maquetado
  pages/            Una página por ruta
  entry-ssr.jsx     Punto de entrada del prerenderizado
```

El contenido vive en `src/data`, no en los componentes: textos, precios, especificaciones,
artículos del blog y fichas de producto. Para cambiar una descripción o un precio no hace falta
tocar JSX.

## Rutas

| Ruta | Página |
| --- | --- |
| `/` | Portada: hero, comparador de cargadores, fichas, preinstalaciones, valores, renovables, reforestación y bloque SEO |
| `/descubre` | Quiénes somos, proceso, herramientas, blog y testimonios |
| `/contacto` | Formulario, horarios, localización y mapa |
| `/cargadores` | Listado de las cinco marcas |
| `/policharger` `/v2c` `/tesla` `/wallbox` `/woltio` | Ficha de marca con especificaciones, beneficios, FAQ y formulario |
| `/tienda` | Catálogo con filtro por categoría y ordenación |
| `/producto/:slug` | Ficha de producto con galería y descripción técnica |
| `/carrito` | Carrito persistente en `localStorage` |
| `/blog` y `/blog/:slug` | Blog con los 10 artículos publicados |
| `/preguntas-frecuentes` | FAQ agrupada en cuatro bloques |
| `/comparativa` | Calculadora eléctrico vs combustión |
| `/tiempo-de-carga` | Calculadora de tiempo de recarga |
| `/terminos-legales` `/politica-de-privacidad` | Textos legales |

Las URLs por modelo del sitio original (`/policharger-nw`, `/v2c-trydan`, `/tesla-wall-conector`,
`/tienda-online`, `/comparativa-herramienta`, `/tiempo-de-carga-herramienta`) redirigen a su
equivalente para no romper enlaces existentes.

## Diseño

Parte de la identidad del original —rojo `#CA0000`, negro `#1D1D1D`, botones tipo píldora— y la
convierte en un sistema, con los tokens en `src/index.css` bajo `@theme`:

- **Color con papeles fijos.** Rojo para la acción (`--color-brand`, con `--color-brand-600` de
  hover y `--color-brand-on-dark` para lo que cae sobre fondo oscuro), negro para el dato, gris
  `#6B6B6B` para lo secundario y una rampa verde reservada a sostenibilidad. Antes un solo rojo
  hacía botones, precios, checks, viñetas y resultados a la vez.
- **Seis escalones tipográficos** con separación real (76 / 48 / 34 / 22 / 17 / 15 px a 1440), en
  Archivo Variable autoalojada.
- **Tres ritmos verticales**: `--spacing-chapter`, `--spacing-section` y `--spacing-tight`.
- **Tres velos** (`.scrim-flat`, `.scrim-bottom`, `.scrim-side`) en lugar de repetir opacidades a
  mano; el direccional deja que media foto conserve color.
- **Foco visible único** que funciona sobre fondo claro y oscuro.

### Rendimiento

Las imágenes se sirven con `<Picture>`, que elige AVIF o WebP y el ancho adecuado a partir de
`src/data/imageManifest.json`. El hero pasa de 812 kB a 18 kB en un móvil de 480 px. El
JavaScript va partido por rutas: la portada carga 340 kB en lugar de los 488 kB que incluían el
blog y la tienda enteros.

Si añades imágenes a `public/images`, vuelve a lanzar `npm run images`.

## Qué no es igual que el original

- **Formulario de contacto**: valida en cliente y simula el envío. Pásale un `endpoint` al
  componente `ContactForm` para conectarlo con tu API.
- **Carrito**: funciona de verdad (persiste en `localStorage`), pero no hay pasarela de pago. El
  original usa WooCommerce con Stripe.
- **Preguntas frecuentes**: la página original devuelve 403 a cualquier rastreo, así que el
  contenido se ha compuesto con las preguntas publicadas en las fichas de cargador y la
  información técnica de la portada. Revísala antes de publicar.
- **Calculadoras**: el original no expone su fórmula. Las dos herramientas están implementadas con
  cálculos propios y los factores de emisión aparecen indicados en cada página.
- **Páginas de servicio**: `/fotovoltaica`, `/minieolica`, `/baterias`,
  `/preinstalacion-comunitaria` y `/subvenciones-moves-iii` no existen en el original, donde esas
  secciones de la portada llevan todas al formulario de contacto. El texto está reaprovechado del
  bloque SEO, del FAQ y del blog: no hay ninguna afirmación nueva.
- **Prueba social y barra de acción móvil** tampoco están en el original.

## Despliegue

Es un SPA: el servidor debe devolver `index.html` en cualquier ruta. Para Netlify ya está incluido
`public/_redirects`. En Vercel, Cloudflare Pages o Apache, configura el mismo *fallback*.
