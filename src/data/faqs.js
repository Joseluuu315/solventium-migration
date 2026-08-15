// Preguntas frecuentes.
// La página /preguntas-frecuentes/ del sitio original responde 403 al rastrearla, así que
// este bloque se ha compuesto con las preguntas publicadas en las fichas de cargador y con
// la información técnica del texto de la portada (normativa, subvenciones, plazos).

export const faqGroups = [
  {
    title: 'Instalación',
    items: [
      {
        q: '¿Cuánto tarda la instalación de un punto de recarga?',
        a: 'En una vivienda unifamiliar la instalación se realiza en 24 a 48 horas, con una intervención mínima en la red doméstica. En garajes comunitarios el plazo depende del recorrido del cableado y de la comunicación previa a la comunidad.',
      },
      {
        q: '¿Necesito el permiso de la comunidad de vecinos?',
        a: 'No se requiere aprobación formal. La normativa permite la instalación individual de un punto de recarga previa comunicación a la comunidad, siempre que el sistema no interfiera con las zonas comunes ni afecte a otros vecinos. Nos encargamos de esa comunicación.',
      },
      {
        q: '¿Qué es una preinstalación comunitaria y por qué conviene?',
        a: 'Es una única canalización compartida para todos los futuros usuarios de vehículos eléctricos del edificio. Evita obras repetidas: cuando otro vecino quiera su cargador, solo tiene que conectarse a la infraestructura existente.',
      },
      {
        q: '¿La instalación cumple normativa?',
        a: 'Todos los trabajos se ejecutan conforme a la ITC-BT-52, que regula las infraestructuras de recarga en edificios residenciales y espacios públicos, con materiales certificados y protecciones adecuadas al tipo de carga.',
      },
      {
        q: '¿Qué incluye el proyecto?',
        a: 'Evaluación eléctrica y cálculo de potencia, selección del cargador compatible, presupuesto detallado con desglose de materiales y mano de obra, prueba final de funcionamiento y asesoramiento en la solicitud de subvenciones y certificación final.',
      },
    ],
  },
  {
    title: 'Cargadores y compatibilidad',
    items: [
      {
        q: '¿Es compatible con mi coche eléctrico?',
        a: 'Sí. Todos los equipos incorporan conector Tipo 2 (Mennekes), estándar europeo para recarga en corriente alterna, y existen adaptadores para vehículos con conexión Tipo 1. Son compatibles con Tesla, BMW, Renault, Kia, Peugeot, Audi, Volkswagen y el resto de marcas del mercado.',
      },
      {
        q: '¿Qué potencia necesito?',
        a: 'Para vivienda particular se recomiendan cargadores monofásicos de 3,7 a 7,4 kW. Para garajes comunitarios y empresas, cargadores trifásicos de 11 a 22 kW capaces de atender varios vehículos simultáneamente.',
      },
      {
        q: '¿Qué es el balanceo dinámico de potencia?',
        a: 'El cargador mide el consumo del resto de la instalación y ajusta automáticamente la potencia de carga para no superar la potencia contratada, evitando sobrecargas y cortes de suministro.',
      },
      {
        q: '¿Puedo cargar con el excedente de mis placas solares?',
        a: 'Sí. Los modelos que instalamos admiten carga solar opcional, de modo que el vehículo aprovecha el excedente fotovoltaico y se maximiza el ahorro energético.',
      },
      {
        q: '¿Puedo controlar la carga desde el móvil?',
        a: 'En los modelos con conectividad (V2C Trydan, Tesla Wall Connector, Wallbox Pulsar Plus y Woltio Pro) puedes programar horarios, consultar consumos y gestionar la carga desde la app del fabricante.',
      },
    ],
  },
  {
    title: 'Subvenciones y precios',
    items: [
      {
        q: '¿Cuánto cuesta instalar un punto de recarga?',
        a: 'El coste varía según las condiciones eléctricas del lugar, la distancia al cuadro de distribución y el cargador elegido. Por eso cada proyecto parte de un estudio técnico individualizado, con un presupuesto ajustado y transparente. Los equipos parten desde 1.429 €.',
      },
      {
        q: '¿Qué ayudas existen?',
        a: 'El programa MOVES III puede cubrir hasta el 70% del coste de instalación según el tipo de beneficiario y el uso del cargador. Tanto particulares como empresas pueden acceder si cumplen los requisitos técnicos.',
      },
      {
        q: '¿Qué requisitos piden las subvenciones?',
        a: 'Equipos con certificación CE y homologación europea, instalación conforme a la ITC-BT-52, factura y justificante de pago debidamente emitidos, y documentación técnica con fotografías de la instalación finalizada.',
      },
      {
        q: '¿Gestionáis vosotros los trámites?',
        a: 'Sí. Acompañamos en toda la gestión documental para que el proceso administrativo se complete correctamente y se eviten errores, retrasos o rechazos en la concesión de la ayuda.',
      },
    ],
  },
  {
    title: 'Después de la instalación',
    items: [
      {
        q: '¿Ofrecéis mantenimiento?',
        a: 'Sí, con revisión periódica y soporte posventa en toda la Comunidad de Madrid: comprobación de protecciones, revisión del cableado, limpieza de conectores y actualización del firmware del equipo.',
      },
      {
        q: '¿Qué garantía tienen los equipos?',
        a: 'Todos los cargadores cuentan con certificación CE y garantía oficial del fabricante, además de nuestro soporte técnico local.',
      },
      {
        q: '¿Podéis gestionar varios usuarios en un mismo parking?',
        a: 'Sí. En entornos empresariales y parkings compartidos integramos sistemas que asignan usuarios, registran consumos y controlan accesos, facilitando el control interno y la facturación energética.',
      },
    ],
  },
];
