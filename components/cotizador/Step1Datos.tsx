'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { ChevronRight, Search, AlertCircle, Check, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getCountryFromPhone, COUNTRY_OPTIONS } from './utils/pricingLogic'
import { parsePhoneNumber } from 'libphonenumber-js'

interface Step1Props {
  formData: {
    nombre: string
    email: string
    whatsapp: string
    pais: string
    moneda: string
  }
  updateFormData: (data: Partial<Step1Props['formData']>) => void
  onNext: () => void
  lang: string
  dict: any
}

/* =====================================================
   COMPONENTE: Alerta Suave Animada
   ===================================================== */
const FieldAlert = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className='flex items-center gap-2 mt-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg'
  >
    <span className='relative flex h-2 w-2'>
      <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
      <span className='relative inline-flex rounded-full h-2 w-2 bg-red-500'></span>
    </span>
    <p className='text-[11px] font-medium text-red-500 uppercase tracking-wider'>
      {message}
    </p>
  </motion.div>
)

export default function Step1Datos ({
  formData,
  updateFormData,
  onNext,
  lang,
  dict: t
}: Step1Props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)

  // Lógica de validación extendida
  const emailError = useMemo(() => {
    if (!formData.email) return null
    if (!formData.email.includes('@')) return 'Falta el @'
    if (!formData.email.split('@')[1]?.includes('.')) return 'Falta el .dominio'
    return null
  }, [formData.email])

  const nameError = useMemo(() => {
    if (!formData.nombre) return null
    const parts = formData.nombre.trim().split(' ')
    if (parts.length < 2) return 'Ingresa nombre y al menos un apellido'
    return null
  }, [formData.nombre])

  const phoneError = useMemo(() => {
    if (!formData.whatsapp) return null
    if (!formData.whatsapp.startsWith('+'))
      return 'Falta el indicativo de país (ej: +34)'
    if (formData.whatsapp.length < 4) return 'Número demasiado corto'

    try {
      const phoneNumber = parsePhoneNumber(formData.whatsapp)

      if (!phoneNumber.isValid()) {
        // La librería nos dice qué país detectó por el prefijo
        const country = phoneNumber.country

        // Si el número no es válido aún, podemos ser específicos
        return `Número no válido para ${formData.pais || country}`
      }
      return null // Es válido
    } catch (error) {
      return 'Formato internacional requerido (ej: +57...)'
    }
  }, [formData.whatsapp, formData.pais])

  const filteredCountries = useMemo(() => {
    const flat = COUNTRY_OPTIONS.flatMap(g => g.options)
    if (!searchTerm) return flat
    return flat.filter(
      c =>
        c.n.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.v.includes(searchTerm)
    )
  }, [searchTerm])

  // PASO 2: Añadir el manejador de teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isSearchOpen) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(prev =>
        prev < filteredCountries.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(prev => (prev > 0 ? prev - 1 : 0))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      const selected = filteredCountries[activeIndex]
      updateFormData({ whatsapp: selected.v })
      setIsSearchOpen(false)
      setSearchTerm('')
      setActiveIndex(-1)
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false)
    }
  }

  useEffect(() => {
    if (formData.whatsapp.startsWith('+') && formData.whatsapp.length >= 3) {
      const countryData = getCountryFromPhone(formData.whatsapp, lang)
      if (countryData.name) {
        updateFormData({ pais: countryData.name, moneda: countryData.currency })
      }
    }
  }, [formData.whatsapp, lang, updateFormData])

  const isValid =
    !nameError &&
    !emailError &&
    !phoneError &&
    formData.pais !== '' &&
    formData.nombre !== '' &&
    formData.email !== ''

  return (
    <div className='space-y-6 animate-fade-in'>
      <div>
        <h3 className='text-2xl font-black text-[var(--text-1)]'>{t?.title}</h3>
        <p className='text-[var(--text-2)] text-sm'>{t?.desc}</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* CAMPO: NOMBRE */}
        <div className='relative'>
          <input
            type='text'
            placeholder={t?.name}
            value={formData.nombre}
            onChange={e => updateFormData({ nombre: e.target.value })}
            className={`w-full p-4 rounded-xl bg-[var(--bg-body)] border transition-all outline-none text-[var(--text-1)]
              ${
                formData.nombre && !nameError
                  ? 'border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.2)]'
                  : 'border-[var(--border-1)] focus:border-[var(--border-brand)]'
              }
            `}
          />
          <AnimatePresence>
            {nameError && <FieldAlert message={nameError} />}
          </AnimatePresence>
        </div>

        {/* CAMPO: EMAIL */}
        <div className='relative'>
          <input
            type='email'
            placeholder={t?.email}
            value={formData.email}
            onChange={e => updateFormData({ email: e.target.value })}
            className={`w-full p-4 rounded-xl bg-[var(--bg-body)] border transition-all outline-none text-[var(--text-1)]
              ${
                formData.email && !emailError
                  ? 'border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.2)]'
                  : 'border-[var(--border-1)] focus:border-[var(--border-brand)]'
              }
            `}
          />
          <AnimatePresence>
            {emailError && <FieldAlert message={emailError} />}
          </AnimatePresence>
        </div>

        {/* CAMPO: WHATSAPP CON BUSCADOR */}
        <div className='relative space-y-2'>
          <div className='flex gap-2'>
            <button
              type='button'
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className='p-4 bg-[var(--bg-3)] border border-[var(--border-1)] rounded-xl text-[var(--text-1)] hover:bg-[var(--bg-2)] transition-colors'
              title='Buscar indicativo'
            >
              <Globe className='w-5 h-5' />
            </button>
            <input
              type='tel'
              placeholder={t?.wa}
              value={formData.whatsapp}
              onChange={e => {
                // Bloqueo de letras: Solo permite números y el signo +
                const onlyNums = e.target.value.replace(/[^0-9+]/g, '')
                updateFormData({ whatsapp: onlyNums })
              }}
              className={`flex-grow p-4 rounded-xl bg-[var(--bg-body)] border transition-all outline-none text-[var(--text-1)]
        ${
          formData.whatsapp && !phoneError
            ? 'border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.2)]'
            : 'border-[var(--border-1)] focus:border-[var(--border-brand)]'
        }
      `}
            />
          </div>

          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className='absolute z-[100] w-full mt-2 bg-[var(--bg-1)] border border-[var(--border-1)] rounded-2xl shadow-2xl overflow-hidden'
              >
                {/* 1. INPUT CON GESTIÓN DE TECLADO */}
                <div className='p-3 border-b border-[var(--border-1)] bg-[var(--bg-2)] flex items-center gap-2'>
                  <Search className='w-4 h-4 text-[var(--text-brand)]' />
                  <input
                    autoFocus
                    className='bg-transparent border-none outline-none text-sm w-full text-[var(--text-1)]'
                    placeholder='Busca tu país (ej: Corea)...'
                    value={searchTerm}
                    onChange={e => {
                      setSearchTerm(e.target.value)
                      setActiveIndex(0) // Reinicia el foco al primer resultado al escribir
                    }}
                    onKeyDown={handleKeyDown} // Activa las flechas y el Enter
                  />
                </div>

                {/* 2. LISTA CON RESALTADO DINÁMICO */}
                <div className='max-h-[300px] overflow-y-auto overscroll-contain'>
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((c: any, index: number) => (
                      <button
                        key={c.iso || c.v + index}
                        onMouseEnter={() => setActiveIndex(index)} // El mouse sincroniza el foco
                        onClick={() => {
                          updateFormData({ whatsapp: c.v })
                          setIsSearchOpen(false)
                          setSearchTerm('')
                        }}
                        // La clase dinámica añade el borde dorado y el fondo si es el elemento activo
                        className={`w-full text-left p-4 flex justify-between items-center transition-colors border-b border-[var(--border-1)] last:border-0
                ${
                  activeIndex === index
                    ? 'bg-[var(--bg-brand-hover)] border-l-4 border-l-[var(--bg-brand)]'
                    : ''
                }`}
                      >
                        <span
                          className={`text-sm ${
                            activeIndex === index
                              ? 'font-bold text-[var(--text-brand)]'
                              : 'text-[var(--text-1)]'
                          }`}
                        >
                          {c.n}
                        </span>
                        <span className='text-[var(--text-3)] font-mono text-xs bg-[var(--bg-3)] px-2 py-1 rounded'>
                          {c.v}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className='p-8 text-center text-[var(--text-3)] text-sm'>
                      No se encontraron resultados
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {phoneError && <FieldAlert message={phoneError} />}
          </AnimatePresence>
        </div>

        {/* CAMPO: PAÍS (READ ONLY) */}
        <div className='relative'>
          <div
            className={`flex items-center gap-3 p-4 rounded-xl border transition-all h-[58px]
            ${
              formData.pais
                ? 'bg-green-500/5 border-green-500/30'
                : 'bg-[var(--bg-3)] border-[var(--border-1)]'
            }
          `}
          >
            {formData.pais ? (
              <Check className='w-5 h-5 text-green-500' />
            ) : (
              <Globe className='w-5 h-5 text-[var(--text-3)]' />
            )}
            <span
              className={`font-bold text-sm ${
                formData.pais ? 'text-green-600' : 'text-[var(--text-3)]'
              }`}
            >
              {formData.pais || 'Detectando país...'}
            </span>
          </div>
        </div>
      </div>

      <div className='pt-4 flex justify-end'>
        <button
          disabled={!isValid}
          onClick={onNext}
          className='flex items-center justify-center gap-2 w-full md:w-auto px-10 py-4 bg-[var(--bg-brand)] text-[var(--text-inverse)] rounded-xl font-black hover:brightness-110 transition-all hover:-translate-y-1 disabled:opacity-30 disabled:grayscale disabled:pointer-events-none'
        >
          {t?.next} <ChevronRight className='w-5 h-5' />
        </button>
      </div>
    </div>
  )
}
