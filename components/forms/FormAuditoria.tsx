'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Turnstile } from '@marsidev/react-turnstile'
import confetti from 'canvas-confetti'
import { motion, AnimatePresence } from 'framer-motion'

/* =====================================================
   DATA: LISTADO DE PAÍSES
===================================================== */
const COUNTRY_OPTIONS = [
  {
    label: 'África',
    options: [
      { v: '+244', n: 'Angola' },
      { v: '+229', n: 'Benín' },
      { v: '+267', n: 'Botsuana' },
      { v: '+226', n: 'Burkina Faso' },
      { v: '+257', n: 'Burundi' },
      { v: '+238', n: 'Cabo Verde' },
      { v: '+237', n: 'Camerún' },
      { v: '+236', n: 'República Centroafricana' },
      { v: '+235', n: 'Chad' },
      { v: '+269', n: 'Comoras' },
      { v: '+243', n: 'R. D. del Congo' },
      { v: '+242', n: 'R. del Congo' },
      { v: '+225', n: 'Costa de Marfil' },
      { v: '+253', n: 'Yibuti' },
      { v: '+20', n: 'Egipto' },
      { v: '+291', n: 'Eritrea' },
      { v: '+251', n: 'Etiopía' },
      { v: '+241', n: 'Gabón' },
      { v: '+220', n: 'Gambia' },
      { v: '+233', n: 'Ghana' },
      { v: '+224', n: 'Guinea' },
      { v: '+245', n: 'Guinea-Bisáu' },
      { v: '+240', n: 'Guinea Ecuatorial' },
      { v: '+254', n: 'Kenia' },
      { v: '+266', n: 'Lesoto' },
      { v: '+231', n: 'Liberia' },
      { v: '+218', n: 'Libia' },
      { v: '+261', n: 'Madagascar' },
      { v: '+265', n: 'Malaui' },
      { v: '+223', n: 'Malí' },
      { v: '+222', n: 'Mauritania' },
      { v: '+230', n: 'Mauricio' },
      { v: '+212', n: 'Marruecos' },
      { v: '+258', n: 'Mozambique' },
      { v: '+264', n: 'Namibia' },
      { v: '+227', n: 'Níger' },
      { v: '+234', n: 'Nigeria' },
      { v: '+250', n: 'Ruanda' },
      { v: '+239', n: 'Santo Tomé y Príncipe' },
      { v: '+221', n: 'Senegal' },
      { v: '+248', n: 'Seychelles' },
      { v: '+232', n: 'Sierra Leona' },
      { v: '+252', n: 'Somalia' },
      { v: '+27', n: 'Sudáfrica' },
      { v: '+211', n: 'Sudán del Sur' },
      { v: '+249', n: 'Sudán' },
      { v: '+268', n: 'Esuatini' },
      { v: '+255', n: 'Tanzania' },
      { v: '+228', n: 'Togo' },
      { v: '+216', n: 'Túnez' },
      { v: '+256', n: 'Uganda' },
      { v: '+260', n: 'Zambia' },
      { v: '+263', n: 'Zimbabue' }
    ]
  },
  {
    label: 'América',
    options: [
      { v: '+1', n: 'Canadá' },
      { v: '+1', n: 'Estados Unidos' },
      { v: '+52', n: 'México' },
      { v: '+501', n: 'Belice' },
      { v: '+502', n: 'Guatemala' },
      { v: '+503', n: 'El Salvador' },
      { v: '+504', n: 'Honduras' },
      { v: '+505', n: 'Nicaragua' },
      { v: '+506', n: 'Costa Rica' },
      { v: '+507', n: 'Panamá' },
      { v: '+53', n: 'Cuba' },
      { v: '+509', n: 'Haití' },
      { v: '+1', n: 'R. Dominicana' },
      { v: '+1', n: 'Jamaica' },
      { v: '+1', n: 'Trinidad y Tobago' },
      { v: '+54', n: 'Argentina' },
      { v: '+591', n: 'Bolivia' },
      { v: '+55', n: 'Brasil' },
      { v: '+56', n: 'Chile' },
      { v: '+57', n: 'Colombia' },
      { v: '+593', n: 'Ecuador' },
      { v: '+595', n: 'Paraguay' },
      { v: '+51', n: 'Perú' },
      { v: '+598', n: 'Uruguay' },
      { v: '+58', n: 'Venezuela' },
      { v: '+592', n: 'Guyana' },
      { v: '+597', n: 'Surinam' }
    ]
  },
  {
    label: 'Asia',
    options: [
      { v: '+93', n: 'Afganistán' },
      { v: '+374', n: 'Armenia' },
      { v: '+994', n: 'Azerbaiyán' },
      { v: '+973', n: 'Baréin' },
      { v: '+880', n: 'Bangladés' },
      { v: '+975', n: 'Bután' },
      { v: '+673', n: 'Brunéi' },
      { v: '+855', n: 'Camboya' },
      { v: '+86', n: 'China' },
      { v: '+357', n: 'Chipre' },
      { v: '+82', n: 'Corea del Sur' },
      { v: '+850', n: 'Corea del Norte' },
      { v: '+971', n: 'E. Árabes Unidos' },
      { v: '+63', n: 'Filipinas' },
      { v: '+995', n: 'Georgia' },
      { v: '+91', n: 'India' },
      { v: '+62', n: 'Indonesia' },
      { v: '+964', n: 'Irak' },
      { v: '+98', n: 'Irán' },
      { v: '+972', n: 'Israel' },
      { v: '+81', n: 'Japón' },
      { v: '+962', n: 'Jordania' },
      { v: '+7', n: 'Kazajistán' },
      { v: '+996', n: 'Kirguistán' },
      { v: '+856', n: 'Laos' },
      { v: '+961', n: 'Líbano' },
      { v: '+60', n: 'Malasia' },
      { v: '+960', n: 'Maldivas' },
      { v: '+976', n: 'Mongolia' },
      { v: '+95', n: 'Myanmar' },
      { v: '+977', n: 'Nepal' },
      { v: '+968', n: 'Omán' },
      { v: '+92', n: 'Pakistán' },
      { v: '+970', n: 'Palestina' },
      { v: '+974', n: 'Catar' },
      { v: '+65', n: 'Singapur' },
      { v: '+963', n: 'Siria' },
      { v: '+94', n: 'Sri Lanka' },
      { v: '+992', n: 'Tayikistán' },
      { v: '+66', n: 'Tailandia' },
      { v: '+670', n: 'Timor Oriental' },
      { v: '+993', n: 'Turkmenistán' },
      { v: '+90', n: 'Turquía' },
      { v: '+998', n: 'Uzbekistán' },
      { v: '+84', n: 'Vietnam' },
      { v: '+967', n: 'Yemen' }
    ]
  },
  {
    label: 'Europa',
    options: [
      { v: '+355', n: 'Albania' },
      { v: '+49', n: 'Alemania' },
      { v: '+376', n: 'Andorra' },
      { v: '+43', n: 'Austria' },
      { v: '+32', n: 'Bélgica' },
      { v: '+375', n: 'Bielorrusia' },
      { v: '+387', n: 'Bosnia y Herz.' },
      { v: '+359', n: 'Bulgaria' },
      { v: '+385', n: 'Croacia' },
      { v: '+45', n: 'Dinamarca' },
      { v: '+421', n: 'Eslovaquia' },
      { v: '+386', n: 'Eslovenia' },
      { v: '+34', n: 'España' },
      { v: '+372', n: 'Estonia' },
      { v: '+358', n: 'Finlandia' },
      { v: '+33', n: 'Francia' },
      { v: '+30', n: 'Grecia' },
      { v: '+36', n: 'Hungría' },
      { v: '+353', n: 'Irlanda' },
      { v: '+354', n: 'Islandia' },
      { v: '+39', n: 'Italia' },
      { v: '+371', n: 'Letonia' },
      { v: '+423', n: 'Liechtenstein' },
      { v: '+370', n: 'Lituania' },
      { v: '+352', n: 'Luxemburgo' },
      { v: '+389', n: 'Macedonia' },
      { v: '+356', n: 'Malta' },
      { v: '+373', n: 'Moldavia' },
      { v: '+377', n: 'Mónaco' },
      { v: '+382', n: 'Montenegro' },
      { v: '+47', n: 'Noruega' },
      { v: '+31', n: 'Países Bajos' },
      { v: '+48', n: 'Polonia' },
      { v: '+351', n: 'Portugal' },
      { v: '+44', n: 'Reino Unido' },
      { v: '+420', n: 'Rep. Checa' },
      { v: '+40', n: 'Rumania' },
      { v: '+7', n: 'Rusia' },
      { v: '+378', n: 'San Marino' },
      { v: '+381', n: 'Serbia' },
      { v: '+46', n: 'Suecia' },
      { v: '+41', n: 'Suiza' },
      { v: '+380', n: 'Ucrania' },
      { v: '+379', n: 'Vaticano' }
    ]
  },
  {
    label: 'Oceanía',
    options: [
      { v: '+61', n: 'Australia' },
      { v: '+64', n: 'Nueva Zelanda' },
      { v: '+675', n: 'Papúa Nueva Guinea' },
      { v: '+679', n: 'Fiyi' },
      { v: '+677', n: 'Islas Salomón' },
      { v: '+678', n: 'Vanuatu' },
      { v: '+685', n: 'Samoa' },
      { v: '+676', n: 'Tonga' },
      { v: '+691', n: 'Micronesia' },
      { v: '+692', n: 'Islas Marshall' },
      { v: '+680', n: 'Palaos' },
      { v: '+686', n: 'Kiribati' },
      { v: '+674', n: 'Nauru' }
    ]
  }
]

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
   COMPONENTE: Selector de país con búsqueda (CORREGIDO)
