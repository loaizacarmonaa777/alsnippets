'use client'

import React, { useState } from 'react'
import Image from 'next/image' // <-- Añadimos el import de Image
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
          <section className="text-center space-y-6 mb-12 flex flex-col items-center animate-fade-in-up">
            
            {/* =====================================================
                LOGO DE BARBER SHORT
                ===================================================== */}
            <div className="relative w-64 h-28 md:w-80 md:h-36 mb-2 drop-shadow-xl">
              <Image 
                src="/images/barber/logo-barber-short-blanco.png" 
                alt="Logo Barber Short" 
                fill
                className="object-contain"
                priority // Carga prioritaria porque está en el primer pantallazo (Above the fold)
              />
            </div>

            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold !my-0">
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
          <div className="animate-fade-in">
            <WizardBarberShort userData={userData} />
          </div>
        )}

      </div>
    </main>
  )
}