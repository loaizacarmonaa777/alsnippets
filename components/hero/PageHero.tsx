'use client'

import React from 'react'
import Image from 'next/image'

/* =====================================================
   PageHero
   - Hero reutilizable para páginas internas
   - Full Width nativo
   - Adaptable a cualquier tema mediante variables CSS
   - PROTOCOLO ALSNIPPETS: Recibe props traducidas
   ===================================================== */

type PageHeroProps = {
  title: string
  subtitle?: string
  image?: string
}

export default function PageHero ({ title, subtitle, image }: PageHeroProps) {
  return (
    <section
      className='
        relative
        w-full
        min-h-[500px] md:min-h-[600px]
        flex items-center justify-center
        overflow-hidden
        bg-[var(--bg-3)]
        /* Padding superior para compensar el menú flotante y la TopBar */
        pt-32 md:pt-40 pb-20
        mt-0 my-0
      '
    >
      {/* =====================================================
          CAPA 1: FONDO (Imagen + Overlay)
          ===================================================== */}
      {image && (
        <>
          <Image
            src={image}
            alt={title}
            fill
            priority
            className='object-cover z-0'
            sizes='100vw'
          />

          {/* OVERLAY ADAPTATIVO (Blindaje Visual) */}
          <div
            className='
              absolute inset-0 z-10 
              transition-colors duration-300 
              bg-[var(--bg-1)]/70 
              backdrop-blur-[2px]
            '
          />
        </>
      )}

      {/* =====================================================
          CAPA 2: CONTENIDO
          ===================================================== */}
      <div className='relative z-20 w-full max-w-[1200px] mx-auto px-6 text-center md:text-left py-16'>
        {/* TITULO */}
        <h1
          className='
          text-4xl md:text-6xl 
          font-bold 
          text-[var(--text-1)] 
          mb-4 
          tracking-tight
        '
        >
          {title}
        </h1>

        {/* SUBTITULO */}
        {subtitle && (
          <p
            className='
            max-w-2xl 
            text-lg md:text-xl 
            leading-relaxed 
            text-[var(--text-2)] 
            transition-colors duration-300
            font-medium
          '
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Línea de división inferior */}
      <div className='absolute bottom-0 left-0 w-full h-[1px] bg-[var(--border-1)] z-20' />
    </section>
  )
}