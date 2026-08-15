import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import ProseConCarril from '../components/ProseConCarril.jsx';
import ContactStrip from '../components/ContactStrip.jsx';
import ProofStrip from '../components/ProofStrip.jsx';
import { IconArrow, IconCheck, IconChevron } from '../components/Icons.jsx';
import Picture, { fondoOptimizado, SIZES } from '../components/Picture.jsx';
import { featuredChargers } from '../data/chargers.js';
import {
  hero,
  preinstalacion,
  renewables,
  renewablesIntro,
  reforestation,
  seoContent,
  values,
} from '../data/home.js';

/** Cadencia de los dos carruseles de la portada, igual que en el original. */
const AUTOPLAY_MS = 5000;

/** Anclas de la propia portada a las que apunta cada botón «Personalizar». */
const anclaCargador = { policharger: 'poliReal', v2c: 'poli', tesla: 'tesla' };

/** Páginas de producto a las que lleva el botón PRESUPUESTO de cada ficha. */
const rutaCargador = {
  policharger: '/policharger-nw',
  v2c: '/v2c-trydan',
  tesla: '/tesla-wall-conector',
};

/** Vídeos de YouTube que acompañan a dos de las tres fichas. */
const videoCargador = {
  policharger: 'https://www.youtube.com/embed/XcVlueaadDU?start=8',
  v2c: 'https://www.youtube.com/embed/D2H05Og4eb0',
};

/** El slider móvil del comparador escribe el claim de Tesla sin tilde. */
const claimMovil = { tesla: 'Personalidad unica' };

/** Especificaciones que el original oculta en la versión móvil de cada ficha. */
const specsOcultasEnMovil = { v2c: ['Policarbonato MVR'] };

/** Desplazamiento suave hacia una sección de la propia portada. */
function irASeccion(e, id) {
  const destino = document.getElementById(id);
  if (!destino) return;
  e.preventDefault();
  destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Índice que avanza solo cada `AUTOPLAY_MS`, en bucle infinito. */
function useAutoplay(total) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [total]);

  return [index, setIndex];
}

