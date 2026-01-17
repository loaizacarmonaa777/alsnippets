/* =====================================================
   ButtonSecondary
   - Acción secundaria
   - Menos protagonismo que CTA
   ===================================================== */

import Link from "next/link";

interface ButtonSecondaryProps {
  href: string;
  label: string;
}

export default function ButtonSecondary({
  href,
  label,
}: ButtonSecondaryProps) {
  return (
    <Link
      href={href}
      className="
        inline-flex items-center justify-center
        px-5 py-2.5
        rounded-lg
        border
        transition-all duration-300 ease-out

        border-[var(--border-subtle)]
        text-[var(--text-primary)]

        hover:bg-[var(--bg-secondary)]
        hover:-translate-y-0.5

        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--brand-primary)]
      "
    >
      {label}
    </Link>
  );
}
