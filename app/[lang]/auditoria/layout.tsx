import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
   METADATA SEO DINÁMICA
===================================================== */
export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang as 'es' | 'en')
  const t = dict.auditoria.meta

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.og_title,
      description: t.og_description,
      url: 'https://alsnippets.com/auditoria',
      siteName: 'Alsnippets',
      locale: lang === 'en' ? 'en_US' : 'es_ES',
      type: 'website',
      images: [
        {
          url: '/images/og/og-global-alsnippets.webp',
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
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: 'https://alsnippets.com/auditoria',
    },
  }
}

export default async function AuditoriaLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as 'es' | 'en')
  const s = dict.auditoria.schema

  /* =====================================================
     SCHEMA JSON-LD DINÁMICO
  ===================================================== */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: s.serviceType,
    name: s.name,
    description: s.description,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Alsnippets - Adrián Loaiza',
      image: 'https://alsnippets.com/images/og/og-global-alsnippets.webp',
      telephone: '+573246454061',
      url: 'https://alsnippets.com',
    },
    areaServed: s.areaServed,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: s.catalogName,
      itemListElement: s.offers.map((offerName: string) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: offerName
        }
      }))
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