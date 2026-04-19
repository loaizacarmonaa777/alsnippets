'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Turnstile } from '@marsidev/react-turnstile'
import { submitLead } from '@/app/actions/leads'

export default function FormNewsletter ({ lang }: { lang: string }) {
  const [email, setEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('newsletter_draft') || ''
    }
    return ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string>('')

  // Efecto para persistir el email ante cambios de idioma y limpiar al desmontar
  useEffect(() => {
    sessionStorage.setItem('newsletter_draft', email)
    
    return () => {
      sessionStorage.removeItem('newsletter_draft')
    }
  }, [email])

  // PROTOCOLO ALSNIPPETS: Objeto de traducción local (Lógica Sensible)
  const t =
    {
      es: {
        placeholder: 'Ingresa tu correo@',
        subscribe: 'Suscribirme',
        success: '¡Gracias por suscribirte!',
        errSub: 'Hubo un error al suscribirte.',
        errConn: 'Error de conexión.'
      },
      en: {
        placeholder: 'Enter your email@',
        subscribe: 'Subscribe',
        success: 'Thanks for subscribing!',
        errSub: 'Error subscribing.',
        errConn: 'Connection error.'
      }
    }[lang as 'es' | 'en'] ||
    {
      /* Fallback ES */
    }

  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  useEffect(() => {
    const todoValido = regexEmail.test(email) && turnstileToken !== ''
    setIsFormValid(todoValido)
  }, [email, turnstileToken])

  // Lógica del Confetti (Lógica Sensible Blindada)
  const triggerHeartsConfetti = () => {
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }
    function randomInRange (min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) return clearInterval(interval)
      const particleCount = 50 * (timeLeft / duration)
      try {
        const heart = confetti.shapeFromText({ text: '🎉', scalar: 2 })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          shapes: [heart],
          colors: ['#c9a34e']
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          shapes: [heart],
          colors: ['#c9a34e']
        })
      } catch (e) {
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        })
      }
    }, 250)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormValid) return
    setErrorMessage('')
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      // ✅ SUSTITUCIÓN ALSNIPPETS: Enviamos datos a Turso
      const result = await submitLead({
        email,
        source: 'newsletter',
        lang: lang,
        metadata: { 
          turnstileToken, 
          url_actual: typeof window !== 'undefined' ? window.location.href : '',
          categoria: 'footer_subscription'
        }
      })

      // Cambiamos la validación: ahora usamos result.success
      if (result.success) {
        // ✅ PROTOCOLO ALSNIPPETS: Notificar a GTM del éxito (INTACTO)
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          ;(window as any).dataLayer.push({
            event: 'form_success',
            form_id: 'newsletter_footer',
            language: lang
          })
        }

        setSuccessMessage(t.success)
        triggerHeartsConfetti()
        setEmail('')
        if (typeof window.turnstile !== 'undefined') window.turnstile.reset()
        setTimeout(() => setSuccessMessage(''), 5000)
      } else {
        // ✅ Manejo del error desde la respuesta de Turso (ej: email duplicado)
        setErrorMessage(result.error || t.errSub)
      }
    } catch (error) {
      setErrorMessage(t.errConn)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='relative flex flex-col gap-2'>
      {/* Input y Botón (Blindaje Visual) */}
      <div className='flex shadow-[var(--shadow-2)] relative'>
        <input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={isSubmitting}
          placeholder={t.placeholder}
          className='w-[70%] px-4 py-3 border border-[var(--border-1)] focus:border-[var(--text-brand)] bg-[var(--bg-1)] outline-none flex items-center text-sm placeholder:text-xs text-[var(--text-1)] placeholder-[var(--text-3)] disabled:opacity-50 transition-colors'
        />

        <div
          className={
            !isFormValid || isSubmitting
              ? 'cursor-not-allowed w-[30%]'
              : 'w-[30%]'
          }
        >
          <button
            type='submit'
            disabled={isSubmitting || !isFormValid}
            title={t.subscribe}
            className={`button-send w-full h-full rounded-none m-0 text-[var(--text-inverse)] transition-all duration-300 ${
              !isFormValid || isSubmitting
                ? 'opacity-50 grayscale pointer-events-none'
                : 'hover:scale-[1.02] hover:brightness-110'
            }`}
            style={{
              minWidth: 'auto',
              padding: '0',
              background: 'var(--bg-brand)'
            }}
          >
            <div className='svg-wrapper-1 flex justify-center w-full'>
              <div className='svg-wrapper'>
                {isSubmitting ? (
                  <svg
                    className='animate-spin h-5 w-5 text-current'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='20'
                    height='20'
                    aria-hidden='true'
                  >
                    <path fill='none' d='M0 0h24v24H0z' />
                    <path
                      fill='currentColor'
                      d='M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z'
                    />
                  </svg>
                )}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Turnstile (Blindaje de Lógica Sensible) */}
      <div className='w-full flex justify-center [&_iframe]:!border-none [&_iframe]:!rounded-none'>
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={setTurnstileToken}
          options={{ theme: 'auto', size: 'flexible' }}
        />
      </div>

      <AnimatePresence>
        {successMessage && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className='text-[var(--text-success)] text-xs font-bold mt-1 text-center'
          >
            {successMessage}
          </motion.p>
        )}
        {errorMessage && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className='text-red-500 text-xs font-bold mt-1 text-center'
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}
