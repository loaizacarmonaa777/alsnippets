// app/[lang]/servicios/seguridad-limpieza/page.tsx
// ELIMINAMOS 'use client' - Ahora es Server Component
import React from 'react'
import PageHero from '@/components/hero/PageHero'
import VerticalCard from '@/components/ui/VerticalCard'
import HorizontalCard from '@/components/ui/HorizontalCard'
import FakeWordPressLogin from '@/components/forms/FakeWordPressLogin'
import GlassCTA from '@/components/ui/GlassCTA'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
   Página — Seguridad y Limpieza
   Ahora es un Server Component
===================================================== */

export default async function SeguridadLimpiezaPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  const dict = await getDictionary(lang as 'es' | 'en');
  const t = (dict as any).servicios_seguridad.page; // ✅ Ahora sí existe
  const normalizedLang = lang.replace(/^\//, '');

  return (
    <>
      {/* HERO */}
      <PageHero
        // Usamos los campos directamente del objeto
        title={t.hero?.title || "Seguridad y Limpieza WordPress"}
        subtitle={t.hero?.subtitle || "Protección profesional para tu sitio"}
        image='/images/hero/hero-seguridad-limpieza.webp'
      />

      <main className='w-full'>
        {/* BLOQUE 1: AMENAZAS QUE ENFRENTA TU WORDPRESS */}
        <section className='w-full max-w-[1200px] mx-auto px-5 py-16 md:py-24 space-y-12'>
          <h2 className='text-[var(--text-1)]'>{t.threats.title}</h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {t.threats.items.map((item: any, idx: number) => (
              <VerticalCard
                key={idx}
                title={item.title}
                description={item.description}
                image={item.image}
                // Si VerticalCard requiere lang, pásalo aquí
              />
            ))}
          </div>
        </section>

        {/* BLOQUE 2: PROCESO DE LIMPIEZA Y RECUPERACION */}
        <section className='w-full max-w-[1200px] mx-auto px-5 py-16 space-y-12 border-t border-[var(--border-1)]'>
          <div className='text-center space-y-4 max-w-3xl mx-auto'>
            <h2 className='text-[var(--text-1)]'>{t.cleanup.title}</h2>
            <p className='text-lg text-[var(--text-2)] opacity-90'>
              {t.cleanup.description}
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
            {t.cleanup.items.map((item: any, idx: number) => (
              <HorizontalCard
                key={idx}
                title={item.title}
                description={item.description}
                image={item.image}
                href={item.slug}
                target='_blank'
                // ✅ PASAMOS lang a HorizontalCard (lo requiere)
                lang={lang}
              />
            ))}
          </div>
        </section>

        {/* BLOQUE 3: PREVENCIÓN */}
        <section className='w-full max-w-[1200px] mx-auto px-5 py-16 space-y-12 border-t border-[var(--border-1)]'>
          <div className='text-center space-y-4 max-w-3xl mx-auto'>
            <h2 className='text-[var(--text-1)]'>{t.prevention.title}</h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
            {t.prevention.items.map((item: any, idx: number) => (
              <HorizontalCard
                key={idx}
                title={item.title}
                description={item.description}
                image={item.image}
                href={item.slug}
                target='_blank'
                // ✅ PASAMOS lang a HorizontalCard (lo requiere)
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
              <h2 className='text-center lg:text-left text-[var(--text-1)]'>
                {t.access.title}
              </h2>
              <div className='text-center lg:text-left space-y-4 text-lg text-[var(--text-2)]'>
                <p>{t.access.p1}</p>
                <p className='font-medium italic text-[var(--text-brand)]'>
                  {t.access.confidential}
                </p>
              </div>
            </div>
            <div className='w-full max-w-md mx-auto rounded-2xl bg-amber-50'>
              <div className='bg-[var(--bg-3)] border border-[var(--border-1)] rounded-2xl p-6 md:p-8 shadow-[var(--shadow-2)]'>
                {/* ✅ CORREGIDO: Pasamos lang */}
                <FakeWordPressLogin lang={lang} />
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
            buttonHref={`/${normalizedLang}/auditoria#form`} 
            disclaimer={t.cta.disclaimer}
            // ✅ PASAMOS lang a GlassCTA (lo requiere)
            lang={lang}
          />
        </div>
      </main>
    </>
  )
}
