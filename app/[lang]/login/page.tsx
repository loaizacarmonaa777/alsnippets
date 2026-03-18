'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getDictionary } from '@/i18n/get-dictionary'

export default function LoginPage({ params: { lang } }: { params: { lang: string } }) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  
  // Datos de autenticación (Privados)
  const ADMIN_EMAIL = 'loaizacarmonaa@gmail.com'
  const ADMIN_PASS = '@YesenDa13Lo26@'

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  // Simulación de carga de diccionario (En server components se pasa via props, aquí lo simplificamos)
  // En producción, asegúrate de recibir 'dict' desde un layout superior o cargarlo aquí.
  const [t, setT] = useState<any>(null)

  React.useEffect(() => {
    getDictionary(lang as 'es' | 'en').then(res => setT(res.login))
  }, [lang])

  if (!t) return null

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(false)
    const ONE_HOUR = 60 * 60;

    // Simulación de delay profesional
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASS) {
      // Aquí podrías setear una cookie o localStorage para el Middleware
      document.cookie = `isLoggedIn=true; path=/; max-age=${ONE_HOUR}; SameSite=Lax;`;
      router.push(`/${lang}/audit`)
    } else {
      setError(true)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-body)]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* LOGO / HEADER */}
        <div className="text-center mb-8">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--bg-inverse)] shadow-[var(--shadow-brand-glow)] mb-4"
          >
            <ShieldCheck className="w-8 h-8 text-[var(--bg-brand)]" />
          </motion.div>
          <h1 className="text-3xl font-black text-[var(--text-1)] tracking-tight">
            {t.title}
          </h1>
          <p className="text-[var(--text-3)] text-sm mt-2 uppercase tracking-widest font-bold">
            {t.sub}
          </p>
        </div>

        {/* FORMULARIO */}
        <div className="bg-[var(--bg-1)] p-8 rounded-3xl border border-[var(--border-1)] shadow-[var(--shadow-2)] relative overflow-hidden">
          {/* Línea decorativa superior */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[var(--bg-brand)]" />

          <form onSubmit={handleLogin} className="space-y-6">
            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-[var(--text-2)] tracking-tighter">
                {t.label_email}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-3)]" />
                <input 
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] outline-none focus:border-[var(--bg-brand)] transition-all font-medium"
                  placeholder="name@alsnippets.com"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase text-[var(--text-2)] tracking-tighter">
                  {t.label_pass}
                </label>
                <span className="text-[10px] text-[var(--text-brand)] font-bold cursor-help">
                  {t.forgot}
                </span>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-3)]" />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-12 py-4 rounded-xl bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] outline-none focus:border-[var(--bg-brand)] transition-all font-mono"
                  placeholder="••••••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-3)] hover:text-[var(--text-brand)] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 rounded-lg bg-red-500 text-white text-xs font-bold text-center"
              >
                {t.error}
              </motion.div>
            )}

            {/* BOTÓN DE ACCESO */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-[var(--bg-inverse)] text-white font-black flex items-center justify-center gap-3 hover:shadow-[var(--shadow-brand-glow)] transition-all group active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-[var(--bg-brand)] border-t-transparent animate-spin rounded-full" />
              ) : (
                <>
                  {t.btn_enter} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* NOTA AL PIE */}
        <p className="text-center mt-8 text-[var(--text-3)] text-[10px] uppercase font-bold tracking-widest">
          {t.register_note}
        </p>
      </motion.div>
    </div>
  )
}