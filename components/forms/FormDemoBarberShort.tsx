'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Eye, EyeOff, Lock, User, Phone } from 'lucide-react'
import { submitLead } from '@/app/actions/leads'

const PHONE_RULES: Record<string, { min: number; max: number; msg: string }> = {
  '+57': { min: 10, max: 10, msg: '10 dígitos' },
  '+34': { min: 9, max: 9, msg: '9 dígitos' },
  '+1': { min: 10, max: 10, msg: '10 dígitos' },
  default: { min: 7, max: 15, msg: '7-15 dígitos' }
}

export default function FormDemoBarberShort ({
  onLoginSuccess,
  lang,
  dict
}: any) {
  const t = dict

  // 1. Inicialización con persistencia para evitar borrado al cambiar idioma
  const [name, setName] = useState(() =>
    typeof window !== 'undefined'
      ? sessionStorage.getItem('demo_name') || ''
      : ''
  )
  const [phone, setPhone] = useState(() =>
    typeof window !== 'undefined'
      ? sessionStorage.getItem('demo_phone') || ''
      : ''
  )
  const [codigoPais, setCodigoPais] = useState(() =>
    typeof window !== 'undefined'
      ? sessionStorage.getItem('demo_prefix') || '+57'
      : '+57'
  )
  const [password, setPassword] = useState(() =>
    typeof window !== 'undefined'
      ? sessionStorage.getItem('demo_pass') || ''
      : ''
  )

  const [acceptTerms, setAcceptTerms] = useState(false)
  const [nameTocado, setNameTocado] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)

  // 2. Efecto para guardar borradores automáticamente y limpiar al desmontar
  useEffect(() => {
    sessionStorage.setItem('demo_name', name)
    sessionStorage.setItem('demo_phone', phone)
    sessionStorage.setItem('demo_prefix', codigoPais)
    sessionStorage.setItem('demo_pass', password)

    return () => {
      sessionStorage.removeItem('demo_name')
      sessionStorage.removeItem('demo_phone')
      sessionStorage.removeItem('demo_prefix')
      sessionStorage.removeItem('demo_pass')
    }
  }, [name, phone, codigoPais, password])

  const isNameValid =
    name
      .trim()
      .split(/\s+/)
      .filter(w => w.length > 0).length >= 2
  const currentRule = PHONE_RULES[codigoPais] || PHONE_RULES.default
  const isPhoneValid =
    phone.length >= currentRule.min && phone.length <= currentRule.max
  const isFormValid =
    isNameValid &&
    isPhoneValid &&
    password === 'barbershort' &&
    acceptTerms &&
    turnstileToken !== ''

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '')
    if (val.length <= currentRule.max) {
      setPhone(val)
      setPhoneError(
        val.length > 0 && val.length < currentRule.min
          ? `Faltan números (${currentRule.msg})`
          : ''
      )
    }
  }

  // Función de mensaje WhtatsApp
  const handleWhatsAppHelp = () => {
    // ✅ Tracking de intención de ayuda
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      ;(window as any).dataLayer.push({
        event: 'click_help_whatsapp',
        location: 'barbershort_form'
      })
    }

    const msg = encodeURIComponent(t.whatsapp.help_msg)
    window.open(`https://wa.me/573246454061?text=${msg}`, '_blank')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    setError('')
    setIsSubmitting(true)

    try {
      // 1. ✅ PERSISTENCIA EN TURSO
      const result = await submitLead({
        email: 'demo_user@barbershort.com',
        nombre: name,
        telefono: `${codigoPais}${phone}`,
        source: 'barber_short',
        lang: lang,
        metadata: {
          turnstile: turnstileToken,
          password_usada: password,
          prefijo: codigoPais,
          url_demo: typeof window !== 'undefined' ? window.location.href : '',
          db_provider: 'turso_edge'
        }
      })

      if (result.success) {
        // 2. ✅ ENVÍO A API (Sincronizado con nombres del route.ts)
        // Solo se ejecuta si Turso guardó el lead correctamente
        await fetch('/api/barber-demo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            phone: `${codigoPais}${phone}`,
            turnstileToken: turnstileToken
          })
        })

        // ✅ PROTOCOLO ALSNIPPETS: GTM
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          ;(window as any).dataLayer.push({
            event: 'form_success',
            form_id: 'barbershort_demo',
            phone_prefix: codigoPais,
            language: lang
          })
        }

        // Llamamos a tu función original de éxito para entrar a la demo
        onLoginSuccess(name, phone)
      } else {
        setError(result.error || t.validation.err_conn)
        if (typeof window.turnstile !== 'undefined') window.turnstile.reset()
      }
    } catch (err) {
      setError(t.validation.err_net)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='w-full max-w-md mx-auto bg-[#0a0a0b]/80 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.50)] rounded-xl p-8 relative overflow-hidden'>
      {/* Luz ambiental decorativa */}
      <div className='absolute -top-24 -right-24 w-48 h-48 bg-[var(--bg-brand)]/10 blur-[100px] rounded-full' />

      <div className='text-center mb-10 relative'>
        <h3 className='text-3xl font-light text-[var(--text-white-6)] uppercase tracking-[0.2em]'>
          {t.head}
        </h3>
        <div className='flex items-center justify-center gap-2 mt-2'>
          <div className='h-[1px] w-8 bg-gradient-to-r from-transparent to-[var(--bg-brand)]' />
          <span className='text-[var(--bg-brand)] text-[10px] font-bold tracking-widest uppercase'>
            {t.sub}
          </span>
          <div className='h-[1px] w-8 bg-gradient-to-l from-transparent to-[var(--bg-brand)]' />
        </div>
      </div>

      {/* === SECCIÓN FORMULARIO === */}
      <form onSubmit={handleSubmit} className='space-y-6 relative'>
        {/* SECCIÓN: NOMBRE */}
        <div className='space-y-2 group'>
          <label className='text-[var(--text-white-4)] text-[10px] font-bold uppercase tracking-[0.2em] ml-1 flex items-center gap-2 transition-colors duration-300 group-focus-within:text-[var(--text-white-5)]'>
            {t.placeholders.label_name}
          </label>

          <div className='relative flex items-center'>
            {/* Icono animado con Framer Motion */}
            <motion.div
              initial={{ opacity: 0.6, scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              animate={
                nameTocado && isNameValid
                  ? { scale: [1, 1.2, 1], color: '#22c55e' }
                  : {}
              }
              className='absolute left-4 z-10'
            >
              <User
                size={18}
                strokeWidth={1.5}
                className={`transition-colors duration-300 ${
                  nameTocado && !isNameValid
                    ? 'text-red-500'
                    : nameTocado && isNameValid
                    ? 'text-green-500'
                    : 'text-[var(--text-white-5)]'
                }`}
              />
            </motion.div>

            <input
              type='text'
              placeholder={t.placeholders.ph_name}
              value={name}
              onBlur={() => setNameTocado(true)}
              onChange={e => setName(e.target.value)}
              className={`
                w-full bg-white/[0.03] text-[var(--text-white-1)] placeholder-white/20 
                rounded-xl px-12 py-4 text-sm outline-none border transition-all duration-500
                ${
                  nameTocado && !isNameValid
                    ? 'border-red-500/50 bg-red-500/5 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
                    : nameTocado && isNameValid
                    ? 'border-green-500/50 bg-green-500/5 shadow-[0_0_25px_rgba(34,197,94,0.15)]'
                    : 'border-[var(--border-white-4)] focus:border-[var(--border-white-5)] focus:bg-white/[0.06] focus:shadow-[0_0_30px_rgba(201,163,78,0.1)]'
                }
              `}
            />
          </div>

          {/* Mensaje de error animado */}
          <AnimatePresence>
            {nameTocado && !isNameValid && (
              <motion.p
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className='text-red-500 text-[10px] font-bold mt-1 ml-1 flex items-center gap-1'
              >
                <span className='w-1 h-1 bg-red-500 rounded-full animate-ping' />
                {t.validation.err_name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* SECCIÓN: TELÉFONO */}
        <div className='space-y-2 group'>
          <label className='text-[var(--text-white-4)] text-[10px] font-bold uppercase tracking-[0.2em] ml-1 flex items-center gap-2 transition-colors duration-300 group-focus-within:text-[var(--text-white-5)]'>
            {t.placeholders.label_phone}
          </label>

          <div className='flex gap-2 relative'>
            {/* SELECTOR DE PAÍS VIP */}
            <select
              value={codigoPais}
              onChange={e => setCodigoPais(e.target.value)}
              className='bg-white/[0.03] text-[var(--text-white-2)] border border-[var(--border-white-4)] rounded-xl px-3 text-xs outline-none focus:border-[var(--border-white-5)] focus:bg-white/[0.08] transition-all cursor-pointer appearance-none'
              style={{ minWidth: '85px' }}
            >
              <option value='+57' className='bg-[#161618]'>
                🇨🇴 +57
              </option>
              <option value='+34' className='bg-[#161618]'>
                🇪🇸 +34
              </option>
              <option value='+1' className='bg-[#161618]'>
                🇺🇸 +1
              </option>
            </select>

            <div className='relative flex flex-grow items-center'>
              {/* ICONO PHONE ANIMADO (DENTRO DEL INPUT) */}
              <motion.div
                initial={{ opacity: 0.6, scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                animate={
                  isPhoneValid && !phoneError
                    ? { scale: [1, 1.2, 1], color: '#22c55e' }
                    : {}
                }
                className='absolute left-4 z-10 pointer-events-none'
              >
                <Phone
                  size={18}
                  strokeWidth={1.5}
                  className={`transition-colors duration-300 ${
                    phoneError
                      ? 'text-red-500'
                      : isPhoneValid
                      ? 'text-green-500'
                      : 'text-[var(--text-white-5)]'
                  }`}
                />
              </motion.div>

              <input
                type='tel'
                placeholder={t.placeholders.ph_phone}
                value={phone}
                onChange={handlePhoneChange}
                className={`
                  w-full bg-white/[0.03] text-[var(--text-white-1)] placeholder-white/20 
                  rounded-xl px-12 py-4 text-sm outline-none border transition-all duration-500
                  ${
                    phoneError
                      ? 'border-red-500/50 bg-red-500/5 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
                      : isPhoneValid
                      ? 'border-green-500/50 bg-green-500/5 shadow-[0_0_25px_rgba(34,197,94,0.15)]'
                      : 'border-[var(--border-white-4)] focus:border-[var(--border-white-5)] focus:bg-white/[0.06] focus:shadow-[0_0_30px_rgba(201,163,78,0.1)]'
                  }
                `}
              />
            </div>
          </div>

          {/* MENSAJE DE ERROR ANIMADO */}
          <AnimatePresence>
            {phoneError && (
              <motion.p
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className='text-red-500 text-[10px] font-bold mt-1 ml-1 flex items-center gap-1'
              >
                <span className='w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse' />
                {phoneError}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* SECCIÓN: CONTRASEÑA */}
        <div className='space-y-2 group'>
          <label className='text-[var(--text-white-4)] text-[10px] font-bold uppercase tracking-[0.2em] ml-1 flex items-center gap-2 transition-colors duration-300 group-focus-within:text-[var(--text-white-5)]'>
            {t.placeholders.label_pass}
          </label>

          <div className='relative flex items-center'>
            {/* Icono Lock animado (Izquierda interna) */}
            <motion.div
              initial={{ opacity: 0.6 }}
              animate={
                password === 'barbershort'
                  ? { color: '#22c55e', scale: 1.1 }
                  : { color: '#c9a34e', scale: 1 }
              }
              className='absolute left-4 z-10 pointer-events-none'
            >
              <Lock
                size={18}
                strokeWidth={1.5}
                className='transition-colors duration-300'
              />
            </motion.div>

            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={t.placeholders.ph_pass}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={`
                w-full bg-white/[0.03] text-[var(--text-white-1)] placeholder-white/20 
                rounded-xl px-12 py-4 text-sm outline-none border transition-all duration-500
                ${
                  password === 'barbershort'
                    ? 'border-green-500/50 bg-green-500/5 shadow-[0_0_25px_rgba(34,197,94,0.15)]'
                    : 'border-[var(--border-white-4)] focus:border-[var(--border-white-5)] focus:bg-white/[0.06] focus:shadow-[0_0_30px_rgba(201,163,78,0.1)]'
                }
              `}
            />

            {/* Botón del Ojo animado (Derecha interna) */}
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-4 z-10 text-white/20 hover:text-[var(--text-white-5)] transition-all duration-300 p-1'
            >
              <AnimatePresence mode='wait' initial={false}>
                <motion.div
                  key={showPassword ? 'eye-off' : 'eye-on'}
                  initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                >
                  {showPassword ? (
                    <EyeOff size={20} strokeWidth={1.5} />
                  ) : (
                    <Eye size={20} strokeWidth={1.5} />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className='text-[var(--text-white-1)] text-[10px] font-medium ml-1 mt-1 tracking-wide italic flex items-center gap-1.5'
          >
            <span className='w-1 h-1 bg-[var(--text-white-5)] rounded-full animate-pulse' />
            {t.placeholders.hint_pass}
          </motion.p>
        </div>

        {/* SECCIÓN: TÉRMINOS */}
        <div
          className='flex items-start space-x-3 py-2 group cursor-pointer select-none'
          onClick={() => setAcceptTerms(!acceptTerms)}
        >
          <div className='relative flex items-center justify-center'>
            <motion.div
              animate={acceptTerms ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              className={`mt-0.5 w-4.5 h-4.5 rounded border transition-all duration-300 flex items-center justify-center ${
                acceptTerms
                  ? 'bg-[var(--text-white-5)] border-[var(--border-white-5)] shadow-[0_0_10px_rgba(201,163,78,0.3)]'
                  : 'border-[var(--border-white-4)] bg-white/5 group-hover:border-[var(--border-white-3)]'
              }`}
            >
              <AnimatePresence>
                {acceptTerms && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <ShieldCheck
                      size={13}
                      className='text-[#0a0a0b]'
                      strokeWidth={3}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <label className='text-[var(--text-white-4)] text-[10px] leading-relaxed cursor-pointer group-hover:text-[var(--text-white-2)] transition-colors duration-300 font-medium'>
            {t.legales.terms}
          </label>
        </div>

        {/* SECCIÓN: CLOUDFLARE TURNSTILE */}
        <div className='flex justify-center py-2 min-h-[65px] opacity-80 hover:opacity-100 transition-opacity duration-500'>
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onSuccess={setTurnstileToken}
            options={{
              theme: 'dark',
              size: 'flexible'
            }}
          />
        </div>

        {/* SECCIÓN: MENSAJE DE ERROR VIP */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: 10 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: 10 }}
              className='overflow-hidden'
            >
              <div className='bg-red-500/5 border border-red-500/20 text-red-200/80 text-[10px] font-bold uppercase tracking-wider p-4 rounded-xl text-center backdrop-blur-md shadow-lg flex items-center justify-center gap-2'>
                <span className='w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse' />
                {error}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SECCIÓN: BOTÓN INGRESAR */}
        <div className='relative pt-4'>
          <motion.button
            whileHover={
              isFormValid
                ? {
                    scale: 1.01,
                    y: -2,
                    boxShadow: '0 15px 35px -5px rgba(201, 163, 78, 0.4)'
                  }
                : {}
            }
            whileTap={isFormValid ? { scale: 0.98, y: 0 } : {}}
            type='submit'
            disabled={!isFormValid || isSubmitting}
            className={`
              relative w-full overflow-hidden font-black py-5 rounded-xl 
              tracking-[0.2em] uppercase text-[11px] 
              transition-all duration-500 flex justify-center items-center
              ${
                !isFormValid || isSubmitting
                  ? 'bg-white/[0.1] text-[var(--text-white-4)] border border-white/40 cursor-not-allowed opacity-50'
                  : 'bg-[var(--text-white-5)] text-black border border-[var(--border-white-5)] cursor-pointer'
              }
            `}
          >
            {/* Capa de Brillo Shimmer (solo cuando el formulario es válido) */}
            {isFormValid && !isSubmitting && (
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: 'linear'
                }}
                className='absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 w-1/2'
              />
            )}

            {/* Contenido del Botón */}
            <span className='relative z-10 flex items-center gap-2'>
              {isSubmitting ? (
                <div className='flex items-center gap-3'>
                  <div className='w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin' />
                  <span className='animate-pulse tracking-widest'>
                    {t.validation.processing || '...'}
                  </span>
                </div>
              ) : (
                <>
                  {t.buttons.enter}
                  {isFormValid && (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className='ml-1'
                    >
                      →
                    </motion.span>
                  )}
                </>
              )}
            </span>
          </motion.button>

          {/* Glow decorativo inferior */}
          {isFormValid && !isSubmitting && (
            <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-[var(--text-white-5)]/10 blur-2xl -z-10' />
          )}
        </div>

        {/* ENLACES INFERIORES VIP (DERECHA E IZQUIERDA) */}
        <div className='flex justify-between items-center px-2 mt-8 pt-6 border-t border-white/20'>
          <motion.button
            whileHover={{ color: 'var(--text-white-6)', x: 2 }}
            type='button'
            onClick={handleWhatsAppHelp}
            className='text-[9px] font-bold text-[var(--text-white-5)] uppercase tracking-[0.1em] transition-all'
          >
            {t.buttons.forgot}
          </motion.button>

          <motion.button
            whileHover={{ color: 'var(--text-white-2)', scale: 1.05 }}
            type='button'
            className='text-[9px] font-bold text-[var(--text-white-5)] uppercase tracking-[0.1em] border-b border-[var(--text-white-5)]/30 pb-0.5 transition-all cursor-not-allowed'
          >
            {t.buttons.login}
          </motion.button>
        </div>
      </form>
    </div>
  )
}
