"use client"; // Necesario para el efecto spotlight (useState/useRef)

import React, { useRef, useState } from "react";
import Link from "next/link";
import PageHero from "@/components/hero/PageHero";
import IconCopiaSeguridad from "@/components/icons/IconCopiaSeguridad";
import IconRevisionCompatibilidad from "@/components/icons/IconRevisionCompatibilidad";
import IconMonitoreoSeguridad from "@/components/icons/IconMonitoreoSeguridad";
import IconSoporteTecnico from "@/components/icons/IconSoporteTecnico";

/* =====================================================
   Página — Soporte y Mantenimiento WordPress
===================================================== */

export default function SoporteMantenimientoPage() {
  // --- LÓGICA DEL EFECTO SPOTLIGHT (Replicada localmente) ---
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
  // ---------------------------------------------------------

  return (
    <>
      {/* =====================================================
          HERO — Presentación del servicio
          ===================================================== */}
      <PageHero
        title="Soporte y Mantenimiento WordPress"
        subtitle="No necesitas aprender WordPress. Necesitas que funcione. Me encargo de la seguridad, los errores y la estabilidad de tu sitio para que puedas concentrarte en tu negocio."
        image="/images/hero/hero-soporte-mantenimiento.webp"
      />

      {/* =====================================================
          CONTENIDO PRINCIPAL
          ===================================================== */}
      <main className="w-full max-w-[1200px] mx-auto px-5 pt-12 md:pt-24 pb-0 space-y-32">

        {/* SECCIÓN 1: PROBLEMAS QUE SOLUCIONO */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Problemas que soluciono en WordPress
            </h2>
            <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400">
              Identifico y resuelvo los obstáculos técnicos que frenan el crecimiento de tu web.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl p-8 space-y-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Errores críticos</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Errores 400, 500, pantallas blancas y fallos que impiden el
                funcionamiento normal del sitio.
              </p>
            </div>

            {/* Card 2 */}
            <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl p-8 space-y-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Actualizaciones sin riesgo</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Actualización segura de WordPress, plugins y themes, evitando
                conflictos y pérdidas de información.
              </p>
            </div>

            {/* Card 3 */}
            <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl p-8 space-y-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Lentitud y rendimiento</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Identificación de cuellos de botella que afectan la velocidad y
                experiencia del usuario.
              </p>
            </div>

            {/* Card 4 */}
            <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl p-8 space-y-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Configuración del servidor</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Revisión de memoria, tiempos de ejecución, SSL, caché y ajustes
                clave del hosting.
              </p>
            </div>

            {/* Card 5 */}
            <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl p-8 space-y-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Soporte técnico real</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Respuesta clara y directa cuando algo falla, sin tickets eternos
                ni respuestas genéricas.
              </p>
            </div>

            {/* Card 6 */}
            <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl p-8 space-y-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Bases de datos</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Optimización, respaldo y restauración de bases de datos WordPress
                para garantizar la integridad de los datos.
              </p>
            </div>
          </div>
        </section>


        {/* =====================================================
            SECCIÓN 2: MANTENIMIENTO RESPONSABLE
            ===================================================== */}
        <section
          className="
            relative
            w-screen 
            left-[50%] 
            right-[50%] 
            -ml-[50vw] 
            -mr-[50vw]
            py-24
            px-5
          "
          style={{
            backgroundImage:
              "linear-gradient(to left top, #f0f3ff, #faf2fc, #fff3f7, #fff5f4, #fff8f3, #fdf9f2, #fafbf2, #f6fcf4, #f0fcf7, #ebfafb, #ebf8fe, #eef5ff)",
          }}
        >
          <div className="max-w-6xl mx-auto space-y-12">

            <div className="space-y-6 text-center">
              <h2 className="text-3xl font-bold text-neutral-900">
                Mantenimiento responsable
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                El mantenimiento no es solo actualizar por actualizar. Es entender
                el estado del sitio, anticipar problemas y actuar con criterio
                técnico.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  text: "Copias de seguridad confiables",
                  Icon: IconCopiaSeguridad
                },
                {
                  text: "Revisión de compatibilidad",
                  Icon: IconRevisionCompatibilidad
                },
                {
                  text: "Monitoreo básico de seguridad",
                  Icon: IconMonitoreoSeguridad
                },
                {
                  text: "Soporte técnico cuando lo necesitas",
                  Icon: IconSoporteTecnico
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="
                    group relative 
                    bg-white
                    rounded-xl 
                    p-8 
                    flex flex-col items-center justify-center text-center
                    min-h-[260px]
                    shadow-sm
                    border border-neutral-100
                    
                    /* ANIMACIÓN CARD (Movimiento suave) */
                    transition-all duration-500 ease-in-out
                    hover:-translate-y-2 
                    hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]
                    hover:border-neutral-200
                  "
                >
                  {/* CÍRCULO DEL ICONO 
                      - Se añadió 'duration-500 ease-in-out' para suavizar el cambio de color
                  */}
                  <div className="
                    mb-6 
                    w-24 h-24 
                    rounded-full 
                    flex items-center justify-center
                    /* TRANSICIÓN SUAVE DE COLOR */
                    transition-all duration-500 ease-in-out
                    
                    bg-[var(--bg-secondary)] 
                    text-[var(--text-yellow1)]
                    
                    group-hover:bg-[var(--text-yellow1)] 
                    group-hover:text-[var(--bg-secondary)]
                  ">
                    {/* EL ICONO TAMBIÉN NECESITA TRANSICIÓN SUAVE */}
                    <item.Icon className="w-12 h-12 transition-all duration-500 ease-in-out" />
                  </div>

                  {/* TEXTO */}
                  <p className="font-bold text-lg text-neutral-800 transition-colors duration-500 ease-in-out">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =====================================================
            CTA PERSONALIZADO (Estilo Home "Spotlight")
            ===================================================== */}
        <section className="w-full pb-12">
          <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="
              relative w-full mx-auto 
              rounded-xl overflow-hidden shadow-2xl
              bg-neutral-100 dark:bg-neutral-900
              border border-neutral-200 dark:border-neutral-800
              transition-colors duration-300
            "
          >
            {/* LUZ DORADA (Spotlight Effect) */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
              style={{
                opacity,
                background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 215, 0, 0.15), transparent 40%)`,
              }}
            />
            {/* Luz Ámbar para Light Mode */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 dark:opacity-0 transition-opacity duration-300"
              style={{
                opacity,
                background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(217, 119, 6, 0.1), transparent 40%)`,
              }}
            />

            {/* DECORACIÓN DE FONDO */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-[var(--brand-primary)] opacity-10 dark:opacity-20 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-600 opacity-10 dark:opacity-20 blur-[80px] rounded-full pointer-events-none"></div>

            {/* CONTENIDO CTA */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 md:py-24 space-y-8">

              <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight max-w-3xl">
                Empieza por una auditoría WordPress
              </h2>

              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
                Antes de intervenir cualquier sitio, realizo una auditoría técnica
                para evaluar el estado real de tu WordPress y definir el mejor
                camino.
              </p>

              {/* BOTÓN ANIMADO (Estilo CTA Home) */}
              <div className="pt-4 flex flex-col items-center space-y-4">
                <Link
                  href="/auditoria"
                  className="
                    group relative inline-flex items-center justify-center px-8 py-4 
                    text-lg font-bold rounded-full overflow-hidden
                    transition-all duration-300 ease-in-out
                    
                    bg-neutral-900 text-white 
                    dark:bg-white dark:text-neutral-900
                    
                    hover:bg-[var(--text-yellow2)] 
                    hover:text-[var(--text-primary)]
                    
                    hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]
                    dark:hover:shadow-[0_0_30px_rgba(255,215,0,0.4)]
                  "
                >
                  {/* Brillo (Shine) */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                  <span className="relative z-10">Solicitar auditoría</span>

                  {/* Flecha */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="relative z-10 w-5 h-5 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-2"
                  >
                    <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}