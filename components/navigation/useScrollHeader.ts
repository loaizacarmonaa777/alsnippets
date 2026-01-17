"use client";

import { useEffect, useState } from "react";

/* =====================================================
   useScrollHeader
   - Detecta scroll vertical
   - Devuelve estado compacto o normal
   ===================================================== */

export default function useScrollHeader(offset = 40) {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsCompact(window.scrollY > offset);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [offset]);

  return isCompact;
}
