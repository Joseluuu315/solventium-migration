import { Link } from 'react-router';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import PageHero from '../components/PageHero.jsx';
import ContactStrip from '../components/ContactStrip.jsx';
import { chargers } from '../data/chargers.js';
import { IconCheck } from '../components/Icons.jsx';
import Picture, { SIZES } from '../components/Picture.jsx';

export default function Cargadores() {
  return (
    <>
      <Seo
        title="▷ Cargadores para coche eléctrico | Solventium"
        description="Compara los cargadores que instalamos en Madrid: Policharger, V2C, Tesla, Wallbox y Woltio. Potencia, conectividad, carga solar y precios desde 1.429 €."
        image="/images/policharger.webp"
      />

      <PageHero
        eyebrow="Instaladores autorizados"
        title="Cargadores para vehículo eléctrico"
        subtitle="Trabajamos con las mejores marcas del mercado. Te ayudamos a elegir el equipo que encaja con tu instalación, tu coche y tu forma de cargar."
        image="/images/CA_Halo-Pole-Mount_LR-1-1-scaled.jpg"
      />

      <section className="section bg-white">
        <div className="container-x">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {chargers.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 100}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)]">
                  <div className="grid aspect-square place-items-center bg-[#f5f5f5] p-8">
                    <Picture
                      src={c.image}
                      alt={c.fullName}
                      sizes={SIZES.tercio}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-xl">
                      {c.brand} <span className="font-normal">{c.model}</span>
                    </h2>
                    <p className="mt-1 text-sm text-[color:var(--color-muted)]">{c.eyebrow}</p>

                    <ul className="mt-5 space-y-2">
                      {c.specs.slice(0, 4).map((s) => (
                        <li key={s} className="flex items-start gap-2 text-sm">
                          <IconCheck className="mt-0.5 shrink-0 text-[color:var(--color-brand)]" />
                          {s}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-6">
                      <p className="text-lg font-bold">Desde {c.price}€</p>
                      <Link to={`/${c.slug}`} className="btn-primary mt-4 w-full">
                        Ver ficha
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactStrip title="¿No sabes cuál elegir?" />
    </>
  );
}
