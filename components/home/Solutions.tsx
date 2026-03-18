'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getDictionary } from '@/i18n/get-dictionary'
import HorizontalCard from '@/components/ui/HorizontalCard'

export default function Solutions ({ lang }: { lang: string }) {
  const [dict, setDict] = useState<any>(null)

  useEffect(() => {
    getDictionary(lang as 'es' | 'en').then(d => setDict(d.home_solutions))
  }, [lang])

  if (!dict) return null
  console.log('🔍 dict en Solutions:', dict)
  console.log('🔍 dict.cta_button:', dict?.cta_button)
  return (
    <section className='w-full space-y-12'>
      {/* Header */}
      <div className='text-center max-w-2xl mx-auto px-4'>
        <h2 className='text-[var(--text-1)] text-3xl md:text-4xl font-bold'>
          {dict.title}
        </h2>
      </div>

      {/* Grid de Tarjetas */}
      <div className='container mx-auto px-4 w-full max-w-[1200px]'>
        <div className='grid gap-8 grid-cols-1 md:grid-cols-2'>
          {dict.items.map((item: any, index: number) => (
            <HorizontalCard
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
              href={item.link}
              linkText={dict.read_more}
              target='_blank'
              lang={lang}
            />
          ))}
        </div>
      </div>

      {/* CTA Secundario */}
      <div className='pt-4 text-center'>
        <Link
          href={`/${lang}/auditoria#form`}
          target='_blank'
          rel='noopener noreferrer'
          className='
            inline-flex items-center justify-center
            px-8 py-3 rounded-full
            text-sm font-bold
            bg-[var(--bg-1)] text-[var(--text-1)] border border-[var(--border-brand)]
            hover:bg-[var(--bg-brand)] hover:text-[var(--text-inverse)] hover:border-transparent
            shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)]
            transition-all duration-300
          '
        >
          {dict.cta_button}
        </Link>
      </div>
    </section>
  )
}
