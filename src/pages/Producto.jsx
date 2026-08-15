import { useState } from 'react';
import { Link, useParams } from 'react-router';
import Seo from '../components/Seo.jsx';
import ProseConCarril from '../components/ProseConCarril.jsx';
import { getProduct } from '../data/products.js';
import { formatPrice, useCart } from '../context/CartContext.jsx';
import NotFound from './NotFound.jsx';
import Picture, { SIZES } from '../components/Picture.jsx';

export default function Producto() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const [active, setActive] = useState(0);
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  if (!product) return <NotFound />;

  const onSale = product.regular && product.regular > product.price;

  // El original no muestra selector de cantidad: siempre añade una unidad.
  const addToCart = () => {
    add(
      { slug: product.slug, name: product.name, price: product.price, image: product.gallery[0] },
      1
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <>
      <Seo title={product.meta.title} description={product.meta.description} image={product.gallery[0]} />

      <section className="pt-10 pb-16 sm:pt-14">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Galería */}
            <div>
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f5f5f5]">
                <Picture
                  src={product.gallery[active]}
                  alt={product.name}
                  priority
                  sizes={SIZES.media}
                  className="h-full w-full object-contain p-8"
                />
              </div>

              {product.gallery.length > 1 && (
                <div className="mt-4 grid grid-cols-5 gap-3">
                  {product.gallery.map((img, i) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Ver imagen ${i + 1}`}
                      className={`aspect-square overflow-hidden rounded-lg border-2 bg-[#f5f5f5] transition-colors ${
                        active === i
                          ? 'border-[color:var(--color-brand)]'
                          : 'border-transparent hover:border-[color:var(--color-line)]'
                      }`}
                    >
                      <img src={img} alt="" loading="lazy" className="h-full w-full object-contain p-1.5" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Resumen */}
            <div>
              <h1 className="text-[clamp(1.6rem,3.4vw,2.3rem)]">{product.name}</h1>

              <p className="mt-5 flex items-baseline gap-3">
                {onSale && (
                  <span className="text-lg text-[color:var(--color-muted)] line-through">
                    {formatPrice(product.regular)}
                  </span>
                )}
                <span className="text-3xl font-bold text-[color:var(--color-ink)]">
                  {formatPrice(product.price)}
                </span>
              </p>

              <p className="mt-6 leading-relaxed text-[color:var(--color-body)]">{product.short}</p>

              <button
                type="button"
                onClick={addToCart}
                className="btn-primary mt-9 w-full rounded-md uppercase"
              >
                Añadir al carrito
              </button>

              {added && (
                <p className="mt-3 text-sm font-semibold text-[color:var(--color-brand)]" role="status">
                  Añadido ✓{' '}
                  <Link to="/carrito" className="underline">
                    Ver carrito
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Descripción. Nadie la lee de arriba abajo: se busca «Garantía» o «Contenido de la
          caja», así que lleva índice lateral. */}
      {product.blocks.length > 0 && (
        <section className="pb-16">
          <div className="container-x">
            <ProseConCarril
              blocks={product.blocks}
              cta={{
                title: '¿Dudas con este equipo?',
                text: 'Te decimos si encaja con tu instalación antes de que lo compres.',
                label: 'Preguntar',
                to: `/contacto?servicio=${encodeURIComponent(product.name)}`,
              }}
            />
          </div>
        </section>
      )}
    </>
  );
}
