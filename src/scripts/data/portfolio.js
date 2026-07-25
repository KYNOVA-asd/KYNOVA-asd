import { projects } from "./projects.js";

export const portfolio = {
  contact: {
    phoneLabel: "+52 998 744 9856",
    whatsapp: "529987449856",
    github: "https://github.com/1Don2angello",
  },
  stats: [
    {
      value: "Web",
      label: "sitios claros para presentar servicios y generar contacto.",
    },
    {
      value: "Sistemas",
      label: "herramientas internas para ordenar procesos y datos.",
    },
    {
      value: "Marketing",
      label: "presencia visual y mensajes listos para compartir.",
    },
  ],
  projects,
  services: [
    {
      title: "Páginas para negocios",
      description: "Landing pages, cartas digitales y sitios informativos con contacto directo.",
    },
    {
      title: "Portafolios dev",
      description: "Proyectos con imágenes, enlaces y fichas breves para explicar valor.",
    },
    {
      title: "Prototipos rápidos",
      description: "Interfaces ligeras para probar ideas y avanzar rápido.",
    },
  ],
  skills: [
    {
      icon: "UI",
      title: "Interfaces",
      description: "Diseños claros, responsivos y fáciles de entender.",
      tags: ["CSS Grid", "Flexbox", "Accesibilidad"],
    },
    {
      icon: "JS",
      title: "Interactividad",
      description: "Experiencias fluidas, rápidas y sin complicaciones.",
      tags: ["ES Modules", "DOM", "Modal"],
    },
    {
      icon: "MK",
      title: "Marketing",
      description: "Mensajes claros, presencia visual y llamadas a la acción.",
      tags: ["CTA", "Catálogo", "Contacto"],
    },
  ],
};
