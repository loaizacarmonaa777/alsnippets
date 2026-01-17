/* =====================================================
   ButtonCTA
   - Botón principal de acción
   - Usado para Auditoría / Contacto clave
   - Diseño premium, claro y accesible
   ===================================================== */

import Link from "next/link";

interface ButtonCTAProps {
  href: string;
  label: string;
}

export default function ButtonCTA({ href, label }: ButtonCTAProps) {
  return (
    <Link
      href={href}
      className="
        inline-flex items-center justify-center
        px-6 py-3
        rounded-lg
        font-semibold

        /* Colorimetría */
        bg-[var(--brand-primary)]
        text-black

        /* Microinteracciones */
        micro-lift
        shadow-[var(--shadow-md)]
        hover:shadow-[var(--shadow-lg)]

        /* Transiciones */
        transition-all duration-300 ease-out

        /* Focus accesible */
        micro-focus
      "
    >
      {label}
    </Link>
  );
}
