import { useState } from 'react';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';

/* Opciones discretas de cada desplegable, tal cual las ofrece el original. */
const miles = (n) => n.toLocaleString('en-US');
const decimal = (n, d) => n.toFixed(d).replace('.', ',');

const rango = (desde, hasta, paso) => {
  const out = [];
  const pasos = Math.round((hasta - desde) / paso);
  for (let i = 0; i <= pasos; i += 1) out.push(Number((desde + i * paso).toFixed(2)));
  return out;
};

const OPCIONES_PRECIO = rango(12000, 129000, 3000).map((v) => ({
  value: v,
  label: `${miles(v)} €`,
}));

const OPCIONES_KM = [
  { value: 0, label: 'Seleccione km/año' },
  ...rango(5000, 100000, 5000).map((v) => ({ value: v, label: `${miles(v)} km` })),
];

const OPCIONES_PRECIO_LITRO = [
  { value: 0, label: 'Seleccione un precio' },
  ...rango(1, 2.6, 0.1).map((v) => ({ value: v, label: `${decimal(v, 2)} €/l` })),
];

const OPCIONES_PRECIO_KWH = [
  { value: 0, label: 'Seleccione un precio' },
  ...rango(0.05, 0.45, 0.02).map((v) => ({ value: v, label: `${decimal(v, 2)} €/kWh` })),
];

const OPCIONES_CONSUMO_LITRO = [
  { value: 0, label: 'Seleccione consumo' },
  ...rango(3, 13, 1).map((v) => ({ value: v, label: `${v} l/100km` })),
];

const OPCIONES_CONSUMO_KWH = [
  { value: 0, label: 'Seleccione consumo' },
  ...rango(10, 36, 2).map((v) => ({ value: v, label: `${v} kWh/100km` })),
];

/** Fila de la tabla: un valor por vehículo y la etiqueta compartida en el centro. */
function Fila({ label, izquierda, derecha }) {
  return (
    <div className="grid grid-cols-3 items-center gap-3 border-b border-[color:var(--color-line)] py-4 last:border-0 sm:gap-6">
      <div>{izquierda}</div>
      <p className="text-center text-xs text-[color:var(--color-muted)] sm:text-sm">{label}</p>
      <div>{derecha}</div>
    </div>
  );
}

/** Desplegable con la unidad fijada a la derecha, como en el original. */
function SelectUnidad({ etiqueta, value, onChange, options, unit }) {
  return (
    <div className="relative">
      <select
        aria-label={etiqueta}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full appearance-none rounded-lg border border-[color:var(--color-line)] py-2.5 pr-12 pl-3 text-sm focus:border-[color:var(--color-brand)]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-[color:var(--color-muted)]">
        {unit}
      </span>
    </div>
  );
}

/** Valor derivado o fijo: se pinta como un campo, pero no se puede editar. */
function Valor({ children }) {
  return (
    <p className="rounded-lg border border-[color:var(--color-line)] bg-[#f7f7f7] px-3 py-2.5 text-sm">
      {children}
    </p>
  );
}

const euros = (n) => (n === null ? '- €' : `${n.toFixed(2)} €`);

