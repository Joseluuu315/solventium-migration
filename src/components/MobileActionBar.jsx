import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { site } from '../data/site.js';
import { IconPhone, IconWhatsapp } from './Icons.jsx';

/** Aparece pasada la primera pantalla, para no competir con el botón del hero. */
const UMBRAL_PX = 620;

/**
 * Barra de acción fija en móvil.
 *
 * La portada supera los 20.000 px en un teléfono y el botón de la cabecera está oculto por
 * debajo de 640 px: sin esto, el visitante recorre veinte pantallas sin una sola vía de
 * contacto a mano. Absorbe también el botón de WhatsApp, que aquí va con etiqueta.
 */
export default function MobileActionBar() {
  const [visible, setVisible] = useState(false);
  const numero = site.whatsapp.replace(/[^\d]/g, '');

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > UMBRAL_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[color:var(--color-ink)]/96 backdrop-blur transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-hidden={!visible}
    >
      <div className="grid grid-cols-[auto_1fr_auto] items-stretch gap-2 px-3 py-2.5">
        <a
          href={`tel:${site.phoneHref}`}
          className="flex flex-col items-center justify-center gap-0.5 rounded-xl px-4 text-white"
          tabIndex={visible ? 0 : -1}
        >
          <IconPhone width="20" height="20" />
          <span className="text-[11px] font-semibold">Llamar</span>
        </a>

        <Link
          to="/contacto"
          className="btn-primary w-full"
          tabIndex={visible ? 0 : -1}
        >
          Pedir presupuesto
        </Link>

        <a
          href={`https://wa.me/${numero}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 rounded-xl px-4 text-[#25d366]"
          tabIndex={visible ? 0 : -1}
        >
          <IconWhatsapp width="20" height="20" />
          <span className="text-[11px] font-semibold text-white">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
