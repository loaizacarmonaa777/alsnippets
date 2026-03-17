'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Cookie, X, Settings2, ShieldCheck } from 'lucide-react'

export default function CookieConsent () {
  const pathname = usePathname()
  const [lang, setLang] = useState('es')

  useEffect(() => {
    const pathLang = pathname?.split('/')[1]
    if (pathLang === 'es' || pathLang === 'en') {
      setLang(pathLang)
    }
  }, [pathname])

  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false
  })

  // 👇 1. DEFINIMOS LAS TRADUCCIONES FUERA DEL OBJETO t
  const translations = {
    es: {
      title: 'Privacidad y Cookies',
      desc: 'Utilizamos cookies propias y de terceros para garantizar el correcto funcionamiento del sitio (esenciales), analizar nuestro tráfico (analíticas) y personalizar el contenido (marketing). Cumplimos con las normativas GDPR, CCPA y leyes internacionales de protección de datos.',
      read: 'Lee nuestros',
      and: 'y',
      terms: 'Términos y Condiciones',
      privacy: 'Política de Privacidad',
      config: 'Configurar',
      reject: 'Rechazar',
      accept: 'Aceptar todas',
      pref: 'Preferencias',
      prefDesc: 'Revisa y personaliza el uso que hacemos de tus datos. Las cookies esenciales no se pueden desactivar ya que son necesarias para el funcionamiento de la web.',
      essentialTitle: 'Estrictamente Necesarias',
      essentialDesc: 'Garantizan la seguridad y el funcionamiento básico.',
      analyticsTitle: 'Rendimiento y Analíticas',
      analyticsDesc: 'Nos ayudan a saber qué páginas son más populares y cómo navegan los usuarios.',
      marketingTitle: 'Marketing y Publicidad',
      marketingDesc: 'Se usan para rastrear a los visitantes y mostrar anuncios relevantes.',
      save: 'Guardar mis preferencias'
    },
    en: {
      title: 'Privacy and Cookies',
      desc: 'We use our own and third-party cookies to ensure the correct functioning of the site (essential), analyze our traffic (analytics), and personalize content (marketing). We comply with GDPR, CCPA, and international data protection laws.',
      read: 'Read our',
      and: 'and',
      terms: 'Terms and Conditions',
      privacy: 'Privacy Policy',
      config: 'Settings',
      reject: 'Reject',
      accept: 'Accept all',
      pref: 'Preferences',
      prefDesc: 'Review and personalize how we use your data. Essential cookies cannot be deactivated as they are necessary for the website to function.',
      essentialTitle: 'Strictly Necessary',
      essentialDesc: 'Ensure security and basic functionality.',
      analyticsTitle: 'Performance & Analytics',
      analyticsDesc: 'They help us know which pages are most popular and how users navigate.',
      marketingTitle: 'Marketing & Advertising',
      marketingDesc: 'Used to track visitors and show relevant ads.',
      save: 'Save my preferences'
    }
  };

  // 👇 2. SELECCIONAMOS EL IDIOMA CORRECTO
  const t = translations[lang as 'es' | 'en'] || translations.es;

  useEffect(() => {
    const consent = localStorage.getItem('alsnippets_cookie_consent')
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    const allConsented = { essential: true, analytics: true, marketing: true }
    localStorage.setItem('alsnippets_cookie_consent', JSON.stringify(allConsented))
    setPreferences(allConsented)
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    const onlyEssential = { essential: true, analytics: false, marketing: false }
    localStorage.setItem('alsnippets_cookie_consent', JSON.stringify(onlyEssential))
    setPreferences(onlyEssential)
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem('alsnippets_cookie_consent', JSON.stringify(preferences))
    setIsVisible(false)
    setShowSettings(false)
  }

  const togglePreference = (type: 'analytics' | 'marketing') => {
    setPreferences(prev => ({ ...prev, [type]: !prev[type] }))
  }

  if (!isVisible) return null

  return (
    <>
      {/* BANNER PRINCIPAL (Blindaje Visual) */}
      <div className='fixed bottom-0 left-0 w-full z-[9998] p-4 md:p-6 pointer-events-none animate-fade-in-up'>
        <div className='max-w-6xl mx-auto bg-[var(--bg-1)]/95 backdrop-blur-xl border border-[var(--border-1)] shadow-[var(--shadow-2)] rounded-2xl p-6 pointer-events-auto flex flex-col md:flex-row gap-6 items-center justify-between'>
          <div className='flex-1 space-y-3'>
            <div className='flex items-center gap-2 text-[var(--text-1)] font-bold'>
              <Cookie className='w-5 h-5 text-[var(--text-brand)]' />
              <h3 className='text-[var(--text-1)]'>{t.title}</h3>
            </div>
            <p className='text-sm text-[var(--text-2)] leading-relaxed max-w-3xl'>
              {t.desc} {t.read}{' '}
              <Link href={`/${lang}/terminos`} className='font-bold text-[var(--text-brand)] hover:underline'>{t.terms}</Link>{' '}
              {t.and}{' '}
              <Link href={`/${lang}/privacidad`} className='font-bold text-[var(--text-brand)] hover:underline'>{t.privacy}</Link>.
            </p>
          </div>

          <div className='flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0'>
            <button onClick={() => setShowSettings(true)} className='w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold bg-[var(--bg-3)] text-[var(--text-1)] border border-[var(--border-1)] hover:border-[var(--border-brand)] transition-all flex items-center justify-center gap-2 shadow-[var(--shadow-1)]'>
              <Settings2 className='w-4 h-4' /> {t.config}
            </button>
            <button onClick={handleRejectAll} className='w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold border border-[var(--border-1)] text-[var(--text-2)] hover:bg-[var(--bg-3)] transition-all'>
              {t.reject}
            </button>
            <button onClick={handleAcceptAll} className='w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold bg-[var(--bg-brand)] text-[var(--text-inverse)] hover:shadow-[var(--shadow-brand-glow)] transition-all shadow-[var(--shadow-1)]'>
              {t.accept}
            </button>
          </div>
        </div>
      </div>

      {/* MODAL DE CONFIGURACIÓN */}
      {showSettings && (
        <div className='fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[var(--bg-inverse)]/70 backdrop-blur-sm animate-fade-in'>
          <div className='bg-[var(--bg-1)] p-6 md:p-8 rounded-[2rem] shadow-[var(--shadow-2)] max-w-lg w-full relative flex flex-col scale-up border border-[var(--border-brand)]'>
            <button onClick={() => setShowSettings(false)} className='absolute top-5 right-5 p-2 bg-[var(--bg-3)] hover:bg-red-500/10 hover:text-red-500 text-[var(--text-2)] rounded-full transition-colors'>
              <X className='w-5 h-5' />
            </button>

            <div className='flex items-center gap-3 mb-6'>
              <ShieldCheck className='w-8 h-8 text-[var(--text-brand)]' />
              <h3 className='text-2xl font-bold text-[var(--text-1)] !my-0'>{t.pref}</h3>
            </div>

            <p className='text-sm text-[var(--text-2)] mb-6'>{t.prefDesc}</p>

            <div className='space-y-4 mb-8'>
              <div className='flex items-center justify-between p-4 rounded-xl border border-[var(--border-1)] bg-[var(--bg-3)]/50 opacity-70'>
                <div>
                  <p className='font-bold text-[var(--text-1)] text-sm'>{t.essentialTitle}</p>
                  <p className='text-xs text-[var(--text-3)] mt-1'>{t.essentialDesc}</p>
                </div>
                <div className='w-11 h-6 bg-[var(--bg-brand)] rounded-full relative opacity-50 cursor-not-allowed'>
                  <div className='absolute right-1 top-1 bg-[var(--text-inverse)] w-4 h-4 rounded-full shadow-sm'></div>
                </div>
              </div>

              <div className='flex items-center justify-between p-4 rounded-xl border border-[var(--border-1)] bg-[var(--bg-2)] hover:border-[var(--border-brand)] transition-colors'>
                <div className='pr-4'>
                  <p className='font-bold text-[var(--text-1)] text-sm'>{t.analyticsTitle}</p>
                  <p className='text-xs text-[var(--text-3)] mt-1'>{t.analyticsDesc}</p>
                </div>
                <button onClick={() => togglePreference('analytics')} className={`w-12 h-6 rounded-full relative transition-all shrink-0 shadow-inner ${preferences.analytics ? 'bg-[var(--bg-brand)]' : 'bg-[var(--border-2)]'}`}>
                  <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all shadow-sm ${preferences.analytics ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>

              <div className='flex items-center justify-between p-4 rounded-xl border border-[var(--border-1)] bg-[var(--bg-2)] hover:border-[var(--border-brand)] transition-colors'>
                <div className='pr-4'>
                  <p className='font-bold text-[var(--text-1)] text-sm'>{t.marketingTitle}</p>
                  <p className='text-xs text-[var(--text-3)] mt-1'>{t.marketingDesc}</p>
                </div>
                <button onClick={() => togglePreference('marketing')} className={`w-12 h-6 rounded-full relative transition-all shrink-0 shadow-inner ${preferences.marketing ? 'bg-[var(--bg-brand)]' : 'bg-[var(--border-2)]'}`}>
                  <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all shadow-sm ${preferences.marketing ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>
            </div>

            <button onClick={handleSavePreferences} className='w-full py-4 rounded-xl text-sm font-bold shadow-[var(--shadow-2)] transition-all duration-300 border border-[var(--border-brand)] bg-[var(--bg-brand)] text-[var(--bg-inverse)] hover:bg-[var(--bg-inverse)] hover:text-[var(--text-brand)] hover:shadow-[var(--shadow-brand-glow-hover)]'>
              {t.save}
            </button>
          </div>
        </div>
      )}
    </>
  )
}