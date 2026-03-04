'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti' // Importamos el confeti
import { Turnstile } from '@marsidev/react-turnstile'

/* =====================================================
   REGLAS DE VALIDACIÓN TELEFÓNICA POR PAÍS
===================================================== */
const PHONE_RULES: Record<string, { min: number; max: number; msg: string }> = {
  '+57': { min: 10, max: 10, msg: 'Colombia: 10 dígitos' },
  '+52': { min: 10, max: 10, msg: 'México: 10 dígitos' },
  '+34': { min: 9, max: 9, msg: 'España: 9 dígitos' },
  '+1': { min: 10, max: 10, msg: 'USA/Canadá: 10 dígitos' },
  '+54': { min: 10, max: 10, msg: 'Argentina: 10 dígitos' },
  '+56': { min: 9, max: 9, msg: 'Chile: 9 dígitos' },
  '+51': { min: 9, max: 9, msg: 'Perú: 9 dígitos' },
  '+58': { min: 10, max: 10, msg: 'Venezuela: 10 dígitos' },
  '+593': { min: 9, max: 9, msg: 'Ecuador: 9 dígitos' },
  '+55': { min: 10, max: 11, msg: 'Brasil: 10 u 11 dígitos' },
  // Regla por defecto para países menos comunes
  default: { min: 7, max: 15, msg: 'Entre 7 y 15 dígitos' }
}

