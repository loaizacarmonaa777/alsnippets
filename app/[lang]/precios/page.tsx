import React, { Suspense } from 'react' // ✅ IMPORT OBLIGATORIO
import PageHero from '@/components/hero/PageHero'
import VerticalCard from '@/components/ui/VerticalCard'
import HorizontalCard from '@/components/ui/HorizontalCard'
import GlassCTA from '@/components/ui/GlassCTA'
import CotizadorApp from '@/components/cotizador/CotizadorApp'
import { getDictionary } from '@/i18n/get-dictionary'
import { Metadata } from 'next' // ✅ IMPORT OBLIGATORIO

/* =====================================================
    METADATA DINÁMICA (SEO & SOCIAL) - OPTIMIZADA
   ===================================================== */
export async function generateMetadata ({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en'
  const dict = await getDictionary(lang)
  const t = dict.precios.meta
  const baseUrl = 'https://www.alsnippets.com'
  const ogImage = `${baseUrl}/images/og/openGraph-precios.png` // ✅ URL ABSOLUTA

  return {
    title: 'Precios',
    description: t.description,
    keywords: t.keywords,
    alternates: {
      canonical: `${baseUrl}/${lang}/precios`,
      languages: {
        'es-CO': `${baseUrl}/es/precios`,
        'en-US': `${baseUrl}/en/precios`
      }
    },
    openGraph: {
      title: t.og_title,
      description: t.og_description,
      url: `${baseUrl}/${lang}/precios`,
      siteName: 'Alsnippets',
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: t.og_title || 'Precios Alsnippets'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t.twitter_title,
      description: t.twitter_description,
      creator: '@alsnippets',
      images: [ogImage]
    }
  }
}

/* =====================================================
    Página — Precios (Internacionalizada)
===================================================== */

export default async function PreciosPage ({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en'
  const dict = await getDictionary(lang)
  const t = (dict.precios?.page || {}) as any
  const c = (dict.cotizador?.page?.calculator || {}) as any

  return (
    <>
      {/* HERO — Datos desde precios.json */}
      <PageHero
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image='/images/hero/hero-precios.webp'
      />

      {/* SECCIÓN CALCULADORA — Usamos 'c' para los textos y pasamos 'dict' al componente */}
      <div
        className='relative w-full py-20 border-b border-[var(--border-1)]'
        style={{ background: 'var(--gradient-hero)' }}
      >
        <section className='max-w-4xl mx-auto px-5 !mb-0'>
          <div className='max-w-2xl mx-auto mb-10'>
            <h2>{c.title}</h2>
            <p className='text-center opacity-90 text-[var(--text-2)]'>
              {c.description}
            </p>
          </div>

          <Suspense fallback={null}>
            <CotizadorApp lang={lang} dict={dict} />
          </Suspense>
        </section>
      </div>

      {/* CONTENIDO DE FILOSOFÍA Y METODOLOGÍA */}
      <main className='max-w-[1200px] mx-auto px-5 pt-20'>
        {/* FILOSOFÍA */}
        <section>
          <div className='max-w-3xl mx-auto mb-12'>
            <h2>{t.philosophy.title}</h2>
            <p className='text-center text-[var(--text-2)]'>
              {t.philosophy.description}
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {t.philosophy.cards.map((card: any, index: number) => (
              <VerticalCard
                key={index}
                title={card.title}
                description={card.description}
                image={card.image}
              />
            ))}
          </div>
        </section>

        {/* TRANSPARENCIA */}
        <section className='border-t border-[var(--border-1)] mt-10 pt-12 my-5'>
          <h2>{t.transparency.title}</h2>
          <div className='max-w-2xl mx-auto space-y-6 text-center text-[var(--text-2)] text-lg'>
            <p>{t.transparency.p1}</p>
            <p>{t.transparency.p2}</p>
          </div>
        </section>

        {/* FORMAS DE TRABAJO */}
        <section className='border-t border-[var(--border-1)] mt-20 pt-12'>
          <div className='mb-12'>
            <h2>{t.cta.title}</h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
            <HorizontalCard
              lang={lang}
              title={t.methods?.custom?.title}
              description={t.methods?.custom?.description}
              image='/images/precios/servicios-medida.webp'
            />
            <HorizontalCard
              lang={lang}
              title={t.methods?.audit?.title}
              description={t.methods?.audit?.description}
              image='/images/precios/auditoria-wordpress.webp'
            />
          </div>
        </section>

        {/* SECCIÓN CTA FINAL */}
        <div className='relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] mt-20'>
          <GlassCTA
            lang={lang}
            title={t.cta.title}
            description={t.cta.description}
            buttonText={t.cta.button}
            buttonHref={`/${lang}/auditoria`}
            disclaimer={t.cta.disclaimer}
            className='!my-0'
          />
        </div>
      </main>
    </>
  )
}
