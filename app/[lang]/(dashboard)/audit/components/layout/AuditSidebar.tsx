'use client'

import React from 'react'
import {
  LayoutDashboard,
  ShieldCheck,
  Zap,
  Search,
  BarChart3,
  FileText,
  Settings,
  ChevronRight,
  Globe,
  Database,
  MousePointer2,
  Code2,
  Activity
} from 'lucide-react'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

interface AuditSidebarProps {
  dict: any
  activeSection?: string
  onSectionChange?: (section: string) => void
}

export default function AuditSidebar({
  dict,
  activeSection = 'SEO',
  onSectionChange
}: AuditSidebarProps) {
  
  // Agregamos la propiedad 'icon' a cada objeto para solucionar el error de TS
  const menuItems = [
    { id: 'SEO', label: 'SEO', icon: <Search size={18} /> },
    { id: 'GEO', label: 'GEO', icon: <Globe size={18} /> },
    { id: 'SEGURIDAD', label: 'Seguridad', icon: <ShieldCheck size={18} /> },
    { id: 'TECNOLOGIAS', label: 'Tecnologías', icon: <Code2 size={18} /> },
    { id: 'TRACKING Y ANALYTICS', label: 'Tracking & Analytics', icon: <BarChart3 size={18} /> },
    { id: 'RENDIMIENTO Y PERFORMANCE', label: 'Rendimiento', icon: <Zap size={18} /> },
    { id: 'UX', label: 'UX', icon: <MousePointer2 size={18} /> },
    { id: 'INFRAESTRUCTURA Y OPERACIONES', label: 'Infraestructura', icon: <Database size={18} /> }
  ]

  return (
    <aside className='hidden lg:flex flex-col w-72 h-screen bg-[var(--bg-1)] border-r border-[var(--border-1)] sticky top-0 z-50'>
      {/* Header del Sidebar */}
      <div className='p-8'>
        <h2 className='text-[var(--text-1)] font-black text-xl tracking-tighter flex items-center gap-2'>
          <div className='w-8 h-8 rounded-lg bg-[var(--bg-brand)] flex items-center justify-center shadow-[var(--shadow-brand-glow)]'>
            <ShieldCheck className='text-[var(--text-4)]' size={18} />
          </div>
          {dict.header?.title || 'Audit PRO'}
        </h2>
        <p className='text-[var(--text-3)] text-[10px] uppercase font-bold tracking-[0.2em] mt-2 opacity-70'>
          {dict.header?.subtitle || 'Intelligence Suite'}
        </p>
      </div>

      {/* Navegación Principal */}
      <nav className='flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar'>
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => onSectionChange?.(item.id)}
            className={clsx(
              'w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group',
              activeSection === item.id
                ? 'bg-[var(--bg-brand-hover)] border border-[var(--border-brand)] text-[var(--text-brand)]'
                : 'text-[var(--text-3)] hover:bg-[var(--bg-2)] hover:text-[var(--text-1)] border border-transparent'
            )}
          >
            <div className='flex items-center gap-3'>
              <span
                className={clsx(
                  'transition-transform duration-300 group-hover:scale-110',
                  activeSection === item.id
                    ? 'text-[var(--text-brand)]'
                    : 'text-[var(--text-3)]'
                )}
              >
                {item.icon}
              </span>
              <span className='text-sm font-bold tracking-tight'>
                {item.label}
              </span>
            </div>
            {activeSection === item.id && (
              <motion.div layoutId='activeIndicator'>
                <ChevronRight size={14} strokeWidth={3} />
              </motion.div>
            )}
          </button>
        ))}
      </nav>

      {/* Footer del Sidebar: Status del Escaneo */}
      <div className='p-6 mt-auto border-t border-[var(--border-1)] bg-[var(--bg-2)]/50'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <span className='text-[var(--text-3)] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2'>
              <Activity size={10} className="text-[var(--bg-success)]" />
              Motor de Análisis
            </span>
            <span className='flex h-2 w-2 rounded-full bg-[var(--bg-success)] animate-pulse' />
          </div>

          <div className='space-y-1'>
            <p className='text-[var(--text-1)] text-xs font-black'>
              Versión 2.0.4-Stable
            </p>
            <p className='text-[var(--text-3)] text-[10px]'>
              Actualizado: Hoy, 2026
            </p>
          </div>

          <button className='flex items-center justify-center gap-2 p-3 rounded-xl bg-[var(--bg-3)] border border-[var(--border-1)] text-[var(--text-1)] text-xs font-bold hover:shadow-[var(--shadow-1)] transition-all'>
            <FileText size={14} />
            Exportar Logs
          </button>
        </div>
      </div>
    </aside>
  )
}