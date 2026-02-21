import { Metadata } from 'next'

/* =====================================================
   CONFIGURACIÓN GLOBAL (No tocar a menos que cambie tu marca)
   ===================================================== */
const GLOBAL_KEYWORDS = [
  'Desarrollador Web Full Stack',
  'Experto WordPress & WooCommerce',
  'Programador PHP & JavaScript',
  'Optimización WPO Global',
  'Seguridad Web',
  'Desarrollo Shopify',
  'Consultor Técnico SEO',
  'React & Next.js Developer',
  'HTML5 & CSS3 Avanzado',
  'Adrián Loaiza Carmona',
  'Alsnippets',
]

/* =====================================================
   METADATA DE LA PÁGINA
   ===================================================== */
export const metadata: Metadata = {
  // [EDITAR AQUÍ]: Título específico de la página
  title: 'Sobre mí',
  
  // [EDITAR AQUÍ]: Descripción persuasiva que incluya las regiones objetivo
  description:
    'Soy Adrián Loaiza (Alsnippets), desarrollador web senior especializado en WordPress, WooCommerce, Shopify y tecnologías modernas (React/Next.js). Ofrezco soluciones de código, seguridad y rendimiento WPO para clientes en España, USA, Europa y Latinoamérica.',

  // Combina las keywords globales con las específicas de esta sección
  keywords: [
    ...GLOBAL_KEYWORDS,
    // [EDITAR AQUÍ]: Keywords específicas de esta página
    'Perfil profesional',
    'Trayectoria',
    'Freelance Remoto',
    'Auditoría Web España',
    'Desarrollo Web USA',
  ],

  authors: [{ name: 'Adrián Loaiza Carmona', url: 'https://alsnippets.com' }],
  creator: 'Alsnippets',
  publisher: 'Alsnippets',
  
  // Configuración de Robots para indexación mundial
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

  // Open Graph (Para compartir en LinkedIn, Facebook, WhatsApp)
  openGraph: {
    // [EDITAR AQUÍ]: Título y descripción para redes
    title: 'Sobre mí | Adrián Loaiza - Alsnippets',
    description: 'Desarrollo web de alto nivel (PHP, JS, React) y optimización de CMS para negocios globales.',
    url: 'https://alsnippets.com/sobre-mi', // [EDITAR AQUÍ]: URL exacta
    siteName: 'Alsnippets',
    locale: 'es_ES', // Español neutro/global
    alternateLocale: ['es_CO', 'es_MX', 'es_US', 'en_US'], // Indica que el contenido es relevante para estas regiones
    type: 'profile',
    images: [
      {
        url: '/images/og/og-global-alsnippets.webp', // Asegúrate de tener esta imagen
        width: 1200,
        height: 630,
        alt: 'Adrián Loaiza - Alsnippets Tech Stack',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre mí | Adrián Loaiza - Alsnippets',
    description: 'Experto en WordPress, Shopify y Código a medida (JS/PHP) para mercados internacionales.',
    creator: '@alsnippets',
    images: ['/images/og/og-global-alsnippets.webp'],
  },

  // GEO TAGS (Sede física en Colombia, pero servicio global)
  // Google necesita saber dónde estás físicamente para validarte, aunque vendas fuera.
  other: {
    'geo.region': 'CO-ANT',
    'geo.placename': 'Santa Bárbara',
    'geo.position': '5.874;-75.568',
    'ICBM': '5.874, -75.568',
  },
  
  alternates: {
    canonical: 'https://alsnippets.com/sobre-mi', // [EDITAR AQUÍ]
  },
}

/* =====================================================
   SCHEMA JSON-LD (DATOS ESTRUCTURADOS)
   Esto es lo que te posiciona como experto global.
   ===================================================== */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService', // Cambiamos a Servicio Profesional para alcance B2B
  name: 'Alsnippets - Adrián Loaiza',
  image: 'https://alsnippets.com/images/sobre-mi/adrian-loaiza.webp',
  url: 'https://alsnippets.com',
  telephone: '+573246454061',
  priceRange: '$$',
  
  // [CLAVE]: Aquí definimos que trabajas para todo el mundo
  areaServed: [
    { '@type': 'Country', name: 'Spain' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Continent', name: 'Europe' },
    { '@type': 'Continent', name: 'South America' },
    { '@type': 'Continent', name: 'North America' },
    { '@type': 'Country', name: 'Colombia' }
  ],
  
  // [CLAVE]: Lista de tecnologías que dominas (KnowsAbout)
  knowsAbout: [
    'WordPress Development',
    'WooCommerce',
    'Shopify',
    'Next.js',
    'React',
    'PHP',
    'JavaScript',
    'TypeScript',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'Web Performance Optimization (WPO)',
    'Web Security'
  ],

  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Santa Bárbara',
    addressRegion: 'Antioquia',
    addressCountry: 'CO'
  },
  
  sameAs: [
    'https://www.linkedin.com/in/adrian-loaiza/',
    'https://github.com/alsnippets',
    'https://twitter.com/alsnippets'
  ]
}

export default function GlobalLayout({
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