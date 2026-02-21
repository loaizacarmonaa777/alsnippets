"use client";

import { Moon, Sun, Sparkles } from "lucide-react";

/* =====================================================
   TopBar — Desktop only (VERSIÓN CORREGIDA)
   ===================================================== */

export default function TopBar() {
  return (
    <div className="hidden md:block relative z-40 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 h-10 flex items-center justify-between">

        {/* =====================================================
            TEXTO PROMOCIONAL (MARQUEE)
           ===================================================== */}
        <div className="relative flex-1 overflow-hidden pr-12 mask-linear-fade">
          
          <div className="flex w-max animate-marquee whitespace-nowrap text-xs font-medium text-[var(--text-muted)] tracking-wide">
            <span className="mr-8">
              En marzo las auditorías son gratuitas · En marzo las auditorías son gratuitas · En marzo las auditorías son gratuitas ·
            </span>
            <span className="mr-8">
              En marzo las auditorías son gratuitas · En marzo las auditorías son gratuitas · En marzo las auditorías son gratuitas ·
            </span>
          </div>

          {/* Fades laterales para suavizar el texto */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-[40px] bg-gradient-to-r from-[var(--bg-secondary)] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-[40px] bg-gradient-to-l from-[var(--bg-secondary)] to-transparent" />
        </div>

        {/* =====================================================
            ACCIONES DERECHA
           ===================================================== */}
        <div className="flex items-center gap-4 pl-6">
          
          {/* Selector de Idioma */}
          <button
            className="
              text-xs font-bold px-2 py-1 rounded
              text-[var(--text-primary)]
              hover:bg-[var(--brand-primary-hover)]
              hover:text-[var(--brand-primary)]
              transition-colors duration-200
            "
          >
            ES
          </button>

          {/* Separador vertical */}
          <div className="w-px h-4 bg-[var(--border-subtle)]" />

          {/* Botones de Tema */}
          <div className="flex items-center gap-1">
            
            {/* Theme: Dark */}
            <button
              className="button-topbar"
              aria-label="Modo oscuro"
            >
              <Moon size={15} strokeWidth={2} />
            </button>

            {/* Theme: Light */}
            <button
              className="button-topbar"
              aria-label="Modo claro"
            >
              <Sun size={15} strokeWidth={2} />
            </button>

            {/* Theme: Custom */}
            <button
              className="button-topbar"
              aria-label="Modo personalizado"
            >
              <Sparkles size={15} strokeWidth={2} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}