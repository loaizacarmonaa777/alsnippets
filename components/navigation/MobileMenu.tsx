'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { NAV_ITEMS, NavItem } from './menu.config'

export default function MobileMenu ({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)

  // PROTOCOLO ALSNIPPETS: Objeto de traducción local para interfaz sensible
  const translations = {
    es: { open: 'Abrir menú', close: 'Cerrar menú', scan: 'Escanear' },
    en: { open: 'Open menu', close: 'Close menu', scan: 'Scan' }
  }

  const t = translations[lang as 'es' | 'en'] || translations.es

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
  }, [isOpen])

  const toggleAccordion = (key: string) => {
    setActiveAccordion(activeAccordion === key ? null : key)
  }

  // Función de seguridad para extraer el texto del config bilingüe
  const getLabel = (item: NavItem) => {
    if (typeof item.label === 'string') return item.label
    if (typeof item.label === 'object' && item.label !== null) {
      return item.label[lang as keyof typeof item.label] || item.key
    }
    return item.key
  }

  return (
    <div className='lg:hidden'>
      <button
        onClick={() => setIsOpen(true)}
        className='button-topbar dark:text-[var(--text-brand)] p-2'
        aria-label={t.open}
      >
        <Menu size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className='fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm'
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className='fixed right-0 top-0 z-[120] h-screen w-[85%] max-w-sm bg-[var(--bg-1)] p-8 shadow-2xl overflow-y-auto'
            >
              <div className='flex justify-end mb-10'>
                <button
                  onClick={() => setIsOpen(false)}
                  className='text-[var(--text-1)] p-2'
                  aria-label={t.close}
                >
                  <X size={32} />
                </button>
              </div>

              <nav className='flex flex-col gap-5'>
                {NAV_ITEMS.map(item => {
                  const labelText = getLabel(item)

                  if (item.children) {
                    const isExpanded = activeAccordion === item.key
                    return (
                      <div key={item.key} className='flex flex-col'>
                        <button
                          onClick={() => toggleAccordion(item.key)}
                          className='flex items-center justify-between text-2xl font-bold text-[var(--text-1)]'
                        >
                          {labelText}
                          <ChevronDown
                            className={`transition-transform duration-300 ${
                              isExpanded
                                ? 'rotate-180 text-[var(--text-brand)]'
                                : 'opacity-50'
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className='overflow-hidden flex flex-col gap-3 pl-4 mt-4 border-l-2 border-[var(--border-brand)]'
                            >
                              {item.children.map(child => (
                                <Link
                                  key={child.key}
                                  href={`/${lang}${child.href}`}
                                  onClick={() => setIsOpen(false)}
                                  className='text-lg text-[var(--text-2)] hover:text-[var(--text-brand)] transition-colors'
                                >
                                  {getLabel(child)}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  }

                  return (
                    <Link
                      key={item.key}
                      href={item.href ? `/${lang}${item.href}` : '#'}
                      onClick={() => setIsOpen(false)}
                      className={
                        item.isPriority
                          ? 'bg-[var(--bg-brand)] text-[var(--text-inverse)] p-4 rounded-xl text-center font-bold text-xl shadow-lg mt-2'
                          : 'text-2xl font-bold text-[var(--text-1)] hover:text-[var(--text-brand)] transition-colors'
                      }
                    >
                      {labelText}
                    </Link>
                  )
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
