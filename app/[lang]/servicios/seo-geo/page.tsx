// app/[lang]/servicios/seo-geo/page.tsx
// ELIMINAMOS 'use client' - Ahora es Server Component
import React from 'react'
import PageHero from '@/components/hero/PageHero'
import Image from 'next/image'
import VerticalCard from '@/components/ui/VerticalCard'
import HorizontalCard from '@/components/ui/HorizontalCard'
import GlassCTA from '@/components/ui/GlassCTA'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
   Página — SEO - GEO Optimización para buscadores y LLMs
===================================================== */

export default async function SeoPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  const dict = await getDictionary(lang as 'es' | 'en');
  const t = (dict as any).servicios_seo?.page || (dict as any)['servicios-seo']?.page;
  const normalizedLang = lang.replace(/^\//, '');

  return (
    <>
      {/* HERO */}
      <PageHero
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image='/images/hero/hero-seo-geo.webp'
      />

      <main className='w-full'>
        {/* SECCIÓN 1: CÓMO FUNCIONA REALMENTE */}
        <section className='w-full max-w-[1200px] mx-auto px-5 py-16 md:py-24 space-y-12'>
          <div className='text-center space-y-4 max-w-3xl mx-auto'>
            <h2 className="text-[var(--text-1)]" dangerouslySetInnerHTML={{ __html: t.how_it_works.title }} />
            {t.how_it_works.paragraphs.map((p: string, i: number) => (
              <p key={i} className='text-lg md:text-xl text-[var(--text-2)] opacity-90'>
                {p}
              </p>
            ))}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {t.how_it_works.items.map((item: any, idx: number) => (
              <VerticalCard
                key={idx}
                title={item.title}
                description={item.description}
                image={item.image}
                // VerticalCard no requiere lang (opcional)
              />
            ))}
          </div>
        </section>

        {/* SECCIÓN 2: GEO - LLMs */}
        <section className='w-full max-w-[1200px] mx-auto px-5 py-16 space-y-12 border-t border-[var(--border-1)]'>
          <div className='text-center space-y-4 max-w-3xl mx-auto'>
            <h2 className="text-[var(--text-1)]">{t.what_is_geo.title}</h2>
            <p className='text-lg md:text-xl text-[var(--text-2)] opacity-90' dangerouslySetInnerHTML={{ __html: t.what_is_geo.p1 }} />
            <p className='text-lg md:text-xl text-[var(--text-2)] opacity-90' dangerouslySetInnerHTML={{ __html: t.what_is_geo.p2 }} />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {t.what_is_geo.items.map((item: any, idx: number) => (
              <VerticalCard
                key={idx}
                title={item.title}
                description={item.description}
                image={item.image}
                // VerticalCard no requiere lang
              />
            ))}
          </div>
        </section>

        {/* SECCIÓN 3: CÓMO TRABAJO */}
        <section className='w-full max-w-[1200px] mx-auto px-5 py-16 space-y-12 border-t border-[var(--border-1)]'>
          <div className='text-center space-y-4 max-w-3xl mx-auto'>
            <h2 className="text-[var(--text-1)]">{t.process.title}</h2>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {t.process.items.map((item: any, idx: number) => (
              <HorizontalCard
                key={idx}
                title={item.title}
                description={item.description}
                image={item.image}
                href={item.slug}
                target="_blank"
                // ✅ PASAMOS lang a HorizontalCard
                lang={lang}
              />
            ))}
          </div>
        </section>

        {/* SECCIÓN 4: EXPECTATIVAS */}
        <section
          className='w-full py-16 md:py-24 my-0'
          style={{ background: 'var(--gradient-hero)' }}
        >
          <div className='max-w-[1200px] mx-auto px-5 flex flex-col lg:flex-row items-center gap-12'>
            <div className='w-full lg:w-1/2 relative h-[350px] md:h-[500px] rounded-2xl overflow-hidden shadow-[var(--shadow-2)] border border-[var(--border-1)]'>
              <Image
                src='/images/seo/que-debes-tener-en-cuenta.webp'
                alt='Consultoría SEO - Adrián Loaiza'
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 100vw, 50vw'
              />
            </div>

            <div className='w-full lg:w-1/2 space-y-6'>
              <h2 className='text-left text-[var(--text-1)]'>
                {t.expectations.title}
              </h2>
              <div className='space-y-4 text-lg md:text-xl text-[var(--text-2)] leading-relaxed'>
                {t.expectations.paragraphs.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 5: CTA FINAL */}
        <div className='relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] my-0'>
          <GlassCTA
            title={t.cta.title}
            description={t.cta.description}
            buttonText={t.cta.button}
            buttonHref={`/${lang}/auditoria`}
            disclaimer={t.cta.disclaimer}
            // ✅ PASAMOS lang a GlassCTA
            lang={lang}
          />
        </div>
      </main>
    </>
  )
}