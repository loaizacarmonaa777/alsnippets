'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { User } from 'lucide-react'
import NavDesktop from './NavDesktop'
import NavMobile from './NavMobile'
import ThemeSwitcher from './ThemeSwitcher'
import LanguageSwitcher from '../LanguageSwitcher'

export default function MainNav ({ lang }: { lang: string }) {
  // 👇 1. NORMALIZAMOS EL LANG
  const normalizedLang = lang.replace(/^\//, '');
  
  const [scrolled, setScrolled] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // 👇 2. CORREGIMOS LAS TRADUCCIONES
  const translations = {
    es: {
      home: 'Ir al inicio',
      account: 'Cuenta'
    },
    en: {
      home: 'Go to home',
      account: 'Account'
    }
  };
  
  const t = translations[normalizedLang as 'es' | 'en'] || translations.es;

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`nav-glass transition-all duration-500 ${
        scrolled ? 'nav-glass-scrolled' : 'top-14'
      }`}
      style={{ background: 'var(--bg-menu)', backdropFilter: 'none' }}
    >
      <div className='flex h-16 items-center justify-between px-6'>
        {/* SECCIÓN 1: LOGO */}
        <div className='flex items-center'>
          <Link
            href={`/${normalizedLang}`}
            scroll={false}
            className='group flex items-center'
            aria-label={t.home}
          >
            <img
              src={
                mounted && theme === 'dark'
                  ? '/brand/logo-fondo-dark-menu.svg'
                  : '/brand/logo-fondo-light-menu.svg'
              }
              alt='Alsnippets Logo'
              className={`h-10 w-auto transition-opacity duration-300 ${
                !mounted ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </Link>
        </div>

        {/* SECCIÓN 2: DESKTOP NAV */}
        <div className='hidden lg:flex flex-1 justify-end px-5'>
          <NavDesktop lang={normalizedLang} />
        </div>

        {/* SECCIÓN 3: ACCIONES Y MOBILE NAV */}
        <div className='flex items-center gap-4'>
          <div className='hidden md:flex items-center gap-4 border-l border-[var(--border-1)] pl-4'>
            <LanguageSwitcher lang={normalizedLang} />
            <div className='h-4 w-[1px] bg-[var(--border-1)]' />
            <ThemeSwitcher lang={normalizedLang} />
          </div>

          <div className='h-6 w-[1px] bg-[var(--border-1)] hidden md:block' />

          <Link
            href={`/${normalizedLang}/login`}
            className='group relative hidden lg:flex h-11 w-11 items-center justify-center rounded-full bg-[var(--bg-2)] transition-all hover:bg-[var(--bg-brand-hover)] border border-[var(--border-1)] hover:border-[var(--border-brand)] shadow-sm'
            id='gtm-nav-login'
          >
            <User
              size={22}
              strokeWidth={2.5}
              className='text-[var(--text-brand)] transition-transform group-hover:scale-110'
            />
            <span className='absolute -bottom-10 scale-0 rounded-lg bg-[var(--bg-1)] px-3 py-1 text-[10px] font-black tracking-widest text-[var(--text-1)] shadow-2xl transition-all group-hover:scale-100 border border-[var(--border-1)] uppercase'>
              {t.account}
            </span>
          </Link>

          <div className='lg:hidden'>
            <NavMobile lang={normalizedLang} />
          </div>
        </div>
      </div>
    </header>
  )
}