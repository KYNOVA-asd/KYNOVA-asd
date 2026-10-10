/**
 * @typedef {Object} ServiceStep
 * @property {string} title
 * @property {string} description
 *
 * @typedef {Object} ServiceDefinition
 * @property {string} slug
 * @property {string} shortName
 * @property {string} eyebrow
 * @property {string} title
 * @property {string} description
 * @property {string[]} outcomes
 * @property {ServiceStep[]} process
 * @property {string[]} deliverables
 * @property {string} idealFor
 */

/** @type {Record<string, ServiceDefinition>} */
export const services = {
  "dev-web": {
    slug: "dev-web",
    shortName: "Desarrollo web",
    eyebrow: "Desarrollo web",
    title: "Tu sitio web debe hacer más que verse bien.",
    description: "Lo construimos para comunicar, funcionar y acompañar el crecimiento de tu negocio.",
    outcomes: ["Presencia profesional alineada a tu marca", "Experiencia responsive y accesible", "Estructura preparada para SEO y crecimiento"],
    process: [
      { title: "01 · Descubrimiento", description: "Definimos objetivo, audiencia, contenido y acción principal." },
      { title: "02 · Arquitectura y diseño", description: "Ordenamos páginas, recorridos, jerarquía visual y prototipo." },
      { title: "03 · Desarrollo", description: "Construimos componentes, interacciones y comportamiento responsive." },
      { title: "04 · Validación y publicación", description: "Probamos, optimizamos y dejamos una base mantenible." },
    ],
    deliverables: ["Arquitectura de información", "Diseño responsive", "Desarrollo frontend", "SEO técnico base", "Integración de contacto", "Publicación y documentación"],
    idealFor: "Negocios, marcas personales y equipos que necesitan convertir su propuesta en una experiencia digital clara.",
  },
  "gestion-redes-sociales": {
    slug: "gestion-redes-sociales",
    shortName: "Gestión de redes sociales",
    eyebrow: "GRS · Presencia constante",
    title: "Redes conectadas con tu oferta, tu sitio y tus objetivos comerciales.",
    description: "Planeamos y gestionamos la comunicación cotidiana de tu marca para que cada publicación tenga intención, continuidad y una voz reconocible.",
    outcomes: ["Calendario y ritmo de publicación definidos", "Mensajes consistentes con tu identidad", "Seguimiento para aprender y ajustar"],
    process: [
      { title: "01 · Diagnóstico", description: "Revisamos marca, audiencia, canales y situación actual." },
      { title: "02 · Estrategia editorial", description: "Definimos pilares, tono, formatos y frecuencia." },
      { title: "03 · Operación", description: "Programamos publicaciones y coordinamos cada entrega." },
      { title: "04 · Revisión", description: "Leemos resultados y proponemos el siguiente ciclo." },
    ],
    deliverables: ["Diagnóstico de canales", "Pilares de contenido", "Calendario mensual", "Copies y programación", "Reporte de desempeño", "Recomendaciones de mejora"],
    idealFor: "Marcas que necesitan mantener activas sus redes sin improvisar cada semana.",
  },
  "creacion-contenido": {
    slug: "creacion-contenido",
    shortName: "Creación de contenido",
    eyebrow: "CDC · Contenido con intención",
    title: "Contenido que conecta tu propuesta de valor con cada punto de contacto.",
    description: "Convertimos ideas, productos y servicios en piezas visuales y mensajes preparados para redes, campañas y puntos de contacto digitales.",
    outcomes: ["Ideas alineadas a objetivos reales", "Sistema visual consistente", "Piezas listas para publicar y reutilizar"],
    process: [
      { title: "01 · Brief", description: "Aterrizamos objetivo, audiencia, oferta y referencias." },
      { title: "02 · Concepto", description: "Construimos la idea central y el enfoque narrativo." },
      { title: "03 · Producción", description: "Creamos textos, diseños y adaptaciones acordadas." },
      { title: "04 · Entrega", description: "Organizamos archivos y versiones listas para cada canal." },
    ],
    deliverables: ["Conceptos creativos", "Copies", "Diseños para redes", "Carruseles y stories", "Adaptaciones por formato", "Biblioteca organizada"],
    idealFor: "Negocios que saben qué ofrecen, pero necesitan comunicarlo con mayor claridad y calidad visual.",
  },
  "campanas-meta": {
    slug: "campanas-meta",
    shortName: "Campañas Meta",
    eyebrow: "CM · Meta Ads",
    title: "Campañas que llevan a una experiencia digital preparada para convertir.",
    description: "Estructuramos campañas en Facebook e Instagram con objetivos, públicos, anuncios y seguimiento definidos desde el inicio.",
    outcomes: ["Objetivo y conversión claramente definidos", "Segmentación y creatividades coordinadas", "Decisiones basadas en resultados observables"],
    process: [
      { title: "01 · Preparación", description: "Validamos oferta, destino, medición y presupuesto disponible." },
      { title: "02 · Estructura", description: "Definimos campaña, audiencias, mensajes y variantes." },
      { title: "03 · Lanzamiento", description: "Configuramos y publicamos los anuncios aprobados." },
      { title: "04 · Optimización", description: "Monitoreamos señales y ajustamos con base en datos." },
    ],
    deliverables: ["Plan de campaña", "Configuración de públicos", "Copies publicitarios", "Adaptación de creatividades", "Monitoreo", "Reporte y aprendizajes"],
    idealFor: "Marcas con una oferta clara que buscan generar conversaciones, prospectos o ventas mediante Meta Ads.",
  },
};
