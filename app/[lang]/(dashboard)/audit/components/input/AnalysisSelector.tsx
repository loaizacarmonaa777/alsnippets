'use client'

import React from 'react'
import { Shield, Globe, Zap, Cpu } from 'lucide-react'
import { clsx } from 'clsx'

export default function AnalysisSelector() {
  const options = [
    { id: 'security', icon: <Shield size={16} />, label: 'Seguridad' },
    { id: 'seo', icon: <Globe size={16} />, label: 'SEO/LLM' },
    { id: 'performance', icon: <Zap size={16} />, label: 'WPO' },
    { id: 'deep', icon: <Cpu size={16} />, label: 'Deep Scan' },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.id}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-1)] bg-[var(--bg-1)] text-[var(--text-3)] text-xs font-bold hover:border-[var(--border-brand)] hover:text-[var(--text-brand)] transition-all"
        >
          {opt.icon}
          {opt.label}
        </button>
      ))}
    </div>
  )
}