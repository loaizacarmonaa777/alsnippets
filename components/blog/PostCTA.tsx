import Link from "next/link"; // Next.js link component

/* =====================================================
   CTA dinámico por categoría de post
   Responsabilidad:
   - Mostrar una llamada a la acción coherente
   - Centralizar la lógica (no hardcode en los posts)
   ===================================================== */

type PostCTAProps = {
  category: string;
};

export default function PostCTA({ category }: PostCTAProps) {
  /* =====================================================
     Normalizar categoría
     (evita errores por mayúsculas o acentos)
     ===================================================== */
  const normalizedCategory = category.toLowerCase();

  /* =====================================================
     Configuración de CTA según categoría
     ===================================================== */
  let title = "¿Hablamos de tu sitio web?";
  let description =
    "Si quieres saber en qué estado está tu sitio y qué vale la pena mejorar, puedo ayudarte.";
  let ctaText = "Contactar";
  let ctaLink = "/contacto";

  /* =====================================================
     Reglas por tipo de contenido
     ===================================================== */
  if (
    normalizedCategory.includes("seguridad") ||
    normalizedCategory.includes("virus")
  ) {
    title = "Auditoría de seguridad WordPress";
    description =
      "Detecta vulnerabilidades, archivos infectados y configuraciones inseguras antes de que se conviertan en un problema mayor.";
    ctaText = "Solicitar auditoría de seguridad";
    ctaLink = "/auditoria";
  }

  if (
    normalizedCategory.includes("seo") ||
    normalizedCategory.includes("geo") ||
    normalizedCategory.includes("marketing")
  ) {
    title = "Consultoría SEO y GEO";
    description =
      "Analizamos tu sitio desde la perspectiva de Google y los LLMs para mejorar visibilidad, contexto y autoridad.";
    ctaText = "Solicitar consultoría";
    ctaLink = "/auditoria";
  }

  if (
    normalizedCategory.includes("optimizacion") ||
    normalizedCategory.includes("rendimiento")
  ) {
    title = "Auditoría de rendimiento WordPress";
    description =
      "Identifica cuellos de botella, problemas de carga y configuraciones que afectan la experiencia del usuario.";
    ctaText = "Solicitar auditoría técnica";
    ctaLink = "/auditoria";
  }

  /* =====================================================
     Render
     ===================================================== */
  return (
    <section className="border rounded-2xl p-8 space-y-4 bg-black/5">
      <h3 className="text-2xl font-semibold">
        {title}
      </h3>

      <p className="opacity-80 max-w-2xl">
        {description}
      </p>

      <Link
        href={ctaLink}
        className="inline-block border px-6 py-4 rounded-lg"
      >
        {ctaText}
      </Link>
    </section>
  );
}
