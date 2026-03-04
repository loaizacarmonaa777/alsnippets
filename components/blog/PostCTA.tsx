"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

type PostCTAProps = {
  category: string;
};

export default function PostCTA({ category }: PostCTAProps) {
  /* =====================================================
     1. Lógica del Mouse para el efecto Spotlight
     ===================================================== */
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

  /* =====================================================
     2. Textos dinámicos según la categoría
     ===================================================== */
  const normalizedCategory = category.toLowerCase();

  let title = "¿Hablamos de tu sitio web?";
  let description = "Si quieres saber en qué estado está tu sitio y qué vale la pena mejorar, puedo ayudarte.";
  let buttonText = "Contactar ahora";
  let safeHref = "/contacto";

  if (normalizedCategory.includes("seguridad") || normalizedCategory.includes("virus")) {
    title = "Auditoría de seguridad WordPress";
    description = "Detecta vulnerabilidades, archivos infectados y configuraciones inseguras antes de que se conviertan en un problema mayor.";
    buttonText = "Solicitar auditoría";
    safeHref = "/auditoria";
  }

  if (normalizedCategory.includes("seo") || normalizedCategory.includes("geo") || normalizedCategory.includes("marketing")) {
    title = "Consultoría SEO y GEO";
    description = "Analizamos tu sitio desde la perspectiva de Google y los LLMs para mejorar visibilidad, contexto y autoridad.";
    buttonText = "Solicitar consultoría";
    safeHref = "/auditoria";
  }

  if (normalizedCategory.includes("optimizacion") || normalizedCategory.includes("rendimiento")) {
    title = "Auditoría de rendimiento (WPO)";
    description = "Identifica cuellos de botella, problemas de carga y configuraciones que afectan la experiencia de tus usuarios.";
    buttonText = "Optimizar mi web";
    safeHref = "/auditoria";
  }

  /* =====================================================
     3. Render (Efectos exactos solicitados + Gradiente)
     ===================================================== */
  return (
    <section className="w-full py-8 md:py-12 my-0 flex items-center justify-center">
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="
          relative w-full max-w-5xl mx-auto 
          rounded-3xl overflow-hidden shadow-2xl
          
          /* EFECTO VIDRIO */
          bg-white/10 dark:bg-black/20
          backdrop-blur-md
          border border-white/20
          
          transition-all duration-300
        "
        /* FONDO GRADIENTE (Aplicado en el contenedor redondeado) */
        style={{ background: 'var(--bg-hero-gradient)' }}
      >
        {/* Spotlight Effect (Luz que sigue al mouse) */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0"
          style={{
            opacity,
            /* Usamos tu dorado corporativo para la luz del mouse */
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(201, 163, 78, 0.15), transparent 40%)`,
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 md:py-20 space-y-8">
          
          {/* Ajusté a text-[var(--text-primary)] para garantizar que contraste sobre el gradiente claro/oscuro */}
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight max-w-3xl drop-shadow-sm !my-0">
            {title}
          </h2>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed font-medium">
            {description}
          </p>

          <div className="pt-6 flex flex-col items-center space-y-4">
            <Link
              href={safeHref}
              className="
                group relative inline-flex items-center justify-center px-8 py-4 
                text-lg font-bold rounded-full overflow-hidden shadow-lg
                transition-all duration-300 ease-in-out
                
                bg-[var(--brand-primary)] text-[var(--bg-primary)]
                hover:bg-[var(--text-yellow2)] hover:text-[var(--bg-primary)]
                
                hover:-translate-y-1 hover:shadow-xl
              "
            >
              <span className="relative z-10 mr-2">
                {buttonText}
              </span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}