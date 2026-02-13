"use client";

import React from "react";
import Image from "next/image";

/* =====================================================
   PageHero
   - Hero reutilizable para páginas internas
   - Full Width (100vw)
   - Lógica de Temas:
     * Light: Overlay Blanco + Texto Oscuro
     * Dark: Overlay Negro + Texto Blanco
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
        left-1/2 right-1/2
        -ml-[50vw] -mr-[50vw]
        w-screen
        min-h-[350px] md:h-[400px]
        overflow-hidden
        flex items-center justify-center
      "
    >
      {/* =====================================================
          CAPA 1: FONDO (Background)
          ===================================================== */}
      {image ? (
        <>
          {/* IMAGEN DE FONDO */}
          <Image
            src={image}
            alt={title}
            fill
            priority
            className="object-cover z-0"
            sizes="100vw"
          />
          
          {/* OVERLAY ADAPTATIVO (La magia ocurre aquí)
              - bg-white/90: En modo Light, capa blanca muy opaca (90%) para que el texto negro se lea.
              - dark:bg-neutral-900/80: En modo Dark, capa negra para que el texto blanco se lea.
          */}
          <div className="absolute inset-0 z-0 transition-colors duration-300 bg-white/90 dark:bg-neutral-900/80" />
        </>
      ) : (
        /* FALLBACK SIN IMAGEN */
        <div className="absolute inset-0 z-0 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300" />
      )}

      {/* =====================================================
          CAPA 2: CONTENIDO
          ===================================================== */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 space-y-5 text-center md:text-left py-12 md:py-0">
        
        {/* TITULO 
            Siempre respeta el tema:
            - Light: Oscuro (neutral-900)
            - Dark: Blanco (white)
        */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-neutral-900 dark:text-white transition-colors duration-300">
          {title}
        </h1>

        {/* SUBTITULO 
            - Light: Gris medio (neutral-600)
            - Dark: Gris claro (neutral-300)
        */}
        {subtitle && (
          <p className="max-w-2xl text-lg md:text-xl leading-relaxed font-light text-neutral-600 dark:text-neutral-300 transition-colors duration-300">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}