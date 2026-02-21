'use client'

import { useState, useRef, useEffect } from 'react'

export default function FakeWordPressLogin() {
  const [showAlert, setShowAlert] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [blink, setBlink] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)

  /* Click fuera → cerrar alerta */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowAlert(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () =>
      document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleFocus = () => {
    setShowAlert(true)
    setBlink(true)

    setTimeout(() => {
      setBlink(false)
    }, 250)
  }

  const togglePassword = () => {
    setShowPassword(prev => !prev)
    setBlink(true)

    setTimeout(() => {
      setBlink(false)
    }, 250)
  }

  return (
    <div className="flex items-center justify-center px-4">
      <div ref={wrapperRef} className="w-full max-w-sm">

        {/* Logo */}
        <div
          className={`text-center mb-6 transition-transform duration-300 ${
            showAlert ? '-translate-y-2' : ''
          }`}
        >
          <img
            src="/logos/stack/01-wordpress.svg"
            alt="WordPress"
            className="h-20 mx-auto opacity-90"
          />
        </div>

        {/* Alerta estilo WP */}
        <div
          className={`
            overflow-hidden
            transition-all duration-300
            ${showAlert ? 'max-h-40 opacity-100 mb-4' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="border-l-4 border-red-600 bg-white p-3 text-sm shadow-sm">
            <strong>Accesos necesarios.</strong> Para poder realizar modificaciones
            reales en tu sitio, necesito los accesos correctos.
            <br />
            La seguridad y protección de tu información siempre están de tu lado.
          </div>
        </div>

        {/* Caja login estilo WP */}
        <div className="bg-white p-6 shadow-md border border-gray-300 space-y-4">

          {/* Usuario */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nombre de usuario o correo electrónico
            </label>
            <input
              type="text"
              onFocus={handleFocus}
              className="
                w-full
                border border-gray-300
                rounded-sm
                px-3 py-2
                text-sm
                focus:border-[#2271b1]
                focus:ring-1
                focus:ring-[#2271b1]
                outline-none
              "
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Contraseña
            </label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                onFocus={handleFocus}
                className="
                  w-full
                  border border-gray-300
                  rounded-sm
                  px-3 py-2
                  text-sm
                  pr-10
                  focus:border-[#2271b1]
                  focus:ring-1
                  focus:ring-[#2271b1]
                  outline-none
                "
              />

              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
              >
                <span
                  className={`inline-block transition-transform duration-150 ${
                    blink ? 'scale-y-0' : 'scale-y-100'
                  }`}
                >
                  👁
                </span>
              </button>
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2 text-sm">
            <input type="checkbox" />
            <span>Necesito accesos</span>
          </div>

          {/* Botón WP */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleFocus}
              className="
                inline-flex
                items-center
                justify-center
                rounded-sm
                bg-[#2271b1]
                border border-[#2271b1]
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition-colors
                duration-150
                hover:bg-[#135e96]
                hover:border-[#135e96]
                active:bg-[#0a4b78]
                active:border-[#0a4b78]
                focus:outline-none
                focus:ring-2
                focus:ring-[#2271b1]
              "
            >
              Acceder
            </button>
          </div>
        </div>

        {/* Links inferiores */}
        <div className="mt-4 text-sm text-center space-y-2">
          <div>
            <a href="#" className="text-[#2271b1] hover:underline">
              ¿No le haz dado la contraseña a Adrián?
            </a>
          </div>

          <div>
            <a
              href="/contacto"
              className="text-[#2271b1] hover:underline"
            >
              ← Ir a contacto para enviarle la contraseña
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
