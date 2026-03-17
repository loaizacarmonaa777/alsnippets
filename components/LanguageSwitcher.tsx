'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/* =====================================================
   CONFIGURACIÓN DE IDIOMAS
   ===================================================== */
const LANGUAGES = [
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'en', label: 'English', short: 'EN' }
]

export default function LanguageSwitcher ({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Lógica de detección de clic fuera (Lógica Sensible Blindada)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Generador de rutas dinámicas para el cambio de idioma
  const getRedirectPath = (targetLang: string) => {
    const segments = pathname.split('/')
    segments[1] = targetLang
    return segments.join('/')
  }

  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0]

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='group flex items-center gap-2 rounded-full border border-[var(--border-1)] bg-[var(--bg-2)] px-3 py-1.5 transition-all hover:border-[var(--border-brand)] hover:bg-[var(--bg-brand-hover)]'
      >
        <div className='flex h-5 w-5 items-center justify-center rounded-full bg-[var(--bg-1)] text-[var(--text-brand)] shadow-sm'>
          <Globe size={13} strokeWidth={2.5} />
        </div>

        <span className='text-[12px] font-medium uppercase tracking-widest text-[var(--text-1)]'>
          {currentLang.short}
        </span>

        <ChevronDown
          size={13}
          strokeWidth={2.5}
          className={`text-[var(--text-3)] transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            /* Blindaje Visual: Posicionamiento responsivo intacto */
            className='absolute left-0 md:left-auto md:right-0 top-full z-[200] w-36 overflow-hidden rounded-xl border border-[var(--border-1)] bg-[var(--bg-1)] shadow-2xl backdrop-blur-xl origin-top-left md:origin-top-right'
          >
            <div className='flex flex-col p-1.5'>
              {LANGUAGES.map(l => (
                <Link
                  key={l.code}
                  href={getRedirectPath(l.code)}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-3 py-2 text-[11px] font-bold uppercase tracking-tight rounded-lg transition-colors
                    ${
                      lang === l.code
                        ? 'bg-[var(--bg-brand-hover)] text-[var(--text-brand)]'
                        : 'text-[var(--text-2)] hover:bg-[var(--bg-2)] hover:text-[var(--text-brand)]'
                    }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}