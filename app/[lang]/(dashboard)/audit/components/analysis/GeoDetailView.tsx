'use client'

import React from 'react'
import { 
  MapPin, 
  Globe, 
  Server, 
  Zap, 
  ShieldCheck, 
  Activity,
  Navigation,
  ArrowRight,
  AlertCircle,
  RefreshCcw,
  Languages
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts'

interface GeoDetailViewProps {
  data: any
  dict: any
}

export default function GeoDetailView({ data, dict }: GeoDetailViewProps) {
  // Datos estructurados según tus requerimientos técnicos
  const geoData = {
    precision: {
      detectedIp: "181.143.144.242",
      detectedLocation: "Bogotá, DC, Colombia",
      realUserLocation: "User Dynamic Check",
      accuracyStatus: "High",
      isp: "Claro Colombia",
      isProxy: false
    },
    localization: {
      redirectActive: true,
      detectedRegion: "LATAM / ES",
      currencyFormat: "COP ($)",
      dateFormat: "DD/MM/YYYY",
      altLanguagesDetected: ["en", "pt"]
    },
    infrastructure: {
      cdnProvider: "Cloudflare Edge",
      nodeLocation: "Miami, FL (MIA)",
      latencies: [
        { city: 'Local (Bogotá)', ms: 22, color: 'var(--bg-success)' },
        { city: 'Miami (CDN)', ms: 45, color: 'var(--bg-success)' },
        { city: 'Madrid (EU)', ms: 142, color: 'var(--spectrum-magenta)' },
        { city: 'Tokyo (Asia)', ms: 285, color: 'var(--spectrum-red)' },
      ]
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
      
      {/* 1. KEY PERFORMANCE INDICATORS (KPIs) - GEO ESTATUS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--bg-1)] p-5 rounded-2xl border border-[var(--border-1)] flex items-center gap-4 shadow-[var(--shadow-1)]">
          <div className="p-3 rounded-xl bg-[var(--bg-brand-hover)] text-[var(--text-brand)]">
            <MapPin size={22} />
          </div>
          <div>
            <p className="text-[var(--text-3)] text-[10px] uppercase font-black tracking-widest">Precisión IP-Geo</p>
            <p className="text-[var(--text-1)] font-bold">{geoData.precision.detectedLocation}</p>
          </div>
        </div>

        <div className="bg-[var(--bg-1)] p-5 rounded-2xl border border-[var(--border-1)] flex items-center gap-4 shadow-[var(--shadow-1)]">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
            <Languages size={22} />
          </div>
          <div>
            <p className="text-[var(--text-3)] text-[10px] uppercase font-black tracking-widest">Contenido Dinámico</p>
            <p className="text-[var(--text-1)] font-bold">{geoData.localization.detectedRegion}</p>
          </div>
        </div>

        <div className="bg-[var(--bg-inverse)] p-5 rounded-2xl flex items-center gap-4 shadow-[var(--shadow-brand-glow)] border border-[var(--border-white-4)]/20">
          <div className="p-3 rounded-xl bg-[var(--bg-brand)] text-[var(--text-white-1)]">
            <Zap size={22} />
          </div>
          <div>
            <p className="text-[var(--text-white-4)] text-[10px] uppercase font-black tracking-widest">CDN Node Status</p>
            <p className="text-[var(--text-white-1)] font-bold">{geoData.infrastructure.cdnProvider}</p>
          </div>
        </div>
      </div>

      {/* 2. TABLA DE AUDITORÍA GEOGRÁFICA (POWER BI STYLE) */}
      <div className="bg-[var(--bg-1)] rounded-3xl border border-[var(--border-1)] shadow-[var(--shadow-2)] overflow-hidden">
        <div className="p-6 border-b border-[var(--border-1)] bg-[var(--bg-1)] flex justify-between items-center">
          <h3 className="text-[var(--text-1)] font-black flex items-center gap-2 uppercase tracking-tighter">
            <Globe size={20} className="text-[var(--text-brand)]" />
            Análisis de Infraestructura Global
          </h3>
          <span className="px-3 py-1 bg-[var(--bg-3)] text-[var(--text-3)] text-[10px] font-bold rounded-full uppercase tracking-widest">
            IP: {geoData.precision.detectedIp}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[var(--bg-2)] text-[var(--text-3)] text-[10px] uppercase font-black tracking-widest">
              <tr>
                <th className="p-4 border-b border-[var(--border-1)]">Subcategoría</th>
                <th className="p-4 border-b border-[var(--border-1)]">Estado Actual</th>
                <th className="p-4 border-b border-[var(--border-1)]">Fallas Comunes Detectadas</th>
                <th className="p-4 border-b border-[var(--border-1)]">Optimización Sugerida</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-1)] text-[var(--text-2)] text-xs">
              
              {/* FILA: PRECISIÓN IP */}
              <tr className="hover:bg-[var(--bg-2)] transition-colors">
                <td className="p-4 font-bold text-[var(--text-1)]">Precisión IP-Geo</td>
                <td className="p-4 italic">Ubicación detectada: {geoData.precision.detectedLocation} via {geoData.precision.isp}</td>
                <td className="p-4">
                  <div className="flex items-start gap-2 text-orange-500 font-medium">
                    <AlertCircle size={14} className="mt-0.5" />
                    <span>Datos de geolocalización obsoletos o asignación nacional genérica.</span>
                  </div>
                </td>
                <td className="p-4">
                  <p className="leading-relaxed">
                    Usa una base de datos <strong>IP-geo confiable</strong>. Implementa geofeeds para publicar rangos de IP si gestionas red propia.
                  </p>
                </td>
              </tr>

              {/* FILA: CONTENIDO LOCALIZADO */}
              <tr className="hover:bg-[var(--bg-2)] transition-colors">
                <td className="p-4 font-bold text-[var(--text-1)]">Contenido Localizado</td>
                <td className="p-4">
                  <span className="flex items-center gap-1">
                    <RefreshCcw size={12} className="text-[var(--text-brand)]" /> Redirección Activa
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-start gap-2 text-red-500 font-medium">
                    <AlertCircle size={14} className="mt-0.5" />
                    <span>Redirecciones incorrectas (ej: usuario ES redirigido a MX). Formatos de moneda erróneos.</span>
                  </div>
                </td>
                <td className="p-4">
                  <p className="leading-relaxed">
                    Implementa redirecciones basadas en IP sin bloquear bots. Ofrece siempre un <strong>selector manual</strong> de país/idioma.
                  </p>
                </td>
              </tr>

              {/* FILA: CDN Y CACHÉ */}
              <tr className="hover:bg-[var(--bg-2)] transition-colors">
                <td className="p-4 font-bold text-[var(--text-1)]">CDN y Caché</td>
                <td className="p-4">Nodo actual: {geoData.infrastructure.nodeLocation}</td>
                <td className="p-4">
                  <div className="flex items-start gap-2 text-red-500 font-medium">
                    <AlertCircle size={14} className="mt-0.5" />
                    <span>Usuarios servidos desde origen único provocando alta latencia global.</span>
                  </div>
                </td>
                <td className="p-4">
                  <p className="leading-relaxed">
                    Configura el <strong>CDN</strong> para servir desde el nodo más cercano. Revisa caché para contenido dinámico regionalizado.
                  </p>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* 3. GRÁFICO DE LATENCIA POR NODO (RECHARTS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-[var(--bg-1)] p-6 rounded-3xl border border-[var(--border-1)] shadow-[var(--shadow-1)]">
          <h4 className="text-[var(--text-1)] font-black text-sm uppercase tracking-tighter mb-6 flex items-center gap-2">
            <Activity size={18} className="text-[var(--bg-success)]" /> 
            Latencia de Red por Región Geográfica
          </h4>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={geoData.infrastructure.latencies} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-1)" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="city" 
                  type="category" 
                  tick={{ fill: 'var(--text-3)', fontSize: 10, fontWeight: 'bold' }} 
                  width={100} 
                />
                <Tooltip 
                  cursor={{ fill: 'var(--bg-2)' }}
                  contentStyle={{ 
                    backgroundColor: 'var(--bg-1)', 
                    borderColor: 'var(--border-1)',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }} 
                />
                <Bar dataKey="ms" radius={[0, 4, 4, 0]} barSize={20}>
                  {geoData.infrastructure.latencies.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. BLOQUE DE INFRAESTRUCTURA DE RED */}
        <div className="lg:col-span-4 bg-[var(--bg-inverse)] p-6 rounded-3xl border border-[var(--border-white-4)]/20 shadow-[var(--shadow-brand-glow-intense)] flex flex-col justify-between">
           <div>
              <div className="flex items-center gap-2 mb-4">
                <Navigation size={18} className="text-[var(--text-brand)]" />
                <h4 className="text-[var(--text-white-1)] font-bold uppercase text-xs tracking-widest">Routing Intelligence</h4>
              </div>
              <p className="text-[var(--text-white-3)] text-xs leading-relaxed">
                El sistema detecta una optimización de borde activa. Los protocolos <strong>HTTP/3 (QUIC)</strong> y <strong>TLS 1.3</strong> están reduciendo los tiempos de handshake en un 40%.
              </p>
           </div>

           <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[var(--text-white-4)] text-[10px] font-bold uppercase">Edge Computing</span>
                <span className="text-[var(--text-success)] text-xs font-black italic">ACTIVE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--text-white-4)] text-[10px] font-bold uppercase">IPv6 Support</span>
                <span className="text-[var(--text-white-1)] text-xs font-black italic">ENABLED</span>
              </div>
              <button className="w-full py-3 bg-[var(--bg-brand)] text-[var(--text-inverse)] rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-[var(--shadow-brand-glow)] hover:scale-[1.02] transition-transform">
                Trace Route Global
              </button>
           </div>
        </div>
      </div>

    </div>
  )
}