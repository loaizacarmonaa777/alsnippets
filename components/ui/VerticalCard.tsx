'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

/* =====================================================
   TIPOS DE DATOS
   ===================================================== */
export type CardTag = {
  text: string
  variant?: 'success' | 'error' | 'neutral' | 'brand'
}

interface VerticalCardProps {
  title: string
  description: string
  image?: string
  tags?: CardTag[]
  href?: string
  className?: string
  highlight?: boolean
  lang?: string // Inyectado para consistencia de rutas si fuera necesario
}

/* =====================================================
   HELPER: Estilos de los Tags (Lógica Sensible)
   ===================================================== */
function getTagStyles (variant: CardTag['variant'] = 'neutral') {
  switch (variant) {
    case 'success':
      return 'border-[var(--bg-success)]/30 bg-[var(--bg-success)]/10 text-[var(--text-success)]'
    case 'error':
      return 'border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400'
    case 'brand':
      return 'border-[var(--border-brand)] bg-[var(--bg-brand)]/10 text-[var(--text-brand)]'
    case 'neutral':
    default:
      return 'border-[var(--border-1)] bg-[var(--bg-3)] text-[var(--text-2)]'
  }
}

/* =====================================================
   VerticalCard (Componente UI)
   - PROTOCOLO ALSNIPPETS: Blindaje Visual y Estructural
   ===================================================== */
export default function VerticalCard ({
  title,
  description,
  image,
  tags = [],
  href,
  className = '',
  highlight = false,
  lang
}: VerticalCardProps) {
  
  // Normalización de ruta si existe lang (Lógica Sensible)
  const localizedHref = href && lang ? (href.startsWith('/') ? `/${lang}${href}` : href) : href;

  // Clases base (Blindaje Visual Absoluto)
  const containerClasses = `
    group relative flex flex-col w-full h-full
    bg-[var(--bg-1)] border border-[var(--border-1)]
    rounded-2xl
    shadow-[var(--shadow-1)] transition-all duration-300 ease-out
    
    /* Efecto de elevación corporativo */
    hover:border-[var(--border-brand)]
    hover:-translate-y-1
    
    /* Aura dinámica: shadow-2 en luz, Aura Amarilla en Dark */
    hover:shadow-[var(--shadow-2)]
    dark:hover:shadow-[var(--shadow-brand-glow-hover)]

    /* Lógica condicional de resaltado (Highlight) */
    ${
      highlight
        ? 'bg-[var(--bg-brand-hover)] border-2 border-[var(--border-brand)] shadow-[var(--shadow-brand-glow)]'
        : 'bg-[var(--bg-1)] border border-[var(--border-1)] shadow-[var(--shadow-1)]'
    }
    
    ${href ? 'cursor-pointer' : ''}
    ${className}
  `

  const cardContent = (
    <>
      {/* 1. IMAGEN */}
      {image && image.trim() !== '' && (
        <div className='relative h-56 w-full bg-[var(--bg-3)] overflow-hidden shrink-0 rounded-t-2xl'>
          <Image
            src={image}
            alt={title}
            fill
            className='object-cover transition-transform duration-700 ease-in-out group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
      )}

      {/* 2. BODY */}
      <div className='flex flex-col flex-grow p-5 md:p-6 text-center'>
        <h3 className='text-xl md:text-2xl font-bold text-[var(--text-1)] mb-3 group-hover:text-[var(--text-brand)] transition-colors !my-0'>
          {title}
        </h3>

        <p className='text-base text-[var(--text-2)] leading-relaxed mb-6'>
          {description}
        </p>

        {/* 3. FOOTER (Tags) */}
        {tags && tags.length > 0 && (
          <div className='mt-auto flex flex-wrap justify-center gap-2'>
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`
                  px-2.5 py-1 rounded-full text-sm font-bold border cursor-default
                  transition-colors duration-200
                  ${getTagStyles(tag.variant)}
                `}
              >
                {tag.text}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  )

  const isValidLink = localizedHref && localizedHref.trim() !== ''

  if (isValidLink) {
    return (
      <Link href={localizedHref as string} className={containerClasses}>
        {cardContent}
      </Link>
    )
  }

  return <article className={containerClasses}>{cardContent}</article>
}