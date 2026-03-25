'use client'

import { useState, useRef, useEffect } from 'react'

interface FakeWPProps {
  lang: string
}

/* =====================================================
   FakeWordPressLogin
   - Imita la estética de acceso a WordPress
   - PROTOCOLO ALSNIPPETS: Blindaje visual y lógica i18n
   ===================================================== */

export default function FakeWordPressLogin ({ lang }: FakeWPProps) {
  const [showAlert, setShowAlert] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [blink, setBlink] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)

  // Objeto de traducción local (Lógica Sensible)
  const t = {
    es: {
      user: 'Nombre de usuario o correo electrónico',
      pass: 'Contraseña',
      check: 'Necesito accesos',
      btn: 'Acceder',
      lost: '¿No le has dado la contraseña a Adrián?',
      back: '← Ir a contacto para enviarle la contraseña',
      alertHead: 'Accesos necesarios.',
      alertBody:
        'Para poder realizar modificaciones reales, necesito los accesos correctos.'
    },
    en: {
      user: 'Username or Email Address',
      pass: 'Password',
      check: 'I need access',
      btn: 'Log In',
      lost: "Haven't given the password to Adrián yet?",
      back: '← Go to contact to send him the password',
      alertHead: 'Required access.',
      alertBody: 'To make real changes, I need the correct credentials.'
    }
  }[lang as 'es' | 'en'] || {
    user: 'Nombre de usuario o correo electrónico',
    pass: 'Contraseña',
    check: 'Necesito accesos',
    btn: 'Acceder',
    lost: '¿No le has dado la contraseña a Adrián?',
    back: '← Ir a contacto para enviarle la contraseña',
    alertHead: 'Accesos necesarios.',
    alertBody:
      'Para poder realizar modificaciones reales, necesito los accesos correctos.'
  }

  useEffect(() => {
    function handleClickOutside (event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowAlert(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleFocus = () => {
    setShowAlert(true)
    setBlink(true)
    setTimeout(() => setBlink(false), 250)
  }

  const togglePassword = () => {
    setShowPassword(prev => !prev)
    setBlink(true)
    setTimeout(() => setBlink(false), 250)
  }

  return (
    <div className='flex items-center justify-center px-4'>
      <div ref={wrapperRef} className='w-full max-w-sm'>
        {/* Branding WordPress */}
        <div
          className={`text-center mb-6 transition-transform duration-300 ${
            showAlert ? '-translate-y-2' : ''
          }`}
        >
          <img
            src='/logos/stack/01-wordpress.svg'
            alt='WordPress'
            className='h-20 mx-auto'
          />
        </div>

        {/* Alerta Blindada (Solo cambio de texto) */}
        <div
          className={`overflow-hidden transition-all duration-300 bg-amber-50 ${
            showAlert ? 'max-h-40 opacity-100 mb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='border-l-4 border-[var(--spectrum-red)] bg-[var(--bg-1)] p-3 text-sm shadow-[var(--shadow-1)] text-[var(--text-1)]'>
            <strong>{t.alertHead}</strong> {t.alertBody}
          </div>
        </div>

        {/* Caja login (Blindaje Visual Absoluto) */}
        <div className='bg-[var(--bg-3)] p-8 pt-14 rounded-sm shadow-[var(--shadow-2)] border border-[var(--border-1)] space-y-6 dark:text-black'>
          <div>
            <label className='block text-sm font-medium mb-1 text-[var(--text-1)]'>
              {t.user}
            </label>
            <input
              type='text'
              onFocus={handleFocus}
              className='w-full border border-[var(--border-2)] bg-[var(--bg-body)] text-[var(--text-1)] rounded-sm px-3 py-2 text-sm focus:border-[var(--text-brand)] focus:ring-1 focus:ring-[var(--text-brand)] outline-none'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-1 text-[var(--text-1)]'>
              {t.pass}
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                onFocus={handleFocus}
                className='w-full border border-[var(--border-2)] bg-[var(--bg-body)] text-[var(--text-1)] rounded-sm px-3 py-2 text-sm pr-10 focus:border-[var(--text-brand)] focus:ring-1 focus:ring-[var(--text-brand)] outline-none'
              />
              <button
                type='button'
                onClick={togglePassword}
                className='absolute right-3 top-2 text-[var(--text-3)]'
              >
                <span
                  className={`inline-block transition-transform ${
                    blink ? 'scale-y-0' : 'scale-y-100'
                  }`}
                >
                  👁
                </span>
              </button>
            </div>
          </div>

          <div className='flex items-center gap-2 text-sm text-[var(--text-2)]'>
            <input type='checkbox' className='accent-[var(--text-brand)]' />
            <span>{t.check}</span>
          </div>

          <div className='flex justify-end'>
            <button
              type='button'
              onClick={handleFocus}
              className='bg-[var(--bg-brand)] text-[var(--text-inverse)] px-4 py-2 text-sm font-medium rounded-sm'
            >
              {t.btn}
            </button>
          </div>
        </div>

        {/* Links inferiores (Blindaje de rutas i18n) */}
        <div className='mt-4 text-sm text-center space-y-2'>
          <div>
            <a
              href={`/${lang}/contacto`}
              className='text-[var(--text-brand)] hover:text-[var(--text-5)] cursor-pointer transition-colors duration-300'
            >
              {t.lost}
            </a>
          </div>

          <div>
            <a
              href={`/${lang}/contacto`}
              className='text-[var(--text-brand)] hover:text-[var(--text-5)] cursor-pointer transition-colors duration-300'
            >
              {t.back}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
