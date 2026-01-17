"use client";

import { Moon, Sun, Sparkles } from "lucide-react";

/* =====================================================
   TopBar — Desktop only (VERSIÓN ESTABLE)
   ===================================================== */

export default function TopBar() {
  return (
    <div className="block relative z-40 bg-[var(--bg-secondary)] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 h-10 md:h-12 flex items-center justify-between">

        {/* =====================================================
            TEXTO PROMOCIONAL (MARQUEE)
           ===================================================== */}
        <div className="relative flex-1 overflow-hidden pr-12">
          <div className="flex w-max animate-marquee whitespace-nowrap text-sm text-[var(--text-muted)]">
            <span className="mr-8">
              En febrero las auditorías son gratuitas · En febrero las auditorías son gratuitas · En febrero las auditorías son gratuitas ·
            </span>
            <span className="mr-8">
              En febrero las auditorías son gratuitas · En febrero las auditorías son gratuitas · En febrero las auditorías son gratuitas ·
            </span>
          </div>

          {/* Fade izquierdo */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-[80px] bg-gradient-to-r from-[var(--bg-secondary)] to-transparent" />

          {/* Fade derecho */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-[80px] bg-gradient-to-l from-[var(--bg-secondary)] to-transparent" />
        </div>

        {/* =====================================================
            ACCIONES DERECHA
           ===================================================== */}

        <div className="hidden md:flex items-center gap-3 pl-6">
          <div className="flex items-center gap-3 pl-6">

            {/* Idioma */}
            <button
              className="
              svg-border-btn
              relative
              w-9 h-9
              rounded-full

              bg-[var(--brand-primary)]
              text-black
              text-xs font-semibold
              
              flex items-center justify-center

              transition-all duration-300 ease-out
              hover:bg-[var(--brand-primary-hover)]
              hover:-translate-y-0.5
            "
            >
              ES

              {/* Línea inferior animada */}
              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <circle cx="50" cy="50" r="48" className="bg-line" />
                <circle cx="50" cy="50" r="48" className="hl-line" />
              </svg>
            </button>

            {/* === Theme: Dark === */}
            <button
              className="
              svg-border-btn
              relative
              w-9 h-9

              flex items-center justify-center
              text-[var(--text-primary)]

              transition-all duration-300 ease-out
              hover:bg-[var(--brand-primary-hover)]
              hover:-translate-y-0.5
            "
              aria-label="Modo oscuro"
            >

              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <rect x="1" y="1" width="98" height="98" className="bg-line" />
                <rect x="1" y="1" width="98" height="98" className="hl-line" />
              </svg>

              <span className="icon-wrapper">
                <Moon size={10} strokeWidth={1} />
              </span>

            </button>

            {/* Theme: Light */}
            <button
              className="
              svg-border-btn
              relative
              w-9 h-9

              flex items-center justify-center
              text-[var(--text-primary)]

              transition-all duration-300 ease-out
              hover:bg-[var(--brand-primary-hover)]
              hover:-translate-y-0.5
            "
              aria-label="Modo claro"
            >

              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <rect x="1" y="1" width="98" height="98" className="bg-line" />
                <rect x="1" y="1" width="98" height="98" className="hl-line" />
              </svg>

              <span className="icon-wrapper">
                <Sun size={10} strokeWidth={1} />
              </span>

            </button>

            {/* Theme: Custom */}
            <button
              className="
              svg-border-btn
              relative
              w-9 h-9

              flex items-center justify-center
              text-[var(--text-primary)]

              transition-all duration-300 ease-out
              hover:bg-[var(--brand-primary-hover)]
              hover:-translate-y-0.5
            "
              aria-label="Modo personalizado"
            >

              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <rect x="1" y="1" width="98" height="98" className="bg-line" />
                <rect x="1" y="1" width="98" height="98" className="hl-line" />
              </svg>

              <span className="icon-wrapper">
                <Sparkles size={10} strokeWidth={1} />
              </span>

            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
