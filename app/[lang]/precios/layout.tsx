import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
   METADATA DINÁMICA: PÁGINA DE PRECIOS Y SERVICIOS
===================================================== */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'es' | 'en');
  const t = dict.precios.meta;
  const baseUrl = 'https://alsnippets.com';

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,

    openGraph: {
      title: t.og_title,
      description: t.og_description,
      url: `${baseUrl}/${lang}/precios`,
      siteName: 'Alsnippets',
      locale: lang === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: t.twitter_title,
      description: t.twitter_description,
      creator: '@alsnippets',
    },

    robots: {
      index: true,
      follow: true,
    },
    
    alternates: {
      canonical: `${baseUrl}/${lang}/precios`,
    },
  }
}

export default async function PreciosLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'es' | 'en');
  const s = dict.precios.schema;

  /* =====================================================
      SCHEMA JSON-LD DINÁMICO
  ===================================================== */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: s.name,
    description: s.description,
    url: `https://alsnippets.com/${lang}/precios`,
    publisher: {
      '@type': 'ProfessionalService',
      name: 'Alsnippets - Adrián Loaiza',
      image: 'https://alsnippets.com/images/og/og-global-alsnippets.webp',
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}