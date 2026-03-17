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
  const { lang } = await params
  const dict = await getDictionary(lang as 'es' | 'en')
  const t = dict.contacto.meta
  const baseUrl = 'https://alsnippets.com'

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,

    openGraph: {
      title: t.og_title,
      description: t.og_description,
      url: `${baseUrl}/${lang}/contacto`,
      siteName: 'Alsnippets',
      locale: lang === 'es' ? 'es_ES' : 'en_US',
      type: 'website'
    },

    twitter: {
      card: 'summary_large_image',
      title: t.twitter_title,
      description: t.twitter_description,
      creator: '@alsnippets'
    },

    robots: {
      index: true,
      follow: true
    },

    alternates: {
      canonical: `${baseUrl}/${lang}/contacto`
    }
  }
}

export default async function ContactoLayout ({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as 'es' | 'en')
  const s = dict.contacto.schema

  /* =====================================================
      SCHEMA JSON-LD DINÁMICO
  ===================================================== */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: s.name,
    description: s.description,
    url: `https://alsnippets.com/${lang}/contacto`,
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'Alsnippets - Adrián Loaiza',
      image: 'https://alsnippets.com/images/og/og-global-alsnippets.webp',
      email: 'loaizacarmonaa@gmail.com',
      telephone: '+573246454061',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Santa Bárbara',
        addressRegion: 'Antioquia',
        addressCountry: 'CO'
      }
    }
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
