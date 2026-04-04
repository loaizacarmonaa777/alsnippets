import React, { Suspense } from 'react' // ✅ IMPORT OBLIGATORIO
import PageHero from '@/components/hero/PageHero'
import VerticalCard from '@/components/ui/VerticalCard'
import HorizontalCard from '@/components/ui/HorizontalCard'
import FakeWordPressLogin from '@/components/forms/FakeWordPressLogin'
import GlassCTA from '@/components/ui/GlassCTA'
import { getDictionary } from '@/i18n/get-dictionary'
import { Metadata } from 'next' // ✅ IMPORT OBLIGATORIO

/* =====================================================
    METADATA DINÁMICA (SEO & SOCIAL) - OPTIMIZADA
   ===================================================== */
export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en'
  const dict = await getDictionary(lang)

  // Sincronización estricta con el JSON
  const t = (dict as any).servicios_optimizacion.meta
  const baseUrl = 'https://www.alsnippets.com'
  const ogImage = `${baseUrl}/images/og/openGraph-optimizacion-rendimiento.png`

  return {
    // ✅ CORREGIDO: Título extraído directamente del JSON (Cambia a inglés automáticamente)
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    alternates: {
      canonical: `${baseUrl}/${lang}/servicios/optimizacion-rendimiento`,
      languages: {
        'es': `${baseUrl}/es/servicios/optimizacion-rendimiento`,
        'en': `${baseUrl}/en/servicios/optimizacion-rendimiento`
      }
    },
    openGraph: {
      title: t.og_title,
      description: t.og_description,
      url: `${baseUrl}/${lang}/servicios/optimizacion-rendimiento`,
      siteName: 'Alsnippets',
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: t.og_alt
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t.twitter_title,
      description: t.twitter_description,
      images: [ogImage]
    }
  }
}

/* =====================================================
   Página — Optimización y Rendimiento WordPress
   Ahora es Server Component
===================================================== */

export default async function OptimizacionPage ({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  // ✅ CORREGIDO: await params directamente
  const { lang } = await params

  // ✅ Cargamos el diccionario directamente
  const dict = await getDictionary(lang as 'es' | 'en')
  const t = (dict as any).servicios_optimizacion.page
  const normalizedLang = lang.replace(/^\//, '')

  return (
    <>
      {/* HERO */}
      <PageHero
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image='/images/hero/hero-optimizacion-rendimiento.webp'
      />

      <main className='w-full'>
        {/* BLOQUE DE CARDS 1 — Problemas frecuentes */}
        <section className='w-full max-w-[1200px] mx-auto px-5 py-16 md:py-24 space-y-12'>
          <h2>{t.problems.title}</h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {t.problems.items.map((item: any, index: number) => (
              <VerticalCard
                key={index}
                title={item.title}
                description={item.description}
                image={item.image}
                // Si VerticalCard requiere lang, pásalo aquí
              />
            ))}
          </div>
        </section>

        {/* OPTIMIZACIÓN — Qué hago exactamente */}
        <section className='w-full max-w-[1200px] mx-auto px-5 py-16 space-y-12 border-t border-[var(--border-1)]'>
          <div className='text-center space-y-4 max-w-3xl mx-auto'>
            <h2>{t.tech.title}</h2>
            <p className='text-lg text-[var(--text-2)] opacity-90'>
              {t.tech.description}
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {t.tech.items.map((item: any, index: number) => (
              <HorizontalCard
                key={index}
                title={item.title}
                description={item.description}
                image={item.image}
                href={`/blog/${item.slug}`}
                target='_blank'
                lang={lang}
              />
            ))}
          </div>
        </section>

        {/* INGENIERÍA DE RENDIMIENTO */}
        <section className='w-full max-w-[1200px] mx-auto px-5 py-16 space-y-12 border-t border-[var(--border-1)]'>
          <div className='text-center space-y-4 max-w-3xl mx-auto'>
            <h2>{t.engineering.title}</h2>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {t.engineering.items.map((item: any, index: number) => (
              <HorizontalCard
                key={index}
                title={item.title}
                description={item.description}
                image={item.image}
                href={`/blog/${item.slug}`}
                target='_blank'
                lang={lang}
              />
            ))}
          </div>
        </section>

        {/* ACCESO AL SITIO WEB */}
        <section
          className='w-full py-16 sm:py-24 my-0 border-y border-[var(--border-1)]'
          style={{ background: 'var(--gradient-hero)' }}
        >
          <div className='max-w-[1200px] mx-auto px-5 grid gap-12 md:grid-cols-2 items-center'>
            <div className='space-y-6'>
              <h2 className='lg:text-left'>{t.access.title}</h2>
              <div className='text-center lg:text-left space-y-4 text-lg text-[var(--text-2)]'>
                <p>{t.access.p1}</p>
                <p className='font-medium italic text-[var(--text-brand)]'>
                  {t.access.confidential}
                </p>
              </div>
            </div>
            <div className='w-full max-w-md mx-auto rounded-2xl'>
              <div className='bg-[var(--bg-1)] border border-[var(--border-1)] rounded-2xl p-6 md:p-8 shadow-[var(--shadow-2)]'>
                {/* ✅ PASAMOS lang a FakeWordPressLogin */}
                <Suspense fallback={null}>
                  <FakeWordPressLogin lang={lang} />
                </Suspense>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <div className='relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] my-0'>
          <GlassCTA
            title={t.cta.title}
            description={t.cta.description}
            buttonText={t.cta.button}
            buttonHref={`/${lang}/contacto`}
            disclaimer={t.cta.disclaimer}
            // ✅ PASAMOS lang a GlassCTA
            lang={lang}
          />
        </div>
      </main>
    </>
  )
}
