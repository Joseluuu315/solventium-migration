import { Link } from 'react-router';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import Accordion from '../components/Accordion.jsx';
import Reveal from '../components/Reveal.jsx';
import { faqGroups } from '../data/faqs.js';

export default function Faq() {
  return (
    <>
      <Seo
        title="▷ Preguntas frecuentes | Solventium"
        description="Resolvemos las dudas más habituales sobre instalación de puntos de recarga, subvenciones MOVES III, normativa ITC-BT-52 y mantenimiento."
      />

      <PageHero
        eyebrow="Recursos"
        title="Preguntas frecuentes"
        subtitle="Instalación, compatibilidad, subvenciones y mantenimiento. Si no encuentras tu respuesta, escríbenos."
        image="/images/istockphoto-517188688-1024x1024-1.jpg"
        height="sm"
      />

      <section className="section bg-white">
        <div className="container-x max-w-3xl space-y-14">
          {faqGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 60}>
              <h2 className="mb-6 text-2xl">{group.title}</h2>
              <Accordion items={group.items} defaultOpen={i === 0 ? 0 : null} />
            </Reveal>
          ))}

          <Reveal className="rounded-2xl bg-[color:var(--color-ink)] p-10 text-center">
            <h2 className="text-2xl text-white">¿Sigues con dudas?</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              Cuéntanos tu caso y un ingeniero te responde con una propuesta concreta.
            </p>
            <Link to="/contacto" className="btn-primary mt-8 px-9">
              Contactar
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
