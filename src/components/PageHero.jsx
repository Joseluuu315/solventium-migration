import Picture, { SIZES } from './Picture.jsx';

/**
 * Cabecera de página interior: imagen a sangre con velo y título centrado.
 *
 * Sin animación de entrada a propósito: es lo primero que se ve al abrir la página y no debe
 * esperar a que el JavaScript se ejecute. Los rótulos van opacos, no al 70 %, porque sobre una
 * fotografía con textura el gris translúcido no se despega del fondo.
 */
export default function PageHero({ eyebrow, title, subtitle, image, height = 'md', children }) {
  const heights = {
    sm: 'min-h-[46svh]',
    md: 'min-h-[58svh]',
    lg: 'min-h-[76svh]',
  };

  return (
    <section className={`relative flex ${heights[height]} items-center overflow-hidden bg-black`}>
      {image && (
        <Picture
          src={image}
          alt=""
          aria-hidden="true"
          priority
          sizes={SIZES.full}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {/* Velo direccional: mantiene el texto legible y deja que media foto conserve color,
          en lugar de apagarla entera bajando la opacidad. */}
      <div className="scrim-side absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      <div className="container-x relative pt-[86px] pb-10 text-center">
        {eyebrow && <p className="eyebrow-on-dark mb-4">{eyebrow}</p>}
        <h1 className="text-shadow-hero text-h1 text-white">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-9 flex flex-wrap justify-center gap-4">{children}</div>}
      </div>
    </section>
  );
}
