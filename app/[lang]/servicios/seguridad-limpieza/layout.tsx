import { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";

/* =========================================================================
    DEFINICIÓN DE LA URL BASE
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
  const t = dict.servicios_seguridad.meta;

  return {
    // ✅ Regla de Títulos (SEO): Solo el nombre de la página
    title: "Seguridad y Limpieza", 
    description: t.description,
    keywords: t.keywords,
    
    alternates: {
      // ✅ Regla de Enlaces (I18n): Inyección automática de /${lang}/
      canonical: `${baseUrl}/${lang}/servicios/seguridad-limpieza`,
    },

    openGraph: {
      title: t.og_title,
      description: t.og_description,
      // ✅ Regla de Enlaces (I18n): Inyección de /${lang}/
      url: `${baseUrl}/${lang}/servicios/seguridad-limpieza`,
      siteName: "Alsnippets",
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      type: "website",
      images: [
        {
          // ✅ Imagen actualizada: openGraph-seguridad-limpieza.png
          url: "/images/og/openGraph-seguridad-limpieza.png", 
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
      creator: "@alsnippets",
      images: ["/images/og/openGraph-seguridad-limpieza.png"],
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

/* =========================================================================
    COMPONENTE LAYOUT
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
  const s = dict.servicios_seguridad.meta;

  /* =====================================================
      SCHEMA JSON-LD DINÁMICO (SEO TÉCNICO)
     ===================================================== */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Seguridad y Limpieza WordPress',
    description: s.description,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Alsnippets', // ✅ Singularidad de Marca
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
      {/* Inyección de Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Renderizado de hijos preservando la estructura */}
      <section className="relative w-full">
        {children}
      </section>
    </>
  );
}