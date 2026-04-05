import React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Hero from '@/components/home/Hero'
import { getDictionary } from '@/i18n/get-dictionary'

// 🚀 OPTIMIZACIÓN: Carga diferida de componentes "Below the Fold"
// Esto libera el hilo principal y mejora el score de Performance en Mobile
const Benefits = dynamic(() => import('@/components/home/Benefits'))
const Authority = dynamic(() => import('@/components/home/Authority'))
const Solutions = dynamic(() => import('@/components/home/Solutions'))
const ProjectsPreview = dynamic(() => import('@/components/home/ProjectsPreview'))
const StackLogos = dynamic(() => import('@/components/shared/StackLogos'))
const BlogPreview = dynamic(() => import('@/components/home/BlogPreview'))
const CTA = dynamic(() => import('@/components/home/CTA'))

/* =====================================================
   Home Page (Server Component) - OPTIMIZADA V4
   ===================================================== */
export default async function HomePage ({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict: any = await getDictionary(lang as 'es' | 'en')

  const benefits = dict.home_benefits

  return (
    <>
      {/* 1. HERO (Carga Prioritaria) */}
      {/* Mantener Hero como import estático es vital para el LCP */}
      <section>
        <Hero lang={lang} />
      </section>

      <main>
        {/* SECCIÓN 1: WORDPRESS ESTABLE */}
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

            <Benefits title='' items={benefits} lang={lang} />
          </div>

          <div className='pt-4 text-center'>
            <Link
              href={`/${lang}/proyectos/casos-de-exito`}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-bold bg-[var(--bg-1)] text-[var(--text-1)] border border-[var(--border-brand)] hover:bg-[var(--bg-brand)] hover:text-[var(--text-inverse)] hover:border-transparent shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-all duration-300'
            >
              {dict.home.stable_section.cta}
            </Link>
          </div>
        </section>

        {/* 🚀 Las siguientes secciones se cargarán solo cuando sean necesarias */}
        <section>
          <Authority lang={lang} />
        </section>

        <section>
          <Solutions lang={lang} />
        </section>

        <section className='my-0'>
          <ProjectPreviewWrapper lang={lang} />
        </section>

        <section className='my-0'>
          <StackLogos lang={lang} />
        </section>

        <section className='my-0'>
          <BlogPreview lang={lang} />
        </section>

        <div className='my-0'>
          <CTA lang={lang} />
        </div>
      </main>
    </>
  )
}

// Pequeño wrapper para evitar conflictos de nombrado si fuera necesario
function ProjectPreviewWrapper({ lang }: { lang: string }) {
  return <ProjectsPreview lang={lang} />
}