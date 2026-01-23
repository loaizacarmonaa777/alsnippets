"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* =====================================================
   Hero — Home (Carousel con imágenes)
   ===================================================== */

type Slide = {
  title: string;
  subtitle: string;
  imageDesktop: string;
  imageMobile: string;
  titleColor?: string;
  subtitleColor?: string;

  ctaText: string;
  ctaHref: string;
  ctaClass?: string;
};

const slides: Slide[] = [
  {
    title: "Tu WordPress al 100%",
    subtitle:
      "Auditorías técnicas reales, optimización profunda y soluciones claras para que tu sitio funcione como debe.",
    imageDesktop: "/images/home/hero-home-desktop.webp",
    imageMobile: "/images/home/hero-home-mobile.webp",
    titleColor: "var(--text-white1)",
    subtitleColor: "var(--text-white1)",

    ctaText: "Auditoría WordPress",
    ctaHref: "/auditoria",
    ctaClass: "button-home-dark",
  },
  {
    title: "Preformateado de texto",
    subtitle:
      "Sección pensada para SEO, desarrolladores y programadores. Texto funcional, limpio y optimizado para humanos y máquinas.",
    imageDesktop: "/images/home/hero-home-desktop-seo-geo.webp",
    imageMobile: "/images/home/hero-home-mobile-seo-geo.webp",

    ctaText: "Ver Suite Text",
    ctaHref: "/suite-text",
    ctaClass: "button-home-light",
  },
  {
    title: "Un QR con toda tu información de contacto",
    subtitle:
      "Contribuimos al cuidado del medio ambiente. Reemplaza tarjetas impresas por un QR virtual con toda tu información.",
    imageDesktop: "/images/home/hero-home-desktop-qr.webp",
    imageMobile: "/images/home/hero-home-mobile-qr.webp",

    ctaText: "Contacto",
    ctaHref: "/contacto",
    ctaClass: "button-home-light",
  },
];




export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const previousSlide = useRef(0);

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
    <section
      className="
        relative
        left-1/2 right-1/2
        -ml-[50vw] -mr-[50vw]
        w-screen
        h-[90vh]
        overflow-hidden
      "
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`
            absolute inset-0
            flex items-center justify-center
            transition-all duration-700
            ${index === currentSlide
              ? "opacity-100 translate-y-0 scale-100 ease-out"
              : index === previousSlide.current
                ? "opacity-0 -translate-y-12 scale-95 ease-in pointer-events-none"
                : "opacity-0 translate-y-12 scale-95 pointer-events-none"
            }
          `}
        >
          {/* =========================
             Imagen Desktop
             ========================= */}
          <div
            className="
              absolute inset-0
              hidden md:block
              bg-cover bg-center
            "
            style={{
              backgroundImage: `url(${slide.imageDesktop})`,
            }}
          />

          {/* =========================
             Imagen Mobile
             ========================= */}
          <div
            className="
              absolute inset-0
              md:hidden
              bg-cover bg-center
            "
            style={{
              backgroundImage: `url(${slide.imageMobile})`,
            }}
          />

          {/* Overlay para legibilidad 
          <div className="absolute inset-0 bg-black/40" />
          */}


          {/* =========================
             Contenido
             ========================= */}
          <div className="relative z-10 max-w-4xl px-6 text-center space-y-6">
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight"
              style={{
                color: slide.titleColor,
              }}
            >
              {slide.title}
            </h1>


            <p
              className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto"
              style={{
                color: slide.subtitleColor,
              }}
            >
              {slide.subtitle}
            </p>


            <div className="pt-4">
              <Link
                href={slide.ctaHref}
                className={slide.ctaClass}
              >
                {slide.ctaText}
              </Link>
            </div>

          </div>
        </div>
      ))}

      {/* =========================
   Flecha izquierda
   ========================= */}
      <button
        onClick={() => {
          previousSlide.current = currentSlide;
          setCurrentSlide(
            currentSlide === 0 ? slides.length - 1 : currentSlide - 1
          );
        }}
        className={`
          hero-arrow
          hero-arrow-left
          ${slides[currentSlide].titleColor ?? ""}
        `}
        aria-label="Slide anterior"
      >
        ‹
      </button>

      {/* =========================
   Flecha derecha
   ========================= */}
      <button
        onClick={() => {
          previousSlide.current = currentSlide;
          setCurrentSlide(
            currentSlide === slides.length - 1 ? 0 : currentSlide + 1
          );
        }}
        className={`
          hero-arrow
          hero-arrow-right
          ${slides[currentSlide].titleColor ?? ""}
        `}
        aria-label="Slide siguiente"
      >
        ›
      </button>


      {/* =========================
   Dots
   ========================= */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
        <div className="hero-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                previousSlide.current = currentSlide;
                setCurrentSlide(index);
              }}
              className={`hero-dot ${index === currentSlide ? "hero-dot-active" : ""
                }`}
              aria-label={`Ir al slide ${index + 1}`}
              aria-current={index === currentSlide ? "true" : "false"}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
