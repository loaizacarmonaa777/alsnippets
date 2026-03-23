'use client'

import React from 'react'
import { TrendingUp, DollarSign, Clock, Zap, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'

interface AIBusinessImpactProps {
  data: any // Viene del businessImpact del LLM
  dict: any
}

export default function AIBusinessImpact({ data, dict }: AIBusinessImpactProps) {
  if (!data) return null

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Encabezado con Icono de IA */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[var(--bg-brand)] shadow-[var(--shadow-brand-glow)]">
          <Zap size={20} className="text-[var(--text-4)]" />
        </div>
        <h3 className="text-[var(--text-white-1)] font-bold text-lg leading-tight">
          {dict.sections?.business || 'Impacto de Negocio'}
          <span className="block text-[var(--text-white-5)] text-[10px] uppercase tracking-widest font-black mt-1">
            Análisis de IA Generativa
          </span>
        </h3>
      </div>

      {/* Resumen Ejecutivo */}
      <div className="bg-[var(--border-white-4)]/10 p-4 rounded-2xl border border-[var(--border-white-4)]/20">
        <p className="text-[var(--text-white-2)] text-sm leading-relaxed italic">
          "{data.executiveSummary || 'El sitio presenta fugas de conversión debido a tiempos de carga excesivos y riesgos de seguridad latentes.'}"
        </p>
      </div>

      {/* Grid de Métricas de Negocio */}
      <div className="grid grid-cols-1 gap-4">
        {/* Pérdida Estimada */}
        <div className="flex items-center gap-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <div className="p-2 rounded-full bg-red-500/20">
            <AlertTriangle size={18} className="text-red-400" />
          </div>
          <div>
            <p className="text-[var(--text-white-4)] text-[10px] uppercase font-bold tracking-tighter">Pérdida Anual Estimada</p>
            <p className="text-red-400 font-black text-lg">
              -${data.estimatedLossAnnual || '1,200'} <span className="text-[10px] uppercase font-medium">USD</span>
            </p>
          </div>
        </div>

        {/* Mejora de Conversión */}
        <div className="flex items-center gap-4 p-3 rounded-xl bg-[var(--bg-success)]/10 border border-[var(--bg-success)]/20">
          <div className="p-2 rounded-full bg-[var(--bg-success)]/20">
            <TrendingUp size={18} className="text-[var(--text-success)]" />
          </div>
          <div>
            <p className="text-[var(--text-white-4)] text-[10px] uppercase font-bold tracking-tighter">Potencial de Conversión</p>
            <p className="text-[var(--text-success)] font-black text-lg">
              +{data.conversionImprovement || '15'}%
            </p>
          </div>
        </div>
      </div>

      {/* Footer de Acción: Costo y Tiempo */}
      <div className="mt-auto pt-6 border-t border-[var(--border-white-4)]/20">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <span className="text-[var(--text-white-4)] text-[10px] uppercase font-bold tracking-widest">Inversión Sugerida</span>
            <span className="text-[var(--text-white-5)] font-black text-xl leading-none">
              {data.suggestedBudget || '500€ - 800€'}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[var(--text-white-4)] text-[10px] uppercase font-bold tracking-widest">Tiempo de Entrega</span>
            <div className="flex items-center gap-1 justify-end text-[var(--text-white-1)] font-bold">
              <Clock size={14} />
              <span>{data.estimatedHours || '10'} Horas</span>
            </div>
          </div>
        </div>
        
        <button className="w-full py-3 rounded-xl bg-[var(--bg-brand)] text-[var(--text-4)] font-bold text-sm shadow-[var(--shadow-brand-glow)] hover:shadow-[var(--shadow-brand-glow-hover)] transition-all active:scale-95 uppercase tracking-widest">
           Agendar Optimización
        </button>
      </div>
    </div>
  )
}