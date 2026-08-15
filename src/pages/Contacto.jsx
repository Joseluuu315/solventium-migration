import { useSearchParams } from 'react-router';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import ContactForm, { TIPOS_INSTALACION } from '../components/ContactForm.jsx';
import ProofStrip from '../components/ProofStrip.jsx';
import { site } from '../data/site.js';
import Picture, { SIZES } from '../components/Picture.jsx';

/** El original parte la dirección en dos líneas: la calle y, debajo, provincia y país. */
const splitAddress = (address) => {
  const i = address.lastIndexOf(', Madrid, España');
  return i > 0 ? [`${address.slice(0, i)},`, address.slice(i + 2)] : [address];
};

export default function Contacto() {
  const addressLines = splitAddress(site.address);
  // Quien llega desde una ficha o desde un servicio trae su contexto en la URL:
  // no tiene que volver a explicar qué quiere.
  const [params] = useSearchParams();
  const servicio = params.get('servicio') ?? '';

  return (
    <>
      <Seo
        title="▷ Contacto | Solventium"
        description="Contacta con Solventium para asesoramiento o presupuestos sobre puntos de recarga en Madrid. Atención personalizada y respuesta rápida."
      />

      <section className="relative flex h-[600px] items-center justify-center overflow-hidden bg-black">
        <Picture
          src="/images/contacto-solventium.webp"
          alt=""
          aria-hidden="true"
          priority
          sizes={SIZES.full}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative px-5 text-center">
          <h1 className="text-shadow-hero text-4xl font-bold text-white sm:text-5xl lg:text-[64px]">
            Contacta con nosotros
          </h1>
          {servicio && (
            <p className="text-shadow-hero mt-4 text-lg text-white/85">
              Sobre <span className="font-semibold text-white">{servicio}</span>
            </p>
          )}
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            {/* En el original el formulario va sobre un panel azul claro redondeado */}
            <Reveal className="rounded-2xl bg-[#e4f2fb] p-6 sm:p-9">
              <ContactForm tipos={TIPOS_INSTALACION} servicioInicial={servicio} />
            </Reveal>

            <Reveal delay={120} className="space-y-7">
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold">Contacto</h2>

              <div>
                <h3 className="font-bold">Nuestros horarios</h3>
                {site.schedule.map((s) => (
                  <p key={s.days} className="mt-3 leading-relaxed text-[color:var(--color-muted)]">
                    <span className="block">{s.hours}</span>
                    <span className="block">{s.days}</span>
                  </p>
                ))}
              </div>

              <div>
                <h3 className="font-bold">Localización</h3>
                <p className="mt-3 leading-relaxed text-[color:var(--color-muted)]">
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>

              <div>
                <h3 className="font-bold">Contacta con nosotros</h3>
                <p className="mt-3">
                  <span className="font-bold">Teléfono:</span>{' '}
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="text-[color:var(--color-brand)] hover:underline"
                  >
                    {site.phone}
                  </a>
                </p>
                <p className="mt-2">
                  <span className="font-bold">Email:</span>{' '}
                  <a
                    href={`mailto:${site.email}`}
                    className="text-[color:var(--color-brand)] hover:underline"
                  >
                    {site.email}
                  </a>
                </p>
              </div>

              {/* El mapa ocupaba una cuarta parte de la última pantalla antes de rellenar el
                  formulario, para enseñar un polígono al que el cliente no va a ir. */}
              <div className="h-[260px] overflow-hidden rounded-2xl bg-[#eee]">
                <iframe
                  title="Ubicación de Solventium en Las Rozas de Madrid"
                  src="https://www.google.com/maps?q=Calle%20Londres%2014%2C%2028232%20Las%20Rozas%20de%20Madrid&output=embed"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ProofStrip compact />
    </>
  );
}
