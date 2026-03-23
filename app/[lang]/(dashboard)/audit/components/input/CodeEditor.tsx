'use client'

import React from 'react'

interface CodeEditorProps {
  value: string
  onChange: (val: string) => void
  placeholder?: string
}

export default function CodeEditor({ value, onChange, placeholder }: CodeEditorProps) {
  return (
    <div className="relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden border border-[var(--border-white-4)] bg-[var(--bg-inverse)] group transition-all focus-within:border-[var(--border-brand)]">
      <div className="absolute top-0 left-0 right-0 h-8 bg-black/30 flex items-center px-4 gap-2 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
        </div>
        <span className="text-[10px] text-[var(--text-white-4)] font-mono uppercase tracking-widest">Source Scanner v3.0</span>
      </div>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Pega el código aquí..."}
        className="w-full h-full pt-12 p-6 bg-transparent text-[var(--text-white-2)] font-mono text-sm outline-none resize-none selection:bg-[var(--bg-brand)] selection:text-[var(--text-inverse)]"
        spellCheck={false}
      />
    </div>
  )
}