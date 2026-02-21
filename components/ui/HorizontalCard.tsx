import React from "react";
import Link from "next/link";
import Image from "next/image";

interface HorizontalCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  linkText?: string; // Texto opcional para el enlace (default: "Leer más")
  className?: string; // Para añadir clases extra si es necesario
}

export default function HorizontalCard({
  title,
  description,
  image,
  href,
  linkText = "Leer más",
  className = "",
}: HorizontalCardProps) {
  return (
    <Link
      href={href}
      className={`
        group relative 
        flex flex-col md:flex-row overflow-hidden
        
        /* Estilos Base (Igual que IconCard y VerticalCard) */
        bg-[var(--bg-card)]
        border border-[var(--border-subtle)]
        rounded-2xl
        shadow-sm
        
        /* Hover Effects */
        hover:-translate-y-1
        hover:shadow-xl
        hover:border-[var(--brand-primary)]/30
        
        transition-all duration-300 ease-out
        ${className}
      `}
    >
      {/* 1. Contenedor Imagen 
           - Mobile: Ancho completo, altura fija (h-56)
           - Desktop (md+): Ancho fijo (w-48), altura automática (cubre todo el alto)
      */}
      <div className="relative w-full h-56 md:h-auto md:w-48 shrink-0 bg-[var(--bg-tertiary)] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 200px"
        />
      </div>

      {/* 2. Contenedor Texto */}
      <div className="p-6 flex flex-col justify-center space-y-3 flex-grow">
        
        <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors">
          {title}
        </h3>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {description}
        </p>

        {/* Link simulado con icono */}
        <div className="pt-2 flex items-center text-sm font-bold text-[var(--brand-primary)]">
          <span className="group-hover:underline underline-offset-4 decoration-2">
            {linkText}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}