export default function ContactForm () {
  /* =====================================================
     Estados
  ===================================================== */
  const [nombreCompleto, setNombreCompleto] = useState('')
  const [email, setEmail] = useState('')
  const [codigoPais, setCodigoPais] = useState('')
  const [telefono, setTelefono] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [aceptaLegales, setAceptaLegales] = useState(false)

  // Estados de envío y validación
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)

  // Mensajes de error en tiempo real
  const [nombreError, setNombreError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [telefonoError, setTelefonoError] = useState('')

  // State para el token de Turnstile (aunque no lo usamos directamente aquí, lo dejamos preparado por si queremos mostrar algo relacionado en el futuro)
  const [turnstileToken, setTurnstileToken] = useState<string>('')

  const MAX_CARACTERES = 200
  const caracteresRestantes = MAX_CARACTERES - mensaje.length

  /* =====================================================
     Expresiones Regulares (Regex)
  ===================================================== */
  // Obliga a tener texto @ texto . texto (ej: hola@gmail.com)
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  /* =====================================================
     Efecto: Evaluar constantemente si TODO es válido
  ===================================================== */
  useEffect(() => {
    const tieneNombreValido = nombreCompleto.trim().split(/\s+/).length >= 2
    const tieneEmailValido = regexEmail.test(email)

    let tieneTelefonoValido = false
    if (codigoPais) {
      const regla = PHONE_RULES[codigoPais] || PHONE_RULES['default']
      tieneTelefonoValido =
        telefono.length >= regla.min && telefono.length <= regla.max
    }

    const todoValido =
      tieneNombreValido &&
      tieneEmailValido &&
      tieneTelefonoValido &&
      aceptaLegales &&
      codigoPais !== '' &&
      turnstileToken !== ''

    setIsFormValid(todoValido)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nombreCompleto, email, codigoPais, telefono, aceptaLegales])

  /* =====================================================
     Disparador de Confeti de Corazones
  ===================================================== */
  const triggerHeartsConfetti = () => {
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange (min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      try {
        // Intentamos generar corazones (Soportado en versiones recientes de canvas-confetti)
        const heart = confetti.shapeFromText({ text: '❤️', scalar: 2 })
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            shapes: [heart],
            colors: ['#FF0000']
          })
        )
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            shapes: [heart],
            colors: ['#FF0000']
          })
        )
      } catch (e) {
        // Fallback: Si el navegador no soporta emojis en canvas, tira confeti rojo y rosado estándar
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#ff0000', '#ffc0cb', '#ff69b4']
          })
        )
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#ff0000', '#ffc0cb', '#ff69b4']
          })
        )
      }
    }, 250)
  }

  /* =====================================================
     Validaciones individuales (onBlur / onChange)
  ===================================================== */
  const validarNombreCompleto = () => {
    const palabras = nombreCompleto.trim().split(/\s+/)
    if (palabras.length < 2 && nombreCompleto.length > 0) {
      setNombreError('Escribe al menos tu nombre y apellido.')
    } else {
      setNombreError('')
    }
  }

  const validarEmail = () => {
    if (email.length > 0 && !regexEmail.test(email)) {
      setEmailError('Introduce un correo válido (ej: nombre@dominio.com).')
    } else {
      setEmailError('')
    }
  }

  const validarTelefono = (valor: string, paisSeleccionado: string) => {
    if (!paisSeleccionado) {
      setTelefonoError('Primero selecciona tu país.')
      return
    }

    const regla = PHONE_RULES[paisSeleccionado] || PHONE_RULES['default']

    if (valor.length === 0) {
      setTelefonoError('')
    } else if (valor.length < regla.min) {
      setTelefonoError(`Faltan números (${regla.msg})`)
    } else if (valor.length > regla.max) {
      setTelefonoError(`Excediste los números permitidos (${regla.msg})`)
    } else {
      setTelefonoError('') // Está perfecto
    }
  }

  /* =====================================================
     Envío REAL a la API
  ===================================================== */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Si el botón logró ser clickeado pero algo no es válido por trampa, lo detenemos
    if (!isFormValid) return

    setErrorMessage('')
    setSuccessMessage('')

    const form = e.currentTarget
    const honeypot = (form.elements.namedItem('empresa') as HTMLInputElement)
      ?.value
    if (honeypot) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombreCompleto,
          email,
          telefono: `${codigoPais} ${telefono}`,
          pais: codigoPais,
          mensaje,
          turnstileToken
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSuccessMessage(
          '¡Mensaje enviado con éxito! Te contactaremos pronto.'
        )
        triggerHeartsConfetti() // 🎊 EXPLOSIÓN DE CORAZONES 🎊

        // Limpiar formulario
        setNombreCompleto('')
        setEmail('')
        setTelefono('')
        setMensaje('')
        setAceptaLegales(false)
        setCodigoPais('')

        setTimeout(() => setSuccessMessage(''), 8000)
      } else {
        setErrorMessage('Hubo un error al enviar el mensaje. Intenta de nuevo.')
      }
    } catch (error) {
      setErrorMessage(
        'Error de conexión. Revisa tu internet e intenta nuevamente.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6 relative'>
      {/* Feedback Visual */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='p-4 bg-green-500/10 border border-green-500/30 text-green-600 rounded-xl font-medium text-center text-sm'
          >
            {successMessage}
          </motion.div>
        )}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='p-4 bg-red-500/10 border border-red-500/30 text-red-600 rounded-xl font-medium text-center text-sm'
          >
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <input
        type='text'
        name='empresa'
        tabIndex={-1}
        autoComplete='off'
        className='hidden'
      />

      {/* Nombre */}
      <div className='space-y-1'>
        <label className='text-sm font-medium'>Nombre completo *</label>
        <input
          type='text'
          value={nombreCompleto}
          onChange={e => {
            setNombreCompleto(e.target.value)
            if (nombreError) setNombreError('')
          }}
          onBlur={validarNombreCompleto}
          disabled={isSubmitting}
          className={`w-full border rounded-lg px-4 py-3 bg-[var(--bg-body)] text-[var(--text-primary)] focus:border-[var(--brand-primary)] outline-none transition-colors ${
            nombreError ? 'border-red-500' : 'border-[var(--border-subtle)]'
          } disabled:opacity-50`}
        />
        {nombreError && (
          <p className='text-red-500 text-xs font-bold'>{nombreError}</p>
        )}
      </div>

      {/* Email */}
      <div className='space-y-1'>
        <label className='text-sm font-medium'>Correo electrónico *</label>
        <input
          type='email'
          value={email}
          onChange={e => {
            setEmail(e.target.value)
            if (emailError) setEmailError('')
          }}
          onBlur={validarEmail}
          disabled={isSubmitting}
          className={`w-full border rounded-lg px-4 py-3 bg-[var(--bg-body)] text-[var(--text-primary)] focus:border-[var(--brand-primary)] outline-none transition-colors ${
            emailError ? 'border-red-500' : 'border-[var(--border-subtle)]'
          } disabled:opacity-50`}
        />
        {emailError && (
          <p className='text-red-500 text-xs font-bold'>{emailError}</p>
        )}
      </div>

      {/* Teléfono */}
      <div className='space-y-1'>
        <label className='text-sm font-medium'>Teléfono *</label>
        <div className='flex gap-3'>
          <select
            value={codigoPais}
            onChange={e => {
              setCodigoPais(e.target.value)
              if (telefono) validarTelefono(telefono, e.target.value) // Revalida si cambias de país
            }}
            required
            disabled={isSubmitting}
            className='w-1/3 border border-[var(--border-subtle)] bg-[var(--bg-body)] text-[var(--text-primary)] focus:border-[var(--brand-primary)] outline-none rounded-lg px-2 py-3 disabled:opacity-50'
          >
            <option value=''>Código</option>
            <optgroup label='Latinoamérica'>
              <option value='+57'>+57 Colombia</option>
              <option value='+52'>+52 México</option>
              <option value='+54'>+54 Argentina</option>
              <option value='+56'>+56 Chile</option>
              <option value='+51'>+51 Perú</option>
              <option value='+58'>+58 Venezuela</option>
              <option value='+593'>+593 Ecuador</option>
              <option value='+55'>+55 Brasil</option>
              <option value='+506'>+506 Costa Rica</option>
            </optgroup>
            <optgroup label='Europa y Norteamérica'>
              <option value='+34'>+34 España</option>
              <option value='+1'>+1 USA / Canadá</option>
            </optgroup>
          </select>

          <input
            type='text'
            inputMode='numeric'
            value={telefono}
            placeholder='Número de teléfono'
            disabled={isSubmitting || !codigoPais} // Se bloquea si no hay país seleccionado
            onChange={e => {
              const valor = e.target.value
              if (/^\d*$/.test(valor)) {
                // Prevenir que se exceda el máximo permitido
                const regla = PHONE_RULES[codigoPais] || PHONE_RULES['default']
                if (valor.length <= regla.max) {
                  setTelefono(valor)
                  validarTelefono(valor, codigoPais)
                } else {
                  // Si intenta meter un número extra, le mostramos el error
                  setTelefonoError(
                    `Excediste los números permitidos (${regla.msg})`
                  )
                }
              }
            }}
            className={`w-2/3 border rounded-lg px-4 py-3 bg-[var(--bg-body)] text-[var(--text-primary)] focus:border-[var(--brand-primary)] outline-none transition-colors ${
              telefonoError ? 'border-red-500' : 'border-[var(--border-subtle)]'
            } disabled:opacity-50`}
          />
        </div>
        {telefonoError && (
          <p className='text-red-500 text-xs font-bold'>{telefonoError}</p>
        )}
      </div>

      {/* Mensaje */}
      <div className='space-y-1'>
        <label className='text-sm font-medium'>Mensaje</label>
        <div className='relative'>
          <textarea
            value={mensaje}
            disabled={isSubmitting}
            onChange={e => {
              if (e.target.value.length <= MAX_CARACTERES) {
                setMensaje(e.target.value)
              }
            }}
            placeholder='Opcional: Cuéntame brevemente en qué puedo ayudarte...'
            className='w-full border border-[var(--border-subtle)] rounded-lg px-4 py-3 min-h-[120px] pb-8 bg-[var(--bg-body)] text-[var(--text-primary)] focus:border-[var(--brand-primary)] outline-none transition-colors resize-none disabled:opacity-50'
          />
          <span
            className={`absolute bottom-3 right-4 text-xs font-bold ${
              caracteresRestantes < 20
                ? 'text-red-500'
                : 'text-[var(--text-secondary)] opacity-60'
            }`}
          >
            {caracteresRestantes}
          </span>
        </div>
      </div>

      {/* Legales */}
      <div className='space-y-2 text-sm'>
        <label className='flex gap-2 text-[var(--text-secondary)]'>
          <input
            type='checkbox'
            checked={aceptaLegales}
            disabled={isSubmitting}
            onChange={e => setAceptaLegales(e.target.checked)}
            className='accent-[var(--brand-primary)] mt-1 shrink-0'
          />
          <span className='leading-snug'>
            Acepto los{' '}
            <Link
              href='/terminos'
              className='underline hover:text-[var(--brand-primary)]'
            >
              términos y condiciones
            </Link>{' '}
            y la{' '}
            <Link
              href='/privacidad'
              className='underline hover:text-[var(--brand-primary)]'
            >
              política de privacidad
            </Link>
            .
          </span>
        </label>
      </div>

      {/* Cloudflare Turnstile */}
      <div className='flex justify-center my-4'>
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={token => setTurnstileToken(token)}
          options={{
            theme: 'auto' // Se adapta a modo oscuro/claro
          }}
        />
      </div>

      {/* =====================================================
          Botón Enviar (Inteligente y sin bug de Hover)
          ===================================================== */}
      <div
        className={
          !isFormValid || isSubmitting ? 'cursor-not-allowed w-fit' : 'w-fit'
        }
      >
        <button
          type='submit'
          disabled={isSubmitting || !isFormValid}
          title={
            !isFormValid
              ? 'Debes completar el formulario correctamente'
              : 'Enviar mensaje'
          }
          className={`button-send overflow-hidden text-[var(--text-white2)] transition-all duration-300 ${
            !isFormValid || isSubmitting
              ? 'opacity-50 grayscale pointer-events-none' // <-- Esto APAGA la animación rota
              : 'hover:scale-[1.02]'
          }`}
        >
          <div className='svg-wrapper-1'>
            <div className='svg-wrapper'>
              {isSubmitting ? (
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
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
          <span>
            {isSubmitting
              ? 'Enviando...'
              : !isFormValid
              ? 'Faltan datos'
              : 'Enviar mensaje'}
          </span>
        </button>
      </div>
    </form>
  )
}


