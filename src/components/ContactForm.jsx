import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { serviceOptions, site } from '../data/site.js';
import { IconCheck } from './Icons.jsx';

const EMPTY = { nombre: '', telefono: '', email: '', direccion: '', servicio: '', mensaje: '' };

/** Los tres casos reales del negocio, para no obligar a elegir en una lista de ocho. */
export const TIPOS_INSTALACION = [
  'Vivienda unifamiliar',
  'Garaje comunitario',
  'Empresa o flota',
  'Otro',
];

/**
 * Un campo con su etiqueta, su error y el enlace entre ambos para el lector de pantalla.
 * Vive fuera del formulario a propósito: definido dentro, React lo remontaría en cada
 * pulsación y el campo perdería el foco letra a letra.
 */
function Campo({ id, label, value, error, onChange, dark, className = '', ...props }) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={`mb-1.5 block text-sm font-medium ${
          dark ? 'text-white/75' : 'text-[color:var(--color-body)]'
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`field ${dark ? 'field-dark' : 'field-light'}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className={`mt-1.5 text-xs font-semibold ${
            dark ? 'text-[color:var(--color-brand-on-dark)]' : 'text-[color:var(--color-brand)]'
          }`}
        >
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Formulario de presupuesto.
 *
 * Pide lo mínimo para que un comercial pueda devolver la llamada: nombre, teléfono y tipo de
 * instalación. El mensaje es opcional a propósito — exigir un texto técnico antes de enviar es
 * la fricción más cara de la web.
 *
 * El sitio original lo envía con un plugin de WordPress; aquí se valida en cliente y se prepara
 * el envío. Conecta `endpoint` con tu API para que salga de verdad.
 */
export default function ContactForm({
  withAddress = true,
  endpoint = null,
  dark = false,
  options = serviceOptions,
  tipos = null,
  servicioInicial = '',
  submitLabel = 'Pedir mi presupuesto gratis',
}) {
  // Con el select, el original llega con el primer servicio ya elegido.
  const vacio = {
    ...EMPTY,
    servicio: servicioInicial || (tipos ? '' : (options[0] ?? '')),
  };
  const [values, setValues] = useState(vacio);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const formRef = useRef(null);

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const validate = () => {
    const err = {};
    if (!values.nombre.trim()) err.nombre = 'Indícanos tu nombre';
    if (!/^[+\d\s()-]{9,}$/.test(values.telefono.trim())) err.telefono = 'Teléfono no válido';
    if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(values.email.trim())) err.email = 'Email no válido';
    if (withAddress && !values.direccion.trim()) err.direccion = 'Indícanos la dirección';
    if (!values.servicio) err.servicio = tipos ? 'Elige el tipo de instalación' : 'Elige un servicio';
    setErrors(err);

    // El foco va al primer campo que falla: sin esto hay que buscar el error a ojo.
    const primero = Object.keys(err)[0];
    if (primero) {
      const campo = formRef.current?.querySelector(`[name="${primero}"]`);
      campo?.focus();
    }
    return Object.keys(err).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error('Respuesta no válida');
      } else {
        await new Promise((r) => setTimeout(r, 600));
      }
      setStatus('sent');
      setValues(vacio);
    } catch {
      setStatus('error');
    }
  };

  const labelCls = `mb-1.5 block text-sm font-medium ${
    dark ? 'text-white/75' : 'text-[color:var(--color-body)]'
  }`;
  const fieldCls = `field ${dark ? 'field-dark' : 'field-light'}`;
  const errorCls = `mt-1.5 text-xs font-semibold ${
    dark ? 'text-[color:var(--color-brand-on-dark)]' : 'text-[color:var(--color-brand)]'
  }`;

  /** Props que comparten todos los campos de texto. */
  const campo = (id) => ({
    id,
    value: values[id],
    error: errors[id],
    onChange: update,
    dark,
  });

  if (status === 'sent') {
    return (
      <div
        role="status"
        className={`rounded-2xl border p-8 text-center ${
          dark
            ? 'border-white/15 bg-white/5'
            : 'border-[color:var(--color-line)] bg-white shadow-[var(--shadow-card)]'
        }`}
      >
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[color:var(--color-brand)] text-white">
          <IconCheck width="26" height="26" />
        </div>
        <h3 className={`mb-2 text-xl ${dark ? 'text-white' : ''}`}>Mensaje enviado</h3>
        <p className={`text-sm ${dark ? 'text-white/75' : 'text-[color:var(--color-muted)]'}`}>
          Gracias por escribirnos. Te responderemos lo antes posible. Si prefieres, llámanos al{' '}
          <a
            href={`tel:${site.phoneHref}`}
            className={`font-semibold ${
              dark ? 'text-[color:var(--color-brand-on-dark)]' : 'text-[color:var(--color-brand)]'
            }`}
          >
            {site.phone}
          </a>
          .
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-primary mt-6">
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <Campo {...campo('nombre')} label="Nombre" autoComplete="name" enterKeyHint="next" />

      <Campo
        {...campo('telefono')}
        label="Teléfono"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        enterKeyHint="next"
      />

      <Campo
        {...campo('email')}
        label="Email"
        type="email"
        inputMode="email"
        autoComplete="email"
        enterKeyHint="next"
        className={withAddress ? '' : 'sm:col-span-2'}
      />

      {withAddress && (
        <Campo
          {...campo('direccion')}
          label="Direccion completa"
          autoComplete="street-address"
          enterKeyHint="next"
        />
      )}

      {/* Tipo de instalación: tres botones a la vista en lugar de una lista desplegable */}
      {tipos ? (
        <fieldset className="sm:col-span-2">
          <legend className={labelCls}>¿Dónde va la instalación?</legend>
          <div className="flex flex-wrap gap-2">
            {tipos.map((t) => {
              const activo = values.servicio === t;
              return (
                <label
                  key={t}
                  className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                    activo
                      ? 'border-[color:var(--color-brand)] bg-[color:var(--color-brand)] text-white'
                      : dark
                        ? 'border-white/20 text-white/80 hover:border-white/50'
                        : 'border-[color:var(--color-line)] text-[color:var(--color-body)] hover:border-[color:var(--color-muted)]'
                  }`}
                >
                  <input
                    type="radio"
                    name="servicio"
                    value={t}
                    checked={activo}
                    onChange={update}
                    className="sr-only"
                  />
                  {t}
                </label>
              );
            })}
          </div>
          {errors.servicio && (
            <p role="alert" className={errorCls}>
              {errors.servicio}
            </p>
          )}
        </fieldset>
      ) : (
        <div className="sm:col-span-2">
          <label htmlFor="servicio" className={labelCls}>
            Servicios
          </label>
          <select
            id="servicio"
            name="servicio"
            value={values.servicio}
            onChange={update}
            className={fieldCls}
            aria-invalid={!!errors.servicio}
          >
            {options.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.servicio && (
            <p role="alert" className={errorCls}>
              {errors.servicio}
            </p>
          )}
        </div>
      )}

      <div className="sm:col-span-2">
        <label htmlFor="mensaje" className={labelCls}>
          Cuéntanos tu caso <span className="font-normal opacity-70">(opcional)</span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={3}
          value={values.mensaje}
          onChange={update}
          enterKeyHint="send"
          className={`${fieldCls} resize-y`}
        />
      </div>

      <div className="grid gap-3 sm:col-span-2">
        <button
          type="submit"
          className="btn-primary w-full px-8 sm:w-auto sm:justify-self-start"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Enviando…' : submitLabel}
        </button>

        <p className={`text-xs ${dark ? 'text-white/55' : 'text-[color:var(--color-muted)]'}`}>
          Al enviar aceptas nuestra{' '}
          <Link to="/politica-de-privacidad" className="underline underline-offset-2">
            política de privacidad
          </Link>
          .
        </p>

        {status === 'error' && (
          <p
            role="alert"
            className={`text-sm font-semibold ${
              dark ? 'text-[color:var(--color-brand-on-dark)]' : 'text-[color:var(--color-brand)]'
            }`}
          >
            No se ha podido enviar. Inténtalo de nuevo o escríbenos a {site.email}.
          </p>
        )}
      </div>
    </form>
  );
}
