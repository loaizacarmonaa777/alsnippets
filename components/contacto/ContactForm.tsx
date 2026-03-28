'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Turnstile } from '@marsidev/react-turnstile'
import confetti from 'canvas-confetti'
import { motion, AnimatePresence } from 'framer-motion'
import { getCountries, getCountryCallingCode } from 'libphonenumber-js'
import { submitLead } from '@/app/actions/leads'

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

/* =====================================================
    SELECTOR DE PAÍS CON BUSCADOR (PROTOCOLO ALSNIPPETS)
===================================================== */
const CountrySearchSelect = ({ value, onChange, disabled, t }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredCountries = useMemo(() => {
    return LISTA_PAISES.filter(
      c =>
        c.code.includes(search) ||
        c.iso.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  const selected = LISTA_PAISES.find(c => c.code === value)

  return (
    <div className='relative w-1/3'>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className='w-full border border-[var(--border-1)] bg-[var(--bg-1)] rounded-lg px-3 py-3 text-left outline-none focus:border-[var(--border-brand)] flex justify-between items-center text-sm font-bold disabled:opacity-50'
      >
        <span className='truncate'>
          {selected
            ? `${selected.code} (${selected.iso})`
            : t.placeholders.country_code || 'Ext'}
        </span>
        <span className='text-[10px] opacity-50'>▼</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='absolute z-[100] mt-1 w-64 bg-[var(--bg-1)] border border-[var(--border-1)] rounded-lg shadow-2xl overflow-hidden'
          >
            <input
              type='text'
              autoFocus
              placeholder={t.placeholders.search_country || 'Buscar...'}
              className='w-full p-3 bg-[var(--bg-2)] border-b border-[var(--border-1)] outline-none text-sm'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className='max-h-60 overflow-y-auto'>
              {filteredCountries.map((c, i) => (
                <button
                  key={i}
                  type='button'
                  className='w-full text-left px-4 py-2 text-sm hover:bg-[var(--bg-brand)] hover:text-black transition-colors'
                  onClick={() => {
                    onChange(c.code)
                    setIsOpen(false)
                    setSearch('')
                  }}
                >
                  {c.code} {c.iso}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

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

  // 1. Inicialización con recuperación de datos (Drafts)
  const [nombreCompleto, setNombreCompleto] = useState(() => (typeof window !== 'undefined' ? sessionStorage.getItem('contact_name') || '' : ''))
  const [email, setEmail] = useState(() => (typeof window !== 'undefined' ? sessionStorage.getItem('contact_email') || '' : ''))
  const [codigoPais, setCodigoPais] = useState(() => (typeof window !== 'undefined' ? sessionStorage.getItem('contact_prefix') || '' : ''))
  const [telefono, setTelefono] = useState(() => (typeof window !== 'undefined' ? sessionStorage.getItem('contact_phone') || '' : ''))
  const [mensaje, setMensaje] = useState(() => (typeof window !== 'undefined' ? sessionStorage.getItem('contact_msg') || '' : ''))
  
  const [aceptaLegales, setAceptaLegales] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string>('')

  // 2. Efecto de guardado automático para persistencia entre idiomas y limpieza al desmontar
  useEffect(() => {
    sessionStorage.setItem('contact_name', nombreCompleto)
    sessionStorage.setItem('contact_email', email)
    sessionStorage.setItem('contact_prefix', codigoPais)
    sessionStorage.setItem('contact_phone', telefono)
    sessionStorage.setItem('contact_msg', mensaje)

    return () => {
      sessionStorage.removeItem('contact_name')
      sessionStorage.removeItem('contact_email')
      sessionStorage.removeItem('contact_prefix')
      sessionStorage.removeItem('contact_phone')
      sessionStorage.removeItem('contact_msg')
    }
  }, [nombreCompleto, email, codigoPais, telefono, mensaje])

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
  const phoneValidation = useMemo(() => {
    if (!codigoPais || !telefono)
      return { isValid: false, error: null, msgInfo: '' }
    const rule = PHONE_RULES[codigoPais] || PHONE_RULES.default

    const isValid = telefono.length >= rule.min && telefono.length <= rule.max

    return {
      isValid,
      error: !isValid
        ? telefono.length < rule.min
          ? t.validation.phone_too_short
          : t.validation.phone_too_long
        : null,
      msgInfo: rule.msg
    }
  }, [codigoPais, telefono, t])
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
      // 1. ✅ PERSISTENCIA EN SUPABASE: Aseguramos el mensaje antes que nada
      const result = await submitLead({
        email: email,
        nombre: nombreCompleto,
        telefono: `${codigoPais} ${telefono}`,
        source: 'contacto',
        lang: lang,
        metadata: {
          mensaje_original: mensaje,
          turnstile: turnstileToken,
          pais_iso: codigoPais,
          enviado_desde: window.location.pathname
        }
      })

      // 2. Envío a tu API actual para recibir el email
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

      // 3. Verificamos éxito (Si falla la API pero Supabase guardó, igual lo tratamos como éxito para el usuario)
      if (response.ok || result.success) {
        // ✅ PROTOCOLO ALSNIPPETS: Notificar a GTM (Mantenemos tu lógica)
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          ;(window as any).dataLayer.push({
            event: 'form_success',
            form_id: 'contact_main',
            language: lang,
            country_code: codigoPais
          })
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

        // Resets de formulario
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
      } else {
        throw new Error(data.error || result.error || t.messages.error_submit)
      }
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

  // CORRECCIÓN: Unificamos los errores para asegurar el borde rojo/verde
  const phoneError =
    telefonoError ||
    (telefonoTocado && !phoneValidation.isValid ? phoneValidation.error : null)

  // Ajustado para usar msgInfo (evita el error isInfo)
  const phoneInfo =
    !phoneError && telefonoTocado && phoneValidation.isValid
      ? phoneValidation.msgInfo
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
              <CountrySearchSelect
                value={codigoPais}
                onChange={setCodigoPais}
                disabled={isSubmitting}
                t={t}
              />
              <input
                type='tel'
                value={telefono}
                placeholder={t.placeholders.phone}
                onChange={handlePhoneChange}
                onBlur={() => setTelefonoTocado(true)}
                className={`w-2/3 border rounded-xl px-4 py-3 bg-[var(--bg-1)] outline-none transition-all duration-300 ${
                  telefonoTocado && phoneError
                    ? 'border-red-500 bg-red-500/5'
                    : telefono.length > 0 && phoneValidation.isValid
                    ? 'border-green-500 bg-green-500/5'
                    : 'border-[var(--border-1)] focus:border-[var(--border-brand)]'
                }`}
              />
            </div>

            <AnimatePresence>
              {telefonoTocado && phoneError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='text-xs text-red-500 mt-1 font-bold'
                >
                  {phoneError}
                </motion.p>
              )}
              {!phoneError &&
                telefono.length > 0 &&
                phoneValidation.isValid && (
                  <p className='text-green-500 text-[10px] font-bold mt-1'>
                    ✓ {phoneValidation.msgInfo}
                  </p>
                )}
            </AnimatePresence>
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
              className={`w-full border border-[var(--border-1)] rounded-lg px-4 py-3 min-h-[100px] bg-[var(--bg-1)] outline-none focus:border-[var(--border-brand)] resize-none disabled:opacity-50 placeholder-[var(--text-3)] transition-all ${
                mensaje.trim().length > 0 && !charCount.isOverLimit
                  ? 'border-green-500 bg-green-500/5'
                  : ''
              }`}
            />
            {/* Contador de caracteres */}
            <div className='flex justify-end mt-1'>
              <span
                className={`text-xs ${
                  charCount.isOverLimit
                    ? 'text-red-500 font-bold'
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
