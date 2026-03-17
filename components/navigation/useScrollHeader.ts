"use client";

import { useEffect, useState } from "react";

/* =====================================================
   useScrollHeader
   - Detecta scroll vertical para efectos de UI
   - Devuelve estado compacto o normal según el offset
   ===================================================== */

export default function useScrollHeader(offset = 40) {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    // Función optimizada para detectar el desplazamiento
    const onScroll = () => {
      setIsCompact(window.scrollY > offset);
    };

    // Uso de listener pasivo para mejorar el rendimiento del scroll (WPO)
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [offset]);

  return isCompact;
}