import { Link } from 'react-router';
import Seo from '../components/Seo.jsx';

export default function NotFound() {
  return (
    <>
      <Seo title="Página no encontrada | Solventium" description="La página que buscas no existe." />

      <section className="section">
        <div className="container-x max-w-xl py-20 text-center">
          <p className="text-[clamp(4rem,12vw,7rem)] leading-none font-bold text-[color:var(--color-brand)]">
            404
          </p>
          <h1 className="mt-4 text-2xl">Esta página no existe</h1>
          <p className="mt-4 leading-relaxed text-[color:var(--color-muted)]">
            Puede que el enlace esté roto o que la página se haya movido. Vuelve al inicio o
            escríbenos y te ayudamos.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-primary px-8">
              Ir al inicio
            </Link>
            <Link to="/contacto" className="btn-dark px-8">
              Contactar
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
