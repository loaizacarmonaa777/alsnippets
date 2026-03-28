'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Turnstile } from '@marsidev/react-turnstile'
import confetti from 'canvas-confetti'
import { motion, AnimatePresence } from 'framer-motion'
import { getCountries, getCountryCallingCode } from 'libphonenumber-js'
import { submitLead } from '@/app/actions/leads'

/* =====================================================
    DATA: LISTADO DE PAÍSES (DINÁMICO)
===================================================== */
const LISTA_PAISES = getCountries()
  .map(country => ({
    code: `+${getCountryCallingCode(country)}`,
    iso: country
  }))
  .sort((a, b) => parseInt(a.code) - parseInt(b.code))

/* =====================================================
    SELECTOR DE PAÍS CON BUSCADOR (PROTOCOLO ALSNIPPETS)
===================================================== */
const CountrySearchSelect = ({ value, onChange, disabled, t }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  // ✅ Ahora ya no dará error porque LISTA_PAISES existe arriba
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
      {/* Botón Principal */}
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className='w-full border border-[var(--border-1)] bg-[var(--bg-1)] rounded-lg px-3 py-3 text-left outline-none focus:border-[var(--border-brand)] flex justify-between items-center text-sm font-bold'
      >
        <span className='truncate'>
          {selected
            ? `${selected.code} (${selected.iso})`
            : t.placeholders.country_code || 'Ext'}
        </span>
        <span className='text-[10px] opacity-50'>▼</span>
      </button>

      {/* Menú Desplegable con Buscador */}
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
            <div className='max-h-60 overflow-y-auto custom-scrollbar'>
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

/* =====================================================
   COMPONENTE PRINCIPAL: FormAuditoria
===================================================== */
export default function FormAuditoria ({
  lang,
  dict
}: {
  lang: string
  dict: any
}) {
  const t = dict

  // 1. Inicialización con recuperación de datos (Drafts)
  const [tipoServicio, setTipoServicio] = useState(() => (typeof window !== 'undefined' ? sessionStorage.getItem('audit_service') || '' : ''))
  const [nombreCompleto, setNombreCompleto] = useState(() => (typeof window !== 'undefined' ? sessionStorage.getItem('audit_name') || '' : ''))
  const [email, setEmail] = useState(() => (typeof window !== 'undefined' ? sessionStorage.getItem('audit_email') || '' : ''))
  const [codigoPais, setCodigoPais] = useState(() => (typeof window !== 'undefined' ? sessionStorage.getItem('audit_prefix') || '' : ''))
  const [telefono, setTelefono] = useState(() => (typeof window !== 'undefined' ? sessionStorage.getItem('audit_phone') || '' : ''))
  const [mensajeAuditoria, setMensajeAuditoria] = useState(() => (typeof window !== 'undefined' ? sessionStorage.getItem('audit_msg') || '' : ''))
  const [medioContacto, setMedioContacto] = useState(() => (typeof window !== 'undefined' ? sessionStorage.getItem('audit_media') || '' : ''))
  const [aceptaLegales, setAceptaLegales] = useState(false)

  // 2. Efecto de guardado automático y limpieza al desmontar
  useEffect(() => {
    sessionStorage.setItem('audit_service', tipoServicio)
    sessionStorage.setItem('audit_name', nombreCompleto)
    sessionStorage.setItem('audit_email', email)
    sessionStorage.setItem('audit_prefix', codigoPais)
    sessionStorage.setItem('audit_phone', telefono)
    sessionStorage.setItem('audit_msg', mensajeAuditoria)
    sessionStorage.setItem('audit_media', medioContacto)

    return () => {
      sessionStorage.removeItem('audit_service')
      sessionStorage.removeItem('audit_name')
      sessionStorage.removeItem('audit_email')
      sessionStorage.removeItem('audit_prefix')
      sessionStorage.removeItem('audit_phone')
      sessionStorage.removeItem('audit_msg')
      sessionStorage.removeItem('audit_media')
    }
  }, [tipoServicio, nombreCompleto, email, codigoPais, telefono, mensajeAuditoria, medioContacto])

  const [telefonoError, setTelefonoError] = useState('')
  const [nombreTocado, setNombreTocado] = useState(false)
  const [emailTocado, setEmailTocado] = useState(false)
  const [telefonoTocado, setTelefonoTocado] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [apiError, setApiError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')

  const MAX_CARACTERES = 500
  const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '')
    if (!codigoPais) {
      setTelefonoError(t.validation.err_pais)
      return
    }
    const regla = PHONE_RULES[codigoPais] || PHONE_RULES.default
    if (val.length <= regla.max) {
      setTelefono(val)
      setTelefonoError(
        val.length > 0 && val.length < regla.min
          ? `${t.validation.err_tel_missing} (${regla.msg})`
          : ''
      )
    } else {
      setTelefonoError(`${t.validation.err_tel_exceed} (${regla.msg})`)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setApiError('')

    try {
      // 1. ✅ PERSISTENCIA EN SUPABASE
      const result = await submitLead({
        email: email,
        nombre: nombreCompleto,
        telefono: `${codigoPais} ${telefono}`,
        source: 'auditoria',
        lang: lang,
        metadata: {
          tipo_servicio: tipoServicio,
          medio_contacto: medioContacto,
          mensaje_auditoria: mensajeAuditoria,
          turnstile: turnstileToken
        }
      })

      // 2. Envío a tu API actual
      const response = await fetch('/api/auditoria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipoServicio,
          nombreCompleto,
          email,
          codigoPais,
          telefono,
          medioContacto,
          mensajeAuditoria,
          turnstileToken,
          lang
        })
      })

      if (response.ok || result.success) {
        // ✅ PROTOCOLO ALSNIPPETS: Notificar a GTM
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          ;(window as any).dataLayer.push({
            event: 'form_success',
            form_id: 'audit_request',
            service_type: tipoServicio,
            contact_method: medioContacto,
            language: lang
          })
        }

        const end = Date.now() + 3000
        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#c9a34e', '#ffffff']
          })
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#c9a34e', '#ffffff']
          })
          if (Date.now() < end) requestAnimationFrame(frame)
        }
        frame()
        setIsSuccess(true)
      } else {
        setApiError(t.buttons.error_title)
      }
    } catch (error) {
      setApiError('Error de conexión')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nameValidation = {
    isValid:
      nombreCompleto
        .trim()
        .split(/\s+/)
        .filter(w => w.length > 0).length >= 2,
    error: t.validation.err_name
  }
  const emailValidation = {
    isValid: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email),
    error: t.validation.err_email
  }
  const phoneValidation = useMemo(() => {
    if (!codigoPais || !telefono)
      return { isValid: false, error: null, msgInfo: '' } // 👈 Añadido msgInfo vacío
    const rule = PHONE_RULES[codigoPais] || PHONE_RULES.default

    const isValid = telefono.length >= rule.min && telefono.length <= rule.max

    return {
      isValid,
      error: !isValid
        ? telefono.length < rule.min
          ? t.validation.err_tel_missing
          : t.validation.err_tel_exceed
        : null,
      msgInfo: rule.msg // 👈 ESTA ES LA CLAVE: Aquí es donde se define
    }
  }, [codigoPais, telefono, t])
  const charCount = useMemo(() => {
    const remaining = MAX_CARACTERES - mensajeAuditoria.length
    return { remaining, isOverLimit: remaining < 0 }
  }, [mensajeAuditoria])

  const nombreIncompleto =
    nombreTocado && !nameValidation.isValid ? nameValidation.error : null
  const emailInvalido =
    emailTocado && !emailValidation.isValid ? emailValidation.error : null
  const phoneErrorDisplay =
    telefonoError ||
    (telefonoTocado && !phoneValidation.isValid ? phoneValidation.error : null)

  const isFormValid =
    nameValidation.isValid &&
    emailValidation.isValid &&
    phoneValidation.isValid &&
    tipoServicio !== '' &&
    medioContacto !== '' &&
    aceptaLegales &&
    turnstileToken !== '' &&
    !charCount.isOverLimit

  return (
    <AnimatePresence mode='wait'>
      {!isSuccess ? (
        <motion.form
          key='audit-form'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className='space-y-8 relative'
        >
          <input
            type='text'
            name='empresa'
            tabIndex={-1}
            autoComplete='off'
            className='hidden'
          />
          {apiError && (
            <div className='p-4 bg-red-500/10 border border-red-500/30 text-red-500 text-sm rounded-xl text-center font-medium animate-pulse'>
              {apiError}
            </div>
          )}

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* SERVICIO */}
            <div className='space-y-2 md:col-span-2'>
              <label className='text-sm font-bold text-[var(--text-1)] uppercase tracking-wider'>
                {t.head} <span className='text-red-500'>*</span>
              </label>
              <select
                value={tipoServicio}
                onChange={e => setTipoServicio(e.target.value)}
                disabled={isSubmitting}
                className='w-full bg-[var(--bg-1)] text-[var(--text-1)] border border-[var(--border-1)] focus:border-[var(--border-brand)] rounded-xl px-4 py-3.5 outline-none disabled:opacity-50'
              >
                <option value=''>{t.placeholders.select_option}</option>
                <option value='consultoria'>
                  {t.placeholders.consultancy}
                </option>
                <option value='auditoria'>
                  {t.placeholders.technical_audit}
                </option>
              </select>
            </div>

            {/* NOMBRE */}
            <div className='space-y-2 md:col-span-2'>
              <label className='text-sm font-bold text-[var(--text-1)] uppercase tracking-wider'>
                {t.placeholders.name} <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                value={nombreCompleto}
                placeholder={t.placeholders.name_ph}
                onChange={e => setNombreCompleto(e.target.value)}
                onBlur={() => setNombreTocado(true)}
                disabled={isSubmitting}
                className={`w-full bg-[var(--bg-1)] border rounded-xl px-4 py-3.5 outline-none transition-colors ${
                  nombreIncompleto
                    ? 'border-red-500'
                    : nombreTocado && nameValidation.isValid
                    ? 'border-green-500'
                    : 'border-[var(--border-1)]'
                }`}
              />
              {nombreIncompleto && (
                <p className='text-red-500 text-sm font-medium'>
                  {nombreIncompleto}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div className='space-y-2 md:col-span-2'>
              <label className='text-sm font-bold text-[var(--text-1)] uppercase tracking-wider'>
                {t.placeholders.email} <span className='text-red-500'>*</span>
              </label>
              <input
                type='email'
                value={email}
                placeholder={t.placeholders.email_ph}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => setEmailTocado(true)}
                disabled={isSubmitting}
                className={`w-full bg-[var(--bg-1)] border rounded-xl px-4 py-3.5 outline-none transition-colors ${
                  emailInvalido
                    ? 'border-red-500'
                    : emailTocado && emailValidation.isValid
                    ? 'border-green-500'
                    : 'border-[var(--border-1)]'
                }`}
              />
              {emailInvalido && (
                <p className='text-red-500 text-sm font-medium'>
                  {emailInvalido}
                </p>
              )}
            </div>

            {/* MEDIO CONTACTO */}
            <div className='space-y-2 md:col-span-2'>
              <label className='text-sm font-bold text-[var(--text-1)] uppercase tracking-wider'>
                {t.placeholders.media} <span className='text-red-500'>*</span>
              </label>
              <select
                value={medioContacto}
                onChange={e => setMedioContacto(e.target.value)}
                disabled={isSubmitting}
                className='w-full bg-[var(--bg-1)] border border-[var(--border-1)] rounded-xl px-4 py-3.5 outline-none'
              >
                <option value=''>{t.placeholders.media_ph}</option>
                <option value='whatsapp'>WhatsApp</option>
                <option value='google-meet'>Google Meet</option>
                <option value='zoom'>Zoom</option>
              </select>
              <p className='text-xs text-[var(--text-3)] mt-1'>
                {t.notes.media_note}
              </p>
            </div>

            {/* TELÉFONO */}
            {/* SECCIÓN TELÉFONO: BLINDAJE VISUAL ALSNIPPETS */}
            <div className='space-y-2 md:col-span-2'>
              <label className='text-sm font-bold text-[var(--text-1)] uppercase tracking-wider'>
                {t.placeholders.phone} <span className='text-red-500'>*</span>
              </label>

              <div className='flex gap-3'>
                {/* 1. EL BUSCADOR (LA PIEZA INSTALADA) */}
                <CountrySearchSelect
                  value={codigoPais}
                  onChange={setCodigoPais}
                  disabled={isSubmitting}
                  t={t}
                />

                {/* 2. EL INPUT CON LÓGICA DE COLORES */}
                <input
                  type='text'
                  value={telefono}
                  placeholder={t.placeholders.phone_ph}
                  onChange={handlePhoneChange}
                  onBlur={() => setTelefonoTocado(true)}
                  // ✅ BORDES DINÁMICOS: Verde si es válido, Rojo si hay error
                  className={`w-full bg-[var(--bg-1)] border rounded-xl px-4 py-3.5 outline-none transition-all duration-300 ${
                    phoneErrorDisplay
                      ? 'border-red-500 bg-red-500/5 shadow-[0_0_10px_rgba(239,68,68,0.1)]'
                      : telefono.length > 0 && phoneValidation.isValid
                      ? 'border-green-500 bg-green-500/5 shadow-[0_0_10px_rgba(34,197,94,0.1)]'
                      : 'border-[var(--border-1)] focus:border-[var(--border-brand)]'
                  }`}
                />
              </div>

              {/* 3. MENSAJES DE ERROR/INFO (ANIME PRESENCE PARA SUAVIDAD) */}
              <AnimatePresence>
                {phoneErrorDisplay && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='text-red-500 text-xs font-bold mt-1'
                  >
                    {phoneErrorDisplay}
                  </motion.p>
                )}
                {!phoneErrorDisplay &&
                  telefono.length > 0 &&
                  phoneValidation.isValid && (
                    <p className='text-green-500 text-[10px] font-bold mt-1'>
                      ✓ {phoneValidation.msgInfo || 'Número válido'}
                    </p>
                  )}
              </AnimatePresence>
            </div>

            {/* MENSAJE AUDITORÍA */}
            {tipoServicio === 'auditoria' && (
              <div className='space-y-2 md:col-span-2'>
                <label className='text-sm font-bold text-[var(--text-1)] uppercase tracking-wider'>
                  {t.placeholders.message_label}{' '}
                  <span className='text-red-500'>*</span>
                </label>
                <textarea
                  value={mensajeAuditoria}
                  disabled={isSubmitting}
                  onChange={e =>
                    e.target.value.length <= MAX_CARACTERES &&
                    setMensajeAuditoria(e.target.value)
                  }
                  placeholder={t.placeholders.message_ph}
                  className={`w-full bg-[var(--bg-1)] border rounded-xl px-4 py-4 outline-none min-h-[140px] resize-y transition-colors ${
                    mensajeAuditoria.length > 0 && !charCount.isOverLimit
                      ? 'border-green-500'
                      : 'border-[var(--border-1)]'
                  }`}
                />
                <p className='text-xs font-medium text-[var(--text-3)]'>
                  {t.validation.char_remaining}{' '}
                  <span
                    className={charCount.remaining < 50 ? 'text-red-500' : ''}
                  >
                    {charCount.remaining}
                  </span>
                </p>
              </div>
            )}

            {/* LEGALES */}
            <div className='md:col-span-2 space-y-2 bg-[var(--bg-3)]/30 p-5 rounded-xl border border-[var(--border-1)]'>
              <label className='flex items-start gap-3 cursor-pointer'>
                <input
                  type='checkbox'
                  checked={aceptaLegales}
                  disabled={isSubmitting}
                  onChange={e => setAceptaLegales(e.target.checked)}
                  className='mt-1 w-5 h-5 accent-[var(--bg-brand)]'
                />
                <span className='text-sm text-[var(--text-2)] leading-relaxed'>
                  {t.legales.accept}{' '}
                  <Link
                    href={`/${lang}/terminos`}
                    className='font-bold text-[var(--text-brand)] hover:underline'
                  >
                    {t.legales.terms}
                  </Link>{' '}
                  {t.legales.and}{' '}
                  <Link
                    href={`/${lang}/privacidad`}
                    className='font-bold text-[var(--text-brand)] hover:underline'
                  >
                    {t.legales.privacy}
                  </Link>
                  {t.legales.confidentiality}
                </span>
              </label>
            </div>

            <div className='md:col-span-2 flex justify-center my-2'>
              <Turnstile
                siteKey={TURNSTILE_SITE_KEY}
                onSuccess={setTurnstileToken}
                options={{ theme: 'auto', size: 'flexible' }}
              />
            </div>

            {/* BOTÓN ENVIAR */}
            <div
              className={`md:col-span-2 pt-4 flex justify-center w-full ${
                !isFormValid || isSubmitting ? 'cursor-not-allowed' : ''
              }`}
            >
              <button
                type='submit'
                disabled={isSubmitting || !isFormValid}
                title={!isFormValid ? t.buttons.error_title : t.buttons.submit}
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
                        width='24'
                        height='24'
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
                    : t.buttons.submit}
                </span>
              </button>
            </div>
          </div>
        </motion.form>
      ) : (
        <motion.div
          key='audit-success'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className='text-center py-20 px-5 space-y-6'
        >
          <div className='flex justify-center'>
            <div className='p-4 bg-green-500/10 rounded-full'>
              <svg
                className='w-16 h-16 text-green-500'
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
          <h3 className='text-3xl font-bold text-[var(--text-1)]'>
            {t.messages.success_head}
          </h3>
          <p className='text-[var(--text-2)] max-w-md mx-auto'>
            {t.messages.success_body} <strong>{medioContacto}</strong>.
          </p>
          <button
            type='button'
            onClick={() => (window.location.href = '/' + lang)}
            className='mt-6 text-[var(--text-brand)] hover:underline font-bold'
          >
            {t.buttons.back_home}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
