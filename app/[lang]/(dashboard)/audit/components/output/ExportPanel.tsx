'use client'

import React, { useState } from 'react'
import { FileDown, Printer, Share2, Loader2, Check } from 'lucide-react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

interface ExportPanelProps {
  dict: any
  data: any
  domId: string // El ID del contenedor que queremos capturar (el Dashboard)
}

export default function ExportPanel({ dict, data, domId }: ExportPanelProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [done, setDone] = useState(false)

  const handleExportPDF = async () => {
    const element = document.getElementById(domId)
    if (!element) return

    setIsExporting(true)
    
    try {
      // Configuramos html2canvas para capturar con alta calidad
      const canvas = await html2canvas(element, {
        scale: 2, // Doble resolución para que el PDF no se vea pixelado
        useCORS: true,
        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-1'),
        logging: false,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2] // Ajustamos al tamaño real
      })

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2)
      
      // Añadimos una marca de agua o pie de página profesional
      pdf.setFontSize(10)
      pdf.setTextColor(150)
      pdf.text(`Auditoría Profesional realizada por ALSNIPPETS - ${new Date().toLocaleDateString()}`, 20, (canvas.height / 2) - 10)

      pdf.save(`Auditoria_AL_${data.meta?.domain || 'Web'}.pdf`)
      
      setDone(true)
      setTimeout(() => setDone(false), 3000)
    } catch (error) {
      console.error('Error generando PDF:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="bg-[var(--bg-1)] p-6 rounded-3xl border border-[var(--border-3)] shadow-[var(--shadow-brand-glow)] flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-[var(--bg-brand-hover)]">
          <FileDown className="text-[var(--text-brand)]" size={24} />
        </div>
        <div>
          <h3 className="text-[var(--text-1)] font-bold text-lg">
            {dict.buttons?.export || 'Finalizar Informe'}
          </h3>
          <p className="text-[var(--text-3)] text-xs font-medium">
            Genera un PDF profesional con costos, tiempos y hallazgos.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <button 
          onClick={() => window.print()}
          className="flex-1 md:flex-none px-4 py-3 rounded-xl border border-[var(--border-1)] text-[var(--text-3)] hover:bg-[var(--bg-2)] transition-all flex items-center justify-center gap-2"
        >
          <Printer size={18} />
        </button>
        
        <button 
          disabled={isExporting}
          onClick={handleExportPDF}
          className="flex-[2] md:flex-none px-8 py-3 rounded-xl bg-[var(--bg-brand)] text-[var(--text-4)] font-bold shadow-[var(--shadow-brand-glow)] hover:shadow-[var(--shadow-brand-glow-hover)] disabled:opacity-50 transition-all flex items-center justify-center gap-2 min-w-[200px]"
        >
          {isExporting ? (
            <Loader2 className="animate-spin" size={20} />
          ) : done ? (
            <Check size={20} />
          ) : (
            <FileDown size={20} />
          )}
          {isExporting ? 'Procesando...' : done ? '¡Descargado!' : 'Descargar Reporte Pro'}
        </button>
      </div>
    </div>
  )
}