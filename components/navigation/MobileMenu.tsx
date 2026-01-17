"use client";

import Link from "next/link"; // componente de enlace de Next.js
import { NAV_ITEMS } from "./menu.config"; // contiene la configuración del menú
import ThemeSwitcher from "./ThemeSwitcher"; // sirve importar el componente de cambio de tema
import { ChevronDown } from "lucide-react"; // importa ícono de flecha hacia abajo


/* =====================================================
   MobileMenu
   - Panel deslizable derecha → izquierda
   - Maneja submenús
   - CTA destacado
   ===================================================== */

interface MobileMenuProps {
  isOpen: boolean;
  activeSubmenu: string | null;
  onClose: () => void;
  onToggleSubmenu: (key: string) => void;
}

export default function MobileMenu({
  isOpen,
  activeSubmenu,
  onClose,
  onToggleSubmenu,
}: MobileMenuProps) {
  return (
    <aside
      className={`
        fixed top-0 right-0 z-50
        h-screen w-[75vw] max-w-sm

        bg-[var(--bg-body)]

        shadow-xl
        transform transition-transform duration-300 ease-out motion-reduce:transition-none
        ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-95"}
      `}
    >
      {/* =========================
          Contenedor interno
         ========================= */}
      <div 
        style={{ background: "var(--bg-body)" }}
        className="
          h-full 
          flex flex-col 
          p-6 
          
          bg-[var(--bg-body)]
        "
      >

        {/* =========================
            Navegación principal
           ========================= */}
        <nav className="flex-1 pt-6 space-y-4 text-sm verflow-y-auto">
          {NAV_ITEMS.map((item, index) => {
            const isSubmenu = Boolean(item.children && item.key);
            const isActive = activeSubmenu === item.key;

            return (
              <div
                key={item.label}
                className={`
                  pb-4
                  border-b border-black/10 dark:border-white/10
                  
                  transition-all duration-300 ease-out
                  ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
                `}
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                {/* ===== Item con submenú ===== */}
                {isSubmenu ? (
                  <>
                    <button
                      onClick={() => onToggleSubmenu(item.key!)}
                      className="
                        nav-button-reset  
                        w-full
                        flex justify-between items-center
                        font-medium
                        transition-colors duration-200

                        text-[var(--text-primary)]

                        hover:bg-[var(--brand-primary-hover)]
                        var(--brand-primary-hover)]
                      "
                      aria-expanded={isActive}
                    >
                      {item.label}

                      <span
                        className={`transition-transform duration-300 ease-out ${isActive ? "rotate-180" : "rotate-0"
                          }`}
                      >
                        <ChevronDown size={18} />
                      </span>
                    </button>


                    {/* Submenú */}
                    <div
                      className={`
                        overflow-hidden
                        transition-[max-height,opacity,transform]
                        duration-300 ease-in-out
                        ${isActive
                          ? "max-h-96 opacity-100 translate-y-0 mt-3"
                          : "max-h-0 opacity-0 -translate-y-1"
                        }
                      `}
                    >
                      <div className="pl-4 pt-2 space-y-2">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className="
                              block 
                              px-3 py-2
                              bg-[var(--brand-primary-hover)]
                              border-l-4 border-[var(--brand-primary)]

                              text-sm
                              font-medium
                              text-[var(--text-primary)]

                              transition-transform duration-200 ease-out
                              active:scale-[0.98]
                            "
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  /* ===== Item simple ===== */
                  <Link
                    href={item.href!}
                    onClick={onClose}
                    className="
                      block 
                      py-1
                      font-medium
                      text-[var(--text-primary)]
                      transition-colors duration-200
                      hover:bg-[var(--brand-primary-hover)]
                      hover:text-[var(--text-primary)]
                      active:bg-[var(--brand-primary-hover)]
                    "
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* =========================
    CTA Auditoría (mismo estilo desktop)
   ========================= */}
        <Link
          href="/auditoria"
          onClick={onClose}
          className="
            relative
            mt-8
            block
            text-center

            px-6 py-3
            font-semibold text-sm

            bg-[var(--brand-primary)]
            text-[var(--brand-secondary)]

            overflow-hidden
            group
            shadow-[0_10px_20px_rgba(0,0,0,0.35)]
            transition-all duration-300 ease-out
          "
        >
          Auditoría

          {/* =========================
                Líneas animadas CTA
              ========================= */}

          {/* Top */}
          <span className="cta-line top absolute top-0 left-0 w-full h-[2px] bg-[var(--brand-primary)]" />

          {/* Right */}
          <span className="cta-line right absolute top-0 right-0 w-[2px] h-full bg-[var(--brand-primary)]" />

          {/* Bottom */}
          <span className="cta-line bottom absolute bottom-0 left-0 w-full h-[2px] bg-[var(--brand-primary)]" />

          {/* Left */}
          <span className="cta-line left absolute top-0 left-0 w-[2px] h-full bg-[var(--brand-primary)]" />
        </Link>


        {/* =========================
            Theme switcher
            - Mismos estilos que desktop
            - Botones SVG animados
            ========================= */}
        <div
          className="
            flex
            justify-center
            gap-4
            pt-10
          "
        >
          <ThemeSwitcher />
        </div>

      </div>
    </aside>
  );
}
