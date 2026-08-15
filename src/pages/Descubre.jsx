import { useState } from 'react';
import { Link } from 'react-router';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import PageHero from '../components/PageHero.jsx';
import { process, testimonials, tools } from '../data/descubre.js';
import { reforestation } from '../data/home.js';
import { mosaicSlugs } from '../data/posts.js';
import { BlogMosaic } from './Blog.jsx';
import Picture, { SIZES } from '../components/Picture.jsx';

const HERO_IMAGE = '/images/istockphoto-517188688-1024x1024-1.jpg';

export default function Descubre() {
  const [slide, setSlide] = useState(0);

  return (
    <>
      <Seo
        title="▷ Descubre | Solventium"
        description="Información clara sobre movilidad eléctrica, subvenciones y soluciones de carga en Madrid. Aprende cómo elegir tu punto de recarga ideal."
        image={HERO_IMAGE}
      />

      <PageHero title="¿Quiénes Somos?" image={HERO_IMAGE} height="lg">
        <div className="w-full sm:w-[60%]">
          <div className="relative aspect-video w-full overflow-hidden bg-black">
            <iframe
              src="https://www.youtube.com/embed/qilSqbt2pMs"
              title="Solventium"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      </PageHero>

      {/* Proceso */}
      <section className="section bg-white">
        <div className="container-x">
          <Reveal>
            <h2 className="text-center text-[clamp(1.5rem,3vw,2.1rem)]">Nuestro proceso</h2>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 110}>
                <article className="relative h-full rounded-2xl border border-[color:var(--color-line)] bg-white p-8 transition-shadow duration-300 hover:shadow-[var(--shadow-card)]">
                  <span className="block text-5xl font-bold text-[color:var(--color-brand)]">
                    {p.step}
                  </span>
                  <h3 className="mt-4 text-2xl">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-[color:var(--color-muted)]">{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Herramientas de movilidad */}
      <section className="section bg-[#f7f7f7]">
        <div className="container-x">
          <Reveal>
            <h2 className="text-center text-[clamp(1.4rem,3vw,2rem)] tracking-[0.08em] uppercase">
              Herramientas de movilidad
            </h2>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-[990px] gap-6 md:grid-cols-2">
            {tools.map((t, i) => (
              <Reveal key={t.to} delay={i * 120}>
                <Link
                  to={t.to}
                  className="group relative flex h-64 items-center justify-center overflow-hidden rounded-2xl"
                >
                  <Picture
                    src={t.image}
                    alt=""
                    aria-hidden="true"
                    sizes={SIZES.media}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/45" />
                  <h3 className="text-shadow-hero relative px-6 text-center text-xl leading-tight text-white uppercase sm:text-2xl">
                    {t.title.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="section bg-white">
        <div className="container-x">
          <Reveal>
            <h2 className="text-center text-[clamp(1.5rem,3vw,2.1rem)]">Explora nuestro blog</h2>
          </Reveal>

          <Reveal delay={120} className="mt-12">
            <BlogMosaic slugs={mosaicSlugs} headingTag="h3" />
          </Reveal>
        </div>
      </section>

      {/* Reforestación */}
      <section className="section bg-white">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="text-[clamp(1.5rem,3vw,2.1rem)]">{reforestation.kicker}</h2>
            <h2 className="text-[clamp(1.5rem,3vw,2.1rem)]">{reforestation.title}</h2>
          </Reveal>

          <Reveal delay={120} className="relative mt-10 overflow-hidden rounded-2xl bg-black">
            <Picture
              src={reforestation.image}
              alt=""
              aria-hidden="true"
              sizes={SIZES.full}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative px-6 py-24 sm:px-12 lg:py-32">
              <h3 className="text-shadow-hero text-xl leading-snug text-white sm:text-3xl">
                {reforestation.subtitle.map((s) => (
                  <span key={s} className="block">
                    {s}
                  </span>
                ))}
              </h3>
              <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-white/85">
                {reforestation.text}
              </p>
              <Link to={reforestation.cta.href} className="btn-primary mt-9 px-9">
                {reforestation.cta.label}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonios: carrusel con puntos de paginación, como en el original */}
      <section className="section bg-white" aria-label="Opiniones de clientes">
        <div className="container-x max-w-3xl">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${slide * 100}%)` }}
            >
              {testimonials.map((t) => (
                <figure key={t.name} className="w-full shrink-0 px-2 text-center">
                  <blockquote className="leading-relaxed text-[color:var(--color-body)]">
                    {t.text}
                  </blockquote>
                  <div className="mt-6 text-lg" aria-label="5 sobre 5 estrellas">
                    ⭐️⭐️⭐️⭐️⭐️
                  </div>
                  <figcaption className="mt-6 flex flex-col items-center gap-3">
                    <img
                      src={t.avatar}
                      alt=""
                      loading="lazy"
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <span className="font-semibold text-[color:var(--color-ink)]">{t.name}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="mt-9 flex justify-center gap-3">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setSlide(i)}
                aria-label={`Ver la opinión de ${t.name}`}
                aria-current={i === slide}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === slide
                    ? 'bg-[color:var(--color-brand)]'
                    : 'bg-[color:var(--color-line)] hover:bg-[color:var(--color-muted)]'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
