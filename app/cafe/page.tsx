'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Coffee, Zap, Briefcase, Home } from 'lucide-react'

export default function CafePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-body)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Círculo decorativo de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl p-10 max-w-2xl w-full text-center shadow-2xl relative z-10"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="w-24 h-24 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-500/30"
        >
          <Coffee className="w-12 h-12 text-yellow-500" />
        </motion.div>

        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          ¡Tranquilo! Ese café queda pendiente ☕
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-10 leading-relaxed">
          Noté que cancelaste el proceso de donación en PayPal. ¡No pasa absolutamente nada! No se ha realizado ningún cobro. Puedes seguir utilizando todas las herramientas de mi web de forma 100% gratuita. 
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-body)] border border-[var(--border-subtle)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] text-[var(--text-secondary)] transition-all group">
            <Home className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm">Volver al Inicio</span>
          </Link>
          <Link href="/proyectos/suite-text" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/30 hover:bg-[var(--brand-primary)] text-[var(--brand-primary)] hover:text-white transition-all group">
            <Zap className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm">Suite Text</span>
          </Link>
          <Link href="/consultoria" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-body)] border border-[var(--border-subtle)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] text-[var(--text-secondary)] transition-all group">
            <Briefcase className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm">Consultoría SEO</span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}