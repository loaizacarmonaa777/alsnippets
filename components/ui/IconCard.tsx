"use client";

import React from "react";

interface IconCardProps {
  // Aceptamos el componente en sí (ej: la función del SVG), no el elemento renderizado (<Icon />)
  // Usamos 'any' en ElementType para evitar conflictos estrictos con los tipos de tus SVGs
  icon: React.ElementType<any>; 
  title: string;
}

export default function IconCard({ icon: Icon, title }: IconCardProps) {
  return (
    <div
      className="
        group relative 
        bg-[var(--bg-card)]
        rounded-xl 
        p-8 
        flex flex-col items-center justify-center text-center
        min-h-[260px]
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
        {/* Renderizamos el icono y le pasamos la clase para el tamaño y hover */}
        <Icon className="w-12 h-12 transition-transform duration-500 group-hover:scale-110" />
      </div>

      {/* TEXTO */}
      <p className="font-bold text-lg text-[var(--text-primary)] transition-colors duration-300">
        {title}
      </p>
    </div>
  );
}