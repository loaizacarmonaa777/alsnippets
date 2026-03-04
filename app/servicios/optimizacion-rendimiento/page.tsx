'use client'

import React from 'react'
import PageHero from '@/components/hero/PageHero'
import VerticalCard from '@/components/ui/VerticalCard'
import HorizontalCard from '@/components/ui/HorizontalCard'
import FakeWordPressLogin from '@/components/forms/FakeWordPressLogin'
import GlassCTA from '@/components/ui/GlassCTA'

/* =====================================================
   Página — Optimización y Rendimiento WordPress
===================================================== */

export default function OptimizacionPage () {
  return (
    <>
      {/* =====================================================
          HERO — Página de Optimización y Rendimiento WordPress
          ===================================================== */}
      <PageHero
        title='Optimización y Rendimiento WordPress'
        subtitle='Un sitio lento pierde visitas, conversiones y posicionamiento. Optimizo tu WordPress para que cargue rápido, sea estable y ofrezca una mejor experiencia al usuario.'
        image='/images/hero/hero-optimizacion-rendimiento.webp'
      />

      <main className='w-full'>
        
        {/* =====================================================
            BLOQUE DE CARDS 1 — Problemas de rendimiento comunes
            ===================================================== */}
        {/* MEJORA: max-w-[1200px], py-16 md:py-24 y space-y-12 para consistencia */}
        <section className='w-full max-w-[1200px] mx-auto px-5 py-16 md:py-24 space-y-12'>
          <h2>
            Problemas de rendimiento más frecuentes
          </h2>

          {/* MEJORA: gap-8 para mejor respiración visual en tarjetas verticales */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <VerticalCard
              title='Carga lenta del sitio'
              description='Tiempos de respuesta elevados que afectan la experiencia del usuario, aumentan la tasa de rebote y perjudican el posicionamiento en buscadores.'
              image='/images/optimizacion/carga-lenta-sitio.webp'
              //href='/contacto'
            />
            <VerticalCard
              title='Imágenes sin optimizar'
              description='Archivos demasiado pesados, sin compresión o sin formatos modernos (WebP/AVIF), que ralentizan la carga en móviles y conexiones lentas.'
              image='/images/optimizacion/imagenes-sin-optimizar.webp'
              //href='/contacto'
            />
            <VerticalCard
              title='Exceso de plugins'
              description='Extensiones innecesarias, duplicadas o mal desarrolladas que consumen recursos del servidor y generan conflictos internos.'
              image='/images/optimizacion/exceso-plugins.webp'
              //href='/contacto'
            />
            <VerticalCard
              title='Base de datos saturada'
              description='Revisiones acumuladas, transients expirados, tablas huérfanas y registros innecesarios que incrementan las consultas y reducen la velocidad del sitio.'
              image='/images/optimizacion/base-datos-saturada.webp'
              //href='/contacto'
            />
            <VerticalCard
              title='Hosting mal configurado'
              description='Servidores sin sistemas de caché activos, versiones antiguas de PHP, límites de memoria bajos o infraestructura compartida de bajo rendimiento.'
              image='/images/optimizacion/hosting-mal-configurado.webp'
              //href='/contacto'
            />
            <VerticalCard
              title='Falta de sistema de caché y optimización'
              description='Ausencia de caché de página, minificación de archivos CSS/JS o carga diferida (lazy load), lo que obliga al servidor a generar cada página desde cero.'
              image='/images/optimizacion/falta-sistema-cache-optimizacion.webp'
              //href='/contacto'
            />
          </div>
        </section>

        {/* =====================================================
            OPTIMIZACIÓN — Qué hago exactamente
            ===================================================== */}
        <section className='w-full max-w-[1200px] mx-auto px-5 py-16 space-y-12 border-t border-[var(--border-subtle)]'>
          <div className='text-center space-y-4 max-w-3xl mx-auto'>
            <h2>
              Optimización técnica del sitio
            </h2>
            <p className='text-lg text-[var(--text-secondary)] opacity-90'>
              La optimización va mucho más allá de instalar un plugin. Analizo
              el sitio completo y aplico mejoras reales a nivel técnico.
            </p>
          </div>

          {/* MEJORA CRÍTICA: Cambiado a grid-cols-1 lg:grid-cols-2 para que en mobile no se aplasten las tarjetas horizontales */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <HorizontalCard
              title='Optimización estructural de recursos'
              description='Reorganización de imágenes, scripts y estilos para mejorar los tiempos de carga y fortalecer la salud general del sitio WordPress.'
              image='/images/optimizacion/optimizacion-estructural-recursos.webp'
              href='/blog/optimizacion-estructural-de-recursos'
              target="_blank"
            />
            <HorizontalCard
              title='Implementación estratégica de caché multinivel'
              description='Configuración coordinada entre servidor y aplicación para reducir carga innecesaria y mantener estable la salud técnica del sitio.'
              image='/images/optimizacion/implementacion-estrategica-cache-multinivel.webp'
              href='/blog/implementacion-estrategica-de-cache-multinivel'
              target="_blank"
            />
            <HorizontalCard
              title='Depuración avanzada de base de datos'
              description='Optimización de tablas, consultas e índices para mejorar el rendimiento interno y preservar la salud estructural del sistema.'
              image='/images/optimizacion/depuracion-avanzada-base-datos.webp'
              href='/blog/depuracion-avanzada-de-base-de-datos'
              target="_blank"
            />
            <HorizontalCard
              title='Auditoría técnica de dependencias'
              description='Evaluación del impacto real de plugins y recursos externos para prevenir sobrecargas que afecten la salud y estabilidad del sitio.'
              image='/images/optimizacion/auditoria-tecnica-dependencias.webp'
              href='/blog/auditoria-tecnica-de-dependencias'
              target="_blank"
            />
          </div>
        </section>

        {/* =====================================================
            EXPERIENCIA — Rendimiento enfocado en el usuario
            ===================================================== */}
        <section className='w-full max-w-[1200px] mx-auto px-5 py-16 space-y-12 border-t border-[var(--border-subtle)]'>
          <div className='text-center space-y-4 max-w-3xl mx-auto'>
            <h2>
              Ingeniería de rendimiento web y optimización técnica avanzada
            </h2>
            <p className='text-lg text-[var(--text-secondary)] opacity-90'>
              Diseño y optimizo la arquitectura técnica del sitio para garantizar velocidad real, estabilidad visual y respuesta inmediata. No se trata solo de métricas, sino de cómo el navegador procesa, renderiza e interactúa con cada recurso. Implemento mejoras estructurales que impactan directamente en experiencia de usuario, eficiencia del servidor y capacidad de indexación por motores de búsqueda y modelos de IA.
            </p>
          </div>

          {/* MEJORA CRÍTICA: Igual que arriba, grid-cols-1 en mobile para tarjetas horizontales */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <HorizontalCard
              title='Arquitectura de rendimiento web'
              description='Diseño una arquitectura orientada a minimizar bloqueos, priorizar recursos críticos y optimizar la carga progresiva, asegurando estabilidad, eficiencia técnica y mejor procesamiento por buscadores y modelos generativos.'
              image='/images/optimizacion/arquitectura-de-rendimiento.webp'
              href='/blog/arquitectura-de-rendimiento-web'
              target="_blank"
            />
            <HorizontalCard
              title='Optimización del servidor y tiempos de respuesta'
              description='Reduzco TTFB y latencia mediante configuración avanzada de servidor, caché estratégica, compresión, CDN y mejora de consultas, garantizando entrega rápida y consistente del contenido.'
              image='/images/optimizacion/optimizacion-del-servidor.webp'
              href='/blog/optimizacion-del-servidor-y-tiempos-de-respuesta'
              target="_blank"
            />
            <HorizontalCard
              title='Renderizado y carga crítica optimizada'
              description='Priorizo el contenido visible mediante optimización del critical rendering path, carga diferida y eliminación de recursos bloqueantes, mejorando percepción de velocidad y procesamiento estructural del documento.'
              image='/images/optimizacion/renderizado-y-carga.webp'
              href='/blog/renderizado-y-carga-critica-optimizada'
              target="_blank"
            />
            <HorizontalCard
              title='Estabilidad visual y experiencia interactiva'
              description='Elimino saltos de diseño, bloqueos de interfaz y retrasos en interacción, asegurando fluidez, consistencia visual y comportamiento predecible en distintos dispositivos y condiciones de red.'
              image='/images/optimizacion/estabilidad-visual.webp'
              href='/blog/estabilidad-visual-y-experiencia-interactiva'
              target="_blank"
            />
          </div>
        </section>

        {/* =====================================================
            ACCESO AL SITIO WEB + LOGIN FAKE
            ===================================================== */}
        <section
          className='w-full py-16 sm:py-24 my-0 bg-[var(--bg-tertiary)] border-y border-[var(--border-subtle)]'
          style={{ background: 'var(--bg-hero-gradient)' }}
        >
          <div className='max-w-[1200px] mx-auto px-5 grid gap-12 md:grid-cols-2 items-center'>
            
            {/* COLUMNA IZQUIERDA */}
            <div className='space-y-6'>
              <h2 className='lg:text-left'>
                Acceso al sitio web
              </h2>
              <div className='text-center lg:text-left space-y-4 text-lg text-[var(--text-secondary)]'>
                <p>
                  Para realizar una optimización real y responsable, es
                  necesario acceder al entorno del sitio web.
                </p>
                <p>
                  Esto puede incluir acceso al panel de WordPress y, según el
                  caso, al servidor o sistema de hosting.
                </p>
                <p className='font-medium italic text-[var(--brand-primary)]'>
                  Toda la información se maneja de forma confidencial y se
                  utiliza únicamente para fines técnicos relacionados con tu
                  proyecto.
                </p>
              </div>
            </div>

            {/* COLUMNA DERECHA — Login Fake */}
            {/* MEJORA: Removido bg-white duro para que respete el Modo Oscuro */}
            <div className='w-full max-w-md mx-auto rounded-2xl'>
              <div className='bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 md:p-8 shadow-xl'>
                <FakeWordPressLogin />
              </div>
            </div>
            
          </div>
        </section>

        {/* =====================================================
            CTA FINAL FULL WIDTH
            ===================================================== */}
        <div className='relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] my-0'>
          <GlassCTA
            title='Auditoría de seguridad para tu sitio web'
            description='Antes de intervenir, realizo una auditoría de seguridad para identificar vulnerabilidades y definir la mejor estrategia de limpieza y protección. Esto garantiza una intervención precisa y efectiva.'
            buttonText='Solicitar auditoría de seguridad'
            buttonHref='/contacto'
            disclaimer='Consultoría técnica disponible.'
          />
        </div>
      </main>
    </>
  )
}