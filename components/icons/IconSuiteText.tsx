"use client";

import { motion } from "framer-motion";

export default function IconSuiteText({ className }: { className?: string }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-3 -5 50 54"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* CAPA 1: Hoja Trasera (_hoja2) - Flota lento */}
      <motion.path
        d="M32.87,7.46l.55-2.27L9.68.77S8.18,18.45.77,31.86l15.17,2.75"
        animate={{ y: [0, -1.5, 0], rotate: [0, -1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* CAPA 2: Hoja Delantera (_hoja1) - Flota un poco más rápido */}
      <motion.path
        d="M35.02,7.11l-23.68,4.42s2.64,23.82,8.56,31.8l23.6-4.85s-7.77-16.33-8.49-31.38Z"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />

      {/* CAPA 3: Líneas de Texto - Escalan suavemente (Efecto respiración) */}
      <motion.g
        animate={{ scaleX: [1, 0.9, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "20px" }} // Punto de anclaje aproximado al inicio de las líneas
      >
        <line x1="17.62" y1="19.02" x2="32.24" y2="15.6" />
        <line x1="19.25" y1="23.31" x2="33.43" y2="19.79" />
        <line x1="20.39" y1="27.67" x2="29.11" y2="25.51" />
        <line x1="22.19" y1="32.35" x2="28.33" y2="30.78" />
      </motion.g>
    </motion.svg>
  );
}