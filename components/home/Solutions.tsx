import React from "react";
import Link from "next/link";
// 1. Importamos el componente reutilizable
import HorizontalCard from "@/components/ui/HorizontalCard";

/* =====================================================
   DATOS
   ===================================================== */
const solutionsData = [
  {
    title: "Mi web muestra comportamientos extraños",
    description: "Cuando una web es atacada, los problemas no siempre son visibles, pero el riesgo sigue activo y creciendo.",
    image: "/images/home/sitio-web-hackeado-home.webp",
    link: "/blog",
  },
  {
    title: "Mi web es lenta y está perdiendo visitas",
    description: "Un sitio lento frustra a los usuarios, reduce conversiones y afecta negativamente el posicionamiento en Google.",
    image: "/images/home/sitio-web-lento-home.webp",
    link: "/blog",
  },
  {
    title: "Tengo miedo de actualizar mi sitio web",
    description: "Actualizar sin control puede parecer sencillo, pero una mala decisión puede dejar el sitio inestable.",
    image: "/images/home/actualizar-sitio-web-home.webp",
    link: "/blog",
  },
  {
    title: "Quiero mejorar mi sitio, pero... ¿Cómo le hago?",
    description: "Sin una guía clara, es fácil perder tiempo, dinero y tomar decisiones técnicas equivocadas.",
    image: "/images/home/mejorar-sitio-web-home.webp",
    link: "/blog",
  },
];

/* =====================================================
   Solutions Component
   ===================================================== */
export default function Solutions() {
  return (
    <section className="w-full space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto px-4">
        <h2>
          ¿Qué problema tiene tu WordPress ahora?
        </h2>
      </div>

      {/* Grid de Tarjetas */}
      <div className="container mx-auto px-4 w-full max-w-[1200px]">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {solutionsData.map((item, index) => (
            // 2. Usamos HorizontalCard
            <HorizontalCard
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
              href={item.link}
              linkText="Leer más" // Opcional, por defecto ya es "Leer más"
            />
          ))}
        </div>
      </div>

      {/* CTA Secundario */}
      <div className="pt-4 text-center">
        <Link
          href="/consultoria"
          className="
            inline-flex items-center justify-center
            px-8 py-3 rounded-full
            text-sm font-bold
            bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-subtle)]
            hover:bg-[var(--brand-primary)] hover:text-white hover:border-transparent
            shadow-sm hover:shadow-md
            transition-all duration-300
          "
        >
          Solicitar consultoría
        </Link>
      </div>
    </section>
  );
}