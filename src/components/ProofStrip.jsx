import Reveal from './Reveal.jsx';
import Picture from './Picture.jsx';
import { testimonials } from '../data/descubre.js';

/**
 * Prueba social.
 *
 * El ticket ronda los 1.500 € y se contrata a un desconocido que va a tocar el cuadro eléctrico
 * del edificio: la portada no tenía ni una reseña, ni un dato, ni un fabricante a la vista, y
 * las tres opiniones que existen solo se pintaban al final de /descubre.
 *
 * Solo entran afirmaciones que ya estaban publicadas en el sitio: las tres reseñas reales, las
 * más de 200 instalaciones verificadas y las marcas que acreditan al equipo.
 */
const DATOS = [
  { valor: '+200', texto: 'instalaciones verificadas en la Comunidad de Madrid' },
  { valor: '4', texto: 'marcas que acreditan al equipo: Wallbox, Orbis, V2C y Tesla' },
  { valor: 'ITC-BT-52', texto: 'todas las instalaciones conforme a normativa' },
];

export default function ProofStrip({ compact = false }) {
  const opiniones = compact ? testimonials.slice(0, 2) : testimonials;

  return (
    <section className="section-tight bg-[color:var(--color-surface)]" aria-label="Clientes y garantías">
      <div className="container-x">
        <Reveal>
          <dl className="grid gap-6 border-b border-[color:var(--color-line)] pb-10 sm:grid-cols-3">
            {DATOS.map((d) => (
              <div key={d.valor}>
                <dt className="tabular text-[2rem] leading-none font-extrabold text-[color:var(--color-ink)]">
                  {d.valor}
                </dt>
                <dd className="mt-2 text-sm leading-snug text-[color:var(--color-muted)]">
                  {d.texto}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className={`mt-10 grid gap-6 ${compact ? 'sm:grid-cols-2' : 'md:grid-cols-3'}`}>
          {opiniones.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-[var(--shadow-card)]">
                <div className="text-sm" aria-label="5 sobre 5 estrellas">
                  ⭐️⭐️⭐️⭐️⭐️
                </div>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--color-body)]">
                  {t.text.length > 260 ? `${t.text.slice(0, 260).trimEnd()}…` : t.text}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-[color:var(--color-line)] pt-4">
                  <Picture
                    src={t.avatar}
                    alt=""
                    sizes="48px"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold text-[color:var(--color-ink)]">
                    {t.name}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
