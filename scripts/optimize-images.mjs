/**
 * Genera las variantes responsive de public/images.
 *
 * Por cada mapa de bits crea AVIF y WebP en los anchos de `WIDTHS` que no superen el
 * original (nunca escala hacia arriba) y deja el fichero de partida como respaldo.
 * El resultado va a public/images/opt y el manifiesto a src/data/imageManifest.json,
 * que es lo que lee el componente Picture para escribir srcset, width y height.
 *
 *   node scripts/optimize-images.mjs
 *
 * Requiere sharp. Es un paso manual: solo hay que volver a lanzarlo cuando se añadan
 * imágenes nuevas.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGEN = path.join(RAIZ, 'public', 'images');
const DESTINO = path.join(ORIGEN, 'opt');
const MANIFIESTO = path.join(RAIZ, 'src', 'data', 'imageManifest.json');

const WIDTHS = [480, 960, 1440, 1920];
const CALIDAD = { avif: 50, webp: 74 };
const PROCESABLES = /\.(jpe?g|png|webp|avif)$/i;

const kb = (n) => Math.round(n / 1024);

async function main() {
  fs.mkdirSync(DESTINO, { recursive: true });

  const ficheros = fs
    .readdirSync(ORIGEN)
    .filter((f) => PROCESABLES.test(f) && fs.statSync(path.join(ORIGEN, f)).isFile());

  const manifiesto = {};
  let pesoOriginal = 0;
  let pesoGenerado = 0;

  for (const fichero of ficheros) {
    const rutaOrigen = path.join(ORIGEN, fichero);
    const base = fichero.replace(/\.[^.]+$/, '');
    const entrada = sharp(rutaOrigen, { failOn: 'none' });

    let meta;
    try {
      meta = await entrada.metadata();
    } catch {
      console.log(`  ! ${fichero}: ilegible, se omite`);
      continue;
    }

    pesoOriginal += fs.statSync(rutaOrigen).size;

    // Nunca ampliamos: solo los anchos que caben, más el propio ancho si es menor que el mínimo.
    const anchos = WIDTHS.filter((w) => w <= meta.width);
    if (anchos.length === 0) anchos.push(meta.width);

    const generados = [];
    for (const ancho of anchos) {
      for (const formato of ['avif', 'webp']) {
        const salida = path.join(DESTINO, `${base}-${ancho}.${formato}`);
        if (!fs.existsSync(salida)) {
          await sharp(rutaOrigen, { failOn: 'none' })
            .resize({ width: ancho, withoutEnlargement: true })
            .toFormat(formato, { quality: CALIDAD[formato] })
            .toFile(salida);
        }
        pesoGenerado += fs.statSync(salida).size;
      }
      generados.push(ancho);
    }

    manifiesto[`/images/${fichero}`] = {
      base,
      width: meta.width,
      height: meta.height,
      widths: generados,
    };

    console.log(
      `  ${fichero.padEnd(58).slice(0, 58)} ${String(meta.width).padStart(5)}px  ${String(
        kb(fs.statSync(rutaOrigen).size)
      ).padStart(5)} KB → ${generados.length} anchos`
    );
  }

  fs.writeFileSync(MANIFIESTO, `${JSON.stringify(manifiesto, null, 2)}\n`);

  console.log(`\n${Object.keys(manifiesto).length} imágenes en el manifiesto`);
  console.log(`originales: ${kb(pesoOriginal)} KB · variantes generadas: ${kb(pesoGenerado)} KB`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
