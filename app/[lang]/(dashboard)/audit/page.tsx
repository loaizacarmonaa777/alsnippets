'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, Timer, DollarSign, ShieldAlert, Code2, 
  BarChart3, Layout, Search, ArrowRight, CheckCircle2 
} from 'lucide-react'

// --- LÓGICA DE NEGOCIO PRIVADA (Basada en tus tarifas) ---
const HOURLY_RATE = 50 // Tu valor hora base (ajusta según prefieras)

export default function AuditProPage({ params: { lang } }: { params: { lang: string } }) {
  const [htmlCode, setHtmlCode] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)

  const analyzeDeeply = async () => {
    if (!htmlCode.trim()) return
    setIsAnalyzing(true)
    
    // Simulación de escaneo profundo de "Otro Planeta"
    await new Promise(resolve => setTimeout(resolve, 2500))

    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlCode, 'text/html')
    
    // Extracción de datos críticos
    const scripts = doc.querySelectorAll('script').length
    const styles = doc.querySelectorAll('link[rel="stylesheet"]').length
    const images = doc.querySelectorAll('img').length
    const forms = doc.querySelectorAll('form').length
    const hasWP = htmlCode.includes('wp-content')

    // CÁLCULO DE TIEMPOS (Algoritmo de Adrián)
    // Cada 10 scripts = +1 hora de optimización
    // Cada formulario = +0.5 horas de seguridad
    // Si es WordPress = +2 horas de auditoría de plugins
    let estimatedHours = (scripts / 10) + (forms * 0.5) + (hasWP ? 2 : 1)
    estimatedHours = Math.round(estimatedHours * 10) / 10

    setResults({
      tech: hasWP ? 'WordPress' : 'Custom HTML/JS',
      stats: { scripts, styles, images, forms },
      hours: estimatedHours,
      budget: estimatedHours * HOURLY_RATE,
      risk: scripts > 30 ? 'Alto' : 'Bajo'
    })
    
    setIsAnalyzing(false)
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-4 md:p-10 font-sans">
      
      {/* HEADER DE AUTORIDAD */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#c9a34e] rounded-2xl shadow-[0_0_20px_#c9a34e]">
            <Zap className="text-[#0b0f19] w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">Suite de Auditoría <span className="text-[#c9a34e]">PRO</span></h1>
            <p className="text-gray-500 text-xs font-bold tracking-widest uppercase">Internal Use Only • Alsnippets Engine v2.0</p>
          </div>
        </div>
        <div className="flex gap-4">
            <div className="px-5 py-2 rounded-xl bg-[#111827] border border-white/10 text-xs font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Servidor Activo
            </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUMNA IZQUIERDA: INPUT */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111827] rounded-3xl p-6 border border-white/5 shadow-2xl">
            <label className="flex items-center gap-2 text-[#c9a34e] text-sm font-black uppercase mb-4 tracking-widest">
              <Code2 className="w-5 h-5" /> Código Fuente a Procesar
            </label>
            <textarea 
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              placeholder="Pega el HTML completo aquí..."
              className="w-full h-80 bg-[#0b0f19] rounded-2xl p-5 font-mono text-xs text-blue-400 outline-none border border-white/5 focus:border-[#c9a34e]/50 transition-all resize-none"
            />
            <button 
              onClick={analyzeDeeply}
              disabled={isAnalyzing || !htmlCode}
              className="w-full mt-6 py-4 rounded-2xl bg-[#c9a34e] text-[#0b0f19] font-black uppercase tracking-tighter flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30"
            >
              {isAnalyzing ? "Procesando Datos..." : "Ejecutar Auditoría Profunda"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* COLUMNA DERECHA: RESULTADOS */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {results ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* CARD: DINERO */}
                <div className="bg-[#111827] p-8 rounded-3xl border-l-4 border-[#c9a34e] shadow-2xl">
                  <DollarSign className="text-[#c9a34e] w-10 h-10 mb-4" />
                  <h3 className="text-gray-500 text-xs font-black uppercase tracking-widest">Inversión Estimada</h3>
                  <p className="text-5xl font-black mt-2 text-white">${results.budget}<span className="text-sm text-gray-600 ml-2">USD</span></p>
                </div>

                {/* CARD: TIEMPO */}
                <div className="bg-[#111827] p-8 rounded-3xl border-l-4 border-blue-500 shadow-2xl">
                  <Timer className="text-blue-500 w-10 h-10 mb-4" />
                  <h3 className="text-gray-500 text-xs font-black uppercase tracking-widest">Tiempo de Trabajo</h3>
                  <p className="text-5xl font-black mt-2 text-white">{results.hours}<span className="text-sm text-gray-600 ml-2">hrs</span></p>
                </div>

                {/* CARD: RIESGOS */}
                <div className={`bg-[#111827] p-8 rounded-3xl border-l-4 shadow-2xl ${results.risk === 'Alto' ? 'border-red-500' : 'border-green-500'}`}>
                  <ShieldAlert className={results.risk === 'Alto' ? 'text-red-500' : 'text-green-500'} />
                  <h3 className="text-gray-500 text-xs font-black uppercase tracking-widest mt-4">Nivel de Complejidad</h3>
                  <p className="text-4xl font-black mt-2 uppercase">{results.risk}</p>
                </div>

                {/* DETALLE TÉCNICO */}
                <div className="bg-[#111827] p-8 rounded-3xl border border-white/5 shadow-2xl md:col-span-2">
                  <h3 className="text-[#c9a34e] text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" /> Desglose de Componentes Detectados
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-[#0b0f19] rounded-2xl border border-white/5">
                        <p className="text-2xl font-black">{results.stats.scripts}</p>
                        <p className="text-[10px] text-gray-500 uppercase">Scripts</p>
                    </div>
                    <div className="text-center p-4 bg-[#0b0f19] rounded-2xl border border-white/5">
                        <p className="text-2xl font-black">{results.stats.forms}</p>
                        <p className="text-[10px] text-gray-500 uppercase">Formularios</p>
                    </div>
                    <div className="text-center p-4 bg-[#0b0f19] rounded-2xl border border-white/5">
                        <p className="text-2xl font-black">{results.stats.images}</p>
                        <p className="text-[10px] text-gray-500 uppercase">Imágenes</p>
                    </div>
                    <div className="text-center p-4 bg-[#0b0f19] rounded-2xl border border-white/5">
                        <p className="text-2xl font-black">{results.tech === 'WordPress' ? 'WP' : 'C'}</p>
                        <p className="text-[10px] text-gray-500 uppercase">Motor</p>
                    </div>
                  </div>
                </div>

              </motion.div>
            ) : (
              <div className="h-full min-h-[400px] rounded-3xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-gray-600 text-center p-10">
                <Layout className="w-16 h-16 mb-4 opacity-20" />
                <p className="max-w-xs font-medium italic">Ingresa el código fuente de tu cliente para generar una proyección financiera y técnica instantánea.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </main>

      {/* FOOTER PRIVADO */}
      <footer className="max-w-7xl mx-auto mt-20 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
        <span>Alsnippets Intelligence Systems © 2026</span>
        <span>Secure Session Active</span>
      </footer>
    </div>
  )
}