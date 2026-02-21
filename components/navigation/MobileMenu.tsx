"use client";

import Link from "next/link";
import { NAV_ITEMS } from "./menu.config";
import ThemeSwitcher from "./ThemeSwitcher"; 
import { ChevronDown } from "lucide-react";

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
    <>
      {/* Overlay */}
      <div 
        className={`
          fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        onClick={onClose}
      />

      <aside
        className={`
          fixed top-0 right-0 z-50
          h-screen w-[85vw] max-w-sm
          bg-[var(--bg-primary)] 
          border-l border-[var(--border-subtle)]
          shadow-2xl
          transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col p-6 overflow-y-auto">
          
          {/* Cabecera / Botón Cerrar */}
          <div className="flex justify-end mb-6">
             <button 
               onClick={onClose} 
               className="p-2 text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-full transition-colors"
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
             </button>
          </div>

          {/* Navegación */}
          <nav className="flex-1 space-y-3">
            {NAV_ITEMS.map((item, index) => {
              const isSubmenu = Boolean(item.children && item.key);
              const isActive = activeSubmenu === item.key;

              return (
                <div
                  key={item.label}
                  className={`
                    transition-all duration-500 ease-out
                    ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                  `}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {isSubmenu ? (
                    <div className="overflow-hidden rounded-lg transition-all duration-300">
                      {/* Botón Padre (Estilo Bloque con Fondo) */}
                      <button
                        onClick={() => onToggleSubmenu(item.key!)}
                        className={`
                          w-full flex justify-between items-center px-4 py-3 rounded-lg text-base font-medium
                          transition-all duration-200
                          ${isActive 
                            ? "bg-[var(--brand-primary-hover)] text-[var(--text-primary)]" 
                            : "text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                          }
                        `}
                        aria-expanded={isActive}
                      >
                        {item.label}
                        <ChevronDown 
                          size={18} 
                          className={`transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                        />
                      </button>

                      {/* Submenú */}
                      <div
                        className={`
                          overflow-hidden transition-all duration-300 ease-in-out
                          ${isActive ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"}
                        `}
                      >
                        <div className="flex flex-col space-y-1 pl-4 border-l-2 border-[var(--border-subtle)] ml-2">
                          {item.children!.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={onClose}
                              className="
                                block px-4 py-2 rounded-md text-sm font-medium
                                text-[var(--text-secondary)]
                                /* Hover: Fondo suave + Cambio de color */
                                hover:bg-[var(--bg-tertiary)] 
                                hover:text-[var(--brand-primary)]
                                transition-all duration-200
                              "
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Enlace Simple (Estilo Bloque con Fondo) */
                    <Link
                      href={item.href!}
                      onClick={onClose}
                      className="
                        block px-4 py-3 rounded-lg text-base font-medium
                        text-[var(--text-primary)]
                        hover:bg-[var(--bg-tertiary)]
                        active:bg-[var(--brand-primary-hover)]
                        transition-colors duration-200
                      "
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer del Menú */}
          <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] space-y-6">
            <Link
              href="/auditoria"
              onClick={onClose}
              className="
                w-full flex items-center justify-center py-3 px-6 rounded-lg
                font-bold text-white
                bg-[var(--brand-primary)]
                shadow-md hover:shadow-lg
                active:scale-95 transition-all duration-200
              "
            >
              Solicitar Auditoría
            </Link>

            <div className="flex justify-center">
              <ThemeSwitcher />
            </div>
          </div>

        </div>
      </aside>
    </>
  );
}