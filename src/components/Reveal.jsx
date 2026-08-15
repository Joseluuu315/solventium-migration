import { useEffect, useRef, useState } from 'react';

/** Margen inferior: el elemento se revela un poco antes de asomar del todo. */
const OFFSET = 40;
/** Si ningún mecanismo ha revelado el elemento pasado este tiempo, se muestra igualmente. */
const FAILSAFE_MS = 4000;

/**
 * Anima la entrada del contenido al hacer scroll (equivalente a las animaciones de Elementor).
 *
 * El estado de partida es "oculto", así que la revelación no puede depender de un solo
 * mecanismo: se combinan IntersectionObserver, comprobación de posición en scroll y un
 * último recurso temporal. El contenido nunca se queda invisible.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let done = false;
    let io;
    let timer;

    const cleanup = () => {
      io?.disconnect();
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };

    const show = () => {
      if (done) return;
      done = true;
      setVisible(true);
      cleanup();
    };

    const inViewport = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh - OFFSET && r.bottom > 0;
    };

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (inViewport()) show();
      });
    }

    // threshold 0: basta con que asome un píxel. Con un umbral mayor, las secciones
    // más altas que el viewport nunca llegarían a cumplirlo y quedarían invisibles.
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(([entry]) => entry.isIntersecting && show(), {
        threshold: 0,
        rootMargin: `0px 0px -${OFFSET}px 0px`,
      });
      io.observe(el);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    timer = setTimeout(show, FAILSAFE_MS);

    if (inViewport()) show();

    return cleanup;
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
