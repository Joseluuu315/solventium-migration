import { Link } from 'react-router';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import NotFound from './NotFound.jsx';
import Picture, { SIZES } from '../components/Picture.jsx';

/** Landings por modelo del original: solo imagen, nombre del modelo y llamada a contacto. */
const modelos = {
  'policharger-nw': { nombre: 'Policharger NW', image: '/images/policharger.webp' },
  'v2c-trydan': { nombre: 'V2C Trydan', image: '/images/v2c.webp' },
  'tesla-wall-conector': {
    nombre: 'Tesla Wall Connector',
    image: '/images/Tesla-Wall-Conector-Gen3-Negro-min.png',
  },
};

export default function Landing({ modelo }) {
  const data = modelos[modelo];
  if (!data) return <NotFound />;

  return (
    <>
      <Seo title={`▷ ${data.nombre} | Solventium`} image={data.image} />

      <section className="section bg-white">
        <div className="container-x max-w-2xl text-center">
          <Reveal>
            <Picture
              src={data.image}
              alt={data.nombre}
              priority
              sizes={SIZES.media}
              className="mx-auto max-h-[420px] w-auto object-contain"
            />
            {/* El original no imprime ningún h1: se añade para lectores de pantalla */}
            <h1 className="sr-only">{data.nombre}</h1>
            <h4 className="mt-8 text-2xl">{data.nombre}</h4>
            <Link to="/contacto" className="btn-primary mt-8 px-8">
              Contactar con Solventium
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
