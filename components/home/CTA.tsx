"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

export default function CTA() {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    // SECCIÓN CONTENEDORA (Fondo Animado)
    // - my-0: Elimina márgenes externos
    // - py-32: Aumenta la altura del fondo coloreado (Más aire arriba/abajo)
    // - animate-gradient-bg: Tu animación de colores
    <section className="w-full my-0 py-32 px-4 md:px-0 animate-gradient-bg flex items-center justify-center">
      
      {/* TARJETA DE CRISTAL (Glassmorphism) */}
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="
          relative w-full max-w-5xl mx-auto 
          rounded-3xl overflow-hidden shadow-2xl
          
          /* EFECTO CRISTAL (Blanco Transparente) */
          bg-white/10 
          backdrop-blur-md
          
          /* BORDE BLANCO ELEGANTE */
          border border-white/20
          
          transition-all duration-300
        "
      >
        {/* =========================
            LUZ INTERACTIVA (Spotlight)
            ========================= */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
          style={{
            opacity,
            // Luz blanca/dorada suave que sigue al mouse
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.3), transparent 40%)`,
          }}
        />

        {/* =========================
            CONTENIDO
            ========================= */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 md:py-20 space-y-8">
          
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight max-w-3xl drop-shadow-sm">
            Auditoría WordPress Profesional
          </h2>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
            Reviso tu sitio WordPress, detecto errores, problemas de seguridad,
            rendimiento y malas prácticas, y te entrego un diagnóstico claro.
          </p>

          <div className="pt-6 flex flex-col items-center space-y-4">
            <Link
              href="/auditoria#form"
              className="
                group relative inline-flex items-center justify-center px-8 py-4 
                text-lg font-bold rounded-full overflow-hidden shadow-lg
                transition-all duration-300 ease-in-out
                
                /* Botón Blanco Sólido */
                bg-white text-[var(--brand-primary)]
                
                /* Hover: Invertir colores o efecto marca */
                hover:bg-[var(--brand-primary)] hover:text-white
                hover:-translate-y-1 hover:shadow-xl
              "
            >
              {/* Brillo en el botón */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
              
              <span className="relative z-10 mr-2">Solicitar auditoría</span>
              
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </Link>

            <p className="text-sm text-white/80 font-medium">
              Sin compromiso. Sin historias raras.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}