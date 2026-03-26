import { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";

/* =========================================================================
   SEGURIDAD DE URL BASE
   ========================================================================= */
const baseUrl = "https://www.alsnippets.com";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  const dict = await getDictionary(lang);
  // Ajustado al nombre del archivo: servicios_optimizacion.json
  const t = dict.servicios_optimizacion.meta;

  return {
    // ✅ Regla de Títulos: Solo el nombre de la página (El template añade | Alsnippets)
    title: "Optimización y Rendimiento", 
    description: t.description,
    keywords: t.keywords,
    
    alternates: {
      // ✅ Regla de Enlaces: Inyección de /${lang}/ y subdominio www
      canonical: `${baseUrl}/${lang}/servicios/optimizacion-rendimiento`,
    },

    openGraph: {
      title: t.og_title,
      description: t.og_description,
      // ✅ Regla de Enlaces: Inyección de /${lang}/
      url: `${baseUrl}/${lang}/servicios/optimizacion-rendimiento`,
      siteName: "Alsnippets",
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      type: "website",
      images: [
        {
          // ✅ Imagen solicitada: openGraph-optimizacion-rendimiento.png
          url: "/images/og/openGraph-optimizacion-rendimiento.png", 
          width: 1200,
          height: 630,
          alt: t.og_alt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: t.twitter_title,
      description: t.twitter_description,
      images: ["/images/og/openGraph-optimizacion-rendimiento.png"],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  };
}

/* =====================================================
    COMPONENTE LAYOUT
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
  const s = dict.servicios_optimizacion.meta;

  /* =====================================================
      SCHEMA JSON-LD DINÁMICO
     ===================================================== */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: "Optimización y Rendimiento WordPress",
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
      {/* Inyección de datos estructurados para Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Estructura visual del layout preservando children */}
      <section className="relative w-full">
        {children}
      </section>
    </>
  );
}