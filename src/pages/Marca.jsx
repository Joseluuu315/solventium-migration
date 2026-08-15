import { Link } from 'react-router';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import Accordion from '../components/Accordion.jsx';
import ContactStrip from '../components/ContactStrip.jsx';
import { getCharger } from '../data/chargers.js';
import { serviceOptionsMarcas, site } from '../data/site.js';
import { IconCheck } from '../components/Icons.jsx';
import PriceTag from '../components/PriceTag.jsx';
import ProofStrip from '../components/ProofStrip.jsx';
import NotFound from './NotFound.jsx';
import Picture, { SIZES } from '../components/Picture.jsx';

/**
 * Reparte una lista en dos columnas rellenando primero la izquierda, como el original:
 * con 7 elementos quedan 4 a la izquierda y 3 a la derecha.
 */
function ListaEnDosColumnas({ items }) {
  const corte = Math.ceil(items.length / 2);
  return (
    <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
      {[items.slice(0, corte), items.slice(corte)].map((columna, i) => (
        <ul key={i} className="space-y-2">
          {columna.map((texto) => (
            <li key={texto} className="flex items-start gap-2.5 text-base leading-normal">
              <IconCheck className="mt-0.5 shrink-0 text-[color:var(--color-brand)]" />
              <span>{texto}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default function Marca({ slug }) {
  const charger = getCharger(slug);
  if (!charger) return <NotFound />;

  // La ficha de V2C es reducida en el original: sin beneficios, sin FAQ y sin contacto.
  const fichaReducida = charger.benefits.length === 0 && charger.faqs.length === 0;
  const faqs = charger.faqs.map((faq, i) => ({ ...faq, q: `${i + 1}. ${faq.q}` }));

  return (
    <>
      {/* El original no publica meta description en las páginas de marca. */}
      <Seo title={charger.seoTitle ?? `▷ ${charger.brand} | Solventium`} image={charger.image} />

      {/* Ficha completa: toda la información sobre la foto de la marca */}
      <section className="relative overflow-hidden bg-black lg:min-h-[830px]">
        {charger.scene && (
          <Picture
            src={charger.scene}
            alt=""
            aria-hidden="true"
            priority
            sizes={SIZES.full}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/85" />

        {/* La columna de la ficha es bastante más ancha que la de vídeo y beneficios */}
        <div className="container-x relative grid gap-12 pt-[110px] pb-16 text-white lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <Reveal>
            <p className="text-shadow-hero text-sm text-white/85">{charger.eyebrow}</p>
            <h1 className="text-shadow-hero mt-2 text-[clamp(1.8rem,4vw,2.7rem)] text-white">
              {charger.fullName}
            </h1>
            <p className="text-shadow-hero mt-6 text-sm leading-relaxed text-white/90">
              {charger.description}
            </p>

            {charger.specsTitle && (
              <h2 className="text-shadow-hero mt-9 text-[clamp(1.5rem,3vw,2.1rem)] font-normal text-white">
                {charger.specsTitle}
              </h2>
            )}

            <div className="text-shadow-hero mt-8">
              <ListaEnDosColumnas items={charger.specs} />
            </div>

            <PriceTag
              label={charger.priceLabel}
              dark
              size="lg"
              className="text-shadow-hero mt-12 text-center"
            />
            <div className="mt-4 text-center">
              <Link to={charger.quoteHref} className="btn-primary px-9">
                PRESUPUESTO
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120} className="space-y-10 lg:pt-6">
            {charger.video && (
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
                <iframe
                  src={charger.video}
                  title={`Vídeo del ${charger.fullName}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            )}

            {charger.benefits.length > 0 && (
              <div>
                <h2 className="text-shadow-hero text-center text-[clamp(1.5rem,3vw,2.1rem)] font-normal text-white">
                  Beneficios principales
                </h2>
                <div className="text-shadow-hero mt-8">
                  <ListaEnDosColumnas items={charger.benefits} />
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <ProofStrip compact />

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="section bg-white">
          <div className="container-x max-w-4xl">
            <Reveal>
              <h2 className="mb-10 text-center text-[clamp(1.4rem,3vw,2rem)] font-bold text-[color:var(--color-brand)]">
                {charger.faqTitle}
              </h2>
              <Accordion items={faqs} defaultOpen={0} />
            </Reveal>
          </div>
        </section>
      )}

      {!fichaReducida && (
        <ContactStrip
          variant="light"
          title="Contacto"
          intro={null}
          phone={site.phoneMarcas}
          phoneHref={site.phoneMarcasHref}
          schedule={site.scheduleMarcas}
          options={serviceOptionsMarcas}
        />
      )}
    </>
  );
}
