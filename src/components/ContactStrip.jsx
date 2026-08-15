import { site } from '../data/site.js';
import { IconClock, IconMail, IconPhone, IconPin } from './Icons.jsx';
import ContactForm, { TIPOS_INSTALACION } from './ContactForm.jsx';
import Reveal from './Reveal.jsx';

const INTRO_POR_DEFECTO =
  'Cuéntanos tu caso y te preparamos un estudio técnico sin compromiso, con la gestión de subvenciones incluida.';

/**
 * Bloque de contacto que cierra las páginas de cargador, igual que en el sitio original.
 * `variant="light"` es la versión de las páginas de marca: fondo blanco y sin párrafo de entrada.
 */
export default function ContactStrip({
  title = 'Pide tu presupuesto',
  id = 'presupuesto',
  variant = 'dark',
  intro = INTRO_POR_DEFECTO,
  phone = site.phone,
  phoneHref = site.phoneHref,
  schedule = site.schedule,
  options,
  tipos = false,
}) {
  const claro = variant === 'light';
  const cls = {
    section: claro ? 'bg-white' : 'bg-[color:var(--color-ink)] text-white',
    heading: claro ? '' : 'text-white',
    text: claro ? 'text-[color:var(--color-muted)]' : 'text-white/65',
    strong: claro ? 'text-[color:var(--color-ink)]' : 'text-white',
    line: claro ? 'border-[color:var(--color-line)]' : 'border-white/10',
    link: claro ? 'hover:text-[color:var(--color-brand)]' : 'hover:text-white',
  };

  return (
    <section id={id} className={`section ${cls.section}`}>
      <div className="container-x grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <h2 className={`text-3xl sm:text-4xl ${cls.heading}`}>{title}</h2>
          {intro && <p className={`mt-4 max-w-lg leading-relaxed ${cls.text}`}>{intro}</p>}
          <div className={intro ? 'mt-10' : 'mt-8'}>
            <ContactForm
              dark={!claro}
              withAddress={false}
              options={options}
              tipos={tipos ? TIPOS_INSTALACION : null}
            />
          </div>
        </Reveal>

        <Reveal delay={120} className="space-y-8">
          <div>
            <h3 className={`mb-4 flex items-center gap-2 text-lg ${cls.heading}`}>
              <IconClock className="text-[color:var(--color-brand)]" />
              Nuestros horarios
            </h3>
            <ul className={`space-y-1 ${cls.text}`}>
              {schedule.map((s) => (
                <li key={s.days} className={`flex justify-between gap-6 border-b py-2 ${cls.line}`}>
                  <span>{s.days}</span>
                  <span className={`font-medium ${cls.strong}`}>{s.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`mb-3 flex items-center gap-2 text-lg ${cls.heading}`}>
              <IconPin className="text-[color:var(--color-brand)]" />
              Localización
            </h3>
            <p className={`leading-relaxed ${cls.text}`}>{site.address}</p>
          </div>

          <div>
            <h3 className={`mb-3 text-lg ${cls.heading}`}>Contacta con nosotros</h3>
            <p className={`flex items-center gap-2 ${cls.text}`}>
              <IconPhone className="text-[color:var(--color-brand)]" />
              <span className={`font-semibold ${cls.strong}`}>Teléfono:</span>
              <a href={`tel:${phoneHref}`} className={`transition-colors ${cls.link}`}>
                {phone}
              </a>
            </p>
            <p className={`mt-2 flex items-center gap-2 ${cls.text}`}>
              <IconMail className="text-[color:var(--color-brand)]" />
              <span className={`font-semibold ${cls.strong}`}>Email:</span>
              <a href={`mailto:${site.email}`} className={`transition-colors ${cls.link}`}>
                {site.email}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
