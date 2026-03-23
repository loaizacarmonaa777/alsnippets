'use client'

import React from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts'

interface RadarMetricsProps {
  data: any // Recibe el objeto AuditResult o parcial
}

export default function RadarMetrics({ data }: RadarMetricsProps) {
  // Mapeamos los datos para Recharts
  // Si no hay datos reales, usamos valores por defecto (0) para la animación inicial
  const chartData = [
    { subject: 'Seguridad', A: data?.security?.malwareDetected ? 30 : 95, fullMark: 100 },
    { subject: 'WPO', A: data?.performance?.overall || 70, fullMark: 100 },
    { subject: 'SEO', A: data?.seo?.title ? 85 : 40, fullMark: 100 },
    { subject: 'UX', A: 80, fullMark: 100 }, // Valor ejemplo o calculado
    { subject: 'Negocio', A: data?.businessImpact?.conversionImprovement ? 90 : 50, fullMark: 100 },
  ]

  return (
    <div className="w-full h-full min-h-[250px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid 
            stroke="var(--border-2)" 
            strokeDasharray="3 3" 
          />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: 'var(--text-3)', fontSize: 10, fontWeight: 'bold' }} 
          />
          <Radar
            name="Auditoría"
            dataKey="A"
            stroke="var(--text-brand)"
            fill="var(--text-brand)"
            fillOpacity={0.35}
            animationBegin={500}
            animationDuration={1500}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}