'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Turnstile } from '@marsidev/react-turnstile'
import confetti from 'canvas-confetti'
import { motion, AnimatePresence } from 'framer-motion'
import { getCountries, getCountryCallingCode } from 'libphonenumber-js'

/* =====================================================
   DATA: LISTADO DE PAÍSES
===================================================== */
const LISTA_PAISES = getCountries()
  .map(country => ({
    code: `+${getCountryCallingCode(country)}`,
    iso: country
    // Aquí puedes mapear nombres si quieres, o dejar solo el código
  }))
  .sort((a, b) => parseInt(a.code) - parseInt(b.code))

// Reemplaza todo el bloque antiguo de COUNTRY_OPTIONS y CountrySearchSelect por este selector simple:
const CleanCountrySelect = ({ value, onChange, t }: any) => (
  <select
    value={value}
    onChange={e => onChange(e.target.value)}
    className='w-1/3 border border-[var(--border-1)] bg-[var(--bg-1)] rounded-lg px-3 py-3 outline-none focus:border-[var(--border-brand)] text-sm font-bold'
  >
    <option value=''>{t.placeholders.country_code || 'Ext'}</option>
    {LISTA_PAISES.map((c, i) => (
      <option key={i} value={c.code}>
        {c.code} ({c.iso})
      </option>
    ))}
  </select>
)

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
  default: { min: 7, max: 15, msg: 'Entre 7 y 15 dígitos' }
}

