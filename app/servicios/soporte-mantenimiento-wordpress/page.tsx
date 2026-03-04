'use client'

import React from 'react'
import PageHero from '@/components/hero/PageHero'
// Asegúrate que estas rutas sean correctas según tu estructura
import VerticalCard from '@/components/ui/VerticalCard'
import IconCard from '@/components/ui/IconCard'
import GlassCTA from '@/components/ui/GlassCTA'

// Iconos
import IconCopiaSeguridad from '@/components/icons/IconCopiaSeguridad'
import IconRevisionCompatibilidad from '@/components/icons/IconRevisionCompatibilidad'
import IconMonitoreoSeguridad from '@/components/icons/IconMonitoreoSeguridad'
import IconSoporteTecnico from '@/components/icons/IconSoporteTecnico'

export default function SoporteMantenimientoPage () {
  return (
    <>
      {/* HERO */}
      <PageHero
        title='Soporte y Mantenimiento WordPress'
        subtitle='No necesitas aprender WordPress. Necesitas que funcione. Me encargo de la seguridad, los errores y la estabilidad de tu sitio para que puedas concentrarte en tu negocio.'
        image='/images/hero/hero-soporte-mantenimiento.webp'
      />

      <main className='w-full max-w-[1200px] mx-auto px-5 pt-12 md:pt-24 pb-0 space-y-32'>
        {/* SECCIÓN 1: PROBLEMAS QUE SOLUCIONO */}
        <section className='space-y-12'>
          <div className='text-center space-y-4'>
            <h2>
              Problemas que soluciono en WordPress
            </h2>
            <h3 className='text-[var(--brand-primary)] font-medium'>
              Soporte técnico experto en Wix, Shopify y las plataformas líderes
            </h3>
            <p className='max-w-2xl mx-auto text-[var(--text-secondary)]'>
              Identifico y resuelvo los obstáculos técnicos que frenan el
              crecimiento de tu web.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* CORRECCIÓN: Añadimos 'href' a todas las cards para evitar el error 'undefined' */}
            <VerticalCard
              title='Errores críticos'
              description='Errores 400, 500, pantallas blancas y fallos que impiden el funcionamiento normal del sitio.'
              image='/images/soporte/errores-criticos.jpg'
              //href='/contacto'
            />
            <VerticalCard
              title='Actualizaciones sin riesgo'
              description='Actualización segura de WordPress, plugins y themes, evitando conflictos y pérdidas de información.'
              image='/images/soporte/actualizaciones-sin-riesgo.jpg'
              //href='/contacto'
            />
            <VerticalCard
              title='Lentitud y rendimiento'
              description='Identificación de cuellos de botella que afectan la velocidad y experiencia del usuario.'
              image='/images/soporte/lentitud-rendimiento.jpg'
              //href='/servicios/optimizacion-rendimiento'
            />
            <VerticalCard
              title='Configuración del servidor'
              description='Revisión de memoria, tiempos de ejecución, SSL, caché y ajustes clave del hosting.'
              image='/images/soporte/configuracion-servidor.jpg'
              //href='/contacto'
            />
            <VerticalCard
              title='Soporte técnico real'
              description='Respuesta clara y directa cuando algo falla, sin tickets eternos ni respuestas genéricas.'
              image='/images/soporte/sopoerte-tecnico-real.webp'
              //href='/contacto'
            />
            <VerticalCard
              title='Bases de datos'
              description='Optimización, respaldo y restauración de bases de datos WordPress para garantizar la integridad de los datos.'
              image='/images/soporte/bases-datos.jpg'
              //href='/contacto'
            />
          </div>
        </section>

        {/* SECCIÓN 2: MANTENIMIENTO RESPONSABLE */}
        <section
          className='w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] py-24 px-5 my-0'
          style={{ background: 'var(--bg-hero-gradient)' }}
        >
          <div className='max-w-[1200px] mx-auto space-y-16'>
            <div className='space-y-6 text-center'>
              <h2>
                Mantenimiento responsable
              </h2>
              <p className='text-lg text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed'>
                El mantenimiento no es solo actualizar por actualizar. Es
                entender el estado del sitio, anticipar problemas y actuar con
                criterio técnico.
              </p>
            </div>

            {/* CORRECCIÓN DE ICONOS: Pasamos la referencia del componente, no el elemento JSX */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              <IconCard
                icon={IconCopiaSeguridad}
                title='Copias de seguridad confiables'
              />
              <IconCard
                icon={IconRevisionCompatibilidad}
                title='Revisión de compatibilidad'
              />
              <IconCard
                icon={IconMonitoreoSeguridad}
                title='Monitoreo básico de seguridad'
              />
              <IconCard
                icon={IconSoporteTecnico}
                title='Soporte técnico cuando lo necesitas'
              />
            </div>
          </div>
        </section>

        {/* SECCIÓN CTA - FULL WIDTH */}
        <div className='relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] my-0'>
          <GlassCTA
            title='Empieza por una auditoría WordPress'
            description='Antes de intervenir cualquier sitio, realizo una auditoría técnica para evaluar el estado real de tu WordPress o CMS y definir el mejor camino.'
            buttonText='Solicitar auditoría'
            buttonHref='/auditoria'
            disclaimer='Consultoría técnica disponible.'
          />
        </div>
      </main>
    </>
  )
}
