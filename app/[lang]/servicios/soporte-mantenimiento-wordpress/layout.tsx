import { getDictionary } from "@/i18n/get-dictionary";

/* =========================================================================
    COMPONENTE LAYOUT - OPTIMIZADO (Sin Metadata)
   ========================================================================= */
export default async function SoporteMantenimientoWordPressLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  const dict = await getDictionary(lang);
  
  const s = (dict as any).servicios_soporte.schema;
  const tPage = (dict as any).servicios_soporte.page;
  const baseUrl = "https://www.alsnippets.com";

  /* =====================================================
      SCHEMA JSON-LD DINÁMICO (SEO TÉCNICO)
     ===================================================== */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    // ✅ CORREGIDO: Nombre dinámico desde el Hero del JSON (Sin texto plano)
    "name": tPage.hero.title,
    "description": s.description,
    "provider": {
      "@type": "ProfessionalService",
      "name": "Alsnippets",
      "image": `${baseUrl}/images/og/openGraph-soporte-mantenimiento.png`,
      "url": `${baseUrl}/${lang}`
    },
    "serviceType": "Technical Support and Maintenance",
    "areaServed": "Worldwide",
    "url": `${baseUrl}/${lang}/servicios/soporte-mantenimiento-wordpress`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <section className="relative w-full">
        {children}
      </section>
    </>
  );
}