import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
    METADATA SEO DINÁMICA — MIS CREACIONES
===================================================== */
export async function generateMetadata ({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en'
  const dict = await getDictionary(lang)
  const t = dict.proyecto_creaciones.meta
  const baseUrl = 'https://www.alsnippets.com'

  return {
    // ✅ Regla de Títulos: Solo el nombre de la página
    title: "Mis creaciones", 
    description: t.description,
    keywords: t.keywords,

    openGraph: {
      title: t.og_title,
      description: t.og_description,
      // ✅ Regla de Enlaces: Inyección de /${lang}/ y subdominio www
      url: `${baseUrl}/${lang}/proyectos/mis-creaciones`,
      siteName: 'Alsnippets',
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
      images: [
        {
          // ✅ Imagen solicitada: openGraph-creaciones.png
          url: '/images/og/openGraph-creaciones.png',
          width: 1200,
          height: 630,
          alt: t.og_alt
        }
      ]
    },

    twitter: {
      card: 'summary_large_image',
      title: t.twitter_title,
      description: t.twitter_description,
      creator: '@alsnippets',
      images: ['/images/og/openGraph-creaciones.png'],
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
      canonical: `${baseUrl}/${lang}/proyectos/mis-creaciones` 
    }
  }
}

/* =====================================================
    COMPONENTE LAYOUT
===================================================== */
export default async function MisCreacionesLayout ({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en'
  const dict = await getDictionary(lang)
  const s = dict.proyecto_creaciones.hero
  const baseUrl = 'https://www.alsnippets.com'

  /* =====================================================
      SCHEMA JSON-LD DINÁMICO
  ===================================================== */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    // ✅ Sincronizado con las llaves de tu JSON
    name: s.title,
    description: s.subtitle,
    url: `${baseUrl}/${lang}/proyectos/mis-creaciones`,
    publisher: {
      '@type': 'Organization',
      name: 'Alsnippets',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/brand/logo-fondo-dark-menu.svg`
      }
    },
    author: {
      '@type': 'Person',
      name: 'Adrián Loaiza',
      url: `${baseUrl}/${lang}/sobre-mi`
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Suite Text'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Barber Short'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Alsnippets'
        }
      ]
    }
  }

  return (
    <>
      {/* Inyección de datos estructurados para Google */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Estructura visual del layout preservando children intacto */}
      <section className="relative w-full">
        {children}
      </section>
    </>
  )
}