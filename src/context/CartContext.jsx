import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'solventium.cart';

const reducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      const found = state.find((i) => i.slug === action.item.slug);
      if (found) {
        return state.map((i) =>
          i.slug === action.item.slug ? { ...i, qty: i.qty + (action.qty ?? 1) } : i
        );
      }
      return [...state, { ...action.item, qty: action.qty ?? 1 }];
    }
    case 'setQty':
      return state
        .map((i) => (i.slug === action.slug ? { ...i, qty: Math.max(0, action.qty) } : i))
        .filter((i) => i.qty > 0);
    case 'remove':
      return state.filter((i) => i.slug !== action.slug);
    case 'clear':
      return [];
    default:
      return state;
  }
};

const init = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], init);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [items]);

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const total = items.reduce((n, i) => n + i.qty * i.price, 0);
    return {
      items,
      count,
      total,
      add: (item, qty) => dispatch({ type: 'add', item, qty }),
      setQty: (slug, qty) => dispatch({ type: 'setQty', slug, qty }),
      remove: (slug) => dispatch({ type: 'remove', slug }),
      clear: () => dispatch({ type: 'clear' }),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
};

// `useGrouping: 'always'` fuerza el separador de millares también en enteros de
// cuatro cifras (2999 → «2.999,00 €»), que es como los muestra el sitio original.
export const formatPrice = (n) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    useGrouping: 'always',
  }).format(n);
