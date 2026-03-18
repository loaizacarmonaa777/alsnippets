'use client'

import React from 'react'
import Link from 'next/link'

interface IconCardProps {
  icon: React.ElementType<any>
  title: string
  description?: string
  href?: string
  lang: string // <--- PROTOCOLO ALSNIPPETS: Obligatorio para rutas bilingües
}

/* =====================================================
   IconCard
   - Tarjeta centrada con icono, título y descripción
   - PROTOCOLO ALSNIPPETS: Blindaje visual y lógica i18n
   ===================================================== */

export default function IconCard ({
  icon: Icon,
  title,
  description,
  href,
  lang
}: IconCardProps) {
  // Localizamos el href si existe y es una ruta interna (Lógica Sensible Blindada)
  const normalizedLang = lang.replace(/^\//, '')
  const localizedHref = href?.startsWith('http')
    ? href 
    : href?.startsWith(`/${normalizedLang}`)
    ? href 
    : href?.startsWith('/')
    ? `/${normalizedLang}${href}`
    : href 
    ? `/${normalizedLang}/${href}`
    : undefined

  // Guardamos el diseño de la tarjeta (Blindaje Visual intacto)
  const cardContent = (
    <div
      className='
        group relative 
        bg-[var(--bg-1)]
        rounded-xl 
        p-8 
        flex flex-col items-center justify-center text-center
        min-h-[260px]
        h-full
        shadow-[var(--shadow-1)]
        border border-[var(--border-1)]
        
        transition-all duration-500 ease-in-out
        hover:-translate-y-2 
        hover:shadow-[var(--shadow-2)]
        hover:border-[var(--border-brand)]/30
      '
    >
      {/* CÍRCULO DEL ICONO */}
      <div
        className='
        mb-6 
        w-24 h-24 
        rounded-full 
        flex items-center justify-center
        transition-all duration-500 ease-in-out
        
        bg-[var(--bg-3)] 
        text-[var(--text-brand)]
        
        group-hover:bg-[var(--bg-brand)] 
        group-hover:text-[var(--text-inverse)]
        group-hover:shadow-[var(--shadow-brand-glow-hover)]
      '
      >
        <Icon className='w-12 h-12 transition-transform duration-500 group-hover:scale-110' />
      </div>

      {/* TÍTULO */}
      <p className='font-bold text-lg text-[var(--text-1)] transition-colors duration-300'>
        {title}
      </p>

      {/* DESCRIPCIÓN */}
      {description && (
        <p className='mt-3 text-sm text-[var(--text-2)] opacity-90 leading-relaxed'>
          {description}
        </p>
      )}
    </div>
  )

  // Renderizado condicional basado en la presencia de enlace
  if (localizedHref) {
    return (
      <Link href={localizedHref} className='block h-full outline-none'>
        {cardContent}
      </Link>
    )
  }

  return cardContent
}
