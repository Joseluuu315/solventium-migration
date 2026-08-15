import { Link, useParams } from 'react-router';
import Seo from '../components/Seo.jsx';
import Blocks from '../components/Blocks.jsx';
import Reveal from '../components/Reveal.jsx';
import { IconClock } from '../components/Icons.jsx';
import { getPost, posts, recentPosts } from '../data/posts.js';
import { getServicio, servicioPorArticulo } from '../data/servicios.js';
import NotFound from './NotFound.jsx';

const MESES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

/** "2024-07-15T16:39:00" → "julio 15, 2024" (formato del original, sin depender de Date). */
const formatDate = (iso) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || '');
  if (!m) return null;
  return `${MESES[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}`;
};

const IconCalendar = (p) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  if (!post) return <NotFound />;

  const index = posts.findIndex((p) => p.slug === slug);
  const prev = posts[index - 1];
  const next = posts[index + 1];
  const date = formatDate(post.date);
  const servicio = getServicio(servicioPorArticulo[slug]);

  return (
    <>
      <Seo title={post.meta.title} description={post.excerpt} image={post.cover} />

      <article>
        <header className="bg-white pt-12 pb-4">
          <div className="container-x max-w-3xl">
            <Link
              to="/blog"
              className="text-sm font-medium text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-brand)]"
            >
              ← Volver al blog
            </Link>
            <h1 className="mt-4 text-[clamp(1.8rem,4.2vw,3rem)] leading-tight">{post.title}</h1>
            <p className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[color:var(--color-muted)]">
              {date && (
                <span className="inline-flex items-center gap-2">
                  <IconCalendar /> {date}
                </span>
              )}
              {post.time && (
                <span className="inline-flex items-center gap-2">
                  <IconClock width="16" height="16" /> {post.time}
                </span>
              )}
            </p>
          </div>
        </header>

        <div className="bg-white pb-16 sm:pb-20 lg:pb-24">
          <div className="container-x max-w-3xl">
            <Blocks blocks={post.blocks} />
          </div>
        </div>
      </article>

      {/* Servicio relacionado: sin esto, el artículo genera la pregunta y no ofrece
          dónde depositarla. */}
      {servicio && (
        <section className="border-t border-[color:var(--color-line)] bg-white pb-14">
          <div className="container-x max-w-3xl">
            <Link
              to={`/${servicio.slug}`}
              className="group flex flex-col gap-5 rounded-2xl bg-[color:var(--color-ink)] p-7 text-white sm:flex-row sm:items-center"
            >
              <div className="flex-1">
                <p className="eyebrow-on-dark">Servicio relacionado</p>
                <h2 className="mt-2 text-h3 text-white">{servicio.title}</h2>
                <p className="mt-2 text-sm text-white/70">{servicio.lead}</p>
              </div>
              <span className="btn-primary shrink-0">Ver servicio</span>
            </Link>
          </div>
        </section>
      )}

      {/* Entradas recientes */}
      <section className="border-t border-[color:var(--color-line)] bg-white py-14" aria-label="Entradas recientes">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recentPosts.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 90}>
              <article className="flex h-full flex-col rounded-2xl border border-[color:var(--color-line)] bg-white p-6 shadow-[var(--shadow-card)]">
                <h3 className="text-base leading-snug">
                  <Link
                    to={`/blog/${p.slug}`}
                    className="transition-colors hover:text-[color:var(--color-brand)]"
                  >
                    {p.title}
                  </Link>
                </h3>
                <Link
                  to={`/blog/${p.slug}`}
                  className="mt-4 text-sm font-bold text-[color:var(--color-brand)] hover:underline"
                >
                  Leer más »
                </Link>
                <p className="mt-5 text-sm text-[color:var(--color-muted)]">
                  {p.author}
                  <span className="mt-1 block">{formatDate(p.date)}</span>
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Navegación entre artículos */}
      <nav className="border-t border-[color:var(--color-line)] bg-[#f7f7f7] py-12" aria-label="Más artículos">
        <div className="container-x grid max-w-4xl gap-6 sm:grid-cols-2">
          {prev ? (
            <Link
              to={`/blog/${prev.slug}`}
              className="group rounded-2xl border border-[color:var(--color-line)] bg-white p-6 transition-shadow hover:shadow-[var(--shadow-card)]"
            >
              <span className="text-xs tracking-wide text-[color:var(--color-muted)] uppercase">
                Artículo anterior
              </span>
              <p className="mt-2 font-semibold transition-colors group-hover:text-[color:var(--color-brand)]">
                {prev.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              to={`/blog/${next.slug}`}
              className="group rounded-2xl border border-[color:var(--color-line)] bg-white p-6 text-right transition-shadow hover:shadow-[var(--shadow-card)]"
            >
              <span className="text-xs tracking-wide text-[color:var(--color-muted)] uppercase">
                Artículo siguiente
              </span>
              <p className="mt-2 font-semibold transition-colors group-hover:text-[color:var(--color-brand)]">
                {next.title}
              </p>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
