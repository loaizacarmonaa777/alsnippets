import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
   METADATA SEO DINÁMICA — CASOS DE ÉXITO
===================================================== */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'es' | 'en');
  const t = dict.proyecto_casos.meta;
  const baseUrl = 'https://alsnippets.com';

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,

    openGraph: {
      title: t.og_title,
      description: t.og_description,
      url: `${baseUrl}/${lang}/proyectos/casos-de-exito`,
      siteName: 'Alsnippets',
      locale: lang === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
      images: [{ 
        url: '/images/og/og-global-alsnippets.webp', 
        width: 1200, 
        height: 630, 
        alt: t.og_alt 
      }],
    },

    twitter: {
      card: 'summary_large_image',
      title: t.twitter_title,
      description: t.twitter_description,
      creator: '@alsnippets',
    },

    robots: { index: true, follow: true },
    alternates: { canonical: `${baseUrl}/${lang}/proyectos/casos-de-exito` },
  }
}

export default async function CasosDeExitoLayout({ 
  children,
  params 
}: { 
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'es' | 'en');
  const s = dict.proyecto_casos.schema;

  /* =====================================================
      SCHEMA JSON-LD DINÁMICO
     ===================================================== */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: s.name,
    description: s.description,
    url: `https://alsnippets.com/${lang}/proyectos/casos-de-exito`,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Alsnippets - Adrián Loaiza'
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