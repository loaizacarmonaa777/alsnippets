import React from "react";
import Image from "next/image";
import Link from "next/link";

/* =====================================================
   DATOS DE LAS SOLUCIONES
   ===================================================== */
const solutionsData = [
  {
    title: "Mi web muestra comportamientos extraños",
    description:
      "Cuando una web es atacada, los problemas no siempre son visibles, pero el riesgo sigue activo y creciendo.",
    image: "/images/home/sitio-web-hackeado-home.webp",
    link: "/blog",
  },
  {
    title: "Mi web es lenta y está perdiendo visitas",
    description:
      "Un sitio lento frustra a los usuarios, reduce conversiones y afecta negativamente el posicionamiento en Google.",
    image: "/images/home/sitio-web-lento-home.webp",
    link: "/blog",
  },
  {
    title: "Tengo miedo de actualizar mi sitio web",
    description:
      "Actualizar sin control puede parecer sencillo, pero una mala decisión puede dejar el sitio inestable.",
    image: "/images/home/actualizar-sitio-web-home.webp",
    link: "/blog",
  },
  {
    title: "Quiero mejorar mi sitio, pero... ¿Cómo le hago?",
    description:
      "Sin una guía clara, es fácil perder tiempo, dinero y tomar decisiones técnicas equivocadas.",
    image: "/images/home/mejorar-sitio-web-home.webp",
    link: "/blog",
  },
];

/* =====================================================
   Solutions
   Problemas comunes que resuelve la consultoría
   ===================================================== */
export default function Solutions() {
  return (
    <section className="space-y-12">
      {/* Título de la Sección */}
      <h2 className="text-3xl font-bold text-center max-w-2xl mx-auto">
        ¿Qué problema tiene tu WordPress ahora?
      </h2>

      {/* =========================
          Grid de Cards
          ========================= */}
      {/* LAYOUT GRID:
         - Mobile/Tablet: 1 columna.
         - Desktop (lg): 2 columnas. 
      */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 w-full max-w-[1200px] mx-auto">
        {solutionsData.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            /* CARD STYLE & LAYOUT:
               - "group": Para activar el hover en los hijos.
               - "flex flex-col": Mobile -> Imagen arriba, texto abajo.
               - "xl:flex-row": Desktop Grande -> Imagen a la izquierda, texto a la derecha.
            */
            className="group card overflow-hidden flex flex-col xl:flex-row items-stretch hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300"
          >
            {/* 1. Contenedor Imagen */}
            <div className="relative w-full h-56 xl:h-auto xl:w-[180px] shrink-0 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* 2. Contenedor Texto */}
            <div className="p-6 flex flex-col justify-center space-y-3">
              <h3 className="!text-2xl text-neutral-900 dark:text-neutral-100 group-hover:text-[var(--brand-primary)] transition-colors">
                {item.title}
              </h3>

              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.description}
              </p>

              {/* Botón "Ver más" simulado con texto y flecha */}
              <div className="pt-2 flex items-center text-sm font-semibold text-[var(--brand-primary)]">
                <span className="group-hover:underline">Ver más</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* =========================
          CTA principal — Consultoría
          ========================= */}
      <div className="pt-4 text-center">
        <Link
          href="/consultoria"
          className="button-home-light inline-flex" // Usamos tu botón global definido en globals.css
        >
          <span>Solicitar consultoría</span>
        </Link>
      </div>
    </section>
  );
}