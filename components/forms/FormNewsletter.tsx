'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Turnstile } from '@marsidev/react-turnstile'

export default function FormNewsletter () {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string>('')

  // Regex estricto (exige .com, .es, etc.)
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  // Validador en tiempo real
  useEffect(() => {
    const todoValido = regexEmail.test(email) && turnstileToken !== ''
    setIsFormValid(todoValido)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, turnstileToken])

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
        const heart = confetti.shapeFromText({ text: '🎉', scalar: 2 }) // Usamos fiesta para la newsletter
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            shapes: [heart],
            colors: ['#c9a34e']
          })
        )
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            shapes: [heart],
            colors: ['#c9a34e']
          })
        )
      } catch (e) {
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
          })
        )
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
          })
        )
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
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, turnstileToken })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSuccessMessage('¡Gracias por suscribirte!')
        triggerHeartsConfetti()
        setEmail('')

        // Reset visual de Turnstile
        if (typeof window.turnstile !== 'undefined') window.turnstile.reset()

        setTimeout(() => setSuccessMessage(''), 5000)
      } else {
        setErrorMessage(data.error || 'Hubo un error al suscribirte.')
      }
    } catch (error) {
      setErrorMessage('Error de conexión. Intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='relative flex flex-col gap-2'>
      {/* Input y Botón en la misma línea */}
      <div className='flex shadow-[0_12px_32px_rgba(0,0,0,0.25)] relative'>
        <input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={isSubmitting}
          placeholder='Ingresa tu correo@'
          className='
            w-[70%] px-4 py-3 
            border border-[var(--brand-primary)] 
            bg-transparent outline-none flex items-center 
            text-sm placeholder:text-xs text-[var(--text-white2)] placeholder-[var(--text-white2)]/60 
            disabled:opacity-50
          '
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
            className={`button-send w-full h-full rounded-none m-0 text-[var(--text-white2)] transition-all duration-300 ${
              !isFormValid || isSubmitting
                ? 'opacity-50 grayscale pointer-events-none'
                : 'hover:scale-[1.02]'
            }`}
            style={{ minWidth: 'auto', padding: '0' }} // Quitamos el min-width global para que no rompa el diseño pequeño
          >
            <div className='svg-wrapper-1 flex justify-center w-full'>
              <div className='svg-wrapper'>
                {isSubmitting ? (
                  <svg
                    className='animate-spin h-5 w-5 text-white'
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
            <span className='hidden'></span>{' '}
            {/* Ocultamos el texto para que el avión quede perfectamente centrado en móvil */}
          </button>
        </div>
      </div>

      {/* Cloudflare Turnstile (Franja horizontal pequeña adaptada al 100% del ancho) */}
      <div className='w-full flex justify-center [&_iframe]:!border-none [&_iframe]:!rounded-none'>
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={token => setTurnstileToken(token)}
          options={{
            theme: 'dark',
            size: 'flexible' // ESTO ES LA MAGIA: Pasa del cuadrado a la franja delgada
          }}
        />
      </div>

      {/* Feedback de Envío */}
      <AnimatePresence>
        {successMessage && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className='text-green-400 text-xs font-bold mt-1 text-center'
          >
            {successMessage}
          </motion.p>
        )}
        {errorMessage && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className='text-red-400 text-xs font-bold mt-1 text-center'
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}
