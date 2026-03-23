'use client'

import React from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface ConflictViewerProps {
  originalCode?: string
  detectedIssue?: string
}

export default function ConflictViewer({ originalCode, detectedIssue }: ConflictViewerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-[300px]">
      {/* Lado Infectado */}
      <div className="flex flex-col rounded-2xl border border-red-500/20 bg-red-500/5 overflow-hidden">
        <div className="p-3 bg-red-500/10 flex items-center justify-between">
          <span className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-2">
            <AlertCircle size={14} /> Código Infectado
          </span>
        </div>
        <pre className="p-4 text-[10px] font-mono text-red-400 overflow-auto whitespace-pre-wrap">
          {detectedIssue || 'Analizando amenazas...'}
        </pre>
      </div>

      {/* Lado Propuesto (Limpio) */}
      <div className="flex flex-col rounded-2xl border border-[var(--bg-success)]/20 bg-[var(--bg-success)]/5 overflow-hidden">
        <div className="p-3 bg-[var(--bg-success)]/10 flex items-center justify-between">
          <span className="text-[10px] font-black text-[var(--text-success)] uppercase tracking-widest flex items-center gap-2">
            <CheckCircle2 size={14} /> Solución Propuesta
          </span>
        </div>
        <pre className="p-4 text-[10px] font-mono text-[var(--text-success)] overflow-auto whitespace-pre-wrap">
          {'// Código saneado y optimizado por ALSNIPPETS v3.0'}
        </pre>
      </div>
    </div>
  )
}