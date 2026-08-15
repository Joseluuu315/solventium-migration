import { useState } from 'react';
import { IconChevron } from './Icons.jsx';

export default function Accordion({ items = [], defaultOpen = null }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="divide-y divide-[color:var(--color-line)] overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-[color:var(--color-ink)] transition-colors hover:text-[color:var(--color-brand)] sm:px-7"
              >
                <span>{item.q}</span>
                <IconChevron
                  className={`shrink-0 text-[color:var(--color-brand)] transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  width="20"
                  height="20"
                />
              </button>
            </h3>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 leading-relaxed text-[color:var(--color-muted)] sm:px-7">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
