'use client'

import React from "react";
import PageHero from "@/components/hero/PageHero";
import HorizontalCard from "@/components/ui/HorizontalCard";
import GlassCTA from "@/components/ui/GlassCTA";
import { Rocket } from "lucide-react";
import { TypeAnimation } from 'react-type-animation';

export default function MisCreacionesPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  
  // OBJETO DE TRADUCCIÓN LOCAL (Blindaje de Lógica y Animaciones)
  const t = {
    es: {
      hero: {
        title: "Mis creaciones",
        subtitle: "Plataformas independientes, herramientas SEO y mi laboratorio personal de desarrollo para WordPress."
      },
      intro: "Más allá de la consultoría y el trabajo con clientes, dedico parte de mi tiempo a crear soluciones propias. Aquí recopilo mis plataformas independientes y el código en el que estoy trabajando actualmente.",
      section1: {
        title: "Plataformas y Productos",
        cards: {
          suite: { title: "Suite Text", desc: "Herramienta en desarrollo enfocada en optimizar, analizar y estructurar textos orientada a resultados SEO." },
          barber: { title: "Barber Short", desc: "Plataforma web integral para barberías, especializada en gestión de reservas, servicios y pagos en línea." },
          alsnippets: { title: "Alsnippets", desc: "Mi sitio web personal, lo he creado utilizando React, Next.js y Tailwind." }
        }
      },
      lab: {
        title: "Laboratorio WordPress",
        typewriter: ['Creando Plugins', 2000, 'Creando Themes', 2000, 'Creando nuevas aplicaciones', 3000],
        description: "Actualmente estoy cocinando nuevos componentes optimizados para el máximo rendimiento (WPO). Este espacio crecerá muy pronto como un repositorio de soluciones técnicas para la comunidad."
      },
      cta: {
        title: "¿Tienes una idea para un plugin o plataforma?",
        description: "Si necesitas un desarrollo a medida que no existe en el mercado estándar, podemos construirlo juntos.",
        button: "Hablemos de tu idea"
      }
    },
    en: {
      hero: {
        title: "My creations",
        subtitle: "Independent platforms, SEO tools, and my personal WordPress development lab."
      },
      intro: "Beyond consulting and client work, I dedicate part of my time to creating my own solutions. Here I collect my independent platforms and the code I'm currently working on.",
      section1: {
        title: "Platforms & Products",
        cards: {
          suite: { title: "Suite Text", desc: "Tool under development focused on optimizing, analyzing, and structuring texts oriented towards SEO results." },
          barber: { title: "Barber Short", desc: "Comprehensive web platform for barbershops, specialized in managing bookings, services, and online payments." },
          alsnippets: { title: "Alsnippets", desc: "My personal website, created using React, Next.js, and Tailwind." }
        }
      },
      lab: {
        title: "WordPress Lab",
        typewriter: ['Creating Plugins', 2000, 'Creating Themes', 2000, 'Creating new applications', 3000],
        description: "I am currently cooking up new components optimized for maximum performance (WPO). This space will soon grow as a repository of technical solutions for the community."
      },
      cta: {
        title: "Do you have an idea for a plugin or platform?",
        description: "If you need a custom development that doesn't exist in the standard market, we can build it together.",
        button: "Let's talk about your idea"
      }
    }
  }[lang as 'es' | 'en'];

  return (
    <>
      {/* Estilos inyectados - BLINDADOS */}
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

      <PageHero
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image="/images/hero/hero-mis-creaciones.webp"
      />

      <main className="w-full max-w-[1200px] mx-auto px-5 pt-20">
        
        <section>
          <div className="max-w-3xl mx-auto text-center">
            <p className="opacity-90 text-[var(--text-2)]">
              {t.intro}
            </p>
          </div>
        </section>

        <section>
          <div className="text-center mb-12 space-y-4 pt-12">
            <Rocket className="w-12 h-12 mx-auto text-[var(--text-brand)] opacity-80" />
            <h2 className="text-[var(--text-1)]">{t.section1.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <HorizontalCard
              title={t.section1.cards.suite.title}
              description={t.section1.cards.suite.desc}
              image="/images/mis-creaciones/suite-text.webp" 
              href={`/${lang}/proyectos/suite-text`}
              target="_blank"
              lang={lang}
            />
            <HorizontalCard
              title={t.section1.cards.barber.title}
              description={t.section1.cards.barber.desc}
              image="/images/mis-creaciones/barber-short.webp" 
              href={`/${lang}/proyectos/barber-short`}
              target="_blank"
              lang={lang}
            />
            <HorizontalCard
              title={t.section1.cards.alsnippets.title}
              description={t.section1.cards.alsnippets.desc}
              image="/images/mis-creaciones/alsnippets.webp" 
              href={`/${lang}`}
              target="_blank"
              lang={lang}
            />
          </div>
        </section>

        {/* SECCIÓN 2: LABORATORIO WORDPRESS - DISEÑO BLINDADO */}
        <div 
          className="relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] py-24 my-0 border-y border-[var(--border-1)] overflow-hidden mt-16"
          style={{ background: 'var(--gradient-hero)' }}
        >
          <section className="max-w-[1200px] mx-auto px-5 relative z-10 border-[var(--border-brand)]">
            <div className="max-w-4xl mx-auto bg-[var(--bg-1)]/60 backdrop-blur-xl border border-[var(--border-brand)]/40 shadow-[var(--shadow-2)] rounded-3xl p-8 md:p-16 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-brand)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-brand)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-5 pointer-events-none"></div>

              <div className="relative z-10 space-y-8 flex flex-col items-center">
                <div className="relative flex justify-center items-center w-24 h-24 mb-4">
                  <div className="absolute inset-0 border border-[var(--border-brand)]/30 rounded-full animate-[spin_10s_linear_infinite] [transform:rotateX(60deg)]"></div>
                  <div className="absolute inset-0 border border-[var(--border-brand)]/30 rounded-full animate-[spin_15s_linear_infinite_reverse] [transform:rotateY(60deg)]"></div>
                  
                  <svg viewBox="0 0 100 100" className="w-16 h-16 text-[var(--text-brand)] drop-shadow-[var(--shadow-brand-glow)]">
                    <path d="M40,20 L60,20 L60,25 L55,25 L55,45 L80,85 L20,85 L45,45 L45,25 L40,25 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
                    <path d="M28,80 L72,80 L52,48 L48,48 Z" fill="currentColor" className="opacity-30" />
                    <circle cx="50" cy="70" r="3" fill="currentColor" className="bubble-1" />
                    <circle cx="42" cy="75" r="2.5" fill="currentColor" className="bubble-2" />
                    <circle cx="58" cy="65" r="4" fill="currentColor" className="bubble-3" />
                    <circle cx="48" cy="60" r="2" fill="currentColor" className="bubble-4" />
                  </svg>
                </div>
                
                <h2 className="!my-0 text-3xl md:text-5xl text-[var(--text-1)]">{t.lab.title}</h2>
                
                <div className="inline-flex items-center gap-3 px-5 mt-12 py-3 rounded-full bg-[var(--bg-brand)]/10 border border-[var(--border-brand)]/30 text-[var(--text-brand)] text-sm md:text-base font-bold tracking-wide uppercase shadow-[var(--shadow-brand-glow)]">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--bg-brand)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--bg-brand)]"></span>
                  </span>
                  
                  <TypeAnimation
                    sequence={t.lab.typewriter}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                    className="inline-block"
                  />
                </div>

                <p className="max-w-2xl mx-auto opacity-80 mt-4 text-[var(--text-2)]">
                  {t.lab.description}
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] my-0">
          <GlassCTA
            title={t.cta.title}
            description={t.cta.description}
            buttonText={t.cta.button}
            buttonHref={`/${lang}/contacto`}
            lang={lang}
          />
        </div>

      </main>
    </>
  );
}