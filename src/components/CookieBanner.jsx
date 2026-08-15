import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const KEY = 'solventium.cookies';

/**
 * Aviso de cookies.
 *
 * En móvil ocupa una sola línea de texto y dos botones en rejilla: la versión anterior medía
 * 190 px y tapaba a la vez el subtítulo del hero y el botón de contacto flotante, es decir, la
 * frase que explica el negocio y la única vía de contacto visible al cargar.
 *
 * `onDecidir` avisa al Layout para que no monte la barra de acción mientras esto esté delante.
 */
export default function CookieBanner({ onDecidir }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const pendiente = !localStorage.getItem(KEY);
      setVisible(pendiente);
      onDecidir?.(!pendiente);
    } catch {
      onDecidir?.(true);
    }
  }, [onDecidir]);

  const decide = (valor) => {
    try {
      localStorage.setItem(KEY, valor);
    } catch {
      /* almacenamiento no disponible */
    }
    setVisible(false);
    onDecidir?.(true);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/95 backdrop-blur"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="container-x grid gap-3 py-3 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:py-5">
        <p className="text-sm leading-snug text-white/80">
          Usamos cookies para mejorar tu experiencia.{' '}
          <Link to="/politica-de-privacidad" className="underline hover:text-white">
            Más información
          </Link>
          .
        </p>
        <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:gap-3">
          <button type="button" onClick={() => decide('accepted')} className="btn-primary">
            Aceptar
          </button>
          <button type="button" onClick={() => decide('rejected')} className="btn-ghost">
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
}
