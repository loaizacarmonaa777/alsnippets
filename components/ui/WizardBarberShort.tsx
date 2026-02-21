'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface WizardProps {
  userData: { name: string; phone: string }
}

// ==========================================================
// BASE DE DATOS SIMULADA
// ==========================================================
const opcionesCorte = [
  { id: '', name: 'Selecciona un corte...', price: 0, time: 0 },
  { id: 'c1', name: 'Corte Clásico', price: 15, time: 30 },
  { id: 'c2', name: 'Fade / Degradado', price: 20, time: 45 },
  { id: 'c3', name: 'Taper Fade', price: 18, time: 40 },
  { id: 'c4', name: 'Buzz Cut (Rapado)', price: 12, time: 20 },
]

const opcionesBarba = [
  { id: '', name: 'Selecciona opción de barba...', price: 0, time: 0 },
  { id: 'b0', name: 'Sin barba / No aplica', price: 0, time: 0 },
  { id: 'b1', name: 'Perfilado básico', price: 5, time: 10 },
  { id: 'b2', name: 'Arreglo VIP (Toalla caliente)', price: 15, time: 25 },
]

const diasDisponibles = [
  { id: 'd1', label: 'Hoy', date: '15 Nov' },
  { id: 'd2', label: 'Mañana', date: '16 Nov' },
  { id: 'd3', label: 'Jueves', date: '17 Nov' },
  { id: 'd4', label: 'Viernes', date: '18 Nov' },
  { id: 'd5', label: 'Sábado', date: '19 Nov' },
]

const horasDisponibles = [
  '09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM', 
  '02:00 PM', '02:45 PM', '03:30 PM', '04:15 PM', '05:00 PM'
]

