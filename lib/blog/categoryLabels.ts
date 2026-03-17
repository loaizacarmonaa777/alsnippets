export const categoryLabels: Record<string, Record<string, string>> = {
  wordpress: {
    es: "WordPress",
    en: "WordPress",
  },
  seo: {
    es: "SEO",
    en: "SEO",
  },
  virus: {
    es: "Virus",
    en: "Malware",
  },
  seguridad: {
    es: "Seguridad",
    en: "Security",
  },
  optimizacion: {
    es: "Optimización",
    en: "Optimization",
  },
  rendimiento: {
    es: "Rendimiento",
    en: "Performance",
  },
  marketing: {
    es: "Marketing",
    en: "Marketing",
  },
};

/**
 * Helper para obtener el label traducido de forma segura
 */
export const getCategoryLabel = (category: string, lang: string): string => {
  const cat = category.toLowerCase();
  // Si la categoría existe, devolvemos el idioma solicitado, 
  // si no existe ese idioma, devolvemos español por defecto, 
  // si la categoría no existe, devolvemos la key capitalizada.
  return categoryLabels[cat]?.[lang] || categoryLabels[cat]?.es || category;
};