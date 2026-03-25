import React from 'react'
import Image from 'next/image'
import PageHero from '@/components/hero/PageHero'
import GlassCTA from '@/components/ui/GlassCTA'
import { ExternalLink, Zap, Code } from 'lucide-react'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
   COMPONENTE AUXILIAR: Tarjeta de Proyecto (BLINDADO)
===================================================== */
const ProjectCard = ({ project }: { project: any }) => (
  <div className='group flex flex-col bg-[var(--bg-1)] border border-[var(--border-brand)] rounded-2xl overflow-hidden shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-brand-glow-hover)] hover:border-[var(--border-brand)] transition-all duration-300'>
    <div className='relative h-56 w-full overflow-hidden bg-[var(--bg-3)]'>
      <div className='absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10' />
      <Image
        src={project.image}
        alt={`Mockup ${project.title}`}
        fill
        className='object-cover transition-transform duration-700 ease-in-out group-hover:scale-105'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />
      <div className='absolute top-4 left-4 z-20'>
        <span className='px-3 py-1 bg-black/70 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20 uppercase tracking-wider'>
          {project.type}
        </span>
      </div>
    </div>

    <div className='flex flex-col flex-grow p-6'>
      <div className='flex justify-between items-start mb-3'>
        <h3 className='!my-0 text-xl font-bold text-[var(--text-1)] group-hover:text-[var(--text-brand)] transition-colors line-clamp-2'>
          {project.title}
        </h3>
        <a
          href={project.url}
          target='_blank'
          rel='noopener noreferrer'
          className='group relative p-2.5 bg-[var(--bg-brand)] hover:bg-[var(--bg-inverse)] rounded-full transition-all duration-300 shrink-0 ml-3 flex items-center justify-center hover:scale-110 active:scale-95 shadow-sm'
          aria-label={`Visit ${project.title}`}
        >
          {/* EFECTO RADAR (Pulsación infinita) */}
          <span className='absolute inset-0 rounded-full bg-[var(--bg-brand)] animate-ping opacity-60 group-hover:opacity-80' />

          {/* SEGUNDO HALO (Sutil expansión al hacer hover) */}
          <span className='absolute inset-0 rounded-full bg-[var(--bg-brand)] opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500' />

          {/* ICONO EXTERNAL LINK */}
          <div className='relative z-10 text-[var(--text-inverse)] group-hover:text-[var(--text-inverse)] transition-colors duration-300'>
            <ExternalLink className='w-4 h-4' />
          </div>
        </a>
      </div>

      <p className='text-[var(--text-2)] text-sm mb-6 flex-grow'>
        {project.description}
      </p>

      <div className='flex flex-wrap gap-2 mt-auto pt-4 border-t border-[var(--border-1)]'>
        {project.features.map((feature: string, idx: number) => (
          <span
            key={idx}
            className='flex items-center text-xs px-2.5 py-1 rounded-md bg-[var(--bg-3)] text-[var(--text-1)] border border-[var(--border-1)] group-hover:border-[var(--border-brand)]/30 transition-colors'
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  </div>
)

/* =====================================================
   PÁGINA PRINCIPAL
===================================================== */
export default async function CasosDeExitoPage ({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as 'es' | 'en')
  const t = dict.proyecto_casos.page

  return (
    <>
      <PageHero
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image='/images/hero/hero-casos-exito.webp'
      />

      <main className='w-full max-w-[1200px] mx-auto px-5 pt-20 pb-0 space-y-32'>
        {/* INTRODUCCIÓN */}
        <section className='max-w-3xl mx-auto'>
          <p className='text-center text-lg text-[var(--text-2)] opacity-90'>
            {t.intro}
          </p>
        </section>

        {/* SECCIÓN 1: CREACIONES */}
        <section className='space-y-12 border-t border-[var(--border-brand)] pt-12'>
          <div className='text-center space-y-4 max-w-2xl mx-auto'>
            <Code className='w-12 h-12 mx-auto text-[var(--text-brand)] opacity-80' />
            <h2 className='text-[var(--text-1)]'>{t.creations_title}</h2>
            <p className='text-[var(--text-2)] opacity-80'>
              {t.creations_desc}
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {t.creations_list.map((project: any, idx: number) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        </section>

        {/* SECCIÓN 2: OPTIMIZACIÓN */}
        <section className='space-y-12 border-t border-[var(--border-1)] pt-12'>
          <div className='text-center space-y-4 max-w-2xl mx-auto'>
            <Zap className='w-12 h-12 mx-auto text-[var(--text-brand)] opacity-80' />
            <h2 className='text-[var(--text-1)]'>{t.optimizations_title}</h2>
            <p className='text-[var(--text-2)] opacity-80'>
              {t.optimizations_desc}
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {t.optimizations_list.map((project: any, idx: number) => (
              <ProjectCard key={idx} project={project} />
            ))}
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
            lang={lang}
          />
        </div>
      </main>
    </>
  )
}
