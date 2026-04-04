import { Metadata } from 'next'
import PageHero from '@/components/hero/PageHero'
import FormAuditoria from '@/components/forms/FormAuditoria'
import { ShieldCheck, Search, CheckCircle, Clock } from 'lucide-react'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
    METADATA DINÁMICA (SEO & SOCIAL) - OPTIMIZADA
   ===================================================== */
export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang as 'es' | 'en')
  const t = dict.auditoria.meta
  const baseUrl = 'https://www.alsnippets.com'
  
  // Ruta absoluta corregida para WhatsApp
  const ogImage = `${baseUrl}/images/og/openGraph-auditoria.png`

  return {
    title: t.title || "Auditoría", 
    description: t.description,
    keywords: t.keywords,
    alternates: {
      canonical: `${baseUrl}/${lang}/auditoria`,
      languages: {
        'es-CO': `${baseUrl}/es/auditoria`,
        'en-US': `${baseUrl}/en/auditoria`,
      },
    },
    openGraph: {
      title: t.og_title,
      description: t.og_description,
      url: `${baseUrl}/${lang}/auditoria`,
      siteName: dict.common.meta.brand,
      locale: lang === 'en' ? 'en_US' : 'es_CO',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: t.og_alt || dict.common.meta.brand,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.twitter_title,
      description: t.twitter_description,
      images: [ogImage],
    },
  }
}