===================================================== */
const CountrySearchSelect = ({
  value,
  onChange,
  disabled,
  t
}: {
  value: string
  onChange: (val: string) => void
  disabled: boolean
  t: any
}) => {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return COUNTRY_OPTIONS
    const lowerSearch = search.toLowerCase()
    return COUNTRY_OPTIONS.map(group => ({
      ...group,
      options: group.options.filter(
        opt =>
          opt.n.toLowerCase().includes(lowerSearch) || opt.v.includes(search)
      )
    })).filter(group => group.options.length > 0)
  }, [search])

  const allFlatOptions = useMemo(
    () => filteredOptions.flatMap(g => g.options),
    [filteredOptions]
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(prev =>
        prev < allFlatOptions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(prev => (prev > 0 ? prev - 1 : 0))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      onChange(allFlatOptions[activeIndex].v)
      setIsOpen(false)
      setSearch('')
    } else if (e.key === 'Escape') setIsOpen(false)
  }

  const selectedCountry = COUNTRY_OPTIONS.flatMap(g => g.options).find(
    opt => opt.v === value
  )

  return (
    <div className='relative w-1/3' onKeyDown={handleKeyDown}>
      <button
        type='button'
        onClick={() => {
          setIsOpen(!isOpen)
          setActiveIndex(-1)
        }}
        disabled={disabled}
        className='w-full border border-[var(--border-1)] bg-[var(--bg-1)] rounded-lg px-3 py-3 text-left outline-none focus:border-[var(--border-brand)] disabled:opacity-50 flex items-center justify-between'
      >
        <span className='truncate'>
          {selectedCountry
            ? `${selectedCountry.v} ${selectedCountry.n}`
            : t.placeholders.country_code}
        </span>
        <span className='opacity-50'>▼</span>
      </button>
      {isOpen && (
        <div className='absolute z-50 mt-1 w-72 bg-[var(--bg-1)] border border-[var(--border-1)] rounded-lg shadow-2xl max-h-60 overflow-auto'>
          <div className='p-2 sticky top-0 bg-[var(--bg-1)] border-b border-[var(--border-1)]'>
            <input
              type='text'
              placeholder={t.placeholders.search_country}
              value={search}
              onChange={e => {
                setSearch(e.target.value)
                setActiveIndex(0)
              }}
              className='w-full px-3 py-2 bg-[var(--bg-2)] border border-[var(--border-1)] rounded outline-none focus:border-[var(--border-brand)]'
              autoFocus
            />
          </div>
          {filteredOptions.map(group => (
            <div key={group.label}>
              <div className='px-3 py-1 text-xs font-semibold text-[var(--text-2)] bg-[var(--bg-2)]'>
                {group.label}
              </div>
              {group.options.map(opt => {
                const isFocused = allFlatOptions[activeIndex] === opt
                return (
                  <button
                    key={`${opt.v}-${opt.n}`}
                    type='button'
                    className={`w-full text-left px-4 py-2 hover:bg-[var(--bg-2)] ${
                      value === opt.v || isFocused
                        ? 'bg-[var(--bg-brand)]/10 text-[var(--text-brand)]'
                        : ''
                    }`}
                    onClick={() => {
                      onChange(opt.v)
                      setIsOpen(false)
                      setSearch('')
                    }}
                  >
                    {opt.v} {opt.n}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
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

  const [tipoServicio, setTipoServicio] = useState('')
  const [nombreCompleto, setNombreCompleto] = useState('')
  const [email, setEmail] = useState('')
  const [codigoPais, setCodigoPais] = useState('')
  const [telefono, setTelefono] = useState('')
  const [mensajeAuditoria, setMensajeAuditoria] = useState('')
  const [medioContacto, setMedioContacto] = useState('')
  const [aceptaLegales, setAceptaLegales] = useState(false)

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

      if (response.ok) {
        // ✅ PROTOCOLO ALSNIPPETS: Notificar a GTM antes del éxito visual
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
      setApiError('Error')
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
    if (!codigoPais || !telefono) return { isValid: false, error: null }
    const rule = PHONE_RULES[codigoPais] || PHONE_RULES.default
    return {
      isValid: telefono.length >= rule.min && telefono.length <= rule.max,
      error:
        telefono.length < rule.min
          ? t.validation.err_tel_missing
          : t.validation.err_tel_exceed
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
            <div className='space-y-2 md:col-span-2'>
              <label className='text-sm font-bold text-[var(--text-1)] uppercase tracking-wider'>
                {t.placeholders.phone} <span className='text-red-500'>*</span>
              </label>
              <div className='flex gap-3'>
                <CountrySearchSelect
                  value={codigoPais}
                  onChange={setCodigoPais}
                  disabled={isSubmitting}
                  t={t}
                />
                <input
                  type='text'
                  value={telefono}
                  placeholder={t.placeholders.phone_ph}
                  onChange={handlePhoneChange}
                  onBlur={() => setTelefonoTocado(true)}
                  className={`w-full bg-[var(--bg-1)] border rounded-xl px-4 py-3.5 outline-none transition-colors ${
                    phoneErrorDisplay
                      ? 'border-red-500'
                      : telefono.length > 0 && phoneValidation.isValid
                      ? 'border-green-500'
                      : 'border-[var(--border-1)]'
                  }`}
                />
              </div>
              {phoneErrorDisplay && (
                <p className='text-red-500 text-sm font-medium'>
                  {phoneErrorDisplay}
                </p>
              )}
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
