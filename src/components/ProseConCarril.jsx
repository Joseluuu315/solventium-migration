import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Blocks from './Blocks.jsx';

/** Convierte un titular en un ancla estable: «Subvenciones y Ayudas» → «subvenciones-y-ayudas». */
const anclaDe = (texto) =>
  texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Texto largo con un carril de navegación y una llamada a la acción.
 *
 * El muro de texto de la portada ocupa miles de píxeles sin ofrecer nada que hacer, y la ficha
 * de producto no se lee de arriba abajo: se busca un apartado concreto («Garantía», «Contenido
 * de la caja»). El índice resuelve lo segundo y la tarjeta lo primero, sin tocar una palabra
 * del contenido.
 */
export default function ProseConCarril({ blocks, cta }) {
  const epigrafes = blocks
    .filter((b) => b.type === 'h2' && b.text)
    .map((b) => ({ id: anclaDe(b.text), text: b.text }));
  const [activo, setActivo] = useState(epigrafes[0]?.id ?? null);

  useEffect(() => {
    if (epigrafes.length === 0 || typeof IntersectionObserver === 'undefined') return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActivo(visible.target.id);
      },
      { rootMargin: '-100px 0px -70% 0px' }
    );

    epigrafes.forEach((e) => {
      const el = document.getElementById(e.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
    // Los epígrafes se derivan de `blocks`, que no cambia dentro de una misma página.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  // Los h2 llevan su id para que el índice pueda saltar a ellos.
  const conAnclas = blocks.map((b) =>
    b.type === 'h2' && b.text ? { ...b, id: anclaDe(b.text) } : b
  );

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,38rem)_1fr] lg:gap-16">
      <Blocks blocks={conAnclas} />

      <aside className="lg:sticky lg:top-28 lg:self-start">
        {epigrafes.length > 2 && (
          <nav aria-label="Contenido de la página" className="hidden lg:block">
            <p className="eyebrow mb-4 text-[color:var(--color-muted)]">En esta página</p>
            <ul className="space-y-2 border-l border-[color:var(--color-line)]">
              {epigrafes.map((e) => (
                <li key={e.id}>
                  <a
                    href={`#${e.id}`}
                    className={`-ml-px block border-l-2 py-1 pl-4 text-sm transition-colors ${
                      activo === e.id
                        ? 'border-[color:var(--color-brand)] font-semibold text-[color:var(--color-brand)]'
                        : 'border-transparent text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]'
                    }`}
                  >
                    {e.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {cta && (
          <div className="mt-10 rounded-2xl bg-[color:var(--color-ink)] p-6 text-white">
            <h3 className="text-h3 text-white">{cta.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{cta.text}</p>
            <Link to={cta.to} className="btn-primary mt-5 w-full">
              {cta.label}
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
