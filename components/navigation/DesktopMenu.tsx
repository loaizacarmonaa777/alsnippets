"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { NAV_ITEMS } from "./menu.config";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";


/* =====================================================
   DesktopMenu
   - Dropdowns estables (sin hover gap)
   - UX premium
   ===================================================== */

export default function DesktopMenu() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();


  /* =========================
     Cleanup
     ========================= */
  useEffect(() => {
    return () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }
    };
  }, []);

  /* =========================
     Helpers
     ========================= */
  const openMenu = (key: string) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setOpenDropdown(key);
  };

  const closeMenuWithDelay = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 120);
  };

  return (
    <nav className="hidden md:flex items-center gap-5 text-sm">
      {NAV_ITEMS.map((item) => {
        const isDropdown = Boolean(item.children && item.key);
        const isOpen = openDropdown === item.key;
        if (item.key === "home" || item.href === "/") {
          return null;
        }

        /* =========================
           ITEM CON DROPDOWN SERVICIOS Y PROYECTOS
           ========================= */
        if (isDropdown) {
          return (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => openMenu(item.key!)}
              onMouseLeave={closeMenuWithDelay}
            >
              {/* =========================
                  Trigger
                  ========================= */}
              <button
                type="button"
                aria-expanded={isOpen}
                className={`
                  nav-button-reset
                  nav-item
                  relative
                  flex items-center gap-1
                  text-sm font-medium
                  text-[var(--text-primary)]
                  hover:bg-[var(--brand-primary-hover)]
                  ${item.key && pathname.includes(`/${item.key}`)
                    ? "nav-item-active"
                    : ""
                  }
                `}
              >
                {/* =========================
                    Contenido visible (texto + icono)
                    ========================= */}
                <span className="relative z-10">
                  {item.label}
                </span>
                <span
                  className="
                    relative z-10
                    flex items-center justify-center
                    leading-none
                  "
                >
                  <ChevronDown
                    size={13}
                    className={`
                      transition-transform duration-300
                      ${isOpen ? "rotate-180" : ""}
                    `}
                  />
                </span>

                {/* =========================
                    SVG borde animado
                    ========================= */}
                <svg
                  viewBox="0 0 120 40"
                  preserveAspectRatio="none"
                  className="absolute inset-0 pointer-events-none"
                >
                  <rect
                    x="1"
                    y="1"
                    width="118"
                    height="38"
                    className="bg-line"
                  />
                  <rect
                    x="1"
                    y="1"
                    width="118"
                    height="38"
                    className="hl-line"
                  />
                </svg>
              </button>

              {/* Dropdown */}
              <div
                className={`
                  absolute left-0 top-full mt-3
                  min-w-[260px]
                  
                  bg-[var(--bg-primary)]
                  shadow-[0_20px_40px_rgba(0,0,0,0.12)]
                  ring-1 ring-black/5

                  transition-all duration-200 ease-out
                  ${isOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                  }
                `}
              >
                <div className="p-5 space-y-1">
                  {item.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="
                        group
                        block
                        pl-3 pr-3 py-2
                        border-l-3 border-transparent
                        hover:border-[var(--brand-primary)]

                        text-sm
                        text-[var(--text-secondary)]

                        transition-all duration-200 ease-out
                        hover:bg-[var(--brand-primary-hover)]
                        hover:text-[var(--text-primary)]
                        hover:translate-x-2

                        focus:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[var(--brand-primary)]
                      "

                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        /* =========================
           ITEM SIMPLE
           ========================= */
        return (
          <Link
            href={item.href!}
            className={`
              nav-item
              text-sm font-medium
              text-[var(--text-primary)]
              transition-colors duration-300
              ${pathname === item.href ? "nav-item-active" : ""}
            `}
          >
            <span className="relative z-10">{item.label}</span>

            <svg viewBox="0 0 100 40" preserveAspectRatio="none">
              <rect x="1" y="1" width="98" height="38" className="bg-line" />
              <rect x="1" y="1" width="98" height="38" className="hl-line" />
            </svg>
          </Link>

        );
      })}

      {/* =========================
          CTA Auditoría — animado
          ========================= */}
      <Link
        href="/auditoria"
        className="
          relative ml-6
          px-6 py-3
          font-semibold text-sm

          bg-[var(--brand-primary)]
          text-[var(--brand-secondary)]

          overflow-hidden
          group

          transition-all duration-300 ease-out

          hover:bg-[var(--brand-secondary)]
          hover:text-white
          hover:scale-[1.06]
          hover:shadow-[0_10px_20px_rgba(0,0,0,0.35)]
          hover:text-[var(--text-primary)]
        "

      >
        {/* Texto */}
        <span className="relative z-10">
          Auditoría
        </span>

        {/* =========================
            Borde animado
            ========================= */}
        <span className="cta-line top"></span>
        <span className="cta-line right"></span>
        <span className="cta-line bottom"></span>
        <span className="cta-line left"></span>
      </Link>


    </nav >
  );
}
