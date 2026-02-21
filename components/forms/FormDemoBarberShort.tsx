'use client'

import React, { useState } from 'react'

interface FormDemoBarberShortProps {
  onLoginSuccess: (name: string, phone: string) => void;
}

export default function FormDemoBarberShort({ onLoginSuccess }: FormDemoBarberShortProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validaciones
    if (name.trim() === '') {
      setError('Por favor, ingresa tu nombre.')
      return
    }
    if (phone.trim() === '') {
      setError('Por favor, ingresa un número de teléfono.')
      return
    }
    if (password !== 'barbershort') {
      setError('Contraseña incorrecta. Recuerda usar la contraseña demo.')
      return
    }
    if (!acceptTerms) {
      setError('Debes aceptar los términos para simular el envío por WhatsApp.')
      return
    }

    // Si todo es correcto, limpiamos errores y pasamos los datos
    setError('')
    onLoginSuccess(name, phone)
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 transition-all duration-300">
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
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/20 border border-white/30 text-white placeholder-white/50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:bg-white/30 transition-all"
          />
        </div>

        {/* Campo: Teléfono */}
        <div className="space-y-1">
          <label className="text-white/90 text-sm font-medium ml-1">Teléfono (WhatsApp)</label>
          <input
            type="tel"
            placeholder="Ej: +34 600 000 000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-white/20 border border-white/30 text-white placeholder-white/50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:bg-white/30 transition-all"
          />
        </div>

        {/* Campo: Contraseña */}
        <div className="space-y-1">
          <label className="text-white/90 text-sm font-medium ml-1">Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/20 border border-white/30 text-white placeholder-white/50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:bg-white/30 transition-all"
          />
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
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-white/30 bg-white/20 text-[var(--brand-primary)] focus:ring-[var(--brand-primary)] focus:ring-offset-0"
          />
          <label htmlFor="terms" className="text-white/80 text-sm cursor-pointer leading-tight">
            Acepto los términos y condiciones para recibir la confirmación de mi cita vía WhatsApp/Email al finalizar.
          </label>
        </div>

        {/* Mensaje de Error */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 text-sm p-3 rounded-lg text-center backdrop-blur-sm">
            {error}
          </div>
        )}

        {/* Botón Ingresar */}
        <button
          type="submit"
          className="w-full bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          INGRESAR A BARBER SHORT
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