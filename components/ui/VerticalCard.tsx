"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

/* =====================================================
   TIPOS DE DATOS
   ===================================================== */
export type CardTag = {
  text: string;
  variant?: "success" | "error" | "neutral" | "brand";
};

interface VerticalCardProps {
  title: string;
  description: string;
  image?: string;
  tags?: CardTag[];
  href?: string;
  className?: string;
}

/* =====================================================
   VerticalCard (Componente UI)
   ===================================================== */
export default function VerticalCard({
  title,
  description,
  image,
  tags = [],
  href,
  className = "",
}: VerticalCardProps) {
  
  // Clases base compartidas (para Link y div/article)
  const containerClasses = `
    group relative flex flex-col w-full h-full
    bg-[var(--bg-card)] border border-[var(--border-subtle)]
    rounded-2xl overflow-hidden
    shadow-sm transition-all duration-300 ease-out
    ${href ? "hover:shadow-xl hover:-translate-y-1 cursor-pointer" : ""}
    ${className}
  `;

  // Definimos el contenido interno como una constante o función render
  // para no duplicar código dentro del return
  const cardContent = (
    <>
      {/* 1. IMAGEN */}
      <div className="relative h-56 w-full bg-[var(--bg-tertiary)] overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-[var(--text-muted)] bg-[var(--bg-tertiary)]">
            <span className="text-sm">Sin imagen</span>
          </div>
        )}
      </div>

      {/* 2. BODY */}
      <div className="flex flex-col flex-grow p-5 md:p-6 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--brand-primary)] transition-colors">
          {title}
        </h3>

        <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-6">
          {description}
        </p>

        {/* 3. FOOTER (Tags) */}
        {tags && tags.length > 0 && (
          <div className="mt-auto flex flex-wrap justify-center gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`
                  px-2.5 py-1 rounded-full text-xs font-medium border cursor-default
                  transition-colors duration-200
                  ${getTagStyles(tag.variant)}
                `}
              >
                {tag.text}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );

  /* =====================================================
     LA REGLA DE LINK vs ARTICLE
     =====================================================
     Verificamos que href exista Y que no sea un string vacío.
     Si es válido -> Renderiza Link.
     Si no -> Renderiza article (sin enlace).
  */
  const isValidLink = href && href.trim() !== "";

  if (isValidLink) {
    return (
      <Link href={href as string} className={containerClasses}>
        {cardContent}
      </Link>
    );
  }

  // Si no hay link, renderizamos un contenedor estático
  return (
    <article className={containerClasses}>
      {cardContent}
    </article>
  );
}

/* =====================================================
   HELPER: Estilos de los Tags
   ===================================================== */
function getTagStyles(variant: CardTag["variant"] = "neutral") {
  switch (variant) {
    case "success":
      return "border-green-200 bg-green-50 text-green-700 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300";
    case "error":
      return "border-red-200 bg-red-50 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300";
    case "brand":
      return "border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]";
    case "neutral":
    default:
      return "border-[var(--border-subtle)] bg-[var(--bg-tertiary)] text-[var(--text-secondary)]";
  }
}