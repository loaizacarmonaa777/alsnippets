// app/[lang]/auditoria/layout.tsx
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
  const { lang: rawLang } = await params
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en'
  const dict = await getDictionary(lang)
  const t = dict.auditoria.meta
  const baseUrl = 'https://www.alsnippets.com'

  return {
    // ✅ Regla: El template del RootLayout añadirá el "| Alsnippets"
    title: "Auditoría", 
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.og_title,
      description: t.og_description,
      url: `${baseUrl}/${lang}/auditoria`,
      siteName: dict.common.meta.brand,
      locale: lang === 'en' ? 'en_US' : 'es_CO',
      type: 'website',
      images: [
        {
          url: '/images/og/openGraph-auditoria.png',
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
      images: ['/images/og/openGraph-auditoria.png'],
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/auditoria`,
    },
  }
}

/* =====================================================
    COMPONENTE LAYOUT
===================================================== */
export default async function AuditoriaLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en'
  const dict = await getDictionary(lang)
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
      name: 'Alsnippets',
      image: 'https://www.alsnippets.com/images/og/openGraph-auditoria.png',
      telephone: '+573246454061',
      url: 'https://www.alsnippets.com',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CO'
      }
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
      {/* Inyección de datos estructurados para Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* ✅ IMPORTANTE: Aquí se renderiza la página (page.tsx) */}
      <section className="relative w-full">
        {children}
      </section>
    </>
  )
}