// app/[lang]/sobre-mi/page.tsx
import React from 'react' // ← Agrega este import si falta
import Image from 'next/image'
import PageHero from '@/components/hero/PageHero'
import VerticalCard from '@/components/ui/VerticalCard'
import HorizontalCard from '@/components/ui/HorizontalCard'
import GlassCTA from '@/components/ui/GlassCTA'
import { getDictionary } from '@/i18n/get-dictionary'

export default async function SobreMiPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  const dict = await getDictionary(lang as 'es' | 'en');
  const t = (dict as any).sobreMi.page;

  return (
    <>
      {/* HERO — Perfil */}
      <PageHero
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image='/images/sobre-mi/hero-sobre-mi.webp'
      />

      <main className='w-full'>
        {/* SECCIÓN 1: INTRODUCCIÓN Y VALORES */}
        <section className='w-full max-w-[1200px] mx-auto px-5 py-16 md:py-24 space-y-12'>
          <div className='text-center space-y-4 max-w-3xl mx-auto'>
            <h2 className="text-[var(--text-1)]" dangerouslySetInnerHTML={{ __html: t.intro.title }} />
            {t.intro.paragraphs.map((p: string, i: number) => (
              <p key={i} className='text-lg md:text-xl text-[var(--text-2)] opacity-90'>
                {p}
              </p>
            ))}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {t.intro.items.map((item: any, idx: number) => (
              <VerticalCard
                key={idx}
                title={item.title}
                description={item.description}
                image={item.image}
              />
            ))}
          </div>
        </section>

        {/* SECCIÓN 2: TRAYECTORIA TÉCNICA */}
        <section className='w-full max-w-[1200px] mx-auto px-5 py-16 space-y-12 border-t border-[var(--border-1)]'>
          <div className='text-center space-y-4 max-w-3xl mx-auto'>
            <h2 className="text-[var(--text-1)]">{t.experience.title}</h2>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {t.experience.items.map((item: any, idx: number) => (
              <HorizontalCard
                key={idx}
                title={item.title}
                description={item.description}
                image={item.image}
                href={item.slug ? `/${lang}/blog/${item.slug}` : undefined}
                target="_blank"
                lang={lang} // ✅ PASAMOS lang AQUÍ
              />
            ))}
          </div>
        </section>

        {/* SECCIÓN 3: BIOGRAFÍA */}
        <section
          className='w-full py-16 md:py-24 my-0'
          style={{ background: 'var(--gradient-hero)' }}
        >
          <div className='max-w-[1200px] mx-auto px-5 flex flex-col lg:flex-row items-center gap-12'>
            <div className='w-full lg:w-1/2 relative h-[350px] md:h-[500px] rounded-2xl overflow-hidden shadow-[var(--shadow-2)] border border-[var(--border-1)]'>
              <Image
                src='/images/sobre-mi/mi-trayectoria.webp'
                alt='Adrián Loaiza - Alsnippets'
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 100vw, 50vw'
              />
            </div>

            <div className='w-full lg:w-1/2 space-y-6'>
              <h2 className='text-left text-[var(--text-1)]'>
                {t.bio.title}
              </h2>
              <div className='space-y-4 text-lg md:text-xl text-[var(--text-2)] leading-relaxed'>
                {t.bio.paragraphs.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 4: CTA */}
        <div className='relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] my-0'>
          <GlassCTA
            title={t.cta.title}
            description={t.cta.description}
            buttonText={t.cta.button}
            buttonHref={`/${lang}/contacto`}
            disclaimer={t.cta.disclaimer}
            lang={lang} // ✅ PASAMOS lang AQUÍ
          />
        </div>
      </main>
    </>
  )
}