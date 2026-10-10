/** @typedef {{id:string,name:string,category:"Dev"|"Marketing",description:string,kynovaUse:string,logo:string,url:string,featuredWeek:string}} WeeklyTool */

/** @type {WeeklyTool[]} */
export const tools = [
  {
    id: "metricool",
    name: "Metricool",
    category: "Marketing",
    description: "Planificación, publicación y análisis de redes sociales desde un mismo espacio.",
    kynovaUse: "Nos ayuda a ordenar calendarios y convertir métricas dispersas en decisiones de contenido.",
    logo: "https://cdn.simpleicons.org/metricool/34402f",
    url: "https://metricool.com/",
    featuredWeek: "2026-W41",
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Dev",
    description: "Plataforma de despliegue optimizada para proyectos web modernos y rápidos.",
    kynovaUse: "La usamos para publicar, revisar y actualizar experiencias web sin procesos innecesariamente complejos.",
    logo: "https://cdn.simpleicons.org/vercel/34402f",
    url: "https://vercel.com/",
    featuredWeek: "2026-W42",
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "Dev",
    description: "Base de datos, autenticación y almacenamiento para aplicaciones digitales.",
    kynovaUse: "Nos permite validar productos con una infraestructura sólida que puede evolucionar junto al negocio.",
    logo: "https://cdn.simpleicons.org/supabase/34402f",
    url: "https://supabase.com/",
    featuredWeek: "2026-W43",
  },
];
