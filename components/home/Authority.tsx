"use client";

import React from "react";

export default function Authority() {
  return (
    <section
      className="
        relative w-full
        /* Padding vertical generoso */
        py-32 md:py-48
        
        /* Configuración del Fondo */
        bg-center bg-cover bg-no-repeat
        
        /* Parallax: Scroll normal en móvil (mejor rendimiento), Fixed en desktop */
        bg-scroll md:bg-fixed
        
        /* Imágenes Responsivas */
        bg-[url('/images/home/trabajo-directo-sin-intermediarios-home-mobile.webp')]
        md:bg-[url('/images/home/trabajo-directo-sin-intermediarios-home-desktop.webp')]
      "
    >
      {/* Nota: Asumimos que la imagen es oscura. 
        Si la imagen fuera clara, necesitarías un <div className="absolute inset-0 bg-black/50" /> 
      */}
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* TÍTULO
              Forzamos color blanco porque el fondo es una imagen oscura.
              No usamos variables de tema aquí porque el contraste depende de la imagen, no del modo Light/Dark.
          */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-8 text-white tracking-tight">
            Trabajo directo, sin intermediarios
          </h2>

          {/* TEXTO
              Usamos blanco con un poco de transparencia (opacity-90) para jerarquía visual
              en lugar de un gris específico.
          */}
          <div className="space-y-6 text-lg md:text-xl text-white/90 font-light leading-relaxed">
            <p>
              No soy una agencia ni delego tu proyecto. Trabajo directamente contigo,
              analizando tu WordPress, resolviendo problemas reales y proponiendo
              soluciones claras basadas en experiencia técnica.
            </p>

            <p>
              Si algo no vale la pena hacerlo, te lo digo. Si algo se puede optimizar
              mejor, lo hago yo mismo.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}