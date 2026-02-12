"use client";

// 1. Importamos 'Variants'
import { motion, Variants } from "framer-motion";

export default function IconCasosExito() {
  
  // 2. Tipamos explícitamente la constante como ': Variants'
  const drawLoop: Variants = {
    hidden: { pathLength: 0.1, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2, 
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 42.78 43.29"
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* GRUPO 1: Puesto Tres (Izquierda) */}
      <motion.polyline
        points="16.34 18.74 1 18.74 1 42.26 5.33 42.26"
        variants={drawLoop}
        initial="hidden"
        animate="visible"
      />

      {/* GRUPO 2: Puesto Dos (Derecha) */}
      <motion.polyline
        points="37.3 42.28 41.78 42.28 41.78 22.39 26.9 22.39"
        variants={drawLoop}
        initial="hidden"
        animate="visible"
      />

      {/* GRUPO 3: Puesto Uno (Centro/Flecha) */}
      <motion.path
        d="M5.33,42.29s32.09,0,31.99,0c-11.11-10.37-12.12-30.51-12.12-30.51h6.4L21.33,1l-10.88,10.64h6.87s-1.41,22.09-11.99,30.65Z"
        variants={drawLoop}
        initial="hidden"
        animate="visible"
      />
    </motion.svg>
  );
}