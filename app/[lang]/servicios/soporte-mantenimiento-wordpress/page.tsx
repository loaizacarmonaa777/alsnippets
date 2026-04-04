import React, { Suspense } from 'react' // ✅ IMPORT OBLIGATORIO
import PageHero from '@/components/hero/PageHero'
import VerticalCard from '@/components/ui/VerticalCard'
import IconCard from '@/components/ui/IconCard'
import GlassCTA from '@/components/ui/GlassCTA'
import { getDictionary } from '@/i18n/get-dictionary'
import { Metadata } from 'next' // ✅ IMPORT OBLIGATORIO

// Iconos
import IconCopiaSeguridad from '@/components/icons/IconCopiaSeguridad'
import IconRevisionCompatibilidad from '@/components/icons/IconRevisionCompatibilidad'
import IconMonitoreoSeguridad from '@/components/icons/IconMonitoreoSeguridad'
import IconSoporteTecnico from '@/components/icons/IconSoporteTecnico'

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

  // Sincronización estricta con i18n/dictionaries/[lang]/servicios_soporte.json
  const t = (dict as any).servicios_soporte.meta
  const baseUrl = 'https://www.alsnippets.com'
  const ogImage = `${baseUrl}/images/og/openGraph-soporte-mantenimiento.png`

  return {
    // ✅ CORREGIDO: Título dinámico desde JSON (Sin texto plano)
    title: t.title, 
    description: t.description,
    keywords: t.keywords,
    alternates: {
      canonical: `${baseUrl}/${lang}/servicios/soporte-mantenimiento-wordpress`,
      languages: {
        'es': `${baseUrl}/es/servicios/soporte-mantenimiento-wordpress`,
        'en': `${baseUrl}/en/servicios/soporte-mantenimiento-wordpress`
      }
    },
    openGraph: {
      title: t.og_title,
      description: t.og_description,
      url: `${baseUrl}/${lang}/servicios/soporte-mantenimiento-wordpress`,
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
   Página — Soporte y Mantenimiento WordPress
===================================================== */

export default async function SoporteMantenimientoPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  const dict = await getDictionary(lang as 'es' | 'en');
  const t = dict.servicios_soporte.page;

  // Mapeo de iconos
  const iconMap: Record<string, any> = {
    backup: IconCopiaSeguridad,
    compatibility: IconRevisionCompatibilidad,
    security: IconMonitoreoSeguridad,
    support: IconSoporteTecnico
  };

  return (
    <>
      {/* HERO */}
      <PageHero
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image='/images/hero/hero-soporte-mantenimiento.webp'
      />

      <main className='w-full max-w-[1200px] mx-auto px-5 pt-12 md:pt-24 pb-0 space-y-32'>
        
        {/* SECCIÓN 1: PROBLEMAS QUE SOLUCIONO */}
        <section className='space-y-12'>
          <div className='text-center space-y-4'>
            <h2 className="text-[var(--text-1)]">
              {t.solutions.title}
            </h2>
            <h3 className='text-[var(--text-brand)] font-medium'>
              {t.solutions.subtitle}
            </h3>
            <p className='max-w-2xl mx-auto text-[var(--text-2)]'>
              {t.solutions.description}
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {t.solutions.items.map((item: any, idx: number) => (
              <VerticalCard
                key={idx}
                title={item.title}
                description={item.description}
                image={item.image}
                // href={item.href?.replace('{lang}', lang)} si la card requiere link actíva esta línea
                // Si VerticalCard requiere lang, pásalo aquí
              />
            ))}
          </div>
        </section>

        {/* SECCIÓN 2: MANTENIMIENTO RESPONSABLE */}
        <section
          className='w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] py-24 px-5 my-0'
          style={{ background: 'var(--gradient-hero)' }}
        >
          <div className='max-w-[1200px] mx-auto space-y-16'>
            <div className='space-y-6 text-center'>
              <h2 className="text-[var(--text-1)]">
                {t.responsible.title}
              </h2>
              <p className='text-lg text-[var(--text-2)] max-w-3xl mx-auto leading-relaxed'>
                {t.responsible.description}
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {t.responsible.items.map((item: any, idx: number) => (
                <IconCard
                  key={idx}
                  icon={iconMap[item.iconKey]}
                  title={item.title}
                  // ✅ PASAMOS lang a IconCard (lo requiere)
                  lang={lang}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN CTA */}
        <div className='relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] my-0'>
          <GlassCTA
            title={t.cta.title}
            description={t.cta.description}
            buttonText={t.cta.button}
            buttonHref={`/${lang}/auditoria#form`}
            disclaimer={t.cta.disclaimer}
            className='!my-0'
            // ✅ PASAMOS lang a GlassCTA (lo requiere)
            lang={lang}
          />
        </div>
      </main>
    </>
  )
}