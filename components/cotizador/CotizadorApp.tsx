// components/cotizador/CotizadorApp.tsx
'use client'

import React, { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile' // <--- IMPORTANTE

import Step1Datos from './Step1Datos'
import Step2Servicios from './Step2Servicios'
import Step3Soporte from './Step3Soporte'
import Step3CrearWeb from './Step3CrearWeb'
import Step3SEO from './Step3SEO'
import Step3Horas from './Step3Horas'
import Step4Resumen from './Step4Resumen'
import { PRICES, Currency } from './utils/pricingLogic'

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

export default function CotizadorApp () {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<CotizadorData>(INITIAL_DATA)

  // Estados de carga y seguridad
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  const [apiError, setApiError] = useState<string>('')

  const updateFormData = (newData: Partial<CotizadorData>) => {
    setFormData(prev => ({ ...prev, ...newData }))
  }

  const nextStep = () => {
    setApiError('') // Limpiar errores al cambiar de paso
    setStep(prev => prev + 1)
  }

  const prevStep = () => {
    setApiError('')
    setStep(prev => prev - 1)
  }

  // FUNCIÓN MAESTRA DE ENVÍO REAL
  const handleFinalize = async () => {
    if (!turnstileToken) {
      setApiError(
        'Por favor, espera a que se complete la validación de seguridad (Cloudflare).'
      )
      return
    }

    setIsSubmitting(true)
    setApiError('')

    // --- MAGIA: CALCULAMOS EL PRECIO ANTES DE ENVIARLO AL CORREO ---
    const p = PRICES[formData.moneda as Currency] || PRICES['USD']
    let total = 0

    switch (formData.servicioPrincipal) {
      case 'Crear Web':
        total += p.webBase
        if (formData.necesitaWooCommerce === 'Sí') total += p.wooCommerce
        if (formData.tieneBranding === 'No') total += p.branding
        break
      case 'Soporte':
        if (formData.necesidadesSoporte.includes('Soporte Global')) {
          total += p.soporteGlobal
        } else if (formData.plataformaSoporte === 'Otro') {
          total += p.soporteModulo * 1.5
        } else {
          total += formData.necesidadesSoporte.length * p.soporteModulo
        }
        break
      case 'Por Horas':
        const rate = formData.tipoHoras === 'Code' ? p.horaCode : p.horaNoCode
        total += rate * formData.cantidadHoras
        break
      case 'SEO':
        total += p.seo
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
    // --------------------------------------------------------------

    try {
      const response = await fetch('/api/cotizador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Añadimos el "totalFormateado" al paquete que viaja al backend
        body: JSON.stringify({
          formData,
          turnstileToken,
          totalFormateado: formattedTotal
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStep(4) // ÉXITO: Pasamos a ver el PDF
      } else {
        setApiError(
          data.error ||
            'Hubo un error al generar tu cotización. Intenta nuevamente.'
        )
        if (typeof window.turnstile !== 'undefined') window.turnstile.reset()
      }
    } catch (error) {
      setApiError(
        'Error de red. Verifica tu conexión a internet e intenta nuevamente.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalSteps = 4

  return (
    <div className='w-full bg-white/70 dark:bg-[#121212]/70 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300'>
      {/* Barra de Progreso */}
      <div className='w-full bg-[var(--bg-tertiary)] h-2'>
        <div
          className='bg-[var(--brand-primary)] h-2 transition-all duration-500 ease-out'
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

        {/* ==== STEP 1 ==== */}
        {step === 1 && (
          <Step1Datos
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        )}

        {/* ==== STEP 2 ==== */}
        {step === 2 && (
          <Step2Servicios
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}

        {/* ==== STEP 3 ==== */}

        {/* Renderizamos Turnstile globalmente en el Paso 3, encima de las ramas */}
        {step === 3 && (
          <div className='flex justify-center mb-6 [&_iframe]:!border-none [&_iframe]:!rounded-none rounded-xl overflow-hidden'>
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={token => setTurnstileToken(token)}
              options={{ theme: 'auto', size: 'flexible' }}
            />
          </div>
        )}

        {step === 3 && formData.servicioPrincipal === 'Soporte' && (
          <Step3Soporte
            formData={formData}
            updateFormData={updateFormData}
            onPrev={prevStep}
            onFinalize={handleFinalize}
            isSubmitting={isSubmitting}
          />
        )}

        {step === 3 && formData.servicioPrincipal === 'SEO' && (
          <Step3SEO
            formData={formData}
            updateFormData={updateFormData}
            onPrev={prevStep}
            onFinalize={handleFinalize}
            isSubmitting={isSubmitting}
          />
        )}

        {step === 3 && formData.servicioPrincipal === 'Crear Web' && (
          <Step3CrearWeb
            formData={formData}
            updateFormData={updateFormData}
            onPrev={prevStep}
            onFinalize={handleFinalize}
            isSubmitting={isSubmitting}
          />
        )}

        {step === 3 && formData.servicioPrincipal === 'Por Horas' && (
          <Step3Horas
            formData={formData}
            updateFormData={updateFormData}
            onPrev={prevStep}
            onFinalize={handleFinalize}
            isSubmitting={isSubmitting}
          />
        )}

        {/* ==== STEP 4: RESULTADO FINAL Y PDF ==== */}
        {step === 4 && (
          <Step4Resumen
            formData={formData}
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
