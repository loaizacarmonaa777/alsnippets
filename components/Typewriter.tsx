'use client'

import { useEffect, useState } from 'react'

/* =====================================================
   Typewriter Component
   - Efecto de escritura por caracteres
   - PROTOCOLO ALSNIPPETS: Blindaje de lógica y estilo
   ===================================================== */

type Props = {
  text: string
  speed?: number
}

export default function Typewriter ({ text, speed = 50 }: Props) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    // 1. Resetear el texto al cambiar la prop (vital para el cambio de idioma)
    let index = 0
    setDisplayedText('')

    const interval = setInterval(() => {
      // 2. Verificación de seguridad para evitar 'undefined' (Lógica Sensible)
      if (index < text.length) {
        setDisplayedText(prev => prev + text.charAt(index))
        index++
      } else {
        clearInterval(interval)
      }
    }, speed)

    // 3. Limpieza: si el usuario cambia de idioma a mitad de la animación,
    // el intervalo anterior se destruye inmediatamente.
    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <span className='font-mono'>
      {displayedText}
      {/* Cursor parpadeante estilo terminal (Blindaje Visual) */}
      <span className='animate-pulse ml-1 text-[var(--text-brand)]'>▋</span>
    </span>
  )
}