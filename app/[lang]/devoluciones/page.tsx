import PageHero from '@/components/hero/PageHero'
import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
   METADATA DINÁMICA (SEO)
   ===================================================== */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'es' | 'en');
  return {
    title: dict.devoluciones.meta.title,
    description: dict.devoluciones.meta.description
  }
}

/* =====================================================
   Página — Política de devoluciones - LIMPIA
   ===================================================== */
export default async function DevolucionesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'es' | 'en');
  const t = dict.devoluciones.page;

  return (
    <>
      {/* HERO — Política de devoluciones */}
      <PageHero
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image='/images/hero/hero-devoluciones.webp'
      />

      {/* Contenido de la página - BLINDAJE VISUAL MANTENIDO */}
      <main className='w-full max-w-[1200px] mx-auto px-5 pt-20 pb-0 space-y-32'>
        <section className='max-w-4xl mx-auto space-y-12 text-center'>
          <h3 className='max-w-3xl text-center text-[var(--text-2)] mx-auto'>
            {t.intro}
          </h3>

          <section className='max-w-4xl mx-auto space-y-12'>
            <h2>{t.sections.audits.title}</h2>
            <p className='max-w-3xl text-[var(--text-2)] mx-auto'>
              {t.sections.audits.p1}
            </p>
            <p className='max-w-3xl text-[var(--text-2)] mx-auto'>
              {t.sections.audits.p2}
            </p>
          </section>

          <section className='max-w-4xl mx-auto space-y-12'>
            <h2>{t.sections.consulting.title}</h2>
            <p className='max-w-3xl text-[var(--text-2)] mx-auto'>
              {t.sections.consulting.p1}
            </p>
          </section>

          <section className='max-w-4xl mx-auto space-y-12'>
            <h2>{t.sections.services.title}</h2>
            <p className='max-w-3xl text-[var(--text-2)] mx-auto'>
              {t.sections.services.p1}
            </p>
          </section>
        </section>
      </main>
    </>
  )
}