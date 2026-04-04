import { getDictionary } from "@/i18n/get-dictionary";

/* =========================================================================
    COMPONENTE LAYOUT - OPTIMIZADO (Sin Metadata)
   ========================================================================= */
export default async function SeguridadLimpiezaLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  const dict = await getDictionary(lang);
  
  const s = (dict as any).servicios_seguridad.meta;
  const tPage = (dict as any).servicios_seguridad.page;
  const baseUrl = "https://www.alsnippets.com";

  /* =====================================================
      SCHEMA JSON-LD DINÁMICO (SEO TÉCNICO)
     ===================================================== */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    // ✅ CORREGIDO: Nombre dinámico desde el Hero del JSON
    name: tPage.hero.title,
    description: s.description,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Alsnippets',
      image: `${baseUrl}/images/og/openGraph-seguridad-limpieza.png`,
      url: `${baseUrl}/${lang}`
    },
    url: `${baseUrl}/${lang}/servicios/seguridad-limpieza`,
    serviceType: 'Cybersecurity',
    areaServed: ['CO', 'ES', 'US', 'MX'],
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock'
    }
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