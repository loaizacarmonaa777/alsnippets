'use client'

import React from "react";
import PageHero from "@/components/hero/PageHero";
import HorizontalCard from "@/components/ui/HorizontalCard";
import GlassCTA from "@/components/ui/GlassCTA";
import { Rocket } from "lucide-react";
import { TypeAnimation } from 'react-type-animation';

/* =====================================================
   Página — Mis creaciones
===================================================== */

export default function MisCreacionesPage() {
  return (
    <>
      {/* Estilos inyectados para la animación infinita de las burbujas del laboratorio */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes rise {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          20% { opacity: 1; }
          80% { transform: translateY(-25px) scale(1.2); opacity: 0.8; }
          100% { transform: translateY(-35px) scale(0.5); opacity: 0; }
        }
        .bubble-1 { animation: rise 2s infinite ease-in; }
        .bubble-2 { animation: rise 2.5s infinite ease-in 0.5s; }
        .bubble-3 { animation: rise 3s infinite ease-in 1s; }
        .bubble-4 { animation: rise 2.2s infinite ease-in 1.5s; }
      `}} />

      {/* HERO */}
      <PageHero
        title="Mis creaciones"
        subtitle="Plataformas independientes, herramientas SEO y mi laboratorio personal de desarrollo para WordPress."
        image="/images/hero/hero-mis-creaciones.webp"
      />

      {/* CONTENIDO PRINCIPAL */}
      <main className="w-full max-w-[1200px] mx-auto px-5 pt-20">
        
        {/* INTRODUCCIÓN */}
        <section>
          <div className="max-w-3xl mx-auto text-center">
            <p className="opacity-90">
              Más allá de la consultoría y el trabajo con clientes, dedico parte de mi tiempo a crear soluciones propias. Aquí recopilo mis plataformas independientes y el código en el que estoy trabajando actualmente.
            </p>
          </div>
        </section>

        {/* SECCIÓN 1: PRODUCTOS ACTUALES */}
        <section>
          <div className="text-center mb-12 space-y-4">
            <Rocket className="w-12 h-12 mx-auto text-[var(--brand-primary)] opacity-80" />
            <h2>Plataformas y Productos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <HorizontalCard
              title="Suite Text"
              description="Herramienta en desarrollo enfocada en optimizar, analizar y estructurar textos orientada a resultados SEO."
              image="/images/mis-creaciones/suite-text.webp" 
              href="/proyectos/suite-text"
              target="_blank"
            />
            <HorizontalCard
              title="Barber Short"
              description="Plataforma web integral para barberías, especializada en gestión de reservas, servicios y pagos en línea."
              image="/images/mis-creaciones/barber-short.webp" 
              href="/proyectos/barber-short"
              target="_blank"
            />
            <HorizontalCard
              title="Alsnippets"
              description="Mi sitio web personal, lo he creado utilizando React, Next.js y Tailwind."
              image="/images/mis-creaciones/alsnippets.webp" 
              href="/"
              target="_blank"
            />
          </div>
        </section>

        {/* =====================================================
            SECCIÓN 2: LABORATORIO WORDPRESS (Full Width)
            ===================================================== */}
        <div 
          className="relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] py-24 my-0 border-y border-[var(--border-subtle)] overflow-hidden"
          style={{ background: 'var(--bg-hero-gradient)' }}
        >
          {/* Mantenemos el contenido confinado a los 1200px */}
          <section className="max-w-[1200px] mx-auto px-5 relative z-10">
            
            {/* Contenedor tipo Cristal con diseño tecnológico */}
            <div className="max-w-4xl mx-auto bg-white/60 dark:bg-[#121212]/60 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-2xl rounded-3xl p-8 md:p-16 text-center relative overflow-hidden group">
              
              {/* Fondo cuadriculado decorativo */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#16653405_1px,transparent_1px),linear-gradient(to_bottom,#16653405_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none"></div>

              <div className="relative z-10 space-y-8 flex flex-col items-center">
                
                {/* ICONO ANIMADO: Laboratorio y Burbujas */}
                <div className="relative flex justify-center items-center w-24 h-24 mb-4">
                  {/* Órbitas giratorias de fondo */}
                  <div className="absolute inset-0 border border-[var(--brand-primary)]/30 rounded-full animate-[spin_10s_linear_infinite] [transform:rotateX(60deg)]"></div>
                  <div className="absolute inset-0 border border-[var(--brand-primary)]/30 rounded-full animate-[spin_15s_linear_infinite_reverse] [transform:rotateY(60deg)]"></div>
                  
                  {/* Matraz SVG */}
                  <svg viewBox="0 0 100 100" className="w-16 h-16 text-[var(--brand-primary)] drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                    <path d="M40,20 L60,20 L60,25 L55,25 L55,45 L80,85 L20,85 L45,45 L45,25 L40,25 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
                    <path d="M28,80 L72,80 L52,48 L48,48 Z" fill="currentColor" className="opacity-30" />
                    {/* Burbujas animadas */}
                    <circle cx="50" cy="70" r="3" fill="currentColor" className="bubble-1" />
                    <circle cx="42" cy="75" r="2.5" fill="currentColor" className="bubble-2" />
                    <circle cx="58" cy="65" r="4" fill="currentColor" className="bubble-3" />
                    <circle cx="48" cy="60" r="2" fill="currentColor" className="bubble-4" />
                  </svg>
                </div>
                
                <h2 className="!my-0 text-3xl md:text-5xl">Laboratorio WordPress</h2>
                
                {/* RECUADRO AMARILLO CON MÁQUINA DE ESCRIBIR */}
                <div className="inline-flex items-center gap-3 px-5 mt-12 py-3 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-sm md:text-base font-bold tracking-wide uppercase shadow-[0_0_20px_rgba(234,179,8,0.1)]">
                  {/* Punto amarillo parpadeante */}
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"></span>
                  </span>
                  
                  {/* Animación Typewriter */}
                  <TypeAnimation
                    sequence={[
                      'Creando Plugins', 2000,
                      'Creando Themes', 2000,
                      'Creando nuevas aplicaciones', 3000
                    ]}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                    className="inline-block"
                  />
                </div>

                <p className="max-w-2xl mx-auto opacity-80 mt-4">
                  Actualmente estoy cocinando nuevos componentes optimizados para el máximo rendimiento (WPO). Este espacio crecerá muy pronto como un repositorio de soluciones técnicas para la comunidad.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* SECCIÓN CTA - FULL WIDTH */}
        <div className="relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] my-0">
          <GlassCTA
            title="¿Tienes una idea para un plugin o plataforma?"
            description="Si necesitas un desarrollo a medida que no existe en el mercado estándar, podemos construirlo juntos."
            buttonText="Hablemos de tu idea"
            buttonHref="/contacto"
            className="!my-0"
          />
        </div>

      </main>
    </>
  );
}