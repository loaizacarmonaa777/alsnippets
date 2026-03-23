'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ScoreGuageProps {
  value: number // 0 a 100
}

export default function ScoreGuage({ value }: ScoreGuageProps) {
  // Radio y circunferencia del arco
  const radius = 80
  const stroke = 12
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  
  // Solo queremos mostrar medio círculo (un arco de 180 grados)
  // Pero para que se vea más pro, usaremos un arco de 240 grados (estilo velocímetro)
  const arcLength = 240 
  const strokeDashoffset = circumference - (value / 100) * (circumference * (arcLength / 360))

  // Color dinámico basado en el valor
  const getColor = (val: number) => {
    if (val < 40) return '#ef4444' // Rojo error
    if (val < 70) return 'var(--text-brand)' // Tu dorado brand
    return 'var(--bg-success)' // Tu verde success
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-48">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-[210deg]" // Rotamos para centrar el arco de 240deg
      >
        {/* Círculo de fondo (el carril gris) */}
        <circle
          stroke="var(--bg-3)"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference * (arcLength / 360)} ${circumference}`}
          strokeLinecap="round"
          style={{ strokeDashoffset: 0 }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Arco de progreso animado */}
        <motion.circle
          stroke={getColor(value)}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference * (arcLength / 360)} ${circumference}`}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="drop-shadow-[0_0_8px_rgba(0,0,0,0.2)]"
        />
      </svg>

      {/* Texto Central */}
      <div className="absolute inset-0 flex flex-col items-center justify-center mt-4">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black text-[var(--text-1)]"
        >
          {Math.round(value)}
        </motion.span>
        <span className="text-[var(--text-3)] text-[10px] font-bold uppercase tracking-widest">
          Salud Web
        </span>
      </div>

      {/* Indicadores de min/max */}
      <div className="absolute bottom-4 w-full flex justify-between px-10 text-[var(--text-3)] text-[10px] font-bold">
        <span>0</span>
        <span>100</span>
      </div>
    </div>
  )
}