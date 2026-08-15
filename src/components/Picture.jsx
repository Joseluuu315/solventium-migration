import manifest from '../data/imageManifest.json';

/**
 * Sirve una imagen en AVIF o WebP al tamaño que toque, con el original como respaldo.
 *
 * Las variantes las genera `node scripts/optimize-images.mjs` en public/images/opt, y el
 * manifiesto aporta las dimensiones reales para reservar el hueco y evitar saltos de maquetación.
 * Si una imagen no está en el manifiesto (un SVG, por ejemplo) se emite un <img> normal.
 *
 * `sizes` debe describir el ancho al que se pinta la imagen en cada punto de ruptura: es lo que
 * usa el navegador para elegir variante, y por defecto asume el ancho completo de la ventana.
 */

/** Anchos a los que se pinta cada tipo de imagen en el layout real. */
export const SIZES = {
  /** Fondos a sangre y heroes. */
  full: '100vw',
  /** Rejilla de tres columnas: cargadores, valores, artículos del blog. */
  tercio: '(min-width: 1024px) 368px, (min-width: 640px) 50vw, 100vw',
  /** Rejilla de cuatro columnas de la tienda. */
  cuarto: '(min-width: 1024px) 264px, (min-width: 640px) 50vw, 100vw',
  /** Media página: fichas de producto y bloques partidos. */
  media: '(min-width: 1024px) 560px, 100vw',
  /** Columna de texto de los artículos. */
  texto: '(min-width: 768px) 720px, 100vw',
};

const srcset = (base, widths, formato) =>
  widths.map((w) => `/images/opt/${base}-${w}.${formato} ${w}w`).join(', ');

export default function Picture({
  src,
  alt = '',
  sizes = SIZES.full,
  className = '',
  priority = false,
  ...rest
}) {
  const info = manifest[src];

  const comunes = {
    alt,
    className,
    decoding: 'async',
    ...(priority
      ? { fetchPriority: 'high', loading: 'eager' }
      : { loading: 'lazy' }),
    ...rest,
  };

  if (!info) return <img src={src} {...comunes} />;

  return (
    <picture>
      <source type="image/avif" srcSet={srcset(info.base, info.widths, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(info.base, info.widths, 'webp')} sizes={sizes} />
      <img src={src} width={info.width} height={info.height} {...comunes} />
    </picture>
  );
}

/**
 * Equivalente para `background-image`: devuelve un image-set con AVIF y WebP y el
 * original como respaldo, en el ancho indicado.
 */
export const fondoOptimizado = (src, ancho = 1440) => {
  const info = manifest[src];
  if (!info) return `url(${src})`;
  const w = info.widths.includes(ancho) ? ancho : info.widths[info.widths.length - 1];
  return (
    `image-set(url(/images/opt/${info.base}-${w}.avif) type("image/avif"), ` +
    `url(/images/opt/${info.base}-${w}.webp) type("image/webp"))`
  );
};
