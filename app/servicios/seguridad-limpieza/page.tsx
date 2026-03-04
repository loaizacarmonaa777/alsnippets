'use client'

import React from 'react'
import PageHero from '@/components/hero/PageHero'
import VerticalCard from '@/components/ui/VerticalCard' // Componente reutilizable cards verticales
import HorizontalCard from '@/components/ui/HorizontalCard' // Componente reutilizable cards Horizontales
import FakeWordPressLogin from '@/components/forms/FakeWordPressLogin' // Importa el formulario de login muestra
import GlassCTA from '@/components/ui/GlassCTA' // Componente reutilizable CTA con fondo de vidrio

/* =====================================================
   Página — Seguridad y Limpieza
===================================================== */

export default function SeguridadLimpiezaPage() {


  return (
    <>
      {/* =====================================================
       HERO — Página Seguridad y Limpieza
       ===================================================== */}
      <PageHero
        title='Seguridad y Limpieza WordPress'
        subtitle='Un sitio WordPress inseguro no solo es un riesgo técnico, también afecta la confianza de tus usuarios y tu posicionamiento. Me encargo de detectar, limpiar y proteger tu web.'
        image='/images/hero/hero-seguridad-limpieza.webp'
      />

      <main className="w-full">
        
        {/* =====================================================
           BLOQUE 1: AMENAZAS (Imágenes Verticales)
           ===================================================== */}
        <section className='w-full max-w-[1200px] mx-auto px-5 py-16 md:py-24 space-y-12'>
          <h2>
            Problemas de seguridad más comunes
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* SE HAN MODIFICADO LAS RUTAS DE LAS IMÁGENES EN ESTE BLOQUE */}
            <VerticalCard
              title='Malware y código malicioso'
              description='Archivos infectados, scripts ocultos o código inyectado que alteran el funcionamiento del sitio, redirigen a páginas externas o roban información. Muchas veces pasan desapercibidos hasta que el daño ya es visible.'
              image="/images/seguridad/malware-codigo-malicioso.webp"
              //href="/contacto"
            />
            <VerticalCard
              title='Sitio en blacklist'
              description='Cuando Google, navegadores o servicios de hosting detectan actividad maliciosa y bloquean el acceso a tu web, mostrando advertencias de “sitio peligroso”. Esto afecta gravemente la reputación y el posicionamiento SEO.'
              image="/images/seguridad/sitio-blacklist.webp"
              //href="/contacto"
            />
            <VerticalCard
              title='Accesos no autorizados'
              description='Intentos de fuerza bruta, credenciales filtradas o usuarios administradores sospechosos que permiten a terceros tomar el control parcial o total del sitio.'
              image="/images/seguridad/accesos-no-autorizados.webp"
              //href="/contacto"
            />
            <VerticalCard
              title='Plugins vulnerables'
              description='Extensiones desactualizadas, nulled o mal desarrolladas que contienen brechas de seguridad conocidas, convirtiéndose en la principal puerta de entrada para ataques.'
              image="/images/seguridad/plugins-vulnerables.webp"
              //href="/contacto"
            />
            <VerticalCard
              title='Configuraciones inseguras'
              description='Permisos incorrectos (CHMOD mal configurado), archivos sensibles expuestos (wp-config, backups, logs), XML-RPC abierto o bases de datos sin protección adecuada.'
              image="/images/seguridad/configuraciones-inseguras.webp"
              //href="/contacto"
            />
            <VerticalCard
              title='Base de datos comprometida'
              description='Inyección de código (SQL injection), creación de usuarios ocultos, spam masivo o contenido malicioso insertado directamente en la base de datos que puede reinfectar el sitio incluso después de una limpieza superficial.'
              image="/images/seguridad/base-datos-comprometida.webp"
              //href="/contacto"
            />
          </div>
        </section>

        {/* =====================================================
           BLOQUE 2: LIMPIEZA (Imágenes Horizontales)
           ===================================================== */}
        <section className='w-full max-w-[1200px] mx-auto px-5 py-16 space-y-12 border-t border-[var(--border-subtle)]'>
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2>
                Limpieza y recuperación del sitio
            </h2>
            <p className='text-lg text-[var(--text-secondary)] opacity-90'>
                Cuando un sitio ha sido comprometido, no basta con “pasar un plugin”. La limpieza debe ser manual, cuidadosa y con criterio técnico.
            </p>
          </div>

          {/* Grid de 4 columnas: Usamos VerticalCard con la imagen horizontal */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
            <HorizontalCard
              title='Eliminación de malware y archivos infectados'
              description='Detección y eliminación manual de scripts maliciosos, puertas traseras (backdoors) y código inyectado en archivos y carpetas del sitio.'
              image="/images/seguridad/eliminacion-malware.webp"
              href="/blog/eliminacion-de-malware-y-archivos-infectados"
              target="_blank"
            />
            <HorizontalCard
              title='Revisión completa de código y BD'
              description='Auditoría técnica de temas, plugins y tablas de la base de datos para localizar usuarios ocultos e inyecciones SQL.'
              image="/images/seguridad/revision-codigo-bd.webp"
              href="/blog/revision-completa-de-codigo-y-bd"
              target="_blank"
            />
            <HorizontalCard
              title='Restauración segura si es necesario'
              description='Recuperación del sitio desde copias de seguridad limpias y verificadas, asegurando que la restauración no arrastre vulnerabilidades.'
              image="/images/seguridad/restauracion-segura.webp"
              href="/blog/restauracion-segura-si-es-necesario"
              target="_blank"
            />
            <HorizontalCard
              title='Refuerzo de accesos y permisos'
              description='Endurecimiento de credenciales, configuración de permisos seguros (CHMOD) y cierre de accesos vulnerables.'
              image="/images/seguridad/refuerzo-accesos-permisos.webp"
              href="/blog/refuerzo-de-accesos-y-permisos"
              target="_blank"
            />
          </div>
        </section>

        {/* =====================================================
           BLOQUE 3: PREVENCIÓN (Imágenes Horizontales)
           ===================================================== */}
        <section className='w-full max-w-[1200px] mx-auto px-5 py-16 space-y-12 border-t border-[var(--border-subtle)]'>
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2>
                Protección y prevención
            </h2>
            <p className='text-lg text-[var(--text-secondary)] opacity-90'>
                Después de la limpieza, implemento medidas para reducir riesgos futuros y mantener el sitio protegido.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
            <HorizontalCard
              title='Endurecimiento de WordPress'
              description='Desactivación de rutas vulnerables, protección de archivos críticos y ajustes estratégicos para reducir superficies de ataque.'
              image="/images/seguridad/endurecimiento-wordpress.webp"
              href="/blog/endurecimiento-de-wordpress"
              target="_blank"
            />
            <HorizontalCard
              title='Configuración de plugins'
              description='Instalación y configuración profesional de herramientas de seguridad bien optimizadas, evitando conflictos.'
              image="/images/seguridad/configuracion-plugins.webp"
              href="/blog/configuracion-de-plugins"
              target="_blank"
            />
            <HorizontalCard
              title='Monitoreo básico de actividad'
              description='Supervisión de accesos, intentos de inicio de sesión y cambios relevantes en el sistema para detectar sospechas.'
              image="/images/seguridad/monitoreo-actividad.webp"
              href="/blog/monitoreo-basico-de-actividad"
              target="_blank"
            />
            <HorizontalCard
              title='Buenas prácticas de actualización'
              description='Gestión controlada de actualizaciones de WordPress, temas y plugins, asegurando compatibilidad y estabilidad.'
              image="/images/seguridad/buenas-practicas-actualizacion.webp"
              href="/blog/buenas-practicas-de-actualizacion"
              target="_blank"
            />
          </div>
        </section>

        {/* =====================================================
            ACCESO AL SITIO WEB + LOGIN FAKE
            ===================================================== */}
        <section className='w-full py-16 sm:py-24 my-0 bg-[var(--bg-tertiary)] border-y border-[var(--border-subtle)]' style={{ background: 'var(--bg-hero-gradient)' }}>
          <div className='max-w-[1200px] mx-auto px-5 grid gap-12 md:grid-cols-2 items-center'>
            
            {/* COLUMNA IZQUIERDA */}
            <div className='space-y-6'>
              <h2 className='text-center lg:text-left'>
                Acceso al sitio web
              </h2>
              <div className="text-center lg:text-left space-y-4 text-lg text-[var(--text-secondary)]">
                <p>
                  Para realizar una optimización real y responsable, es necesario
                  acceder al entorno del sitio web.
                </p>
                <p>
                  Esto puede incluir acceso al panel de WordPress y, según el
                  caso, al servidor o sistema de hosting.
                </p>
                <p className="font-medium italic text-[var(--brand-primary)]">
                  Toda la información se maneja de forma confidencial y se utiliza
                  únicamente para fines técnicos relacionados con tu proyecto.
                </p>
              </div>
            </div>

            {/* COLUMNA DERECHA — Login Fake */}
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
        <div className="relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] my-0">
          <GlassCTA
            title='Auditoría de seguridad para tu sitio web'
            description='Antes de intervenir, realizo una auditoría de seguridad para identificar vulnerabilidades y definir la mejor estrategia de limpieza y protección. Esto garantiza una intervención precisa y efectiva.'
            buttonText='Solicitar auditoría de seguridad'
            buttonHref='/auditoria'
            disclaimer='Consultoría técnica disponible'
          />
        </div>
        
      </main>
    </>
  )
}