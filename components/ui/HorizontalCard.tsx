'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface HorizontalCardProps {
  title: string
  description: string
  image?: string
  href?: string
  linkText?: string
  className?: string
  target?: string
  lang: string // <-- Obligatorio para rutas bilingües
}

/* =====================================================
   HorizontalCard
   - Tarjeta con disposición horizontal (imagen izquierda/contenido derecha)
   - PROTOCOLO ALSNIPPETS: Blindaje visual y lógica de rutas i18n
   ===================================================== */

export default function HorizontalCard ({
  title,
  description,
  image,
  href,
  linkText,
  className = '',
  target,
  lang
}: HorizontalCardProps) {
  const normalizedLang = lang.replace(/^\//, '')

  // PROTOCOLO ALSNIPPETS: Traducción local para valores por defecto (Lógica Sensible)
  const t = {
    es: { defaultLink: '¿De qué se trata?' },
    en: { defaultLink: 'What is it about?' }
  }[lang as 'es' | 'en'] || { defaultLink: '¿De qué se trata?' }

  const activeLinkText = linkText || t.defaultLink

  // Localizamos el href si existe y es una ruta interna (Blindaje de Lógica)
  const localizedHref = href?.startsWith('http')
    ? href
    : href
    ? `/${normalizedLang}${href.startsWith('/') ? '' : '/'}${href}`
    : undefined

  const cardClasses = `
    group relative 
    flex flex-col md:flex-row 
    bg-[var(--bg-1)]
    border border-[var(--border-brand)]
    rounded-2xl
    shadow-[var(--shadow-1)]
    hover:-translate-y-1
    transition-all duration-300 ease-out
    hover:border-[var(--border-brand)]
    overflow-hidden 
    hover:shadow-[var(--shadow-brand-glow-hover)]
    ${className}
  `

  const CardContent = (
    <>
      {image && (
        <div className='relative w-full h-56 md:h-auto md:w-48 shrink-0 bg-[var(--bg-3)] overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none'>
          <Image
            src={image}
            alt={title}
            fill
            className='object-cover transition-transform duration-700 ease-in-out group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, 200px'
          />
        </div>
      )}

      <div className='p-6 flex flex-col justify-center space-y-3 flex-grow text-left'>
        <h3 className='text-xl font-bold text-[var(--text-1)] group-hover:text-[var(--text-brand)] transition-colors !my-0'>
          {title}
        </h3>

        <p className='text-sm text-[var(--text-2)] leading-relaxed'>
          {description}
        </p>

        {href && (
          <div className='pt-2 flex items-center text-sm font-bold text-[var(--text-brand)]'>
            <span className='group-hover:underline underline-offset-4 decoration-2'>
              {activeLinkText}
            </span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2.5}
              stroke='currentColor'
              className='w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'
              />
            </svg>
          </div>
        )}
      </div>
    </>
  )

  if (localizedHref) {
    return (
      <Link
        href={localizedHref}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={cardClasses}
      >
        {CardContent}
      </Link>
    )
  }

  return <div className={cardClasses}>{CardContent}</div>
}
