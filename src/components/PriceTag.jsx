/**
 * Precio de partida.
 *
 * Es el dato que cierra la venta y estaba a 24 px, por debajo del titular de sección. Aquí el
 * rótulo («Desde») se separa arriba en pequeño y la cifra manda, con cifras tabulares para que
 * los precios se alineen al compararlos entre fichas.
 */
export default function PriceTag({ label, dark = false, size = 'md', className = '' }) {
  // "Desde 1499€" → rótulo + cifra
  const m = /^(\D*?)\s*([\d][\d.,\s]*\s*€.*)$/.exec(label ?? '');
  const rotulo = m ? m[1].trim() : null;
  const cifra = m ? m[2].trim() : label;

  const tam = size === 'lg' ? 'text-[2.125rem]' : 'text-2xl';

  return (
    <p className={className}>
      {rotulo && (
        <span
          className={`block text-[0.9375rem] font-medium ${
            dark ? 'text-white/70' : 'text-[color:var(--color-muted)]'
          }`}
        >
          {rotulo}
        </span>
      )}
      <span
        className={`tabular block leading-none font-extrabold ${tam} ${
          dark ? 'text-white' : 'text-[color:var(--color-ink)]'
        }`}
      >
        {cifra}
      </span>
    </p>
  );
}
