"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

interface GlassCTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  disclaimer?: string;
  className?: string;
}

export default function GlassCTA({
  title,
  description,
  buttonText,
  buttonHref,
  disclaimer,
  className = "",
}: GlassCTAProps) {
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

  // Seguridad para el link
  const safeHref = buttonHref || "#";

  return (
    <section 
      className={`
        w-full py-12 md:py-24 px-4 md:px-0 my-0
        flex items-center justify-center
        /* RESTAURADO: Esta clase activa la animación de colores del fondo */
        animate-gradient-bg
        ${className}
      `}
    >
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
      >
        {/* Spotlight Effect (Luz que sigue al mouse) */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.15), transparent 40%)`,
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 md:py-20 space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight max-w-3xl drop-shadow-sm">
            {title}
          </h2>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
            {description}
          </p>

          <div className="pt-6 flex flex-col items-center space-y-4">
            <Link
              href={safeHref}
              className="
                group relative inline-flex items-center justify-center px-8 py-4 
                text-lg font-bold rounded-full overflow-hidden shadow-lg
                transition-all duration-300 ease-in-out
                
                bg-white text-[var(--brand-primary)]
                hover:bg-[var(--brand-secondary)] hover:text-white
                
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

            {disclaimer && (
              <p className="text-sm text-white/80 font-medium opacity-80">
                {disclaimer}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}