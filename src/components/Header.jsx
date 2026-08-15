import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { nav, site } from '../data/site.js';
import { formatPrice, useCart } from '../context/CartContext.jsx';
import { IconCart, IconChevron, IconClose, IconMenu, IconPhone } from './Icons.jsx';

export default function Header({ transparent = false, variant = 'default' }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState(null);
  const { count, total } = useCart();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenSub(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Cabecera blanca exclusiva de la tienda: logo, título y carrito, sin navegación
  if (variant === 'tienda') {
    return (
      <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-[0_1px_10px_rgba(0,0,0,0.08)]">
        <div className="container-x flex h-[86px] items-center gap-4">
          <div className="w-1/5 shrink-0">
            <Link to="/" aria-label="Solventium, ir al inicio">
              <img src={site.logoDark} alt="Solventium" width="800" height="173" className="h-8 w-auto" />
            </Link>
          </div>

          <div className="w-3/5">
            <h4 className="text-lg font-semibold text-black">{'|  Tienda'}</h4>
          </div>

          <div className="hidden w-1/5 justify-end md:flex">
            <Link
              to="/carrito"
              className="inline-flex items-center gap-2 text-black transition-colors hover:text-[#FF0000]"
              aria-label={`Carrito, ${count} artículos`}
            >
              <span className="text-sm font-semibold">{formatPrice(total)}</span>
              <span className="relative">
                <IconCart />
                <span className="absolute -top-2 -right-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#F50000] px-1 text-[11px] font-bold text-white">
                  {count}
                </span>
              </span>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  const solid = !transparent || scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'bg-black/95 shadow-lg backdrop-blur-sm' : 'bg-gradient-to-b from-black/60 to-transparent'
      }`}
    >
      <div className="container-x flex h-[86px] items-center justify-between gap-6">
        <Link to="/" className="shrink-0" aria-label="Solventium, ir al inicio">
          <img src={site.logo} alt="Solventium" width="198" height="38" className="h-8 w-auto" />
        </Link>

        {/* Navegación de escritorio */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1 py-2 text-sm font-medium tracking-wide text-white uppercase transition-colors hover:text-[color:var(--color-brand)] ${
                      isActive ? 'text-[color:var(--color-brand)]' : ''
                    }`
                  }
                >
                  {item.label}
                  <IconChevron className="transition-transform group-hover:rotate-180" />
                </NavLink>
                <div className="invisible absolute top-full left-1/2 w-52 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="overflow-hidden rounded-xl border border-white/10 bg-black/95 py-2 shadow-2xl">
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <NavLink
                          to={child.to}
                          className={({ isActive }) =>
                            `block px-5 py-2.5 text-sm text-white/85 transition-colors hover:bg-white/10 hover:text-white ${
                              isActive ? 'text-[color:var(--color-brand)]' : ''
                            }`
                          }
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `py-2 text-sm font-medium tracking-wide text-white uppercase transition-colors hover:text-[color:var(--color-brand)] ${
                    isActive ? 'text-[color:var(--color-brand)]' : ''
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          {/* En instalación a medida la llamada es el canal que más cierra: el número
              va visible, no enterrado en el pie. */}
          <a
            href={`tel:${site.phoneHref}`}
            className="hidden items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[color:var(--color-brand-on-dark)] lg:inline-flex"
          >
            <IconPhone width="18" height="18" />
            {site.phone.replace('+34 ', '')}
          </a>

          <Link to="/contacto" className="btn-primary hidden md:inline-flex">
            Presupuesto gratis
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        className={`overflow-hidden border-t border-white/10 bg-black/98 lg:hidden ${
          open ? 'max-h-[80vh] overflow-y-auto' : 'max-h-0'
        } transition-[max-height] duration-300`}
      >
        <nav className="container-x flex flex-col py-4" aria-label="Menú móvil">
          {nav.map((item) => (
            <div key={item.label} className="border-b border-white/10 last:border-0">
              <div className="flex items-center justify-between">
                <NavLink
                  to={item.to}
                  className="flex-1 py-4 text-base font-medium text-white uppercase"
                >
                  {item.label}
                </NavLink>
                {item.children && (
                  <button
                    type="button"
                    onClick={() => setOpenSub(openSub === item.label ? null : item.label)}
                    className="p-3 text-white"
                    aria-expanded={openSub === item.label}
                    aria-label={`Desplegar ${item.label}`}
                  >
                    <IconChevron
                      className={`transition-transform ${openSub === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}
              </div>
              {item.children && openSub === item.label && (
                <ul className="pb-3 pl-4">
                  {item.children.map((child) => (
                    <li key={child.to}>
                      <NavLink to={child.to} className="block py-2.5 text-sm text-white/80">
                        {child.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
