'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Coffee, Zap, Briefcase, Home } from 'lucide-react'

export default function CafePage ({
  params: { lang }
}: {
  params: { lang: string }
}) {
  // OBJETO DE TRADUCCIÓN LOCAL (Protección de Lógica y Estilos)
  const t = {
    es: {
      title: '¡Tranquilo! Ese café queda pendiente ☕',
      description:
        'Noté que cancelaste el proceso de donación en PayPal. ¡No pasa absolutamente nada! No se ha realizado ningún cobro. Puedes seguir utilizando todas las herramientas de mi web de forma 100% gratuita.',
      nav: {
        home: 'Volver al Inicio',
        suite: 'Suite Text',
        seo: 'Consultoría SEO'
      }
    },
    en: {
      title: 'No worries! That coffee is on hold ☕',
      description:
        'I noticed you cancelled the PayPal donation process. No problem at all! No charges were made. You can continue using all the tools on my website 100% free of charge.',
      nav: {
        home: 'Back Home',
        suite: 'Suite Text',
        seo: 'SEO Consulting'
      }
    }
  }[lang as 'es' | 'en']

  return (
    <div className='min-h-screen bg-[var(--bg-body)] flex flex-col items-center justify-center p-6 relative overflow-hidden'>
      {/* Círculo decorativo de fondo - BLINDADO */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--bg-brand)]/10 blur-[100px] rounded-full pointer-events-none'></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-[var(--bg-1)] border border-[var(--border-1)] rounded-3xl p-10 max-w-2xl w-full text-center shadow-[var(--shadow-2)] relative z-10'
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className='w-24 h-24 bg-[var(--bg-brand)]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[var(--border-brand)]'
        >
          <Coffee className='w-12 h-12 text-[var(--text-brand)]' />
        </motion.div>

        <h1 className='text-4xl font-bold text-[var(--text-1)] mb-4'>
          {t.title}
        </h1>
        <p className='text-[var(--text-2)] text-lg mb-10 leading-relaxed'>
          {t.description}
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <Link
            href={`/${lang}`}
            className='flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-[var(--bg-3)] hover:bg-[var(--bg-2)] border border-[var(--border-1)] hover:border-[var(--border-brand)] hover:text-[var(--text-brand)] text-[var(--text-2)] transition-all group'
          >
            <Home className='w-6 h-6 group-hover:scale-110 transition-transform' />
            <span className='font-bold text-sm'>{t.nav.home}</span>
          </Link>
          <Link
            href={`/${lang}/proyectos/suite-text`}
            className='flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-[var(--bg-brand)]/10 border border-[var(--border-brand)]/30 hover:bg-[var(--bg-brand)] text-[var(--text-brand)] hover:text-[var(--text-inverse)] transition-all group'
          >
            <Zap className='w-6 h-6 group-hover:scale-110 transition-transform' />
            <span className='font-bold text-sm'>{t.nav.suite}</span>
          </Link>
          <Link
            href={`/${lang}/auditoria#form`}
            className='flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-[var(--bg-3)] hover:bg-[var(--bg-2)] border border-[var(--border-1)] hover:border-[var(--border-brand)] hover:text-[var(--text-brand)] text-[var(--text-2)] transition-all group'
          >
            <Briefcase className='w-6 h-6 group-hover:scale-110 transition-transform' />
            <span className='font-bold text-sm'>{t.nav.seo}</span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
