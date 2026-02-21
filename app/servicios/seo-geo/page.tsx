'use client'

import React from 'react'
import Image from 'next/image'
import PageHero from '@/components/hero/PageHero'
import VerticalCard from '@/components/ui/VerticalCard'
import HorizontalCard from '@/components/ui/HorizontalCard'
import GlassCTA from '@/components/ui/GlassCTA'

/* =====================================================
   Página — SEO - GEO Optimización para buscadores y LLMs
===================================================== */

export default function SeoPage () {
  return (
    <>
      {/* =====================================================
          HERO — SEO y GEO
          ===================================================== */}
      <PageHero
        title='SEO y GEO'
        subtitle='El SEO ya no se trata de llenar páginas con palabras clave. Hoy se trata de estructura, contexto y claridad para que Google — y los modelos de lenguaje — entiendan tu sitio y lo consideren una fuente confiable.'
        image='/images/hero/hero-seo-geo.webp'
      />

      <main className='w-full'>
        {/* =====================================================
            SECCIÓN 1: CÓMO FUNCIONA REALMENTE
            ===================================================== */}
        <section className='w-full max-w-[1200px] mx-auto px-5 py-16 md:py-24 space-y-12'>
          <div className='text-center space-y-4 max-w-3xl mx-auto'>
            <h2>
              SEO y GEO <br /> ¿cómo funciona realmente?
            </h2>
            <p className='text-lg md:text-xl text-[var(--text-secondary)] opacity-90'>
              El SEO moderno no busca engañar algoritmos. Busca facilitar la
              comprensión del contenido, tanto para personas como para sistemas
              automáticos.
            </p>
            <p className='text-lg md:text-xl text-[var(--text-secondary)] opacity-90'>
              Google ya no premia la repetición forzada de keywords, sino la
              intención, la estructura semántica, la experiencia de usuario y la
              coherencia del sitio.
            </p>
          </div>

          {/* MEJORA: lg:grid-cols-4 para 4 elementos exactos y evitar huérfanos */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <VerticalCard
              title='Arquitectura clara del sitio'
              description='Estructura lógica de páginas y contenidos para que buscadores y personas entiendan el sitio sin fricción.'
              image='/images/optimizacion/vertical.webp'
              href='/contacto'
            />
            <VerticalCard
              title='Contenido comprensible y jerarquizado'
              description='Uso correcto de títulos, secciones y niveles de información que facilitan la lectura y el análisis.'
              image='/images/optimizacion/vertical.webp'
              href='/contacto'
            />
            <VerticalCard
              title='Contexto real, no texto inflado'
              description='Contenido con intención clara, sin relleno artificial ni repeticiones forzadas de palabras clave.'
              image='/images/optimizacion/vertical.webp'
              href='/contacto'
            />
            <VerticalCard
              title='Experiencia técnica sólida'
              description='Rendimiento, accesibilidad y estabilidad técnica como base del posicionamiento real.'
              image='/images/optimizacion/vertical.webp'
              href='/contacto'
            />
          </div>
        </section>

        {/* =====================================================
            SECCIÓN 2: GEO - LLMs
            ===================================================== */}
        <section className='w-full max-w-[1200px] mx-auto px-5 py-16 space-y-12 border-t border-[var(--border-subtle)]'>
          <div className='text-center space-y-4 max-w-3xl mx-auto'>
            <h2>¿Qué es GEO?</h2>
            <p className='text-lg md:text-xl text-[var(--text-secondary)] opacity-90'>
              GEO <i>(Generative Engine Optimization)</i> es la optimización de
              contenidos y estructuras para que los modelos de lenguaje (LLMs)
              puedan interpretar, resumir y citar tu sitio correctamente.
            </p>
            <p className='text-lg md:text-xl text-[var(--text-secondary)] opacity-90'>
              Cuando una persona pregunta a un asistente como{' '}
              <strong>ChatGPT, Gemini o Perplexity</strong>, estos modelos no
              “buscan palabras clave”: seleccionan fuentes claras, confiables y
              bien estructuradas.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <VerticalCard
              title='Lenguaje claro y directo'
              description='Contenido escrito para personas reales, sin tecnicismos innecesarios ni frases ambiguas.'
              image='/images/optimizacion/vertical.webp'
              href='/contacto'
            />
            <VerticalCard
              title='Contexto completo por sección'
              description='Información suficiente para entender el tema sin depender de otros bloques del sitio.'
              image='/images/optimizacion/vertical.webp'
              href='/contacto'
            />
            <VerticalCard
              title='Respuestas bien delimitadas'
              description='Cada sección responde a una intención concreta, facilitando la lectura y el análisis por sistemas de IA.'
              image='/images/optimizacion/vertical.webp'
              href='/contacto'
            />
            <VerticalCard
              title='Señales de autoridad y experiencia'
              description='Contenido respaldado por experiencia real, coherencia técnica y enfoque profesional.'
              image='/images/optimizacion/vertical.webp'
              href='/contacto'
            />
          </div>
        </section>

        {/* =====================================================
            SECCIÓN 3: CÓMO TRABAJO
            ===================================================== */}
        <section className='w-full max-w-[1200px] mx-auto px-5 py-16 space-y-12 border-t border-[var(--border-subtle)]'>
          <div className='text-center space-y-4 max-w-3xl mx-auto'>
            <h2>Cómo trabajo el SEO y el GEO</h2>
            <p className='text-lg md:text-xl text-[var(--text-secondary)] opacity-90'>
              No aplico fórmulas genéricas ni paquetes cerrados. Cada proyecto
              tiene un contexto, un mercado y unos objetivos distintos.
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <HorizontalCard
              title='Mejora de Core Web Vitals'
              description='Optimización de métricas clave como LCP, CLS e INP para ofrecer una experiencia estable, rápida y alineada con los estándares actuales de Google.'
              image='/images/optimizacion/horizontal.webp'
              href='/contacto'
            />
            <HorizontalCard
              title='Análisis de intención y estructura'
              description='Identificación de qué busca el usuario y cómo debe organizarse el contenido para responder correctamente.'
              image='/images/optimizacion/horizontal.webp'
              href='/contacto'
            />
            <HorizontalCard
              title='Reorganización semántica del sitio'
              description='Ajuste de secciones, jerarquías y relaciones entre páginas para mejorar comprensión y relevancia.'
              image='/images/optimizacion/horizontal.webp'
              href='/contacto'
            />
            <HorizontalCard
              title='Optimización para buscadores y LLMs'
              description='Preparación del contenido para Google y modelos de lenguaje, priorizando claridad, contexto y autoridad.'
              image='/images/optimizacion/horizontal.webp'
              href='/contacto'
            />
            <HorizontalCard
              title='Seguimiento y ajustes progresivos'
              description='Evaluación continua del rendimiento y ajustes estratégicos según resultados y evolución del proyecto.'
              image='/images/optimizacion/horizontal.webp'
              href='/contacto'
            />
            <HorizontalCard
              title='Estrategia de contenido a largo plazo'
              description='Con una visión a mediano y largo plazo, desarrollo una estrategia de contenido que evoluciona con el proyecto, adaptándose a cambios en el mercado y en los algoritmos.'
              image='/images/optimizacion/horizontal.webp'
              href='/contacto'
            />
          </div>
        </section>

        {/* =====================================================
            SECCIÓN 4: EXPECTATIVAS (Diseño dividido)
            ===================================================== */}
        <section
          className='w-full py-16 md:py-24 my-0'
          style={{ background: 'var(--bg-hero-gradient)' }}
        >
          <div className='max-w-[1200px] mx-auto px-5 flex flex-col lg:flex-row items-center gap-12'>
            {/* IMAGEN (Izquierda) */}
            <div className='w-full lg:w-1/2 relative h-[350px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl border border-[var(--border-subtle)]'>
              <Image
                src='/images/sobre-mi/que-hago.webp'
                alt='Qué hago - Adrián Loaiza'
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 100vw, 50vw'
              />
            </div>

            {/* TEXTO (Derecha) */}
            <div className='w-full lg:w-1/2 space-y-6'>
              {/* text-left sobrescribe el text-center global */}
              <h2 className='text-left'>
                Qué debes tener en cuenta como cliente
              </h2>
              <div className='space-y-4 text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed'>
                <p>
                  El SEO y el GEO no son inmediatos. He participado en proyectos
                  que han requerido varios meses de trabajo continuo para lograr
                  resultados sólidos y sostenibles.
                </p>
                <p>
                  Este servicio requiere paciencia, criterio y una visión a
                  mediano y largo plazo. No prometo resultados mágicos ni
                  posiciones instantáneas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            SECCIÓN 5: CTA FINAL FULL WIDTH
            ===================================================== */}
        <div className='relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] my-0'>
          <GlassCTA
            title='Auditoría de seguridad para tu sitio web'
            description='Antes de intervenir, realizo una auditoría de seguridad para identificar vulnerabilidades y definir la mejor estrategia de limpieza y protección. Esto garantiza una intervención precisa y efectiva.'
            buttonText='Solicitar auditoría de seguridad'
            buttonHref='/contacto'
            disclaimer='Consultoría técnica disponible para España, USA y Latinoamérica.'
            className='!my-0'
          />
        </div>
      </main>
    </>
  )
}
