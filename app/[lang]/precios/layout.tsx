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
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  const dict = await getDictionary(lang);
  const t = dict.precios.meta;
  const baseUrl = 'https://www.alsnippets.com';

  return {
    // ✅ Regla de Títulos: Solo el nombre de la página
    title: "Precios", 
    description: t.description,
    keywords: t.keywords,

    openGraph: {
      title: t.og_title,
      description: t.og_description,
      // ✅ Regla de Enlaces: Inyección de /${lang}/ y subdominio www
      url: `${baseUrl}/${lang}/precios`,
      siteName: 'Alsnippets',
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
      images: [
        {
          // ✅ Actualizado a tu nueva ruta de imágenes OG
          url: '/images/og/openGraph-precios.png',
          width: 1200,
          height: 630,
          alt: t.og_title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: t.twitter_title,
      description: t.twitter_description,
      creator: '@alsnippets',
      images: ['/images/og/openGraph-precios.png'],
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
      canonical: `${baseUrl}/${lang}/precios`,
    },
  }
}

/* =====================================================
    COMPONENTE LAYOUT
===================================================== */
export default async function PreciosLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  const dict = await getDictionary(lang);
  const s = dict.precios.schema;
  const baseUrl = 'https://www.alsnippets.com';

  /* =====================================================
      SCHEMA JSON-LD DINÁMICO
  ===================================================== */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: s.name,
    description: s.description,
    // ✅ Regla de Enlaces: Inyección de /${lang}/
    url: `${baseUrl}/${lang}/precios`,
    publisher: {
      '@type': 'ProfessionalService',
      name: 'Alsnippets', // ✅ Singular y Marca
      image: `${baseUrl}/images/og/openGraph-precios.png`,
      url: `${baseUrl}/${lang}`,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CO'
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