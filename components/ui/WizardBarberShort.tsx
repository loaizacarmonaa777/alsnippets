'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { getDictionary } from '@/i18n/get-dictionary'

export default function WizardBarberShort ({ userData, lang, dict }: any) {
  const t = dict
  const [step, setStep] = useState(1)
  const [selectedBarber, setSelectedBarber] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [dynamicDays, setDynamicDays] = useState<any[]>([])

  const [formData, setFormData] = useState({
    tipoRostro: '',
    usaLentes: '',
    corteId: '',
    barbaId: '',
    cejas: false,
    limpieza: false,
    masaje: false,
    lavado: false, // Nueva opción
    pigmentacion: false, // Nueva opción
    fecha: '',
    hora: '',
    metodoPago: ''
  })

  // 10 OPCIONES DE CORTE (c1 a c10)
  const opcionesCorte = useMemo(
    () => [
      {
        id: 'c1',
        name: t?.step2?.haircut_options?.classic || 'Classic',
        price: 15,
        time: 30
      },
      {
        id: 'c2',
        name: t?.step2?.haircut_options?.fade || 'Fade',
        price: 20,
        time: 45
      },
      {
        id: 'c3',
        name: t?.step2?.haircut_options?.taper || 'Taper',
        price: 18,
        time: 40
      },
      {
        id: 'c4',
        name: t?.step2?.haircut_options?.buzz || 'Buzz Cut',
        price: 12,
        time: 20
      },
      {
        id: 'c5',
        name: t?.step2?.haircut_options?.mullet || 'Mullet',
        price: 22,
        time: 50
      },
      {
        id: 'c6',
        name: t?.step2?.haircut_options?.mohawk || 'Mohawk',
        price: 25,
        time: 55
      },
      {
        id: 'c7',
        name: t?.step2?.haircut_options?.pompadour || 'Pompadour',
        price: 22,
        time: 45
      },
      {
        id: 'c8',
        name: t?.step2?.haircut_options?.long || 'Long Hair Cut',
        price: 25,
        time: 60
      },
      {
        id: 'c9',
        name: t?.step2?.haircut_options?.topknot || 'Top Knot',
        price: 18,
        time: 35
      },
      {
        id: 'c10',
        name: t?.step2?.haircut_options?.undercut || 'Undercut',
        price: 20,
        time: 40
      }
    ],
    [t]
  )

  // 10 OPCIONES DE BARBA (b0 a b10)
  const opcionesBarba = useMemo(
    () => [
      { id: 'b0', name: t?.summary?.none || 'None', price: 0, time: 0 },
      {
        id: 'b1',
        name: t?.step2?.beard_options?.basic || 'Basic Trim',
        price: 8,
        time: 15
      },
      {
        id: 'b2',
        name: t?.step2?.beard_options?.vip || 'VIP Arrangement',
        price: 18,
        time: 30
      },
      {
        id: 'b3',
        name: t?.step2?.beard_options?.pointed || 'Pointed',
        price: 12,
        time: 20
      },
      {
        id: 'b4',
        name: t?.step2?.beard_options?.square || 'Square Point',
        price: 12,
        time: 20
      },
      {
        id: 'b5',
        name: t?.step2?.beard_options?.marked || 'Marked',
        price: 10,
        time: 15
      },
      {
        id: 'b6',
        name: t?.step2?.beard_options?.stubble || 'Stubble',
        price: 7,
        time: 10
      },
      {
        id: 'b7',
        name: t?.step2?.beard_options?.goatee || 'Goatee',
        price: 10,
        time: 20
      },
      {
        id: 'b8',
        name: t?.step2?.beard_options?.viking || 'Viking Beard',
        price: 20,
        time: 40
      },
      {
        id: 'b9',
        name: t?.step2?.beard_options?.anchor || 'Anchor Shape',
        price: 15,
        time: 25
      }
    ],
    [t]
  )

  const barbers = [
    { id: 1, name: 'José Manuel', image: '/images/barber/barber-1.webp' },
    { id: 2, name: 'Enrique Zapata', image: '/images/barber/barber-2.webp' },
    { id: 3, name: 'Felix Rossi', image: '/images/barber/barber-3.webp' },
    { id: 4, name: 'Sofia Marino', image: '/images/barber/barber-4.webp' },
    {
      id: 5,
      name: 'Alessandro Bianchi',
      image: '/images/barber/barber-5.webp'
    },
    { id: 6, name: 'Chiara Gallo', image: '/images/barber/barber-6.webp' }
  ]

  const horasDisponibles = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM'
  ]

  // GENERADOR DE DÍAS REALES (Hoy + 5 días)
  useEffect(() => {
    const days = []
    const today = new Date()
    const locale = lang === 'es' ? 'es-ES' : 'en-US'

    for (let i = 0; i < 6; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() + i)

      let label = ''
      if (i === 0) label = t.step3.today
      else if (i === 1) label = t.step3.tomorrow
      else label = d.toLocaleDateString(locale, { weekday: 'short' })

      days.push({
        id: `d${i + 1}`,
        label: label,
        date: `${d.getDate()} ${d.toLocaleDateString(locale, {
          month: 'short'
        })}`,
        fullDate: d.toLocaleDateString(locale, {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      })
    }
    setDynamicDays(days)
  }, [lang, t])

  // CÁLCULO DE RESUMEN
  const reservationData = useMemo(() => {
    const corte = opcionesCorte.find(c => c.id === formData.corteId) || {
      price: 0,
      time: 0,
      name: t?.summary?.not_selected
    }
    const barba = opcionesBarba.find(b => b.id === formData.barbaId) || {
      price: 0,
      time: 0,
      name: t?.summary?.not_selected
    }

    let total = corte.price + barba.price
    let time = corte.time + barba.time

    if (formData.cejas) {
      total += 5
      time += 10
    }
    if (formData.limpieza) {
      total += 15
      time += 20
    }
    if (formData.masaje) {
      total += 10
      time += 15
    }
    if (formData.lavado) {
      total += 5
      time += 5
    }
    if (formData.pigmentacion) {
      total += 12
      time += 25
    }

    const diaObj = dynamicDays.find(d => d.id === formData.fecha)
    const fechaTexto = diaObj
      ? `${diaObj.label} (${diaObj.date}) ${formData.hora}`
      : t?.summary?.pending

    return {
      total,
      time,
      corte: corte.name,
      barba: barba.name,
      fechaHora: fechaTexto
    }
  }, [formData, opcionesCorte, opcionesBarba, dynamicDays, t])

  const handleWhatsApp = () => {
    setIsProcessing(true)
    setTimeout(() => {
      const msg = `¡Hola Adrián! Nueva Reserva Demo:\n👤 Cliente: ${
        userData.name
      }\n📱 Tel: ${userData.phone}\n👨‍🎨 Barbero: ${
        selectedBarber.name
      }\n✂️ Corte: ${reservationData.corte}\n🧔 Barba: ${
        reservationData.barba
      }\n📅 Cita: ${
        reservationData.fechaHora
      }\n💰 Total: $${reservationData.total.toFixed(2)}`
      window.open(
        `https://wa.me/573246454061?text=${encodeURIComponent(msg)}`,
        '_blank'
      )
      setIsProcessing(false)
      setStep(5)
    }, 1500)
  }

  const SummaryRow = ({ label, value, bold = false }: any) => (
    <div className='flex justify-between py-2 border-b border-white/5 text-sm'>
      <span className='text-white/50'>{label}</span>
      <span
        className={bold ? 'text-[var(--bg-brand)] font-bold' : 'text-white'}
      >
        {value}
      </span>
    </div>
  )

  return (
    <div
      className={`mx-auto bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-6 md:p-8 transition-all duration-500 w-full ${
        step === 1 ? 'max-w-4xl' : 'max-w-6xl'
      }`}
    >
      {/* BARRA DE PROGRESO */}
      {step < 5 && (
        <div className='flex justify-between mb-10 max-w-2xl mx-auto'>
          {/* Añadimos ?. y || [] para que si el dict no llega, no se rompa la app 👇 */}
          {(t?.steps || []).map((s: string, i: number) => (
            <div key={i} className='flex flex-col items-center gap-2'>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${
                  step >= i + 1
                    ? 'bg-[var(--bg-brand)] text-black border-[var(--bg-brand)]'
                    : 'border-white/20 text-white/30'
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-[10px] uppercase font-bold tracking-tighter ${
                  step >= i + 1 ? 'text-[var(--bg-brand)]' : 'text-white/20'
                }`}
              >
                {s}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
        {/* COLUMNA DINÁMICA (DERECHA EN DESKTOP) */}
        <div
          className={
            step === 1 ? 'lg:col-span-12' : 'lg:col-span-8 order-2 lg:order-1'
          }
        >
          {/* ==== STEP 1 === */}
          {step === 1 && (
            <div className='text-center space-y-8 animate-fade-in relative px-4 md:px-12'>
              {/* CABECERA */}
              <div className='space-y-2'>
                <h3 className='text-2xl md:text-3xl font-light text-[var(--text-white-6)] uppercase tracking-[0.2em]'>
                  {t.step1.greeting.replace('{name}', userData.name)}
                </h3>
                <p className='text-[var(--text-white-5)] text-[10px] uppercase tracking-widest font-bold'>
                  {t.step1.instruction}
                </p>
              </div>

              {/* CONTENEDOR DEL SLIDER */}
              <div className='relative group'>
                {/* BOTONES DE NAVEGACIÓN (Extremidades) */}
                <div className='absolute top-1/2 -translate-y-1/2 -left-4 md:-left-10 z-20'>
                  <button
                    onClick={() =>
                      document
                        .getElementById('barber-slider')
                        ?.scrollBy({ left: -300, behavior: 'smooth' })
                    }
                    className='w-10 h-10 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-[var(--text-white-5)] hover:bg-[var(--text-white-5)] hover:text-black transition-all duration-300'
                  >
                    <span className='text-xl'>‹</span>
                  </button>
                </div>

                <div className='absolute top-1/2 -translate-y-1/2 -right-4 md:-right-10 z-20'>
                  <button
                    onClick={() =>
                      document
                        .getElementById('barber-slider')
                        ?.scrollBy({ left: 300, behavior: 'smooth' })
                    }
                    className='w-10 h-10 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-[var(--text-white-5)] hover:bg-[var(--text-white-5)] hover:text-black transition-all duration-300'
                  >
                    <span className='text-xl'>›</span>
                  </button>
                </div>

                {/* LISTA DE BARBEROS */}
                <div
                  id='barber-slider'
                  className='flex gap-4 overflow-hidden scroll-smooth snap-x snap-mandatory pb-4'
                >
                  {barbers.map(b => (
                    <motion.div
                      key={b.id}
                      onClick={() => {
                        setSelectedBarber(b)
                        setStep(2)
                      }}
                      className='min-w-[200px] md:min-w-[240px] snap-center relative aspect-[3/4] rounded-xl overflow-hidden border border-[var(--border-white-4)] hover:border-[var(--border-white-5)] transition-all duration-500 group/card cursor-pointer'
                    >
                      {/* Imagen (Sin escalado, solo cambio de color) */}
                      <Image
                        src={b.image}
                        alt={b.name}
                        fill
                        className='object-cover grayscale group-hover/card:grayscale-0 transition-all duration-700'
                      />

                      {/* Info del Barbero: Nombre más visible */}
                      <div className='absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black to-transparent'>
                        <div className='space-y-0.5'>
                          <p className='text-[var(--text-white-5)] text-[9px] font-bold uppercase tracking-[0.1em]'>
                            {t.step1.specialist}
                          </p>
                          <h4 className='text-[var(--text-white-1)] text-lg font-bold uppercase tracking-tight'>
                            {b.name}
                          </h4>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==== STEP 2 === */}
          {step === 2 && (
            <div className='space-y-8 animate-fade-in max-w-4xl mx-auto'>
              {/* HEADER SECCIÓN */}
              <div className='border-b border-white/20 pb-4'>
                <h3 className='text-2xl font-light text-[var(--text-white-6)] uppercase tracking-[0.3em]'>
                  {t.step2.title}
                </h3>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {/* 1️⃣ SELECT — TIPO DE ROSTRO */}
                <div className='space-y-2 group'>
                  <label className='text-[var(--text-white-6)] text-[10px] font-bold uppercase tracking-[0.2em] ml-1 flex items-center gap-2 transition-colors duration-300 group-focus-within:text-[var(--text-white-6)]'>
                    {t.step2.face_type}
                  </label>
                  <div className='relative'>
                    <select
                      className='w-full bg-white/[0.03] text-[var(--text-white-2)] border border-[var(--border-white-1)]/40 px-5 py-4 text-sm outline-none transition-all duration-300 ease-in-out hover:border-[var(--border-white-6)] focus:border-[var(--border-white-5)] focus:bg-white/[0.07] appearance-none cursor-pointer'
                      value={formData.tipoRostro}
                      onChange={e =>
                        setFormData({ ...formData, tipoRostro: e.target.value })
                      }
                    >
                      <option
                        value=''
                        className='bg-[#0a0a0b] text-[var(--text-white-5)]'
                      >
                        {t.step2.select}
                      </option>
                      {t.step2.face_options.map((o: any) => (
                        <option
                          key={o}
                          value={o}
                          className='bg-[#0a0a0b] text-[var(--text-white-2)]'
                        >
                          {o}
                        </option>
                      ))}
                    </select>
                    <div className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-white-5)] opacity-90'>
                      <svg
                        className='w-4 h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M19 9l-7 7-7-7'
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 2️⃣ SELECT — UTILIZAS LENTES */}
                <div className='space-y-2 group'>
                  <label className='text-[var(--text-white-6)] text-[10px] font-bold uppercase tracking-[0.2em] ml-1 flex items-center gap-2 transition-colors duration-300 group-focus-within:text-[var(--text-white-5)]'>
                    {t.step2.glasses}
                  </label>
                  <div className='relative'>
                    <select
                      className='w-full bg-white/[0.03] text-[var(--text-white-2)] border border-[var(--border-white-1)]/40 px-5 py-4 text-sm outline-none transition-all duration-300 ease-in-out hover:border-[var(--border-white-6)] focus:border-[var(--border-white-5)] focus:bg-white/[0.07] appearance-none cursor-pointer'
                      value={formData.usaLentes}
                      onChange={e =>
                        setFormData({ ...formData, usaLentes: e.target.value })
                      }
                    >
                      <option
                        value=''
                        className='bg-[#0a0a0b] text-[var(--text-white-5)]'
                      >
                        {t.step2.select}
                      </option>
                      {t.step2.yes_no.map((o: any) => (
                        <option
                          key={o}
                          value={o}
                          className='bg-[#0a0a0b] text-[var(--text-white-2)]'
                        >
                          {o}
                        </option>
                      ))}
                    </select>
                    <div className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-white-5)] opacity-90'>
                      <svg
                        className='w-4 h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M19 9l-7 7-7-7'
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 3️⃣ CORTE DE CABELLO (Dropdown Elegante) */}
                <div className='space-y-2 group'>
                  <label className='text-[var(--text-white-6)] text-[10px] font-bold uppercase tracking-[0.2em] ml-1 flex items-center gap-2 transition-colors duration-300 group-focus-within:text-[var(--text-white-5)]'>
                    {t.step2.haircut}
                  </label>
                  <div className='relative'>
                    <select
                      className={`w-full bg-white/[0.03] text-[var(--text-white-2)] border border-[var(--border-white-1)]/40 px-5 py-4 text-sm outline-none transition-all duration-300 ease-in-out hover:border-[var(--border-white-6)] focus:border-[var(--border-white-5)] focus:bg-white/[0.07] appearance-none cursor-pointer ${
                        formData.corteId
                          ? 'border-[var(--border-white-5)] text-[var(--text-white-5)] bg-[var(--text-white-5)]/5 shadow-[0_0_20px_rgba(201,163,78,0.1)]'
                          : 'border-[var(--border-white-4)] text-[var(--text-white-2)] hover:border-[var(--border-white-3)] focus:border-[var(--border-white-5)]'
                      }`}
                      value={formData.corteId}
                      onChange={e =>
                        setFormData({ ...formData, corteId: e.target.value })
                      }
                    >
                      <option
                        value=''
                        className='bg-[#0a0a0b] text-[var(--text-white-5)]'
                      >
                        {t.step2.select}
                      </option>
                      {opcionesCorte.map(c => (
                        <option
                          key={c.id}
                          value={c.id}
                          className='bg-[#0a0a0b] text-[var(--text-white-2)]'
                        >
                          {c.name} (+${c.price})
                        </option>
                      ))}
                    </select>
                    <div className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-white-5)]'>
                      <svg
                        className='w-4 h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M8 9l4-4 4 4m0 6l-4 4-4-4'
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 4️⃣ ESTILO DE BARBA (Dropdown Elegante) */}
                <div className='space-y-2 group'>
                  <label className='text-[var(--text-white-6)] text-[10px] font-bold uppercase tracking-[0.2em] ml-1 flex items-center gap-2 transition-colors duration-300 group-focus-within:text-[var(--text-white-5)]'>
                    {t.step2.beard}
                  </label>
                  <div className='relative'>
                    <select
                      className={`w-full bg-white/[0.03] text-[var(--text-white-2)] border border-[var(--border-white-1)]/40 px-5 py-4 text-sm outline-none transition-all duration-300 ease-in-out hover:border-[var(--border-white-6)] focus:border-[var(--border-white-5)] focus:bg-white/[0.07] appearance-none cursor-pointer ${
                        formData.barbaId
                          ? 'border-[var(--border-white-5)] text-[var(--text-white-5)] bg-[var(--text-white-5)]/5 shadow-[0_0_20px_rgba(201,163,78,0.1)]'
                          : 'border-[var(--border-white-4)] text-[var(--text-white-2)] hover:border-[var(--border-white-3)] focus:border-[var(--border-white-5)]'
                      }`}
                      value={formData.barbaId}
                      onChange={e =>
                        setFormData({ ...formData, barbaId: e.target.value })
                      }
                    >
                      <option
                        value=''
                        className='bg-[#0a0a0b] text-[var(--text-white-5)]'
                      >
                        {t.step2.select}
                      </option>
                      {opcionesBarba.map(b => (
                        <option
                          key={b.id}
                          value={b.id}
                          className='bg-[#0a0a0b] text-[var(--text-white-2)]'
                        >
                          {b.name} {b.price > 0 ? `(+$${b.price})` : ''}
                        </option>
                      ))}
                    </select>
                    <div className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-white-5)]'>
                      <svg
                        className='w-4 h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M8 9l4-4 4 4m0 6l-4 4-4-4'
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* NAVEGACIÓN */}
              <div className='flex justify-between items-center pt-10 border-t border-white/20'>
                <motion.button
                  whileHover={{ x: -5, color: '#ffffff' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(1)}
                  className='text-[12px] uppercase font-bold tracking-[0.2em] text-[var(--text-white-5)] transition-all flex items-center gap-2'
                >
                  <span className='text-lg text-[var(--text-white-5)]'>←</span>{' '}
                  {t.buttons.back_barber}
                </motion.button>

                <motion.button
                  whileHover={
                    formData.corteId
                      ? {
                          scale: 1.02,
                          boxShadow: '0 0 30px rgba(201, 163, 78, 0.2)'
                        }
                      : {}
                  }
                  whileTap={formData.corteId ? { scale: 0.98 } : {}}
                  onClick={() => setStep(3)}
                  disabled={!formData.corteId}
                  className={`px-10 py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 ${
                    formData.corteId
                      ? 'bg-[var(--text-white-5)] text-[var(--border-white-1)] border border-[var(--border-white-5)] shadow-xl cursor-pointer'
                      : 'bg-white/5 text-[var(--text-white-4)] border border-white/5 cursor-not-allowed opacity-30'
                  }`}
                >
                  {t.buttons.continue_date}
                </motion.button>
              </div>
            </div>
          )}

          {/* ==== STEP 3 === */}
          {step === 3 && (
            <div className='space-y-8 animate-fade-in max-w-4xl mx-auto'>
              {/* HEADER SECCIÓN */}
              <div className='border-b border-white/20 pb-4'>
                <h3 className='text-2xl font-light text-[var(--text-white-6)] uppercase tracking-[0.3em]'>
                  {t.step3.title}
                </h3>
              </div>

              {/* TEXTO DE AYUDA (TIME NOTE) */}
              <div className='-mt-4'>
                <p className='text-[10px] uppercase tracking-[0.2em] text-[var(--text-white-3)] font-medium italic'>
                  {t.step3.time_note.replace('{time}', reservationData.time)}
                </p>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-start'>
                {/* COLUMNA 1 — CALENDARIO */}
                <div className='space-y-4'>
                  <label className='text-[var(--text-white-6)] text-[10px] font-bold uppercase tracking-[0.2em] ml-1 flex items-center gap-2'>
                    <span className='w-1 h-1 bg-[var(--text-white-5)] rounded-full'></span>
                    {t.step3.days_title}
                  </label>

                  <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                    {dynamicDays.map(d => (
                      <motion.button
                        key={d.id}
                        whileHover={{
                          y: -2,
                          border: '1px solid var(--border-white-3)'
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          setFormData({ ...formData, fecha: d.id })
                        }
                        className={`p-4 rounded-xl border transition-all duration-300 ease-in-out flex flex-col items-center gap-1 group ${
                          formData.fecha === d.id
                            ? 'bg-[var(--text-white-5)] text-[var(--text-white-2)] border-[var(--border-white-5)] shadow-[0_0_25px_rgba(201,163,78,0.25)]'
                            : 'bg-white/[0.03] border-[var(--border-white-1)]/20 text-[var(--text-white-2)] hover:bg-white/[0.06]'
                        }`}
                      >
                        <span
                          className={`text-[9px] uppercase font-bold tracking-widest ${
                            formData.fecha === d.id
                              ? 'text-black'
                              : 'text-[var(--text-white-5)]'
                          }`}
                        >
                          {d.label}
                        </span>
                        <span className='text-base font-light tracking-tighter'>
                          {d.date}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* COLUMNA 2 — HORARIOS DISPONIBLES */}
                <div className='space-y-4'>
                  <label className='text-[var(--text-white-6)] text-[10px] font-bold uppercase tracking-[0.2em] ml-1 flex items-center gap-2'>
                    <span className='w-1 h-1 bg-[var(--text-white-4)] rounded-full'></span>
                    {t.step3.hours_title.replace('{date}', '')}
                  </label>

                  <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                    {horasDisponibles.map(h => (
                      <motion.button
                        key={h}
                        whileHover={{
                          backgroundColor: 'rgba(255,255,255,0.08)',
                          borderColor: 'var(--border-white-5)'
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({ ...formData, hora: h })}
                        className={`py-3 rounded-xl border text-[11px] font-bold tracking-widest transition-all duration-300 ease-in-out ${
                          formData.hora === h
                            ? 'bg-[var(--text-white-5)] text-[var(--text-white-1)] border-[var(--border-white-5)] shadow-[0_0_20px_rgba(201,163,78,0.2)]'
                            : 'bg-white/[0.03] border-[var(--border-white-1)]/20 text-[var(--text-white-2)]'
                        }`}
                      >
                        {h}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* NAVEGACIÓN */}
              <div className='flex justify-between items-center pt-10 border-t border-white/20'>
                <motion.button
                  whileHover={{ x: -5, color: '#ffffff' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(2)}
                  className='text-[12px] uppercase font-bold tracking-[0.2em] text-[var(--text-white-5)] transition-all flex items-center gap-2'
                >
                  {/* Se eliminó el span con la flecha manual para usar solo la del diccionario o viceversa */}
                  {t.buttons.back_services}
                </motion.button>

                <motion.button
                  whileHover={
                    formData.fecha && formData.hora
                      ? {
                          scale: 1.02,
                          boxShadow: '0 0 30px rgba(201, 163, 78, 0.2)'
                        }
                      : {}
                  }
                  whileTap={
                    formData.fecha && formData.hora ? { scale: 0.98 } : {}
                  }
                  onClick={() => setStep(4)}
                  disabled={!formData.fecha || !formData.hora}
                  className={`px-10 py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 ${
                    formData.fecha && formData.hora
                      ? 'bg-[var(--text-white-5)] text-[var(--text-white-1)] border border-[var(--border-white-5)] shadow-xl cursor-pointer'
                      : 'bg-white/5 text-[var(--text-white-3)] border border-white/5 cursor-not-allowed opacity-30'
                  }`}
                >
                  {t.buttons.go_payment}
                </motion.button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className='space-y-8 animate-fade-in max-w-4xl mx-auto'>
              {/* HEADER SECCIÓN */}
              <div className='border-b border-white/20 pb-4'>
                <h3 className='text-2xl font-light text-[var(--text-white-6)] uppercase tracking-[0.3em]'>
                  {t.step4.title}
                </h3>
              </div>

              {/* LISTA DE MÉTODOS DE PAGO */}
              <div className='grid grid-cols-1 gap-4'>
                {['Visa / Mastercard', 'Zelle / Transfer', 'Apple Pay'].map(
                  m => (
                    <motion.button
                      key={m}
                      whileHover={{
                        x: 5,
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        borderColor: 'var(--border-white-3)'
                      }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() =>
                        setFormData({ ...formData, metodoPago: m })
                      }
                      className={`p-6 border rounded-xl text-left flex justify-between items-center transition-all duration-300 ease-in-out ${
                        formData.metodoPago === m
                          ? 'bg-[var(--text-white-5)]/10 border-[var(--border-white-5)] text-[var(--text-white-6)] shadow-[0_0_20px_rgba(201,163,78,0.1)]'
                          : 'bg-white/[0.03] border-[var(--border-white-1)]/20 text-[var(--text-white-2)]'
                      }`}
                    >
                      <span className='font-bold uppercase tracking-[0.15em] text-xs'>
                        {m}
                      </span>
                      {formData.metodoPago === m && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className='text-[var(--text-white-5)] text-lg'
                        >
                          ●
                        </motion.span>
                      )}
                    </motion.button>
                  )
                )}
              </div>

              {/* NAVEGACIÓN INFERIOR */}
              <div className='flex justify-between items-center pt-10 border-t border-white/20'>
                <motion.button
                  whileHover={{ x: -5, color: '#ffffff' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(3)}
                  className='text-[12px] uppercase font-bold tracking-[0.2em] text-[var(--text-white-5)] transition-all flex items-center gap-2'
                >
                  {t.buttons.back_date}
                </motion.button>

                <motion.button
                  whileHover={
                    formData.metodoPago && !isProcessing
                      ? {
                          scale: 1.05,
                          boxShadow: '0 10px 30px rgba(34, 197, 94, 0.3)'
                        }
                      : {}
                  }
                  whileTap={
                    formData.metodoPago && !isProcessing ? { scale: 0.95 } : {}
                  }
                  onClick={handleWhatsApp}
                  disabled={!formData.metodoPago || isProcessing}
                  className={`px-10 py-5 font-black text-[11px] rounded-xl uppercase tracking-[0.2em] transition-all duration-300 ${
                    formData.metodoPago && !isProcessing
                      ? 'bg-green-500 text-white shadow-xl cursor-pointer'
                      : 'bg-white/5 text-[var(--text-white-3)] border border-white/5 cursor-not-allowed opacity-30'
                  }`}
                >
                  {isProcessing ? (
                    <div className='flex items-center gap-3'>
                      <div className='w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin' />
                      {t.buttons.processing}
                    </div>
                  ) : (
                    `${t.buttons.pay_confirm} $${reservationData.total.toFixed(
                      2
                    )}`
                  )}
                </motion.button>
              </div>
            </div>
          )}

          {/* ==== STEP 5 === */}
          {step === 5 && (
            <div className='lg:col-span-12 flex flex-col items-center justify-center text-center space-y-12 py-16 animate-fade-in max-w-2xl mx-auto w-full'>
              {/* ICONO DE CONFIRMACIÓN VIP */}
              <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className='relative'
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                    type: 'spring',
                    stiffness: 200
                  }}
                  className='w-24 h-24 bg-green-500 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg'
                >
                  <span className='text-white text-4xl font-light'>✓</span>
                </motion.div>
              </motion.div>

              {/* TÍTULO COHERENTE */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className='space-y-6'
              >
                <h3 className='text-3xl font-light text-[var(--text-white-6)] uppercase tracking-[0.3em] leading-tight'>
                  {t.step5.title}
                </h3>

                {/* TEXTO EXPLICATIVO */}
                <p className='text-[var(--text-white-2)] text-sm max-w-sm mx-auto leading-relaxed'>
                  {t.step5.instruction}
                </p>
              </motion.div>

              {/* BOTÓN REINICIAR VIP */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className='pt-4'
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.reload()}
                  className='bg-[var(--text-white-5)] text-black border border-[var(--border-white-5)] px-12 py-5 font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300 ease-in-out shadow-xl'
                >
                  {t.step5.restart}
                </motion.button>
              </motion.div>
            </div>
          )}
        </div>

        {/* === RESUMEN, BARBERO, TRABAJO A REALIZAR Y PRECIO === */}
        {step > 1 && step < 5 && (
          <div className='lg:col-span-4 order-1 lg:order-2 space-y-4'>
            <div className='bg-white/5 rounded-xl p-6 border border-white/40 sticky top-24'>
              <div className='flex items-center gap-4 mb-6'>
                <div className='relative w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--bg-brand)]'>
                  <Image
                    src={selectedBarber.image}
                    alt={selectedBarber.name}
                    fill
                    className='object-cover'
                  />
                </div>
                <div>
                  <p className='text-[10px] uppercase text-[var(--text-white-6)] font-light'>
                    {t.summary.barber}
                  </p>
                  <p className='font-bold text-[var(--text-white-5)]'>
                    {selectedBarber.name}
                  </p>
                </div>
              </div>
              <div className='space-y-1'>
                <SummaryRow
                  label={t.summary.corte}
                  value={reservationData.corte}
                />
                <SummaryRow
                  label={t.summary.barba}
                  value={reservationData.barba}
                />
                <SummaryRow
                  label={t.summary.date_time}
                  value={reservationData.fechaHora}
                />
                <div className='pt-4 mt-4 border-t border-white/20'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm font-bold text-[var(--text-white-5)]'>
                      {t.summary.total_pay}
                    </span>
                    <span className='text-2xl font-black text-[var(--bg-brand)]'>
                      ${reservationData.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
