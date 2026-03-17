export type BlogCTA = {
  title: string;
  text: string;
  href: string;
  button: string;
};

// Usamos una estructura: [categoría][idioma]
export const ctaByCategory: Record<string, Record<string, BlogCTA>> = {
  seguridad: {
    es: {
      title: "¿Tu WordPress está realmente protegido?",
      text: "Antes de limpiar o reforzar un sitio, es clave saber qué tan expuesto está.",
      href: "/auditoria",
      button: "Solicitar auditoría de seguridad",
    },
    en: {
      title: "Is your WordPress truly protected?",
      text: "Before cleaning or hardening a site, it's key to know how exposed it really is.",
      href: "/auditoria",
      button: "Request a security audit",
    }
  },

  seo: {
    es: {
      title: "SEO moderno va más allá de palabras clave",
      text: "Reviso si tu sitio está preparado para Google y los nuevos LLMs.",
      href: "/auditoria",
      button: "Evaluar mi sitio",
    },
    en: {
      title: "Modern SEO goes beyond keywords",
      text: "I check if your site is ready for Google and the new LLMs.",
      href: "/auditoria",
      button: "Evaluate my site",
    }
  },

  optimizacion: {
    es: {
      title: "La velocidad no se adivina, se mide",
      text: "Detecto cuellos de botella reales antes de optimizar.",
      href: "/auditoria",
      button: "Auditoría de rendimiento",
    },
    en: {
      title: "Speed isn't guessed, it's measured",
      text: "I detect real bottlenecks before optimizing.",
      href: "/auditoria",
      button: "Performance audit",
    }
  },

  wordpress: {
    es: {
      title: "Cada WordPress tiene su propio contexto",
      text: "No todos los problemas se resuelven igual.",
      href: "/auditoria",
      button: "Solicitar consultoría",
    },
    en: {
      title: "Every WordPress has its own context",
      text: "Not all problems are solved the same way.",
      href: "/auditoria",
      button: "Request consultancy",
    }
  },
};

/**
 * Helper para obtener el CTA correcto inyectando el idioma en el enlace
 */
export const getCTA = (category: string, lang: string): BlogCTA | null => {
  const cat = category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const data = ctaByCategory[cat]?.[lang] || ctaByCategory[cat]?.es;

  if (!data) return null;

  // Inyectamos el lang en el href para no perder la navegación bilingüe
  return {
    ...data,
    href: `/${lang}${data.href}`
  };
};