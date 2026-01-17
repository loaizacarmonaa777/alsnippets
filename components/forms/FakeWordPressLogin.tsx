"use client";

import { useState, useRef, useEffect } from "react";

/* =====================================================
   FakeWordPressLogin
   ===================================================== */

export default function FakeWordPressLogin() {
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [blink, setBlink] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  /* =========================
     Click fuera → cerrar alerta
     ========================= */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowAlert(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFocus = () => {
    setShowAlert(true);
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
    setBlink(true);

    setTimeout(() => {
      setBlink(false);
    }, 300);
  };

  return (
    <div ref={wrapperRef} className="space-y-4">

      {/* =========================
         Logo WordPress
         ========================= */}
      <div
        className={`
          flex justify-center
          transition-transform duration-300
          ${showAlert ? "-translate-y-2" : "translate-y-0"}
        `}
      >
        <img
          src="/logos/stack/01-wordpress.svg"
          alt="WordPress"
          className="
            h-10
            sm:h-12
            md:h-14
            w-auto
            opacity-90
          "
        />
      </div>

      {/* =========================
         Alerta informativa (animada)
         ========================= */}
      <div
        className={`
          border-l-4 border-red-500 bg-red-50 p-3 text-sm
          alert-transition
          ${showAlert ? "alert-visible" : "alert-hidden"}
        `}
      >
        <strong>Accesos necesarios.</strong>{" "}
        Para poder realizar modificaciones reales en tu sitio,
        necesito los accesos correctos.
        <br />
        La seguridad y protección de tu información
        siempre están de tu lado.
      </div>

      {/* =========================
         Usuario / Email
         ========================= */}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Nombre de usuario o correo electrónico
        </label>
        <input
          type="text"
          onFocus={handleFocus}
          className="
            w-full
            rounded-lg
            border
            px-3 py-2
            text-sm
            transition
            focus:outline-none
          "
        />
      </div>

      {/* =========================
         Contraseña
         ========================= */}
      <div className="space-y-1 relative">
        <label
          className="text-sm font-medium cursor-pointer"
          onClick={handleFocus}
        >
          Contraseña
        </label>

        <input
          type={showPassword ? "text" : "password"}
          onFocus={handleFocus}
          className="
            w-full
            rounded-lg
            border
            px-3 py-2
            text-sm
            pr-10
            transition
            focus:outline-none
          "
        />

        {/* Ojo animado */}
        <button
          type="button"
          onClick={togglePassword}
          className="
            absolute
            right-3 top-8
            text-gray-500
            hover:text-gray-700
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`w-5 h-5 ${blink ? "eye-blink" : ""}`}
          >
            {showPassword ? (
              <>
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                <circle cx="12" cy="12" r="3" />
              </>
            ) : (
              <>
                <path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a21.8 21.8 0 015.11-5.81" />
                <path d="M1 1l22 22" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* =========================
         Recordarme
         ========================= */}
      <div className="flex items-center gap-2 text-sm">
        <input type="checkbox" />
        <span>Necesito accesos</span>
      </div>

      {/* =========================
         Botón visual
         ========================= */}
      <button
        type="button"
        className="
          w-full
          rounded-lg
          border
          px-4 py-2
          text-sm font-medium
          opacity-70
          cursor-not-allowed
        "
      >
        Acceder
      </button>

      {/* =========================
         Link inferior
         ========================= */}
      <div className="text-center text-sm mt-2">
        <a href="/contacto" className="underline">
          ← Contactar al cliente para que te dé el acceso
        </a>
      </div>
    </div>
  );
}
