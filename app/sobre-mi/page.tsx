"use client";
import React from "react";
import Image from "next/image";
import StackLogos from "@/components/shared/StackLogos";
import PageHero from "@/components/hero/PageHero";
import CTA from "@/components/home/CTA";
import { TypeAnimation } from "react-type-animation";

/* =====================================================
   Página — Sobre mí
   ===================================================== */

export default function SobreMiPage() {
  return (
    <>
      {/* =====================================================
          HERO — Sobre mí
          ===================================================== */}
      <PageHero
        title="Sobre mí"
        subtitle="Soy Adrián Loaiza Carmona, la persona detrás de Alsnippets. Trabajo directamente contigo, sin intermediarios ni equipos ocultos, resolviendo problemas reales en sitios WordPress y otros CMS."
        image="/images/sobre-mi/hero-sobre-mi.webp"
      />

      <main className="w-full">
        {/* =====================================================
            LAYOUT ZIG-ZAG (Imágenes tocándose en las esquinas)
            ===================================================== */}
        <div className="flex flex-col w-full max-w-[1400px] mx-auto">
          
          {/* SECCIÓN 1: QUÉ HAGO */}
          <section className="flex flex-col md:flex-row items-stretch">
            {/* IMAGEN (Izquierda) */}
            <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[500px]">
              <Image
                src="/images/sobre-mi/que-hago.webp"
                alt="Qué hago - Adrián Loaiza"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            {/* TEXTO (Derecha) */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white dark:bg-neutral-900">
              <div className="space-y-6 max-w-lg">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                  Qué hago
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Me especializo en soporte, mantenimiento y optimización de
                  sitios WordPress, con más de cinco años de experiencia
                  trabajando con WordPress y otros CMS.
                </p>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Mi enfoque no es rehacer por rehacer, sino mejorar lo que ya
                  existe, respetando tu inversión y haciendo que tu web sea más
                  estable, segura y rápida.
                </p>
              </div>
            </div>
          </section>

          {/* SECCIÓN 2: VISIÓN INTEGRAL */}
          <section className="flex flex-col-reverse md:flex-row items-stretch">
            {/* TEXTO (Izquierda) */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-neutral-50 dark:bg-neutral-800/50">
              <div className="space-y-6 max-w-lg">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                  Visión integral
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  <strong>Alsnippets</strong> es mi marca personal, creada bajo mis iniciales (AL) y el concepto de <strong>Snippets</strong>: fragmentos de código esenciales para el éxito de una web.
                </p>

                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Bajo este sello, ofrezco una <strong>ventaja competitiva en costos y eficiencia</strong>. Al integrar formación profesional en <strong>diseño gráfico, marketing digital, fotografía y edición de video</strong>, permito que las empresas reduzcan costos de contratación al no tener que buscar múltiples proveedores para diferentes frentes. Mi perfil multidisciplinario garantiza un <strong>ahorro significativo en tiempos de entrega</strong>, permitiéndome liderar un proyecto desde la identidad visual y el branding hasta la pasarela de pagos, asegurando una coherencia técnica y estética impecable en tiempo récord.
                </p>
              </div>
            </div>
            {/* IMAGEN (Derecha) */}
            <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[500px]">
              <Image
                src="/images/sobre-mi/vision.webp"
                alt="Visión Integral"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </section>

          {/* SECCIÓN 3: CÓMO TRABAJO */}
          <section className="flex flex-col md:flex-row items-stretch">
            {/* IMAGEN (Izquierda) */}
            <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[500px]">
              <Image
                src="/images/sobre-mi/como-trabajo.webp"
                alt="Cómo trabajo"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* TEXTO (Derecha) */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white dark:bg-neutral-900">
              <div className="space-y-6 max-w-lg">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                  Cómo trabajo
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Analizo antes de actuar, explico lo técnico en lenguaje claro
                  y priorizo soluciones que realmente aporten valor.
                </p>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  No aplico recetas genéricas ni prometo lo que no conviene.
                  Cada sitio tiene su contexto, y así lo trato.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* =====================================================
            EVOLUCIÓN CONSTANTE (Con animación de máquina de escribir)
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
            !my-0
          "
          style={{
            backgroundImage:
              "linear-gradient(to left top, #f0f3ff, #faf2fc, #fff3f7, #fff5f4, #fff8f3, #fdf9f2, #fafbf2, #f6fcf4, #f0fcf7, #ebfafb, #ebf8fe, #eef5ff)",
          }}
        >
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <TypeAnimation
              sequence={[
                "Evolución Tecnológica",
                2000,
                "Desarrollo Ágil",
                2000,
                "Criterio Profesional",
                2000,
              ]}
              wrapper="h2"
              cursor={true}
              repeat={Infinity}
              speed={50}
              deletionSpeed={70}
              className="text-3xl font-bold text-neutral-900 inline-block min-h-[1.2em]"
            />

            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
              Continúo fortaleciendo mis bases técnicas constantemente mediante el aprendizaje
              de tecnologías como <strong>React y Tailwind</strong>, con la
              visión de integrar próximamente <strong>Python</strong>. Además,
              adopto herramientas de inteligencia artificial para optimizar
              procesos y agilizar el desarrollo, garantizando entregas eficaces
              que{" "}
              <i>
                mantienen siempre el criterio humano como pilar fundamental
              </i>
              .
            </p>
          </div>
        </section>

        {/* =====================================================
            STACK TECNOLÓGICO
            ===================================================== */}
        <section
          className="
            relative
            w-screen 
            left-[50%] 
            right-[50%] 
            -ml-[50vw] 
            -mr-[50vw]
            py-16 md:py-24
            spectrum-frame
            overflow-hidden
            mb-0
          "
          style={{ background: "var(--bg-stack)" }}
        >
          <div className="w-full max-w-[1200px] mx-auto px-4 space-y-10 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                Tecnologías y herramientas
              </h2>
              <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400 opacity-90">
                Estas son algunas de las tecnologías y herramientas que utilizo
                en proyectos reales. No se trata de acumular nombres, sino de
                saber cuándo y cómo usar cada herramienta según el contexto de
                tu sitio.
              </p>
            </div>
            <StackLogos />
          </div>
        </section>

        {/* =====================================================
            CTA FINAL
            ===================================================== */}
        <div className="mt-24">
          <CTA />
        </div>
      </main>
    </>
  );
}