'use client'

import React from 'react'
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Key, 
  Server, 
  AlertTriangle, 
  CheckCircle2,
  ExternalLink,
  ShieldQuestion,
  UserCheck,
  Search
} from 'lucide-react'
import { motion } from 'framer-motion'

interface SecurityDetailViewProps {
  data: any
  dict: any
}

export default function SecurityDetailView({ data, dict }: SecurityDetailViewProps) {
  // Datos estructurados para la auditoría de seguridad
  const securityStats = [
    { label: 'SSL Score', value: 'A+', icon: Lock, color: 'var(--bg-success)' },
    { label: 'Cabeceras HTTP', value: '4/6', icon: ShieldCheck, color: 'var(--text-brand)' },
    { label: 'Vulnerabilidades', value: '0', icon: ShieldAlert, color: 'var(--bg-success)' },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* 1. INDICADORES RÁPIDOS DE SEGURIDAD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {securityStats.map((stat, i) => (
          <div key={i} className="bg-[var(--bg-1)] p-5 rounded-2xl border border-[var(--border-1)] flex items-center gap-4 shadow-[var(--shadow-1)]">
            <div className="p-3 rounded-xl bg-[var(--bg-2)]" style={{ color: stat.color }}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-[var(--text-3)] text-[10px] uppercase font-black tracking-widest">{stat.label}</p>
              <p className="text-[var(--text-1)] font-bold text-lg">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 2. TABLA TÉCNICA DE AUDITORÍA DE SEGURIDAD */}
      <div className="bg-[var(--bg-1)] rounded-3xl border border-[var(--border-1)] shadow-[var(--shadow-2)] overflow-hidden">
        <div className="p-6 border-b border-[var(--border-1)] flex justify-between items-center bg-[var(--bg-1)]">
          <h3 className="text-[var(--text-1)] font-black flex items-center gap-2 uppercase tracking-tighter">
            <ShieldCheck size={20} className="text-[var(--bg-success)]" />
            Security Core Audit
          </h3>
          <div className="flex items-center gap-2 text-[var(--text-3)] text-[10px] font-bold uppercase">
            <span className="w-2 h-2 rounded-full bg-[var(--bg-success)] animate-pulse"></span>
            Escaneo en Tiempo Real Activo
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[var(--bg-2)] text-[var(--text-3)] text-[10px] uppercase font-black tracking-widest">
              <tr>
                <th className="p-4 border-b border-[var(--border-1)]">Subcategoría</th>
                <th className="p-4 border-b border-[var(--border-1)]">Estado Actual</th>
                <th className="p-4 border-b border-[var(--border-1)]">Riesgos / Fallas</th>
                <th className="p-4 border-b border-[var(--border-1)] text-[var(--text-brand)]">Protocolo de Resolución</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-1)] text-[var(--text-2)] text-xs">
              
              {/* SSL Y HTTPS */}
              <tr className="hover:bg-[var(--bg-2)] transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2 font-bold text-[var(--text-1)]">
                    <Lock size={14} className="text-[var(--bg-success)]" /> SSL & HTTPS
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <p className="font-mono">TLS 1.3 / Cert: Let's Encrypt</p>
                    <p className="text-[var(--text-success)] font-bold italic text-[10px]">Caduca en 72 días</p>
                  </div>
                </td>
                <td className="p-4 text-orange-500 font-medium">
                  Uso potencial de protocolos obsoletos (TLS 1.0/1.1) si no se fuerza el downgrade.
                </td>
                <td className="p-4 bg-[var(--bg-brand-hover)]">
                  <ol className="list-decimal list-inside space-y-1 font-medium">
                    <li>Configurar renovación automática via Certbot.</li>
                    <li>Forzar <strong>HSTS</strong> con redirección 301.</li>
                    <li>Deshabilitar suites de cifrado débiles en el servidor.</li>
                  </ol>
                </td>
              </tr>

              {/* CONFIGURACIÓN SERVIDOR / CMS */}
              <tr className="hover:bg-[var(--bg-2)] transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2 font-bold text-[var(--text-1)]">
                    <Server size={14} className="text-blue-500" /> Cabeceras HTTP
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    <span className="px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 border border-green-500/20 text-[9px]">X-Frame</span>
                    <span className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-600 border border-red-500/20 text-[9px]">CSP MISSING</span>
                  </div>
                </td>
                <td className="p-4 text-red-500 font-medium">
                  Exposición a ataques XSS y Clickjacking por ausencia de política CSP estricta.
                </td>
                <td className="p-4 bg-[var(--bg-brand-hover)]">
                  <ol className="list-decimal list-inside space-y-1 font-medium">
                    <li>Implementar <strong>Content-Security-Policy</strong>.</li>
                    <li>Configurar <strong>X-Content-Type-Options: nosniff</strong>.</li>
                    <li>Deshabilitar el listado de directorios en <code>.htaccess</code> o Nginx.</li>
                  </ol>
                </td>
              </tr>

              {/* PLUGINS Y DEPENDENCIAS */}
              <tr className="hover:bg-[var(--bg-2)] transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2 font-bold text-[var(--text-1)]">
                    <ShieldQuestion size={14} className="text-purple-500" /> Dependencias
                  </div>
                </td>
                <td className="p-4 italic">3 Plugins desactualizados</td>
                <td className="p-4 text-red-500 font-medium">
                  Vulnerabilidades críticas conocidas en versiones antiguas de librerías JS (jQuery/Bootstrap).
                </td>
                <td className="p-4 bg-[var(--bg-brand-hover)]">
                  <ol className="list-decimal list-inside space-y-1 font-medium">
                    <li>Activar actualizaciones automáticas de parches de seguridad.</li>
                    <li>Eliminar plugins inactivos o "abandonware".</li>
                    <li>Auditar dependencias con <code>npm audit</code> o herramientas Snyk.</li>
                  </ol>
                </td>
              </tr>

              {/* USUARIOS Y PERMISOS */}
              <tr className="hover:bg-[var(--bg-2)] transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2 font-bold text-[var(--text-1)]">
                    <UserCheck size={14} className="text-orange-500" /> Permisos (IAM)
                  </div>
                </td>
                <td className="p-4">8 Administradores</td>
                <td className="p-4 text-orange-500 font-medium">
                  Principio de mínimo privilegio violado. Usuarios antiguos con acceso total.
                </td>
                <td className="p-4 bg-[var(--bg-brand-hover)]">
                  <ol className="list-decimal list-inside space-y-1 font-medium">
                    <li>Reducir roles administrativos a lo estrictamente necesario.</li>
                    <li>Forzar <strong>2FA (Autenticación de 2 Factores)</strong>.</li>
                    <li>Purgar cuentas de prueba o de desarrolladores externos.</li>
                  </ol>
                </td>
              </tr>

              {/* MALWARE Y BLACKLISTS */}
              <tr className="hover:bg-[var(--bg-2)] transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2 font-bold text-[var(--text-1)]">
                    <Search size={14} className="text-green-500" /> Malware/Blacklist
                  </div>
                </td>
                <td className="p-4">
                  <span className="flex items-center gap-1 text-[var(--text-success)] font-bold">
                    <CheckCircle2 size={12} /> Limpio
                  </span>
                </td>
                <td className="p-4">Ninguno detectado en Google Safe Browsing.</td>
                <td className="p-4 bg-[var(--bg-brand-hover)]">
                  <ol className="list-decimal list-inside space-y-1 font-medium">
                    <li>Programar escaneos semanales con Sucuri SiteCheck.</li>
                    <li>Integrar Search Console para alertas de seguridad inmediatas.</li>
                  </ol>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* 3. CALL TO ACTION / RESUMEN TÉCNICO */}
      <div className="bg-[var(--bg-inverse)] p-6 rounded-3xl shadow-[var(--shadow-brand-glow-intense)] border border-[var(--border-white-4)]/20 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-start gap-4">
          <div className="p-4 rounded-full bg-white/10 text-[var(--text-white-5)]">
            <AlertTriangle size={32} />
          </div>
          <div className="space-y-1">
            <h4 className="text-[var(--text-white-1)] font-bold text-lg">Análisis de Riesgo Crítico</h4>
            <p className="text-[var(--text-white-4)] text-xs max-w-xl">
              Aunque el sitio tiene SSL activo, la falta de cabeceras de seguridad CSP y la redundancia de usuarios administrativos representan el <strong>80% de la superficie de ataque</strong> actual.
            </p>
          </div>
        </div>
        <button className="whitespace-nowrap px-8 py-4 bg-[var(--bg-brand)] text-[var(--text-inverse)] rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[var(--shadow-brand-glow)]">
          Generar Informe Técnico PDF
        </button>
      </div>
    </motion.div>
  )
}