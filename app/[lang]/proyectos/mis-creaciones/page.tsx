import React, { Suspense } from 'react'
import PageHero from '@/components/hero/PageHero'
import HorizontalCard from '@/components/ui/HorizontalCard'
import GlassCTA from '@/components/ui/GlassCTA'
import { Rocket } from 'lucide-react'
import { getDictionary } from '@/i18n/get-dictionary'
import { Metadata } from 'next'
// ✅ IMPORTANTE: Importar el componente que acabas de crear
import LabTypewriter from './LabTypewriter'

export async function generateMetadata ({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en'
  const dictData = await getDictionary(lang)
  const t = (dictData as any).proyecto_creaciones.meta
  const baseUrl = 'https://www.alsnippets.com'
  const ogImage = `${baseUrl}/images/og/openGraph-creaciones.png`

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    alternates: {
      canonical: `${baseUrl}/${lang}/proyectos/mis-creaciones`,
      languages: {
        es: `${baseUrl}/es/proyectos/mis-creaciones`,
        en: `${baseUrl}/en/proyectos/mis-creaciones`
      }
    },
    openGraph: {
      title: t.og_title,
      description: t.og_description,
      url: `${baseUrl}/${lang}/proyectos/mis-creaciones`,
      siteName: 'Alsnippets',
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: t.og_alt }]
    },
    twitter: {
      card: 'summary_large_image',
      images: [ogImage]
    }
  }
}

export default async function MisCreacionesPage ({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dictData = await getDictionary(lang as 'es' | 'en')
  const dict = (dictData as any).proyecto_creaciones

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            // ✅ Accedemos a la estructura real de tu JSON:
            name: dict.hero.title,
            description: dict.hero.subtitle,
            url: `https://alsnippets.com/${lang}/proyectos/mis-creaciones`,
            author: {
              '@type': 'Person',
              name: 'Adrián Loaiza'
            }
          })
        }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes rise {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          20% { opacity: 1; }
          80% { transform: translateY(-25px) scale(1.2); opacity: 0.8; }
          100% { transform: translateY(-35px) scale(0.5); opacity: 0; }
        }
        .bubble-1 { animation: rise 2s infinite ease-in; }
        .bubble-2 { animation: rise 2.5s infinite ease-in 0.5s; }
        .bubble-3 { animation: rise 3s infinite ease-in 1s; }
        .bubble-4 { animation: rise 2.2s infinite ease-in 1.5s; }
      `
        }}
      />

      <PageHero
        title={dict.hero.title}
        subtitle={dict.hero.subtitle}
        image='/images/hero/hero-mis-creaciones.webp'
      />

      <main className='w-full max-w-[1200px] mx-auto px-5 pt-20'>
        <section>
          <div className='max-w-3xl mx-auto text-center'>
            <p className='opacity-90 text-[var(--text-2)]'>{dict.intro}</p>
          </div>
        </section>

        <section>
          <div className='text-center mb-12 space-y-4 pt-12'>
            <Rocket className='w-12 h-12 mx-auto text-[var(--text-brand)] opacity-80' />
            <h2 className='text-[var(--text-1)]'>{dict.section1.title}</h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
            {/* CORRECCIÓN: Eliminado /${lang} manual para evitar rutas duplicadas */}
            <HorizontalCard
              title={dict.section1.cards.suite.title}
              description={dict.section1.cards.suite.desc}
              image='/images/mis-creaciones/suite-text.webp'
              href={`/proyectos/suite-text`}
              target='_blank'
              lang={lang}
            />
            <HorizontalCard
              title={dict.section1.cards.barber.title}
              description={dict.section1.cards.barber.desc}
              image='/images/mis-creaciones/barber-short.webp'
              href={`/proyectos/barber-short`}
              target='_blank'
              lang={lang}
            />
            <HorizontalCard
              title={dict.section1.cards.alsnippets.title}
              description={dict.section1.cards.alsnippets.desc}
              image='/images/mis-creaciones/alsnippets.webp'
              href={`/`}
              target='_blank'
              lang={lang}
            />
          </div>
        </section>

        <div
          className='relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] py-24 my-0 border-y border-[var(--border-1)] overflow-hidden mt-16'
          style={{ background: 'var(--gradient-hero)' }}
        >
          <section className='max-w-[1200px] mx-auto px-5 relative z-10'>
            <div className='max-w-4xl mx-auto bg-[var(--bg-1)]/60 backdrop-blur-xl border border-[var(--border-brand)]/40 shadow-[var(--shadow-2)] rounded-3xl p-8 md:p-16 text-center relative overflow-hidden group'>
              <div className='absolute inset-0 bg-[linear-gradient(to_right,var(--border-brand)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-brand)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-5 pointer-events-none'></div>

              <div className='relative z-10 space-y-8 flex flex-col items-center'>
                <div className='relative flex justify-center items-center w-24 h-24 mb-4'>
                  <div className='absolute inset-0 border border-[var(--border-brand)]/30 rounded-full animate-[spin_10s_linear_infinite] [transform:rotateX(60deg)]'></div>
                  <div className='absolute inset-0 border border-[var(--border-brand)]/30 rounded-full animate-[spin_15s_linear_infinite_reverse] [transform:rotateY(60deg)]'></div>

                  <svg
                    viewBox='0 0 100 100'
                    className='w-16 h-16 text-[var(--text-brand)] drop-shadow-[var(--shadow-brand-glow)]'
                  >
                    <path
                      d='M40,20 L60,20 L60,25 L55,25 L55,45 L80,85 L20,85 L45,45 L45,25 L40,25 Z'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='4'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M28,80 L72,80 L52,48 L48,48 Z'
                      fill='currentColor'
                      className='opacity-30'
                    />
                    <circle
                      cx='50'
                      cy='70'
                      r='3'
                      fill='currentColor'
                      className='bubble-1'
                    />
                    <circle
                      cx='42'
                      cy='75'
                      r='2.5'
                      fill='currentColor'
                      className='bubble-2'
                    />
                    <circle
                      cx='58'
                      cy='65'
                      r='4'
                      fill='currentColor'
                      className='bubble-3'
                    />
                    <circle
                      cx='48'
                      cy='60'
                      r='2'
                      fill='currentColor'
                      className='bubble-4'
                    />
                  </svg>
                </div>

                <h2 className='!my-0 text-3xl md:text-5xl text-[var(--text-1)]'>
                  {dict.lab.title}
                </h2>

                <div className='inline-flex items-center gap-3 px-5 mt-12 py-3 rounded-full bg-[var(--bg-brand)]/10 border border-[var(--border-brand)]/30 text-[var(--text-brand)] text-sm md:text-base font-bold tracking-wide uppercase shadow-[var(--shadow-brand-glow)]'>
                  <span className='relative flex h-2.5 w-2.5 shrink-0'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--bg-brand)] opacity-75'></span>
                    <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--bg-brand)]'></span>
                  </span>

                  <Suspense fallback={null}>
                    {/* ✅ El componente ahora solo renderiza el texto animado */}
                    <LabTypewriter sequence={dict.lab.typewriter} />
                  </Suspense>
                </div>

                <p className='max-w-2xl mx-auto opacity-80 mt-4 text-[var(--text-2)]'>
                  {dict.lab.description}
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className='relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] my-0'>
          <GlassCTA
            title={dict.cta.title}
            description={dict.cta.description}
            buttonText={dict.cta.button}
            buttonHref={`/contacto`}
            lang={lang}
          />
        </div>
      </main>
    </>
  )
}
