// app/layout.tsx (Infraestructura Global)
import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import CookieConsent from '@/components/ui/CookieConsent'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { AuthProvider } from '@/components/providers/AuthProvider'
import Tracking from '@/components/Tracking'
import { headers } from 'next/headers'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap'
})

const outfit = Outfit({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap'
})

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ],
  colorScheme: 'light dark'
}

export default async function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const nonce = (await headers()).get('x-nonce') || ''
  return (
    // ✅ Añadimos lang="es" por defecto (aunque el otro layout lo sobreescriba) y forzamos el esquema
    <html
      lang='es'
      suppressHydrationWarning
      style={{ colorScheme: 'light dark' }}
    >
      <head>
        {/* ✅ Meta tags para evitar que iOS "invente" colores o ignore iconos */}
        <meta name='supported-color-schemes' content='light dark' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        {/* ✅ Cambiamos defaultTheme a 'light' o 'dark' si quieres evitar el amarillo del sistema, 
            o lo dejamos en 'system' pero con los metas anteriores ya debería respetarte */}
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <AuthProvider>
            <Tracking lang='es' nonce={nonce} />
            {children}
            <CookieConsent />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
