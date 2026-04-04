import { getDictionary } from "@/i18n/get-dictionary";

/* =========================================================================
    COMPONENTE LAYOUT - OPTIMIZADO (Sin Metadata)
   ========================================================================= */
export default async function SeoGeoLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  const dict = await getDictionary(lang);
  
  const s = (dict as any).servicios_seo.schema;
  const tPage = (dict as any).servicios_seo.page;
  const baseUrl = "https://www.alsnippets.com";

  /* =====================================================
      SCHEMA JSON-LD DINÁMICO (SEO y IA)
     ===================================================== */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    // ✅ DINÁMICO: Extraído del JSON (Cambia a inglés automáticamente)
    "name": s.name || tPage.hero.title,
    "description": s.description,
    "provider": {
      "@type": "ProfessionalService",
      "name": "Alsnippets",
      "image": `${baseUrl}/images/og/openGraph-seo-geo.png`,
      "url": `${baseUrl}/${lang}`
    },
    "serviceType": "SEO and IA Optimization (GEO)",
    "areaServed": "Worldwide",
    "url": `${baseUrl}/${lang}/servicios/seo-geo`
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