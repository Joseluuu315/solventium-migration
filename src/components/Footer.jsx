import { Link } from 'react-router';
import { footerLinks, site } from '../data/site.js';
import { socialIcon } from './Icons.jsx';

/** Una única fila: rayo · tres columnas de enlaces · iconos sociales. Sin barra inferior. */
export default function Footer() {
  return (
    <footer className="bg-black p-[2em] text-white">
      <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-10">
        <img
          src="/images/Rayo-Solventium.webp"
          width="188"
          height="188"
          alt=""
          className="h-auto w-[101px] max-w-full md:w-[140px]"
        />

        {footerLinks.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h4 className="mb-5 text-base font-semibold text-white">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-white transition-colors hover:text-[#3A3636]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <ul className="flex w-full max-w-[205px] items-center justify-end gap-[5px] md:ml-auto">
          {site.social.map((s) => {
            const Icon = socialIcon[s.name];
            const glifo = Icon ? <Icon width="24" height="24" /> : s.name[0];
            const clase =
              'grid h-10 w-10 place-items-center rounded-full text-white transition-colors hover:bg-[#3A3636]';
            return (
              <li key={s.name}>
                {s.href ? (
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className={clase}
                  >
                    {glifo}
                  </a>
                ) : (
                  <span aria-label={s.name} role="img" className={clase}>
                    {glifo}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
