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
  const t = dict.servicios_soporte.meta;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    metadataBase: new URL(baseUrl),
    
    alternates: {
      canonical: `/${lang}/servicios/soporte-mantenimiento-wordpress`,
    },

    openGraph: {
      title: t.og_title,
      description: t.og_description,
      url: `/${lang}/servicios/soporte-mantenimiento-wordpress`,
      siteName: "Alsnippets - Adrián Loaiza",
      locale: lang === 'es' ? 'es_ES' : 'en_US',
      type: "website",
      images: [
        {
          url: "/images/og/og-mantenimiento.jpg", 
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
      images: ["/images/og/og-mantenimiento.jpg"],
      creator: "@alsnippets",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function SoporteMantenimientoWordPressLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'es' | 'en');
  const s = dict.servicios_soporte.schema;

  /* =====================================================
      SCHEMA JSON-LD DINÁMICO
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
    "serviceType": "Technical Support",
    "areaServed": "Worldwide",
    "url": `${baseUrl}/${lang}/servicios/soporte-mantenimiento-wordpress`
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