'use client'

import React from 'react'
import {
  ChevronLeft,
  Send,
  Globe,
  Server,
  Palette,
  LayoutTemplate,
  ShoppingCart,
  PenTool
} from 'lucide-react'
import type { CotizadorData } from './CotizadorApp'

interface Step3CrearWebProps {
  formData: CotizadorData
  updateFormData: (data: Partial<CotizadorData>) => void
  onPrev: () => void
  onFinalize: () => void
  isSubmitting: boolean
  lang: string
  dict: any // 👈 Recibido desde CotizadorApp (cotizador_step3_web.json)
}

/* =====================================================
   Step 3: Crear Web (PROTOCOLO ALSNIPPETS)
   - Blindaje visual de toggles y lógica de validación
   ===================================================== */
export default function Step3CrearWeb ({
  formData,
  updateFormData,
  onPrev,
  onFinalize,
  isSubmitting,
  lang,
  dict: t // 👈 Renombramos dict a 't' para mantener compatibilidad con el JSX
}: Step3CrearWebProps) {
  // Componente reutilizable (Lógica Sensible Blindada)
  const QuestionToggle = ({
    title,
    desc,
    icon,
    field,
    value
  }: {
    title: string
    desc: string
    icon: React.ReactNode
    field: keyof CotizadorData
    value: string
  }) => (
    <div className='p-5 rounded-2xl border border-[var(--border-1)] bg-[var(--bg-1)] hover:border-[var(--border-brand)]/30 transition-all duration-300'>
      <div className='flex gap-4'>
        <div className='mt-1 text-[var(--text-brand)]'>{icon}</div>
        <div className='flex-grow'>
          <h5 className='font-bold text-[var(--text-1)] mb-1'>{title}</h5>
          <p className='text-xs text-[var(--text-2)] leading-relaxed mb-4'>
            {desc}
          </p>

          <div className='flex gap-3'>
            <button
              onClick={() => updateFormData({ [field]: 'Sí' })}
              className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all border-2 ${
                value === 'Sí'
                  ? 'bg-[var(--bg-brand)] border-[var(--border-brand)] text-[var(--text-inverse)] shadow-[var(--shadow-1)]'
                  : 'bg-transparent border-[var(--border-1)] text-[var(--text-2)] hover:border-[var(--border-brand)]/50'
              }`}
            >
              {t?.yes}
            </button>
            <button
              onClick={() => updateFormData({ [field]: 'No' })}
              className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all border-2 ${
                value === 'No'
                  ? 'bg-[var(--bg-3)] border-[var(--border-2)] text-[var(--text-1)] shadow-[var(--shadow-1)] shadow-black/5'
                  : 'bg-transparent border-[var(--border-1)] text-[var(--text-2)] hover:border-[var(--border-2)]'
              }`}
            >
              {t?.no}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  // Validación de paso (Lógica Sensible)
  const isFormComplete =
    formData.tieneDominio !== '' &&
    formData.tieneHosting !== '' &&
    formData.tieneBranding !== '' &&
    formData.tieneEstructura !== '' &&
    formData.necesitaWooCommerce !== ''

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

      {/* Grid de preguntas (Blindaje Visual) */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <QuestionToggle
          title={t?.q1?.t}
          desc={t?.q1?.d}
          icon={<Globe className='w-6 h-6' />}
          field='tieneDominio'
          value={formData.tieneDominio}
        />
        <QuestionToggle
          title={t?.q2?.t}
          desc={t?.q2?.d}
          icon={<Server className='w-6 h-6' />}
          field='tieneHosting'
          value={formData.tieneHosting}
        />
        <QuestionToggle
          title={t?.q3?.t}
          desc={t?.q3?.d}
          icon={<Palette className='w-6 h-6' />}
          field='tieneBranding'
          value={formData.tieneBranding}
        />
        <QuestionToggle
          title={t?.q4?.t}
          desc={t?.q4?.d}
          icon={<LayoutTemplate className='w-6 h-6' />}
          field='tieneEstructura'
          value={formData.tieneEstructura}
        />
        <QuestionToggle
          title={t?.q5?.t}
          desc={t?.q5?.d}
          icon={<ShoppingCart className='w-6 h-6' />}
          field='necesitaWooCommerce'
          value={formData.necesitaWooCommerce}
        />
      </div>

      {/* Descripción Breve */}
      <div className='mt-8 pt-8 border-t border-[var(--border-1)]'>
        <div className='flex gap-4'>
          <PenTool className='w-6 h-6 text-[var(--text-brand)] flex-shrink-0 mt-1' />
          <div className='flex-grow'>
            <h5 className='font-bold text-[var(--text-1)] mb-1'>{t?.descT}</h5>
            <p className='text-xs text-[var(--text-2)] leading-relaxed mb-4'>
              {t?.descP}
            </p>
            <textarea
              placeholder={t?.descPh}
              value={formData.descripcionProyecto}
              onChange={e =>
                updateFormData({ descripcionProyecto: e.target.value })
              }
              className='w-full p-4 rounded-xl bg-[var(--bg-1)] border border-[var(--border-1)] focus:border-[var(--border-brand)] outline-none transition-colors text-[var(--text-1)] placeholder-[var(--text-3)] resize-none h-28 text-sm'
            />
          </div>
        </div>
      </div>

      <div className='pt-8 flex justify-end'>
        <button
          disabled={!isFormComplete || isSubmitting}
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
