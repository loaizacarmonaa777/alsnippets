"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Sparkles } from "lucide-react";

/* =====================================================
   ThemeSwitcher (Versión Simplificada y Estable)
   - Funciona en Desktop y Mobile
   - Sin cuadros negros ni SVGs rotos
   ===================================================== */

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  /* Evitar hydration mismatch */
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-3">
      
      {/* =========================
          Theme: Light
         ========================= */}
      <button
        onClick={() => setTheme("light")}
        aria-label="Modo claro"
        className={`
          button-topbar
          ${theme === 'light' ? 'text-[var(--brand-primary)] bg-[var(--brand-primary-hover)]' : ''}
        `}
      >
        {/* Icono directo, sin wrapper complejo */}
        <Sun size={20} strokeWidth={2} />
      </button>

      {/* =========================
          Theme: Dark
         ========================= */}
      <button
        onClick={() => setTheme("dark")}
        aria-label="Modo oscuro"
        className={`
          button-topbar
          ${theme === 'dark' ? 'text-[var(--brand-primary)] bg-[var(--brand-primary-hover)]' : ''}
        `}
      >
        <Moon size={20} strokeWidth={2} />
      </button>

      {/* =========================
          Theme: System / Custom
         ========================= */}
      <button
        onClick={() => setTheme("system")}
        aria-label="Modo sistema"
        className={`
          button-topbar
          ${theme === 'system' ? 'text-[var(--brand-primary)] bg-[var(--brand-primary-hover)]' : ''}
        `}
      >
        <Sparkles size={20} strokeWidth={2} />
      </button>

    </div>
  );
}