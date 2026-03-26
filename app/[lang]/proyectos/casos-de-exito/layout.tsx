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
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  const dict = await getDictionary(lang);
  const t = dict.proyecto_casos.meta;
  const baseUrl = 'https://www.alsnippets.com';

  return {
    // ✅ Regla de Títulos: Solo el nombre de la página
    title: "Casos de éxito", 
    description: t.description,
    keywords: t.keywords,

    openGraph: {
      title: t.og_title,
      description: t.og_description,
      // ✅ Regla de Enlaces: Inyección de /${lang}/ y subdominio www
      url: `${baseUrl}/${lang}/proyectos/casos-de-exito`,
      siteName: 'Alsnippets',
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
      images: [{ 
        // ✅ Imagen solicitada: openGraph-casos-exito.png
        url: '/images/og/openGraph-casos-exito.png', 
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
      images: ['/images/og/openGraph-casos-exito.png'],
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
      canonical: `${baseUrl}/${lang}/proyectos/casos-de-exito` 
    },
  }
}

/* =====================================================
    COMPONENTE LAYOUT
===================================================== */
export default async function CasosDeExitoLayout({ 
  children,
  params 
}: { 
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  const dict = await getDictionary(lang);
  const s = dict.proyecto_casos.schema;
  const baseUrl = 'https://www.alsnippets.com';

  /* =====================================================
      SCHEMA JSON-LD DINÁMICO
     ===================================================== */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: s.name,
    description: s.description,
    // ✅ Regla de Enlaces: Inyección de /${lang}/
    url: `${baseUrl}/${lang}/proyectos/casos-de-exito`,
    publisher: {
      '@type': 'ProfessionalService',
      name: 'Alsnippets', // ✅ Singular y Marca
      image: `${baseUrl}/images/og/openGraph-casos-exito.png`,
      url: `${baseUrl}/${lang}`
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        // Representación de los casos de éxito principales en el Schema
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Transcendent Institute'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Inner Mastery Europa'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'EDESO'
        }
      ]
    }
  }

  return (
    <>
      {/* Inyección de datos estructurados para Google */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
      />
      
      {/* Estructura visual del layout preservando children intacto */}
      <section className="relative w-full">
        {children}
      </section>
    </>
  )
}