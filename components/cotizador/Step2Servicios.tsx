'use client'

import React from 'react'
import {
  ChevronRight,
  ChevronLeft,
  Wrench,
  Search,
  MonitorSmartphone,
  Clock
} from 'lucide-react'
import type { ServicioPrincipal, CotizadorData } from './CotizadorApp'

interface Step2Props {
  formData: { servicioPrincipal: ServicioPrincipal }
  updateFormData: (data: Partial<CotizadorData>) => void
  onNext: () => void
  onPrev: () => void
  lang: string
  dict: any // 👈 Recibido desde CotizadorApp (cotizador_step2.json)
}

/* =====================================================
   Step 2: Selección de Servicio
   - PROTOCOLO ALSNIPPETS: Consumo de Diccionario Externo
   ===================================================== */
export default function Step2Servicios ({
  formData,
  updateFormData,
  onNext,
  onPrev,
  lang,
  dict: t // 👈 Renombramos dict a 't' para mantener compatibilidad con el JSX
}: Step2Props) {
  // Definición de Servicios (Mantenemos la lógica de Íconos inyectando los textos del dict)
  const servicios: {
    id: ServicioPrincipal
    title: string
    description: string
    icon: React.ReactNode
  }[] = [
    {
      id: 'Soporte',
      title: t?.serv?.sop?.t,
      description: t?.serv?.sop?.d,
      icon: <Wrench className='w-8 h-8 mb-4' />
    },
    {
      id: 'SEO',
      title: t?.serv?.seo?.t,
      description: t?.serv?.seo?.d,
      icon: <Search className='w-8 h-8 mb-4' />
    },
    {
      id: 'Crear Web',
      title: t?.serv?.web?.t,
      description: t?.serv?.web?.d,
      icon: <MonitorSmartphone className='w-8 h-8 mb-4' />
    },
    {
      id: 'Por Horas',
      title: t?.serv?.hrs?.t,
      description: t?.serv?.hrs?.d,
      icon: <Clock className='w-8 h-8 mb-4' />
    }
  ]

  return (
    <div className='space-y-6 animate-fade-in'>
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

      {/* Grid de Servicios */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6'>
        {servicios.map(servicio => (
          <button
            key={servicio.id}
            onClick={() =>
              updateFormData({
                servicioPrincipal: servicio.id,
                // Lógica Sensible: Reseteo de estados de pasos profundos
                descripcionProyecto: '',
                plataformaSoporte: '',
                necesidadesSoporte: [],
                tieneDominio: '',
                tieneHosting: '',
                tieneBranding: '',
                tieneEstructura: '',
                necesitaWooCommerce: '',
                tipoHoras: '',
                cantidadHoras: 0
              })
            }
            className={`
              relative flex flex-col items-center text-center p-6 rounded-2xl border-2 transition-all duration-300
              ${
                formData.servicioPrincipal === servicio.id
                  ? 'border-[var(--border-brand)] bg-[var(--bg-brand)]/10 shadow-[var(--shadow-brand-glow-hover)] -translate-y-2'
                  : 'border-[var(--border-1)] bg-[var(--bg-1)] hover:border-[var(--border-brand)]/50 hover:-translate-y-1'
              }
            `}
          >
            <div
              className={`${
                formData.servicioPrincipal === servicio.id
                  ? 'text-[var(--text-brand)]'
                  : 'text-[var(--text-2)]'
              }`}
            >
              {servicio.icon}
            </div>
            <h4
              className={`text-lg font-bold mb-2 ${
                formData.servicioPrincipal === servicio.id
                  ? 'text-[var(--text-brand)]'
                  : 'text-[var(--text-1)]'
              }`}
            >
              {servicio.title}
            </h4>
            <p className='text-xs text-[var(--text-2)] leading-relaxed'>
              {servicio.description}
            </p>
            {/* Indicador de Selección Activa */}
            {formData.servicioPrincipal === servicio.id && (
              <div className='absolute top-4 right-4 w-3 h-3 bg-[var(--bg-brand)] rounded-full animate-pulse shadow-[var(--shadow-brand-glow)]'></div>
            )}
          </button>
        ))}
      </div>

      <div className='pt-6 border-t border-[var(--border-1)] flex justify-end'>
        <button
          disabled={!formData.servicioPrincipal}
          onClick={onNext}
          className='flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 bg-[var(--bg-brand)] text-[var(--text-inverse)] rounded-xl font-bold hover:brightness-110 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:pointer-events-none'
        >
          {t?.next} <ChevronRight className='w-5 h-5' />
        </button>
      </div>
    </div>
  )
}
