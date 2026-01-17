"use client";

import React from "react";

/* =====================================================
   PageHero
   - Hero reutilizable para páginas internas
   - Full width real (100vw)
   - Altura fija inicial (400px)
   - Preparado para imagen o color
   ===================================================== */

type PageHeroProps = {
  title: string;
  subtitle?: string;
};

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    /* =====================================================
       Hero — Wrapper estructural
       - Patrón 100vw sin overflow lateral
       ===================================================== */
    <section
      className="
        relative
        left-1/2 right-1/2
        -ml-[50vw] -mr-[50vw]
        w-screen
        h-[300px]
        overflow-hidden
      "
    >
      {/* =====================================================
         Fondo del Hero
         - Por ahora color neutro
         - Luego puede ser imagen
         ===================================================== */}
      <div className="absolute inset-0 bg-neutral-900" />

      {/* =====================================================
         Contenido
         ===================================================== */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-5xl mx-auto px-5 space-y-4">
          {/* =========================
             Título (H1 único)
             ========================= */}
          <h1 className="text-3xl md:text-4xl font-bold">
            {title}
          </h1>

          {/* =========================
             Subtítulo (opcional)
             ========================= */}
          {subtitle && (
            <p className="max-w-2xl text-lg opacity-90">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
