// Datos globales del sitio (navegación, contacto, footer)

export const site = {
  name: 'Solventium',
  tagline: 'Nos manchamos las manos por un futuro más limpio',
  claim: 'idea · project · solution',
  logo: '/images/SOLVENTIUM-blanco.webp',
  logoDark: '/images/SOLVENTIUM-INGENIEROS-FINAL-NEGRO.png',
  mark: '/images/rayo-solventium.svg',
  phone: '+34 91 005 49 84',
  phoneHref: '+34910054984',
  whatsapp: '+34647944837',
  email: 'contacto@solventium.es',
  address: 'Calle Londres, 14, 28232 Las Rozas de Madrid, Madrid, España',
  addressShort: 'Las Rozas de Madrid',
  schedule: [
    { days: 'Lunes – Viernes', hours: '9:00 – 18:00' },
    { days: 'Sábado', hours: '9:00 – 13:00' },
  ],
  // Segundo juego de contacto: el que usan las páginas de marca
  phoneMarcas: '+ 34 647 944 837',
  phoneMarcasHref: '647944837',
  scheduleMarcas: [
    { days: 'Lunes – Viernes', hours: '9:00 – 19:00' },
    { days: 'Sábado', hours: '9:00 – 15:00' },
  ],
  // En el original solo el icono de Facebook enlaza a algún sitio
  social: [
    { name: 'Instagram' },
    { name: 'Youtube' },
    { name: 'TikTok' },
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61556093775477' },
  ],
};

export const brands = [
  { slug: 'policharger', name: 'Policharger' },
  { slug: 'tesla', name: 'Tesla' },
  { slug: 'v2c', name: 'V2C' },
  { slug: 'wallbox', name: 'Wallbox' },
  { slug: 'woltio', name: 'Woltio' },
];

export const nav = [
  { label: 'Descubre', to: '/descubre' },
  {
    label: 'Cargadores',
    to: '/cargadores',
    children: brands.map((b) => ({ label: b.name, to: `/${b.slug}` })),
  },
  { label: 'Tienda', to: '/tienda' },
  { label: 'Blog', to: '/blog' },
];

export const footerLinks = [
  {
    title: 'Enlaces de interés',
    links: [
      { label: 'Inicio', to: '/' },
      { label: 'Descubre', to: '/descubre' },
      { label: 'Tienda', to: '/tienda' },
      { label: 'Contacto', to: '/contacto' },
      { label: 'Terminos Legales', to: '/terminos-legales' },
    ],
  },
  {
    title: 'Cargadores',
    links: [
      { label: 'Policharger', to: '/policharger' },
      { label: 'Orbis', to: '/cargadores' },
      { label: 'Tesla', to: '/tesla' },
      { label: 'V2C', to: '/v2c' },
      { label: 'Wallbox', to: '/wallbox' },
      { label: 'Woltio', to: '/woltio' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Preguntas frecuentes', to: '/preguntas-frecuentes' },
      { label: 'Herramientas movilidad', to: '/tiempo-de-carga' },
      { label: 'Comparativa vehículos', to: '/comparativa' },
    ],
  },
];

// Opciones del formulario de /contacto
export const serviceOptions = ['Punto de recarga', 'Instalación eléctrica', 'Mantenimiento'];

// Opciones del formulario de las páginas de marca
export const serviceOptionsMarcas = [
  'Punto de recarga',
  'Preinstalación',
  'Fotovoltaica',
  'Minieólica',
  'Almacenamiento',
  'Otros',
];
