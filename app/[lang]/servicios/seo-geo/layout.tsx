import { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";

/* =========================================================================
   SEGURIDAD DE URL BASE
   ========================================================================= */
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alsnippets.com";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'es' | 'en');
  const t = dict.servicios_seo.meta;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    metadataBase: new URL(baseUrl),
    
    alternates: {
      canonical: `/${lang}/servicios/seo-geo`,
    },

    openGraph: {
      title: t.og_title,
      description: t.og_description,
      url: `/${lang}/servicios/seo-geo`,
      siteName: "Alsnippets - Adrián Loaiza",
      locale: lang === 'es' ? 'es_ES' : 'en_US',
      type: "website",
      images: [
        {
          url: "/images/og/og-seo-geo.jpg",
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
      images: ["/images/og/og-seo-geo.jpg"],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
      },
    },
  };
}

export default async function SeoGeoLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'es' | 'en');
  const s = dict.servicios_seo.schema;

  /* =====================================================
      SCHEMA JSON-LD DINÁMICO (Servicio Especializado)
     ===================================================== */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": s.name,
    "description": s.description,
    "provider": {
      "@type": "ProfessionalService",
      "name": "Alsnippets - Adrián Loaiza",
      "url": `${baseUrl}/${lang}`
    },
    "serviceType": "SEO and IA Optimization",
    "areaServed": "Worldwide",
    "url": `${baseUrl}/${lang}/servicios/seo-geo`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}