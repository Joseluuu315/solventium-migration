import { useMemo, useState } from 'react';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { products } from '../data/products.js';

/**
 * «Instaladores» y «Ropa» existen en el original pero están vacías: una pestaña que abre a
 * nada comunica abandono en la primera pantalla útil de la tienda, así que solo se muestran
 * las que tienen producto.
 */
const CATEGORIES = [
  { key: 'todos', label: 'Todos' },
  { key: 'recarga', label: 'Recarga' },
  { key: 'accesorios', label: 'Accesorios' },
  { key: 'instaladores', label: 'Instaladores' },
  { key: 'ropa', label: 'Ropa' },
].filter(
  (c) => c.key === 'todos' || products.some((p) => p.categories.includes(c.key))
);

const SORTS = [
  { key: 'default', label: 'Orden predeterminado' },
  { key: 'popularity', label: 'Ordenar por popularidad' },
  { key: 'rating', label: 'Ordenar por puntuación media' },
  { key: 'latest', label: 'Ordenar por los últimos' },
  { key: 'price-asc', label: 'Ordenar por precio: bajo a alto' },
  { key: 'price-desc', label: 'Ordenar por precio: alto a bajo' },
];

export default function Tienda() {
  const [cat, setCat] = useState('todos');
  const [sort, setSort] = useState('default');

  const list = useMemo(() => {
    const out = cat === 'todos' ? [...products] : products.filter((p) => p.categories.includes(cat));
    if (sort === 'price-asc') out.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') out.sort((a, b) => b.price - a.price);
    if (sort === 'latest') out.reverse();
    return out;
  }, [cat, sort]);

  return (
    <>
      <Seo
        title="▷ Tienda Online | Solventium"
        description="Compra cargadores y accesorios eléctricos homologados. Productos con envío rápido y soporte técnico especializado en Madrid."
        image="/images/DELTA-2-_2.jpg"
      />

      <section className="section bg-white">
        <div className="container-x">
          <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-normal">Tienda Online</h1>

          <nav
            role="tablist"
            aria-label="Categorías de la tienda"
            className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-2"
          >
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                type="button"
                role="tab"
                aria-selected={cat === c.key}
                onClick={() => setCat(c.key)}
                className="px-1 py-2 text-base transition-colors hover:text-[color:var(--color-brand)]"
              >
                {c.label}
              </button>
            ))}
          </nav>

          {/* La pestaña «Inicio» no lleva título; las de categoría sí. */}
          {cat !== 'todos' && (
            <h2 className="mt-10 text-[clamp(1.4rem,3vw,2rem)]">
              {CATEGORIES.find((c) => c.key === cat).label}
            </h2>
          )}

          {/* El original solo ofrece el selector de orden en «Accesorios». */}
          {cat === 'accesorios' && (
            <label className="mt-6 block">
              <span className="sr-only">Ordenar productos</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-lg border border-[color:var(--color-line)] px-3 py-2 text-sm focus:border-[color:var(--color-brand)]"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          )}

          {list.length > 0 && (
            <div className="mt-10 grid grid-cols-2 gap-7 lg:grid-cols-3">
              {list.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 80}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
