// app/[lang]/auditoria/layout.tsx
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
    COMPONENTE LAYOUT - OPTIMIZADO
   ===================================================== */
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
  const baseUrl = 'https://www.alsnippets.com'

  /* =====================================================
      SCHEMA JSON-LD DINÁMICO (Datos estructurados para Google)
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
      image: `${baseUrl}/images/og/openGraph-auditoria.png`,
      telephone: '+573246454061',
      url: baseUrl,
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
      
      {/* Renderizado de la página (page.tsx) */}
      <section className="relative w-full">
        {children}
      </section>
    </>
  )
}