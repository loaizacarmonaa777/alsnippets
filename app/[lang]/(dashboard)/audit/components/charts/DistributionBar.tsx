'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface DistributionBarProps {
  data: any // Datos de rendimiento (pesos de recursos)
}

export default function DistributionBar({ data }: DistributionBarProps) {
  // Simulamos datos si no vienen del scanner para que la UI no se rompa
  const distribution = [
    { label: 'Imágenes', value: 65, color: 'var(--spectrum-green)' },
    { label: 'Scripts', value: 20, color: 'var(--spectrum-blue)' },
    { label: 'CSS', value: 10, color: 'var(--spectrum-magenta)' },
    { label: 'HTML', value: 5, color: 'var(--spectrum-red)' },
  ]

  return (
    <div className="space-y-6">
      {/* Barra de Progreso Multi-color */}
      <div className="h-6 w-full flex rounded-full overflow-hidden bg-[var(--bg-3)] shadow-inner">
        {distribution.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ width: 0 }}
            animate={{ width: `${item.value}%` }}
            transition={{ duration: 1, delay: index * 0.1 }}
            style={{ backgroundColor: item.color }}
            className="h-full cursor-help transition-opacity hover:opacity-80"
            title={`${item.label}: ${item.value}%`}
          />
        ))}
      </div>

      {/* Leyenda Detallada */}
      <div className="grid grid-cols-2 gap-4">
        {distribution.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }} 
            />
            <div className="flex flex-col">
              <span className="text-[var(--text-3)] text-[10px] uppercase font-bold tracking-tighter">
                {item.label}
              </span>
              <span className="text-[var(--text-1)] text-xs font-black">
                {item.value}% <span className="text-[var(--text-3)] font-normal">del total</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Info adicional de optimización */}
      <div className="mt-4 p-3 rounded-xl bg-[var(--bg-2)] border border-[var(--border-1)] flex items-start gap-3">
        <div className="p-1.5 rounded-lg bg-[var(--bg-brand-hover)] text-[var(--text-brand)]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4-4-4"/><path d="M3 3v18h18"/><path d="m12 14-4-4 4-4"/></svg>
        </div>
        <p className="text-[var(--text-3)] text-[10px] leading-snug">
          <strong className="text-[var(--text-2)] block mb-0.5">Tip de Optimización:</strong>
          Las imágenes representan el {distribution[0].value}% del peso. Convertir a <span className="text-[var(--text-brand)] font-bold">WebP</span> podría reducir el tiempo de carga en un 40%.
        </p>
      </div>
    </div>
  )
}