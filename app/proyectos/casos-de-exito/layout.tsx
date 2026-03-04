import { Metadata } from 'next'

/* =====================================================
   METADATA SEO — CASOS DE ÉXITO
===================================================== */
export const metadata: Metadata = {
  title: 'Casos de Éxito',
  description: 'Sitios web y proyectos reales en los que he trabajado, optimizado el rendimiento (WPO) o acompañado técnicamente para escalar sus resultados.',
  
  keywords: [
    'Casos de éxito desarrollo web',
    'Ejemplos optimización WPO',
    'Proyectos SEO técnico',
    'Auditoría WordPress clientes',
    'Portafolio Adrián Loaiza',
    'Resultados rendimiento web'
  ],

  openGraph: {
    title: 'Casos de Éxito y Proyectos Reales | Alsnippets',
    description: 'Descubre cómo he ayudado a marcas y negocios a mejorar su rendimiento web, seguridad y arquitectura técnica.',
    url: 'https://alsnippets.com/casos-de-exito',
    siteName: 'Alsnippets',
    locale: 'es_ES',
    type: 'website',
    images: [{ url: '/images/og/og-global-alsnippets.webp', width: 1200, height: 630, alt: 'Casos de Éxito - Alsnippets' }],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Casos de Éxito | Alsnippets',
    description: 'Sitios web y proyectos reales optimizados y acompañados técnicamente.',
    creator: '@alsnippets',
  },

  robots: { index: true, follow: true },
  alternates: { canonical: 'https://alsnippets.com/casos-de-exito' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Casos de Éxito - Alsnippets',
  description: 'Repositorio de casos de estudio y proyectos reales donde se ha aplicado auditoría, optimización WPO y desarrollo a medida.',
  url: 'https://alsnippets.com/casos-de-exito',
  provider: {
    '@type': 'ProfessionalService',
    name: 'Alsnippets - Adrián Loaiza'
  }
}

export default function CasosDeExitoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}