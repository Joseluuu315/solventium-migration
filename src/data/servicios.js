// Páginas de servicio.
//
// El original no las tiene: sus cinco botones EXPLORAR van todos al formulario de contacto, y la
// mitad renovable del negocio —la que da nombre al subtítulo del hero— no tiene una sola URL
// indexable. El texto de aquí se reaprovecha del bloque SEO de la portada, del FAQ y del blog:
// no hay una sola afirmación que no estuviera ya publicada en el sitio.

export const servicios = [
  {
    slug: 'fotovoltaica',
    nombre: 'Fotovoltaica',
    eyebrow: 'Únete a la sostenibilidad',
    title: 'Instalaciones fotovoltaicas',
    lead: 'Autoconsumo dimensionado para tu tejado y tu consumo real, con la recarga del coche integrada desde el primer día.',
    image: '/images/fotovoltaicas.jpeg',
    meta: {
      title: '▷ Instalaciones fotovoltaicas en Madrid | Solventium',
      description:
        'Autoconsumo fotovoltaico en Madrid: estudio de cubierta, dimensionado, legalización y carga del vehículo eléctrico con el excedente solar.',
    },
    blocks: [
      {
        type: 'p',
        text: 'Todo gran cambio va de la mano de grandes acciones. Con el autoconsumo fotovoltaico, estarás aportando tu granito de arena para conseguir una vida sostenible. Desde Solventium estamos comprometidos con ello, así que podemos ayudarte a conseguir tu objetivo.',
      },
      { type: 'h2', text: 'Qué incluye la instalación' },
      {
        type: 'ul',
        items: [
          'Estudio de la cubierta y del consumo real de la vivienda o la empresa.',
          'Dimensionado del campo solar y del inversor según ese consumo, no según catálogo.',
          'Montaje con estructura y protecciones certificadas.',
          'Legalización, boletín eléctrico y alta de la compensación de excedentes.',
          'Configuración de la monitorización para que puedas ver la producción desde el móvil.',
        ],
      },
      { type: 'h2', text: 'Cargar el coche con el sol' },
      {
        type: 'p',
        text: 'Todos los cargadores que instalamos admiten carga solar opcional: el equipo mide el excedente que la instalación vierte a la red y lo desvía al vehículo en lugar de regalarlo. Es la forma más directa de amortizar las dos inversiones a la vez.',
      },
      {
        type: 'p',
        text: 'El balanceo dinámico de potencia completa el sistema: el cargador ajusta su consumo al de la casa para no superar nunca la potencia contratada, así que no hace falta ampliarla.',
      },
    ],
    faqs: [
      {
        q: '¿Puedo cargar el coche con el excedente de mis placas?',
        a: 'Sí. Los modelos que instalamos admiten carga solar opcional, de modo que el vehículo aprovecha el excedente fotovoltaico y se maximiza el ahorro energético.',
      },
      {
        q: '¿Hace falta ampliar la potencia contratada?',
        a: 'Normalmente no. El balanceo dinámico mide el consumo de la vivienda y ajusta la potencia de carga para no superar la contratada, evitando sobrecargas y cortes.',
      },
      {
        q: '¿Os encargáis de la legalización?',
        a: 'Sí, acompañamos en toda la gestión documental: boletín, legalización y alta de la compensación de excedentes.',
      },
    ],
    relacionados: ['baterias', 'subvenciones-moves-iii'],
  },
  {
    slug: 'minieolica',
    nombre: 'Minieólica',
    eyebrow: 'Se el cambio que quieres ver en el mundo',
    title: 'Instalaciones minieólicas',
    lead: 'Generación eólica de pequeña potencia para emplazamientos con viento constante, sola o combinada con solar.',
    image: '/images/minieolicas.jpg',
    meta: {
      title: '▷ Instalaciones minieólicas | Solventium',
      description:
        'Minieólica para vivienda y empresa: estudio de viento del emplazamiento, dimensionado, montaje y combinación con autoconsumo solar.',
    },
    blocks: [
      {
        type: 'p',
        text: 'Perseguir el viento. Para muchos considerado vanidad, pero para nosotros, tiene otro significado. Ir más allá de lo común, aventurarse en lo desconocido y sentir la libertad. Descubre las ventajas de este tipo de tecnología y cuenta con nosotros para llevarlo a buen puerto.',
      },
      { type: 'h2', text: 'Cuándo compensa' },
      {
        type: 'p',
        text: 'La minieólica no es una alternativa universal a la solar: compensa en emplazamientos con viento constante y despejado, y sobre todo como complemento. Donde la fotovoltaica baja en invierno, el viento suele subir, así que la combinación de las dos estabiliza la generación a lo largo del año.',
      },
      {
        type: 'ul',
        items: [
          'Estudio del recurso eólico real del emplazamiento antes de proponer nada.',
          'Elección de potencia y altura de torre según ese estudio.',
          'Obra civil, montaje y conexión con el resto de la instalación.',
          'Integración con fotovoltaica y con almacenamiento si ya los tienes.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Sirve para cualquier vivienda?',
        a: 'No. Necesita viento constante y un emplazamiento despejado. Por eso el primer paso siempre es el estudio del recurso eólico: si no compensa, te lo decimos.',
      },
      {
        q: '¿Se puede combinar con placas solares?',
        a: 'Sí, y es lo más habitual: donde la fotovoltaica baja en invierno el viento suele subir, así que juntas estabilizan la generación anual.',
      },
    ],
    relacionados: ['fotovoltaica', 'baterias'],
  },
  {
    slug: 'baterias',
    nombre: 'Baterías',
    eyebrow: 'Independencia a la máxima potencia',
    title: 'Almacenamiento en baterías',
    lead: 'Guarda el excedente renovable y consúmelo cuando te convenga, en lugar de verterlo a la red.',
    image: '/images/Almacenamiento.webp',
    meta: {
      title: '▷ Almacenamiento en baterías | Solventium',
      description:
        'Sistemas de almacenamiento para autoconsumo: aprovecha el excedente solar por la noche y gana respaldo ante cortes de suministro.',
    },
    blocks: [
      {
        type: 'p',
        text: 'El único problema que le hemos encontrado a las energías renovables es su variabilidad. Aún no podemos predecir el futuro, pero si adelantarnos a él. Aprovecha el excedente renovable para almacenarlo y consumirlo cuando mas te convenga.',
      },
      { type: 'h2', text: 'Qué resuelve una batería' },
      {
        type: 'ul',
        items: [
          'Desplazar el consumo: lo que produces de día se usa de noche, que es cuando más cara está la energía.',
          'Reducir la dependencia de la compensación de excedentes, que paga bastante menos de lo que cuesta comprar.',
          'Dar respaldo ante cortes de suministro en los equipos que decidas.',
          'Cargar el vehículo por la noche sin tirar de red.',
        ],
      },
      {
        type: 'p',
        text: 'El dimensionado sale del consumo real y de la curva de producción de tu instalación: una batería sobredimensionada no se amortiza y una corta no cubre la noche.',
      },
    ],
    faqs: [
      {
        q: '¿Puedo añadir baterías a una instalación que ya tengo?',
        a: 'En la mayoría de los casos sí. Depende del inversor instalado; lo comprobamos en el estudio previo antes de proponer equipo.',
      },
      {
        q: '¿Sirve como respaldo si se va la luz?',
        a: 'Sí, si el sistema se configura con salida de respaldo. Se define qué circuitos quedan alimentados durante el corte.',
      },
    ],
    relacionados: ['fotovoltaica', 'subvenciones-moves-iii'],
  },
  {
    slug: 'preinstalacion-comunitaria',
    nombre: 'Preinstalación comunitaria',
    eyebrow: 'Adelántate al problema',
    title: 'Preinstalaciones comunitarias',
    lead: 'Una única canalización para todo el garaje: el primer vecino paga la obra y el resto solo se conecta.',
    image: '/images/GARAJES-EN-COMUNIDADES-DE-PROPIETARIOSPREGUNTAS-Y-RESPUESTAS.jpg',
    meta: {
      title: '▷ Preinstalación comunitaria de recarga en Madrid | Solventium',
      description:
        'Preinstalación de recarga para garajes comunitarios en Madrid: canalización única, contadores individuales, legalización y ampliaciones sin obra.',
    },
    blocks: [
      {
        type: 'p',
        text: 'Debido al aumento de la movilidad eléctrica, los edificios pertenecientes a comunidades de vecinos se enfrentan a un gran reto. Desde Solventium, recomendamos realizar una pre instalación comunitaria para así disponer de una única canalización para todos los futuros usuarios de vehículos eléctricos. Solventemos juntos este problema.',
      },
      { type: 'h2', text: 'Cómo se hace' },
      {
        type: 'ol',
        items: [
          'Diagnóstico: estudio técnico completo del garaje, del cuarto de contadores y de la potencia disponible.',
          'Diseño de la canalización única, con trazados limpios y espacio previsto para futuras plazas.',
          'Ejecución y legalización, con informe técnico y boletín.',
          'Alta por vecino: cada propietario se conecta a la infraestructura existente sin obra adicional.',
        ],
      },
      { type: 'h2', text: 'Qué dice la normativa' },
      {
        type: 'p',
        text: 'En los garajes comunitarios, la normativa permite la instalación individual de un punto de recarga previa comunicación a la comunidad. No se requiere aprobación formal, siempre que el sistema no interfiera con las zonas comunes ni afecte a otros vecinos. Solventium gestiona esta comunicación y ejecuta la instalación siguiendo las normas de seguridad eléctrica.',
      },
      {
        type: 'p',
        text: 'Los trabajos se ejecutan conforme a la normativa ITC-BT-52, que regula las infraestructuras de recarga en edificios residenciales y espacios públicos. Cumplir con esta normativa asegura que la instalación sea segura, eficiente y legalmente válida.',
      },
      {
        type: 'p',
        text: 'En parkings compartidos integramos además sistemas que asignan usuarios, registran consumos y controlan accesos, lo que facilita el control interno y la facturación energética de la comunidad.',
      },
    ],
    faqs: [
      {
        q: '¿Necesito el permiso de la comunidad de vecinos?',
        a: 'No se requiere aprobación formal. La normativa permite la instalación individual previa comunicación a la comunidad, siempre que no interfiera con las zonas comunes ni afecte a otros vecinos. Nos encargamos de esa comunicación.',
      },
      {
        q: '¿Qué gana la comunidad haciendo la preinstalación de golpe?',
        a: 'Evita obras repetidas. Con una única canalización, cada vecino que quiera su cargador solo tiene que conectarse a la infraestructura existente.',
      },
      {
        q: '¿Se puede controlar el consumo de cada plaza?',
        a: 'Sí. Cada punto lleva su medida individual, y en entornos con varios usuarios integramos sistemas que registran consumos y controlan accesos.',
      },
    ],
    relacionados: ['subvenciones-moves-iii'],
  },
  {
    slug: 'subvenciones-moves-iii',
    nombre: 'Subvenciones MOVES III',
    eyebrow: 'Hasta el 70% del coste',
    title: 'Subvenciones MOVES III',
    lead: 'Las ayudas pueden cubrir buena parte de la instalación. Nos ocupamos del papeleo para que no se caiga por un requisito técnico.',
    image: '/images/micheile-henderson-ZVprbBmT8QA-unsplash-2-scaled.jpg',
    meta: {
      title: '▷ Subvenciones MOVES III para puntos de recarga | Solventium',
      description:
        'Ayudas MOVES III para instalar tu punto de recarga: cuánto cubren, qué requisitos exige la normativa y qué documentación hay que presentar.',
    },
    blocks: [
      {
        type: 'p',
        text: 'El programa MOVES III constituye una de las principales herramientas para fomentar la movilidad eléctrica. Las ayudas pueden alcanzar hasta el 70% del coste de instalación, dependiendo del tipo de beneficiario y del uso del cargador. Tanto particulares como empresas pueden acceder a estos incentivos si cumplen los requisitos técnicos establecidos.',
      },
      { type: 'h2', text: 'Requisitos que hay que cumplir' },
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
        text: 'Solventium acompaña a cada cliente en la gestión documental, garantizando que el proceso administrativo se complete correctamente y que la instalación cumpla con todos los requisitos técnicos exigidos. De este modo, se evitan errores, retrasos o rechazos en la concesión de la ayuda.',
      },
      { type: 'h2', text: 'Más allá de la subvención directa' },
      {
        type: 'p',
        text: 'Además de las subvenciones directas, existen deducciones fiscales y ventajas energéticas asociadas al uso de vehículos eléctricos. Las empresas pueden contabilizar la inversión como gasto deducible, y los particulares reducen su consumo global gracias a una gestión energética más eficiente.',
      },
    ],
    faqs: [
      {
        q: '¿Cuánto cubre la ayuda?',
        a: 'Hasta el 70% del coste de instalación, según el tipo de beneficiario y el uso del cargador.',
      },
      {
        q: '¿Gestionáis vosotros los trámites?',
        a: 'Sí. Acompañamos en toda la gestión documental para que el proceso administrativo se complete correctamente y se eviten errores, retrasos o rechazos.',
      },
      {
        q: '¿Qué pasa si el equipo no está homologado?',
        a: 'La ayuda se deniega. Por eso solo instalamos equipos con certificación CE y homologación europea, y ejecutamos conforme a la ITC-BT-52.',
      },
    ],
    relacionados: ['preinstalacion-comunitaria', 'fotovoltaica'],
  },
];

export const getServicio = (slug) => servicios.find((s) => s.slug === slug);

/** Artículo del blog → servicio con el que cerrar su lectura. */
export const servicioPorArticulo = {
  'energia-solar-fotovoltaica': 'fotovoltaica',
  'energia-fotovoltaica-para-vehiculos-electricos': 'fotovoltaica',
  'energia-minieolica': 'minieolica',
  'subvenciones-para-cargadores-coches-electricos': 'subvenciones-moves-iii',
  'oportunidades-de-negocio-con-puntos-de-recarga': 'preinstalacion-comunitaria',
  'escoger-instaladores-oficiales': 'preinstalacion-comunitaria',
};
