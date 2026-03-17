"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

type PostCTAProps = {
  category: string;
  lang: string; 
};

export default function PostCTA({ category, lang }: PostCTAProps) {
  // 👇 1. NORMALIZAMOS EL LANG
  const normalizedLang = lang.replace(/^\//, '');
  
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

  const normalizedCategory = category.toLowerCase();

  const contentMap = {
    general: {
      es: { title: "¿Hablamos de tu sitio web?", desc: "Si quieres saber en qué estado está tu sitio y qué vale la pena mejorar, puedo ayudarte.", btn: "Contactar ahora", href: "/contacto" },
      en: { title: "Shall we talk about your website?", desc: "If you want to know the state of your site and what is worth improving, I can help you.", btn: "Contact now", href: "/contacto" }
    },
    security: {
      es: { title: "Auditoría de seguridad WordPress", desc: "Detecta vulnerabilidades y archivos infectados antes de que se conviertan en un problema mayor.", btn: "Solicitar auditoría", href: "/auditoria" },
      en: { title: "WordPress Security Audit", desc: "Detect vulnerabilities and infected files before they become a major problem.", btn: "Request audit", href: "/auditoria" }
    },
    seo: {
      es: { title: "Consultoría SEO y GEO", desc: "Analizamos tu sitio para mejorar la visibilidad ante Google y motores de búsqueda de IA.", btn: "Solicitar consultoría", href: "/auditoria" },
      en: { title: "SEO & GEO Consulting", desc: "We analyze your site to improve visibility for Google and AI search engines.", btn: "Request consulting", href: "/auditoria" }
    },
    wpo: {
      es: { title: "Auditoría de rendimiento (WPO)", desc: "Identifica cuellos de botella y problemas de carga que afectan la experiencia de tus usuarios.", btn: "Optimizar mi web", href: "/auditoria" },
      en: { title: "Performance Audit (WPO)", desc: "Identify bottlenecks and loading issues that affect your users' experience.", btn: "Optimize my web", href: "/auditoria" }
    }
  };

  let segment: keyof typeof contentMap = "general";
  if (normalizedCategory.match(/seguridad|virus|security/)) segment = "security";
  else if (normalizedCategory.match(/seo|geo|marketing/)) segment = "seo";
  else if (normalizedCategory.match(/optimizacion|rendimiento|performance/)) segment = "wpo";

  // 👇 2. USAMOS EL LANG NORMALIZADO PARA LAS TRADUCCIONES
  const t = contentMap[segment][normalizedLang as "es" | "en"] || contentMap[segment]["es"];

  return (
    <section className="w-full py-8 md:py-12 my-0 flex items-center justify-center">
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-[var(--shadow-2)] backdrop-blur-md border border-[var(--border-brand)] transition-all duration-300"
        style={{ background: 'var(--gradient-hero)' }}
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, var(--bg-brand-hover), transparent 40%)`,
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 md:py-20 space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-1)] tracking-tight max-w-3xl drop-shadow-sm !my-0">
            {t.title}
          </h2>

          <p className="text-lg md:text-xl text-[var(--text-2)] max-w-2xl mx-auto leading-relaxed font-medium">
            {t.desc}
          </p>

          <div className="pt-6 flex flex-col items-center space-y-4">
            <Link
              // 👇 3. USAMOS EL LANG NORMALIZADO EN EL HREF
              href={`/${normalizedLang}${t.href}`}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full overflow-hidden shadow-[var(--shadow-1)] transition-all duration-300 ease-in-out bg-[var(--bg-brand)] text-[var(--text-inverse)] border border-transparent hover:bg-[var(--bg-inverse)] hover:border-[var(--border-brand)] hover:-translate-y-1 hover:shadow-[var(--shadow-2)]"
            >
              <span className="relative z-10 mr-2 group-hover:text-[var(--text-inverse)] group-hover:drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:group-hover:drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)] transition-all duration-300 font-bold">
                {t.btn}
              </span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="relative z-10 w-5 h-5 transition-all duration-300 group-hover:translate-x-1 group-hover:drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:group-hover:drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]"
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