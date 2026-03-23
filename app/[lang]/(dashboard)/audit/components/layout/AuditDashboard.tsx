'use client'

import React, { useState } from 'react'
import AuditSidebar from './AuditSidebar'
import AuditGrid from './AuditGrid'
import { Globe, Code2, Lock, Zap, Search, Activity } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AuditDashboard ({
  dict,
  lang
}: {
  dict: any
  lang: string
}) {
  const [activeTab, setActiveTab] = useState('SEO')
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState(false)

  // FUNCIÓN MAESTRA CORREGIDA: Apunta a /api/pagespeed
  const handleStartAnalysis = async (value: string, type: 'url' | 'code') => {
    if (!value) return

    // 1. Resetear datos anteriores y activar loading
    setData({})
    setLoading(true)

    try {
      let result

      if (type === 'code') {
        // CASO CÓDIGO: Solo scanner interno (No llamamos a Google)
        const response = await fetch('/api/auditoria', {
          // Usamos la ruta de auditoría para código
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: value, type: 'code' })
        })
        result = await response.json()
      } else {
        // CASO URL: Motor unificado (Google + Scanner)
        const response = await fetch(
          `/api/pagespeed?url=${encodeURIComponent(value)}`
        )
        result = await response.json()
      }

      if (result) {
        setData(result)
        const confetti = (await import('canvas-confetti')).default
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      // 2. Garantizamos que el loading se apague SIEMPRE
      setLoading(false)
    }
  }

  return (
    <div className='flex h-screen bg-[var(--bg-body)] overflow-hidden'>
      <AuditSidebar
        activeSection={activeTab}
        onSectionChange={setActiveTab}
        dict={dict}
      />

      <div className='flex-1 flex flex-col min-w-0 pt-[150px]'>
        <header className='h-20 bg-[var(--bg-1)] border-b border-[var(--border-1)] flex items-center px-6 gap-4 shadow-sm z-10'>
          <div className='flex-1 flex items-center bg-[var(--bg-2)] rounded-xl border border-[var(--border-1)] px-4 py-2 group focus-within:border-[var(--border-brand)] transition-all'>
            <Globe
              size={18}
              className={
                loading
                  ? 'animate-spin text-[var(--text-brand)]'
                  : 'text-[var(--text-3)] group-focus-within:text-[var(--text-brand)]'
              }
            />
            <input
              type='text'
              placeholder='https://tu-sitio-web.com'
              className='bg-transparent border-none outline-none w-full ml-3 text-sm text-[var(--text-1)]'
              onKeyDown={e => {
                if (e.key === 'Enter')
                  handleStartAnalysis(e.currentTarget.value, 'url')
              }}
            />
          </div>

          <div className='flex-1 flex items-center bg-[var(--bg-inverse)] rounded-xl px-4 py-2 group border border-transparent focus-within:border-[var(--border-brand)] transition-all'>
            <Code2 size={18} className='text-[var(--text-white-4)]' />
            <input
              type='text'
              placeholder='Pega el código fuente aquí...'
              className='bg-transparent border-none outline-none w-full ml-3 text-sm text-[var(--text-white-2)]'
              onKeyDown={e => {
                if (e.key === 'Enter')
                  handleStartAnalysis(e.currentTarget.value, 'code')
              }}
            />
          </div>

          <button className='flex items-center gap-2 px-6 py-2 bg-[var(--bg-brand)] text-[var(--text-4)] rounded-xl font-bold hover:shadow-[var(--shadow-brand-glow)] transition-all active:scale-95'>
            <Lock size={16} />
            <span>Acceso Privilegiado</span>
          </button>
        </header>

        <main className='flex-1 overflow-y-auto p-6 bg-[var(--bg-2)]/30 relative'>
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='absolute inset-0 z-50 flex items-center justify-center bg-[var(--bg-body)]/60 backdrop-blur-sm'
              >
                <div className='flex flex-col items-center gap-4 p-8 bg-[var(--bg-1)] rounded-3xl border border-[var(--border-1)] shadow-[var(--shadow-brand-glow)]'>
                  <Activity
                    size={40}
                    className='text-[var(--text-brand)] animate-bounce'
                  />
                  <p className='text-[var(--text-1)] font-black uppercase text-xs tracking-[0.3em]'>
                    Ejecutando Auditoría PRO...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className='max-w-[1600px] mx-auto'>
            <AuditGrid
              activeSection={activeTab}
              data={data || {}}
              dict={dict}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
