import { projects } from "./projects.js";

/**
 * @typedef {Object} Portfolio
 * @property {{label: string, value: string}[]} stats
 * @property {{title: string, description: string}[]} services
 * @property {{quote: string, author: string, context: string}[]} reviews
 * @property {{icon: string, title: string, description: string, tags: string[]}[]} skills
 * @property {import("./projects.js").Project[]} projects
 * @property {{phoneLabel: string, whatsapp: string, github: string, instagram: string, facebook: string}} contact
 */

/** @type {Portfolio} */
export const portfolio = {
  contact: {
    phoneLabel: "+52 998 744 9856",
    whatsapp: "529987449856",
    github: "https://github.com/KYNOVA-asd",
    instagram: "https://www.instagram.com/kynova.asd/",
    facebook: "https://www.facebook.com/profile.php?id=61584581761315",
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
      title: "Desarrollo Web & Sistemas",
      description: "Landings, e-commerce y sistemas rápidos, accesibles y preparados para convertir visitas en acciones.",
    },
    {
      title: "Marketing Digital & Meta Ads",
      description: "Estrategia, contenido, redes y campañas para atraer a la audiencia correcta con un mensaje coherente.",
    },
    {
      title: "Pack Lanzamiento Integral",
      description: "Plataforma, identidad, contenido y captación coordinados por el mismo equipo: Dev + Marketing sin fricción.",
    },
  ],
  reviews: [],
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
