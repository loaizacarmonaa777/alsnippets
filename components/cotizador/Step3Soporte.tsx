'use client'

import React from 'react'
import { ChevronLeft, Check, Send } from 'lucide-react'
import type { CotizadorData } from './CotizadorApp'

interface Step3SoporteProps {
  formData: CotizadorData
  updateFormData: (data: Partial<CotizadorData>) => void
  onPrev: () => void
  onFinalize: () => void
  isSubmitting: boolean
  lang: string
  dict: any
}

export default function Step3Soporte ({
  formData,
  updateFormData,
  onPrev,
  onFinalize,
  isSubmitting,
  lang,
  dict: t
}: Step3SoporteProps) {
  // BASE DE DATOS DE SERVICIOS (Mapeo de todas las plataformas con el JSON)
  const SERVICIOS: Record<
    string,
    { id: string; title: string; desc: string }[]
  > = {
    WordPress: t?.cms_services?.wordpress || [],
    Shopify: t?.cms_services?.shopify || [],
    Prestashop: t?.cms_services?.prestashop || [],
    Wix: t?.cms_services?.wix || [],
    Joomla: t?.cms_services?.joomla || [],
    Drupal: t?.cms_services?.drupal || []
  }

  const currentServices = SERVICIOS[formData.plataformaSoporte] || []

  // Lista de plataformas que aparecen en los botones superiores
  const plataformas = [
    'WordPress',
    'Shopify',
    'Prestashop',
    'Wix',
    'Joomla',
    'Drupal',
    'Otro'
  ]

  const toggleNeed = (needId: string) => {
    // Lógica para que 'Soporte Global' sea excluyente
    if (needId === 'Soporte Global') {
      const isAlreadyGlobal =
        formData.necesidadesSoporte.includes('Soporte Global')
      updateFormData({
        necesidadesSoporte: isAlreadyGlobal ? [] : ['Soporte Global']
      })
      return
    }
    let currentNeeds = formData.necesidadesSoporte.filter(
      n => n !== 'Soporte Global'
    )
    if (currentNeeds.includes(needId)) {
      currentNeeds = currentNeeds.filter(n => n !== needId)
    } else {
      currentNeeds.push(needId)
    }
    updateFormData({ necesidadesSoporte: currentNeeds })
  }

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

      {/* Selector de Plataforma */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
        {plataformas.map(plat => (
          <button
            key={plat}
            onClick={() =>
              plat !== formData.plataformaSoporte &&
              updateFormData({
                plataformaSoporte: plat,
                necesidadesSoporte: [],
                descripcionProyecto: ''
              })
            }
            className={`p-4 rounded-xl border-2 transition-all text-sm font-bold ${
              formData.plataformaSoporte === plat
                ? 'border-[var(--border-brand)] bg-[var(--bg-brand)]/10 text-[var(--text-brand)] shadow-[var(--shadow-brand-glow-hover)]'
                : 'border-[var(--border-1)] bg-[var(--bg-1)] text-[var(--text-2)] hover:border-[var(--border-brand)]/50'
            }`}
          >
            {plat === 'Otro' ? t?.other : plat}
          </button>
        ))}
      </div>

      {/* Listado de Servicios para el CMS seleccionado */}
      {formData.plataformaSoporte !== '' &&
        formData.plataformaSoporte !== 'Otro' && (
          <div className='animate-fade-in mt-8 pt-8 border-t border-[var(--border-1)]'>
            <h4 className='text-xl font-bold text-[var(--text-1)] mb-1'>
              {t?.servFor} {formData.plataformaSoporte}
            </h4>
            <p className='text-[var(--text-2)] mb-6 text-sm'>{t?.servSub}</p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {currentServices.map(servicio => {
                const isSelected = formData.necesidadesSoporte.includes(
                  servicio.id
                )
                return (
                  <div
                    key={servicio.id}
                    onClick={() => toggleNeed(servicio.id)}
                    className={`flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'border-[var(--border-brand)] bg-[var(--bg-brand)]/5 shadow-[var(--shadow-brand-glow-hover)]'
                        : 'border-[var(--border-1)] bg-[var(--bg-1)] hover:border-[var(--border-brand)]/30'
                    }`}
                  >
                    <div
                      className={`mt-1 w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'border-[var(--border-brand)] bg-[var(--bg-brand)]'
                          : 'border-[var(--text-3)]'
                      }`}
                    >
                      {isSelected && (
                        <Check className='w-4 h-4 text-[var(--text-inverse)]' />
                      )}
                    </div>
                    <div>
                      <h5
                        className={`font-bold mb-1 ${
                          isSelected
                            ? 'text-[var(--text-brand)]'
                            : 'text-[var(--text-1)]'
                        }`}
                      >
                        {servicio.title}
                      </h5>
                      <p className='text-xs text-[var(--text-2)] leading-relaxed'>
                        {servicio.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

      {/* Opción 'Otro' */}
      {formData.plataformaSoporte === 'Otro' && (
        <div className='animate-fade-in mt-8 pt-8 border-t border-[var(--border-1)]'>
          <h4 className='text-xl font-bold text-[var(--text-1)] mb-2'>
            {t?.otherT}
          </h4>
          <div className='bg-[var(--bg-3)] p-6 rounded-xl border border-[var(--border-1)]'>
            <p className='text-[var(--text-2)] text-sm mb-4'>{t?.otherD}</p>
            <textarea
              placeholder={t?.otherPh}
              value={formData.descripcionProyecto}
              onChange={e =>
                updateFormData({ descripcionProyecto: e.target.value })
              }
              className='w-full p-4 rounded-xl bg-[var(--bg-1)] border border-[var(--border-1)] focus:border-[var(--border-brand)] outline-none transition-colors text-[var(--text-1)] placeholder-[var(--text-3)] resize-none h-24 text-sm'
            />
          </div>
        </div>
      )}

      {/* Botón Finalizar */}
      <div className='pt-8 flex justify-end'>
        <button
          disabled={
            !formData.plataformaSoporte ||
            (formData.plataformaSoporte !== 'Otro' &&
              formData.necesidadesSoporte.length === 0) ||
            (formData.plataformaSoporte === 'Otro' &&
              formData.descripcionProyecto.length < 10) ||
            isSubmitting
          }
          onClick={onFinalize}
          className='flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 bg-[var(--bg-success)] text-[var(--text-inverse)] rounded-xl font-bold hover:brightness-110 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:pointer-events-none shadow-[var(--shadow-1)]'
        >
          {isSubmitting ? t?.wait : t?.btn} <Send className='w-5 h-5' />
        </button>
      </div>
    </div>
  )
}
