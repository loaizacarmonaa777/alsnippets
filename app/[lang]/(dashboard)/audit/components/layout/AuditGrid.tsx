'use client'

import React from 'react'
import { AuditResult } from '@/lib/audit/types'
import ScoreGuage from '../charts/ScoreGuage'
import RadarMetrics from '../charts/RadarMetrics'
import TechStackList from '../analysis/TechStackList'
import IssueAccordion from '../analysis/IssueAccordion'
import AIBusinessImpact from '../output/AIBusinessImpact'
import DistributionBar from '../charts/DistributionBar'
import { Search, Monitor } from 'lucide-react' // Importamos para la vista de espera

// IMPORTACIONES DE VISTAS DETALLADAS
import SeoDetailView from '../analysis/SeoDetailView'
import GeoDetailView from '../analysis/GeoDetailView'
import SecurityDetailView from '../analysis/SecurityDetailView'
import TechDetailView from '../analysis/TechDetailView'
import AnalyticsDetailView from '../analysis/AnalyticsDetailView'
import PerformanceDetailView from '../analysis/PerformanceDetailView'
import InfrastructureDetailView from '../analysis/InfrastructureDetailView'

interface AuditGridProps {
  data: Partial<AuditResult>
  dict: any
  activeSection: string 
}

export default function AuditGrid ({
  data,
  dict,
  activeSection
}: AuditGridProps) {

  // LÓGICA DE VERIFICACIÓN: ¿El objeto data está vacío o no tiene un análisis real?
  const hasData = data && Object.keys(data).length > 0 && (data.meta?.domain || data.meta?.overallScore);

  if (!hasData) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[500px] w-full bg-[var(--bg-1)] rounded-3xl border-2 border-dashed border-[var(--border-1)] animate-in fade-in zoom-in duration-500'>
        <div className='w-20 h-20 rounded-full bg-[var(--bg-2)] flex items-center justify-center mb-6 shadow-[var(--shadow-1)]'>
          <Search size={32} className='text-[var(--text-brand)] animate-pulse' />
        </div>
        <h2 className='text-[var(--text-1)] font-black text-xl uppercase tracking-tighter'>
          Esperando datos de análisis
        </h2>
        <p className='text-[var(--text-3)] text-sm mt-2 max-w-sm text-center font-medium'>
          Por favor, introduce una URL válida o pega el código fuente en la barra superior para activar el motor de inteligencia.
        </p>
        <div className='mt-8 flex gap-4'>
           <div className='flex items-center gap-2 px-4 py-2 bg-[var(--bg-2)] rounded-xl border border-[var(--border-1)]'>
              <Monitor size={14} className='text-[var(--text-3)]' />
              <span className='text-[10px] font-black text-[var(--text-3)] uppercase tracking-widest'>Estado: Standby</span>
           </div>
        </div>
      </div>
    )
  }

  // SI HAY DATOS, PROCEDEMOS CON EL RENDERIZADO NORMAL
  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-700'>
      {/* LÓGICA DE NAVEGACIÓN PRINCIPAL: */}
      {activeSection === 'INFRAESTRUCTURA Y OPERACIONES' ? (
        <div className='lg:col-span-12'>
          <InfrastructureDetailView data={data} dict={dict} />
        </div>
      ) : activeSection === 'UX' ? (
        <div className='lg:col-span-12'>
          <AnalyticsDetailView data={data} dict={dict} />
        </div>
      ) : activeSection === 'RENDIMIENTO Y PERFORMANCE' ? (
        <div className='lg:col-span-12'>
          <PerformanceDetailView data={data} dict={dict} />
        </div>
      ) : activeSection === 'TRACKING Y ANALYTICS' ? (
        <div className='lg:col-span-12'>
          <AnalyticsDetailView data={data} dict={dict} />
        </div>
      ) : activeSection === 'TECNOLOGIAS' ? (
        <div className='lg:col-span-12'>
          <TechDetailView data={data} dict={dict} />
        </div>
      ) : activeSection === 'SEGURIDAD' ? (
        <div className='lg:col-span-12'>
          <SecurityDetailView data={data} dict={dict} />
        </div>
      ) : activeSection === 'GEO' ? (
        <div className='lg:col-span-12'>
          <GeoDetailView data={data} dict={dict} />
        </div>
      ) : activeSection === 'SEO' ? (
        <div className='lg:col-span-12'>
          <SeoDetailView data={data} dict={dict} />
        </div>
      ) : (
        <>
          {/* SECCIÓN IZQUIERDA: RESUMEN Y MÉTRICAS (4 Columnas) */}
          <div className='lg:col-span-4 space-y-6'>
            {/* Card Puntuación Global */}
            <div className='bg-[var(--bg-1)] p-6 rounded-3xl border border-[var(--border-1)] shadow-[var(--shadow-1)] flex flex-col items-center'>
              <h3 className='text-[var(--text-3)] text-xs uppercase tracking-widest mb-4 font-bold'>
                {dict.scores?.global || 'Puntuación Global'}
              </h3>
              <ScoreGuage value={data.meta?.overallScore || 0} />
            </div>

            {/* Card Radar de Capacidades */}
            <div className='bg-[var(--bg-1)] p-6 rounded-3xl border border-[var(--border-1)] shadow-[var(--shadow-1)]'>
              <h3 className='text-[var(--text-3)] text-xs uppercase tracking-widest mb-4 font-bold text-center'>
                Métricas de Análisis
              </h3>
              <div className='h-[250px] w-full'>
                <RadarMetrics data={data} />
              </div>
            </div>

            {/* Card Impacto de Negocio (IA) */}
            <div className='bg-[var(--bg-inverse)] p-6 rounded-3xl shadow-[var(--shadow-2)] border border-[var(--border-white-4)]'>
              <AIBusinessImpact data={data.businessImpact} dict={dict} />
            </div>
          </div>

          {/* SECCIÓN DERECHA: DETALLES TÉCNICOS (8 Columnas) */}
          <div className='lg:col-span-8 space-y-6'>
            {/* Fila Superior: Tech Stack e Inventario */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='bg-[var(--bg-1)] p-6 rounded-3xl border border-[var(--border-1)] shadow-[var(--shadow-1)]'>
                <h3 className='text-[var(--text-1)] font-bold mb-4 flex items-center gap-2'>
                  <span className='w-2 h-2 rounded-full bg-[var(--bg-brand)]'></span>
                  Tecnologías Detectadas
                </h3>
                <TechStackList
                  stack={data.security?.pluginsDetected || []}
                  isWP={data.security?.isWordPress}
                />
              </div>

              <div className='bg-[var(--bg-1)] p-6 rounded-3xl border border-[var(--border-1)] shadow-[var(--shadow-1)]'>
                <h3 className='text-[var(--text-1)] font-bold mb-4 flex items-center gap-2'>
                  <span className='w-2 h-2 rounded-full bg-[var(--bg-success)]'></span>
                  Distribución de Recursos
                </h3>
                <DistributionBar data={data.performance} />
              </div>
            </div>

            {/* Fila Inferior: Listado de Hallazgos (Acordeón) */}
            <div className='bg-[var(--bg-1)] p-6 rounded-3xl border border-[var(--border-1)] shadow-[var(--shadow-1)] min-h-[400px]'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-[var(--text-1)] font-bold text-xl'>
                  Detalle de la Auditoría
                </h3>
                <span className='px-3 py-1 rounded-full bg-[var(--bg-2)] text-[var(--text-3)] text-xs font-mono'>
                  {data.security?.vulnerabilities?.length || 0} Hallazgos
                </span>
              </div>

              <IssueAccordion
                vulnerabilities={data.security?.vulnerabilities || []}
                seo={data.seo}
                dict={dict}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}