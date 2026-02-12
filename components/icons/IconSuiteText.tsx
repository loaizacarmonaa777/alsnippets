"use client";

// 1. Importamos 'Variants' para tipar el objeto y evitar el error rojo
import { motion, Variants } from "framer-motion";

export default function IconSuiteText() {
  
  // 2. Tipamos explícitamente la constante como ': Variants'
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (custom: number) => {
      const delay = custom * 0.15;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };

  // Variantes específicas para las líneas (simples, sin custom delay dinámico complejo)
  const lineVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 },
    hover: { pathLength: [0, 1], opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 44.27 44.1"
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* CAPA 1: Hoja Trasera (_hoja2) */}
      <motion.path
        d="M32.87,7.46l.55-2.27L9.68.77S8.18,18.45.77,31.86l15.17,2.75"
        variants={draw}
        custom={0}
      />

      {/* CAPA 2: Hoja Delantera (_hoja1) */}
      <motion.path
        d="M35.02,7.11l-23.68,4.42s2.64,23.82,8.56,31.8l23.6-4.85s-7.77-16.33-8.49-31.38Z"
        variants={draw}
        custom={2}
      />

      {/* CAPA 3: Líneas de Texto */}
      <motion.g
        variants={{
          hover: { transition: { staggerChildren: 0.1 } }
        }}
      >
        <motion.line
          x1="17.62" y1="19.02" x2="32.24" y2="15.6"
          variants={lineVariants}
          transition={{ delay: 0.8, duration: 0.5 }}
        />
        <motion.line
          x1="19.25" y1="23.31" x2="33.43" y2="19.79"
          variants={lineVariants}
          transition={{ delay: 0.9, duration: 0.5 }}
        />
        <motion.line
          x1="20.39" y1="27.67" x2="29.11" y2="25.51"
          variants={lineVariants}
          transition={{ delay: 1.0, duration: 0.5 }}
        />
        <motion.line
          x1="22.19" y1="32.35" x2="28.33" y2="30.78"
          variants={lineVariants}
          transition={{ delay: 1.1, duration: 0.5 }}
        />
      </motion.g>
    </motion.svg>
  );
}