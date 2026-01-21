"use client";

import React from "react";

/* =====================================================
   SocialIcon
   - Wrapper genérico para iconos SVG
   - Centraliza hover, glow y scale
   - Usa currentColor
   ===================================================== */

type SocialIconProps = {
  children: React.ReactNode;
  href?: string;
  label: string;
  className?: string;
};

export default function SocialIcon({
  children,
  href,
  label,
  className = "",
}: SocialIconProps) {
  const content = (
    <span
      className={`
        inline-flex
        items-center
        justify-center

        w-11 h-11
        rounded-xl

        text-[var( --text-white)]

        transition-all duration-300 ease-out
        hover:text-[var(--brand-primary)]
        hover:scale-110
        hover:shadow-[0_0_18px_rgba(201,163,78,0.55)]

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--brand-primary)]

        ${className}
      `}
      aria-label={label}
    >
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return content;
}
