'use client'

import { useState } from 'react'
import Link from 'next/link'

/* =====================================================
   FORMULARIO DE CONTACTO
   - Mismas validaciones que Auditoría
   - Anti-spam (honeypot)
   - Mobile first
===================================================== */
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

  const [errores, setErrores] = useState<Record<string, string>>({})

  // Mensajes en tiempo real
  const [nombreError, setNombreError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [telefonoError, setTelefonoError] = useState('')

  // Contador de caracteres
  const MAX_CARACTERES = 200
  const caracteresRestantes = MAX_CARACTERES - mensaje.length

  /* =====================================================
     Validación general del formulario
     ===================================================== */
  const validarFormulario = () => {
    const nuevosErrores: Record<string, string> = {}

    if (!nombreCompleto) {
      nuevosErrores.nombreCompleto = 'El nombre completo es obligatorio.'
    }

    if (!email) {
      nuevosErrores.email = 'El correo electrónico es obligatorio.'
    } else if (!email.includes('@')) {
      nuevosErrores.email = 'Verifica que el correo sea válido.'
    }

    if (!telefono) {
      nuevosErrores.telefono = 'El teléfono es obligatorio.'
    } else if (!/^\d+$/.test(telefono)) {
      nuevosErrores.telefono = 'Solo se permiten números.'
    }

    if (!aceptaLegales) {
      nuevosErrores.legales =
        'Debes aceptar los términos y la política de privacidad.'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  /* =====================================================
     Envío con honeypot anti-spam
     ===================================================== */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const honeypot = (form.elements.namedItem('empresa') as HTMLInputElement)
      ?.value

    // Bot detectado
    if (honeypot) return

    if (validarFormulario()) {
      console.log('Formulario de contacto válido')
      // POST futuro a /api/contacto
    }
  }

  /* =====================================================
     Validaciones onBlur
     ===================================================== */
  const validarNombreCompleto = () => {
    const palabras = nombreCompleto.trim().split(/\s+/)
    if (palabras.length < 2) {
      setNombreError('Escribe al menos nombre y apellido.')
    } else {
      setNombreError('')
    }
  }

  const validarEmail = () => {
    if (!email || !email.includes('@')) {
      setEmailError('Introduce un correo válido.')
    } else {
      setEmailError('')
    }
  }

  /* =====================================================
     Render
     ===================================================== */
  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Honeypot */}
      <input
        type='text'
        name='empresa'
        tabIndex={-1}
        autoComplete='off'
        className='hidden'
      />

      {/* =====================================================
          Nombre completo
          ===================================================== */}
      <div className='space-y-1'>
        <label className='text-sm font-medium'>Nombre completo *</label>

        <input
          type='text'
          value={nombreCompleto}
          onChange={e => setNombreCompleto(e.target.value)}
          onBlur={validarNombreCompleto}
          className={`w-full border rounded-lg px-4 py-3 ${
            nombreError ? 'border-red-500' : ''
          }`}
        />

        {nombreError && <p className='text-red-500 text-sm'>{nombreError}</p>}
      </div>

      {/* =====================================================
          Email
          ===================================================== */}
      <div className='space-y-1'>
        <label className='text-sm font-medium'>Correo electrónico *</label>

        <input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={validarEmail}
          className={`w-full border rounded-lg px-4 py-3 ${
            emailError ? 'border-red-500' : ''
          }`}
        />

        {emailError && <p className='text-red-500 text-sm'>{emailError}</p>}
      </div>

      {/* =====================================================
    Teléfono con código de país
===================================================== */}
      <div className='space-y-1'>
        <label className='text-sm font-medium'>
          Teléfono (con código de país) <span className='text-red-500'>*</span>
        </label>

        <div className='flex gap-3'>
          {/* Código de país */}
          <select
            value={codigoPais}
            onChange={e => setCodigoPais(e.target.value)}
            required
            className='w-1/3 border rounded-lg px-3 py-3'
          >
            <option value=''>Código</option>

            {/* =========================
         Norteamérica
         ========================= */}
            <optgroup label='Norteamérica'>
              <option value='+1'>+1 Canadá</option>
              <option value='+1'>+1 Estados Unidos</option>
              <option value='+52'>+52 México</option>
            </optgroup>

            {/* =========================
          Centroamérica
         ========================= */}
            <optgroup label='Centroamérica'>
              <option value='+501'>+501 Belice</option>
              <option value='+506'>+506 Costa Rica</option>
              <option value='+503'>+503 El Salvador</option>
              <option value='+502'>+502 Guatemala</option>
              <option value='+504'>+504 Honduras</option>
              <option value='+505'>+505 Nicaragua</option>
              <option value='+507'>+507 Panamá</option>
            </optgroup>

            {/* =========================
          Sudamérica
         ========================= */}
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

            {/* =========================
          Caribe
         ========================= */}
            <optgroup label='Caribe'>
              <option value='+1'>+1 Antigua y Barbuda</option>
              <option value='+1'>+1 Bahamas</option>
              <option value='+1'>+1 Barbados</option>
              <option value='+53'>+53 Cuba</option>
              <option value='+1'>+1 Dominica</option>
              <option value='+1'>+1 Granada</option>
              <option value='+509'>+509 Haití</option>
              <option value='+1'>+1 Jamaica</option>
              <option value='+1'>+1 República Dominicana</option>
              <option value='+1'>+1 San Cristóbal y Nieves</option>
              <option value='+1'>+1 San Vicente y las Granadinas</option>
              <option value='+1'>+1 Santa Lucía</option>
              <option value='+1'>+1 Trinidad y Tobago</option>
            </optgroup>

            {/* =========================
          Unión Europea
          ========================= */}
            <optgroup label='Unión Europea'>
              <option value='+49'>+49 Alemania</option>
              <option value='+43'>+43 Austria</option>
              <option value='+32'>+32 Bélgica</option>
              <option value='+359'>+359 Bulgaria</option>
              <option value='+420'>+420 Chequia</option>
              <option value='+357'>+357 Chipre</option>
              <option value='+385'>+385 Croacia</option>
              <option value='+45'>+45 Dinamarca</option>
              <option value='+421'>+421 Eslovaquia</option>
              <option value='+386'>+386 Eslovenia</option>
              <option value='+34'>+34 España</option>
              <option value='+372'>+372 Estonia</option>
              <option value='+358'>+358 Finlandia</option>
              <option value='+33'>+33 Francia</option>
              <option value='+30'>+30 Grecia</option>
              <option value='+36'>+36 Hungría</option>
              <option value='+353'>+353 Irlanda</option>
              <option value='+39'>+39 Italia</option>
              <option value='+371'>+371 Letonia</option>
              <option value='+370'>+370 Lituania</option>
              <option value='+352'>+352 Luxemburgo</option>
              <option value='+356'>+356 Malta</option>
              <option value='+31'>+31 Países Bajos</option>
              <option value='+48'>+48 Polonia</option>
              <option value='+351'>+351 Portugal</option>
              <option value='+40'>+40 Rumanía</option>
              <option value='+46'>+46 Suecia</option>
            </optgroup>

            {/* =========================
                     Reino Unido
                    ========================= */}
            <optgroup label='Reino Unido'>
              <option value='+44'>+44 Reino Unido</option>
            </optgroup>
          </select>

          {/* Número */}
          <input
            type='text'
            inputMode='numeric'
            value={telefono}
            placeholder='Número de teléfono'
            onChange={e => {
              const valor = e.target.value

              if (/^\d*$/.test(valor)) {
                setTelefono(valor)
                setTelefonoError('')
              } else {
                setTelefonoError('Escribe sólo números sin espacios.')
              }
            }}
            className={`w-2/3 border rounded-lg px-4 py-3 ${
              telefonoError ? 'border-red-500' : ''
            }`}
          />
        </div>

        {(telefonoError || errores.telefono) && (
          <p className='text-red-500 text-sm'>
            {telefonoError || errores.telefono}
          </p>
        )}
      </div>

      {/* =====================================================
          Mensaje (máx. 200 caracteres)
          ===================================================== */}
      <div className='space-y-1'>
        <label className='text-sm font-medium'>Mensaje</label>

        <div className='relative'>
          <textarea
            value={mensaje}
            onChange={e => {
              if (e.target.value.length <= MAX_CARACTERES) {
                setMensaje(e.target.value)
              }
            }}
            placeholder='Escribe aquí tu mensaje...'
            className='w-full border rounded-lg px-4 py-3 min-h-[140px] pb-10'
          />

          {/* Contador */}
          <span className='absolute bottom-3 right-4 text-xs opacity-60'>
            {caracteresRestantes}
          </span>
        </div>
      </div>

      {/* =====================================================
          Legales
          ===================================================== */}
      <div className='space-y-2 text-sm'>
        <label className='flex gap-2'>
          <input
            type='checkbox'
            checked={aceptaLegales}
            onChange={e => setAceptaLegales(e.target.checked)}
          />
          Acepto los{' '}
          <Link href='/terminos' className='underline'>
            términos y condiciones
          </Link>{' '}
          y la{' '}
          <Link href='/privacidad' className='underline'>
            política de privacidad
          </Link>
        </label>

        {errores.legales && <p className='text-red-500'>{errores.legales}</p>}
      </div>

      {/* =====================================================
          Enviar
          ===================================================== */}
      <button type='submit' className='button-send text-[var(--text-white2)]'>
        <div className='svg-wrapper-1'>
          <div className='svg-wrapper'>
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
          </div>
        </div>
        <span>Enviar</span>
      </button>
    </form>
  )
}
