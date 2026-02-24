"use client";

import React from "react";
import Image from "next/image";

/* =====================================================
   PageHero
   - Hero reutilizable para páginas internas
   - Full Width nativo
   - Adaptable a cualquier tema mediante variables CSS
   ===================================================== */

type PageHeroProps = {
  title: string;
  subtitle?: string;
  image?: string;
};

export default function PageHero({ title, subtitle, image }: PageHeroProps) {
  return (
    <section
      className="
        relative
        w-full
        min-h-[350px] md:h-[450px]
        flex items-center justify-center
        overflow-hidden
        /* Fondo por defecto usando variables del sistema */
        bg-[var(--bg-tertiary)]
        transition-colors duration-300 my-0
      "
    >
      {/* =====================================================
          CAPA 1: FONDO (Imagen + Overlay)
          ===================================================== */}
      {image && (
        <>
          <Image
            src={image}
            alt={title}
            fill
            priority
            className="object-cover z-0"
            sizes="100vw"
          />
          
          {/* OVERLAY ADAPTATIVO
              Mezclamos el fondo primario con opacidad para asegurar 
              la legibilidad del texto sobre cualquier imagen.
          */}
          <div 
            className="
              absolute inset-0 z-10 
              transition-colors duration-300 
              bg-[var(--bg-primary)]/80 
              backdrop-blur-[2px]
            " 
          />
        </>
      )}

      {/* =====================================================
          CAPA 2: CONTENIDO (Limitado a 1200px para alineación)
          ===================================================== */}
      <div className="relative z-20 w-full max-w-[1200px] mx-auto px-6 text-center md:text-left py-16">
        
        {/* TITULO 
            Usamos text-[var(--text-primary)] para máxima visibilidad
        */}
        <h1>
          {title}
        </h1>

        {/* SUBTITULO 
            Usamos text-[var(--text-secondary)] para jerarquía visual
        */}
        {subtitle && (
          <p className="
            max-w-3xl 
            text-lg md:text-xl 
            leading-relaxed 
            text-[var(--text-secondary)] 
            transition-colors duration-300
            font-medium
          ">
            {subtitle}
          </p>
        )}
      </div>

      {/* Decoración inferior sutil (opcional: línea de división) */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 z-20" />
    </section>
  );
}