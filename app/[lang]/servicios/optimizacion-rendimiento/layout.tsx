import { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";

/* =========================================================================
   SEGURIDAD DE URL BASE
   ========================================================================= */
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL 
  ? process.env.NEXT_PUBLIC_SITE_URL 
  : "https://alsnippets.com";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'es' | 'en');
  // Ajustado al nombre del archivo: servicios_optimizacion.json
  const t = dict.servicios_optimizacion.meta;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    metadataBase: new URL(baseUrl),
    
    alternates: {
      canonical: `/${lang}/servicios/optimizacion-rendimiento`,
    },

    openGraph: {
      title: t.og_title,
      description: t.og_description,
      url: `/${lang}/servicios/optimizacion-rendimiento`,
      siteName: "Adrián Loaiza - alsnippets.com",
      locale: lang === 'es' ? 'es_ES' : 'en_US',
      type: "website",
      images: [
        {
          url: "/images/og/og-optimizacion.jpg", 
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
      images: ["/images/og/og-optimizacion.jpg"],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function OptimizacionRendimientoLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  return <>{children}</>;
}