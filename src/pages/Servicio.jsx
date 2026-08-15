import { Link } from 'react-router';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import PageHero from '../components/PageHero.jsx';
import Blocks from '../components/Blocks.jsx';
import Accordion from '../components/Accordion.jsx';
import ContactStrip from '../components/ContactStrip.jsx';
import { getServicio } from '../data/servicios.js';
import NotFound from './NotFound.jsx';

/** Plantilla única de las páginas de servicio: hero, contenido, FAQ, relacionados y presupuesto. */
export default function Servicio({ slug }) {
  const servicio = getServicio(slug);
  if (!servicio) return <NotFound />;

  const relacionados = (servicio.relacionados ?? []).map(getServicio).filter(Boolean);

  return (
    <>
      <Seo
        title={servicio.meta.title}
        description={servicio.meta.description}
        image={servicio.image}
      />

      <PageHero
        eyebrow={servicio.eyebrow}
        title={servicio.title}
        subtitle={servicio.lead}
        image={servicio.image}
      >
        <Link
          to={`/contacto?servicio=${encodeURIComponent(servicio.nombre)}`}
          className="btn-primary px-9"
        >
          Pedir presupuesto
        </Link>
      </PageHero>

      <section className="section bg-white">
        <div className="container-x">
          <Reveal>
            <Blocks blocks={servicio.blocks} />
          </Reveal>
        </div>
      </section>

      {servicio.faqs?.length > 0 && (
        <section className="section-tight bg-[color:var(--color-surface)]">
          <div className="container-x max-w-3xl">
            <Reveal>
              <h2 className="mb-10 text-center text-h2">Preguntas frecuentes</h2>
              <Accordion items={servicio.faqs} defaultOpen={0} />
            </Reveal>
          </div>
        </section>
      )}

      {relacionados.length > 0 && (
        <section className="section-tight bg-white">
          <div className="container-x">
            <h2 className="text-center text-h2">También te puede interesar</h2>
            <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
              {relacionados.map((r) => (
                <Link
                  key={r.slug}
                  to={`/${r.slug}`}
                  className="group rounded-2xl border border-[color:var(--color-line)] p-6 transition-shadow hover:shadow-[var(--shadow-card)]"
                >
                  <h3 className="text-h3 transition-colors group-hover:text-[color:var(--color-brand)]">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm text-[color:var(--color-muted)]">{r.lead}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactStrip title={`Presupuesto de ${servicio.nombre.toLowerCase()}`} />
    </>
  );
}
