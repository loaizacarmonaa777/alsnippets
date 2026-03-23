'use client'

import React from 'react'
import { 
  Eye, MousePointer2, Smartphone, 
  Type, CheckCircle2, AlertCircle, 
  Layers, Paintbrush 
} from 'lucide-react'
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip 
} from 'recharts'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface UXDetailViewProps {
  data: any
  dict: any
}

export default function AnalyticsDetailView({ data }: UXDetailViewProps) {
  // Datos simulados que vendrán de la API de Accesibilidad de Google
  const accessibilityScore = 85; 
  
  const uxMetrics = [
    { name: 'Contraste', value: 92, color: 'var(--bg-success)' },
    { name: 'Navegación', value: 70, color: 'var(--bg-brand)' },
    { name: 'Tap Targets', value: 45, color: 'var(--spectrum-red)' },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER DE SECCIÓN - USANDO TUS TOKENS */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1 bg-[var(--bg-1)] p-6 rounded-3xl border border-[var(--border-1)] shadow-[var(--shadow-2)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.clsx bg-[var(--bg-brand-hover)] text-[var(--text-brand)] rounded-xl">
              <Eye size={20} />
            </div>
            <h3 className="text-[var(--text-1)] font-black uppercase tracking-tighter text-lg">Auditoría de Experiencia (UX)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GRÁFICO DE ACCESIBILIDAD */}
            <div className="h-[200px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={uxMetrics}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {uxMetrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-1)', borderColor: 'var(--border-1)', borderRadius: '12px' }}
                    itemStyle={{ color: 'var(--text-1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-[var(--text-1)]">{accessibilityScore}</span>
                <span className="text-[10px] font-bold text-[var(--text-3)] uppercase">Puntaje UX</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[var(--text-2)] text-sm leading-relaxed">
                El análisis detecta la facilidad con la que un usuario interactúa con los elementos críticos (CTAs) y la legibilidad del contenido.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] text-[10px] font-bold rounded-full uppercase">WCAG 2.1 Compliant</span>
                <span className="px-3 py-1 bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] text-[10px] font-bold rounded-full uppercase">Mobile Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GRILLA DE PUNTOS CRÍTICOS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UXCard 
          icon={<MousePointer2 size={18} />} 
          title="Tap Targets" 
          status="critical"
          desc="Botones demasiado juntos en móvil. Riesgo de clics accidentales elevado."
        />
        <UXCard 
          icon={<Paintbrush size={18} />} 
          title="Contraste de Color" 
          status="optimal"
          desc="Excelente legibilidad. El texto cumple con el ratio 4.5:1 exigido."
        />
        <UXCard 
          icon={<Type size={18} />} 
          title="Jerarquía Visual" 
          status="warning"
          desc="Uso inconsistente de etiquetas H1-H3. Afecta la lectura rápida."
        />
      </div>

      {/* TABLA DE RESOLUCIÓN TÉCNICA */}
      <div className="bg-[var(--bg-inverse)] rounded-3xl overflow-hidden border border-[var(--border-inverse)]">
        <div className="p-4 border-b border-[var(--border-white-4)] flex items-center gap-2">
            <Layers size={16} className="text-[var(--text-white-5)]" />
            <h4 className="text-[var(--text-white-1)] font-bold uppercase text-xs tracking-widest">Protocolo de Mejora UX</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody className="text-[var(--text-white-2)] text-xs">
              <tr className="border-b border-[var(--border-white-4)] hover:bg-white/5 transition-colors">
                <td className="p-4 font-bold text-[var(--text-white-5)]">Diseño Responsivo</td>
                <td className="p-4">Superposición de elementos en 360px (Móvil).</td>
                <td className="p-4 italic">Ajustar Media Queries y Flex-wrap.</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-bold text-[var(--text-white-5)]">Accesibilidad</td>
                <td className="p-4">Faltan atributos ARIA en el menú lateral.</td>
                <td className="p-4 italic">Implementar roles de navegación.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function UXCard({ icon, title, status, desc }: { icon: any, title: string, status: 'optimal' | 'warning' | 'critical', desc: string }) {
  const statusColors = {
    optimal: 'text-[var(--bg-success)]',
    warning: 'text-[var(--text-brand)]',
    critical: 'text-[var(--spectrum-red)]'
  }

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-[var(--bg-1)] p-5 rounded-2xl border border-[var(--border-1)] shadow-[var(--shadow-1)] flex flex-col gap-3"
    >
      <div className={twMerge("flex items-center gap-2 font-black uppercase text-[10px]", statusColors[status])}>
        {status === 'optimal' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
        {status}
      </div>
      <div className="flex items-center gap-2 text-[var(--text-1)] font-bold">
        {icon}
        <span className="text-sm">{title}</span>
      </div>
      <p className="text-[var(--text-3)] text-xs leading-snug">{desc}</p>
    </motion.div>
  )
}