import { Link } from 'react-router';
import Seo from '../components/Seo.jsx';
import { formatPrice, useCart } from '../context/CartContext.jsx';
import { IconCart } from '../components/Icons.jsx';

export default function Carrito() {
  const { items, total, setQty, remove, clear } = useCart();

  return (
    <>
      <Seo title="Carrito | Solventium" description="Revisa los productos de tu pedido." />

      <section className="section">
        <div className="container-x max-w-4xl">
          <h1 className="text-[clamp(1.8rem,4vw,2.6rem)]">Carrito</h1>

          {items.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-[color:var(--color-line)] p-14 text-center">
              <IconCart width="40" height="40" className="mx-auto text-[color:var(--color-muted)]" />
              <p className="mt-5 text-[color:var(--color-muted)]">Tu carrito está vacío.</p>
              <Link to="/tienda" className="btn-primary mt-7 px-8">
                Ir a la tienda
              </Link>
            </div>
          ) : (
            <>
              <ul className="mt-10 divide-y divide-[color:var(--color-line)] border-y border-[color:var(--color-line)]">
                {items.map((item) => (
                  <li key={item.slug} className="flex flex-wrap items-center gap-5 py-5">
                    <img
                      src={item.image}
                      alt=""
                      className="h-20 w-20 shrink-0 rounded-lg bg-[#f5f5f5] object-contain p-2"
                    />
                    <div className="min-w-[180px] flex-1">
                      <h2 className="text-base">
                        <Link
                          to={`/producto/${item.slug}`}
                          className="hover:text-[color:var(--color-brand)]"
                        >
                          {item.name}
                        </Link>
                      </h2>
                      <p className="mt-1 text-sm text-[color:var(--color-muted)]">
                        {formatPrice(item.price)} / ud.
                      </p>
                    </div>

                    <div className="flex items-center rounded-full border border-[color:var(--color-line)]">
                      <button
                        type="button"
                        onClick={() => setQty(item.slug, item.qty - 1)}
                        className="px-3.5 py-2 leading-none"
                        aria-label={`Reducir ${item.name}`}
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(item.slug, item.qty + 1)}
                        className="px-3.5 py-2 leading-none"
                        aria-label={`Aumentar ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    <p className="w-24 text-right font-bold">{formatPrice(item.price * item.qty)}</p>

                    <button
                      type="button"
                      onClick={() => remove(item.slug)}
                      className="text-sm text-[color:var(--color-muted)] underline hover:text-[color:var(--color-brand)]"
                    >
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
                <button
                  type="button"
                  onClick={clear}
                  className="text-sm text-[color:var(--color-muted)] underline hover:text-[color:var(--color-brand)]"
                >
                  Vaciar carrito
                </button>

                <div className="text-right">
                  <p className="text-sm text-[color:var(--color-muted)]">Subtotal (IVA incl.)</p>
                  <p className="text-2xl font-bold">{formatPrice(total)}</p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-[#f7f7f7] p-6">
                <p className="text-sm leading-relaxed text-[color:var(--color-muted)]">
                  Esta réplica no incluye pasarela de pago. Para finalizar el pedido escríbenos a{' '}
                  <a
                    href="mailto:contacto@solventium.es"
                    className="font-semibold text-[color:var(--color-brand)]"
                  >
                    contacto@solventium.es
                  </a>{' '}
                  o llámanos y lo tramitamos contigo.
                </p>
                <div className="mt-5 flex flex-wrap gap-4">
                  <Link to="/contacto" className="btn-primary px-8">
                    Finalizar por contacto
                  </Link>
                  <Link to="/tienda" className="btn-dark px-8">
                    Seguir comprando
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
