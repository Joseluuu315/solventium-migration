// Contenido de la portada, reproducido de solventium.es

export const hero = {
  title: ['¿BUSCAS INSTALADORES?', 'SOMOS TU SOLUCIÓN'],
  // El botón no sale de la portada: baja al comparador de cargadores.
  cta: { label: 'PRESUPUESTO', href: '#cargadores' },
  image: '/images/Solventiumhero1.jpg',
  /** Carrusel bajo el botón: los tres mensajes que rotan en el héroe original. */
  slides: [
    {
      lines: ['INSTALADORES DE', 'PUNTOS DE RECARGAS Y ENERGIAS RENOVABLES'],
      tagline: ['Nos manchamos las manos por un futuro', 'más limpio'],
      // En móvil el original lo escribe de corrido, en una sola línea.
      taglineMobile: 'Nos manchamos las manos por un futuro más limpio',
    },
    { lines: ['idea · project · solution'] },
    { lines: ['El planeta tiene un problema,', 'y entre todos,', 'seremos su solución'] },
  ],
};

export const preinstalacion = {
  eyebrow: 'Adelántate al problema',
  title: 'Preinstalaciones Comunitarias',
  text: 'Debido al aumento de la movilidad eléctrica, los edificios pertenecientes a comunidades de vecinos se enfrentan a un gran reto. Desde Solventium, recomendamos realizar una pre instalación comunitaria para así disponer de una única canalización para todos los futuros usuarios de vehículos eléctricos. Solventemos juntos este problema.',
  cta: { label: 'Ver cómo se hace', to: '/preinstalacion-comunitaria' },
  image: '/images/GARAJES-EN-COMUNIDADES-DE-PROPIETARIOSPREGUNTAS-Y-RESPUESTAS.jpg',
};

export const values = [
  {
    title: 'Confianza',
    text: 'Conocimiento integral de instalaciones eléctricas de todo tipo. Líderes en la industria y últimas tecnologías.',
    // Instalación propia con el equipo ya montado, en lugar de una foto de banco de imágenes
    image: '/images/IMG_2312-2.jpg',
  },
  {
    title: 'Soluciones personalizadas',
    text: 'Diseños únicos que se adaptan a tus necesidades. Eficiencia y flexibilidad en cada proyecto.',
    image: '/images/soluciones.png',
  },
  // Las tres siguientes solo llevan título en el original.
  { title: 'Prioridad en seguridad', image: '/images/seguridad.png' },
  { title: 'Compromiso ambiental', image: '/images/programa.png' },
  { title: 'Soporte excepcional', image: '/images/excepcional.png' },
];

/**
 * Cabecera de la sección de renovables.
 * Las tres tarjetas comparten sección en lugar de ocupar tres bandas idénticas seguidas.
 */
export const renewablesIntro = {
  eyebrow: 'Energías renovables',
  title: 'Produce la energía que consumes',
  text: 'La otra mitad del negocio: generar, almacenar y usar tu propia energía. Cada una tiene su página con el detalle técnico y sus preguntas frecuentes.',
};

export const renewables = [
  {
    eyebrow: 'Únete a la sostenibilidad',
    short: 'Fotovoltaica',
    claim: 'Autoconsumo dimensionado a tu consumo real, con la carga del coche integrada.',
    title: 'Instalaciones fotovoltaicas',
    text: 'Todo gran cambio va de la mano de grandes acciones. Con el autoconsumo fotovoltaico, estarás aportando tu granito de arena para conseguir una vida sostenible. Desde Solventium estamos comprometidos con ello, así que podemos ayudarte a conseguir tu objetivo.',
    image: '/images/fotovoltaicas.jpeg',
    to: '/fotovoltaica',
  },
  {
    eyebrow: 'Se el cambio que quieres ver en el mundo',
    short: 'Minieólica',
    claim: 'Viento de pequeña potencia donde compensa, sola o combinada con solar.',
    title: 'Instalaciones minieólicas',
    text: 'Perseguir el viento. Para muchos considerado vanidad, pero para nosotros, tiene otro significado. Ir más allá de lo común, aventurarse en lo desconocido y sentir la libertad. Descubre las ventajas de este tipo de tecnología y cuenta con nosotros para llevarlo a buen puerto.',
    image: '/images/minieolicas.jpg',
    to: '/minieolica',
  },
  {
    eyebrow: 'Independencia a la máxima potencia',
    short: 'Baterías',
    claim: 'Guarda el excedente y consúmelo de noche, en vez de verterlo a la red.',
    title: 'Almacenamiento en baterías',
    text: 'El único problema que le hemos encontrado a las energías renovables es su variabilidad. Aún no podemos predecir el futuro, pero si adelantarnos a él. Aprovecha el excedente renovable para almacenarlo y consumirlo cuando mas te convenga.',
    image: '/images/Almacenamiento.webp',
    to: '/baterias',
  },
];

