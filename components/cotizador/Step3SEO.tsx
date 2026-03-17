'use client'

import React from 'react'
import { ChevronLeft, Send, Search } from 'lucide-react'
import type { CotizadorData } from './CotizadorApp'

interface Step3SEOProps {
  formData: CotizadorData
  updateFormData: (data: Partial<CotizadorData>) => void
  onPrev: () => void
  onFinalize: () => void
  isSubmitting: boolean
  lang: string
  dict: any // 👈 Recibido desde CotizadorApp (cotizador_step3_seo.json)
}

/* =====================================================
   Step 3: Posicionamiento SEO
   - PROTOCOLO ALSNIPPETS: Consumo de Diccionario Externo
   ===================================================== */
export default function Step3SEO ({
  formData,
  updateFormData,
  onPrev,
  onFinalize,
  isSubmitting,
  lang,
  dict: t // 👈 Mapeamos dict a 't' para mantener compatibilidad con el JSX
}: Step3SEOProps) {
  return (
    <div className='space-y-8 animate-fade-in pb-4'>
      {/* HEADER DE PASO */}
      <div className='flex items-center gap-2 mb-2'>
        <button
          onClick={onPrev}
          className='text-[var(--text-2)] hover:text-[var(--text-brand)] transition-colors p-2 -ml-2 rounded-lg hover:bg-[var(--bg-3)]'
        >
          <ChevronLeft className='w-5 h-5' />
        </button>
        <div>
          <h3 className='text-2xl font-bold text-[var(--text-1)]'>{t?.head}</h3>
          <p className='text-[var(--text-2)]'>{t?.sub}</p>
        </div>
      </div>

      {/* TARJETA DE CONTENIDO (Blindaje Visual) */}
      <div className='bg-[var(--bg-1)] p-6 md:p-8 rounded-2xl border border-[var(--border-1)]'>
        <div className='flex gap-4'>
          <Search className='w-6 h-6 text-[var(--text-brand)] flex-shrink-0 mt-1' />
          <div className='flex-grow'>
            <h5 className='font-bold text-[var(--text-1)] mb-2'>
              {t?.question}
            </h5>
            <p className='text-sm text-[var(--text-2)] leading-relaxed mb-6'>
              {t?.desc}
            </p>
            <textarea
              placeholder={t?.placeholder}
              value={formData.descripcionProyecto}
              onChange={e =>
                updateFormData({ descripcionProyecto: e.target.value })
              }
              className='w-full p-4 rounded-xl bg-[var(--bg-3)] border border-[var(--border-1)] focus:border-[var(--border-brand)] outline-none transition-colors text-[var(--text-1)] placeholder-[var(--text-3)] resize-none h-32 text-sm'
            />
          </div>
        </div>
      </div>

      {/* BOTÓN DE FINALIZACIÓN (Lógica Sensible Blindada) */}
      <div className='pt-4 flex justify-end'>
        <button
          disabled={isSubmitting || formData.descripcionProyecto.length < 10}
          onClick={onFinalize}
          className='flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 bg-[var(--bg-success)] text-[var(--text-inverse)] rounded-xl font-bold hover:brightness-110 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:pointer-events-none shadow-[var(--shadow-1)]'
        >
          {isSubmitting ? t?.wait : t?.btn}
          <Send className='w-5 h-5' />
        </button>
      </div>
    </div>
  )
}
