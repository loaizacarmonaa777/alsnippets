import type { Metadata } from 'next'
// 1. Importamos Outfit y mantenemos Inter
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import MainNav from '@/components/navigation/MainNav'
import Footer from '@/components/layout/Footer'
import CookieConsent from '@/components/ui/CookieConsent'

// Configuración de INTER (Texto cuerpo)
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap'
})

// Configuración de OUTFIT (Títulos)
const outfit = Outfit({
  variable: '--font-heading', // Le ponemos este nombre para usarlo fácil en CSS
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    template: '%s | Alsnippets',
    default: 'Alsnippets | Soporte y Mantenimiento WordPress'
  },
  description:
    'Soporte técnico WordPress, seguridad, rendimiento y mantenimiento. Soluciones claras y auditoría profesional.'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body
        className={`
          ${inter.variable} 
          ${outfit.variable} 
          antialiased
          bg-[var(--bg-body)] 
          text-[var(--text-secondary)]
        `}
      >
        {/* Navegación global */}
        <MainNav />

        {children}

        {/* Footer global */}
        <Footer />

        {/* Banner Cookie */}
        <CookieConsent />
      </body>
    </html>
  )
}
