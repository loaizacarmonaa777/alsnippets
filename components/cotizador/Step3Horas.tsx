'use client'

import React from 'react'
import { ChevronLeft, Send, Code, PenTool } from 'lucide-react'
import type { CotizadorData } from './CotizadorApp'

interface Step3HorasProps {
  formData: CotizadorData
  updateFormData: (data: Partial<CotizadorData>) => void
  onPrev: () => void
  onFinalize: () => void
  isSubmitting: boolean
  lang: string
  dict: any // 👈 Recibido desde CotizadorApp (cotizador_step3_horas.json)
}

/* =====================================================
   Step 3: Bolsa de Horas
   - PROTOCOLO ALSNIPPETS: Blindaje visual y lógica de paquetes
   ===================================================== */
export default function Step3Horas({
  formData,
  updateFormData,
  onPrev,
  onFinalize,
  isSubmitting,
  lang,
  dict: t // 👈 Mapeamos dict a 't' para mantener compatibilidad con el JSX
}: Step3HorasProps) {

  const paquetesHoras = [5, 10, 20, 40]

  return (
    <div className='space-y-8 animate-fade-in pb-4'>
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

      {/* Grid de Selección de Perfil (Blindaje Visual) */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <button
          onClick={() => updateFormData({ tipoHoras: 'No-Code' })}
          className={`p-6 rounded-2xl border-2 text-left transition-all ${
            formData.tipoHoras === 'No-Code'
              ? 'border-[var(--border-brand)] bg-[var(--bg-brand)]/10 shadow-[var(--shadow-brand-glow-hover)]'
              : 'border-[var(--border-1)] bg-[var(--bg-1)] hover:border-[var(--border-brand)]/30'
          }`}
        >
          <h4 className={`text-xl font-bold mb-2 ${formData.tipoHoras === 'No-Code' ? 'text-[var(--text-brand)]' : 'text-[var(--text-1)]'}`}>
            {t?.noCodeT}
          </h4>
          <p className='text-sm text-[var(--text-2)]'>{t?.noCodeD}</p>
        </button>

        <button
          onClick={() => updateFormData({ tipoHoras: 'Code' })}
          className={`p-6 rounded-2xl border-2 text-left transition-all ${
            formData.tipoHoras === 'Code'
              ? 'border-[var(--border-brand)] bg-[var(--bg-brand)]/10 shadow-[var(--shadow-brand-glow-hover)]'
              : 'border-[var(--border-1)] bg-[var(--bg-1)] hover:border-[var(--border-brand)]/30'
          }`}
        >
          <div className='flex items-center justify-between mb-2'>
            <h4 className={`text-xl font-bold ${formData.tipoHoras === 'Code' ? 'text-[var(--text-brand)]' : 'text-[var(--text-1)]'}`}>
              {t?.codeT}
            </h4>
            <Code className={`w-5 h-5 ${formData.tipoHoras === 'Code' ? 'text-[var(--text-brand)]' : 'text-[var(--text-2)]'}`} />
          </div>
          <p className='text-sm text-[var(--text-2)]'>{t?.codeD}</p>
        </button>
      </div>

      {/* Paquetes de Horas (Lógica Sensible) */}
      {formData.tipoHoras !== '' && (
        <div className='animate-fade-in pt-6 border-t border-[var(--border-1)]'>
          <h5 className='font-bold text-[var(--text-1)] mb-4'>{t?.qHours}</h5>
          <div className='flex flex-wrap gap-3'>
            {paquetesHoras.map(horas => (
              <button
                key={horas}
                onClick={() => updateFormData({ cantidadHoras: horas })}
                className={`py-3 px-6 rounded-xl font-bold border-2 transition-all ${
                  formData.cantidadHoras === horas
                    ? 'bg-[var(--bg-brand)] border-[var(--border-brand)] text-[var(--text-inverse)] shadow-[var(--shadow-1)]'
                    : 'bg-[var(--bg-1)] border-[var(--border-1)] text-[var(--text-2)] hover:border-[var(--border-brand)]/50'
                }`}
              >
                {horas} {t?.unit}
              </button>
            ))}
          </div>
          <p className='text-xs text-[var(--text-3)] mt-3'>{t?.hint}</p>
        </div>
      )}

      {/* Descripción de Tareas */}
      <div className='mt-8 pt-8 border-t border-[var(--border-1)]'>
        <div className='flex gap-4'>
          <PenTool className='w-6 h-6 text-[var(--text-brand)] flex-shrink-0 mt-1' />
          <div className='flex-grow'>
            <h5 className='font-bold text-[var(--text-1)] mb-1'>{t?.taskT}</h5>
            <textarea
              placeholder={t?.taskPh}
              value={formData.descripcionProyecto}
              onChange={e => updateFormData({ descripcionProyecto: e.target.value })}
              className='w-full p-4 rounded-xl bg-[var(--bg-1)] border border-[var(--border-1)] focus:border-[var(--border-brand)] outline-none transition-colors text-[var(--text-1)] placeholder-[var(--text-3)] resize-none h-24 text-sm mt-2'
            />
          </div>
        </div>
      </div>

      {/* Botón Final (Blindaje Visual var(--bg-success)) */}
      <div className='pt-4 flex justify-end'>
        <button
          disabled={!formData.tipoHoras || formData.cantidadHoras === 0 || isSubmitting}
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