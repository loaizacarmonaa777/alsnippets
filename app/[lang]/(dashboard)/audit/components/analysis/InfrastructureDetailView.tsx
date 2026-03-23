'use client'

import React, { useState, useEffect } from 'react'
import { 
  Server, Globe, ShieldAlert, 
  Database, RefreshCcw, HardDrive, 
  Activity, Search, Terminal,
  Clock, CheckCircle2, AlertTriangle
} from 'lucide-react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface InfraProps {
  data: any
  dict: any
}

export default function InfrastructureDetailView({ data, dict }: InfraProps) {
  // Datos simulados (Se conectarán a tu API de Node/DNS)
  const infraData = {
    clientIp: "181.143.XX.XX",
    server: {
      ip: "104.21.XX.XX",
      provider: "Cloudflare, Inc.",
      reverseLookup: "sites.cloudflare.com",
      location: "Miami, US",
      sslExpiry: "24 days"
    },
    dnsPropagation: [
      { city: "New York", status: "OK", ip: "104.21.7.210", time: "12ms" },
      { city: "Madrid", status: "OK", ip: "104.21.7.210", time: "45ms" },
      { city: "Tokyo", status: "OK", ip: "104.21.7.210", time: "180ms" },
      { city: "Bogotá", status: "OK", ip: "104.21.7.210", time: "32ms" },
      { city: "London", status: "OK", ip: "104.21.7.210", time: "22ms" },
    ],
    backups: {
      status: "Warning",
      lastDate: "4 days ago",
      strategy: "Off-site (AWS S3)"
    }
  }

  return (
    <div className="space-y-6">
      {/* ROW 1: NETWORK IDENTITY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TU IP (CLIENTE) */}
        <div className="bg-[var(--bg-1)] p-6 rounded-3xl border border-[var(--border-1)] shadow-[var(--shadow-1)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[var(--bg-brand-hover)] text-[var(--text-brand)] rounded-lg">
              <Search size={18} />
            </div>
            <h4 className="text-[var(--text-1)] font-black text-sm uppercase">Tu Identidad de Red</h4>
          </div>
          <p className="text-[var(--text-3)] text-[10px] font-bold uppercase mb-1">Public Client IP</p>
          <p className="text-2xl font-black text-[var(--text-1)] tracking-tight">{infraData.clientIp}</p>
        </div>

        {/* IP DEL SERVIDOR */}
        <div className="bg-[var(--bg-inverse)] p-6 rounded-3xl shadow-[var(--shadow-brand-glow-intense)]">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 text-[var(--text-white-5)] rounded-lg">
                <Server size={18} />
              </div>
              <div>
                <h4 className="text-white font-black text-sm uppercase leading-none">Server Endpoint</h4>
                <p className="text-[var(--text-white-4)] text-[10px] font-bold mt-1">REVERSE LOOKUP DETECTED</p>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-[var(--bg-success)] text-white text-[9px] font-black rounded uppercase">Online</span>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <div className="flex justify-between text-xs">
              <span className="text-[var(--text-white-4)] font-bold">IPv4 Address:</span>
              <span className="text-white font-mono">{infraData.server.ip}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[var(--text-white-4)] font-bold">Hostname:</span>
              <span className="text-white font-mono">{infraData.server.reverseLookup}</span>
            </div>
          </div>
        </div>
      </div>

      {/* DNS GLOBAL PROPAGATION (VERSION SCROLL MEJORADA) */}
      <div className="bg-[var(--bg-1)] rounded-3xl border border-[var(--border-1)] overflow-hidden shadow-[var(--shadow-2)]">
        <div className="p-5 border-b border-[var(--border-1)] flex justify-between items-center bg-[var(--bg-2)]">
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-[var(--text-brand)]" />
            <h3 className="text-[var(--text-1)] font-black uppercase text-xs tracking-widest">Global DNS Propagation (Real-time)</h3>
          </div>
          <RefreshCcw size={14} className="text-[var(--text-3)] animate-spin-slow" />
        </div>
        
        <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-[var(--bg-1)] shadow-sm">
              <tr className="text-[var(--text-3)] text-[9px] font-black uppercase border-b border-[var(--border-1)]">
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4">Resolved IP</th>
                <th className="p-4 text-right">Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-1)]">
              {infraData.dnsPropagation.map((node, i) => (
                <tr key={i} className="hover:bg-[var(--bg-2)] transition-colors">
                  <td className="p-4 text-[var(--text-1)] font-bold text-xs">{node.city}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-[var(--bg-success)] font-black text-[10px]">
                      <CheckCircle2 size={12} /> OK
                    </div>
                  </td>
                  <td className="p-4 text-[var(--text-2)] font-mono text-xs">{node.ip}</td>
                  <td className="p-4 text-right text-[var(--text-3)] font-bold text-xs">{node.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PROTOCOLO DE MANTENIMIENTO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfraCard 
          icon={<Database size={18} />} 
          title="Backups 3-2-1" 
          status={infraData.backups.status}
          value={infraData.backups.lastDate}
          desc="Copia en S3 detectada. Última sincronización fuera de plazo óptimo."
        />
        <InfraCard 
          icon={<Clock size={18} />} 
          title="SSL Expiry" 
          status="Optimal"
          value={infraData.server.sslExpiry}
          desc="Auto-renovación activa vía Let's Encrypt / Cloudflare."
        />
        <InfraCard 
          icon={<ShieldAlert size={18} />} 
          title="Activity Logs" 
          status="Critical"
          value="Inactivo"
          desc="No se detecta registro de eventos 500 o ataques XSS en servidor."
        />
      </div>
    </div>
  )
}

function InfraCard({ icon, title, status, value, desc }: any) {
  const isCritical = status === 'Critical';
  const isWarning = status === 'Warning';
  
  return (
    <div className="bg-[var(--bg-1)] p-5 rounded-2xl border border-[var(--border-1)] flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div className="p-2 bg-[var(--bg-2)] text-[var(--text-brand)] rounded-lg">{icon}</div>
        <span className={clsx(
          "px-2 py-0.5 rounded text-[8px] font-black uppercase",
          isCritical ? "bg-[var(--spectrum-red)] text-white" : isWarning ? "bg-orange-500 text-white" : "bg-[var(--bg-success)] text-white"
        )}>
          {status}
        </span>
      </div>
      <div>
        <h5 className="text-[var(--text-1)] font-bold text-sm">{title}</h5>
        <p className="text-[var(--text-brand)] font-black text-xs uppercase">{value}</p>
      </div>
      <p className="text-[var(--text-3)] text-[10px] leading-snug">{desc}</p>
    </div>
  )
}