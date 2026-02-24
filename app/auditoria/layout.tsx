import { Metadata } from 'next'

/* =====================================================
   METADATA SEO — AUDITORÍA Y CONSULTORÍA WORDPRESS
===================================================== */
export const metadata: Metadata = {
  title: 'Auditoría y Consultoría WordPress Profesional',
  description: 'Auditoría y consultoría WordPress profesional. Trabajo de forma remota con proyectos en Colombia, Latinoamérica, España, USA, Canadá y otros países. Seguridad, rendimiento y acompañamiento técnico real.',
  
  keywords: [
    'Auditoría WordPress',
    'Consultoría WordPress',
    'Soporte WordPress remoto',
    'Mantenimiento WordPress profesional',
    'Seguridad WordPress',
    'Optimización WPO WordPress',
    'Limpieza de malware WordPress',
    'Experto WordPress freelance',
    'Auditoría técnica SEO WordPress'
  ],

  // Open Graph (Para previsualizaciones en redes y chats)
  openGraph: {
    title: 'Auditoría y Consultoría WordPress Profesional | Adrián Loaiza',
    description: 'Asegura el rendimiento, la seguridad y la escalabilidad de tu sitio web con una auditoría técnica profunda. Servicio remoto internacional.',
    url: 'https://alsnippets.com/auditoria',
    siteName: 'Alsnippets',
    locale: 'es_ES',
    alternateLocale: ['es_CO', 'es_MX', 'es_US'],
    type: 'website',
    images: [
      {
        url: '/images/og/og-global-alsnippets.webp', // Cambia por una imagen específica si la tienes
        width: 1200,
        height: 630,
        alt: 'Auditoría y Consultoría WordPress por Adrián Loaiza',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Auditoría y Consultoría WordPress | Alsnippets',
    description: 'Diagnóstico profundo, seguridad y rendimiento para tu web. Trabajo 100% remoto y profesional.',
    creator: '@alsnippets',
  },

  // Directivas para indexación (¡Vital para captar clientes orgánicos!)
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

/* =====================================================
   SCHEMA JSON-LD (DATOS ESTRUCTURADOS DEL SERVICIO)
   Informa a Google sobre el servicio exacto y alcance geográfico
===================================================== */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'WordPress Audit and Consulting',
  name: 'Auditoría y Consultoría Técnica WordPress',
  description: 'Servicio avanzado de diagnóstico, optimización de velocidad (WPO), limpieza de malware y consultoría técnica de arquitectura para sitios web en WordPress.',
  provider: {
    '@type': 'ProfessionalService',
    name: 'Alsnippets - Adrián Loaiza',
    image: 'https://alsnippets.com/images/og/og-global-alsnippets.webp',
    telephone: '+573246454061',
    url: 'https://alsnippets.com',
  },
  // Indicamos a Google tu alcance internacional para este servicio
  areaServed: [
    { '@type': 'Country', name: 'Colombia' },
    { '@type': 'Country', name: 'Spain' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Continent', name: 'Latin America' }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios WordPress',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Optimización de Rendimiento (WPO)'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Auditoría de Seguridad y Limpieza de Malware'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Acompañamiento y Soporte Técnico Remoto'
        }
      }
    ]
  }
}

export default function AuditoriaLayout({
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