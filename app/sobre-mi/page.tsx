'use client'
import React from 'react'
import Image from 'next/image'
import StackLogos from '@/components/shared/StackLogos'
import PageHero from '@/components/hero/PageHero'
import GlassCTA from '@/components/ui/GlassCTA' // Componente nuevo para el CTA final
import { TypeAnimation } from 'react-type-animation'

/* =====================================================
   Página — Sobre mí (Alsnippets)
   ===================================================== */

export default function SobreMiPage () {
  return (
    <>
      {/* =====================================================
          HERO — Sobre mí
          ===================================================== */}
      <PageHero
        title='Sobre mí'
        subtitle='Soy Adrián Loaiza Carmona, el motor detrás de Alsnippets. Trabajo directamente contigo para resolver problemas técnicos, optimizar el rendimiento y asegurar el crecimiento de tu presencia digital.'
        image='/images/sobre-mi/hero-sobre-mi.webp'
      />

      <main>
        {/* =====================================================
            LAYOUT ZIG-ZAG (Ancho máximo 1200px - Textos originales)
            ===================================================== */}
        <div className='flex flex-col w-full'>
          {/* SECCIÓN 1: QUÉ HAGO */}
          <section className='w-full bg-[var(--bg-card)]'>
            <div className='max-w-[1200px] mx-auto flex flex-col md:flex-row items-stretch'>
              {/* IMAGEN (Izquierda) */}
              <div className='w-full md:w-1/2 relative min-h-[300px] md:min-h-[500px]'>
                <Image
                  src='/images/sobre-mi/que-hago.webp'
                  alt='Qué hago - Adrián Loaiza'
                  fill
                  className='object-cover rounded-xl shadow-lg'
                  sizes='(max-width: 1200px) 100vw, 600px'
                />
              </div>
              {/* TEXTO (Derecha) */}
              <div className='w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24'>
                <div className='space-y-6 max-w-lg'>
                  <h2 className='lg:text-left'>
                    Qué hago
                  </h2>
                  <p className='text-lg text-[var(--text-secondary)] leading-relaxed'>
                    Me especializo en soporte, mantenimiento y optimización de
                    sitios WordPress, con más de cinco años de experiencia
                    trabajando con WordPress y otros CMS.
                  </p>
                  <p className='text-lg text-[var(--text-secondary)] leading-relaxed'>
                    Mi enfoque no es rehacer por rehacer, sino mejorar lo que ya
                    existe, respetando tu inversión y haciendo que tu web sea
                    más estable, segura y rápida.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECCIÓN 2: VISIÓN INTEGRAL */}
          <section className='w-full bg-[var(--bg-tertiary)]'>
            <div className='max-w-[1200px] mx-auto flex flex-col-reverse md:flex-row items-stretch'>
              {/* TEXTO (Izquierda) */}
              <div className='w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24'>
                <div className='space-y-6 max-w-lg'>
                  <h2 className='lg:text-left'>
                    Visión integral
                  </h2>
                  <p className='text-lg text-[var(--text-secondary)] leading-relaxed'>
                    <strong>Alsnippets</strong> es mi marca personal, creada
                    bajo mis iniciales (AL) y el concepto de{' '}
                    <strong>Snippets</strong>: fragmentos de código esenciales
                    para el éxito de una web.
                  </p>

                  <p className='text-lg text-[var(--text-secondary)] leading-relaxed'>
                    Bajo este sello, ofrezco una{' '}
                    <strong>ventaja competitiva en costos y eficiencia</strong>.
                    Al integrar formación profesional en{' '}
                    <strong>
                      diseño gráfico, marketing digital, fotografía y edición de
                      video
                    </strong>
                    , permito que las empresas reduzcan costos de contratación
                    al no tener que buscar múltiples proveedores para diferentes
                    frentes. Mi perfil multidisciplinario garantiza un{' '}
                    <strong>ahorro significativo en tiempos de entrega</strong>,
                    permitiéndome liderar un proyecto desde la identidad visual
                    y el branding hasta la pasarela de pagos, asegurando una
                    coherencia técnica y estética impecable en tiempo récord.
                  </p>
                </div>
              </div>
              {/* IMAGEN (Derecha) */}
              <div className='w-full md:w-1/2 relative min-h-[300px] md:min-h-[500px]'>
                <Image
                  src='/images/sobre-mi/vision.webp'
                  alt='Visión Integral'
                  fill
                  className='object-cover shadow-lg'
                  sizes='(max-width: 1200px) 100vw, 600px'
                />
              </div>
            </div>
          </section>

          {/* SECCIÓN 3: CÓMO TRABAJO */}
          <section className='w-full bg-[var(--bg-card)]'>
            <div className='max-w-[1200px] mx-auto flex flex-col md:flex-row items-stretch'>
              {/* IMAGEN (Izquierda) */}
              <div className='w-full md:w-1/2 relative min-h-[350px] md:min-h-[500px] px-[2%] py-4 md:p-10'>
                <Image
                  src='/images/sobre-mi/como-trabajo.webp'
                  alt='Cómo trabajo'
                  fill
                  className='object-cover shadow-lg rounded-xl'
                  sizes='(max-width: 1200px) 100vw, 600px'
                />
              </div>
              {/* TEXTO (Derecha) */}
              <div className='w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24'>
                <div className='space-y-6 max-w-lg'>
                  <h2 className='lg:text-left'>
                    Cómo trabajo
                  </h2>
                  <p className='text-lg text-[var(--text-secondary)] leading-relaxed'>
                    Analizo antes de actuar, explico lo técnico en lenguaje
                    claro y priorizo soluciones que realmente aporten valor.
                  </p>
                  <p className='text-lg text-[var(--text-secondary)] leading-relaxed'>
                    No aplico recetas genéricas ni prometo lo que no conviene.
                    Cada sitio tiene su contexto, y así lo trato.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* =====================================================
            EVOLUCIÓN CONSTANTE (Animación Typewriter)
            ===================================================== */}
        <section
          className='relative w-full py-24 px-5 !my-0'
          style={{ background: 'var(--bg-hero-gradient)' }}
        >
          <div className='max-w-3xl mx-auto text-center space-y-8'>
            <TypeAnimation
              sequence={[
                'Evolución Tecnológica',
                2000,
                'Desarrollo con React & Next.js',
                2000,
                'Inteligencia Artificial Aplicada',
                2000,
                'Criterio Humano Profesional',
                2000
              ]}
              wrapper='h2'
              cursor={true}
              repeat={Infinity}
              speed={50}
              className='text-3xl md:text-4xl font-bold text-[var(--text-primary)] inline-block min-h-[1.2em]'
            />

            <p className='text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed'>
              El mundo digital no se detiene, y yo tampoco. Fortalezco mis bases
              técnicas integrando tecnologías como{' '}
              <strong>React, Tailwind CSS y Node.js</strong>, apoyándome en IA
              para agilizar procesos, pero manteniendo siempre el{' '}
              <strong>criterio técnico humano</strong> como el filtro final de
              calidad.
            </p>
          </div>
        </section>

        {/* =====================================================
            STACK TECNOLÓGICO (Carrusel de Logos Full Width)
            ===================================================== */}
        <section className='w-full pt-24 pb-0 bg-[var(--bg-primary)] mt-0 mb-0 overflow-hidden'>
          
          {/* Títulos: Mantenemos el ancho controlado y añadimos separación con el carrusel */}
          <div className='max-w-[1200px] mx-auto px-4 space-y-4 text-center mb-16'>
            <h2>
              Tecnologías y herramientas
            </h2>
            <p className='max-w text-xl mx-auto pb-20 text-[var(--text-secondary)] opacity-90'>
              Domino las herramientas líderes del mercado para garantizar que
              tu proyecto sea competitivo a nivel global, desde CMS clásicos
              hasta frameworks de última generación.
            </p>
          </div>

          {/* Carrusel: Full Width y pegado al fondo de la sección */}
          <div className='w-full pb-0'>
            <StackLogos />
          </div>
          
        </section>

        {/* =====================================================
            CTA FINAL (Glassmorphism Reutilizable)
            ===================================================== */}
        <GlassCTA
          title='¿Buscas un aliado técnico para tu próximo gran paso?'
          description='Ya sea una auditoría profunda, una migración compleja o el desarrollo de una nueva plataforma, estoy listo para ayudarte a ejecutarlo con precisión.'
          buttonText='Hablemos de tu proyecto'
          buttonHref='/contacto'
          disclaimer='Consultoría técnica disponible para España, USA y Latinoamérica.'
        />
      </main>
    </>
  )
}