export const reforestation = {
  kicker: 'Únete al programa',
  title: '#SolventiumReforestation',
  subtitle: ['El planeta tiene un problema, y', 'entre todos, seremos su solución.'],
  text: 'Únete al equipo de Azada Verde y Solventium para llevar a cabo proyectos de reforestación y agricultura regenerativa en Mozambique. Podrás ayudar tanto desde casa como luchando en el barro.',
  cta: { label: 'QUIERO AYUDAR', href: '/contacto' },
  image: '/images/programa.png',
};

/** Bloque de contenido SEO al pie de la portada, dentro de un acordeón cerrado. */
export const seoContent = {
  /** Texto de la cabecera del acordeón. */
  accordionTitle: 'Instalación de Puntos de Recarga para Coches Eléctricos en Madrid',
  title: 'Instalación de Puntos de Recarga para Coches Eléctricos en Madrid | Solventium',
  blocks: [
    {
      type: 'p',
      text: 'La movilidad eléctrica avanza con fuerza en la Comunidad de Madrid, impulsada por el compromiso ambiental y las ventajas económicas que ofrece. Instalar un punto de recarga en casa o en la empresa no solo aporta comodidad, sino también independencia energética y ahorro a medio plazo. Cada vez más conductores deciden disponer de su propio sistema de carga para aprovechar al máximo las ventajas de su vehículo eléctrico.',
    },
    {
      type: 'p',
      text: 'En este contexto, Solventium ofrece un servicio integral de instalación de puntos de recarga para coches eléctricos en Madrid, diseñado para cubrir las necesidades de particulares, comunidades de vecinos y empresas. Los proyectos se desarrollan bajo criterios técnicos precisos, con materiales de alta calidad y equipos certificados por los principales fabricantes del sector.',
    },
    {
      type: 'p',
      text: 'La instalación adecuada de un punto de recarga no es solo una cuestión técnica; es una inversión en eficiencia, seguridad y sostenibilidad. Por eso, cada instalación se adapta al espacio, al tipo de vehículo y al uso real del cliente.',
    },
    { type: 'h2', text: 'Presupuestos Personalizados y Subvenciones Disponibles' },
    {
      type: 'p',
      text: 'El coste de una instalación de punto de recarga varía según las condiciones eléctricas del lugar, la distancia al cuadro de distribución y el tipo de cargador elegido. Por ello, en lugar de ofrecer precios genéricos, cada proyecto parte de un estudio técnico individualizado. Este enfoque permite definir un presupuesto ajustado, transparente y optimizado para cada situación.',
    },
    {
      type: 'p',
      text: 'Solventium acompaña a cada cliente en la gestión documental, garantizando que el proceso administrativo se complete correctamente y que la instalación cumpla con todos los requisitos técnicos exigidos. De este modo, se evitan errores, retrasos o rechazos en la concesión de la ayuda.',
    },
    {
      type: 'ul',
      items: [
        'Evaluación eléctrica y cálculo de potencia necesaria.',
        'Selección del cargador compatible con el vehículo y la red existente.',
        'Presupuesto detallado con desglose de materiales y mano de obra.',
        'Asesoramiento en la solicitud de subvenciones y certificación final.',
      ],
    },
    {
      type: 'p',
      text: 'Este proceso integral asegura que el cliente reciba una solución completa, segura y económicamente eficiente, sin contratiempos ni gastos imprevistos.',
    },
    { type: 'h2', text: 'Instaladores Autorizados de Wallbox en Madrid' },
    {
      type: 'p',
      parts: [
        {
          text: 'Contar con un instalador certificado es fundamental para garantizar la seguridad y el rendimiento del sistema. Solventium dispone de un equipo técnico acreditado por ',
        },
        { text: 'Wallbox, Orbis, V2C y Tesla', bold: true },
        {
          text: ', lo que permite instalar cargadores compatibles con la mayoría de los vehículos eléctricos del mercado.',
        },
      ],
    },
    {
      type: 'p',
      parts: [
        { text: 'Los trabajos se ejecutan conforme a la normativa ' },
        { text: 'ITC-BT-52', bold: true },
        {
          text: ', que regula las infraestructuras de recarga en edificios residenciales y espacios públicos. Cumplir con esta normativa asegura que la instalación sea segura, eficiente y legalmente válida.',
        },
      ],
    },
    {
      type: 'p',
      text: 'Los instaladores utilizan materiales certificados, protecciones eléctricas de alta calidad y dispositivos de desconexión diferencial adecuados al tipo de carga. Además, todos los proyectos incluyen una prueba final de funcionamiento y una revisión del sistema de protección.',
    },
    {
      type: 'p',
      text: 'Los cargadores instalados ofrecen funcionalidades inteligentes como control de potencia, programación horaria y conexión WiFi, que permiten al usuario gestionar la carga desde su propio móvil. Estas opciones mejoran la eficiencia y reducen el consumo eléctrico durante las horas de mayor coste.',
    },
    {
      type: 'ul',
      items: [
        'Cumplimiento de normativas y estándares europeos.',
        'Instaladores con certificación oficial de marcas líderes.',
        'Equipos con conectividad y gestión inteligente de energía.',
        'Garantía completa y soporte técnico local en Madrid.',
      ],
    },
    { type: 'h2', text: 'Soluciones para Viviendas, Comunidades y Empresas' },
    {
      type: 'p',
      text: 'Cada tipo de instalación requiere un enfoque distinto. No es lo mismo instalar un punto de recarga en una vivienda unifamiliar que en un garaje comunitario o en una empresa con flota eléctrica. Solventium adapta cada proyecto a las condiciones del entorno, optimizando el diseño eléctrico y la ubicación de los equipos.',
    },
    { type: 'h3', text: 'Instalación en Viviendas Unifamiliares' },
    {
      type: 'p',
      text: 'Los propietarios de vehículos eléctricos que desean recargar en casa pueden optar por cargadores monofásicos de entre 3,7 y 7,4 kW. Estos equipos permiten una carga completa en pocas horas y ofrecen control total sobre el consumo energético. Además, la instalación no requiere obras complejas: se realiza en 24 a 48 horas, con mínima intervención en la red doméstica.',
    },
    {
      type: 'p',
      text: 'Los cargadores domésticos modernos incluyen control dinámico de potencia, lo que evita sobrecargas y cortes. El usuario puede programar la recarga en horario nocturno para aprovechar tarifas eléctricas más económicas y reducir su factura mensual.',
    },
    { type: 'h3', text: 'Instalación en Garajes Comunitarios' },
    {
      type: 'p',
      text: 'En los garajes comunitarios, la normativa permite la instalación individual de un punto de recarga previa comunicación a la comunidad. No se requiere aprobación formal, siempre que el sistema no interfiera con las zonas comunes ni afecte a otros vecinos. Solventium gestiona esta comunicación y ejecuta la instalación siguiendo las normas de seguridad eléctrica.',
    },
    {
      type: 'p',
      text: 'El diseño se centra en trazados limpios y canalizaciones discretas que facilitan futuras ampliaciones. Si otros vecinos deciden instalar sus propios cargadores, podrán conectarse al sistema existente sin necesidad de realizar obras adicionales.',
    },
    { type: 'h3', text: 'Instalación para Empresas y Flotas' },
    {
      type: 'p',
      text: 'Las empresas con vehículos eléctricos necesitan sistemas de carga potentes, escalables y fáciles de gestionar. Para ello se instalan cargadores trifásicos de entre 11 y 22 kW, capaces de atender varios vehículos de manera simultánea. Estos sistemas incluyen software de gestión energética y balanceo de carga, que optimizan el uso de la potencia contratada.',
    },
    {
      type: 'p',
      text: 'Además, las soluciones empresariales permiten asignar usuarios, registrar consumos y controlar accesos, funciones muy útiles para flotas corporativas o parkings compartidos. Todo el proceso de instalación y configuración se documenta, incluyendo certificados eléctricos y boletines de inspección.',
    },
    { type: 'h2', text: 'Cargadores Eléctricos Compatibles con Todas las Marcas' },
    {
      type: 'p',
      parts: [
        {
          text: 'La compatibilidad es un factor clave en cualquier instalación. Todos los equipos utilizados por Solventium incorporan conectores Tipo 2 (Mennekes), estándar europeo para recarga en corriente alterna. También se dispone de adaptadores para vehículos con conexión Tipo 1, garantizando compatibilidad total con modelos de ',
        },
        { text: 'Tesla, BMW, Renault, Kia, Peugeot, Audi, Volkswagen', bold: true },
        { text: ' y otras marcas del mercado.' },
      ],
    },
    { type: 'p', text: 'Según las necesidades del usuario, se pueden instalar diferentes tipos de cargadores:' },
    {
      type: 'ul',
      items: [
        'Cargadores monofásicos (3,7–7,4 kW): recomendados para viviendas particulares.',
        'Cargadores trifásicos (11–22 kW): ideales para garajes comunitarios y empresas.',
        'Cargadores con gestión dinámica de energía: equilibran el consumo entre varios vehículos.',
        'Modelos inteligentes con conexión WiFi o 4G: permiten control remoto y programación horaria.',
      ],
    },
    {
      type: 'p',
      text: 'Todos los equipos cuentan con certificación CE, garantía oficial del fabricante y cumplimiento de las normativas europeas de seguridad eléctrica. La instalación incluye configuración inicial, prueba de funcionamiento y asistencia para la conexión con la aplicación móvil correspondiente.',
    },
    { type: 'h2', text: 'Infraestructura de Recarga con Gestión y Mantenimiento' },
    {
      type: 'p',
      text: 'Una instalación de recarga eficiente requiere mantenimiento preventivo y supervisión técnica. Solventium ofrece servicios de revisión periódica y soporte posventa en toda la Comunidad de Madrid. El mantenimiento incluye comprobación de protecciones, revisión del cableado, limpieza de conectores y actualización del firmware del equipo.',
    },
    {
      type: 'p',
      text: 'Estos controles garantizan el correcto funcionamiento del sistema a largo plazo y previenen posibles incidencias eléctricas. En entornos empresariales, se integran sistemas de gestión que registran los consumos de cada usuario y los tiempos de carga, lo que facilita el control interno y la facturación energética.',
    },
    {
      type: 'p',
      text: 'La gestión inteligente de la recarga permite optimizar el uso de la potencia contratada, reducir costes y evitar picos de demanda. Así, el sistema se mantiene eficiente y sostenible incluso con un uso intensivo.',
    },
    { type: 'h2', text: 'Subvenciones y Beneficios Fiscales en Madrid' },
    {
      type: 'p',
      parts: [
        { text: 'El programa ' },
        { text: 'MOVES III', bold: true },
        {
          text: ' sigue activo durante 2025 y constituye una de las principales herramientas para fomentar la movilidad eléctrica. Las ayudas pueden alcanzar hasta el 70% del coste de instalación, dependiendo del tipo de beneficiario y del uso del cargador. Tanto particulares como empresas pueden acceder a estos incentivos si cumplen los requisitos técnicos establecidos.',
        },
      ],
    },
    { type: 'p', text: 'Los requisitos más importantes incluyen:' },
    {
      type: 'ul',
      items: [
        'Equipos con certificación CE y homologación europea.',
        'Instalación conforme a la normativa ITC-BT-52.',
        'Factura y justificante de pago debidamente emitidos.',
        'Documentación técnica y fotografías de la instalación finalizada.',
      ],
    },
    {
      type: 'p',
      text: 'Además de las subvenciones directas, existen deducciones fiscales y ventajas energéticas asociadas al uso de vehículos eléctricos. Las empresas pueden contabilizar la inversión como gasto deducible, y los particulares reducen su consumo global gracias a una gestión energética más eficiente.',
    },
    { type: 'h2', text: 'Calidad Técnica y Compromiso con la Sostenibilidad' },
    {
      type: 'p',
      text: 'La movilidad eléctrica representa una oportunidad real para avanzar hacia un modelo de ciudad más limpio, silencioso y eficiente. Cada punto de recarga instalado en Madrid contribuye a reducir la huella de carbono y las emisiones contaminantes. Solventium participa activamente en este proceso mediante instalaciones seguras, certificadas y responsables.',
    },
    {
      type: 'p',
      text: 'El compromiso con la sostenibilidad se refleja en la selección de materiales reciclables, componentes de bajo consumo y proveedores que cumplen con las normativas europeas de calidad ambiental. Esta filosofía garantiza un equilibrio entre rendimiento técnico y respeto por el entorno.',
    },
    {
      type: 'p',
      parts: [
        { text: 'Más de ' },
        { text: '200 instalaciones verificadas', bold: true },
        {
          text: ' en la Comunidad de Madrid respaldan la experiencia del equipo. Los proyectos se desarrollan con rigor técnico y atención al detalle, adaptándose a cada tipo de cliente sin recurrir a soluciones genéricas. La confianza se construye con resultados medibles, no con promesas.',
        },
      ],
    },
    { type: 'h2', text: 'Conclusión' },
    {
      type: 'p',
      text: 'La instalación de un punto de recarga para coches eléctricos en Madrid se ha convertido en un paso lógico para quienes buscan eficiencia, autonomía y sostenibilidad. Con un equipo profesional, certificaciones oficiales y gestión integral de subvenciones, el proceso se simplifica y se convierte en una inversión de valor a largo plazo.',
    },
    {
      type: 'p',
      text: 'El futuro de la movilidad es eléctrico, y contar con una infraestructura de carga propia es la mejor manera de integrarse en ese cambio. Solventium ofrece la experiencia técnica y la solidez necesarias para que cada usuario disfrute de una recarga segura, rápida y preparada para el futuro energético de la ciudad.',
    },
  ],
};
