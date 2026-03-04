import React from "react";
import Link from "next/link";
import Image from "next/image";

interface HorizontalCardProps {
  title: string;
  description: string;
  image?: string; // El "?" lo hace opcional
  href?: string;  // El "?" lo hace opcional
  linkText?: string;
  className?: string;
  target?: string;
}

export default function HorizontalCard({
  title,
  description,
  image,
  href,
  linkText = "¿De qué se trata?",
  className = "",
  target,
}: HorizontalCardProps) {
  
  // Extraemos las clases a una variable para reutilizarlas sea un Link o un Div
  const cardClasses = `
    group relative 
    flex flex-col md:flex-row overflow-hidden
    bg-[var(--bg-card)]
    border border-[var(--border-subtle)]
    rounded-2xl
    shadow-sm
    hover:-translate-y-1
    hover:shadow-xl
    hover:border-[var(--brand-primary)]/30
    transition-all duration-300 ease-out
    ${className}
  `;

  // El contenido interno (Imagen y Textos)
  const CardContent = (
    <>
      {/* 1. Contenedor Imagen (Solo se dibuja si le pasas la prop 'image') */}
      {image && (
        <div className="relative w-full h-56 md:h-auto md:w-48 shrink-0 bg-[var(--bg-tertiary)] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </div>
      )}

      {/* 2. Contenedor Texto */}
      <div className="p-6 flex flex-col justify-center space-y-3 flex-grow text-left">
        
        <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors">
          {title}
        </h3>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {description}
        </p>

        {/* 3. Link simulado con flecha (Solo se muestra si pasas un 'href') */}
        {href && (
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
        )}
      </div>
    </>
  );

  // Si le pasamos un href, renderiza el componente como un enlace real
  if (href) {
    return (
      <Link href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={cardClasses}>
        {CardContent}
      </Link>
    );
  }

  // Si NO le pasamos href (como en tu página de Precios), renderiza un div inerte
  return (
    <div className={cardClasses}>
      {CardContent}
    </div>
  );
}