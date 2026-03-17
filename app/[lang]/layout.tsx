// app/[lang]/layout.tsx (o como se llame tu archivo de layout de idioma)
import { Metadata } from 'next'
import MainNav from '@/components/navigation/MainNav'
import TopBar from '@/components/navigation/TopBar'
import Footer from '@/components/layout/Footer'
import { getDictionary } from '@/i18n/get-dictionary'

export async function generateMetadata ({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en'
  const dict = await getDictionary(lang)

  return {
    title: {
      template: `%s | ${dict.common.meta.brand}`,
      default: dict.common.meta.title
    },
    description: dict.common.meta.description
  }
}

export default async function LangLayout ({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  // 1. OBTENEMOS EL LANG CRUDO Y NORMALIZAMOS
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  
  // 👇 2. CARGAMOS EL DICCIONARIO AQUÍ (Esto es lo que faltaba)
  const dict = await getDictionary(lang);

  return (
    <>
      <header className='fixed top-0 w-full z-[100]'>
        <TopBar lang={lang} />
        <MainNav lang={lang} />
      </header>
      <main className='relative w-full'>{children}</main>
      
      {/* 👇 3. PASAMOS EL DICCIONARIO AL FOOTER */}
      <Footer lang={lang} dict={dict} />
    </>
  )
}