/** Carrusel de mensajes del héroe: fundido de 500 ms entre las tres diapositivas. */
function HeroCarousel({ slides }) {
  const [index] = useAutoplay(slides.length);

  return (
    <div className="mx-auto mt-12 grid w-full max-w-[599px]" aria-live="polite">
      {slides.map((slide, i) => (
        <div
          key={slide.lines[0]}
          aria-hidden={i !== index}
          className={`col-start-1 row-start-1 transition-opacity duration-500 ${
            i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          {/* 2,4vw a 390 px vale 9 px: el subtítulo caía al mínimo y quedaba ilegible. */}
          <h2 className="text-shadow-hero text-[clamp(1.15rem,4.5vw,1.6rem)] leading-snug font-semibold text-white">
            {slide.lines.map((linea) => (
              <span key={linea} className="block">
                {linea}
              </span>
            ))}
          </h2>
          {slide.tagline && (
            <p className="text-shadow-hero mt-5 text-sm text-white/85 sm:text-base">
              <span className="sm:hidden">{slide.taglineMobile}</span>
              <span className="hidden sm:inline">
                {slide.tagline[0]}
                <br />
                {slide.tagline[1]}
              </span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

/** Tarjeta del comparador en su variante móvil: título en una línea y precio con espacio. */
function TarjetaCargadorMovil({ charger }) {
  return (
    <article className="flex h-[400px] flex-col overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)]">
      <div className="grid flex-1 place-items-center bg-[#f5f5f5] p-6">
        <Picture
          src={charger.image}
          alt={charger.fullName}
          sizes="(min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="px-6 py-5 text-center">
        <h3 className="text-lg leading-tight">{`${charger.brand} ${charger.model}`}</h3>
        <p className="mt-2 text-sm text-[color:var(--color-muted)]">
          {claimMovil[charger.slug] ?? charger.cardClaim}
        </p>
        <p className="mt-3 text-lg font-bold text-[color:var(--color-ink)]">
          Desde {charger.price} €
        </p>
        <a
          href={`#${anclaCargador[charger.slug]}`}
          onClick={(e) => irASeccion(e, anclaCargador[charger.slug])}
          className="btn-primary mt-4 w-full"
        >
          Personalizar
        </a>
      </div>
    </article>
  );
}

/** Comparador en móvil y tablet: una tarjeta a la vez, con flechas y autoplay. */
function ComparadorSlider({ chargers }) {
  const [index, setIndex] = useAutoplay(chargers.length);
  const anterior = () => setIndex((i) => (i - 1 + chargers.length) % chargers.length);
  const siguiente = () => setIndex((i) => (i + 1) % chargers.length);

  return (
    <div className="mt-12 lg:hidden">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {chargers.map((c) => (
            <div key={c.slug} className="w-full shrink-0 px-1">
              <TarjetaCargadorMovil charger={c} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={anterior}
          aria-label="Previous slide"
          className="grid h-10 w-10 place-items-center rounded-full bg-white text-[color:var(--color-ink)] shadow-[var(--shadow-card)] transition-colors hover:bg-[color:var(--color-brand)] hover:text-white"
        >
          <IconArrow className="rotate-180" />
        </button>
        <button
          type="button"
          onClick={siguiente}
          aria-label="Next slide"
          className="grid h-10 w-10 place-items-center rounded-full bg-white text-[color:var(--color-ink)] shadow-[var(--shadow-card)] transition-colors hover:bg-[color:var(--color-brand)] hover:text-white"
        >
          <IconArrow />
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title="▷ Instalación de Puntos de Recarga en Madrid | Solventium"
        description="Empresa especializada en instalación de puntos de recarga para coches eléctricos en Madrid. Soluciones para viviendas, empresas, comunidades y parkings. Subvenciones disponibles."
        image={hero.image}
      />

      {/* Hero. 100svh en lugar de vh: con vh, la barra del navegador móvil se come el final. */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-black lg:min-h-[107vh]">
        <Picture
          src={hero.image}
          alt=""
          aria-hidden="true"
          priority
          sizes={SIZES.full}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Velo mínimo: solo lo justo para que el texto blanco siga siendo legible. */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Sin animación de entrada: el titular y el botón que convierten no pueden ser
            lo último en aparecer. El resto de la portada sí la conserva. */}
        <div className="container-x relative pt-[86px] text-center">
          <h2 className="text-shadow-hero text-[clamp(2.1rem,8.5vw,3.6rem)] leading-[1.06] font-semibold tracking-tight text-white uppercase">
            {hero.title[0]}
            <br />
            {hero.title[1]}
          </h2>
          <a
            href={hero.cta.href}
            onClick={(e) => irASeccion(e, 'cargadores')}
            className="btn-primary mt-9 w-full px-10 text-base sm:w-auto"
          >
            {hero.cta.label}
          </a>
          <HeroCarousel slides={hero.slides} />
        </div>
      </section>

      {/* Comparador de cargadores */}
      <section id="cargadores" className="section bg-gradient-to-b from-[#919191] to-white">
        <div className="container-x">
          <Reveal>
            <h2 className="text-center text-[clamp(1.5rem,3vw,2rem)] text-black">
              ¿Qué cargador se ajusta a tus necesidades?
            </h2>
          </Reveal>

          {/* Escritorio: las tres tarjetas en rejilla */}
          <div className="mt-14 hidden gap-8 lg:grid lg:grid-cols-3">
            {featuredChargers.map((c, i) => (
              <Reveal key={c.slug} delay={i * 110}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)]">
                  <div className="grid aspect-square place-items-center bg-[#f5f5f5] p-8">
                    <Picture
                      src={c.image}
                      alt={c.fullName}
                      sizes={SIZES.tercio}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-6 py-7 text-center">
                    <h3 className="text-xl leading-tight">
                      {c.brand}
                      <span className="block font-normal text-[color:var(--color-muted)]">
                        {c.model}
                      </span>
                    </h3>
                    <p className="mt-3 text-sm text-[color:var(--color-muted)]">{c.cardClaim}</p>
                    <p className="mt-5 text-lg font-bold text-[color:var(--color-ink)]">
                      Desde {c.price}€
                    </p>
                    <a
                      href={`#${anclaCargador[c.slug]}`}
                      onClick={(e) => irASeccion(e, anclaCargador[c.slug])}
                      className="btn-primary mt-6 w-full"
                    >
                      Personalizar
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Móvil y tablet: slider de una tarjeta */}
          <ComparadorSlider chargers={featuredChargers} />
        </div>
      </section>

      {/* Fichas de cargador */}
      {featuredChargers.map((c) => {
        const ocultasEnMovil = specsOcultasEnMovil[c.slug] ?? [];
        return (
          <section
            key={c.slug}
            id={anclaCargador[c.slug]}
            className="relative overflow-hidden bg-black"
          >
            <Picture
              src={c.scene}
              alt=""
              aria-hidden="true"
              sizes={SIZES.full}
              className="absolute inset-0 h-full w-full object-cover object-left"
            />
            <div
              className="absolute inset-0 opacity-75"
              style={{ backgroundImage: 'linear-gradient(180deg, transparent 0%, #000 60%)' }}
            />
            <div className="container-x relative py-20 lg:py-28">
              <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
                <Reveal className="lg:w-[59.5%]">
                  <p className="eyebrow text-white/70">{c.eyebrow}</p>
                  <h2 className="mt-3 text-[clamp(1.6rem,3.4vw,2.3rem)] text-white">{c.fullName}</h2>
                  <p className="mt-5 hidden leading-relaxed text-white/75 sm:block">{c.intro}</p>

                  {/* columns-2 reparte por columnas (4+3 y 4+4), como el original */}
                  <ul className="mt-8 md:columns-2 md:gap-x-6">
                    {c.specs.map((s) => (
                      <li
                        key={s}
                        className={`mb-3 break-inside-avoid items-start gap-2.5 text-sm text-white/85 ${
                          ocultasEnMovil.includes(s) ? 'hidden md:flex' : 'flex'
                        }`}
                      >
                        <IconCheck className="mt-0.5 shrink-0 text-[color:var(--color-brand)]" />
                        {s}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 flex flex-wrap items-center gap-5">
                    <span className="text-2xl font-bold text-white">Desde {c.price}€</span>
                    <Link to={rutaCargador[c.slug]} className="btn-primary">
                      PRESUPUESTO
                    </Link>
                  </div>
                </Reveal>

                {videoCargador[c.slug] && (
                  <Reveal delay={140} className="lg:w-[40.5%]">
                    <div className="mx-auto aspect-video w-[83%]">
                      <iframe
                        src={videoCargador[c.slug]}
                        title={c.fullName}
                        loading="lazy"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full rounded-xl border-0"
                      />
                    </div>
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        );
      })}

      {/* Preinstalaciones comunitarias: el único bloque asimétrico de la portada, y por tanto
          su pico visual. Es además el segmento de mayor ticket: un edificio son muchos
          cargadores más mantenimiento. */}
      <section className="bg-[color:var(--color-ink)]">
        <div className="grid lg:grid-cols-[55fr_45fr]">
          <div className="relative min-h-[280px] lg:min-h-[560px]">
            <Picture
              src={preinstalacion.image}
              alt=""
              aria-hidden="true"
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/25 lg:hidden" />
          </div>

          <Reveal className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:py-20">
            <p className="eyebrow-on-dark">{preinstalacion.eyebrow}</p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.4vw,3rem)] text-white">
              {preinstalacion.title}
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-white/75">{preinstalacion.text}</p>

            <ol className="mt-8 grid gap-3">
              {['Diagnóstico del garaje', 'Canalización única', 'Alta por vecino'].map((paso, i) => (
                <li key={paso} className="flex items-baseline gap-3 text-white/90">
                  <span className="tabular text-sm font-bold text-[color:var(--color-brand-on-dark)]">
                    0{i + 1}
                  </span>
                  {paso}
                </li>
              ))}
            </ol>

            <div>
              <Link to={preinstalacion.cta.to} className="btn-primary mt-9 px-9">
                {preinstalacion.cta.label}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Valores: dos tarjetas grandes arriba y tres pequeñas debajo */}
      <section className="section bg-gradient-to-b from-[#838383] to-white">
        <div className="container-x">
          <Reveal>
            <h2 className="text-center text-[clamp(1.5rem,3vw,2rem)]">¿Por qué escoger Solventium?</h2>
          </Reveal>

          <div className="mx-auto mt-14 grid gap-6 md:grid-cols-2 lg:w-[70%]">
            {values.slice(0, 2).map((v, i) => (
              <TarjetaValor key={v.title} valor={v} delay={i * 90} alto="min-h-[250px]" />
            ))}
          </div>
          <div className="mx-auto mt-6 grid gap-6 md:grid-cols-3 lg:w-[70%]">
            {values.slice(2).map((v, i) => (
              <TarjetaValor key={v.title} valor={v} delay={i * 90} alto="min-h-[150px]" />
            ))}
          </div>
        </div>
      </section>

      <ProofStrip />

      {/* Renovables: una sola sección con tres tarjetas, en lugar de tres bandas
          intercambiables con el mismo rótulo, el mismo titular y el mismo botón. */}
      <section className="section-chapter bg-[color:var(--color-ink)]">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:items-start lg:gap-16">
          <Reveal>
            <p className="eyebrow-on-dark">{renewablesIntro.eyebrow}</p>
            <h2 className="mt-3 text-h2 text-white">{renewablesIntro.title}</h2>
            <p className="mt-5 leading-relaxed text-white/70">{renewablesIntro.text}</p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-3">
            {renewables.map((r, i) => (
              <Reveal key={r.title} delay={i * 90}>
                <Link
                  to={r.to}
                  className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl"
                >
                  <Picture
                    src={r.image}
                    alt=""
                    aria-hidden="true"
                    sizes={SIZES.tercio}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="scrim-bottom absolute inset-0" />
                  <div className="relative p-5">
                    <h3 className="text-h3 text-white">{r.short}</h3>
                    <p className="mt-2 text-sm leading-snug text-white/80">{r.claim}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[color:var(--color-brand-on-dark)]">
                      Ver detalle
                      <IconArrow width="16" height="16" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reforestación */}
      <section className="section bg-gradient-to-b from-[#838383] to-white">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="text-[1.8rem] font-semibold text-[#070707]">{reforestation.kicker}</h2>
            <h2 className="text-[1.8rem] font-semibold text-[#070707]">{reforestation.title}</h2>
          </Reveal>

          <Reveal delay={120}>
            <div
              role="img"
              aria-label="Voluntarios del programa de reforestación"
              className="mx-auto mt-10 min-h-[25vh] w-[80%] rounded-xl bg-cover bg-center lg:min-h-[45vh]"
              style={{ backgroundImage: fondoOptimizado(reforestation.image) }}
            />
          </Reveal>

          <Reveal delay={200} className="mx-auto mt-12 max-w-3xl">
            <h3 className="text-[1.7rem] leading-snug font-semibold text-[#070707]">
              {reforestation.subtitle.map((s) => (
                <span key={s} className="block">
                  {s}
                </span>
              ))}
            </h3>
            <p className="mt-6 leading-relaxed text-[#070707]">{reforestation.text}</p>
            <Link to={reforestation.cta.href} className="btn-primary mt-9 gap-2 px-9">
              {reforestation.cta.label}
              <IconArrow />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Presupuesto antes del muro de texto: hasta aquí, la portada nunca ofrecía un campo
          donde escribir y todos los CTA obligaban a cambiar de página perdiendo el scroll. */}
      <ContactStrip
        id="presupuesto"
        title="Cuéntanos tu caso"
        intro="Estudio técnico sin compromiso y gestión de la subvención incluida. Te respondemos en menos de 24 horas laborables."
        tipos
      />

      {/* Contenido SEO, plegado por defecto */}
      <section className="section bg-white">
        <div className="container-x max-w-4xl">
          <Reveal>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-center gap-3 text-center text-[clamp(1.1rem,2.4vw,1.4rem)] font-semibold text-[color:var(--color-ink)] [&::-webkit-details-marker]:hidden">
                {seoContent.accordionTitle}
                <IconChevron className="shrink-0 text-[color:var(--color-brand)] transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="mt-10">
                <h1 className="mb-6 text-h2">{seoContent.title}</h1>
                <ProseConCarril
                  blocks={seoContent.blocks}
                  cta={{
                    title: '¿Cuánto cuesta en tu caso?',
                    text: 'Cada instalación depende del cuadro eléctrico, la distancia y el cargador. Te lo calculamos sin compromiso.',
                    label: 'Pedir presupuesto',
                    to: '/contacto',
                  }}
                />
              </div>
            </details>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** Tarjeta del bloque «¿Por qué escoger Solventium?». El texto solo existe en dos de ellas. */
function TarjetaValor({ valor, delay, alto }) {
  return (
    <Reveal delay={delay}>
      <article className={`group relative flex ${alto} flex-col justify-end overflow-hidden rounded-2xl`}>
        <Picture
          src={valor.image}
          alt=""
          aria-hidden="true"
          sizes={SIZES.media}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/5" />
        <div className="relative p-[1em]">
          <h3 className="text-[1.4rem] font-semibold text-white">{valor.title}</h3>
          {valor.text && <p className="mt-2 text-sm leading-relaxed text-white/80">{valor.text}</p>}
        </div>
      </article>
    </Reveal>
  );
}
