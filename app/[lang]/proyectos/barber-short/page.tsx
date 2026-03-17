'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import FormDemoBarberShort from '@/components/forms/FormDemoBarberShort'
import WizardBarberShort from '@/components/ui/WizardBarberShort'
import { getDictionary } from '@/i18n/get-dictionary'

export default function BarberShortPage ({
  params
}: {
  params: { lang: string }
}) {
  const lang = params.lang
  const [dict, setDict] = useState<any>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState({ name: '', phone: '' })

  // Carga del diccionario en el cliente
  useEffect(() => {
    getDictionary(lang as 'es' | 'en').then(setDict)
  }, [lang])

  if (!dict) return null // Evita parpadeo mientras carga el JSON

  const t = dict.proyecto_barber.page// Carga el archivo .json de traducción
  const metadata = dict.proyecto_barber.meta

  const handleLoginSuccess = (name: string, phone: string) => {
    setUserData({ name, phone })
    setIsLoggedIn(true)
  }

  return (
    <main
      className='w-full min-h-screen flex flex-col items-center pt-40 pb-24 transition-all duration-500 bg-cover bg-center bg-fixed'
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('/images/barber/barber-short-background.webp')",
        backgroundColor: '#0f172a'
      }}
    >
      <div className='w-full max-w-[1200px] mx-auto px-5'>
        {!isLoggedIn && (
          <section className='text-center space-y-6 mb-12 flex flex-col items-center animate-fade-in-up'>
            <div className='relative w-64 h-28 md:w-80 md:h-36 mb-2 drop-shadow-xl'>
              <Image
                src='/images/barber/logo-barber-short-blanco.png'
                alt={metadata.og_alt}
                fill
                className='object-contain'
                priority
              />
            </div>
            <h2 className='text-white text-4xl md:text-5xl lg:text-6xl font-bold !my-0'>
              {t.hero.title}
            </h2>
            <p className='text-white/90 text-lg md:text-xl max-w-3xl mx-auto'>
              {t.hero.subtitle}
            </p>
          </section>
        )}

        {!isLoggedIn ? (
          <FormDemoBarberShort
            onLoginSuccess={handleLoginSuccess}
            lang={lang}
            dict={dict.form_barber}
          />
        ) : (
          <div className='animate-fade-in'>
            <WizardBarberShort
              userData={userData}
              lang={lang}
              dict={dict.wizard_barber_short}
            />
          </div>
        )}
      </div>
    </main>
  )
}
