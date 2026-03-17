'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Zap, Briefcase, Home } from 'lucide-react'

export default function GraciasPage({ params: { lang } }: { params: { lang: string } }) {
  
  // OBJETO DE TRADUCCIÓN LOCAL (Blindaje de Lógica y Diseño)
  const t = {
    es: {
      title: "¡Operación Exitosa!",
      description: "Muchas gracias por tu mensaje y aportación. Tu apoyo me permite seguir creando herramientas increíbles y gratuitas para la comunidad. ¡He recibido todo correctamente!",
      nav: {
        home: "Ir al Inicio",
        suite: "Suite Text",
        seo: "Consultoría SEO"
      }
    },
    en: {
      title: "Success!",
      description: "Thank you very much for your message and contribution. Your support allows me to keep creating amazing free tools for the community. I have received everything correctly!",
      nav: {
        home: "Go Home",
        suite: "Suite Text",
        seo: "SEO Consulting"
      }
    }
  }[lang as 'es' | 'en'];

  return (
    <div className="min-h-screen bg-[var(--bg-body)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Círculo decorativo de fondo - BLINDADO */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--bg-success)]/10 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[var(--bg-1)] border border-[var(--border-1)] dark:border-[var(--border-brand)] rounded-3xl p-10 max-w-2xl w-full text-center shadow-[var(--shadow-2)] relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-[var(--bg-success)]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[var(--bg-success)]/30"
        >
          <CheckCircle className="w-12 h-12 text-[var(--text-success)]" />
        </motion.div>

        <h1 className="text-4xl font-bold text-[var(--text-1)] mb-4">
          {t.title}
        </h1>
        <p className="text-[var(--text-2)] text-lg mb-10 leading-relaxed">
          {t.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href={`/${lang}`} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-[var(--bg-3)] hover:bg-[var(--bg-2)] border border-[var(--border-1)] hover:border-[var(--border-brand)] hover:text-[var(--text-brand)] text-[var(--text-2)] transition-all group">
            <Home className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm">{t.nav.home}</span>
          </Link>
          <Link href={`/${lang}/proyectos/suite-text`} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-[var(--bg-brand)]/10 border border-[var(--border-brand)]/30 hover:bg-[var(--bg-brand)] text-[var(--text-brand)] hover:text-[var(--text-inverse)] transition-all group">
            <Zap className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm">{t.nav.suite}</span>
          </Link>
          <Link href={`/${lang}/servicios/consultoria-wordpress`} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-[var(--bg-3)] hover:bg-[var(--bg-2)] border border-[var(--border-1)] hover:border-[var(--border-brand)] hover:text-[var(--text-brand)] text-[var(--text-2)] transition-all group">
            <Briefcase className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm">{t.nav.seo}</span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}