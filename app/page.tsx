import React from 'react'
import Hero from '@/components/home/Hero'
import Benefits, { BenefitItem } from '@/components/home/Benefits'
import Authority from '@/components/home/Authority'
import Solutions from '@/components/home/Solutions'
import ProjectsPreview from '@/components/home/ProjectsPreview'
import BlogPreview from '@/components/home/BlogPreview'
import StackLogos from '@/components/shared/StackLogos'
import CTA from '@/components/home/CTA'

/* =====================================================
   DATA: Configuración de Beneficios (Static Data)
   ===================================================== */
const BENEFITS_DATA: BenefitItem[] = [
  {
    title: 'Análisis y Protección contra ataques',
    image: '/images/home/card-proteccion-contra-ataques-home.webp',
    description: 'La falta de protección expone tu sitio a riesgos.',
    chips: [
      'Malware',
      'Virus',
      'Backdoors',
      'Fuerza bruta',
      'Robo de datos',
      'Accesos no autorizados',
      'Sitio comprometido'
    ]
  },
  {
    title: 'Actualizaciones controladas',
    image: '/images/home/card-actualizaciones-controladas-home.webp',
    description: 'Actualizar sin control impacta más de lo que imaginas.',
    chips: [
      'Incompatibilidad',
      'Errores críticos',
      'Pantalla blanca',
      'Fallos de plugins',
      'Conflictos versión',
      'Errores PHP',
      'Caídas del sitio'
    ]
  },
  {
    title: 'Copias de seguridad confiables',
    image: '/images/home/card-copias-seguridad-home.webp',
    description:
      'Sin copias funcionales, cualquier error puede convertirse en un desastre.',
    chips: [
      'Pérdidas',
      'Backups rotos',
      'Fallos de restauración',
      'Datos irrecuperables',
      'Cambios perdidos',
      'Caídas'
    ]
  },
  {
    title: 'Optimización de velocidad y carga',
    image: '/images/home/card-optimizacion-velocidad-home.webp',
    description:
      'No identificar los cuellos de botella afecta rendimiento y experiencia.',
    chips: [
      'Carga lenta',
      'CLS elevado',
      'LCP deficiente',
      'TTFB alto',
      'Scripts bloqueantes',
      'Imágenes pesadas',
      'Mala experiencia móvil'
    ]
  },
  {
    title: 'Acompañamiento en todo el proceso',
    image: '/images/home/card-acompanamiento-proceso-home.webp',
    description:
      'Conmigo cada decisión técnica tiene respaldo, criterio y seguimiento.',
    chips: [
      'Decisiones técnicas',
      'Dudas constantes',
      'Cambios urgentes',
      'Soporte humano',
      'Comunicación directa',
      'Respuesta rápida',
      'Tranquilidad operativa'
    ]
  },
  {
    title: 'Los errores son parte del proceso',
    image: '/images/home/card-errores-proceso-home.webp',
    description:
      'WordPress no es solo no-code: se necesita experiencia para resolver.',
    chips: [
      'Errores 404',
      'Errores 500',
      'Conflictos',
      'Fallos en servidor',
      'Fallos del Layout',
      'Bugs inesperados',
      'Diagnóstico técnico'
    ]
  }
]

/* =====================================================
   Home Page
   ===================================================== */
export default function HomePage () {
  return (
    <>
      {/* 1. HERO (Full Width) */}
      <section>
        <Hero />
      </section>

      {/* 2. CONTENIDO PRINCIPAL */}
      <main>
        {/* SECCIÓN 1: TU WORDPRESS ESTABLE */}
        <section className='w-full py-10 md:py-16 px-4'>
          <div className='container mx-auto max-w-[1200px] space-y-16'>
            {/* Header Texto */}
            <div className='text-center max-w-2xl mx-auto space-y-4'>
              <h2>Tu WordPress estable, seguro y rápido</h2>
              <p className='text-lg text-[var(--text-secondary)] opacity-90 leading-relaxed'>
                La tecnología no es infalible. Mi trabajo es anticipar
                problemas, reducir riesgos y responder de forma clara cuando
                algo ocurre.
              </p>
            </div>

            {/* Grid Beneficios */}
            <Benefits title='' items={BENEFITS_DATA} />
          </div>
        </section>

        {/* SECCIÓN 2: TRABAJO DIRECTO SIN INTERMEDIARIOS */}
        <section>
          <Authority />
        </section>

        {/* SECCIÓN 3: QUE PROBLEMAS TIENE TU WORDPRESS */}
        <section>
          <Solutions />
        </section>

        {/* SECCIÓN 4: PROYECTOS Y CREACIONES */}
        <section className='my-0'>
          <ProjectsPreview />
        </section>

        {/* =========================
          SECCIÓN 5: STACK LOGOS
          ========================= */}
        <section className='my-0'>
          <StackLogos />
        </section>

        {/* SECCIÓN 6: BLOG */}
        <section className='my-0'>
          <BlogPreview />
        </section>

        {/* SECCIÓN 7: CTA FINAL */}
        <div className='my-0'>
          <CTA />
        </div>
      </main>
    </>
  )
}
