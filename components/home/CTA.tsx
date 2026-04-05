'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { getDictionary } from '@/i18n/get-dictionary'

export default function CTA ({ lang }: { lang: string }) {
  const [dict, setDict] = useState<any>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    getDictionary(lang as 'es' | 'en').then(d => setDict(d.home_cta))
  }, [lang])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const div = divRef.current
    const rect = div.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = () => setOpacity(1)
  const handleMouseLeave = () => setOpacity(0)

  if (!dict) return null

  return (
    <section className='w-full my-0 py-32 px-4 md:px-0 animate-gradient-cta flex items-center justify-center'>
      {/* TARJETA DE CRISTAL (Blindaje Visual) */}
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='
          relative w-full max-w-5xl mx-auto 
          rounded-3xl overflow-hidden shadow-[var(--shadow-2)]
          bg-[var(--bg-1)]/20 dark:bg-[var(--bg-1)]/50
          backdrop-blur-xl
          border border-[var(--border-brand)]
          transition-all duration-300
        '
      >
        {/* Spotlight Effect (Lógica Sensible Blindada) */}
        <div
          className='pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0'
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, var(--bg-brand-hover), transparent 40%)`
          }}
        />

        {/* CONTENIDO BILINGÜE */}
        <div className='relative z-10 flex flex-col items-center text-center px-6 py-16 md:py-20 space-y-8'>
          <h2 className='text-3xl md:text-5xl font-bold text-[var(--text-1)] tracking-tight max-w-3xl drop-shadow-sm'>
            {dict.title}
          </h2>

          <p className='text-lg md:text-xl text-[var(--text-2)] max-w-2xl mx-auto leading-relaxed font-medium'>
            {dict.description}
          </p>

          <div className='pt-6 flex flex-col items-center space-y-4'>
            <Link
              href={`/${lang}/auditoria#form`}
              className='
                group relative inline-flex items-center justify-center px-8 py-4 
                text-lg font-bold rounded-full overflow-hidden shadow-[var(--shadow-1)]
                transition-all duration-300 ease-in-out
                bg-[var(--bg-2)] text-[var(--text-brand)]
                border border-[var(--border-brand)]
                hover:bg-[var(--bg-inverse)] 
                hover:border-[var(--border-brand)]
                hover:-translate-y-1 hover:shadow-[var(--shadow-2)]
              '
            >
              {/* Shimmer Effect */}
              <div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none' />

              <span className='relative z-10 mr-2 group-hover:text-[var(--text-inverse)] transition-all duration-300'>
                {dict.button}
              </span>

              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--text-inverse)]'
              >
                <path
                  fillRule='evenodd'
                  d='M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z'
                  clipRule='evenodd'
                />
              </svg>
            </Link>

            <p className='text-sm text-[var(--text-1)] font-medium pt-2'>
              {dict.footer_note}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}