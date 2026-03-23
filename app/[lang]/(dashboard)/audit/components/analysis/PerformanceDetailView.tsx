'use client'

import React, { useEffect, useState } from 'react'
import { 
  Zap, Timer, Gauge, BarChart3, 
  Image as ImageIcon, Code2, AlertTriangle, 
  Activity, RefreshCw 
} from 'lucide-react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell 
} from 'recharts'
import { motion } from 'framer-motion'

interface PerformanceDetailViewProps {
  data: any // Datos del scanner local
  dict: any
}

export default function PerformanceDetailView({ data, dict }: PerformanceDetailViewProps) {
  const [realData, setRealData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Efecto para llamar a la API de Google cuando detectamos una URL
  useEffect(() => {
    const fetchRealMetrics = async () => {
      if (!data?.meta?.domain) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/pagespeed?url=${data.meta.domain}`);
        const result = await response.json();
        if (!result.error) setRealData(result);
      } catch (err) {
        console.error("Error fetching PageSpeed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRealMetrics();
  }, [data?.meta?.domain]);

  // Usamos datos reales si existen, sino los del scanner o placeholders
  const metrics = [
    { label: 'FCP', value: realData?.metrics?.fcp || '---', score: realData?.score || 0, status: 'info' },
    { label: 'LCP', value: realData?.metrics?.lcp || '---', score: realData?.score || 0, status: 'warning' },
    { label: 'CLS', value: realData?.metrics?.cls || '---', score: 99, status: 'optimal' },
    { label: 'TTI', value: realData?.metrics?.tti || '---', score: 50, status: 'critical' },
  ];

  const resourceData = [
    { name: 'Imágenes', kb: (realData?.resources?.images / 1024).toFixed(0) || 0, fill: 'var(--bg-brand)' },
    { name: 'Scripts', kb: (realData?.resources?.scripts / 1024).toFixed(0) || 0, fill: 'var(--spectrum-blue)' },
    { name: 'Fuentes', kb: (realData?.resources?.fonts / 1024).toFixed(0) || 0, fill: 'var(--text-3)' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      
      {/* 1. ESTADO DE LA CONEXIÓN CON GOOGLE */}
      <div className="bg-[var(--bg-1)] p-4 rounded-2xl border border-[var(--border-1)] flex justify-between items-center shadow-[var(--shadow-1)]">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${loading ? 'animate-spin' : ''} bg-[var(--bg-2)] text-[var(--text-brand)]`}>
            <RefreshCw size={16} />
          </div>
          <p className="text-[var(--text-2)] text-xs font-bold uppercase tracking-widest">
            {loading ? 'Sincronizando con Google PageSpeed...' : 'Datos Reales de Lighthouse'}
          </p>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[var(--text-3)] text-[10px] font-black uppercase">Web:</span>
           <span className="text-[var(--text-1)] text-xs font-mono font-bold">{data?.meta?.domain || 'Sin URL'}</span>
        </div>
      </div>

      {/* 2. CORE WEB VITALS (REALES) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="bg-[var(--bg-1)] p-5 rounded-2xl border border-[var(--border-1)] shadow-[var(--shadow-1)]">
            <p className="text-[var(--text-3)] text-[10px] font-black uppercase mb-1">{m.label}</p>
            <p className="text-2xl font-black text-[var(--text-1)]">{m.value}</p>
            <div className="mt-4 h-1 w-full bg-[var(--bg-2)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--bg-brand)] transition-all duration-1000" 
                style={{ width: `${m.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 3. GRÁFICO DE RECURSOS Y PROTOCOLO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-[var(--bg-1)] p-6 rounded-3xl border border-[var(--border-1)] shadow-[var(--shadow-1)]">
          <h3 className="text-[var(--text-1)] font-black text-sm uppercase mb-6 flex items-center gap-2">
            <BarChart3 size={18} className="text-[var(--text-brand)]" /> Peso Real del Sitio
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-1)" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tick={{ fill: 'var(--text-3)', fontSize: 10, fontWeight: 'bold' }} width={80} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-1)', borderRadius: '12px' }} />
                <Bar dataKey="kb" radius={[0, 4, 4, 0]}>
                  {resourceData.map((e, index) => <Cell key={index} fill={e.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-7 bg-[var(--bg-1)] rounded-3xl border border-[var(--border-1)] shadow-[var(--shadow-2)] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[var(--bg-2)] text-[var(--text-3)] text-[10px] uppercase font-black tracking-widest">
              <tr>
                <th className="p-4 border-b border-[var(--border-1)]">Subcategoría</th>
                <th className="p-4 border-b border-[var(--border-1)] text-red-500">Fallas Críticas</th>
                <th className="p-4 border-b border-[var(--border-1)] text-[var(--text-brand)]">Protocolo de Resolución</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-1)] text-xs text-[var(--text-2)]">
              <tr className="hover:bg-[var(--bg-2)] transition-colors">
                <td className="p-4 font-bold text-[var(--text-1)]">Imágenes</td>
                <td className="p-4">Peso excesivo en el viewport inicial.</td>
                <td className="p-4 bg-[var(--bg-brand-hover)]">
                  <ol className="list-decimal list-inside space-y-1 font-medium">
                    <li>Implementar <strong>WebP/AVIF</strong>.</li>
                    <li>Activar <code>loading="lazy"</code> en imágenes fuera de pantalla.</li>
                  </ol>
                </td>
              </tr>
              <tr className="hover:bg-[var(--bg-2)] transition-colors">
                <td className="p-4 font-bold text-[var(--text-1)]">JavaScript</td>
                <td className="p-4">Main-thread bloqueado por más de 500ms.</td>
                <td className="p-4 bg-[var(--bg-brand-hover)]">
                  <ol className="list-decimal list-inside space-y-1 font-medium">
                    <li>Minificar y comprimir (Gzip/Brotli).</li>
                    <li>Diferir carga de scripts no esenciales.</li>
                  </ol>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. BANNER DE IMPACTO INVERSO */}
      <div className="bg-[var(--bg-inverse)] p-6 rounded-3xl shadow-[var(--shadow-brand-glow-intense)] flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Zap size={32} className="text-[var(--text-white-5)]" />
          <div>
            <h4 className="text-white font-bold uppercase text-lg">Optimización Estratégica</h4>
            <p className="text-[var(--text-white-4)] text-xs">Mejorar el LCP por debajo de 2.5s puede aumentar la conversión en un 15%.</p>
          </div>
        </div>
        <p className="text-white font-black text-2xl italic tracking-tighter">DATA-DRIVEN</p>
      </div>
    </motion.div>
  )
}