export default function ContactForm ({
  lang,
  dict
}: {
  lang: string
  dict: any
}) {
  const t = dict

  // --- Estados ---
  const [nombreCompleto, setNombreCompleto] = useState('')
  const [email, setEmail] = useState('')
  const [codigoPais, setCodigoPais] = useState('')
  const [telefono, setTelefono] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [aceptaLegales, setAceptaLegales] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  const [nombreTocado, setNombreTocado] = useState(false)
  const [emailTocado, setEmailTocado] = useState(false)
  const [telefonoTocado, setTelefonoTocado] = useState(false)
  const [telefonoError, setTelefonoError] = useState('')

  const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

  // --- Validaciones (funciones separadas) ---
  const validateName = (
    name: string
  ): { isValid: boolean; error: string | null } => {
    const words = name
      .trim()
      .split(/\s+/)
      .filter(w => w.length > 0)
    // Regla: Mínimo 2 palabras (Nombre y Apellido)
    if (words.length < 2)
      return { isValid: false, error: t.validation.name_incomplete }
    return { isValid: true, error: null }
  }

  const validateEmail = (
    email: string
  ): { isValid: boolean; error: string | null } => {
    if (!email.includes('@'))
      return { isValid: false, error: t.validation.email_missing_at }
    const domainPart = email.split('@')[1]
    if (!domainPart || !domainPart.includes('.'))
      return { isValid: false, error: t.validation.email_missing_domain }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regex.test(email))
      return { isValid: false, error: t.validation.email_invalid }
    return { isValid: true, error: null }
  }

  const validatePhoneNumber = (
    code: string,
    number: string
  ): { isValid: boolean; error: string | null; isInfo: boolean } => {
    if (!code || !number) return { isValid: false, error: null, isInfo: false }
    const rule = PHONE_RULES[code] || PHONE_RULES.default
    if (number.length < rule.min)
      return {
        isValid: false,
        error: t.validation.phone_too_short,
        isInfo: false
      }
    if (number.length > rule.max)
      return {
        isValid: false,
        error: t.validation.phone_too_long,
        isInfo: false
      }
    return { isValid: true, error: rule.msg, isInfo: true }
  }

  const getCharCount = (
    text: string
  ): { count: number; remaining: number; isOverLimit: boolean } => {
    const count = text.length
    const limit = 500
    const remaining = limit - count
    return { count, remaining, isOverLimit: remaining < 0 }
  }

  // --- Estados de validación derivados ---
  const nameValidation = validateName(nombreCompleto)
  const emailValidation = validateEmail(email)
  const phoneValidation = validatePhoneNumber(codigoPais, telefono)
  const charCount = useMemo(() => getCharCount(mensaje), [mensaje])

  // --- Efecto para validación general del formulario ---
  useEffect(() => {
    const todoValido =
      nameValidation.isValid &&
      emailValidation.isValid &&
      phoneValidation.isValid &&
      aceptaLegales &&
      turnstileToken !== '' &&
      mensaje.trim() !== '' &&
      !charCount.isOverLimit
  }, [
    nameValidation,
    emailValidation,
    phoneValidation,
    aceptaLegales,
    turnstileToken,
    mensaje,
    charCount
  ])

  // --- Handlers ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formIsValid =
      nameValidation.isValid &&
      emailValidation.isValid &&
      phoneValidation.isValid &&
      aceptaLegales &&
      turnstileToken !== '' &&
      !charCount.isOverLimit

    if (!formIsValid) return

    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nombreCompleto,
          email,
          phone: `${codigoPais} ${telefono}`,
          message: mensaje,
          lang,
          turnstileToken
        })
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error || t.messages.error_submit)

        // ✅ PROTOCOLO ALSNIPPETS: Notificar a GTM del éxito en contacto
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'form_success',
          form_id: 'contact_main',
          language: lang,
          country_code: codigoPais // Dato útil para saber de dónde te escriben más
        });
      }

      // 🎊 SECCIÓN: VITAMINA USUARIO (Confetti)
      const end = Date.now() + 2 * 1000
      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff4d00', '#ffffff']
        })
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff4d00', '#ffffff']
        })
        if (Date.now() < end) requestAnimationFrame(frame)
      }
      frame()

      setSuccessMessage(t.messages.success)

      setNombreCompleto('')
      setEmail('')
      setCodigoPais('')
      setTelefono('')
      setMensaje('')
      setAceptaLegales(false)
      setTurnstileToken('')
      setNombreTocado(false)
      setEmailTocado(false)
      setTelefonoTocado(false)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : t.messages.error_submit
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTurnstileError = () => {
    setTurnstileToken('')
    setErrorMessage(t.validation.turnstile_error || 'Error Turnstile')
  }

  // --- Lógica de Alertas en Tiempo Real ---
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '')

    if (!codigoPais) {
      setTelefonoError(t.validation.errPais || 'Selecciona un país')
      return
    }

    const regla = PHONE_RULES[codigoPais] || PHONE_RULES.default

    if (val.length <= regla.max) {
      setTelefono(val)
      if (val.length > 0 && val.length < regla.min) {
        setTelefonoError(`${t.validation.phone_too_short} (${regla.msg})`)
      } else {
        setTelefonoError('')
      }
    } else {
      setTelefonoError(`${t.validation.phone_too_long} (${regla.msg})`)
    }
  }

  const nombreIncompleto =
    nombreTocado && !nameValidation.isValid ? nameValidation.error : null
  const emailError =
    emailTocado && !emailValidation.isValid ? emailValidation.error : null

  // CORRECCIÓN: Unificamos los errores del validador automático y el manual de escritura
  const phoneError =
    telefonoError ||
    (telefonoTocado && !phoneValidation.isValid ? phoneValidation.error : null)

  const phoneInfo =
    !phoneError &&
    telefonoTocado &&
    phoneValidation.isValid &&
    phoneValidation.isInfo
      ? phoneValidation.error
      : null

  // Estado de validez final
  const isFormValid =
    nameValidation.isValid &&
    emailValidation.isValid &&
    phoneValidation.isValid &&
    aceptaLegales &&
    turnstileToken !== '' &&
    !charCount.isOverLimit

  return (
    <AnimatePresence mode='wait'>
      {!successMessage ? (
        <motion.form
          key='contact-form'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className='space-y-6 relative'
        >
          {/* NOMBRE */}
          <div>
            <input
              type='text'
              value={nombreCompleto}
              onChange={e => setNombreCompleto(e.target.value)}
              onBlur={() => setNombreTocado(true)}
              placeholder={t.placeholders.name}
              disabled={isSubmitting}
              className={`w-full border rounded-lg px-4 py-3 bg-[var(--bg-1)] border-[var(--border-1)] outline-none focus:border-[var(--border-brand)] disabled:opacity-50 placeholder-[var(--text-3)] ${
                nombreTocado && nameValidation.isValid ? 'border-green-500' : ''
              }`}
            />
            {nombreIncompleto && (
              <p className='text-xs text-red-500 mt-1'>{nombreIncompleto}</p>
            )}
          </div>
          {/* EMAIL */}
          <div>
            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={() => setEmailTocado(true)}
              placeholder={t.placeholders.email}
              disabled={isSubmitting}
              className={`w-full border rounded-lg px-4 py-3 bg-[var(--bg-1)] border-[var(--border-1)] outline-none focus:border-[var(--border-brand)] disabled:opacity-50 placeholder-[var(--text-3)] ${
                emailTocado && emailValidation.isValid ? 'border-green-500' : ''
              }`}
            />
            {emailError && (
              <p className='text-xs text-red-500 mt-1'>{emailError}</p>
            )}
          </div>
          {/* TELÉFONO */}
          <div>
            <div className='flex gap-3'>
              <CleanCountrySelect
                value={codigoPais}
                onChange={setCodigoPais}
                t={t}
              />
              <input
                type='tel'
                value={telefono}
                placeholder={t.placeholders.phone}
                onChange={handlePhoneChange}
                onBlur={() => setTelefonoTocado(true)}
                className={`w-2/3 border rounded-lg px-4 py-3 bg-[var(--bg-1)] border-[var(--border-1)] outline-none focus:border-[var(--border-brand)] placeholder-[var(--text-3)] ${
                  telefonoTocado && phoneValidation.isValid
                    ? 'border-green-500'
                    : ''
                }`}
              />
            </div>
            {phoneError && (
              <p className='text-xs text-red-500 mt-1'>{phoneError}</p>
            )}
            {phoneInfo && !phoneError && (
              <p className='text-xs text-[var(--text-2)] mt-1'>{phoneInfo}</p>
            )}
          </div>
          {/* MENSAJE */}
          <div>
            <textarea
              value={mensaje}
              onChange={e => {
                const words = e.target.value.trim()
                  ? e.target.value
                      .trim()
                      .split(/\s+/)
                      .filter(w => w.length > 0)
                  : []
                if (words.length <= 300) {
                  setMensaje(e.target.value)
                }
              }}
              placeholder={t.placeholders.message}
              disabled={isSubmitting}
              className='w-full border border-[var(--border-1)] rounded-lg px-4 py-3 min-h-[100px] bg-[var(--bg-1)] outline-none focus:border-[var(--border-brand)] resize-none disabled:opacity-50 placeholder-[var(--text-3)]'
            />
            {/* Contador de caracteres */}
            <div className='flex justify-end mt-1'>
              <span
                className={`text-xs ${
                  charCount.isOverLimit
                    ? 'text-red-500'
                    : 'text-[var(--text-2)]'
                }`}
              >
                {charCount.remaining}{' '}
                {Math.abs(charCount.remaining) === 1
                  ? t.validation.character
                  : t.validation.characters}{' '}
                {t.validation.remaining}
              </span>
            </div>
          </div>

          {/* CHECKBOX TÉRMINOS */}
          <div className='text-sm'>
            <label className='flex gap-2 text-[var(--text-2)] cursor-pointer'>
              <input
                type='checkbox'
                checked={aceptaLegales}
                onChange={e => setAceptaLegales(e.target.checked)}
                disabled={isSubmitting}
                className='accent-[var(--bg-brand)] mt-1'
              />
              <span>
                {t.legales.accept}{' '}
                <Link
                  href={`/${lang}/terminos`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline hover:text-[var(--text-brand)]'
                >
                  {t.legales.terms}
                </Link>{' '}
                {t.legales.and}{' '}
                <Link
                  href={`/${lang}/privacidad`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline hover:text-[var(--text-brand)]'
                >
                  {t.legales.privacy}
                </Link>
                .
              </span>
            </label>
          </div>

          {/* SECCIÓN INICIO: VERIFICACIÓN TURNSTILE */}
          <div className='flex justify-center my-4'>
            <Turnstile
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={token => setTurnstileToken(token)}
              options={{
                theme: 'auto',
                language: lang // Esto es vital para que cargue tras el cambio de carpeta
              }}
              onError={handleTurnstileError}
              onExpire={() => setTurnstileToken('')}
            />
          </div>

          {/* BOTÓN ENVIAR */}
          <div
            className={
              !isFormValid || isSubmitting
                ? 'cursor-not-allowed w-fit mx-auto'
                : 'w-fit mx-auto'
            }
          >
            <button
              type='submit'
              disabled={isSubmitting || !isFormValid}
              title={!isFormValid ? t.buttons.error_title : t.buttons.send}
              className={`button-send rounded-xl text-white transition-all duration-300 ${
                !isFormValid || isSubmitting
                  ? 'opacity-50 grayscale pointer-events-none'
                  : 'hover:scale-[1.05] active:scale-95'
              }`}
            >
              <div className='svg-wrapper-1'>
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
              <span className='font-bold'>
                {isSubmitting
                  ? t.buttons.sending
                  : !isFormValid
                  ? t.buttons.missing_data
                  : t.buttons.send}
              </span>
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.div
          key='success-message'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className='text-center py-20 px-5 space-y-4'
        >
          <div className='flex justify-center mb-6'>
            <div className='p-4 bg-green-500/10 rounded-full'>
              <svg
                className='w-12 h-12 text-green-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5 13l4 4L19 7'
                ></path>
              </svg>
            </div>
          </div>
          <h3 className='text-2xl font-bold text-[var(--text-1)]'>
            {t.messages.confirm_title}
          </h3>
          <p className='text-[var(--text-2)] max-w-sm mx-auto leading-relaxed'>
            {t.messages.confirm_desc}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
