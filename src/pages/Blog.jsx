import { Link } from 'react-router';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import PageHero from '../components/PageHero.jsx';
import { getPost, mosaicSlugs, stackSlugs } from '../data/posts.js';
import Picture, { SIZES } from '../components/Picture.jsx';

/** Tarjeta-enlace con la imagen de fondo, degradado oscuro y el título superpuesto abajo. */
function MosaicCard({ post, as: Heading = 'h2', className = '' }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`group relative flex items-end overflow-hidden ${className}`}
    >
      <Picture
        src={post.cardImage}
        alt=""
        aria-hidden="true"
        sizes={SIZES.media}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      <Heading className="text-shadow-hero relative w-full p-5 text-base leading-snug whitespace-pre-line text-white sm:text-lg">
        {post.cardTitle}
      </Heading>
    </Link>
  );
}

/**
 * Mosaico de 6 entradas en dos filas: una columna estrecha con dos tarjetas apiladas
 * y una tarjeta grande al otro lado, alternando el lado en cada fila.
 * Se reutiliza en el listado del blog y en la sección de blog de "Descubre".
 */
export function BlogMosaic({ slugs, headingTag = 'h2' }) {
  const [a, b, c, d, e, f] = slugs.map(getPost).filter(Boolean);
  if (!f) return null;

  return (
    <div className="mx-auto grid max-w-[990px] gap-3">
      <div className="grid gap-3 md:grid-cols-[38fr_60fr]">
        <div className="grid gap-3">
          <MosaicCard post={a} as={headingTag} className="h-44" />
          <MosaicCard post={b} as={headingTag} className="h-44" />
        </div>
        <MosaicCard post={c} as={headingTag} className="h-56 md:h-auto" />
      </div>

      <div className="grid gap-3 md:grid-cols-[60fr_38fr]">
        <MosaicCard post={d} as={headingTag} className="h-56 md:h-auto" />
        <div className="grid gap-3">
          <MosaicCard post={e} as={headingTag} className="h-44" />
          <MosaicCard post={f} as={headingTag} className="h-44" />
        </div>
      </div>
    </div>
  );
}

/** Anchos decrecientes de las cuatro entradas apiladas, como en el original. */
const STACK_WIDTHS = ['max-w-[1150px]', 'max-w-[820px]', 'max-w-[820px]', 'max-w-[780px]'];

export default function Blog() {
  const stack = stackSlugs.map(getPost).filter(Boolean);

  return (
    <>
      <Seo
        title="▷ Blog | Solventium"
        description="Movilidad eléctrica y energías renovables: subvenciones, comparativas de cargadores, autoconsumo y consejos técnicos."
        image="/images/pexels-pixapexel-28884704-scaled.jpg"
      />

      <PageHero
        title="Movilidad eléctrica y energías renovables"
        image="/images/pexels-kindelmedia-9800029-scaled.jpg"
        height="sm"
      />

      <section className="section bg-white">
        <div className="container-x">
          <Reveal>
            <BlogMosaic slugs={mosaicSlugs} />
          </Reveal>

          {/* Entradas apiladas: imagen ancha y título centrado debajo */}
          <div className="mt-14 space-y-10">
            {stack.map((p, i) => (
              <Reveal key={p.slug}>
                <Link
                  to={`/blog/${p.slug}`}
                  className={`group mx-auto block ${STACK_WIDTHS[i] ?? 'max-w-[780px]'}`}
                >
                  <Picture src={p.cardImage} alt="" sizes="(min-width: 1024px) 1150px, 100vw" className="w-full" />
                  <h2 className="mt-3 text-center text-lg leading-snug transition-colors group-hover:text-[color:var(--color-brand)]">
                    {p.cardTitle}
                  </h2>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
