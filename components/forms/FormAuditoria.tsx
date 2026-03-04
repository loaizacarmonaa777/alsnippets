'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FormAuditoria () {
  const [tipoServicio, setTipoServicio] = useState('')
  const [nombreCompleto, setNombreCompleto] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [mensajeAuditoria, setMensajeAuditoria] = useState('')
  const [medioContacto, setMedioContacto] = useState('')
  const [medioContactoError, setMedioContactoError] = useState('')
  const [aceptaLegales, setAceptaLegales] = useState(false)
  const [errores, setErrores] = useState<Record<string, string>>({})

  const [nombreError, setNombreError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [telefonoError, setTelefonoError] = useState('')

  const MAX_CARACTERES = 500
  const caracteresRestantes = MAX_CARACTERES - mensajeAuditoria.length

  const validarFormulario = () => {
    const nuevosErrores: Record<string, string> = {}

    if (!tipoServicio) nuevosErrores.tipoServicio = 'Este campo es obligatorio.'
    if (!nombreCompleto)
      nuevosErrores.nombreCompleto = 'El nombre completo es obligatorio.'
    if (!email) {
      nuevosErrores.email = 'El correo electrónico es obligatorio.'
    } else if (!email.includes('@')) {
      nuevosErrores.email = 'Verifica que tu email tenga el @ y sea válido.'
    }
    if (!telefono) {
      nuevosErrores.telefono = 'El número de teléfono es obligatorio.'
    } else if (!/^\d+$/.test(telefono)) {
      nuevosErrores.telefono = 'Por favor, solo caracteres numéricos.'
    }
    if (tipoServicio === 'auditoria' && !mensajeAuditoria) {
      nuevosErrores.mensajeAuditoria =
        'Este campo es obligatorio para solicitar una auditoría.'
    }
    if (!aceptaLegales) {
      nuevosErrores.legales = 'Debes aceptar los términos, políticas y cookies.'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const honeypot = (form.elements.namedItem('empresa') as HTMLInputElement)
      ?.value
    if (honeypot) return

    if (validarFormulario()) {
      // Aquí irá el envío real al endpoint /api/auditoria en el futuro
      console.log('Formulario válido, enviando a contact@alsnippets.com...')
    }
  }

  const validarNombreCompleto = () => {
    const palabras = nombreCompleto.trim().split(/\s+/)
    if (palabras.length < 2)
      setNombreError('Por favor, escribe al menos un nombre y apellido.')
    else setNombreError('')
  }

  const validarEmail = () => {
    if (!email || !email.includes('@'))
      setEmailError("Por favor, pon un correo válido con '@'.")
    else setEmailError('')
  }

  const validarMedioContacto = () => {
    if (!medioContacto)
      setMedioContactoError('Por favor selecciona un medio de contacto.')
    else setMedioContactoError('')
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-8'>
      {/* Honeypot anti-spam (invisible) */}
      <input
        type='text'
        name='empresa'
        tabIndex={-1}
        autoComplete='off'
        className='hidden'
      />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* TIPO DE SERVICIO */}
        <div className='space-y-2 md:col-span-2'>
          <label className='text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider'>
            ¿Qué servicio necesitas? <span className='text-red-500'>*</span>
          </label>
          <select
            value={tipoServicio}
            onChange={e => setTipoServicio(e.target.value)}
            className='w-full bg-[var(--bg-body)] border border-[var(--border-subtle)] focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] rounded-xl px-4 py-3.5 outline-none transition-colors'
          >
            <option value=''>Selecciona una opción</option>
            <option value='consultoria'>Quiero una consultoría</option>
            <option value='auditoria'>Quiero una auditoría técnica</option>
          </select>
          {errores.tipoServicio && (
            <p className='text-red-500 text-sm font-medium'>
              {errores.tipoServicio}
            </p>
          )}
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
            onChange={e => setNombreCompleto(e.target.value)}
            onBlur={validarNombreCompleto}
            className={`w-full bg-[var(--bg-body)] border focus:ring-1 outline-none transition-colors rounded-xl px-4 py-3.5 ${
              nombreError
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-[var(--border-subtle)] focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]'
            }`}
          />
          {nombreError && (
            <p className='text-red-500 text-sm font-medium'>{nombreError}</p>
          )}
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
            onChange={e => setEmail(e.target.value)}
            onBlur={validarEmail}
            className={`w-full bg-[var(--bg-body)] border focus:ring-1 outline-none transition-colors rounded-xl px-4 py-3.5 ${
              emailError
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-[var(--border-subtle)] focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]'
            }`}
          />
          {emailError && (
            <p className='text-red-500 text-sm font-medium'>{emailError}</p>
          )}
        </div>

        {/* MEDIO DE CONTACTO */}
        <div className='space-y-2 md:col-span-2'>
          <label className='text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider'>
            Medio de comunicación <span className='text-red-500'>*</span>
          </label>
          <select
            value={medioContacto}
            onChange={e => setMedioContacto(e.target.value)}
            onBlur={validarMedioContacto}
            className={`w-full bg-[var(--bg-body)] border focus:ring-1 outline-none transition-colors rounded-xl px-4 py-3.5 ${
              medioContactoError
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-[var(--border-subtle)] focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]'
            }`}
          >
            <option value=''>Selecciona una plataforma</option>
            <option value='whatsapp'>WhatsApp (Directo)</option>
            <option value='google-meet'>Google Meet</option>
            <option value='microsoft-teams'>Microsoft Teams</option>
            <option value='zoom'>Zoom</option>
          </select>
          <p className='text-xs text-[var(--text-muted)] mt-1'>
            Para Meet, Teams o Zoom recibirás un enlace por correo.
          </p>
          {medioContactoError && (
            <p className='text-red-500 text-sm font-medium'>
              {medioContactoError}
            </p>
          )}
        </div>

        {/* TELÉFONO */}
        <div className='space-y-2 md:col-span-2'>
          <label className='text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider'>
            Teléfono / WhatsApp <span className='text-red-500'>*</span>
          </label>
          <div className='flex gap-3'>
            <select
              required
              className='w-[120px] bg-[var(--bg-body)] border border-[var(--border-subtle)] focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] rounded-xl px-3 py-3.5 outline-none transition-colors shrink-0'
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
                <option value='+1'>+1 Rep. Dom.</option>
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
              onChange={e => {
                const valor = e.target.value
                if (/^\d*$/.test(valor)) {
                  setTelefono(valor)
                  setTelefonoError('')
                } else {
                  setTelefonoError('Escribe sólo números sin espacios.')
                }
              }}
              className={`w-full bg-[var(--bg-body)] border focus:ring-1 outline-none transition-colors rounded-xl px-4 py-3.5 ${
                telefonoError
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-[var(--border-subtle)] focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]'
              }`}
            />
          </div>
          {telefonoError && (
            <p className='text-red-500 text-sm font-medium'>{telefonoError}</p>
          )}
        </div>

        {/* CONDICIONAL: MENSAJE AUDITORÍA */}
        {tipoServicio === 'auditoria' && (
          <div className='space-y-2 md:col-span-2 animate-fade-in'>
            <label className='text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider'>
              URL y Detalles del sitio <span className='text-red-500'>*</span>
            </label>
            <textarea
              value={mensajeAuditoria}
              onChange={e => {
                if (e.target.value.length <= MAX_CARACTERES) {
                  setMensajeAuditoria(e.target.value)
                }
              }}
              placeholder='Pega aquí el enlace de tu sitio web y cuéntame brevemente qué problemas estás experimentando...'
              className='w-full bg-[var(--bg-body)] border border-[var(--border-subtle)] focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] rounded-xl px-4 py-4 outline-none transition-colors min-h-[140px] resize-y'
            />
            <div className='flex justify-between items-center'>
              <p className='text-xs font-medium text-[var(--text-muted)]'>
                Caracteres restantes:{' '}
                <span
                  className={caracteresRestantes < 50 ? 'text-red-500' : ''}
                >
                  {caracteresRestantes}
                </span>
              </p>
            </div>
            {errores.mensajeAuditoria && (
              <p className='text-red-500 text-sm font-medium'>
                {errores.mensajeAuditoria}
              </p>
            )}
          </div>
        )}

        {/* LEGALES */}
        <div className='md:col-span-2 space-y-2 bg-[var(--bg-tertiary)]/50 p-5 rounded-xl border border-[var(--border-subtle)]'>
          <label className='flex items-start gap-3 cursor-pointer'>
            <input
              type='checkbox'
              checked={aceptaLegales}
              onChange={e => setAceptaLegales(e.target.checked)}
              className='mt-1 w-5 h-5 accent-[var(--brand-primary)] rounded border-gray-300'
            />
            <span className='text-sm text-[var(--text-secondary)] leading-relaxed'>
              He leído y acepto los{' '}
              <Link
                href='/terminos'
                className='font-bold text-[var(--brand-primary)] hover:underline'
              >
                términos y condiciones
              </Link>{' '}
              y la{' '}
              <Link
                href='/privacidad'
                className='font-bold text-[var(--brand-primary)] hover:underline'
              >
                política de privacidad
              </Link>
              . Entiendo que mis datos serán tratados con estricta
              confidencialidad.
            </span>
          </label>
          {errores.legales && (
            <p className='text-red-500 text-sm font-medium ml-8'>
              {errores.legales}
            </p>
          )}
        </div>

        {/* BOTÓN ENVIAR */}
        <div className='md:col-span-2 pt-4'>
          <button
            type='submit'
            className='group relative flex items-center justify-center w-full md:w-72 h-14 bg-[var(--brand-primary)] text-[var(--text-primary)] font-bold rounded-xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg hover:bg-[var(--text-yellow2)] mx-auto'
          >
            {/* Avión: Inicialmente a la izquierda. Al hacer hover se va justo al centro, crece un poco y se inclina */}
            <div className='absolute left-8 transition-all duration-500 ease-in-out group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:-translate-y-1 group-hover:scale-125 group-hover:-rotate-12'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='22'
                height='22'
                aria-hidden='true'
                className='text-[var(--text-primary)]'
              >
                <path fill='none' d='M0 0h24v24H0z' />
                <path
                  fill='currentColor'
                  d='M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z'
                />
              </svg>
            </div>

            {/* Texto: Empujado ligeramente a la derecha al inicio. Al hacer hover, sale volando y se desvanece */}
            <span className='ml-8 transition-all duration-500 ease-in-out group-hover:translate-x-[200%] group-hover:opacity-0 whitespace-nowrap'>
              Enviar solicitud oficial
            </span>
          </button>
        </div>
      </div>
    </form>
  )
}
