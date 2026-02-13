"use client";

import { motion } from "framer-motion";

export default function IconCasosExito({ className }: { className?: string }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-3 -5 50 54" // Aumenté un poco el ViewBox vertical para evitar recortes al flotar
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* GRUPO 1: Puesto Tres (Izquierda) - Sube y baja */}
      <motion.polyline
        points="16.34 18.74 1 18.74 1 42.26 5.33 42.26"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* GRUPO 2: Puesto Dos (Derecha) - Sube y baja con retraso */}
      <motion.polyline
        points="37.3 42.28 41.78 42.28 41.78 22.39 26.9 22.39"
        animate={{ y: [0, -1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* GRUPO 3: Puesto Uno (Centro/Flecha) - Flota y escala ligeramente */}
      <motion.path
        d="M5.33,42.29s32.09,0,31.99,0c-11.11-10.37-12.12-30.51-12.12-30.51h6.4L21.33,1l-10.88,10.64h6.87s-1.41,22.09-11.99,30.65Z"
        animate={{ y: [0, -3, 0], scale: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        style={{ originY: "100%", originX: "50%" }} // Anclaje abajo centro
      />
    </motion.svg>
  );
}