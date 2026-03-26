import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
    METADATA DINÁMICA: PÁGINA DE CONTACTO
===================================================== */
export async function generateMetadata ({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en'
  const dict = await getDictionary(lang)
  const t = dict.contacto.meta
  const baseUrl = 'https://www.alsnippets.com'

  return {
    // ✅ Regla de Títulos: Solo el nombre de la página (el template añade | Alsnippets)
    title: "Contacto", 
    description: t.description,
    keywords: t.keywords,

    openGraph: {
      title: t.og_title,
      description: t.og_description,
      // ✅ Regla de Enlaces: Inyección de /${lang}/ y subdominio www
      url: `${baseUrl}/${lang}/contacto`,
      siteName: 'Alsnippets',
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/og/openGraph-contacto.png',
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
      images: ['/images/og/openGraph-contacto.png'],
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
      canonical: `${baseUrl}/${lang}/contacto`
    }
  }
}

/* =====================================================
    COMPONENTE LAYOUT
===================================================== */
export default async function ContactoLayout ({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en'
  const dict = await getDictionary(lang)
  const s = dict.contacto.schema
  const baseUrl = 'https://www.alsnippets.com'

  /* =====================================================
      SCHEMA JSON-LD DINÁMICO (ContactPage)
  ===================================================== */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: s.name,
    description: s.description,
    // ✅ Regla de Enlaces: Inyección de /${lang}/
    url: `${baseUrl}/${lang}/contacto`,
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'Alsnippets', // ✅ Singular y Marca
      image: `${baseUrl}/images/og/openGraph-contacto.png`,
      email: 'loaizacarmonaa@gmail.com',
      telephone: '+573246454061',
      url: `${baseUrl}/${lang}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Santa Bárbara',
        addressRegion: 'Antioquia',
        addressCountry: 'CO'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '5.8731', 
        longitude: '-75.5658'
      }
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