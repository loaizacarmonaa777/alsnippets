'use client'

import React from 'react'
import VerticalCard, { CardTag } from '@/components/ui/VerticalCard'

/* =====================================================
   Tipos
   ===================================================== */
export type BenefitItem = {
  title: string
  description: string
  chips: string[]
  image?: string
  highlight?: boolean
}

type BenefitsProps = {
  title?: string
  items: BenefitItem[]
  lang: string
}

/* =====================================================
   Helper: Lógica de Colores (Lógica Sensible)
   ===================================================== */
const getTagVariant = (text: string): CardTag['variant'] => {
  // PROTOCOLO ALSNIPPETS: Mantenemos paridad bilingüe en la lógica de identificación
  const positives = [
    'Decisiones técnicas',
    'Technical decisions',
    'Dudas constantes',
    'Constant doubts',
    'Cambios urgentes',
    'Urgent changes',
    'Soporte humano',
    'Human support',
    'Comunicación directa',
    'Direct communication',
    'Respuesta rápida',
    'Quick response',
    'Tranquilidad operativa',
    'Operational peace of mind',
    'Solución experta',
    'Expert solution'
  ]

  // Blindaje de diseño: Se mantiene el estilo neutral según configuración visual original
  return positives.includes(text) ? 'neutral' : 'neutral'
}

/* =====================================================
   Componente Benefits
   ===================================================== */
export default function Benefits ({ title, items, lang }: BenefitsProps) {
  return (
    <section className='w-full space-y-12'>
      {/* Título dinámico */}
      {title && (
        <div className='text-center max-w-3xl mx-auto px-4'>
          <h2 className='text-[var(--text-1)]'>{title}</h2>
        </div>
      )}

      {/* Grid de Beneficios (Blindaje Visual) */}
      <div className='container mx-auto px-4'>
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center'>
          {items.map((item, index) => {
            // Formateo de chips para VerticalCard
            const formattedTags: CardTag[] = item.chips.map(chip => ({
              text: chip,
              variant: getTagVariant(chip)
            }))

            return (
              <li key={index} className='w-full max-w-md flex'>
                <VerticalCard
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  tags={formattedTags}
                  highlight={item.highlight}
                  lang={lang}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}