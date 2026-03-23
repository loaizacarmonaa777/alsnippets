'use client'

import React from 'react'
import { 
  Layers, 
  Box, 
  Zap, 
  AlertCircle, 
  CheckCircle2, 
  Terminal,
  Activity,
  Code2
} from 'lucide-react'
import { motion } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Función de utilidad para manejar clases siguiendo tu arquitectura
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface TechDetailViewProps {
  data: any
  dict: any
}

export default function TechDetailView({ data, dict }: TechDetailViewProps) {
  // Simulación de datos extraídos del scanner (PHP, Plugins, Frameworks)
  const techStack = {
    cms: { name: 'WordPress', version: data.security?.wpVersion || '6.4.3', status: 'Updated' },
    server: { 
      php: '8.2.12', 
      engine: 'Nginx/1.24.0', 
      os: 'Ubuntu 22.04 LTS',
      status: 'Optimal' 
    },
    infrastructure: {
      hosting: 'DigitalOcean',
      cdn: 'Cloudflare',
      ssl: 'Let\'s Encrypt'
    },
    health: {
      score: 88,
      errors: 2,
      warnings: 5
    },
    plugins: (data.security?.pluginsDetected as string[]) || ['contact-form-7', 'woocommerce', 'wp-rocket', 'elementor']
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* 1. TOP METRICS: SALUD DEL STACK */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[var(--bg-1)] p-5 rounded-2xl border border-[var(--border-1)] shadow-[var(--shadow-1)]">
          <div className="flex items-center justify-between mb-2">
            <Activity size={18} className="text-[var(--bg-success)]" />
            <span className="text-[10px] font-black text-[var(--bg-success)] uppercase tracking-widest">Salud</span>
          </div>
          <p className="text-2xl font-black text-[var(--text-1)]">{techStack.health.score}%</p>
          <p className="text-[10px] text-[var(--text-3)] font-bold">Estado del Ecosistema</p>
        </div>

        <div className="bg-[var(--bg-1)] p-5 rounded-2xl border border-[var(--border-1)] shadow-[var(--shadow-1)]">
          <div className="flex items-center justify-between mb-2">
            <Terminal size={18} className="text-[var(--text-brand)]" />
            <span className="text-[10px] font-black text-[var(--text-brand)] uppercase tracking-widest">PHP</span>
          </div>
          <p className="text-2xl font-black text-[var(--text-1)]">{techStack.server.php}</p>
          <p className="text-[10px] text-[var(--text-3)] font-bold">Motor de Servidor</p>
        </div>

        <div className="bg-[var(--bg-1)] p-5 rounded-2xl border border-[var(--border-1)] shadow-[var(--shadow-1)]">
          <div className="flex items-center justify-between mb-2">
            <Box size={18} className="text-blue-500" />
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Plugins</span>
          </div>
          <p className="text-2xl font-black text-[var(--text-1)]">{techStack.plugins.length}</p>
          <p className="text-[10px] text-[var(--text-3)] font-bold">Extensiones Activas</p>
        </div>

        <div className="bg-[var(--bg-inverse)] p-5 rounded-2xl shadow-[var(--shadow-brand-glow)]">
          <div className="flex items-center justify-between mb-2">
            <Zap size={18} className="text-[var(--text-white-5)]" />
            <span className="text-[10px] font-black text-[var(--text-white-5)] uppercase tracking-widest">CDN</span>
          </div>
          <p className="text-2xl font-black text-white">{techStack.infrastructure.cdn}</p>
          <p className="text-[10px] text-[var(--text-white-4)] font-bold">Edge Network</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 2. DETALLE DEL STACK TÉCNICO (TABLA DE AUDITORÍA) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[var(--bg-1)] rounded-3xl border border-[var(--border-1)] shadow-[var(--shadow-2)] overflow-hidden">
            <div className="p-6 border-b border-[var(--border-1)] flex items-center justify-between">
              <h3 className="text-[var(--text-1)] font-black flex items-center gap-2 uppercase tracking-tighter">
                <Code2 size={20} className="text-[var(--text-brand)]" />
                Auditoría de Componentes y Versiones
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[var(--bg-2)] text-[var(--text-3)] text-[10px] uppercase font-black tracking-widest">
                  <tr>
                    <th className="p-4 border-b border-[var(--border-1)]">Capa</th>
                    <th className="p-4 border-b border-[var(--border-1)]">Tecnología Detectada</th>
                    <th className="p-4 border-b border-[var(--border-1)]">Riesgos / Fallas</th>
                    <th className="p-4 border-b border-[var(--border-1)]">Protocolo de Resolución</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-1)] text-xs">
                  <tr className="hover:bg-[var(--bg-2)]/50 transition-colors">
                    <td className="p-4 font-bold text-[var(--text-1)]">CMS / Framework</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded bg-[var(--bg-3)] font-mono">{techStack.cms.name} {techStack.cms.version}</span>
                      </div>
                    </td>
                    <td className="p-4 text-orange-500 font-medium">Uso de versiones sin parches de seguridad activos.</td>
                    <td className="p-4">Actualizar Core a {techStack.cms.version} y verificar compatibilidad de temas.</td>
                  </tr>
                  <tr className="hover:bg-[var(--bg-2)]/50 transition-colors">
                    <td className="p-4 font-bold text-[var(--text-1)]">Servidor (Backend)</td>
                    <td className="p-4 font-mono">{techStack.server.engine} / PHP {techStack.server.php}</td>
                    <td className="p-4 text-red-500 font-medium">PHP 7.x obsoleto detectado en entornos paralelos.</td>
                    <td className="p-4">Migrar a PHP 8.2+ para mejorar rendimiento (30%) y seguridad.</td>
                  </tr>
                  <tr className="hover:bg-[var(--bg-2)]/50 transition-colors">
                    <td className="p-4 font-bold text-[var(--text-1)]">APIs & Third Party</td>
                    <td className="p-4">Google Maps, Chatbots, Fonts</td>
                    <td className="p-4 text-red-500 font-medium">Carga excesiva de scripts (bloqueo de renderizado).</td>
                    <td className="p-4">Implementar Facade para Chatbots y optimizar carga de Google Fonts.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 3. LISTADO DE PLUGINS / COMPONENTES (COLUMNA DERECHA) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[var(--bg-1)] p-6 rounded-3xl border border-[var(--border-1)] shadow-[var(--shadow-1)] h-full">
            <h3 className="text-[var(--text-1)] font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
              <Layers size={18} className="text-blue-500" />
              Ecosistema de Plugins
            </h3>
            <div className="space-y-3">
              {techStack.plugins.map((plugin: string, i: number) => (
                <div key={i} className={cn(
                  "flex items-center justify-between p-3 rounded-xl bg-[var(--bg-2)] border border-[var(--border-1)]",
                  "hover:border-[var(--border-brand)] transition-all group"
                )}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--bg-1)] flex items-center justify-center text-[var(--text-3)] group-hover:text-[var(--text-brand)]">
                      <Box size={14} />
                    </div>
                    <span className="text-[11px] font-bold text-[var(--text-2)] capitalize">{plugin.replace(/-/g, ' ')}</span>
                  </div>
                  <CheckCircle2 size={14} className="text-[var(--bg-success)]" />
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 rounded-2xl bg-[var(--bg-brand-hover)] border border-[var(--border-brand)]">
               <div className="flex items-center gap-2 mb-2 text-[var(--text-5)]">
                  <AlertCircle size={14} />
                  <span className="text-[10px] font-black uppercase">Nota de Seguridad</span>
               </div>
               <p className="text-[10px] text-[var(--text-2)] leading-relaxed">
                 Cualquier plugin inactivo debe ser eliminado físicamente para reducir la superficie de ataque.
               </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}