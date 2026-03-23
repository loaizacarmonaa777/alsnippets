'use client'

import React, { useState } from 'react'
import { Code2, Globe, Search, Terminal, Loader2 } from 'lucide-react' // Añadimos Loader2
import { clsx } from 'clsx'
import { TypeAnimation } from 'react-type-animation'
import { scanSourceCode } from '@/lib/audit/scanner' // Importamos tu motor

interface SourceCodeEditorProps {
  dict: any
  onAuditComplete: (data: any) => void // Nueva prop para comunicar resultados
}

export default function SourceCodeEditor({ dict, onAuditComplete }: SourceCodeEditorProps) {
  const [mode, setMode] = useState<'url' | 'code'>('url')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleStartAudit = async () => {
    if (!content) return
    setIsLoading(true)

    try {
      if (mode === 'code') {
        // --- MODO CÓDIGO: Análisis local inmediato ---
        // Simulamos un pequeño delay para que la animación de carga se vea profesional
        setTimeout(() => {
          const results = scanSourceCode(content)
          onAuditComplete(results)
          setIsLoading(false)
        }, 2000)
      } else {
        // --- MODO URL: Llamada a tu API route.ts ---
        const response = await fetch('/api/auditoria', {
          method: 'POST',
          body: JSON.stringify({ url: content, lang: 'es' }), // Ajustar según necesites
        })
        const data = await response.json()
        onAuditComplete(data)
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error en la auditoría:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full h-full flex flex-col space-y-4">
      {/* Selector de Modo */}
      <div className="flex bg-[var(--bg-3)] p-1 rounded-xl w-fit">
        <button
          onClick={() => !isLoading && setMode('url')}
          className={clsx(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
            mode === 'url' ? "bg-[var(--bg-1)] text-[var(--text-brand)] shadow-[var(--shadow-1)]" : "text-[var(--text-3)]",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
        >
          <Globe size={16} />
          {dict.modes?.basic || 'URL Pública'}
        </button>
        <button
          onClick={() => !isLoading && setMode('code')}
          className={clsx(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
            mode === 'code' ? "bg-[var(--bg-1)] text-[var(--text-brand)] shadow-[var(--shadow-1)]" : "text-[var(--text-3)]",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
        >
          <Code2 size={16} />
          {dict.modes?.advanced || 'Código Fuente'}
        </button>
      </div>

      {/* Área de Entrada */}
      <div className="relative flex-1 group">
        {mode === 'url' ? (
          <div className="relative">
            <input
              type="text"
              disabled={isLoading}
              placeholder="https://tu-sitio-web.com"
              className="w-full p-4 pl-12 rounded-2xl bg-[var(--bg-2)] border border-[var(--border-2)] text-[var(--text-1)] focus:border-[var(--border-3)] focus:ring-[var(--focus-ring)] outline-none transition-all disabled:opacity-70"
              onChange={(e) => setContent(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-3)]" size={20} />
          </div>
        ) : (
          <div className="relative h-48 md:h-full min-h-[200px]">
            <textarea
              disabled={isLoading}
              placeholder="Pega aquí el HTML, PHP o JavaScript para un análisis profundo..."
              className="w-full h-full p-4 pt-12 rounded-2xl bg-[var(--bg-inverse)] text-[var(--text-white-2)] font-mono text-sm border border-[var(--border-white-4)] focus:border-[var(--border-white-5)] outline-none transition-all resize-none disabled:opacity-70"
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="absolute top-3 left-4 flex items-center gap-2 text-[var(--text-white-4)] text-xs uppercase tracking-widest pointer-events-none">
              <Terminal size={14} />
              <span>Deep Scan Console</span>
            </div>
          </div>
        )}
      </div>

      {/* Botón de Acción con Animación */}
      <div className="flex items-center justify-between gap-4">
        <div className="hidden md:block text-[var(--text-3)] text-xs">
          {isLoading ? (
            <div className="flex items-center gap-2 text-[var(--text-brand)] font-medium">
              <Loader2 className="animate-spin" size={14} />
              <span>Ejecutando motores de búsqueda...</span>
            </div>
          ) : (
            <TypeAnimation
              sequence={[
                'Detectando malware...', 2000,
                'Analizando jerarquía SEO...', 2000,
                'Buscando código muerto...', 2000,
                'Calculando impacto ROI...', 2000,
              ]}
              repeat={Infinity}
            />
          )}
        </div>
        <button 
          onClick={handleStartAudit}
          disabled={!content || isLoading}
          className="w-full md:w-auto px-8 py-3 rounded-xl bg-[var(--bg-brand)] text-[var(--text-4)] font-bold shadow-[var(--shadow-brand-glow)] hover:shadow-[var(--shadow-brand-glow-hover)] disabled:opacity-50 disabled:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 className="animate-spin" size={18} />}
          {isLoading ? 'Analizando...' : (dict.buttons?.analyze || 'Iniciar Auditoría')}
        </button>
      </div>
    </div>
  )
}