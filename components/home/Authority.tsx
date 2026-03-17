'use client'

import React, { useState, useEffect } from 'react'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
   Authority Section
   - Sección de autoridad con efecto Parallax
   - PROTOCOLO ALSNIPPETS: Carga asíncrona de diccionario
   ===================================================== */

export default function Authority ({ lang }: { lang: string }) {
  const [dict, setDict] = useState<any>(null)

  useEffect(() => {
    getDictionary(lang as 'es' | 'en').then(d => setDict(d.home_authority))
  }, [lang])

  if (!dict) return null // Blindaje contra CLS

  return (
    <section
      className="
        relative w-full
        /* Padding vertical generoso */
        py-32 md:py-48
        
        /* Configuración del Fondo */
        bg-center bg-cover bg-no-repeat
        
        /* Parallax: Scroll normal en móvil, Fixed en desktop */
        bg-scroll md:bg-fixed
        
        /* Imágenes Responsivas (Blindaje Visual) */
        bg-[url('/images/home/trabajo-directo-sin-intermediarios-home-mobile.webp')]
        md:bg-[url('/images/home/trabajo-directo-sin-intermediarios-home-desktop.webp')]
      "
    >
      {/* OVERLAY DE SEGURIDAD */}
      <div className='absolute inset-0 bg-black/40 z-0' />

      <div className='relative z-10 w-full max-w-6xl mx-auto px-6'>
        <div className='max-w-3xl mx-auto text-center'>
          {/* TÍTULO DINÁMICO */}
          <h2 className='text-4xl md:text-5xl lg:text-6xl mb-8 text-white tracking-tight font-bold'>
            {dict.title}
          </h2>

          {/* TEXTO DINÁMICO */}
          <div className='space-y-6 text-lg md:text-xl text-white/90 font-light leading-relaxed'>
            {dict.paragraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}