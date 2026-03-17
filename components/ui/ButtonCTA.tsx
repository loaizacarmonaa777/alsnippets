/* =====================================================
   ButtonCTA
   - Botón de acción principal reutilizable
   - PROTOCOLO ALSNIPPETS: Blindaje visual y de rutas
   ===================================================== */

import Link from 'next/link'

interface ButtonCTAProps {
  href: string
  label: string
  lang: string // <-- OBLIGATORIO para consistencia i18n
}

export default function ButtonCTA ({ href, label, lang }: ButtonCTAProps) {
  // Lógica de Enrutamiento (Lógica Sensible Blindada)
  // Evitamos la duplicación de segmentos /[lang] si el href ya lo contiene
  const cleanPath = href.startsWith(`/${lang}`) ? href : `/${lang}${href.startsWith('/') ? '' : '/'}${href}`;

  return (
    <Link
      href={cleanPath}
      className="
        inline-flex items-center justify-center
        px-6 py-3
        rounded-lg
        font-semibold

        /* Colorimetría (Blindaje Visual) */
        bg-[var(--bg-brand)]
        text-[var(--text-inverse)]

        /* Microinteracciones y Sombras */
        shadow-[var(--shadow-1)]
        hover:shadow-[var(--shadow-brand-glow)]
        hover:-translate-y-0.5 

        /* Transiciones */
        transition-all duration-300 ease-out

        /* Bordes */
        border border-transparent
        hover:border-[var(--border-brand)]
      "
    >
      {label}
    </Link>
  )
}