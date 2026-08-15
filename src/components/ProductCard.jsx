import { Link } from 'react-router';
import { formatPrice, useCart } from '../context/CartContext.jsx';
import Picture, { SIZES } from './Picture.jsx';

export default function ProductCard({ product }) {
  const { add } = useCart();
  const onSale = product.regular && product.regular > product.price;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
      <Link to={`/producto/${product.slug}`} className="relative block aspect-square overflow-hidden bg-[#f5f5f5]">
        <Picture
          src={product.gallery[0]}
          alt={product.name}
          sizes={SIZES.cuarto}
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base leading-snug">
          <Link to={`/producto/${product.slug}`} className="transition-colors hover:text-[color:var(--color-brand)]">
            {product.name}
          </Link>
        </h3>

        <p className="mt-3 flex items-baseline gap-2">
          {onSale && (
            <span className="text-sm text-[color:var(--color-muted)] line-through">
              {formatPrice(product.regular)}
            </span>
          )}
          <span className="text-lg font-bold text-[color:var(--color-ink)]">
            {formatPrice(product.price)}
          </span>
        </p>

        <button
          type="button"
          onClick={() =>
            add({ slug: product.slug, name: product.name, price: product.price, image: product.gallery[0] })
          }
          className="btn-primary mt-auto w-full pt-2.5"
        >
          Añadir al carrito
        </button>
      </div>
    </article>
  );
}
