import { Metadata } from 'next'

/* =====================================================
   METADATA SEO — BLOG (ÍNDICE DE ARTÍCULOS)
===================================================== */
export const metadata: Metadata = {
  title: 'Blog de Desarrollo Web, SEO y WordPress',
  description: 'Artículos avanzados sobre optimización WPO, seguridad en WordPress, SEO técnico y desarrollo moderno con React/Next.js. Escrito por Adrián Loaiza.',
  
  keywords: [
    'Blog WordPress',
    'Tutoriales SEO técnico',
    'Optimización WPO',
    'Seguridad Web',
    'Desarrollo React y Next.js',
    'Rendimiento web',
    'Adrián Loaiza Blog',
    'Tecnología y código'
  ],

  // Open Graph (Para redes sociales y mensajería)
  openGraph: {
    title: 'Blog de Desarrollo Web, SEO y WordPress | Alsnippets',
    description: 'Aprende a escalar tu web, mejorar la seguridad y dominar el SEO técnico con artículos basados en experiencia real.',
    url: 'https://alsnippets.com/blog',
    siteName: 'Alsnippets',
    locale: 'es_ES',
    type: 'website', // Es 'website' para el índice. En artículos individuales será 'article'.
    images: [
      {
        url: '/images/og/og-global-alsnippets.webp', 
        width: 1200,
        height: 630,
        alt: 'Blog de Alsnippets - Desarrollo y SEO',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Blog de Desarrollo Web y SEO | Alsnippets',
    description: 'Artículos sobre WordPress, SEO, seguridad, rendimiento y tecnología aplicada.',
    creator: '@alsnippets',
  },

  // Queremos que Google indexe este hub de contenidos urgentemente
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
    canonical: 'https://alsnippets.com/blog',
  },
}

/* =====================================================
   SCHEMA JSON-LD (ESTRUCTURA DE BLOG)
   Le dice a Google que esta página es un índice de artículos
===================================================== */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Blog de Alsnippets - Desarrollo Web y SEO',
  description: 'Artículos, tutoriales y guías sobre WordPress, optimización de rendimiento (WPO), SEO técnico y seguridad web.',
  url: 'https://alsnippets.com/blog',
  publisher: {
    '@type': 'Organization',
    name: 'Alsnippets',
    logo: {
      '@type': 'ImageObject',
      url: 'https://alsnippets.com/images/logo.png' // Reemplaza con la ruta de tu logo real
    }
  },
  author: {
    '@type': 'Person',
    name: 'Adrián Loaiza',
    url: 'https://alsnippets.com/sobre-mi'
  }
}

export default function BlogLayout({
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