export default function WizardBarberShort({ userData }: WizardProps) {
  const [step, setStep] = useState(1)
  const [selectedBarber, setSelectedBarber] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false) // Para simular la carga del pago

  // ESTADO DEL FORMULARIO
  const [formData, setFormData] = useState({
    tipoRostro: '',
    usaLentes: '',
    corteId: '',
    barbaId: '',
    cejas: false,
    limpieza: false,
    masaje: false,
    fecha: '',
    hora: '',
    metodoPago: '', // Nuevo campo para el método de pago
  })

  // ESTADO DEL RESUMEN
  const [reservationData, setReservationData] = useState({
    tipoRostro: 'Sin seleccionar',
    usaLentes: 'Sin seleccionar',
    corte: 'Sin seleccionar',
    barba: 'Sin seleccionar',
    cejas: 'No',
    limpieza: 'No',
    masaje: 'No',
    fechaHora: 'Pendiente',
    total: 0,
    tiempo: 0,
  })

  // EFECTO PARA CALCULAR TOTALES Y RESUMEN
  useEffect(() => {
    const corteSeleccionado = opcionesCorte.find(c => c.id === formData.corteId) || opcionesCorte[0]
    const barbaSeleccionada = opcionesBarba.find(b => b.id === formData.barbaId) || opcionesBarba[0]

    let totalCalculado = corteSeleccionado.price + barbaSeleccionada.price
    let tiempoCalculado = corteSeleccionado.time + barbaSeleccionada.time

    if (formData.cejas) { totalCalculado += 5; tiempoCalculado += 10 }
    if (formData.limpieza) { totalCalculado += 15; tiempoCalculado += 20 }
    if (formData.masaje) { totalCalculado += 10; tiempoCalculado += 15 }

    let fechaHoraTexto = 'Pendiente'
    if (formData.fecha && formData.hora) {
      const diaSeleccionado = diasDisponibles.find(d => d.id === formData.fecha)
      fechaHoraTexto = `${diaSeleccionado?.label} (${diaSeleccionado?.date}) a las ${formData.hora}`
    }

    setReservationData({
      tipoRostro: formData.tipoRostro || 'Sin seleccionar',
      usaLentes: formData.usaLentes || 'Sin seleccionar',
      corte: corteSeleccionado.id ? corteSeleccionado.name : 'Sin seleccionar',
      barba: barbaSeleccionada.id ? barbaSeleccionada.name : 'Sin seleccionar',
      cejas: formData.cejas ? 'Sí' : 'No',
      limpieza: formData.limpieza ? 'Sí' : 'No',
      masaje: formData.masaje ? 'Sí' : 'No',
      fechaHora: fechaHoraTexto,
      total: totalCalculado,
      tiempo: tiempoCalculado,
    })
  }, [formData])

  const barbers = [
    { id: 1, name: 'José Manuel', image: '/images/barber/barber-1.webp' },
    { id: 2, name: 'Enrique Zapata', image: '/images/barber/barber-2.webp' },
    { id: 3, name: 'Felix Rossi', image: '/images/barber/barber-3.webp' },
    { id: 4, name: 'Sofia Marino', image: '/images/barber/barber-4.webp' },
    { id: 5, name: 'Alessandro Bianchi', image: '/images/barber/barber-5.webp' },
    { id: 6, name: 'Chiara Gallo', image: '/images/barber/barber-6.webp' },
  ]

  const progressSteps = ['Barbero', 'Servicios', 'Fecha y Hora', 'Confirmación']

  const handleSelectBarber = (barber: any) => {
    setSelectedBarber(barber)
    setStep(2)
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const toggleExtra = (extraName: 'cejas' | 'limpieza' | 'masaje') => {
    setFormData(prev => ({ ...prev, [extraName]: !prev[extraName] }))
  }

  const selectDate = (id: string) => setFormData(prev => ({ ...prev, fecha: id, hora: '' }))
  const selectTime = (time: string) => setFormData(prev => ({ ...prev, hora: time }))
  const selectPaymentMethod = (method: string) => setFormData(prev => ({ ...prev, metodoPago: method }))

  // ==========================================================
  // FUNCIÓN ESTRELLA: ENVIAR A WHATSAPP
  // ==========================================================
  const handlePaymentAndWhatsApp = () => {
    setIsProcessing(true) // Activa estado de "cargando"
    
    // Simula una pequeña espera bancaria de 1.5 segundos
    setTimeout(() => {
      // 1. Construir el mensaje
      const mensaje = `¡Hola Adrián! Acabo de probar la demo de *Barber Short*. 💈✂️

Aquí están los detalles de la reserva simulada que acabo de pagar:
👤 *Cliente:* ${userData.name}
📱 *Teléfono:* ${userData.phone}
👨‍🎨 *Barbero elegido:* ${selectedBarber.name}
📅 *Fecha y Hora:* ${reservationData.fechaHora}

*Servicios Seleccionados:*
- Corte: ${reservationData.corte}
- Barba: ${reservationData.barba}
- Extras: Cejas (${reservationData.cejas}), Limpieza Facial (${reservationData.limpieza}), Masaje Capilar (${reservationData.masaje})

💰 *Total Pagado:* $${reservationData.total.toFixed(2)}
💳 *Método de pago:* ${formData.metodoPago}

Ya tienes mi contacto. ¿Empezamos a crear tu barbería online personalizada basada en Barber Short?🚀`;

      // 2. Codificar la URL
      const whatsappUrl = `https://wa.me/573246454061?text=${encodeURIComponent(mensaje)}`;
      
      // 3. Abrir WhatsApp en una nueva pestaña
      window.open(whatsappUrl, '_blank');
      
      // 4. Pasar al paso de "Éxito"
      setIsProcessing(false)
      setStep(5)
    }, 1500)
  }

  const SummaryRow = ({ label, value, highlight = false }: { label: string, value: string | number, highlight?: boolean }) => (
    <div className="flex justify-between items-start gap-4 text-sm py-1 border-b border-white/5 last:border-0">
      <span className="text-white/60">{label}:</span>
      <span className={`text-right font-medium ${value === 'Sin seleccionar' || value === 'No' || value === 'Pendiente' ? 'text-white/30 italic' : highlight ? 'text-[var(--brand-primary)]' : 'text-white'}`}>
        {value}
      </span>
    </div>
  )

  return (
    <div 
      className={`
        mx-auto bg-white/10 dark:bg-black/20 backdrop-blur-xl 
        border border-white/20 shadow-2xl rounded-3xl p-6 md:p-8 
        transition-all duration-700 ease-in-out w-full
        ${step === 1 ? 'max-w-4xl' : 'max-w-6xl'}
      `}
    >
      {/* BARRA DE PROGRESO */}
      {step < 5 && (
        <div className="mb-10 w-full max-w-2xl mx-auto">
          <div className="flex justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/20 -z-10 -translate-y-1/2 rounded-full"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-[var(--brand-primary)] -z-10 -translate-y-1/2 rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / (progressSteps.length - 1)) * 100}%` }}
            ></div>
            {progressSteps.map((label, index) => {
              const stepNumber = index + 1;
              const isActive = step >= stepNumber;
              return (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg transition-colors ${isActive ? 'bg-[var(--brand-primary)] text-white' : 'bg-white/30 text-white/50 border border-white/20'}`}>
                    {stepNumber}
                  </div>
                  <span className={`hidden md:block text-xs md:text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-white/50'}`}>
                    {label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ==================== PASO 1 ==================== */}
      {step === 1 && (
        <div className="animate-fade-in text-center space-y-8">
          <div className="space-y-2 mb-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
              ¡Hola, {userData.name}!
            </h3>
            <p className="text-lg md:text-xl text-white/90">Elige quién te hará el corte hoy:</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {barbers.map((barber) => (
              <div 
                key={barber.id}
                onClick={() => handleSelectBarber(barber)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg transition-all duration-300 aspect-[2/3] border-2 border-white/10 hover:border-[var(--brand-primary)] hover:-translate-y-2"
              >
                <Image src={barber.image} alt={barber.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw"/>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300"></div>
                <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-center h-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-white font-bold text-lg text-center drop-shadow-lg">{barber.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== PASO 2, 3, 4 y 5 ==================== */}
      {step >= 2 && selectedBarber && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
          
          {/* --- COLUMNA IZQUIERDA: RESUMEN FIJO --- */}
          <div className="lg:col-span-4 bg-black/40 rounded-3xl p-6 border border-white/10 flex flex-col items-center relative shadow-inner h-fit sticky top-24">
            <div className="w-full text-left mb-6">
              <span className="text-[var(--brand-primary)] text-xs font-bold uppercase tracking-wider">Cliente</span>
              <p className="text-white font-bold text-xl drop-shadow-sm">{userData.name}</p>
            </div>
            <div className="flex flex-col items-center mb-6">
              <h3 className="text-lg font-bold text-white mb-3 text-center">
                Barbero: <span className="text-[var(--brand-primary)]">{selectedBarber.name}</span>
              </h3>
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-[var(--brand-primary)] shadow-lg">
                <Image src={selectedBarber.image} alt={selectedBarber.name} fill className="object-cover"/>
              </div>
            </div>

            <div className="w-full bg-white/5 rounded-2xl p-4 space-y-2 border border-white/10 mb-6 flex-grow">
              <SummaryRow label="Corte" value={reservationData.corte} />
              <SummaryRow label="Barba" value={reservationData.barba} />
              <SummaryRow label="Cejas" value={reservationData.cejas} />
              <SummaryRow label="Limpieza" value={reservationData.limpieza} />
              <SummaryRow label="Masaje" value={reservationData.masaje} />
              <div className="pt-2 mt-2 border-t border-white/20">
                <SummaryRow label="Fecha/Hora" value={reservationData.fechaHora} highlight={true} />
              </div>
              {formData.metodoPago && (
                <div className="pt-2 mt-2 border-t border-white/20">
                  <SummaryRow label="Pago via" value={formData.metodoPago} />
                </div>
              )}
            </div>

            <div className="w-full bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/30 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between items-center text-white/90">
                <span className="font-medium">Tiempo total:</span>
                <span className="font-bold text-white">{reservationData.tiempo} min</span>
              </div>
              <div className="flex justify-between items-center text-xl">
                <span className="font-bold text-white">Total a pagar:</span>
                <span className="font-bold text-[var(--brand-primary)]">${reservationData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* --- COLUMNA DERECHA: DINÁMICA --- */}
          <div className="lg:col-span-8 bg-black/20 rounded-3xl p-6 md:p-8 border border-white/10 flex flex-col text-white min-h-[500px]">
            
            {/* PASO 2: SERVICIOS */}
            {step === 2 && (
              <div className="animate-fade-in flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-6 text-[var(--brand-primary)]">1. Configura tu estilo</h3>
                <div className="space-y-6 flex-grow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm text-white/80 ml-1">Tipo de Rostro</label>
                      <select name="tipoRostro" value={formData.tipoRostro} onChange={handleChange} className="w-full bg-black/50 border border-white/20 text-white rounded-xl px-4 py-3 outline-none focus:border-[var(--brand-primary)]">
                        <option value="" className="text-black">Seleccionar...</option>
                        <option value="Ovalado" className="text-black">Ovalado</option>
                        <option value="Cuadrado" className="text-black">Cuadrado</option>
                        <option value="Redondo" className="text-black">Redondo</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm text-white/80 ml-1">¿Utilizas lentes?</label>
                      <select name="usaLentes" value={formData.usaLentes} onChange={handleChange} className="w-full bg-black/50 border border-white/20 text-white rounded-xl px-4 py-3 outline-none focus:border-[var(--brand-primary)]">
                        <option value="" className="text-black">Seleccionar...</option>
                        <option value="Sí" className="text-black">Sí</option>
                        <option value="No" className="text-black">No</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm text-white/80 ml-1">Corte de Cabello</label>
                    <select name="corteId" value={formData.corteId} onChange={handleChange} className="w-full bg-black/50 border border-white/20 text-white rounded-xl px-4 py-3 outline-none focus:border-[var(--brand-primary)]">
                      {opcionesCorte.map(c => <option key={c.id} value={c.id} className="text-black">{c.name} {c.price > 0 ? `(+$${c.price})` : ''}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm text-white/80 ml-1">Estilo de Barba</label>
                    <select name="barbaId" value={formData.barbaId} onChange={handleChange} className="w-full bg-black/50 border border-white/20 text-white rounded-xl px-4 py-3 outline-none focus:border-[var(--brand-primary)]">
                      {opcionesBarba.map(b => <option key={b.id} value={b.id} className="text-black">{b.name} {b.price > 0 ? `(+$${b.price})` : ''}</option>)}
                    </select>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <label className="text-sm text-white/80 ml-1 block mb-3">Servicios Extra</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div onClick={() => toggleExtra('cejas')} className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all ${formData.cejas ? 'bg-[var(--brand-primary)]/20 border-[var(--brand-primary)]' : 'bg-black/30 border-white/10 hover:border-white/30'}`}>
                        <span className="font-semibold text-sm">Cejas</span><span className="text-xs opacity-70">+$5</span>
                      </div>
                      <div onClick={() => toggleExtra('limpieza')} className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all ${formData.limpieza ? 'bg-[var(--brand-primary)]/20 border-[var(--brand-primary)]' : 'bg-black/30 border-white/10 hover:border-white/30'}`}>
                        <span className="font-semibold text-sm">Limpieza Facial</span><span className="text-xs opacity-70">+$15</span>
                      </div>
                      <div onClick={() => toggleExtra('masaje')} className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all ${formData.masaje ? 'bg-[var(--brand-primary)]/20 border-[var(--brand-primary)]' : 'bg-black/30 border-white/10 hover:border-white/30'}`}>
                        <span className="font-semibold text-sm">Masaje Capilar</span><span className="text-xs opacity-70">+$10</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10">
                  <button onClick={() => setStep(1)} className="text-white/60 hover:text-white transition-colors text-sm underline">Volver a barbero</button>
                  <button onClick={() => setStep(3)} disabled={!formData.corteId} className={`px-8 py-3 w-full sm:w-auto rounded-xl font-bold transition-all ${formData.corteId ? 'bg-[var(--brand-primary)] text-white hover:-translate-y-1 shadow-lg' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}>Continuar a Fecha →</button>
                </div>
              </div>
            )}

            {/* PASO 3: FECHA Y HORA */}
            {step === 3 && (
              <div className="animate-fade-in flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-2 text-[var(--brand-primary)]">2. Elige Fecha y Hora</h3>
                <p className="text-sm text-white/70 mb-8">Basado en el tiempo de {reservationData.tiempo} min requeridos para tus servicios.</p>
                
                <div className="space-y-8 flex-grow">
                  <div>
                    <h4 className="font-semibold mb-3 text-white">Días disponibles</h4>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {diasDisponibles.map(dia => (
                        <div 
                          key={dia.id}
                          onClick={() => selectDate(dia.id)}
                          className={`min-w-[80px] cursor-pointer border rounded-xl p-3 flex flex-col items-center text-center transition-all flex-shrink-0 ${formData.fecha === dia.id ? 'bg-[var(--brand-primary)] border-[var(--brand-primary)] text-white shadow-lg' : 'bg-black/30 border-white/10 hover:border-white/30'}`}
                        >
                          <span className="text-xs uppercase opacity-80">{dia.label}</span>
                          <span className="font-bold text-sm mt-1">{dia.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`transition-all duration-500 ${formData.fecha ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                    <h4 className="font-semibold mb-3 text-white">Horas disponibles {formData.fecha && `para el ${diasDisponibles.find(d => d.id === formData.fecha)?.date}`}</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {horasDisponibles.map(hora => (
                        <button
                          key={hora}
                          onClick={() => selectTime(hora)}
                          className={`py-3 rounded-xl border text-sm font-medium transition-all ${formData.hora === hora ? 'bg-[var(--brand-primary)]/20 border-[var(--brand-primary)] text-[var(--brand-primary)] shadow-[0_0_10px_rgba(255,215,0,0.2)]' : 'bg-black/30 border-white/10 hover:border-white/30'}`}
                        >
                          {hora}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10">
                  <button onClick={() => setStep(2)} className="text-white/60 hover:text-white transition-colors text-sm underline">← Volver a servicios</button>
                  <button onClick={() => setStep(4)} disabled={!formData.fecha || !formData.hora} className={`px-8 py-3 w-full sm:w-auto rounded-xl font-bold transition-all ${formData.fecha && formData.hora ? 'bg-[var(--brand-primary)] text-white hover:-translate-y-1 shadow-lg' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}>Ir a Pago →</button>
                </div>
              </div>
            )}

            {/* PASO 4: CONFIRMACIÓN Y CHECKOUT SIMULADO */}
            {step === 4 && (
              <div className="animate-fade-in flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-2 text-[var(--brand-primary)]">3. Método de Pago</h3>
                <p className="text-white/70 mb-8">Selecciona cómo deseas simular tu pago para completar la demostración.</p>
                
                <div className="space-y-4 flex-grow">
                  {/* Opción Tarjeta */}
                  <div 
                    onClick={() => selectPaymentMethod('Tarjeta de Crédito / Débito')}
                    className={`p-5 rounded-2xl border cursor-pointer flex items-center gap-4 transition-all ${formData.metodoPago === 'Tarjeta de Crédito / Débito' ? 'bg-[var(--brand-primary)]/10 border-[var(--brand-primary)]' : 'bg-black/30 border-white/10 hover:border-white/30'}`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.metodoPago === 'Tarjeta de Crédito / Débito' ? 'border-[var(--brand-primary)]' : 'border-white/30'}`}>
                      {formData.metodoPago === 'Tarjeta de Crédito / Débito' && <div className="w-3 h-3 bg-[var(--brand-primary)] rounded-full"></div>}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white">Tarjeta de Crédito o Débito</h4>
                      <p className="text-sm text-white/50">Visa, Mastercard, Amex</p>
                    </div>
                  </div>

                  {/* Opción Transferencia */}
                  <div 
                    onClick={() => selectPaymentMethod('Transferencia / Zelle')}
                    className={`p-5 rounded-2xl border cursor-pointer flex items-center gap-4 transition-all ${formData.metodoPago === 'Transferencia / Zelle' ? 'bg-[var(--brand-primary)]/10 border-[var(--brand-primary)]' : 'bg-black/30 border-white/10 hover:border-white/30'}`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.metodoPago === 'Transferencia / Zelle' ? 'border-[var(--brand-primary)]' : 'border-white/30'}`}>
                      {formData.metodoPago === 'Transferencia / Zelle' && <div className="w-3 h-3 bg-[var(--brand-primary)] rounded-full"></div>}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white">Transferencia Bancaria o Zelle</h4>
                      <p className="text-sm text-white/50">Pago manual directo</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10">
                  <button onClick={() => setStep(3)} className="text-white/60 hover:text-white transition-colors text-sm underline">← Modificar Fecha</button>
                  <button 
                    onClick={handlePaymentAndWhatsApp} 
                    disabled={!formData.metodoPago || isProcessing}
                    className={`px-8 py-3 w-full sm:w-auto rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${!formData.metodoPago ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white hover:-translate-y-1 shadow-[0_0_15px_rgba(34,197,94,0.4)]'}`}
                  >
                    {isProcessing ? (
                      <span className="animate-pulse">Procesando...</span>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        Pagar y Confirmar ${reservationData.total.toFixed(2)}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* PASO 5: ÉXITO (Muestra después de redirigir a WA) */}
            {step === 5 && (
              <div className="animate-fade-in flex flex-col items-center justify-center h-full text-center space-y-6">
                <div className="w-20 h-20 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-3xl font-bold text-white">¡Demo Completada!</h3>
                <p className="text-white/80 max-w-sm mx-auto text-lg leading-relaxed">
                  El pago simulado se ha procesado con éxito. Se ha abierto una pestaña en WhatsApp para enviar los detalles de esta reserva.
                </p>
                <div className="p-4 bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/30 rounded-xl max-w-sm mt-4">
                  <p className="text-[var(--brand-primary)] font-medium text-sm">
                    Revisa tu WhatsApp y envíame el mensaje automático para que empecemos a crear el sistema para tu negocio.
                  </p>
                </div>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-8 text-sm text-white/50 hover:text-white underline transition-colors"
                >
                  Reiniciar Demo
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  )
}