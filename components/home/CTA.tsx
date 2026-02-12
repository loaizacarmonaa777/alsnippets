"use client"; // Necesario para usar hooks (useState, useRef)

import React, { useRef, useState } from "react";
import Link from "next/link";

export default function CTA() {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  // Función para rastrear el mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <section className="w-full py-12 px-4 md:px-0 mb-12">
      {/* CONTENEDOR PRINCIPAL
        - relative: Para posicionar el efecto de luz dentro
        - overflow-hidden: Para que la luz no se salga de los bordes redondeados
        - Adapta colores al tema (Light: bg-neutral-100 / Dark: bg-neutral-900)
      */}
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="
          relative w-full max-w-[1200px] mx-auto 
          rounded-3xl overflow-hidden shadow-2xl
          bg-neutral-100 dark:bg-neutral-900
          border border-neutral-200 dark:border-neutral-800
          transition-colors duration-300
        "
      >
        {/* =========================================================
            EFECTO SPOTLIGHT (Luz Dorada)
            Este div sigue al mouse y crea el gradiente
           ========================================================= */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 215, 0, 0.15), transparent 40%)`,
          }}
        />
        
        {/* En Light Mode, usamos un dorado un poco más oscuro (ámbar) para que se vea sobre blanco */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 dark:opacity-0 transition-opacity duration-300"
          style={{
            opacity, // Solo visible en light mode si el padre no tiene la clase dark (manejado por CSS global o lógica de tema)
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(217, 119, 6, 0.1), transparent 40%)`,
          }}
        />

        {/* =========================
            Decoración de Fondo (Estática)
            ========================= */}
        {/* Destellos sutiles para dar profundidad (Menos intensos en Light Mode) */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-[var(--brand-primary)] opacity-10 dark:opacity-20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-600 opacity-10 dark:opacity-20 blur-[80px] rounded-full pointer-events-none"></div>

        {/* =========================
            Contenido (Z-index superior para estar sobre la luz)
            ========================= */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 md:py-24 space-y-8">
          
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight max-w-3xl">
            Auditoría WordPress Profesional
          </h2>

          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Reviso tu sitio WordPress, detecto errores, problemas de seguridad,
            rendimiento y malas prácticas, y te entrego un diagnóstico claro
            con los pasos a seguir.
          </p>

          {/* CTA Button */}
          <div className="pt-4 flex flex-col items-center space-y-4">
            <Link
              href="/auditoria"
              className="
                group relative inline-flex items-center justify-center px-8 py-4 
                text-lg font-bold rounded-full overflow-hidden
                transition-all duration-300 ease-in-out
                
                /* ESTADO NORMAL (Light / Dark) */
                bg-neutral-900 text-white 
                dark:bg-white dark:text-neutral-900
                
                /* ESTADO HOVER (Unificado con tus variables) */
                hover:bg-[var(--text-yellow2)] 
                hover:text-[var(--text-primary)]
                
                /* ANIMACIÓN DE SUBIDA */
                hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]
                dark:hover:shadow-[0_0_30px_rgba(255,215,0,0.4)]
              "
            >
              {/* === EFECTO DE BRILLO QUE CRUZA (SHINE) === */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

              {/* TEXTO */}
              <span className="relative z-10">Solicitar auditoría</span>
              
              {/* FLECHA ANIMADA */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="relative z-10 w-5 h-5 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-2"
              >
                <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </Link>

            <p className="text-sm text-neutral-500 dark:text-neutral-400 opacity-80">
              Sin compromiso. Sin tecnicismos innecesarios.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}