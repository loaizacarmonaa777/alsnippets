import { Metadata } from 'next'

/* =====================================================
   METADATA SEO — BARBER SHORT
===================================================== */
export const metadata: Metadata = {
  title: 'Barber Short',
  description: 'Plataforma web integral para barberías, enfocada en la gestión de reservas, control de servicios y procesamiento de pagos en línea.',
  
  keywords: [
    'Software para barberías',
    'Plataforma reservas barbería',
    'App gestión de barberías',
    'Pagos en línea barberías',
    'Desarrollo web barberos',
    'Barber Short App',
    'Alsnippets proyectos'
  ],

  openGraph: {
    title: 'Barber Short | Software de Reservas para Barberías',
    description: 'Digitaliza tu barbería con Barber Short: reservas automatizadas, gestión de servicios y pagos online.',
    url: 'https://alsnippets.com/barber-short',
    siteName: 'Alsnippets',
    locale: 'es_ES',
    type: 'website',
    images: [{ url: '/images/og/og-global-alsnippets.webp', width: 1200, height: 630, alt: 'Barber Short - Plataforma Web' }],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Barber Short | Plataforma para Barberías',
    description: 'Plataforma web para barberías: reservas, gestión de servicios y pagos en línea.',
    creator: '@alsnippets',
  },

  robots: { index: true, follow: true },
  alternates: { canonical: 'https://alsnippets.com/barber-short' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Barber Short',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'Plataforma web enfocada en reservas, gestión de servicios y pagos en línea para el sector de barberías.',
  url: 'https://alsnippets.com/barber-short',
  developer: {
    '@type': 'Person',
    name: 'Adrián Loaiza',
    url: 'https://alsnippets.com/sobre-mi'
  }
}

export default function BarberShortLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}