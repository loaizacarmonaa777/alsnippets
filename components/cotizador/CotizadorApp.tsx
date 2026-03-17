'use client'

import React, { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'

import Step1Datos from './Step1Datos'
import Step2Servicios from './Step2Servicios'
import Step3Soporte from './Step3Soporte'
import Step3CrearWeb from './Step3CrearWeb'
import Step3SEO from './Step3SEO'
import Step3Horas from './Step3Horas'
import Step4Resumen from './Step4Resumen'
import { PRICES, Currency } from './utils/pricingLogic'

/* =====================================================
    TIPOS Y ESTADO INICIAL
   ===================================================== */
export type ServicioPrincipal =
  | 'Soporte'
  | 'SEO'
  | 'Crear Web'
  | 'Por Horas'
  | ''

export interface CotizadorData {
  nombre: string
  email: string
  whatsapp: string
  pais: string
  moneda: string
  servicioPrincipal: ServicioPrincipal
  plataformaSoporte: string
  necesidadesSoporte: string[]
  tieneDominio: string
  tieneHosting: string
  tieneBranding: string
  tieneEstructura: string
  necesitaWooCommerce: string
  descripcionProyecto: string
  tipoHoras: 'No-Code' | 'Code' | ''
  cantidadHoras: number
  precioTotal: number
}

const INITIAL_DATA: CotizadorData = {
  nombre: '',
  email: '',
  whatsapp: '',
  pais: '',
  moneda: 'USD',
  servicioPrincipal: '',
  plataformaSoporte: '',
  necesidadesSoporte: [],
  tieneDominio: '',
  tieneHosting: '',
  tieneBranding: '',
  tieneEstructura: '',
  necesitaWooCommerce: '',
  descripcionProyecto: '',
  tipoHoras: '',
  cantidadHoras: 0,
  precioTotal: 0
}

interface CotizadorAppProps {
  lang: string
  dict: any // Recibido desde la página padre
}

export default function CotizadorApp ({ lang, dict }: CotizadorAppProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<CotizadorData>(INITIAL_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  const [apiError, setApiError] = useState<string>('')

  // Acceso al diccionario de sistema (mensajes de error/espera)
  const s = dict?.cotizador?.page?.system || {}

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

  /* =====================================================
      MANEJADORES DE FLUJO
     ===================================================== */
  const updateFormData = (newData: Partial<CotizadorData>) => {
    setFormData(prev => ({ ...prev, ...newData }))
  }

  const nextStep = () => {
    setApiError('')
    setStep(prev => prev + 1)
  }
  const prevStep = () => {
    setApiError('')
    setStep(prev => prev - 1)
  }

  const handleFinalize = async () => {
    if (!turnstileToken) {
      setApiError(s.waitSecurity)
      return
    }

    setIsSubmitting(true)
    setApiError('')

    // --- CÁLCULO DE PRECIOS ---
    const p = PRICES[formData.moneda as Currency] || PRICES['USD']
    let total = 0

    switch (formData.servicioPrincipal) {
      case 'Crear Web':
        total += p.webBase
        if (formData.necesitaWooCommerce === 'Sí') total += p.ecommerce
        if (formData.tieneBranding === 'No') total += p.brandingBase
        break
      case 'Soporte':
        if (formData.necesidadesSoporte.includes('Soporte Global')) {
          total += p.soporteGlobal
        } else if (formData.plataformaSoporte === 'Otro') {
          total += p.mantenimiento * 1.5
        } else {
          total += formData.necesidadesSoporte.length * p.mantenimiento
        }
        break
      case 'Por Horas':
        const rate = formData.tipoHoras === 'Code' ? p.horaCode : p.horaNoCode
        total += rate * formData.cantidadHoras
        break
      case 'SEO':
        total += p.seoAuditoria
        break
    }

    const formattedTotal = new Intl.NumberFormat(
      formData.moneda === 'COP' ? 'es-CO' : 'en-US',
      {
        style: 'currency',
        currency: formData.moneda,
        minimumFractionDigits: formData.moneda === 'COP' ? 0 : 2
      }
    ).format(total)

    try {
      const response = await fetch('/api/cotizador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData,
          turnstileToken,
          totalFormateado: formattedTotal,
          lang
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStep(4)
      } else {
        setApiError(data.error || s.errorGen)
        if (typeof window.turnstile !== 'undefined') window.turnstile.reset()
      }
    } catch (error) {
      setApiError(s.errorNet)
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalSteps = 4

  return (
    <div className='w-full bg-[var(--bg-1)] border border-[var(--border-1)] rounded-3xl shadow-[var(--shadow-2)] overflow-hidden transition-all duration-300'>
      {/* Barra de Progreso */}
      <div className='w-full bg-[var(--bg-3)] h-2'>
        <div
          className='bg-[var(--bg-brand)] h-2 transition-all duration-500 ease-out'
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>

      <div className='p-8 md:p-12 min-h-[400px]'>
        {/* Mensaje de Error Global */}
        {apiError && (
          <div className='mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-500 text-sm rounded-xl text-center font-medium animate-pulse'>
            {apiError}
          </div>
        )}

        {/* RENDERIZADO DE PASOS - Se inyecta el diccionario correspondiente a cada hijo */}
        {step === 1 && (
          <Step1Datos
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            lang={lang}
            dict={dict.cotizador_step1}
          />
        )}
        {step === 2 && (
          <Step2Servicios
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
            lang={lang}
            dict={dict.cotizador_step2}
          />
        )}

        {step === 3 && (
          <>
            <div className='flex justify-center mb-6 overflow-hidden'>
              <Turnstile
                siteKey={siteKey}
                onSuccess={token => setTurnstileToken(token)}
                options={{ theme: 'auto', size: 'flexible' }}
              />
            </div>
            {formData.servicioPrincipal === 'Soporte' && (
              <Step3Soporte
                formData={formData}
                updateFormData={updateFormData}
                onPrev={prevStep}
                onFinalize={handleFinalize}
                isSubmitting={isSubmitting}
                lang={lang}
                dict={dict.cotizador_step3_soporte}
              />
            )}
            {formData.servicioPrincipal === 'SEO' && (
              <Step3SEO
                formData={formData}
                updateFormData={updateFormData}
                onPrev={prevStep}
                onFinalize={handleFinalize}
                isSubmitting={isSubmitting}
                lang={lang}
                dict={dict.cotizador_step3_seo}
              />
            )}
            {formData.servicioPrincipal === 'Crear Web' && (
              <Step3CrearWeb
                formData={formData}
                updateFormData={updateFormData}
                onPrev={prevStep}
                onFinalize={handleFinalize}
                isSubmitting={isSubmitting}
                lang={lang}
                dict={dict.cotizador_step3_web}
              />
            )}
            {formData.servicioPrincipal === 'Por Horas' && (
              <Step3Horas
                formData={formData}
                updateFormData={updateFormData}
                onPrev={prevStep}
                onFinalize={handleFinalize}
                isSubmitting={isSubmitting}
                lang={lang}
                dict={dict.cotizador_step3_horas}
              />
            )}
          </>
        )}

        {step === 4 && (
          <Step4Resumen
            formData={formData}
            lang={lang}
            dict={dict.cotizador_step4}
            onReset={() => {
              setFormData(INITIAL_DATA)
              setStep(1)
              setTurnstileToken('')
            }}
          />
        )}
      </div>
    </div>
  )
}
