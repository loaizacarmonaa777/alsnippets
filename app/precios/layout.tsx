import { Metadata } from 'next'

/* =====================================================
   METADATA: PÁGINA DE PRECIOS Y SERVICIOS
===================================================== */
export const metadata: Metadata = {
  title: 'Precios y Cotizaciones',
  description: 'Cada proyecto es distinto. Por eso no trabajo con precios genéricos ni paquetes cerrados sin entender primero el contexto real de tu negocio. Descubre mi forma de trabajo.',
  
  keywords: [
    'Precios desarrollo web',
    'Cotización web a medida',
    'Tarifas freelance WordPress',
    'Precio consultoría SEO',
    'Cuánto cuesta una tienda Shopify',
    'Servicios Adrián Loaiza',
    'Alsnippets precios'
  ],

  // Open Graph para WhatsApp, LinkedIn, etc.
  openGraph: {
    title: 'Precios y Forma de Trabajo | Adrián Loaiza',
    description: 'No vendo paquetes genéricos. Hago auditorías y cotizaciones basadas en el valor real que aporto a tu negocio. Conoce cómo trabajo.',
    url: 'https://alsnippets.com/precios',
    siteName: 'Alsnippets',
    locale: 'es_ES',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Precios',
    description: 'Transparencia total. Descubre cómo estructuro mis cotizaciones para proyectos de desarrollo y SEO.',
    creator: '@alsnippets',
  },

  // Aseguramos que Google SÍ indexe esta página (al contrario que la de gracias)
  robots: {
    index: true,
    follow: true,
  },
  
  alternates: {
    canonical: 'https://alsnippets.com/precios',
  },
}

/* =====================================================
   SCHEMA JSON-LD (DATOS ESTRUCTURADOS DE SERVICIOS)
   Ayuda a Google a entender que aquí ofreces servicios
===================================================== */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Precios y Forma de Trabajo - Alsnippets',
  description: 'Información sobre tarifas, metodología de trabajo y cotizaciones personalizadas para desarrollo web y consultoría SEO.',
  publisher: {
    '@type': 'ProfessionalService',
    name: 'Alsnippets - Adrián Loaiza',
    image: 'https://alsnippets.com/images/og/og-global-alsnippets.webp',
  }
}

export default function PreciosLayout({
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