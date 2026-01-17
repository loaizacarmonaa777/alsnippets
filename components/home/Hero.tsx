"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* =====================================================
   Hero — Home (Carousel)
   - Full width real (100vw sin overflow)
   - Altura 80vh
   - Animación vertical elegante
   - Sin imágenes (por ahora)
   ===================================================== */

type Slide = {
  title: string;
  subtitle: string;
};

const slides: Slide[] = [
  {
    title: "Tu WordPress al 100%",
    subtitle:
      "Auditorías técnicas reales, optimización profunda y soluciones claras para que tu sitio funcione como debe.",
  },
  {
    title: "Preformateado de texto",
    subtitle:
      "Sección pensada para SEO, desarrolladores y programadores. Texto funcional, limpio y optimizado para humanos y máquinas.",
  },
  {
    title: "Un QR con toda tu información de contacto",
    subtitle:
      "Contribuimos al cuidado del medio ambiente. Reemplaza tarjetas impresas por un QR virtual con toda tu información. Pregúntame cómo.",
  },
];

export default function Hero() {
  /* =========================
     Estado del carousel
     ========================= */
  const [currentSlide, setCurrentSlide] = useState(0);
  const previousSlide = useRef(0);

  /* =========================
     Autoplay del carousel
     - Guarda el slide anterior
     ========================= */
  useEffect(() => {
    const interval = setInterval(() => {
      previousSlide.current = currentSlide;

      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    /* =====================================================
       Hero — Wrapper estructural
       ===================================================== */
    <section
      className="
        relative
        left-1/2 right-1/2
        -ml-[50vw] -mr-[50vw]
        w-screen
        h-[80vh]
        overflow-hidden
      "
    >
      {/* =====================================================
         Slides
         ===================================================== */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`
            absolute inset-0
            flex items-center justify-center
            transition-all duration-700
            ${
              index === currentSlide
                ? "opacity-100 translate-y-0 scale-100 ease-out"
                : index === previousSlide.current
                ? "opacity-0 -translate-y-12 scale-95 ease-in pointer-events-none"
                : "opacity-0 translate-y-12 scale-95 pointer-events-none"
            }
          `}
        >
          {/* Fondo neutro */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-900" />

          {/* Contenido */}
          <div className="relative z-10 max-w-4xl px-6 text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {slide.title}
            </h1>

            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              {slide.subtitle}
            </p>

            <div className="pt-4">
              <Link
                href="/auditoria"
                className="
                  inline-block
                  px-6 py-4
                  font-semibold
                  border
                  transition-all duration-300
                  hover:bg-white hover:text-black
                "
              >
                Auditoría WordPress
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* =====================================================
         Dots de navegación
         ===================================================== */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              previousSlide.current = currentSlide;
              setCurrentSlide(index);
            }}
            className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${
                index === currentSlide
                  ? "bg-[var(--brand-primary)] scale-110"
                  : "bg-white/30 hover:bg-white/60"
              }
            `}
            aria-label={`Ir al slide ${index + 1}`}
          />

        ))}
      </div>
    </section>
  );
}
