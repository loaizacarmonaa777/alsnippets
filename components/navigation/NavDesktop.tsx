'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS, NavItem } from './menu.config'

export default function NavDesktop ({ lang }: { lang: string }) {
  // 👇 1. NORMALIZAMOS EL LANG
  const normalizedLang = lang.replace(/^\//, '');
  
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null)
  const pathname = usePathname()

  // 👇 2. USAMOS EL LANG NORMALIZADO EN getLabel
  const getLabel = (item: NavItem) => {
    return typeof item.label === 'object'
      ? item.label[normalizedLang as keyof typeof item.label]
      : item.label
  }

  return (
    <nav className='flex items-center gap-1'>
      {NAV_ITEMS.map(item => {
        // 👇 3. USAMOS EL LANG NORMALIZADO EN LAS COMPARACIONES DE RUTAS
        const isActive =
          pathname === `/${normalizedLang}${item.href}` ||
          item.children?.some(child => pathname === `/${normalizedLang}${child.href}`)
        const isHovered = hoveredIndex === item.key

        return (
          <div
            key={item.key}
            className='relative'
            onMouseEnter={() => setHoveredIndex(item.key)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Link
              // 👇 4. USAMOS EL LANG NORMALIZADO EN EL HREF
              href={item.href ? `/${normalizedLang}${item.href}` : '#'}
              className={`
                relative px-4 py-2 text-[15px] font-medium flex items-center gap-1.2 transition-colors duration-300
                ${
                  isActive
                    ? 'text-[var(--text-brand)]'
                    : 'text-[var(--text-2)] hover:text-[var(--text-brand)]'
                }
              `}
            >
              {getLabel(item)}

              {item.children && (
                <ChevronDown
                  size={14}
                  strokeWidth={2.5}
                  className={`transition-transform duration-300 ${
                    isHovered ? 'rotate-180' : ''
                  }`}
                />
              )}

              {isActive && (
                <motion.div
                  layoutId='nav-active'
                  className='absolute inset-0 bg-[var(--bg-brand-hover)] rounded-xl -z-10'
                  initial={false}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            <AnimatePresence>
              {item.children && isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className='absolute left-0 top-full pt-4 z-[150] w-64'
                >
                  <div className='bg-[var(--bg-1)] border border-[var(--border-1)] rounded-2xl shadow-2xl p-2 backdrop-blur-xl overflow-hidden'>
                    {item.children.map(child => {
                      // 👇 5. USAMOS EL LANG NORMALIZADO EN LAS RUTAS DE LOS HIJOS
                      const isChildActive = pathname === `/${normalizedLang}${child.href}`

                      return (
                        <Link
                          key={child.key}
                          href={`/${normalizedLang}${child.href}`}
                          className={`
                            group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200
                            ${
                              isChildActive
                                ? 'bg-[var(--bg-brand-hover)] text-[var(--text-brand)]'
                                : 'hover:bg-[var(--bg-2)] text-[var(--text-2)] hover:text-[var(--text-brand)]'
                            }
                          `}
                        >
                          <span className='text-sm font-medium'>
                            {getLabel(child)}
                          </span>

                          <motion.div
                            className={`h-1.5 w-1.5 rounded-full bg-[var(--bg-brand)] opacity-0 group-hover:opacity-100 transition-opacity`}
                            initial={
                              isChildActive ? { opacity: 1 } : { opacity: 0 }
                            }
                          />
                        </Link>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </nav>
  )
}