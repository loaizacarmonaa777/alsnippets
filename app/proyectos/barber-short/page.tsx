'use client'

import React, { useState } from 'react'
import FormDemoBarberShort from '@/components/forms/FormDemoBarberShort' 
import WizardBarberShort from '@/components/ui/WizardBarberShort' 

export default function BarberShortPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState({ name: '', phone: '' })

  const handleLoginSuccess = (name: string, phone: string) => {
    setUserData({ name, phone })
    setIsLoggedIn(true)
  }

  return (
    <main 
      /* Usamos linear-gradient para oscurecer el fondo sin usar capas absolutas que rompan tu Header/Footer */
      className="w-full min-h-screen flex flex-col items-center pt-32 pb-24 transition-all duration-500 bg-cover bg-center bg-fixed"
      style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/barber/barber-short-background.webp')",
        backgroundColor: "#0f172a" // Un azul oscuro por si la imagen tarda en cargar
      }}
    >
      
      <div className="w-full max-w-[1200px] mx-auto px-5">
        
        {/* CABECERA */}
        {!isLoggedIn && (
          <section className="text-center space-y-6 mb-12">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
              Barber Short Demo
            </h2>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
              En esta demo, podrás realizar una reserva, elegir tu barbero favorito, añadir más servicios y separar tu cita.
            </p>
          </section>
        )}

        {/* LÓGICA: FORMULARIO VS WIZARD */}
        {!isLoggedIn ? (
          <FormDemoBarberShort onLoginSuccess={handleLoginSuccess} />
        ) : (
          <WizardBarberShort userData={userData} />
        )}

      </div>
    </main>
  )
}