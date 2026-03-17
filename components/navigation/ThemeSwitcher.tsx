'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

interface ThemeSwitcherProps {
  lang?: string
}

export default function ThemeSwitcher({ lang = 'es' }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // PROTOCOLO ALSNIPPETS: Objeto de traducción local (Lógica Sensible)
  const t = {
    es: { label: 'Cambiar tema' },
    en: { label: 'Toggle theme' }
  }[lang as 'es' | 'en'] || { label: 'Cambiar tema' };

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className='w-[68px] h-8 rounded-full bg-[var(--bg-2)] opacity-20' />
  }

  const isDark = theme === 'dark'

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        aria-label={t.label}
        className="relative flex h-8 w-[68px] items-center rounded-full bg-[var(--bg-3)] p-1 transition-colors duration-300 border border-[var(--border-1)] hover:border-[var(--border-brand)]"
      >
        {/* Iconos de fondo (Estaticos) */}
        <div className="flex w-full justify-around text-[var(--text-3)]">
          <Sun size={14} strokeWidth={2.5} />
          <Moon size={14} strokeWidth={2.5} />
        </div>

        {/* Píldora deslizante (Blindaje Visual Framer Motion) */}
        <motion.div
          className="absolute z-10 flex h-6 w-7 items-center justify-center rounded-full bg-[var(--bg-1)] shadow-sm border border-[var(--border-1)]"
          animate={{
            x: isDark ? 34 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }}
        >
          {isDark ? (
            <Moon size={14} strokeWidth={2.5} className="text-[var(--text-brand)]" />
          ) : (
            <Sun size={14} strokeWidth={2.5} className="text-[var(--text-brand)]" />
          )}
        </motion.div>
      </button>
    </div>
  )
}