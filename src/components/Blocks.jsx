import { Fragment } from 'react';
import { Link } from 'react-router';
import Picture, { SIZES } from './Picture.jsx';

/** Envuelve un fragmento en su enlace (interno o externo) si lo lleva. */
function Part({ part }) {
  const content = part.bold ? <strong>{part.text}</strong> : part.text;
  if (!part.href) return content;
  if (part.href.startsWith('/')) return <Link to={part.href}>{content}</Link>;
  return (
    <a href={part.href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
}

/**
 * Ítem de lista: el original resalta en negrita la etiqueta que precede a los dos
 * puntos («Capacidad: 1024 Wh»). Solo se aplica a etiquetas cortas para no marcar
 * frases enteras que casualmente contengan «: ».
 */
function ListItem({ item }) {
  if (typeof item !== 'string') return item;
  const at = item.indexOf(': ');
  if (at < 0 || at >= 60) return item;
  return (
    <>
      <strong>{item.slice(0, at)}</strong>
      {item.slice(at)}
    </>
  );
}

/** Parte «Capacidad: 1024 Wh» en rótulo y valor. Devuelve null si no tiene esa forma. */
const partirEspec = (item) => {
  if (typeof item !== 'string') return null;
  const at = item.indexOf(': ');
  if (at < 0 || at >= 40) return null;
  return [item.slice(0, at).replace(/\s*:$/, ''), item.slice(at + 2)];
};

/** Una lista es una tabla de especificaciones si casi todos sus ítems son rótulo + valor. */
const esListaDeEspecs = (items) => {
  if (items.length < 3) return false;
  const conRotulo = items.filter((i) => partirEspec(i)).length;
  return conRotulo / items.length >= 0.7;
};

/**
 * Especificaciones como lista de definición.
 * En una lista de viñetas, «Capacidad:» y «1024 Wh» tienen el mismo tamaño, peso y color, así
 * que no se puede recorrer con la vista buscando un dato concreto.
 */
function SpecList({ items }) {
  return (
    <dl className="prose-wide my-6 grid gap-x-6 border-t border-[color:var(--color-line)] text-[0.9375rem] sm:grid-cols-[minmax(9rem,14rem)_1fr]">
      {items.map((item, i) => {
        const par = partirEspec(item);
        if (!par) {
          return (
            <div key={i} className="border-b border-[color:var(--color-line)] py-2.5 sm:col-span-2">
              {item}
            </div>
          );
        }
        return (
          <Fragment key={i}>
            <dt className="pt-2.5 font-medium text-[color:var(--color-muted)] sm:border-b sm:border-[color:var(--color-line)] sm:pb-2.5">
              {par[0]}
            </dt>
            <dd className="tabular border-b border-[color:var(--color-line)] pb-2.5 font-semibold text-[color:var(--color-ink)] sm:pt-2.5">
              {par[1]}
            </dd>
          </Fragment>
        );
      })}
    </dl>
  );
}

/** Renderiza los bloques de contenido extraídos de las páginas originales. */
export default function Blocks({ blocks = [] }) {
  return (
    <div className="prose-solventium">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return (
              <h2 key={i} id={b.id}>
                {b.text}
              </h2>
            );
          case 'h3':
            return <h3 key={i}>{b.text}</h3>;
          case 'h4':
            return <h4 key={i}>{b.text}</h4>;
          case 'ul':
            if (esListaDeEspecs(b.items)) return <SpecList key={i} items={b.items} />;
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <ListItem item={it} />
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <ListItem item={it} />
                  </li>
                ))}
              </ol>
            );
          case 'img':
            return (
              <figure key={i} className="my-8">
                <Picture src={b.src} alt={b.alt || ''} sizes={SIZES.texto} className="w-full rounded-xl" />
              </figure>
            );
          case 'quote':
            return (
              <blockquote
                key={i}
                className="my-8 border-l-4 border-[color:var(--color-brand)] pl-5 text-lg italic"
              >
                {b.text}
              </blockquote>
            );
          case 'table':
            return (
              <div key={i} className="my-8 overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-sm">
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r} className="border-b border-[color:var(--color-line)]">
                        {row.map((cell, c) => (
                          <td key={c} className={`px-4 py-3 ${r === 0 ? 'font-semibold' : ''}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            // Párrafo: admite marcado en línea por fragmentos (`parts`) o texto
            // completo en negrita (`bold`), además del texto plano de siempre.
            if (b.parts) {
              return (
                <p key={i}>
                  {b.parts.map((part, j) => (
                    <Fragment key={j}>
                      <Part part={part} />
                    </Fragment>
                  ))}
                </p>
              );
            }
            return <p key={i}>{b.bold ? <strong>{b.text}</strong> : b.text}</p>;
        }
      })}
    </div>
  );
}
