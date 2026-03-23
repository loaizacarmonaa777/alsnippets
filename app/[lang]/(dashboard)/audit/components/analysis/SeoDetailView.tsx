'use client'

import React from 'react'
import { 
  Search, 
  Globe, 
  BarChart, 
  Zap, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  ExternalLink
} from 'lucide-react'
import { clsx } from 'clsx'

interface SeoDetailViewProps {
  data: any
  dict: any
}

export default function SeoDetailView({ data, dict }: SeoDetailViewProps) {
  // Datos simulados basados en tu requerimiento de "Potencia Superior"
  const seoData = data?.seo || {}
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. HEADER DE SECCIÓN: TRIPLE ENTRADA DE DATOS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--bg-1)] p-4 rounded-2xl border border-[var(--border-1)] flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
            <Globe size={20} />
          </div>
          <div>
            <p className="text-[var(--text-3)] text-[10px] uppercase font-black">Crawlability</p>
            <p className="text-[var(--text-1)] font-bold">Robots.txt: OK</p>
          </div>
        </div>

        <div className="bg-[var(--bg-1)] p-4 rounded-2xl border border-[var(--border-1)] flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[var(--bg-brand-hover)] text-[var(--text-brand)]">
            <Search size={20} />
          </div>
          <div>
            <p className="text-[var(--text-3)] text-[10px] uppercase font-black">Indexabilidad</p>
            <p className="text-[var(--text-1)] font-bold">Sitemap Detectado</p>
          </div>
        </div>

        <div className="bg-[var(--bg-inverse)] p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-white/10 text-white">
            <Zap size={20} />
          </div>
          <div>
            <p className="text-[var(--text-white-4)] text-[10px] uppercase font-black">Core Web Vitals</p>
            <p className="text-white font-bold text-sm">LCP: 2.1s (Good)</p>
          </div>
        </div>
      </div>

      {/* 2. TABLA MAESTRA DE AUDITORÍA SEO (Inspirada en Power BI / Semrush) */}
      <div className="bg-[var(--bg-1)] rounded-3xl border border-[var(--border-1)] shadow-[var(--shadow-2)] overflow-hidden">
        <div className="p-6 border-b border-[var(--border-1)] flex justify-between items-center">
          <h3 className="text-[var(--text-1)] font-black flex items-center gap-2">
            <BarChart size={20} className="text-[var(--text-brand)]" />
            ANÁLISIS DE VISIBILIDAD E INTELIGENCIA (AEO/GEO)
          </h3>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-[var(--bg-success)]/10 text-[var(--text-success)] text-[10px] font-bold rounded-full uppercase">
              Semántica OK
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[var(--bg-2)] text-[var(--text-3)] text-[10px] uppercase font-black tracking-widest">
              <tr>
                <th className="p-4 border-b border-[var(--border-1)]">Categoría</th>
                <th className="p-4 border-b border-[var(--border-1)]">Factor de Rastreo</th>
                <th className="p-4 border-b border-[-var(--border-1)]">Hallazgo Crítico</th>
                <th className="p-4 border-b border-[var(--border-1)]">Acción Recomendada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-1)]">
              
              {/* FILA: SEO TÉCNICO */}
              <tr className="hover:bg-[var(--bg-2)]/50 transition-colors">
                <td className="p-4 font-bold text-[var(--text-1)] align-top whitespace-nowrap">Técnico</td>
                <td className="p-4 text-xs text-[var(--text-2)]">
                   <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-[var(--bg-success)]" />
                      Sitemap XML
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      Noindex Tags
                   </div>
                </td>
                <td className="p-4">
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-red-500/5 border border-red-500/10">
                    <AlertCircle size={14} className="text-red-500 mt-0.5" />
                    <p className="text-[11px] text-red-600 font-medium">Sitemap desactualizado o no enviado a GSC.</p>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-xs text-[var(--text-2)] leading-relaxed">
                    Usa la herramienta <strong>"Inspeccionar URL"</strong> de GSC para verificar el rastreo. 
                    Asegura que el sitemap incluya solo URLs canónicas.
                  </p>
                </td>
              </tr>

              {/* FILA: SEO ON-PAGE */}
              <tr className="hover:bg-[var(--bg-2)]/50 transition-colors">
                <td className="p-4 font-bold text-[var(--text-1)] align-top">On-Page</td>
                <td className="p-4 text-xs text-[var(--text-2)]">
                   <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-[var(--bg-brand)]" />
                      Meta Datos
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[var(--bg-success)]" />
                      E-E-A-T Quality
                   </div>
                </td>
                <td className="p-4">
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-orange-500/5 border border-orange-500/10">
                    <AlertCircle size={14} className="text-orange-500 mt-0.5" />
                    <p className="text-[11px] text-orange-600 font-medium">H1 vacíos o múltiples H1 detectados.</p>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-xs text-[var(--text-2)] leading-relaxed">
                    Crea títulos únicos (50-60 carac.). <strong>Tip Clave:</strong> Actualiza contenido antiguo con datos frescos para mejorar el E-E-A-T.
                  </p>
                </td>
              </tr>

              {/* FILA: AEO / GEO (NUEVA ERA IA) */}
              <tr className="hover:bg-[var(--bg-2)]/50 transition-colors">
                <td className="p-4 font-bold text-[var(--text-brand)] align-top">AEO / GEO</td>
                <td className="p-4 text-xs text-[var(--text-2)]">
                   <div className="flex items-center gap-2 mb-1">
                      <Globe size={12} />
                      IA Visibility
                   </div>
                   <div className="flex items-center gap-2 text-[var(--text-brand)]">
                      <CheckCircle2 size={12} />
                      Microdatos Schema
                   </div>
                </td>
                <td className="p-4">
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-[var(--bg-brand-hover)] border border-[var(--border-brand)]">
                    <Info size={14} className="text-[var(--text-brand)] mt-0.5" />
                    <p className="text-[11px] text-[var(--text-5)] font-medium">Baja mención en fuentes citadas por Perplexity/ChatGPT.</p>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-xs text-[var(--text-2)] leading-relaxed">
                    Participa en foros relevantes y busca menciones en directorios de confianza. Los modelos de IA usan estas fuentes para sus respuestas.
                  </p>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* 3. FOOTER DE HERRAMIENTAS EXTERNAS */}
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-3)] rounded-xl text-[var(--text-1)] text-[10px] font-black uppercase hover:bg-[var(--bg-brand-hover)] transition-all">
          Google GSC <ExternalLink size={12} />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-3)] rounded-xl text-[var(--text-1)] text-[10px] font-black uppercase hover:bg-[var(--bg-brand-hover)] transition-all">
          Screaming Frog <ExternalLink size={12} />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-3)] rounded-xl text-[var(--text-1)] text-[10px] font-black uppercase hover:bg-[var(--bg-brand-hover)] transition-all">
          Wappalyzer <ExternalLink size={12} />
        </button>
      </div>
    </div>
  )
}