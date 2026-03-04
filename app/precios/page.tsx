import React from 'react'
import PageHero from '@/components/hero/PageHero'
import VerticalCard from '@/components/ui/VerticalCard'
import HorizontalCard from '@/components/ui/HorizontalCard'
import GlassCTA from '@/components/ui/GlassCTA'
import CotizadorApp from '@/components/cotizador/CotizadorApp'

/* =====================================================
   Página — Precios
===================================================== */

export default function PreciosPage () {
  return (
    <>
      {/* HERO */}
      <PageHero
        title='Precios y forma de trabajo'
        subtitle='Cada proyecto es distinto. Por eso no trabajo con precios genéricos ni paquetes cerrados sin entender primero el contexto real.'
        image='/images/hero/hero-precios.webp'
      />

      {/* CALCULADORA (FULL WIDTH) */}
      <div
        className='relative w-full py-20 border-b border-[var(--border-subtle)]'
        style={{ background: 'var(--bg-hero-gradient)' }}
      >
        <section className='max-w-4xl mx-auto px-5 !mb-0'>
          <div className='max-w-2xl mx-auto mb-10'>
            {/* Hereda estilos de base.css (text-center, text-5xl, etc.) */}
            <h2>Cotiza tu proyecto ahora mismo</h2>
            <p className='text-center opacity-90'>
              Responde estas breves preguntas para generar un estimado en
              tiempo real basado en tus necesidades técnicas y geolocalización.
            </p>
          </div>

          <CotizadorApp />
        </section>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main className='max-w-[1200px] mx-auto px-5 pt-20'>
        
        {/* FILOSOFÍA */}
        <section>
          <div className='max-w-3xl mx-auto mb-12'>
            <h2>¿Cómo se define el precio de un proyecto?</h2>
            <p className='text-center'>
              El precio de un servicio técnico no depende solo del número de
              páginas o de instalar un plugin. Depende del estado actual del
              sitio, su complejidad y los objetivos que se quieren alcanzar.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <VerticalCard
              title='Estado del sitio web'
              description='Evaluamos la deuda técnica actual, la calidad del código y la salud del servidor antes de intervenir.'
              image='/images/precios/estado-sitio-web.webp'
            />
            <VerticalCard
              title='Nivel de personalización'
              description='No es lo mismo usar plantillas prefabricadas que desarrollar soluciones a medida desde cero.'
              image='/images/precios/nivel-personalizacion.webp'
            />
            <VerticalCard
              title='Complejidad técnica'
              description='Integraciones con APIs, pasarelas de pago o migraciones complejas requieren un análisis profundo.'
              image='/images/precios/complejidad-tecnica.webp'
            />
            <VerticalCard
              title='Trabajo manual'
              description='Limpieza exhaustiva de bases de datos, optimización de imágenes o reestructuración de URLs.'
              image='/images/precios/trabajo-manual.webp'
            />
            <VerticalCard
              title='Riesgos y responsabilidad'
              description='Proyectos en producción con tráfico activo requieren entornos de prueba y protocolos de seguridad estrictos.'
              image='/images/precios/riesgos-responsabilidad.webp'
            />
            <VerticalCard
              title='Implementación de código personalizado'
              description='Desarrollo de funcionalidades específicas que no están disponibles en plugins o temas estándar.'
              image='/images/precios/implementacion-codigo-personalizado.webp'
            />
          </div>
        </section>

        {/* TRANSPARENCIA */}
        <section className='border-t border-[var(--border-subtle)] pt-12'>
          <h2>Transparencia desde el inicio</h2>
          <div className='space-y-4 text-center'>
            <p>
              Antes de iniciar cualquier trabajo, realizo una revisión técnica
              para entender el proyecto y proponer una solución realista.
            </p>
            <p>
              Esto permite definir tiempos, prioridades y un presupuesto acorde al
              alcance real, evitando sorpresas durante el proceso.
            </p>
          </div>
        </section>

        {/* OPCIONES */}
        <section className="border-t border-[var(--border-subtle)] pt-12">
          <div className='mb-12'>
            <h2>Formas de trabajo</h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
            <HorizontalCard
              title='Servicios a medida'
              description='Ideal para proyectos específicos, mejoras puntuales o desarrollos con requerimientos particulares.'
              image='/images/precios/servicios-medida.webp'
            />
            <HorizontalCard
              title='Auditoría WordPress'
              description='El primer paso recomendado para conocer el estado real de tu sitio antes de intervenir.'
              image='/images/precios/auditoria-wordpress.webp'
            />
          </div>
        </section>

        {/* SECCIÓN CTA (Rompe el contenedor para ir de lado a lado) */}
        <div className='relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] my-0'>
          <GlassCTA
            title='Empieza por una auditoría WordPress'
            description='Antes de intervenir cualquier sitio, realizo una auditoría técnica para evaluar el estado real de tu WordPress o CMS y definir el mejor camino.'
            buttonText='Solicitar auditoría'
            buttonHref='/auditoria'
            disclaimer='Consultoría técnica disponible para España, USA y Latinoamérica.'
            className='!my-0'
          />
        </div>

      </main>
    </>
  )
}