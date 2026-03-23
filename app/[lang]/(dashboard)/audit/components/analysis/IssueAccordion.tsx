'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  ShieldAlert,
  Search,
  Image as ImageIcon
} from 'lucide-react'
import { clsx } from 'clsx'

interface Issue {
  id: string
  title: string
  description: string
  severity: string // Cambiar de tipos fijos a string
  category: string // Cambiar de tipos fijos a string
  recommendation: string
}

interface IssueAccordionProps {
  vulnerabilities: any[]
  seo: any
  dict: any
}

export default function IssueAccordion ({
  vulnerabilities,
  seo,
  dict
}: IssueAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  // Mapeo de estilos por severidad usando tus variables
  const severityStyles = {
    critical: {
      icon: <ShieldAlert className='text-red-500' size={20} />,
      bg: 'bg-red-500/5',
      border: 'border-red-500/20',
      text: 'text-red-500'
    },
    high: {
      icon: <AlertCircle className='text-orange-500' size={20} />,
      bg: 'bg-orange-500/5',
      border: 'border-orange-500/20',
      text: 'text-orange-500'
    },
    medium: {
      icon: <AlertTriangle className='text-[var(--text-brand)]' size={20} />,
      bg: 'var(--bg-brand-hover)',
      border: 'var(--border-brand)',
      text: 'var(--text-brand)'
    },
    low: {
      icon: <Info className='text-blue-500' size={20} />,
      bg: 'bg-blue-500/5',
      border: 'border-blue-500/20',
      text: 'text-blue-500'
    },
    success: {
      icon: <CheckCircle2 className='text-[var(--text-success)]' size={20} />,
      bg: 'bg-[var(--bg-success)]/5',
      border: 'bg-[var(--bg-success)]/20',
      text: 'var(--text-success)'
    }
  }

  // Combinamos vulnerabilidades y SEO en un solo array para el acordeón
  const allIssues = [
    // Mapeo de Vulnerabilidades de Seguridad
    ...(vulnerabilities || []).map((v, i) => ({
      id: `vuln-${i}`,
      title: v.message,
      description:
        'Riesgo de seguridad identificado mediante escaneo de patrones.',
      severity: v.severity as 'low' | 'medium' | 'high' | 'critical', // Forzamos el tipo de tu types.ts
      category: 'security' as const, // Esto ahora es un literal para este componente
      recommendation: 'Revisar integridad de archivos y permisos.'
    })),

    // Caso de SEO
    ...(seo?.imgAltMissing > 0
      ? [
          {
            id: 'seo-img',
            title: `Imágenes sin ALT`,
            description: `Hay ${seo.imgAltMissing} imágenes sin descripción.`,
            severity: 'medium' as const,
            category: 'seo' as const,
            recommendation: 'Añadir etiquetas ALT a todas las imágenes.'
          }
        ]
      : [])
  ]

  return (
    <div className='space-y-3'>
      {allIssues.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-10 text-[var(--text-3)]'>
          <CheckCircle2
            size={48}
            className='text-[var(--bg-success)] mb-4 opacity-20'
          />
          <p>No se encontraron problemas críticos en esta sección.</p>
        </div>
      ) : (
        allIssues.map(issue => (
          <div
            key={issue.id}
            className={clsx(
              'rounded-2xl border transition-all duration-300 overflow-hidden',
              severityStyles[issue.severity as keyof typeof severityStyles]
                .border,
              openId === issue.id
                ? 'bg-[var(--bg-2)] shadow-[var(--shadow-1)]'
                : 'bg-[var(--bg-1)]'
            )}
          >
            <button
              onClick={() => setOpenId(openId === issue.id ? null : issue.id)}
              className='w-full flex items-center justify-between p-4 text-left'
            >
              <div className='flex items-center gap-4'>
                {
                  severityStyles[issue.severity as keyof typeof severityStyles]
                    .icon
                }
                <div>
                  <h4 className='text-[var(--text-1)] font-bold text-sm leading-tight'>
                    {issue.title}
                  </h4>
                  <span
                    className={clsx(
                      'text-[10px] uppercase font-black tracking-widest',
                      severityStyles[
                        issue.severity as keyof typeof severityStyles
                      ].text
                    )}
                  >
                    {issue.category} • {issue.severity}
                  </span>
                </div>
              </div>
              <motion.div
                animate={{ rotate: openId === issue.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={18} className='text-[var(--text-3)]' />
              </motion.div>
            </button>

            <AnimatePresence>
              {openId === issue.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className='px-4 pb-4 pt-0 border-t border-[var(--border-1)] mt-2'>
                    <div className='py-4 space-y-4'>
                      <div>
                        <p className='text-[var(--text-3)] text-[10px] uppercase font-bold mb-1'>
                          Descripción del problema
                        </p>
                        <p className='text-[var(--text-2)] text-sm'>
                          {issue.description}
                        </p>
                      </div>

                      <div className='p-3 rounded-xl bg-[var(--bg-3)] border border-[var(--border-1)]'>
                        <p className='text-[var(--text-1)] text-[10px] uppercase font-bold mb-1 flex items-center gap-2'>
                          <Search
                            size={12}
                            className='text-[var(--text-brand)]'
                          />
                          Acción Recomendada
                        </p>
                        <p className='text-[var(--text-2)] text-xs font-medium'>
                          {issue.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))
      )}
    </div>
  )
}
