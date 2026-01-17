"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Sparkles } from "lucide-react";

/* =====================================================
   ThemeSwitcher
   - Light / Dark / System
   - Mismo estilo desktop y mobile
   ===================================================== */

export default function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  /* =========================
     Evitar hydration mismatch
     ========================= */
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="flex items-center gap-3">
      {/* =========================
         Theme: Light
         ========================= */}
      <button
        onClick={() => setTheme("light")}
        aria-label="Modo claro"
        className="
          svg-border-btn
          relative
          w-9 h-9

          flex items-center justify-center
          text-[var(--text-primary)]

          transition-all duration-300 ease-out
          hover:bg-[var(--brand-primary-hover)]
          hover:-translate-y-0.5
        "
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect x="1" y="1" width="98" height="98" className="bg-line" />
          <rect x="1" y="1" width="98" height="98" className="hl-line" />
        </svg>

        <span className="icon-wrapper">
          <Sun size={10} strokeWidth={1} />
        </span>
      </button>

      {/* =========================
         Theme: Dark
         ========================= */}
      <button
        onClick={() => setTheme("dark")}
        aria-label="Modo oscuro"
        className="
          svg-border-btn
          relative
          w-9 h-9

          flex items-center justify-center
          text-[var(--text-primary)]

          transition-all duration-300 ease-out
          hover:bg-[var(--brand-primary-hover)]
          hover:-translate-y-0.5
        "
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect x="1" y="1" width="98" height="98" className="bg-line" />
          <rect x="1" y="1" width="98" height="98" className="hl-line" />
        </svg>

        <span className="icon-wrapper">
          <Moon size={10} strokeWidth={1} />
        </span>
      </button>

      {/* =========================
         Theme: System / Custom
         ========================= */}
      <button
        onClick={() => setTheme("system")}
        aria-label="Modo sistema"
        className="
          svg-border-btn
          relative
          w-9 h-9

          flex items-center justify-center
          text-[var(--text-primary)]

          transition-all duration-300 ease-out
          hover:bg-[var(--brand-primary-hover)]
          hover:-translate-y-0.5
        "
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect x="1" y="1" width="98" height="98" className="bg-line" />
          <rect x="1" y="1" width="98" height="98" className="hl-line" />
        </svg>

        <span className="icon-wrapper">
          <Sparkles size={10} strokeWidth={1} />
        </span>
      </button>
    </div>
  );
}
