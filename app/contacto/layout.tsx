import { Metadata } from 'next'

/* =====================================================
   METADATA: PÁGINA DE CONTACTO
===================================================== */
export const metadata: Metadata = {
  title: 'Contacto | Adrián Loaiza - Alsnippets',
  description: 'Escríbeme para hablar sobre tu proyecto, resolver tus dudas y dar el siguiente paso con confianza. Estoy aquí para ayudarte a escalar tu web.',
  
  keywords: [
    'Contactar desarrollador web',
    'Presupuesto página web',
    'Contratar experto WordPress',
    'Consultoría SEO contacto',
    'Desarrollo web a medida',
    'Adrián Loaiza contacto',
    'Alsnippets soporte'
  ],

  // Open Graph (Ideal para cuando compartes el link por WhatsApp o Telegram)
  openGraph: {
    title: 'Hablemos de tu proyecto | Adrián Loaiza',
    description: '¿Tienes una idea en mente o necesitas auditar tu web actual? Escríbeme sin compromiso y analicemos cómo puedo ayudarte.',
    url: 'https://alsnippets.com/contacto',
    siteName: 'Alsnippets',
    locale: 'es_ES',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto | Alsnippets',
    description: 'Escríbeme para hablar sobre tu proyecto y dar el siguiente paso con confianza.',
    creator: '@alsnippets',
  },

  // Queremos que Google indexe esta página para búsquedas de contratación
  robots: {
    index: true,
    follow: true,
  },
  
  alternates: {
    canonical: 'https://alsnippets.com/contacto',
  },
}

/* =====================================================
   SCHEMA JSON-LD (DATOS ESTRUCTURADOS DE CONTACTO)
   Le dice a Google que esta URL es el canal oficial de comunicación
===================================================== */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contacto',
  description: 'Página oficial de contacto para servicios de desarrollo web y auditoría SEO con Adrián Loaiza.',
  url: 'https://alsnippets.com/contacto',
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

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode
}) {
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