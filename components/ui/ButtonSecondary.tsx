/* =====================================================
   ButtonSecondary
   - Acción secundaria / Estilo sobrio
   - PROTOCOLO ALSNIPPETS: Blindaje visual y de rutas
   ===================================================== */

import Link from 'next/link'

interface ButtonSecondaryProps {
  href: string
  label: string
  lang: string // <-- Prop obligatoria para rutas multi-idioma
}

export default function ButtonSecondary ({
  href,
  label,
  lang
}: ButtonSecondaryProps) {
  // Lógica de Enrutamiento (Lógica Sensible Blindada)
  // Normalizamos el path para evitar duplicación de /[lang]
  const cleanPath = href.startsWith(`/${lang}`) 
    ? href 
    : `/${lang}${href.startsWith('/') ? '' : '/'}${href}`;

  return (
    <Link
      href={cleanPath}
      className='
        inline-flex items-center justify-center
        px-5 py-2.5
        rounded-lg
        border
        transition-all duration-300 ease-out

        /* Colorimetría Dinámica (Blindaje Visual) */
        border-[var(--border-1)]
        text-[var(--text-2)]
        bg-[var(--bg-1)]

        /* Microinteracciones */
        hover:bg-[var(--bg-2)]
        hover:text-[var(--text-1)]
        hover:border-[var(--border-brand)]
        hover:-translate-y-0.5
        hover:shadow-[var(--shadow-1)]

        /* Focus accesible con el anillo corporativo */
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--focus-ring)]
      '
    >
      {label}
    </Link>
  )
}