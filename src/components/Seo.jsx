import { useEffect } from 'react';

const setMeta = (attr, key, content) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

/** Actualiza title y metadatos por página, como hacía Yoast en el sitio original. */
export default function Seo({ title, description, image }) {
  // Al prerenderizar no hay efectos ni DOM: los metadatos se recogen aquí para que el script
  // los escriba en el HTML servido. Es lo único que ven los rastreadores que no ejecutan JS.
  if (typeof document === 'undefined' && globalThis.__SEO__) {
    Object.assign(globalThis.__SEO__, { title, description, image });
  }

  useEffect(() => {
    if (title) document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', 'website');
    if (image) setMeta('property', 'og:image', new URL(image, window.location.origin).href);

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = window.location.origin + window.location.pathname;
  }, [title, description, image]);

  return null;
}
