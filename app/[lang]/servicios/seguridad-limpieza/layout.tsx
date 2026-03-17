import { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";

/* DEFINICIÓN DE LA URL BASE
   ------------------------------------------------------------------------- */
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alsnippets.com";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'es' | 'en');
  const t = dict.servicios_seguridad.meta;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    metadataBase: new URL(baseUrl),
    
    alternates: {
      canonical: `/${lang}/servicios/seguridad-limpieza`,
    },

    openGraph: {
      title: t.og_title,
      description: t.og_description,
      url: `/${lang}/servicios/seguridad-limpieza`,
      siteName: "Adrián Loaiza - alsnippets.com",
      locale: lang === 'es' ? 'es_ES' : 'en_US',
      type: "website",
      images: [
        {
          url: "/images/og/og-seguridad.jpg", 
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
      images: ["/images/og/og-seguridad.jpg"],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function SeguridadLimpiezaLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  return (
    <>
      {children}
    </>
  );
}