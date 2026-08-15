import { useState } from 'react';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';

/* Catálogo de vehículos del original, con la capacidad útil de la batería en kWh. */
const COCHES = [
  { nombre: 'AUDI e-tron S Sportback', capacidad: 95 },
  { nombre: 'BMW I3', capacidad: 42.2 },
  { nombre: 'BMW X1 xDrive25e', capacidad: 40 },
  { nombre: 'BMW IX3', capacidad: 80 },
  { nombre: 'CITROEN C5 Aircross Hybrid', capacidad: 13.2 },
  { nombre: 'CITROEN e-C4', capacidad: 50 },
  { nombre: 'CUPRA Formentor PHEV', capacidad: 13 },
  { nombre: 'CUPRA Born', capacidad: 82 },
  { nombre: 'DACIA Spring', capacidad: 26.8 },
  { nombre: 'DS DS7 Crossback', capacidad: 13.2 },
  { nombre: 'FIAT 500e', capacidad: 42 },
  { nombre: 'FORD Mustang Mach-E', capacidad: 98.8 },
  { nombre: 'HYUNDAI Ioniq Plug In', capacidad: 8.9 },
  { nombre: 'HYUNDAI Ioniq 5', capacidad: 72.6 },
  { nombre: 'HYUNDAI Kona Electric', capacidad: 67.5 },
  { nombre: 'JAGUAR I-Pace', capacidad: 90 },
  { nombre: 'KIA Niro PHEV', capacidad: 11.1 },
  { nombre: 'KIA e-Niro', capacidad: 68 },
  { nombre: 'LAND ROVER Range Rover Sport P400e', capacidad: 12.4 },
  { nombre: 'MAZDA MX-30', capacidad: 35.5 },
  { nombre: 'MERCEDES EQC 400', capacidad: 85 },
  { nombre: 'MERCEDES EQA', capacidad: 66.5 },
  { nombre: 'MINI Countryman', capacidad: 7.6 },
  { nombre: 'MINI Cooper SE', capacidad: 32.6 },
  { nombre: 'MITSUBISHI Outlander PHEV', capacidad: 13.8 },
  { nombre: 'NISSAN Leaf e+', capacidad: 62 },
  { nombre: 'NISSAN e-NV200', capacidad: 40 },
  { nombre: 'OPEL Corsa-e', capacidad: 50 },
  { nombre: 'OPEL Grandland Hybrid4', capacidad: 13.2 },
  { nombre: 'PEUGEOT e-208', capacidad: 50 },
  { nombre: 'PEUGEOT 3008 Hybrid', capacidad: 13.2 },
  { nombre: 'PORSCHE Cayenne E-Hybrid', capacidad: 17.9 },
  { nombre: 'PORSCHE Panamera Turbo S E-Hybrid', capacidad: 17.9 },
  { nombre: 'PORSCHE Taycan Turbo S', capacidad: 93.4 },
  { nombre: 'RENAULT Zoe ZE50', capacidad: 54.7 },
  { nombre: 'SEAT Mii', capacidad: 36.8 },
  { nombre: 'SKODA Citigo IV', capacidad: 36.8 },
  { nombre: 'SMART EQ fortwo', capacidad: 17.6 },
  { nombre: 'TESLA Model 3', capacidad: 75 },
  { nombre: 'TESLA Model S', capacidad: 95 },
  { nombre: 'TESLA Model X', capacidad: 95 },
  { nombre: 'TESLA Model Y', capacidad: 75 },
];

const POTENCIAS = [3.7, 7.4, 11, 22];

/** El original carga del 20 % al 80 %: el 60 % de la capacidad a la menor de las dos potencias. */
const calcularTiempoDeCarga = (capacidad, potenciaCargador, potenciaContratada) => {
  const minimo = Math.min(potenciaContratada, potenciaCargador);
  const horas = (capacidad * 0.6) / minimo;
  const horasEnteras = Math.floor(horas);
  const minutos = Math.round((horas - horasEnteras) * 60);
  return `${horasEnteras} horas ${minutos < 10 ? '0' : ''}${minutos} minutos`;
};

export default function TiempoCarga() {
  const [modelo, setModelo] = useState('');
  const [potenciaContratada, setPotenciaContratada] = useState('');
  const [potenciaCargador, setPotenciaCargador] = useState(3.7);

  const coche = COCHES.find((c) => c.nombre === modelo);
  const contratada = parseFloat(potenciaContratada);

  const tiempo =
    coche && contratada > 0
      ? calcularTiempoDeCarga(coche.capacidad, potenciaCargador, contratada)
      : '-';

  return (
    <>
      <Seo
        title="▷ Tiempo de Carga (Herramienta) | Solventium"
        description="Calcula cuánto tarda en cargar tu coche eléctrico del 20 % al 80 % según su batería, tu potencia contratada y la potencia del cargador."
      />

      <section className="section bg-white">
        <div className="container-x max-w-[720px]">
          <h1 className="sr-only">Calculadora de tiempo de recarga</h1>
          <Reveal className="rounded-2xl border border-[color:var(--color-line)] p-7">
            <label className="mb-6 block">
              <span className="mb-2 block text-sm font-medium">Modelo de vehículo</span>
              <select
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                className="w-full rounded-lg border border-[color:var(--color-line)] px-4 py-3 text-sm focus:border-[color:var(--color-brand)]"
              >
                <option value="">Selecciona un modelo</option>
                {COCHES.map((c) => (
                  <option key={c.nombre} value={c.nombre}>
                    {c.nombre}
                  </option>
                ))}
              </select>
            </label>

            <div className="mb-6">
              <p className="mb-2 text-sm font-medium">Capacidad de batería</p>
              <p className="text-lg font-bold text-[color:var(--color-brand)]">
                {coche ? `${coche.capacidad} kWh` : '- kWh'}
              </p>
            </div>

            <label className="mb-6 block">
              <span className="mb-2 block text-sm font-medium">Potencia contratada</span>
              <span className="relative block">
                <input
                  type="number"
                  max="9"
                  placeholder="4.6"
                  value={potenciaContratada}
                  onChange={(e) => setPotenciaContratada(e.target.value)}
                  className="w-full rounded-lg border border-[color:var(--color-line)] py-3 pr-12 pl-4 text-sm focus:border-[color:var(--color-brand)]"
                />
                <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm text-[color:var(--color-muted)]">
                  kW
                </span>
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">Potencia cargador</span>
              <select
                value={potenciaCargador}
                onChange={(e) => setPotenciaCargador(Number(e.target.value))}
                className="w-full rounded-lg border border-[color:var(--color-line)] px-4 py-3 text-sm focus:border-[color:var(--color-brand)]"
              >
                {POTENCIAS.map((kw) => (
                  <option key={kw} value={kw}>
                    {kw} kW
                  </option>
                ))}
              </select>
            </label>

            <p className="mt-8 rounded-2xl bg-[color:var(--color-ink)] p-6 text-center text-lg font-bold text-white">
              Tiempo de carga 20-80%: {tiempo}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
