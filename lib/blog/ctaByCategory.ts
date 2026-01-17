/* =====================================================
   CTA dinámico según categoría del post
   ===================================================== */

export type BlogCTA = {
  title: string;
  text: string;
  href: string;
  button: string;
};

export const ctaByCategory: Record<string, BlogCTA> = {
  Seguridad: {
    title: "¿Tu WordPress está realmente protegido?",
    text: "Antes de limpiar o reforzar un sitio, es clave saber qué tan expuesto está.",
    href: "/auditoria",
    button: "Solicitar auditoría de seguridad",
  },

  SEO: {
    title: "SEO moderno va más allá de palabras clave",
    text: "Reviso si tu sitio está preparado para Google y los nuevos LLMs.",
    href: "/auditoria",
    button: "Evaluar mi sitio",
  },

  Optimización: {
    title: "La velocidad no se adivina, se mide",
    text: "Detecto cuellos de botella reales antes de optimizar.",
    href: "/auditoria",
    button: "Auditoría de rendimiento",
  },

  WordPress: {
    title: "Cada WordPress tiene su propio contexto",
    text: "No todos los problemas se resuelven igual.",
    href: "/auditoria",
    button: "Solicitar consultoría",
  },
};
