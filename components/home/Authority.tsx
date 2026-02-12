import React from "react";

export default function Authority() {
  return (
    <section
      className="
        relative w-full
        /* Padding generoso para dar altura y protagonismo (Grande) */
        py-32 md:py-48
        
        /* Configuración del Fondo y Parallax */
        bg-fixed bg-center bg-cover bg-no-repeat
        
        /* Imágenes Responsivas (Mobile First) */
        bg-[url('/images/home/trabajo-directo-sin-intermediarios-home-mobile.webp')]
        md:bg-[url('/images/home/trabajo-directo-sin-intermediarios-home-desktop.webp')]
      "
    >
      {/* Nota: Como tu imagen ya es oscura, no agregamos un div de overlay negro.
         Renderizamos directamente el contenido.
      */}
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          
          <h2 className="text-3xl md:!text-6xl !text-[var(--text-white1)] !leading-tight tracking-tight">
            Trabajo directo, sin intermediarios
          </h2>

          <div className="space-y-6 md:text-xl text-neutral-100 font-light leading-relaxed">
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