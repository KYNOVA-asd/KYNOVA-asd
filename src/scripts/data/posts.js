/**
 * @typedef {Object} BlogPost
 * @property {string} id Slug único utilizado en la URL.
 * @property {string} title
 * @property {"Marketing"|"Dev"|"Estrategia"|"Tecnología"} category
 * @property {string} date Fecha ISO en formato YYYY-MM-DD.
 * @property {string} readTime
 * @property {string} excerpt
 * @property {string} coverImage Ruta absoluta desde la raíz pública.
 * @property {string} content HTML editorial de confianza.
 */

/** @type {BlogPost[]} */
export const posts = [
  {
    id: "como-se-desarrolla-un-sitio-web-profesional",
    title: "Cómo se desarrolla un sitio web profesional",
    category: "Dev",
    date: "2026-10-06",
    readTime: "6 min",
    excerpt: "Del objetivo inicial a la publicación: las decisiones que convierten una página en una herramienta clara, útil y preparada para crecer.",
    coverImage: "/assets/services/hero-dev-web.png",
    content: `
      <p>Un sitio web profesional no comienza eligiendo colores o una plantilla. Comienza entendiendo qué necesita comunicar el negocio, a quién debe dirigirse y qué acción esperamos de cada visitante.</p>
      <h2>1. Definir el objetivo</h2>
      <p>Antes de diseñar conviene responder una pregunta sencilla: ¿qué debe lograr el sitio? Puede presentar servicios, generar contactos, vender productos o facilitar un proceso. Esa prioridad guía todas las decisiones posteriores.</p>
      <h2>2. Ordenar la información</h2>
      <p>La arquitectura transforma contenido disperso en un recorrido comprensible. Cada página debe tener una función clara y conducir naturalmente hacia el siguiente paso.</p>
      <blockquote>Una web efectiva reduce dudas antes de pedir una acción.</blockquote>
      <h2>3. Diseñar y desarrollar</h2>
      <p>El diseño define la jerarquía visual; el desarrollo convierte esa intención en una experiencia rápida, accesible y adaptable a distintos dispositivos. Ambas disciplinas deben avanzar coordinadas.</p>
      <h2>4. Probar, medir y evolucionar</h2>
      <p>Publicar no es el final. Revisar rendimiento, comportamiento y consultas permite mejorar el contenido y priorizar nuevas funciones con evidencia real.</p>
    `,
  },
  {
    id: "estrategia-de-contenido-sin-improvisar",
    title: "Cómo crear contenido sin improvisar cada semana",
    category: "Marketing",
    date: "2026-10-10",
    readTime: "5 min",
    excerpt: "Un sistema práctico de objetivos, pilares y formatos para mantener una comunicación consistente sin depender de ocurrencias de último momento.",
    coverImage: "/assets/brand/banner-kynova.webp",
    content: `
      <p>La falta de ideas casi nunca es el problema principal. Con frecuencia lo que falta es un sistema que conecte los objetivos del negocio con temas que la audiencia realmente necesita.</p>
      <h2>Empieza por el objetivo, no por el formato</h2>
      <p>Antes de decidir si publicarás un reel o un carrusel, define qué debe conseguir la pieza: informar, generar confianza, presentar una solución o iniciar una conversación.</p>
      <h2>Construye pilares de contenido</h2>
      <p>Los pilares son temas recurrentes que ayudan a sostener la comunicación. Una marca de servicios puede combinar educación, proceso, casos, preguntas frecuentes y perspectiva profesional.</p>
      <ul><li>Educación para resolver dudas frecuentes.</li><li>Proceso para mostrar cómo trabajas.</li><li>Prueba para respaldar lo que prometes.</li><li>Oferta para explicar cómo pueden contratarte.</li></ul>
      <h2>Convierte una idea en varias piezas</h2>
      <p>Un tema sólido puede transformarse en artículo, carrusel, video corto y correo. Reutilizar con intención mejora la consistencia y reduce la presión de comenzar desde cero.</p>
      <h2>Revisa y ajusta</h2>
      <p>Observa qué preguntas, formatos y enfoques generan conversaciones útiles. El calendario debe evolucionar con lo que aprendes, no quedarse congelado.</p>
    `,
  },
];
