'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface TechStackListProps {
  stack: string[] // Array de slugs de tecnologías (ej: ['wordpress', 'woocommerce', 'cloudflare'])
  isWP?: boolean
}

// Mapeo de nombres amigables para mostrar (Opcional, si quieres transformar slugs)
const techNames: Record<string, string> = {
  'wordpress': 'WordPress CMS',
  'woocommerce': 'WooCommerce',
  'cloudflare': 'Cloudflare CDN',
  'elementor': 'Elementor Builder',
  'contact-form-7': 'Contact Form 7',
  'yoast-seo': 'Yoast SEO',
  // Agrega más según detecte tu scanner
}

export default function TechStackList({ stack, isWP }: TechStackListProps) {
  // Si no hay tecnologías detectadas, mostramos un estado vacío elegante
  if (!stack || stack.length === 0 && !isWP) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-8 border-2 border-dashed border-[var(--border-1)] rounded-2xl">
        <p className="text-[var(--text-3)] text-sm italic">No se detectaron tecnologías específicas</p>
      </div>
    )
  }

  // Si es WordPress pero el array de plugins está vacío, forzamos el logo de WP
  const finalStack = isWP && !stack.includes('wordpress') ? ['01-wordpress', ...stack] : stack

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {finalStack.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-2)] border border-[var(--border-1)] hover:border-[var(--border-3)] transition-colors group"
          >
            {/* Contenedor del Logo */}
            <div className="relative w-8 h-8 flex-shrink-0 bg-[var(--bg-1)] rounded-lg p-1.5 shadow-[var(--shadow-1)] group-hover:shadow-[var(--shadow-brand-glow)] transition-all">
              <Image
                src={`/logos/stack/${item.includes('-') ? item : item}.svg`} 
                alt={item}
                fill
                className="object-contain p-1"
                onError={(e) => {
                  // Fallback si no encuentra el logo específico
                  (e.target as any).src = '/globe.svg'
                }}
              />
            </div>

            {/* Nombre de la Tecnología */}
            <div className="flex flex-col min-w-0">
              <span className="text-[var(--text-1)] text-xs font-bold truncate">
                {techNames[item] || item.replace(/-/g, ' ')}
              </span>
              <span className="text-[var(--text-5)] text-[10px] font-medium uppercase tracking-tighter">
                Detectado
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Indicador de Capa de Acceso */}
      <div className="mt-6 p-3 rounded-lg bg-[var(--bg-brand-hover)] border border-[var(--border-brand)] flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[var(--bg-brand)] animate-pulse" />
        <p className="text-[var(--text-5)] text-[11px] font-bold leading-none">
          {isWP ? 'Ecosistema WordPress Identificado' : 'Análisis de Código Fuente Estándar'}
        </p>
      </div>
    </div>
  )
}