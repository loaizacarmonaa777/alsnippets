// app/layout.tsx (Infraestructura Global)
import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css' // ✅ Ruta correcta: mismo nivel
import CookieConsent from '@/components/ui/CookieConsent'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { AuthProvider } from '@/components/providers/AuthProvider'
import Tracking from '@/components/Tracking'

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

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'es';

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <AuthProvider>
            {/* Quitamos el nonce porque el middleware no lo da */}
            <Tracking lang={lang} />
            {children}
            <CookieConsent />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}