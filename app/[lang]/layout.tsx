import { Metadata } from 'next'
import MainNav from '@/components/navigation/MainNav'
import TopBar from '@/components/navigation/TopBar'
import Footer from '@/components/layout/Footer'
import Tracking from '@/components/Tracking' // Asegúrate de que la ruta sea correcta
import { getDictionary } from '@/i18n/get-dictionary'
import { Suspense } from 'react'

/* =====================================================
    METADATA DINÁMICA (SEO) - LIMPIA
   ===================================================== */
export async function generateMetadata ({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang as 'es' | 'en')

  return {
    title: {
      template: `%s | ${dict.common.meta.brand}`,
      default: dict.common.meta.title
    },
    description: dict.common.meta.description
  }
}

/* =====================================================
    LAYOUT DE INTERFAZ - LIMPIO Y CORREGIDO
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
      {/* ✅ SOLUCIÓN VERCEL: Tracking envuelto en Suspense */}
      <Suspense fallback={null}>
        <Tracking lang={lang} />
      </Suspense>

      {/* Ancla para el scroll superior sin JS */}
      <div id='top' className='absolute top-0' />

      <header className='fixed top-0 w-full z-[100]'>
        <TopBar lang={lang} />
        <MainNav lang={lang} />
      </header>

      {/* Hero sube al tope */}
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

      {/* ✅ 2. Pasamos el dict al Footer para eliminar el error de TS */}
      <Footer lang={lang} dict={dict} />
    </>
  )
}