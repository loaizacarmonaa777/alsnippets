"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import PageHero from "@/components/hero/PageHero";


/* =====================================================
   Página — Precios
===================================================== */

export default function PreciosPage() {
  // --- LÓGICA SPOTLIGHT CTA---
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

  // ------------------------

  return (
    <>
      {/* =====================================================
          HERO — Precios
          ===================================================== */}
      <PageHero
        title="Precios y forma de trabajo"
        subtitle="Cada proyecto es distinto. Por eso no trabajo con precios genéricos ni paquetes cerrados sin entender primero el contexto real."
        image="/images/hero/hero-precios.webp"
      />

      {/* =====================================================
          Contenido - FILOSOFÍA — Cómo se define un precio
          ===================================================== */}
      <main className="w-full max-w-[1200px] mx-auto px-5 pt-12 md:pt-24 pb-0 space-y-32">
        <section className="max-w-6xl mx-auto px-5 space-y-6">
          <h2 className="text-2xl font-semibold text-center">
            ¿Cómo se define el precio de un proyecto?
          </h2>

          <p className="opacity-80 text-center max-w-3xl mx-auto">
            El precio de un servicio técnico no depende solo del número de
            páginas o de instalar un plugin. Depende del estado actual del
            sitio, su complejidad y los objetivos que se quieren alcanzar.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Estado actual del sitio web
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Nivel de personalización requerido
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Complejidad técnica y funcional
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Cantidad de trabajo manual
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Riesgos técnicos y responsabilidad
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
          TRANSPARENCIA — Qué puedes esperar
          ===================================================== */}
        <section className="max-w-6xl mx-auto px-5 space-y-6">
          <h2 className="text-2xl font-semibold text-center">
            Transparencia desde el inicio
          </h2>

          <p className="opacity-80 text-center max-w-3xl mx-auto">
            Antes de iniciar cualquier trabajo, realizo una revisión técnica
            para entender el proyecto y proponer una solución realista.
          </p>

          <p className="opacity-80 text-center max-w-3xl mx-auto">
            Esto permite definir tiempos, prioridades y un presupuesto acorde al
            alcance real, evitando sorpresas durante el proceso.
          </p>
        </section>

        {/* =====================================================
          OPCIONES — Cómo trabajar juntos
          ===================================================== */}
        <section className="max-w-6xl mx-auto px-5 space-y-6">
          <h2 className="text-2xl font-semibold text-center">Formas de trabajo</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl text-center mx-auto">
            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <h3 className="font-semibold">Servicios a medida</h3>
              <p className="text-sm opacity-80">
                Ideal para proyectos específicos, mejoras puntuales o
                desarrollos con requerimientos particulares.
              </p>

              <Link
                href="/precios/servicios-a-medida"
                className="inline-block text-sm underline"
              >
                Ver servicios a medida
              </Link>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <h3 className="font-semibold">Auditoría WordPress</h3>
              <p className="text-sm opacity-80">
                El primer paso recomendado para conocer el estado real de tu
                sitio antes de intervenir.
              </p>

              <Link
                href="/auditoria"
                className="inline-block text-sm underline"
              >
                Solicitar auditoría
              </Link>
            </div>
          </div>
        </section>

        {/* =====================================================
          FUTURO — Cotización interactiva
          ===================================================== */}
        <section className="border rounded-2xl p-8 space-y-4 max-w-3xl mx-auto px-5">
          <h2 className="text-2xl font-semibold">Cotización orientativa</h2>

          <p className="opacity-80">
            Próximamente podrás realizar una cotización orientativa respondiendo
            algunas preguntas sobre tu proyecto.
          </p>

          <p className="opacity-80">
            Esta herramienta permitirá estimar rangos de inversión según el
            alcance y complejidad, manteniendo siempre una revisión final
            humana.
          </p>
        </section>

        {/* =====================================================
            CTA PERSONALIZADO — Contacto
            ===================================================== */}
        <section className="w-full pb-12">
          <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-full mx-auto rounded-xl overflow-hidden shadow-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-colors duration-300"
          >
            {/* Luces */}
            <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300" style={{ opacity, background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 215, 0, 0.15), transparent 40%)` }} />
            <div className="pointer-events-none absolute -inset-px opacity-0 dark:opacity-0 transition-opacity duration-300" style={{ opacity, background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(217, 119, 6, 0.1), transparent 40%)` }} />
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-[var(--brand-primary)] opacity-10 dark:opacity-20 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-600 opacity-10 dark:opacity-20 blur-[80px] rounded-full pointer-events-none"></div>

            {/* CONTENIDO */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 md:py-24 space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight max-w-3xl">
                Hablemos de tu proyecto
              </h2>
              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
                Si tienes claro lo que necesitas o prefieres una conversación
                directa, puedes escribirme y lo revisamos juntos.
              </p>

              <div className="pt-4 flex flex-col items-center space-y-4">
                <Link href="/contacto" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full overflow-hidden transition-all duration-300 ease-in-out bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:bg-[var(--text-yellow2)] hover:text-[var(--text-primary)] hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_30px_rgba(255,215,0,0.4)]">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                  <span className="relative z-10">Contactar</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="relative z-10 w-5 h-5 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-2">
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
