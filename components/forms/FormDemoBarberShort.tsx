'use client'

import React, { useState, useEffect } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'

interface FormDemoBarberShortProps {
  onLoginSuccess: (name: string, phone: string) => void;
}

export default function FormDemoBarberShort({ onLoginSuccess }: FormDemoBarberShortProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  
  // Nuevos estados
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  const [isFormValid, setIsFormValid] = useState(false)
  const [showPassword, setShowPassword] = useState(false) // <--- Estado para mostrar/ocultar clave

  // Validación en tiempo real para habilitar el botón
  useEffect(() => {
    const isValid = name.trim() !== '' && phone.trim() !== '' && password === 'barbershort' && acceptTerms && turnstileToken !== ''
    setIsFormValid(isValid)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, phone, password, acceptTerms, turnstileToken])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validaciones extra de seguridad por si acaso
    if (!isFormValid) {
      if (password !== 'barbershort') setError('Contraseña incorrecta. Recuerda usar la contraseña demo.')
      else if (!acceptTerms) setError('Debes aceptar los términos.')
      else setError('Por favor, completa todos los campos correctamente.')
      return
    }

    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/barber-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, turnstileToken })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Si el correo se envió con éxito, ejecutamos tu prop para que avance a la demo
        onLoginSuccess(name, phone)
      } else {
        setError(data.error || 'Hubo un error de conexión.')
        if (typeof window.turnstile !== 'undefined') window.turnstile.reset()
      }
    } catch (err) {
      setError('Error de red. Revisa tu conexión.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-6 md:p-8 transition-all duration-300">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white drop-shadow-md">Iniciar Sesión</h3>
        <p className="text-white/80 text-sm mt-2">Ingresa a la plataforma de reservas</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo: Nombre */}
        <div className="space-y-1">
          <label className="text-white/90 text-sm font-medium ml-1">Nombre completo</label>
          <input
            type="text"
            placeholder="Pon tu nombre aquí"
            value={name}
            disabled={isSubmitting}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/20 border border-white/30 text-white placeholder-white/50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:bg-white/30 transition-all disabled:opacity-50"
          />
        </div>

        {/* Campo: Teléfono */}
        <div className="space-y-1">
          <label className="text-white/90 text-sm font-medium ml-1">Teléfono (WhatsApp)</label>
          <input
            type="tel"
            placeholder="Ej: +34 600 000 000"
            value={phone}
            disabled={isSubmitting}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-white/20 border border-white/30 text-white placeholder-white/50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:bg-white/30 transition-all disabled:opacity-50"
          />
        </div>

        {/* Campo: Contraseña (Con botón para mostrar/ocultar) */}
        <div className="space-y-1">
          <label className="text-white/90 text-sm font-medium ml-1">Contraseña</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // <--- Magia del toggle
              placeholder="escribe aquí: barbershort"     // <--- Nuevo placeholder
              value={password}
              disabled={isSubmitting}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/20 border border-white/30 text-white placeholder-white/50 rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:bg-white/30 transition-all disabled:opacity-50"
            />
            
            {/* Botón del Ojo */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white transition-colors disabled:opacity-50"
            >
              {showPassword ? (
                // Icono: Ojo cerrado (Ocultar)
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                // Icono: Ojo abierto (Mostrar)
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-[var(--brand-primary)] text-xs font-semibold ml-1 mt-1 drop-shadow-sm">
            Escribe esta contraseña demo: barbershort
          </p>
        </div>

        {/* Checkbox: Términos y Condiciones */}
        <div className="flex items-start space-x-3 mt-4">
          <input
            type="checkbox"
            id="terms"
            checked={acceptTerms}
            disabled={isSubmitting}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-white/30 bg-white/20 text-[var(--brand-primary)] focus:ring-[var(--brand-primary)] focus:ring-offset-0 disabled:opacity-50"
          />
          <label htmlFor="terms" className="text-white/80 text-sm cursor-pointer leading-tight">
            Acepto los términos y condiciones para recibir la confirmación de mi cita vía WhatsApp/Email al finalizar.
          </label>
        </div>

        {/* Cloudflare Turnstile */}
        <div className="flex justify-center my-2 pb-4 overflow-hidden [&_iframe]:!border-none [&_iframe]:!rounded-none">
          <Turnstile 
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} 
            onSuccess={token => setTurnstileToken(token)}
            options={{ theme: 'dark', size: 'flexible' }} 
          />
        </div>

        {/* Mensaje de Error */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 text-sm p-3 rounded-lg text-center backdrop-blur-sm animate-pulse">
            {error}
          </div>
        )}

        {/* Botón Ingresar */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all duration-300 flex justify-center items-center ${
            (!isFormValid || isSubmitting) 
            ? 'bg-gray-500/50 text-white/50 cursor-not-allowed' 
            : 'bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white hover:shadow-xl'
          }`}
        >
          {isSubmitting ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : (
            'INGRESAR A BARBER SHORT'
          )}
        </button>

        {/* Enlaces Ficticios */}
        <div className="flex justify-between items-center text-sm text-white/70 mt-6 pt-4 border-t border-white/10">
          <span className="cursor-not-allowed hover:text-white transition-colors">¿Has olvidado tu contraseña?</span>
          <span className="cursor-not-allowed hover:text-white transition-colors">Crear usuario</span>
        </div>
      </form>
    </div>
  )
}