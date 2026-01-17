"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import TopBar from "./TopBar";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import MenuOverlay from "./MenuOverlay";
import useScrollHeader from "./useScrollHeader";



/* =====================================================
   MainNav
   - Orquestador del menú
   - Controla estados globales
   - Header sticky
   ===================================================== */
export default function MainNav() {
  /* =========================
     Estados globales
     ========================= */
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const isCompact = useScrollHeader();

  /* =========================
   Estado idioma (client-only)
   ========================= */
  const [altLanguage, setAltLanguage] = useState<string>("EN");

  /* =========================
   Detectar idioma navegador
   ========================= */
  useEffect(() => {
    const lang = navigator.language || "";
    setAltLanguage(lang.startsWith("es") ? "EN" : "ES");
  }, []);


  /* =========================
     Lock / unlock scroll
     ========================= */
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setActiveSubmenu(null); // cerramos submenús al cerrar
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  /* =========================
     Handlers
     ========================= */
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleSubmenu = (key: string) => {
    setActiveSubmenu((prev) => (prev === key ? null : key));
  };

  /* =========================
     Render
     ========================= */
  return (
    <>
      {/* =========================
          TopBar → desktop
          Header → mobile + desktop
         ========================= */}

      {/* Barra superior (desktop) */}
      <TopBar />

      <header
        className={`
          sticky top-0 z-50
          transition-all duration-300 ease-out
          shadow-md
          ${isCompact
            ? "bg-white/95 dark:bg-neutral-500/95 backdrop-blur-lg"
            : "bg-white/80 dark:bg-neutral-500/80 backdrop-blur-md"
          }
        `}
      >
        <div
          className={`
            max-w-6xl mx-auto
            px-6
            flex items-center justify-between
            transition-all duration-300 ease-out
            ${isCompact ? "h-14" : "h-20"}
          `}
        >

          {/* =====================================================
              Logo — Branding principal
              - Light / Dark
              - Preparado para sticky
              ===================================================== */}
          <Link
            href="/"
            className="
              flex items-center
              transition-transform duration-300 ease-out
            "
          >
            {/* Logo Light */}
            <img
              src="/brand/logo-light.svg"
              alt="Alsnippets"
              className={`
                block dark:hidden
                w-auto
                transition-all duration-300 ease-out
                ${isCompact ? "h-8" : "h-10"}
              `}
            />

            {/* Logo Dark */}
            <img
              src="/brand/logo-dark.svg"
              alt="Alsnippets"
              className={`
                hidden dark:block
                w-auto
                transition-all duration-300 ease-out
                ${isCompact ? "h-8" : "h-10"}
              `}
            />
          </Link>


          {/* =========================
              Acciones derecha (mobile)
             ========================= */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Idioma (placeholder) */}
            <button
              type="button"
              aria-label="Cambiar idioma"
              className="
                

                w-9 h-9
                flex items-center justify-center
                rounded-full

                text-sm font-medium
                text-[var(--text-primary)]

                transition-all duration-300 ease-out
                hover:bg-[var(--brand-primary-hover)]
                hover:scale-105
              "
            >
              {altLanguage}
            </button>

            {/* Hamburguesa */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Abrir menú"
              className={`
                nav-button-reset
                ml-2
                text-3xl
                font-bold
                text-[var(--brand-primary)]

                transition-transform duration-300 ease-out
                ${isMenuOpen ? "rotate-90 scale-110" : "rotate-0 scale-100"}
              `}
            >
              ☰
            </button>

          </div>

          {/* =========================
              Menú desktop
              ========================= */}
          <DesktopMenu />

        </div>
      </header>

      {/* =========================
          Overlay (mobile)
         ========================= */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={closeMenu}
      />

      {/* =========================
          Mobile Menu (slide-in)
         ========================= */}
      <MobileMenu
        isOpen={isMenuOpen}
        activeSubmenu={activeSubmenu}
        onClose={closeMenu}
        onToggleSubmenu={toggleSubmenu}
      />
    </>
  );
}
