'use client'

import React from 'react'
import {
  CheckCircle,
  MessageCircle,
  Download,
  RefreshCw,
  Mail,
  Phone
} from 'lucide-react'
import type { CotizadorData } from './CotizadorApp'
import {
  PRICES,
  Currency,
  TECH_MULTIPLIERS,
  calculateAdjustedPrice
} from './utils/pricingLogic'

interface Step4ResumenProps {
  formData: CotizadorData
  onReset: () => void
  lang: string
  dict: any
}

export default function Step4Resumen ({
  formData,
  onReset,
  lang,
  dict: t
}: Step4ResumenProps) {
  const getCalculation = () => {
    const p = PRICES[formData.moneda as Currency] || PRICES['USD']
    const tech = formData.plataformaSoporte || 'WordPress'
    const labels = t?.labels || {}
    let totalBase = 0
    const items: { label: string; highlight?: boolean }[] = []

    if (formData.servicioPrincipal === 'Crear Web') {
      totalBase += p.webBase
      items.push({ label: labels.webBase })
      if (formData.necesitaWooCommerce === 'Sí') totalBase += p.ecommerce
      if (formData.tieneBranding === 'No') totalBase += p.brandingBase
      if (formData.tieneDominio === 'No') totalBase += p.gestionDominio
      if (formData.tieneHosting === 'No') totalBase += p.gestionHosting
      if (formData.tieneEstructura === 'No') totalBase += p.setupTextos
    } else if (formData.servicioPrincipal === 'Soporte') {
      if (formData.necesidadesSoporte.includes('Soporte Global')) {
        totalBase += p.soporteGlobal
        items.push({ label: `${labels.sopGlobal} (${tech})`, highlight: true })
      } else {
        formData.necesidadesSoporte.forEach(needId => {
          if (needId.includes('Mantenimiento')) totalBase += p.mantenimiento
          else if (needId.includes('Rendimiento')) totalBase += p.wpo
          else if (needId.includes('Diseño')) totalBase += p.diseno
          else if (needId.includes('Tienda')) totalBase += p.ecommerce
          else if (needId.includes('Hosting')) totalBase += p.infraestructura
          else totalBase += 100
          items.push({ label: `+ ${needId}` })
        })
      }
    } else if (formData.servicioPrincipal === 'SEO') {
      totalBase += p.seoAuditoria
      items.push({ label: labels.seoTitle })
    } else if (formData.servicioPrincipal === 'Por Horas') {
      const rate = formData.tipoHoras === 'Code' ? p.horaCode : p.horaNoCode
      totalBase = rate * formData.cantidadHoras
      items.push({
        label: `${labels.hrsTitle} ${formData.cantidadHoras} ${labels.hrsUnit}`,
        highlight: true
      })
    }

    const finalTotal =
      formData.servicioPrincipal === 'Por Horas'
        ? totalBase
        : calculateAdjustedPrice(totalBase, tech)

    return { total: finalTotal, items, tech }
  }

  const { total, items, tech } = getCalculation()

  const formattedTotal = new Intl.NumberFormat(
    formData.moneda === 'COP' ? 'es-CO' : 'en-US',
    {
      style: 'currency',
      currency: formData.moneda,
      minimumFractionDigits: 0
    }
  ).format(total)

  const generateWhatsAppLink = () => {
    let text = t?.waMsg || ''
    text = text
      .replace('{name}', formData.nombre)
      .replace('{tech}', tech)
      .replace('{total}', `${formattedTotal} ${formData.moneda}`)

    return `https://wa.me/573246454061?text=${encodeURIComponent(
      text + '\n\n' + t?.waContact
    )}`
  }

  const handlePrintPDF = () => {
    const printWindow = window.open('', '', 'width=850,height=1000')
    if (!printWindow) return

    const pdf = t?.pdf || {}
    const today = new Date().toLocaleDateString(
      lang === 'en' ? 'en-US' : 'es-ES',
      { year: 'numeric', month: 'long', day: 'numeric' }
    )

    // CORRECCIÓN: Usamos 'items' (que viene de getCalculation) en lugar de 'calculation.breakdown'
    const htmlContent = `
      <html>
        <head>
          <title>Alsnippets - ${formData.nombre}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
            :root { 
              --brand: #c9a34e; 
              --text-main: #0f172a; 
              --text-muted: #334155;
              --bg-card: #f7f8fa;
              --white: #ffffff;
            }
            body { 
              font-family: 'Inter', 'Helvetica', Arial, sans-serif; 
              padding: 40px; 
              color: var(--text-main); 
              line-height: 1.6;
              background-color: var(--white);
            }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #c9a34e; padding-bottom: 20px; margin-bottom: 40px; }
            .logo-box { flex: 1; }
            .logo-box img { display: block; width: 250px; height: auto; -webkit-print-color-adjust: exact; }
            .meta { text-align: right; font-size: 13px; color: var(--text-muted); }
            .grid { display: flex; gap: 30px; margin-bottom: 40px; }
            .card { flex: 1; background: var(--bg-card); padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb; }
            .card h4 { margin: 0 0 10px 0; color: var(--brand); text-transform: uppercase; font-size: 11px; letter-spacing: 1.5px; font-weight: 900; }
            .card p { margin: 2px 0; font-size: 13px; font-weight: 500; }
            .item-list h3 { font-size: 18px; border-bottom: 1px solid var(--brand); padding-bottom: 8px; margin-bottom: 15px; font-weight: 900; }
            .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
            .total-section { 
              margin-top: 40px; padding: 30px 40px; background-color: #0f172a !important; color: #ffffff !important; 
              border-radius: 16px; display: flex; justify-content: space-between; align-items: center; -webkit-print-color-adjust: exact;
            }
            .total-section h3 { margin: 0; font-size: 16px; color: #ffffff !important; }
            .total-section p { margin: 5px 0 0 0; font-size: 12px; color: #c9a34e !important; text-transform: uppercase; font-weight: 900; }
            .amount { font-size: 42px; font-weight: 900; color: #c9a34e !important; }
            .clausules { margin-top: 40px; font-size: 11px; color: var(--text-muted); background: #fffdf8; padding: 20px; border-radius: 8px; border: 1px solid #f7edd7; -webkit-print-color-adjust: exact; }
            .signature-box { margin-top: 40px; }
            .signature-box img { max-width: 180px; height: auto; margin: 10px 0; display: block; }
            .footer { margin-top: 60px; text-align: center; font-size: 11px; border-top: 1px solid #e5e7eb; padding-top: 20px; color: var(--text-muted); }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo-box">
              <img src="${window.location.origin}/brand/logo-fondo-light-eslogan-es.svg" alt="Alsnippets Logo" />
            </div>
            <div class="meta">
              <p><strong>${pdf.date}:</strong> ${today}</p>
              <p><strong>Ref No:</strong> ALS-${Math.floor(Math.random() * 9000) + 1000}</p>
            </div>
          </div>

          <div class="grid">
            <div class="card">
              <h4>${pdf.prepared}</h4>
              <p><strong>${formData.nombre}</strong></p>
              <p>${formData.email}</p>
              <p>${formData.whatsapp}</p>
              <p>${formData.pais}</p>
            </div>
            <div class="card">
              <h4>${pdf.consultant}</h4>
              <p><strong>Adrián Loaiza Carmona</strong></p>
              <p>contact@alsnippets.com</p>
              <p>+57 324 645 4061</p>
            </div>
          </div>

          <div class="item-list">
            <h3>${pdf.breakdown}</h3>
            ${items.map(i => `
              <div class="item">
                <span>${i.label}</span>
                <span style="color: #15803d; font-weight: bold;">[${pdf.included}]</span>
              </div>
            `).join('')}
            
            ${tech !== 'WordPress' && formData.servicioPrincipal !== 'Por Horas' ? `
              <div class="item" style="color: var(--brand); font-style: italic;">
                <span>Ajuste por tecnología (${tech})</span>
                <span style="color: #15803d; font-weight: bold;">[${pdf.included}]</span>
              </div>
            ` : ''}
          </div>

          <div class="total-section">
            <div>
              <h3>${t?.invest} (${formData.moneda})</h3>
              <p>${t?.audit}</p>
            </div>
            <div class="amount">${formattedTotal}</div>
          </div>

          <div class="clausules">
            <strong>${pdf.clausulesTitle}</strong>
            <p>• ${pdf.c1?.replace('{tech}', tech)}</p>
            <p>• ${pdf.c2}</p>
            <p>• ${pdf.c3}</p>
          </div>

          <div class="signature-box">
            <p style="font-size: 12px; color: #334155; margin-bottom: 5px;">${pdf.consultant}:</p>
            <img src="${window.location.origin}/images/precios/firma-adrian.png" alt="Firma" />
            <p style="margin: 0; font-weight: 900; color: #0f172a;">Adrián Loaiza Carmona</p>
            <p style="margin: 0; font-size: 11px; color: #c9a34e; font-weight: 700;">Full-Stack Specialist & Founder</p>
          </div>

          <div class="footer">
            <p>${pdf.footer1}</p>
            <p>${pdf.footer2}</p>
          </div>
        </body>
      </html>
    `
    printWindow.document.write(htmlContent)
    printWindow.document.close()

    setTimeout(() => {
      printWindow.focus()
      printWindow.print()
      printWindow.close()
    }, 2000)
  }

  return (
    <div className='space-y-8 animate-fade-in pb-4'>
      <div className='text-center space-y-3'>
        <CheckCircle className='w-16 h-16 text-green-500 mx-auto' />
        <h2 className='text-3xl font-black text-[var(--text-1)]'>{t?.head}</h2>
        <p className='text-[var(--text-2)]'>
          {t?.prepared}{' '}
          <strong className='text-[var(--text-1)]'>{formData.nombre}</strong>
        </p>
      </div>

      <div className='bg-[var(--bg-1)] p-6 md:p-8 rounded-2xl border border-[var(--border-1)] shadow-xl'>
        <div className='flex justify-between items-center border-b border-[var(--border-1)] pb-4 mb-4'>
          <span className='font-bold text-[var(--text-1)] uppercase text-xs tracking-widest'>
            {tech} / {formData.servicioPrincipal}
          </span>
          <span className='bg-[var(--bg-brand)]/10 text-[var(--text-brand)] px-3 py-1 rounded-full text-xs font-black'>
            {formData.moneda}
          </span>
        </div>

        <div className='space-y-3'>
          {items.map((item, idx) => (
            <div
              key={idx}
              className='flex justify-between text-sm py-1 border-b border-dashed border-[var(--border-1)] last:border-0'
            >
              <span
                className={
                  item.highlight
                    ? 'text-[var(--text-brand)] font-bold'
                    : 'text-[var(--text-2)]'
                }
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className='mt-8 pt-6 border-t-2 border-[var(--border-1)] flex justify-between items-center'>
          <div className='text-left'>
            <p className='text-[var(--text-3)] text-[10px] uppercase font-bold tracking-tighter'>
              {t?.invest}
            </p>
            <p className='text-[var(--text-brand)] text-[9px] font-medium'>
              {t?.audit}
            </p>
          </div>
          <div className='text-4xl md:text-5xl font-black text-[var(--text-1)]'>
            {formattedTotal}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <a
          href={generateWhatsAppLink()}
          target='_blank'
          className='flex items-center justify-center gap-2 p-4 bg-[#25D366] text-white rounded-xl font-bold hover:scale-[1.02] transition-all shadow-lg'
        >
          <MessageCircle /> {t?.btnWA}
        </a>
        <button
          onClick={handlePrintPDF}
          className='flex items-center justify-center gap-2 p-4 bg-[var(--bg-3)] text-[var(--text-1)] rounded-xl font-bold hover:scale-[1.02] transition-all border border-[var(--border-1)]'
        >
          <Download /> {t?.btnPDF}
        </button>
        <button
          onClick={onReset}
          className='flex items-center justify-center gap-2 p-4 bg-[var(--bg-1)] text-[var(--text-2)] rounded-xl font-bold hover:scale-[1.02] transition-all border border-[var(--border-1)]'
        >
          <RefreshCw /> {t?.btnReset}
        </button>
      </div>
    </div>
  )
}
