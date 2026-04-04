import { getDictionary } from "@/i18n/get-dictionary";

/* =====================================================
    COMPONENTE LAYOUT - OPTIMIZADO (Sin Metadata)
   ===================================================== */
export default async function OptimizacionRendimientoLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  const dict = await getDictionary(lang);
  
  // Referencias al diccionario
  const s = (dict as any).servicios_optimizacion.meta;
  const tPage = (dict as any).servicios_optimizacion.page;
  const baseUrl = "https://www.alsnippets.com";

  /* =====================================================
      SCHEMA JSON-LD DINÁMICO (Service)
     ===================================================== */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    // ✅ CORREGIDO: El nombre del servicio ahora es dinámico desde el JSON (Hero Title)
    name: tPage.hero.title, 
    description: s.description,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Alsnippets',
      image: `${baseUrl}/images/og/openGraph-optimizacion-rendimiento.png`,
      url: `${baseUrl}/${lang}`
    },
    url: `${baseUrl}/${lang}/servicios/optimizacion-rendimiento`,
    areaServed: ['CO', 'ES', 'US', 'CA', 'MX'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios WPO',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Core Web Vitals Optimization'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Database Debugging'
          }
        }
      ]
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