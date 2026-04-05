// app/layout.tsx (Infraestructura Global)
import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css' // ✅ Ruta correcta: mismo nivel
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { AuthProvider } from '@/components/providers/AuthProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
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
      <head>
        {/* 🚀 OPTIMIZACIÓN: DNS Prefetch (Acelera la resolución de dominios externos) */}
        {/* Esto reduce la latencia en el árbol de dependencia de red para scripts de terceros */}
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}