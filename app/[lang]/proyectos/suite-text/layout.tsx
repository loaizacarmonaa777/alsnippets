import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
    METADATA SEO DINÁMICA — SUITE TEXT
===================================================== */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  const dict = await getDictionary(lang);
  const t = dict.proyecto_suite.meta;
  const baseUrl = 'https://www.alsnippets.com';

  return {
    // ✅ Regla de Títulos: Solo el nombre de la página
    title: "Suite Text", 
    description: t.description,
    keywords: t.keywords,

    openGraph: {
      title: t.og_title,
      description: t.og_description,
      // ✅ Regla de Enlaces: Inyección de /${lang}/ y subdominio www
      url: `${baseUrl}/${lang}/proyectos/suite-text`,
      siteName: 'Alsnippets',
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
      images: [
        {
          // ✅ Imagen solicitada: openGraph-suite-text.png
          url: '/images/og/openGraph-suite-text.png', 
          width: 1200,
          height: 630,
          alt: t.og_alt,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: t.twitter_title,
      description: t.twitter_description,
      creator: '@alsnippets',
      images: ['/images/og/openGraph-suite-text.png'],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      },
    },
    
    alternates: {
      // ✅ Regla de Enlaces: Inyección de /${lang}/
      canonical: `${baseUrl}/${lang}/proyectos/suite-text`,
    },
  }
}

/* =====================================================
    COMPONENTE LAYOUT
===================================================== */
export default async function SuiteTextLayout({ 
  children,
  params 
}: { 
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  const dict = await getDictionary(lang);
  const s = dict.proyecto_suite.schema;
  const baseUrl = 'https://www.alsnippets.com';

  /* =====================================================
      SCHEMA JSON-LD DINÁMICO
     ===================================================== */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Suite Text',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: s.description,
    // ✅ Regla de Enlaces: Inyección de /${lang}/
    url: `${baseUrl}/${lang}/proyectos/suite-text`,
    author: {
      '@type': 'Person',
      name: 'Adrián Loaiza',
      // ✅ Regla de Enlaces: Inyección de /${lang}/
      url: `${baseUrl}/${lang}/sobre-mi`
    },
    publisher: {
      '@type': 'Organization',
      name: 'Alsnippets',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/brand/logo-fondo-dark-menu.svg`
      }
    }
  }

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
  )
}