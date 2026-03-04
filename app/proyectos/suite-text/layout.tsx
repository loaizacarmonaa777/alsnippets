import { Metadata } from 'next'

/* =====================================================
   METADATA SEO — SUITE TEXT
===================================================== */
export const metadata: Metadata = {
  title: 'Suite Text',
  description: 'Un producto en desarrollo enfocado en optimizar, analizar y trabajar textos con una visión técnica, estratégica y orientada a resultados SEO.',
  
  keywords: [
    'Suite Text',
    'Herramienta SEO para textos',
    'Análisis de contenido SEO',
    'Optimización de artículos',
    'Software SEO en desarrollo',
    'Alsnippets herramientas',
    'Auditoría de contenido web'
  ],

  openGraph: {
    title: 'Suite Text | Herramienta SEO y Análisis de Textos',
    description: 'Optimiza y analiza tus textos con una visión técnica y orientada a resultados SEO. Conoce el nuevo producto de Alsnippets.',
    url: 'https://alsnippets.com/suite-text',
    siteName: 'Alsnippets',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/images/og/og-global-alsnippets.webp', 
        width: 1200,
        height: 630,
        alt: 'Suite Text - Herramienta SEO por Alsnippets',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Suite Text | Análisis y Optimización SEO',
    description: 'Un producto en desarrollo enfocado en optimizar textos con visión estratégica.',
    creator: '@alsnippets',
  },

  robots: {
    index: true,
    follow: true,
  },
  
  alternates: {
    canonical: 'https://alsnippets.com/suite-text',
  },
}

/* =====================================================
   SCHEMA JSON-LD (SOFTWARE APPLICATION)
===================================================== */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Suite Text',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'Herramienta web en desarrollo para la optimización, análisis y estructuración técnica de textos orientados a SEO.',
  url: 'https://alsnippets.com/suite-text',
  developer: {
    '@type': 'Person',
    name: 'Adrián Loaiza',
    url: 'https://alsnippets.com/sobre-mi'
  }
}

export default function SuiteTextLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}