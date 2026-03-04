import { Metadata } from 'next'

/* =====================================================
   METADATA SEO — MIS CREACIONES
===================================================== */
export const metadata: Metadata = {
  title: 'Mis Creaciones',
  description: 'Proyectos desarrollados desde cero, plugins de WordPress, themes personalizados y soluciones web propias por Adrián Loaiza.',
  
  keywords: [
    'Portafolio desarrollo web',
    'Plugins WordPress a medida',
    'Themes WordPress personalizados',
    'Desarrollo web React Next.js',
    'Proyectos Adrián Loaiza',
    'Alsnippets creaciones',
    'Soluciones web custom'
  ],

  openGraph: {
    title: 'Mis Creaciones | Plugins y Desarrollo Web | Alsnippets',
    description: 'Explora mis proyectos desarrollados desde cero: plugins, themes y plataformas web a medida.',
    url: 'https://alsnippets.com/mis-creaciones',
    siteName: 'Alsnippets',
    locale: 'es_ES',
    type: 'website',
    images: [{ url: '/images/og/og-global-alsnippets.webp', width: 1200, height: 630, alt: 'Portafolio de Creaciones - Alsnippets' }],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Mis Creaciones | Alsnippets',
    description: 'Proyectos desarrollados desde cero, plugins, themes y soluciones propias.',
    creator: '@alsnippets',
  },

  robots: { index: true, follow: true },
  alternates: { canonical: 'https://alsnippets.com/mis-creaciones' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Mis Creaciones - Alsnippets',
  description: 'Galería de proyectos propios, plugins de WordPress y aplicaciones web desarrolladas por Adrián Loaiza.',
  url: 'https://alsnippets.com/mis-creaciones',
  author: {
    '@type': 'Person',
    name: 'Adrián Loaiza'
  }
}

export default function MisCreacionesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}