export default async function AuditoriaPage ({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as 'es' | 'en')

  // Añadimos una validación simple por si dict.auditoria no existe aún
  const t = dict?.auditoria?.page || {}

  return (
    <>
      <PageHero
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image='/images/hero/hero-auditoria.webp'
      />

      <main className='w-full max-w-[1200px] mx-auto px-5 pt-20 pb-0 space-y-32'>
        {/* INTRODUCCIÓN Y GARANTÍA */}
        <section className='max-w-4xl mx-auto space-y-12'>
          <div className='text-center space-y-6'>
            <h2 className='!my-0 text-[var(--text-1)]'>{t.intro.title}</h2>
            <p className='opacity-90 text-[var(--text-2)]'>
              {t.intro.description}
            </p>
          </div>

          <div className='bg-[var(--bg-1)] border border-[var(--border-brand)]/30 rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-start shadow-[var(--shadow-1)] relative overflow-hidden'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-[var(--bg-brand)]/5 rounded-bl-full pointer-events-none' />
            <ShieldCheck className='w-12 h-12 text-[var(--text-brand)] shrink-0' />
            <div className='space-y-3 relative z-10'>
              <h3 className='!my-0 text-xl font-bold text-[var(--text-1)]'>
                {t.guarantee.title}
              </h3>
              <p className='text-sm md:text-base opacity-80 text-[var(--text-2)]'>
                {t.guarantee.description}
              </p>
            </div>
          </div>
        </section>

        {/* DIFERENCIA — Auditoría vs Consultoría */}
        <section className='space-y-12'>
          <div className='text-center'>
            <h2 className='text-[var(--text-1)]'>{t.options.main_title}</h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
            {/* Tarjeta Auditoría */}
            <div className='bg-[var(--bg-1)] border border-[var(--border-1)] hover:border-[var(--border-brand)]/50 transition-colors rounded-3xl p-8 space-y-6 shadow-[var(--shadow-1)] group'>
              <div className='w-14 h-14 bg-[var(--bg-3)] group-hover:bg-[var(--bg-brand)]/10 rounded-2xl flex items-center justify-center transition-colors'>
                <Search className='w-7 h-7 text-[var(--text-2)] group-hover:text-[var(--text-brand)] transition-colors' />
              </div>
              <h3 className='!my-0 text-2xl font-bold text-[var(--text-1)]'>
                {t.options.audit.title}
              </h3>
              <p className='opacity-80 leading-relaxed text-[var(--text-2)]'>
                {t.options.audit.description}
              </p>
              <ul className='space-y-3 opacity-90 text-[var(--text-2)]'>
                {t.options.audit.items.map((item: string, i: number) => (
                  <li key={i} className='flex items-start gap-3'>
                    <CheckCircle className='w-5 h-5 text-[var(--text-brand)] shrink-0 mt-0.5' />{' '}
                    {item}
                  </li>
                ))}
              </ul>
              <div className='pt-4 border-t border-[var(--border-1)]'>
                <p className='text-sm font-medium text-[var(--text-brand)]'>
                  {t.options.audit.note}
                </p>
                <p className='text-xs pt-5 text-[var(--text-brand)] hover:text-[var(--text-5)] cursor-pointer transition-colors duration-300'>
                  <a href={`/${lang}/devoluciones`} target='_blank'>
                    <i>{t.options.common.refund_link}</i>
                  </a>
                </p>
              </div>
            </div>

            {/* Tarjeta Consultoría */}
            <div
              id='consultoria'
              className='bg-[var(--bg-1)] border border-[var(--border-1)] hover:border-[var(--border-brand)]/50 transition-colors rounded-3xl p-8 space-y-6 shadow-[var(--shadow-1)] group'
            >
              <div className='w-14 h-14 bg-[var(--bg-3)] group-hover:bg-[var(--bg-brand)]/10 rounded-2xl flex items-center justify-center transition-colors'>
                <Clock className='w-7 h-7 text-[var(--text-2)] group-hover:text-[var(--text-brand)] transition-colors' />
              </div>
              <h3 className='!my-0 text-2xl font-bold text-[var(--text-1)]'>
                {t.options.consulting.title}
              </h3>
              <p className='opacity-80 leading-relaxed text-[var(--text-2)]'>
                {t.options.consulting.description}
              </p>
              <ul className='space-y-3 opacity-90 text-[var(--text-2)]'>
                {t.options.consulting.items.map((item: string, i: number) => (
                  <li key={i} className='flex items-start gap-3'>
                    <CheckCircle className='w-5 h-5 text-[var(--text-brand)] shrink-0 mt-0.5' />{' '}
                    {item}
                  </li>
                ))}
              </ul>
              <div className='pt-4 border-t border-[var(--border-1)]'>
                <p className='text-sm font-medium text-[var(--text-2)] opacity-80'>
                  {t.options.consulting.note}
                </p>
                <p className='text-xs pt-5 text-[var(--text-brand)] hover:text-[var(--text-5)] cursor-pointer transition-colors duration-300'>
                  <a href={`/${lang}/devoluciones`} target='_blank'>
                    <i>{t.options.common.refund_link}</i>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN DEL FORMULARIO */}
        <div
          id='form'
          className='relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] py-24 my-0 border-t border-[var(--border-1)]'
          style={{ background: 'var(--gradient-hero)' }}
        >
          <div className='max-w-[1200px] mx-auto px-5'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-start'>
              {/* TEXTO IZQUIERDO */}
              <div className='lg:col-span-5 space-y-6 pt-4 lg:sticky lg:top-24'>
                <h2 className='text-left !my-0 text-4xl md:text-5xl text-[var(--text-1)]'>
                  {t.form_section.title_1}
                  <br />
                  <span className='text-[var(--text-brand)]'>
                    {t.form_section.title_highlight}
                  </span>
                </h2>
                <p className='text-lg opacity-90 max-w-md text-[var(--text-2)]'>
                  {t.form_section.description}
                </p>
                <div className='hidden lg:block w-24 h-1 bg-[var(--bg-brand)]/30 rounded-full mt-8'></div>
              </div>

              {/* FORMULARIO DERECHO */}
              <div className='lg:col-span-7'>
                <div className='bg-[var(--bg-1)]/80 backdrop-blur-2xl border border-[var(--border-1)] rounded-3xl p-8 md:p-12 shadow-[var(--shadow-2)]'>
                  {/* MODIFICACIÓN: Inyectamos dict.form_auditoria al componente */}
                  <FormAuditoria lang={lang} dict={dict.form_auditoria} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
