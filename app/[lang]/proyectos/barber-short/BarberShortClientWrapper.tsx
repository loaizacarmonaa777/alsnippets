'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import FormDemoBarberShort from '@/components/forms/FormDemoBarberShort'
import WizardBarberShort from '@/components/ui/WizardBarberShort'

export default function BarberShortClientWrapper({ 
  lang, 
  dict 
}: { 
  lang: string; 
  dict: any 
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState({ name: '', phone: '' })

  const handleLoginSuccess = (name: string, phone: string) => {
    setUserData({ name, phone })
    setIsLoggedIn(true)
  }

  // =====================================================
  // 1. DICCIONARIO SENSIBLE DEL FORMULARIO
  // =====================================================
  const formDict = {
    es: {
      head: "Acceso Demo",
      sub: "Barber Short",
      placeholders: {
        label_name: "Nombre completo",
        ph_name: "Ej: Adrián Loaiza",
        label_phone: "Teléfono",
        ph_phone: "300 000 0000",
        label_pass: "Contraseña",
        ph_pass: "Escribe la contraseña...",
        hint_pass: "Usa: barbershort"
      },
      validation: {
        err_name: "Ingresa nombre y apellido",
        err_conn: "Error de servidor",
        err_net: "Error de red",
        processing: "Validando..."
      },
      legales: { terms: "Acepto los términos y condiciones" },
      buttons: { enter: "Ingresar", forgot: "¿Olvidaste algo?", login: "Login" },
      whatsapp: { help_msg: "Hola Adrián, necesito ayuda con la demo." }
    },
    en: {
      head: "Demo Access",
      sub: "Barber Short",
      placeholders: {
        label_name: "Full Name",
        ph_name: "Ex: Adrian Loaiza",
        label_phone: "Phone",
        ph_phone: "000 000 0000",
        label_pass: "Password",
        ph_pass: "Enter password...",
        hint_pass: "Use: barbershort"
      },
      validation: {
        err_name: "Enter first and last name",
        err_conn: "Server error",
        err_net: "Network error",
        processing: "Processing..."
      },
      legales: { terms: "I accept terms and conditions" },
      buttons: { enter: "Enter Demo", forgot: "Forgot something?", login: "Login" },
      whatsapp: { help_msg: "Hi Adrian, I need help accessing the demo." }
    }
  }[lang as 'es' | 'en'] || {};

  // =====================================================
  // 2. DICCIONARIO SENSIBLE DEL WIZARD (Completo para .map)
  // =====================================================
  const wizardDict = {
    es: {
      steps: ["Barbero", "Servicios", "Cita", "Pago"],
      step1: {
        greeting: "¡Hola, {name}!",
        instruction: "Selecciona tu barbero favorito",
        specialist: "Barbero Especialista"
      },
      step2: {
        title: "Servicios",
        face_type: "Tipo de Rostro",
        glasses: "¿Utilizas Lentes?",
        haircut: "Corte de Cabello",
        beard: "Estilo de Barba",
        select: "Seleccionar...",
        face_options: ["Ovalado", "Cuadrado", "Redondo", "Diamante", "Corazón"],
        yes_no: ["Sí", "No"],
        haircut_options: {
          classic: "Clásico", fade: "Fade", taper: "Taper", buzz: "Buzz Cut",
          mullet: "Mullet", mohawk: "Mohawk", pompadour: "Pompadour",
          long: "Corte Largo", topknot: "Top Knot", undercut: "Undercut"
        },
        beard_options: {
          basic: "Perfilado Básico", vip: "Arreglo VIP", pointed: "Puntiaguda",
          square: "Cuadrada", marked: "Marcada", stubble: "Sombreada",
          goatee: "Candado", viking: "Vikinga", anchor: "Ancla"
        }
      },
      step3: {
        title: "Tu Cita",
        time_note: "Tiempo estimado: {time} min",
        days_title: "Días Disponibles",
        hours_title: "Horarios para {date}",
        today: "Hoy",
        tomorrow: "Mañana"
      },
      step4: { title: "Método de Pago" },
      step5: {
        title: "¡Reserva Exitosa!",
        instruction: "Tu barbero ha sido notificado y te espera en la fecha seleccionada.",
        restart: "Nueva Reserva"
      },
      summary: {
        barber: "Barbero",
        corte: "Corte seleccionado",
        barba: "Servicio de barba",
        date_time: "Fecha y hora",
        total_pay: "Total a pagar",
        not_selected: "No seleccionado",
        pending: "Pendiente",
        none: "Ninguno"
      },
      buttons: {
        back_barber: "Volver a Barberos",
        continue_date: "Continuar a Fecha",
        back_services: "Volver a Servicios",
        go_payment: "Ir al Pago",
        back_date: "Volver a Fecha",
        pay_confirm: "Confirmar y Pagar",
        processing: "Procesando..."
      }
    },
    en: {
      steps: ["Barber", "Services", "Date", "Payment"],
      step1: {
        greeting: "Hi, {name}!",
        instruction: "Select your favorite barber",
        specialist: "Specialist Barber"
      },
      step2: {
        title: "Services",
        face_type: "Face Shape",
        glasses: "Do you wear glasses?",
        haircut: "Haircut Style",
        beard: "Beard Style",
        select: "Select...",
        face_options: ["Oval", "Square", "Round", "Diamond", "Heart"],
        yes_no: ["Yes", "No"],
        haircut_options: {
          classic: "Classic", fade: "Fade", taper: "Taper", buzz: "Buzz Cut",
          mullet: "Mullet", mohawk: "Mohawk", pompadour: "Pompadour",
          long: "Long Hair", topknot: "Top Knot", undercut: "Undercut"
        },
        beard_options: {
          basic: "Basic Trim", vip: "VIP Grooming", pointed: "Pointed",
          square: "Square", marked: "Marked", stubble: "Stubble",
          goatee: "Goatee", viking: "Viking", anchor: "Anchor"
        }
      },
      step3: {
        title: "Your Date",
        time_note: "Estimated time: {time} min",
        days_title: "Available Days",
        hours_title: "Hours for {date}",
        today: "Today",
        tomorrow: "Tomorrow"
      },
      step4: { title: "Payment Method" },
      step5: {
        title: "Booking Successful!",
        instruction: "Your barber has been notified and is waiting for you.",
        restart: "New Booking"
      },
      summary: {
        barber: "Barber",
        corte: "Selected Cut",
        barba: "Beard service",
        date_time: "Date & Time",
        total_pay: "Total to pay",
        not_selected: "Not selected",
        pending: "Pending",
        none: "None"
      },
      buttons: {
        back_barber: "Back to Barbers",
        continue_date: "Continue to Date",
        back_services: "Back to Services",
        go_payment: "Go to Payment",
        back_date: "Back to Date",
        pay_confirm: "Confirm & Pay",
        processing: "Processing..."
      }
    }
  }[lang as 'es' | 'en'] || {};

  const tPage = dict?.page || {};
  const tMeta = dict?.meta || {};

  return (
    <main
      className='w-full min-h-screen flex flex-col items-center pt-40 pb-24 transition-all duration-500 bg-cover bg-center bg-fixed'
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('/images/barber/barber-short-background.webp')",
        backgroundColor: '#0f172a'
      }}
    >
      <div className='w-full max-w-[1200px] mx-auto px-5'>
        {!isLoggedIn && (
          <section className='text-center space-y-6 mb-12 flex flex-col items-center animate-fade-in-up'>
            <div className='relative w-64 h-28 md:w-80 md:h-36 mb-2 drop-shadow-xl'>
              <Image
                src='/images/barber/logo-barber-short-blanco.png'
                alt={tMeta?.og_alt || 'Logo'}
                fill
                className='object-contain'
                priority
              />
            </div>
            <h2 className='text-white text-4xl md:text-5xl lg:text-6xl font-bold !my-0'>
              {tPage?.hero?.title}
            </h2>
            <p className='text-white/90 text-lg md:text-xl max-w-3xl mx-auto'>
              {tPage?.hero?.subtitle}
            </p>
          </section>
        )}

        {!isLoggedIn ? (
          <FormDemoBarberShort
            onLoginSuccess={handleLoginSuccess}
            lang={lang}
            dict={formDict} 
          />
        ) : (
          <div className='animate-fade-in'>
            <WizardBarberShort
              userData={userData}
              lang={lang}
              dict={wizardDict} 
            />
          </div>
        )}
      </div>
    </main>
  )
}