export default function Comparativa() {
  const [precioCombustion, setPrecioCombustion] = useState(12000);
  const [precioElectrico, setPrecioElectrico] = useState(12000);
  // El mantenimiento del original arranca en 0 € y solo se calcula al tocar el precio de compra
  const [precioCombustionTocado, setPrecioCombustionTocado] = useState(false);
  const [precioElectricoTocado, setPrecioElectricoTocado] = useState(false);
  const [kmCombustion, setKmCombustion] = useState(0);
  const [kmElectrico, setKmElectrico] = useState(0);
  const [precioLitro, setPrecioLitro] = useState(0);
  const [precioKwh, setPrecioKwh] = useState(0);
  const [consumoLitro, setConsumoLitro] = useState(0);
  const [consumoKwh, setConsumoKwh] = useState(0);

  // El mantenimiento es un 1 % del precio del coche térmico y un 0,5 % del eléctrico
  const mantCombustion = precioCombustionTocado ? Math.round(precioCombustion * 0.01) : 0;
  const mantElectrico = precioElectricoTocado ? Math.round(precioElectrico * 0.005) : 0;

  const costeCombustion =
    kmCombustion && precioLitro && consumoLitro
      ? (kmCombustion * precioLitro * consumoLitro) / 100 + mantCombustion
      : null;
  const costeElectrico =
    kmElectrico && precioKwh && consumoKwh
      ? (kmElectrico * precioKwh * consumoKwh) / 100 + mantElectrico
      : null;
  const ahorro =
    costeCombustion !== null && costeElectrico !== null ? costeCombustion - costeElectrico : null;

  return (
    <>
      <Seo
        title="▷ Comparativa de Vehículos (Herramienta) | Solventium"
        description="Compara el coste anual de un vehículo eléctrico frente a uno de combustión: precio de compra, consumo, mantenimiento y ahorro al año."
      />

      <section className="section bg-white">
        <div className="container-x">
          <h1 className="sr-only">Comparativa entre vehículo eléctrico y de combustión</h1>
          <Reveal className="rounded-2xl border border-[color:var(--color-line)] p-5 sm:p-8">
            {/* Cabecera de la tabla */}
            <div className="grid grid-cols-3 items-center gap-3 pb-6 sm:gap-6">
              <h4 className="text-sm sm:text-lg">Vehículo de Combustión</h4>
              <div className="flex justify-center">
                {/* El logotipo del original es la versión blanca: va sobre un chip oscuro */}
                <span className="inline-flex rounded-lg bg-black px-4 py-2">
                  <img
                    src="/images/SOLVENTIUM-blanco.webp"
                    alt="Solventium"
                    width="198"
                    height="38"
                    className="h-5 w-auto sm:h-7"
                  />
                </span>
              </div>
              <h4 className="text-right text-sm sm:text-lg">Vehículo Eléctrico</h4>
            </div>

            <Fila
              label="Precio de compra"
              izquierda={
                <SelectUnidad
                  etiqueta="Precio de compra del vehículo de combustión"
                  value={precioCombustion}
                  onChange={(v) => {
                    setPrecioCombustion(v);
                    setPrecioCombustionTocado(true);
                  }}
                  options={OPCIONES_PRECIO}
                  unit="€"
                />
              }
              derecha={
                <SelectUnidad
                  etiqueta="Precio de compra del vehículo eléctrico"
                  value={precioElectrico}
                  onChange={(v) => {
                    setPrecioElectrico(v);
                    setPrecioElectricoTocado(true);
                  }}
                  options={OPCIONES_PRECIO}
                  unit="€"
                />
              }
            />

            <Fila
              label="Kilómetros recorridos/año"
              izquierda={
                <SelectUnidad
                  etiqueta="Kilómetros al año del vehículo de combustión"
                  value={kmCombustion}
                  onChange={setKmCombustion}
                  options={OPCIONES_KM}
                  unit="km"
                />
              }
              derecha={
                <SelectUnidad
                  etiqueta="Kilómetros al año del vehículo eléctrico"
                  value={kmElectrico}
                  onChange={setKmElectrico}
                  options={OPCIONES_KM}
                  unit="km"
                />
              }
            />

            <Fila
              label="Precio del combustible"
              izquierda={
                <SelectUnidad
                  etiqueta="Precio del combustible"
                  value={precioLitro}
                  onChange={setPrecioLitro}
                  options={OPCIONES_PRECIO_LITRO}
                  unit="€/l"
                />
              }
              derecha={
                <SelectUnidad
                  etiqueta="Precio de la electricidad"
                  value={precioKwh}
                  onChange={setPrecioKwh}
                  options={OPCIONES_PRECIO_KWH}
                  unit="€/kWh"
                />
              }
            />

            <Fila
              label="Consumo a los 100 km"
              izquierda={
                <SelectUnidad
                  etiqueta="Consumo a los 100 km del vehículo de combustión"
                  value={consumoLitro}
                  onChange={setConsumoLitro}
                  options={OPCIONES_CONSUMO_LITRO}
                  unit="l"
                />
              }
              derecha={
                <SelectUnidad
                  etiqueta="Consumo a los 100 km del vehículo eléctrico"
                  value={consumoKwh}
                  onChange={setConsumoKwh}
                  options={OPCIONES_CONSUMO_KWH}
                  unit="kWh"
                />
              }
            />

            <Fila
              label="Gastos de mantenimiento/año"
              izquierda={<Valor>{mantCombustion} €</Valor>}
              derecha={<Valor>{mantElectrico} €</Valor>}
            />

            <Fila
              label="Vida útil"
              izquierda={<Valor>250,000 km</Valor>}
              derecha={<Valor>200,000 km</Valor>}
            />

            <Fila
              label="kg C02 emitidos cada 100km"
              izquierda={<Valor>14.95 kg</Valor>}
              derecha={<Valor>2.53 kg</Valor>}
            />

            <Fila
              label="Coste anual"
              izquierda={
                <p className="text-center text-lg font-bold sm:text-2xl">{euros(costeCombustion)}</p>
              }
              derecha={
                <p className="text-center text-lg font-bold sm:text-2xl">{euros(costeElectrico)}</p>
              }
            />

            <div className="mt-8 rounded-2xl bg-[color:var(--color-ink)] p-6 text-center text-white">
              <p className="text-sm tracking-wide opacity-75">Ahorro anual</p>
              <p className="mt-2 text-[clamp(1.6rem,5vw,2.75rem)] leading-none font-bold text-[color:var(--color-brand)]">
                {euros(ahorro)}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
