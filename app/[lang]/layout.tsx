import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import MainNav from '@/components/navigation/MainNav'
import TopBar from '@/components/navigation/TopBar'
import Footer from '@/components/layout/Footer'
import { getDictionary } from '@/i18n/get-dictionary'
import { Suspense } from 'react'

// DEFINICIÓN DE CONSTANTES DINÁMICAS (OPTIMIZACIÓN DE RENDIMIENTO)
const Tracking = dynamic(() => import('@/components/Tracking'), { 
  ssr: false 
})
const CookieConsent = dynamic(() => import('@/components/ui/CookieConsent'), { 
  ssr: false 
})

/* =====================================================
    METADATA DINÁMICA (SEO & SOCIAL) - OPTIMIZADA
   ===================================================== */
export async function generateMetadata ({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang as 'es' | 'en')
  const baseUrl = 'https://www.alsnippets.com'
  
  // 📍 RUTA CORREGIDA: public/images/og/openGraph-home.png
  const ogImage = `${baseUrl}/images/og/openGraph-home.png` 

  return {
    title: {
      template: `%s | ${dict.common.meta.brand}`,
      default: dict.common.meta.title
    },
    description: dict.common.meta.description,
    metadataBase: new URL(baseUrl),
    
    // 1. Tarea: Limpieza de URLs (Search Console)
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        'es-ES': `${baseUrl}/es`,
        'en-US': `${baseUrl}/en`,
        'x-default': `${baseUrl}/es`,
      },
    },

    // 2. Tarea: Tarjeta de Compartido (WhatsApp Fix)
    openGraph: {
      title: dict.common.meta.title,
      description: dict.common.meta.description,
      url: `${baseUrl}/${lang}`,
      siteName: dict.common.meta.brand,
      locale: lang === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: dict.common.meta.brand,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.common.meta.title,
      description: dict.common.meta.description,
      images: [ogImage],
    },
  }
}

/* =====================================================
    LAYOUT DE INTERFAZ - LIMPIO Y OPTIMIZADO
   ===================================================== */
export default async function LangLayout ({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as 'es' | 'en')

  return (
    <>
      {/* 3. Tarea: Turbo-Boost Rendimiento & Vercel Fix */}
      <Suspense fallback={null}>
        <Tracking lang={lang} />
      </Suspense>

      {/* Ancla para el scroll superior sin JS */}
      <div id='top' className='absolute top-0' />

      <header className='fixed top-0 w-full z-[100]'>
        <TopBar lang={lang} />
        <MainNav lang={lang} />
      </header>

      {/* El contenido principal */}
      <main className='relative w-full'>{children}</main>

      {/* Botón Scroll to top universal */}
      <a href='#' className='scroll-top-btn' aria-label='Scroll to top'>
        <svg
          viewBox='0 0 24 24'
          width='24'
          height='24'
          stroke='currentColor'
          strokeWidth='3'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M18 15l-6-6-6 6' />
        </svg>
      </a>

      {/* ✅ Footer con diccionario inyectado */}
      <Footer lang={lang} dict={dict} />

      {/* ✅ CookieConsent movido al final para no bloquear el renderizado inicial */}
      <CookieConsent />
    </>
  )
}