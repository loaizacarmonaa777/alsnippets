"use client";

import React from "react";
import Link from "next/link"; // Importamos Link para poder usar el href

interface IconCardProps {
  icon: React.ElementType<any>; 
  title: string;
  // Añadimos description y href como opciones (el "?" significa que son opcionales)
  description?: string;
  href?: string;
}

export default function IconCard({ icon: Icon, title, description, href }: IconCardProps) {
  // 1. Guardamos el diseño de la tarjeta en una variable
  const cardContent = (
    <div
      className="
        group relative 
        bg-[var(--bg-card)]
        rounded-xl 
        p-8 
        flex flex-col items-center justify-center text-center
        min-h-[260px]
        h-full
        shadow-sm
        border border-[var(--border-subtle)]
        
        transition-all duration-500 ease-in-out
        hover:-translate-y-2 
        hover:shadow-xl
        hover:border-[var(--brand-primary)]/30
      "
    >
      {/* CÍRCULO DEL ICONO */}
      <div className="
        mb-6 
        w-24 h-24 
        rounded-full 
        flex items-center justify-center
        transition-all duration-500 ease-in-out
        
        bg-[var(--bg-tertiary)] 
        text-[var(--brand-primary)]
        
        group-hover:bg-[var(--brand-primary)] 
        group-hover:text-white
      ">
        <Icon className="w-12 h-12 transition-transform duration-500 group-hover:scale-110" />
      </div>

      {/* TÍTULO */}
      <p className="font-bold text-lg text-[var(--text-primary)] transition-colors duration-300">
        {title}
      </p>

      {/* DESCRIPCIÓN (Solo se renderiza si la envías desde el componente padre) */}
      {description && (
        <p className="mt-3 text-sm text-[var(--text-secondary)] opacity-90 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );

  // 2. Si el componente recibe un enlace (href), envolvemos la tarjeta para que sea clickeable
  if (href) {
    return (
      <Link href={href} className="block h-full outline-none">
        {cardContent}
      </Link>
    );
  }

  // 3. Si no recibe enlace, simplemente mostramos la tarjeta normal
  return cardContent;
}