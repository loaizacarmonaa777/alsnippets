import React from 'react'
import Link from 'next/link'
import Hero from '@/components/home/Hero'
import Benefits from '@/components/home/Benefits'
import Authority from '@/components/home/Authority'
import Solutions from '@/components/home/Solutions'
import ProjectsPreview from '@/components/home/ProjectsPreview'
import BlogPreview from '@/components/home/BlogPreview'
import StackLogos from '@/components/shared/StackLogos'
import CTA from '@/components/home/CTA'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
   Home Page (Server Component) - PROTOCOLO ALSNIPPETS
   ===================================================== */
export default async function HomePage ({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict: any = await getDictionary(lang as 'es' | 'en')

  // Extraemos la sección de beneficios del nuevo JSON
  const benefits = dict.home_benefits

  return (
    <>
      {/* 1. HERO */}
      <section>
        <Hero lang={lang} />
      </section>

      {/* 2. CONTENIDO PRINCIPAL */}
      <main>
        {/* =========== 
             SECCIÓN 1: WORDPRESS ESTABLE 
             (Carga datos de home.json) 
            ============*/}

        <section className='w-full py-10 md:py-16 px-4 my-0'>
          <div className='container mx-auto max-w-[1200px] space-y-16'>
            <div className='text-center max-w-2xl mx-auto space-y-4'>
              <h2 className='text-[var(--text-1)]'>
                {dict.home.stable_section.title}
              </h2>
              <p className='text-lg text-[var(--text-2)] opacity-90 leading-relaxed'>
                {dict.home.stable_section.description}
              </p>
            </div>

            {/* Pasamos los items completos (con chips e imágenes) al componente */}
            <Benefits title='' items={benefits} lang={lang} />
          </div>

          <div className='pt-4 text-center'>
            <Link
              href={`/${lang}/proyectos/casos-de-exito`} // link
              target='_blank' // pestaña nueva
              rel='noopener noreferrer' // seguridad
              className='inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-bold bg-[var(--bg-1)] text-[var(--text-1)] border border-[var(--border-brand)] hover:bg-[var(--bg-brand)] hover:text-[var(--text-inverse)] hover:border-transparent shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-all duration-300'
            >
              {dict.home.stable_section.cta}
            </Link>
          </div>
        </section>

        {/* SECCIÓN 2: AUTHORITY */}
        <section>
          <Authority lang={lang} />
        </section>

        {/* SECCIÓN 3: SOLUTIONS */}
        <section>
          <Solutions lang={lang} />
        </section>

        {/* SECCIÓN 4: PROJECTS */}
        <section className='my-0'>
          <ProjectsPreview lang={lang} />
        </section>

        {/* SECCIÓN 5: STACK LOGOS */}
        <section className='my-0'>
          <StackLogos lang={lang} />
        </section>

        {/* SECCIÓN 6: BLOG */}
        <section className='my-0'>
          <BlogPreview lang={lang} />
        </section>

        {/* SECCIÓN 7: CTA FINAL */}
        <div className='my-0'>
          <CTA lang={lang} />
        </div>
      </main>
    </>
  )
}
