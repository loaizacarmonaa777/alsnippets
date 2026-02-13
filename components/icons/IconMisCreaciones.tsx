"use client";

import { motion } from "framer-motion";

export default function IconMisCreaciones({ className }: { className?: string }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-3 -5 50 54" // ViewBox ampliado horizontalmente para los sliders
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.05"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* GRUPO 1: Sliders Superiores (Se mueven lateralmente) */}
      <motion.g animate={{ x: [0, 2, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M29.43,8.59l-3.38-.03c-.81-.14-.71-1.2.08-1.27h3.27c.47-1.54,2.35-2.17,3.63-1.14.39.32.58.7.8,1.14h9.78c.87.1.8,1.24-.05,1.3h-9.73c-.22.42-.39.78-.75,1.09-1.26,1.06-3.21.49-3.66-1.09ZM31.51,6.91c-1.32.14-1.16,2.07.09,2.07,1.43,0,1.3-2.21-.09-2.07Z" />
      </motion.g>

      <motion.g animate={{ x: [0, -2, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
        <path d="M40.33,12.8c1.04.08,2.17-.08,3.2,0s.96,1.2.05,1.29h-3.22c-.79,2.16-3.68,2.2-4.44,0h-9.78c-.86-.09-.86-1.2,0-1.29h9.78c.72-2.18,3.68-2.17,4.41,0ZM38.86,12.73c-.96-.97-2.44.53-1.45,1.48s2.38-.54,1.45-1.48Z" />
      </motion.g>

      <motion.g animate={{ x: [0, 1.5, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
        <path d="M35.01,18.32h8.61c.87.13.81,1.27-.04,1.3h-8.54c-.56,1.77-2.88,2.25-4.03.74-.17-.23-.25-.5-.41-.73h-4.51c-.82-.12-.77-1.24.05-1.29h4.46c.15-.24.23-.5.39-.72,1.11-1.51,3.5-1.08,4.02.71ZM32.76,17.94c-.38.02-.78.34-.9.69-.35,1.06.98,1.86,1.73,1.03.62-.68.08-1.78-.83-1.73Z" />
      </motion.g>

      {/* GRUPO 2: La Botella (Latido suave) */}
      <motion.g
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "15px", originY: "25px" }} // Centro aprox de la botella
      >
        <rect x="9.41" y="1.03" width="13.96" height="4.54" rx="1.73" ry="1.73" />
        <path d="M12.08,5.57h8.94s-.86,3.66.34,10.4,9.28,18.88,10.04,22.9-3.15,3.98-3.15,3.98H4.35s-5.15-.23-2.63-5.86,8.29-14.05,9.57-21.02.79-10.4.79-10.4Z" />
        
        {/* Líquido y Burbujas */}
        <path d="M8.66,23.56s3.14-2.46,9.57.65c5.13,2.54,6.22.05,6.22.05" />
        <motion.circle cx="16.02" cy="30.46" r="2.16" animate={{ y: [0, -3, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
        <motion.circle cx="9.09" cy="36.43" r="2.99" animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} />
        <motion.circle cx="23.47" cy="36.42" r="2.22" animate={{ y: [0, -2.5, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} />
      </motion.g>
    </motion.svg>
  );
}