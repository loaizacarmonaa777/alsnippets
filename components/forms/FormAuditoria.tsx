// components/forms/FormAuditoria.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Turnstile } from '@marsidev/react-turnstile'
import confetti from 'canvas-confetti'
import { CheckCircle } from 'lucide-react'

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
  default: { min: 7, max: 15, msg: 'Entre 7 y 15 dígitos' }
}

export default function FormAuditoria() {
  const [tipoServicio, setTipoServicio] = useState('')
  const [nombreCompleto, setNombreCompleto] = useState('')
  const [email, setEmail] = useState('')
  const [codigoPais, setCodigoPais] = useState('')
  const [telefono, setTelefono] = useState('')
  const [mensajeAuditoria, setMensajeAuditoria] = useState('')
  const [medioContacto, setMedioContacto] = useState('')
  const [aceptaLegales, setAceptaLegales] = useState(false)
  
  // Estados de errores y UI
  const [nombreError, setNombreError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [telefonoError, setTelefonoError] = useState('')
  const [medioContactoError, setMedioContactoError] = useState('')
  
  // Estados de Backend e Inteligencia del Botón
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [apiError, setApiError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [isFormValid, setIsFormValid] = useState(false) // <--- Estado del botón inteligente

  const MAX_CARACTERES = 500
  const caracteresRestantes = MAX_CARACTERES - mensajeAuditoria.length

  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  /* =====================================================
     EFECTO: EVALUAR CONSTANTEMENTE SI TODO ES VÁLIDO
  ===================================================== */
  useEffect(() => {
    const tieneNombreValido = nombreCompleto.trim().split(/\s+/).length >= 2
    const tieneEmailValido = regexEmail.test(email)
    
    let tieneTelefonoValido = false
    if (codigoPais) {
      const regla = PHONE_RULES[codigoPais] || PHONE_RULES['default']
      tieneTelefonoValido = telefono.length >= regla.min && telefono.length <= regla.max
    }

    const tieneServicio = tipoServicio !== ''
    const tieneMedio = medioContacto !== ''
    const tieneMensajeValido = tipoServicio === 'auditoria' ? mensajeAuditoria.trim().length > 0 : true
    const checkLegales = aceptaLegales
    const checkTurnstile = turnstileToken !== ''

    const todoValido = 
      tieneNombreValido && 
      tieneEmailValido && 
      tieneTelefonoValido && 
      tieneServicio && 
      tieneMedio && 
      tieneMensajeValido && 
      checkLegales && 
      checkTurnstile

    setIsFormValid(todoValido)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nombreCompleto, email, codigoPais, telefono, tipoServicio, medioContacto, mensajeAuditoria, aceptaLegales, turnstileToken])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!isFormValid) return // Seguridad extra

    const form = e.currentTarget
    const honeypot = (form.elements.namedItem('empresa') as HTMLInputElement)?.value
    if (honeypot) return

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
          turnstileToken
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // 🎉 ¡LANZAR CONFETTI! 🎉
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c9a34e', '#ffffff', '#1c374a']
        })
        setIsSuccess(true)
      } else {
        setApiError(data.error || 'Hubo un error al enviar tu solicitud.')
        if (typeof window.turnstile !== 'undefined') window.turnstile.reset()
      }
    } catch (error) {
      setApiError('Error de red. Verifica tu conexión e intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  /* =====================================================
     Validaciones OnBlur para mostrar mensajes rojos
  ===================================================== */
  const validarNombreCompleto = () => {
    const palabras = nombreCompleto.trim().split(/\s+/)
    if (palabras.length < 2 && nombreCompleto.length > 0) setNombreError('Por favor, escribe al menos un nombre y apellido.')
    else setNombreError('')
  }

  const validarEmail = () => {
    if (email.length > 0 && !regexEmail.test(email)) setEmailError("Por favor, pon un correo válido con '@'.")
    else setEmailError('')
  }

  const validarMedioContacto = () => {
    if (!medioContacto) setMedioContactoError('Por favor selecciona un medio de contacto.')
    else setMedioContactoError('')
  }

  const validarTelefono = (valor: string, paisSeleccionado: string) => {
    if (!paisSeleccionado) {
      setTelefonoError('Primero selecciona tu país.')
      return
    }
    const regla = PHONE_RULES[paisSeleccionado] || PHONE_RULES['default']
    if (valor.length === 0) setTelefonoError('')
    else if (valor.length < regla.min) setTelefonoError(`Faltan números (${regla.msg})`)
    else if (valor.length > regla.max) setTelefonoError(`Excediste los números permitidos (${regla.msg})`)
    else setTelefonoError('')
  }

  // ==== VISTA DE ÉXITO ====
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-6 py-12 animate-fade-in">
        <CheckCircle className="w-20 h-20 text-[var(--brand-primary)] animate-bounce" />
        <h3 className="text-3xl font-bold text-[var(--text-primary)]">¡Solicitud Enviada!</h3>
        <p className="text-[var(--text-secondary)] max-w-md leading-relaxed">
          He recibido tu solicitud correctamente. Estaré revisando la información y me pondré en contacto contigo en las próximas 24-48 horas hábiles a través de <strong>{medioContacto}</strong>.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-6 text-[var(--brand-primary)] hover:underline font-bold"
        >
          Volver al inicio
        </button>
      </div>
    )
  }

  // ==== VISTA DEL FORMULARIO ====
  return (
    <form onSubmit={handleSubmit} className='space-y-8 animate-fade-in relative'>
      {/* Honeypot anti-spam (invisible) */}
      <input type='text' name='empresa' tabIndex={-1} autoComplete='off' className='hidden' />

      {apiError && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 text-sm rounded-xl text-center font-medium animate-pulse">
          {apiError}
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        
        {/* TIPO DE SERVICIO */}
        <div className='space-y-2 md:col-span-2'>
          <label className='text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider'>
            ¿Qué servicio necesitas? <span className='text-red-500'>*</span>
          </label>
          <select
            value={tipoServicio}
            onChange={e => setTipoServicio(e.target.value)}
            disabled={isSubmitting}
            className='w-full bg-[var(--bg-body)] border border-[var(--border-subtle)] focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] rounded-xl px-4 py-3.5 outline-none transition-colors disabled:opacity-50'
          >
            <option value=''>Selecciona una opción</option>
            <option value='consultoria'>Quiero una consultoría</option>
            <option value='auditoria'>Quiero una auditoría técnica</option>
          </select>
        </div>

        {/* NOMBRE */}
        <div className='space-y-2 md:col-span-2'>
          <label className='text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider'>
            Nombre completo <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            value={nombreCompleto}
            placeholder='Ej: Adrián Loaiza Carmona'
            onChange={e => {
              setNombreCompleto(e.target.value)
              if (nombreError) setNombreError('')
            }}
            onBlur={validarNombreCompleto}
            disabled={isSubmitting}
            className={`w-full bg-[var(--bg-body)] border focus:ring-1 outline-none transition-colors rounded-xl px-4 py-3.5 disabled:opacity-50 ${
              nombreError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[var(--border-subtle)] focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]'
            }`}
          />
          {nombreError && <p className='text-red-500 text-sm font-medium'>{nombreError}</p>}
        </div>

        {/* EMAIL */}
        <div className='space-y-2 md:col-span-2'>
          <label className='text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider'>
            Correo electrónico <span className='text-red-500'>*</span>
          </label>
          <input
            type='email'
            value={email}
            placeholder='tuemail@ejemplo.com'
            onChange={e => {
              setEmail(e.target.value)
              if (emailError) setEmailError('')
            }}
            onBlur={validarEmail}
            disabled={isSubmitting}
            className={`w-full bg-[var(--bg-body)] border focus:ring-1 outline-none transition-colors rounded-xl px-4 py-3.5 disabled:opacity-50 ${
              emailError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[var(--border-subtle)] focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]'
            }`}
          />
          {emailError && <p className='text-red-500 text-sm font-medium'>{emailError}</p>}
        </div>

        {/* MEDIO DE CONTACTO */}
        <div className='space-y-2 md:col-span-2'>
          <label className='text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider'>
            Medio de comunicación <span className='text-red-500'>*</span>
          </label>
          <select
            value={medioContacto}
            onChange={e => {
              setMedioContacto(e.target.value)
              if (medioContactoError) setMedioContactoError('')
            }}
            onBlur={validarMedioContacto}
            disabled={isSubmitting}
            className={`w-full bg-[var(--bg-body)] border focus:ring-1 outline-none transition-colors rounded-xl px-4 py-3.5 disabled:opacity-50 ${
              medioContactoError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[var(--border-subtle)] focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]'
            }`}
          >
            <option value=''>Selecciona una plataforma</option>
            <option value='whatsapp'>WhatsApp (Directo)</option>
            <option value='google-meet'>Google Meet</option>
            <option value='microsoft-teams'>Microsoft Teams</option>
            <option value='zoom'>Zoom</option>
          </select>
          <p className='text-xs text-[var(--text-muted)] mt-1'>Para Meet, Teams o Zoom recibirás un enlace por correo.</p>
          {medioContactoError && <p className='text-red-500 text-sm font-medium'>{medioContactoError}</p>}
        </div>

        {/* TELÉFONO */}
        <div className='space-y-2 md:col-span-2'>
          <label className='text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider'>
            Teléfono / WhatsApp <span className='text-red-500'>*</span>
          </label>
          <div className='flex gap-3'>
            <select
              value={codigoPais}
              onChange={e => {
                setCodigoPais(e.target.value)
                if (telefono) validarTelefono(telefono, e.target.value)
              }}
              disabled={isSubmitting}
              className='w-[120px] bg-[var(--bg-body)] border border-[var(--border-subtle)] focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] outline-none transition-colors rounded-xl px-3 py-3.5 shrink-0 disabled:opacity-50'
            >
              <option value=''>Código</option>
              <optgroup label='Norteamérica'>
                <option value='+1'>+1 Canadá / USA</option>
                <option value='+52'>+52 México</option>
              </optgroup>
              <optgroup label='Centroamérica'>
                <option value='+501'>+501 Belice</option>
                <option value='+506'>+506 Costa Rica</option>
                <option value='+503'>+503 El Salvador</option>
                <option value='+502'>+502 Guatemala</option>
                <option value='+504'>+504 Honduras</option>
                <option value='+505'>+505 Nicaragua</option>
                <option value='+507'>+507 Panamá</option>
              </optgroup>
              <optgroup label='Sudamérica'>
                <option value='+54'>+54 Argentina</option>
                <option value='+591'>+591 Bolivia</option>
                <option value='+55'>+55 Brasil</option>
                <option value='+56'>+56 Chile</option>
                <option value='+57'>+57 Colombia</option>
                <option value='+593'>+593 Ecuador</option>
                <option value='+592'>+592 Guyana</option>
                <option value='+595'>+595 Paraguay</option>
                <option value='+51'>+51 Perú</option>
                <option value='+597'>+597 Surinam</option>
                <option value='+598'>+598 Uruguay</option>
                <option value='+58'>+58 Venezuela</option>
              </optgroup>
              <optgroup label='Caribe'>
                <option value='+53'>+53 Cuba</option>
                <option value='+509'>+509 Haití</option>
                <option value='+1809'>+1 Rep. Dom.</option>
              </optgroup>
              <optgroup label='Europa'>
                <option value='+34'>+34 España</option>
                <option value='+49'>+49 Alemania</option>
                <option value='+33'>+33 Francia</option>
                <option value='+39'>+39 Italia</option>
                <option value='+44'>+44 Reino Unido</option>
              </optgroup>
            </select>
            <input
              type='text'
              inputMode='numeric'
              value={telefono}
              placeholder='Ej: 3001234567'
              disabled={isSubmitting || !codigoPais}
              onChange={e => {
                const valor = e.target.value
                if (/^\d*$/.test(valor)) {
                  const regla = PHONE_RULES[codigoPais] || PHONE_RULES['default']
                  if (valor.length <= regla.max) {
                    setTelefono(valor)
                    validarTelefono(valor, codigoPais)
                  } else {
                    setTelefonoError(`Excediste los números permitidos (${regla.msg})`)
                  }
                }
              }}
              className={`w-full bg-[var(--bg-body)] border focus:ring-1 outline-none transition-colors rounded-xl px-4 py-3.5 disabled:opacity-50 ${
                telefonoError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[var(--border-subtle)] focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]'
              }`}
            />
          </div>
          {telefonoError && <p className='text-red-500 text-sm font-medium'>{telefonoError}</p>}
        </div>

        {/* CONDICIONAL: MENSAJE AUDITORÍA */}
        {tipoServicio === 'auditoria' && (
          <div className='space-y-2 md:col-span-2 animate-fade-in'>
            <label className='text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider'>
              URL y Detalles del sitio <span className='text-red-500'>*</span>
            </label>
            <textarea
              value={mensajeAuditoria}
              disabled={isSubmitting}
              onChange={e => {
                if (e.target.value.length <= MAX_CARACTERES) {
                  setMensajeAuditoria(e.target.value)
                }
              }}
              placeholder='Pega aquí el enlace de tu sitio web y cuéntame brevemente qué problemas estás experimentando...'
              className='w-full bg-[var(--bg-body)] border border-[var(--border-subtle)] focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] rounded-xl px-4 py-4 outline-none transition-colors min-h-[140px] resize-y disabled:opacity-50'
            />
            <div className='flex justify-between items-center'>
              <p className='text-xs font-medium text-[var(--text-muted)]'>
                Caracteres restantes:{' '}
                <span className={caracteresRestantes < 50 ? 'text-red-500' : ''}>
                  {caracteresRestantes}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* LEGALES */}
        <div className='md:col-span-2 space-y-2 bg-[var(--bg-tertiary)]/50 p-5 rounded-xl border border-[var(--border-subtle)]'>
          <label className='flex items-start gap-3 cursor-pointer'>
            <input
              type='checkbox'
              checked={aceptaLegales}
              disabled={isSubmitting}
              onChange={e => setAceptaLegales(e.target.checked)}
              className='mt-1 w-5 h-5 accent-[var(--brand-primary)] rounded border-[var(--border-subtle)] disabled:opacity-50'
            />
            <span className='text-sm text-[var(--text-secondary)] leading-relaxed'>
              He leído y acepto los <Link href='/terminos' className='font-bold text-[var(--brand-primary)] hover:underline'>términos y condiciones</Link> y la <Link href='/privacidad' className='font-bold text-[var(--brand-primary)] hover:underline'>política de privacidad</Link>. Entiendo que mis datos serán tratados con estricta confidencialidad.
            </span>
          </label>
        </div>

        {/* TURNSTILE CAPTCHA */}
        <div className="md:col-span-2 flex flex-col items-center justify-center my-2 [&_iframe]:!border-none [&_iframe] overflow-hidden">
          <Turnstile 
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} 
            onSuccess={token => setTurnstileToken(token)}
            options={{ theme: 'auto', size: 'flexible' }} 
          />
        </div>

        {/* =====================================================
            Botón Enviar (Inteligente)
            ===================================================== */}
        <div className={`md:col-span-2 pt-4 flex justify-center w-full ${!isFormValid || isSubmitting ? 'cursor-not-allowed' : ''}`}>
          <button
            type='submit'
            disabled={isSubmitting || !isFormValid}
            title={!isFormValid ? 'Debes completar el formulario correctamente' : 'Enviar solicitud'}
            className={`button-send w-full md:w-72 h-14 m-0 rounded-xl font-bold transition-all duration-300 shadow-md ${
              !isFormValid || isSubmitting
                ? 'opacity-50 grayscale pointer-events-none'
                : 'hover:scale-[1.02] hover:shadow-lg'
            }`}
          >
            <div className='svg-wrapper-1'>
              <div className='svg-wrapper'>
                {isSubmitting ? (
                  <svg className='animate-spin h-5 w-5 text-current' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                ) : (
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20' aria-hidden='true'>
                    <path fill='none' d='M0 0h24v24H0z' />
                    <path fill='currentColor' d='M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z' />
                  </svg>
                )}
              </div>
            </div>
            
            <span>
              {isSubmitting 
                ? 'Enviando...' 
                : !isFormValid 
                ? 'Faltan datos' 
                : 'Enviar solicitud oficial'
              }
            </span>
          </button>
        </div>
        
      </div>
    </form>
  )
}