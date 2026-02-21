"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Asegúrate de que las rutas sean correctas según tu estructura
import TopBar from "./TopBar";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import MenuOverlay from "./MenuOverlay";
import useScrollHeader from "./useScrollHeader"; // Ajusta el path si es necesario

export default function MainNav() {
  /* =========================
     Estados globales
     ========================= */
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  
  // Hook para detectar scroll (true si bajamos > 50px)
  const isCompact = useScrollHeader();

  /* =========================
     Estado idioma (client-only)
     ========================= */
  const [altLanguage, setAltLanguage] = useState<string>("EN");

  useEffect(() => {
    // Solo ejecutamos esto en el cliente para evitar errores de hidratación
    if (typeof window !== "undefined") {
      const lang = navigator.language || "";
      setAltLanguage(lang.startsWith("es") ? "EN" : "ES");
    }
  }, []);

  /* =========================
     Bloquear scroll al abrir menú
     ========================= */
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setActiveSubmenu(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  /* =========================
     Handlers
     ========================= */
  const closeMenu = () => setIsMenuOpen(false);
  
  const toggleSubmenu = (key: string) => {
    setActiveSubmenu((prev) => (prev === key ? null : key));
  };

  return (
    <>
      {/* TopBar (Desktop Only)
         Nota: Si sigues viendo cuadros negros, asegúrate de haber actualizado
         el archivo TopBar.tsx con el código que te di en la respuesta anterior.
      */}
      <TopBar />

      <header
        className={`
          sticky top-0 z-50
          transition-all duration-300 ease-out
          border-b border-transparent
          /* FONDO DINÁMICO CON VARIABLES */
          bg-[var(--bg-primary)]/80 
          backdrop-blur-md
          supports-[backdrop-filter]:bg-[var(--bg-primary)]/60
          
          /* Sombra suave al hacer scroll */
          ${isCompact ? "shadow-sm border-[var(--border-subtle)]" : "shadow-none"}
        `}
      >
        <div
          className={`
            max-w-6xl mx-auto px-6
            flex items-center justify-between
            transition-all duration-300 ease-out
            ${isCompact ? "h-16" : "h-20"}
          `}
        >

          {/* =========================
              LOGO
             ========================= */}
          <Link
            href="/"
            className="flex items-center transition-transform duration-300 ease-out hover:opacity-90"
            onClick={closeMenu}
          >
            {/* Logo Light */}
            <img
              src="/brand/logo-light.svg"
              alt="Alsnippets Logo"
              className={`
                block dark:hidden w-auto transition-all duration-300
                ${isCompact ? "h-8" : "h-10"}
              `}
            />

            {/* Logo Dark */}
            <img
              src="/brand/logo-dark.svg"
              alt="Alsnippets Logo"
              className={`
                hidden dark:block w-auto transition-all duration-300
                ${isCompact ? "h-8" : "h-10"}
              `}
            />
          </Link>

          {/* =========================
              ACCIONES MOBILE (Derecha)
             ========================= */}
          <div className="flex items-center gap-3 md:hidden">
            
            {/* Botón Idioma Mobile */}
            <button
              type="button"
              aria-label="Cambiar idioma"
              className="
                w-9 h-9 flex items-center justify-center rounded-full
                text-sm font-bold
                text-[var(--text-primary)]
                bg-[var(--bg-tertiary)]
                hover:bg-[var(--brand-primary)]
                hover:text-white
                transition-all duration-300
              "
            >
              {altLanguage}
            </button>

            {/* Botón Hamburguesa */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              className={`
                relative w-10 h-10 flex items-center justify-center rounded-md
                text-[var(--text-primary)]
                hover:bg-[var(--bg-secondary)]
                transition-all duration-300
              `}
            >
              {/* Icono Hamburguesa / X (SVG simple para evitar dependencias) */}
              <svg 
                className={`w-7 h-7 transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* =========================
              MENÚ DESKTOP
             ========================= */}
          <div className="hidden md:block">
            <DesktopMenu />
          </div>

        </div>
      </header>

      {/* =========================
          Overlay & Menú Mobile
         ========================= */}
      <MenuOverlay isOpen={isMenuOpen} onClose={closeMenu} />
      
      <MobileMenu
        isOpen={isMenuOpen}
        activeSubmenu={activeSubmenu}
        onClose={closeMenu}
        onToggleSubmenu={toggleSubmenu}
      />
    </>
  );
}