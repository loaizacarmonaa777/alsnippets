'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_ITEMS, NavItem } from './menu.config'
import Link from 'next/link'
import ThemeSwitcher from './ThemeSwitcher'
import LanguageSwitcher from '../LanguageSwitcher'
import {
  X,
  User,
  ChevronRight,
  Instagram,
  Facebook,
  Linkedin,
  Github,
  Youtube
} from 'lucide-react'

const SOCIAL_LINKS = [
  { Icon: Instagram, href: 'https://www.instagram.com/alsnippets/', label: 'Instagram' },
  { Icon: Facebook, href: 'https://www.facebook.com/alsnippets', label: 'Facebook' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/adrian-loaiza-carmona-alc/', label: 'Linkedin' },
  { Icon: Github, href: 'https://github.com/loaizacarmonaa777', label: 'Github' },
  { Icon: Youtube, href: 'https://www.youtube.com/@adrianloaizacarmona852', label: 'YouTube' },
]

export default function NavMobile ({ lang }: { lang: string }) {
  // 👇 1. NORMALIZAMOS EL LANG
  const normalizedLang = lang.replace(/^\//, '');
  
  const [open, setOpen] = useState(false)

  // 👇 2. CORREGIMOS LAS TRADUCCIONES
  const translations = {
    es: {
      home: 'Inicio',
      connect: 'CONECTA CON ALSNIPPETS',
      rights: 'TODOS LOS DERECHOS RESERVADOS'
    },
    en: {
      home: 'Home',
      connect: 'CONNECT WITH ALSNIPPETS',
      rights: 'ALL RIGHTS RESERVED'
    }
  };
  
  const t = translations[normalizedLang as 'es' | 'en'] || translations.es;

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset'
  }, [open])

  // 👇 3. USAMOS EL LANG NORMALIZADO EN getLabel
  const getLabel = (item: NavItem) => {
    if (typeof item.label === 'object' && item.label !== null) {
      return item.label[normalizedLang as keyof typeof item.label] || item.key
    }
    return item.key
  }

  const sectionShadow =
    'shadow-[var(--shadow-2)] dark:shadow-[0_0_20px_rgba(245,210,122,0.15)]'

  return (
    <>
      <div className='flex items-center gap-1 sm:gap-2'>
        <div className='scale-90 origin-right'>
          {/* 👇 4. PASAMOS EL LANG NORMALIZADO A LOS COMPONENTES HIJOS */}
          <LanguageSwitcher lang={normalizedLang} />
        </div>

        <button
          onClick={() => setOpen(true)}
          className='flex flex-col gap-1.5 p-2 focus:outline-none'
        >
          <div className='h-0.5 w-6 bg-[var(--text-1)]' />
          <div className='h-0.5 w-4 bg-[var(--text-brand)] self-end' />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1]
            }}
            className='fixed inset-0 z-[120] bg-[var(--bg-menu)] flex flex-col p-4 gap-4 overflow-y-auto'
          >
            <header
              className={`bg-[var(--bg-1)] rounded-3xl p-4 pr-6 mt-10 flex items-center justify-between ${sectionShadow}`}
            >
              <div className='flex items-center gap-4 flex-1'>
                <div className='scale-110 origin-left'>
                  {/* 👇 5. PASAMOS EL LANG NORMALIZADO */}
                  <LanguageSwitcher lang={normalizedLang} />
                </div>
                <div className='h-4 w-[1px] bg-[var(--border-1)]' />
                <ThemeSwitcher lang={normalizedLang} />
              </div>

              <div className='flex items-center gap-4'>
                <div className='h-6 w-[1px] bg-[var(--border-1)]' />
                <div className='flex items-center gap-3'>
                  <Link
                    // 👇 6. USAMOS EL LANG NORMALIZADO EN EL HREF
                    href={`/${normalizedLang}/login`}
                    onClick={() => setOpen(false)}
                    className='flex h-11 w-11 items-center justify-center bg-[var(--bg-2)] rounded-full border border-[var(--border-1)] shadow-sm active:scale-90 transition-transform'
                  >
                    <User size={22} className='text-[var(--text-brand)]' />
                  </Link>
                  <button
                    onClick={() => setOpen(false)}
                    className='flex h-11 w-11 items-center justify-center bg-[var(--bg-brand-hover)] text-[var(--text-brand)] rounded-full active:scale-90 transition-transform'
                  >
                    <X size={22} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </header>

            <main
              className={`flex-1 bg-[var(--bg-1)] rounded-3xl p-6 flex flex-col gap-6 overflow-y-auto ${sectionShadow}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className='group'
              >
                <Link
                  // 👇 7. USAMOS EL LANG NORMALIZADO EN EL HREF DEL HOME
                  href={`/${normalizedLang}`}
                  onClick={() => setOpen(false)}
                  className='flex items-center justify-between py-2'
                >
                  <span className='font-black uppercase tracking-tighter text-2xl text-[var(--text-1)]'>
                    {t.home}
                  </span>
                  <ChevronRight
                    size={18}
                    className='text-[var(--text-3)] group-hover:translate-x-1 transition-transform'
                  />
                </Link>
              </motion.div>

              {NAV_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (idx + 1) * 0.05 }}
                  className='group'
                >
                  <Link
                    // 👇 8. USAMOS EL LANG NORMALIZADO EN LOS HREF DE NAVEGACIÓN
                    href={item.href ? `/${normalizedLang}${item.href}` : '#'}
                    onClick={() => setOpen(false)}
                    className='flex items-center justify-between py-2'
                  >
                    <span
                      className={`font-black uppercase tracking-tighter ${
                        item.isPriority
                          ? 'text-3xl text-[var(--text-brand)]'
                          : 'text-2xl text-[var(--text-1)]'
                      }`}
                    >
                      {getLabel(item)}
                    </span>
                    <ChevronRight
                      size={18}
                      className='text-[var(--text-3)] group-hover:translate-x-1 transition-transform'
                    />
                  </Link>

                  {item.children && (
                    <div className='grid grid-cols-1 gap-2 mt-3 pl-2 border-l-2 border-[var(--border-1)]'>
                      {item.children.map(child => (
                        <Link
                          key={child.key}
                          // 👇 9. USAMOS EL LANG NORMALIZADO EN LOS HREF DE SUBMENÚ
                          href={`/${normalizedLang}${child.href}`}
                          onClick={() => setOpen(false)}
                          className='flex items-center gap-3 p-3 rounded-2xl bg-[var(--bg-2)] hover:bg-[var(--bg-brand-hover)] transition-colors'
                        >
                          <div className='h-1.5 w-1.5 rounded-full bg-[var(--text-brand)]' />
                          <span className='text-xs font-bold text-[var(--text-2)] uppercase tracking-widest'>
                            {getLabel(child)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </main>

            <section
              className={`bg-[var(--bg-1)] rounded-3xl p-6 flex flex-col items-center gap-4 mb-4 ${sectionShadow}`}
            >
              <span className='text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-3)] text-center'>
                {t.connect}
              </span>
              <div className='flex flex-wrap justify-center gap-4'>
                {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex h-12 w-12 items-center justify-center bg-[var(--bg-2)] rounded-2xl text-[var(--text-2)] hover:text-[var(--text-brand)] transition-all border border-[var(--border-1)] hover:border-[var(--border-brand)] shadow-sm'
                  >
                    <Icon size={20} />
                  </Link>
                ))}
              </div>
              <p className='text-[9px] font-medium text-[var(--text-3)] text-center'>
                © 2026 ALSNIPPETS EXPERT · {t.rights}
              </p>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}