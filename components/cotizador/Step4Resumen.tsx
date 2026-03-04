// components/cotizador/Step4Resumen.tsx
'use client'

import React from 'react';
import { CheckCircle, MessageCircle, Download, RefreshCw } from 'lucide-react';
import type { CotizadorData } from './CotizadorApp';
import { PRICES, Currency } from './utils/pricingLogic';

interface Step4ResumenProps {
  formData: CotizadorData;
  onReset: () => void;
}

export default function Step4Resumen({ formData, onReset }: Step4ResumenProps) {
  
  // 1. EL MOTOR MATEMÁTICO
  const getCalculation = () => {
    const p = PRICES[formData.moneda as Currency] || PRICES['USD'];
    let total = 0;
    const items: { label: string; highlight?: boolean }[] = [];

    switch (formData.servicioPrincipal) {
      case 'Crear Web':
        total += p.webBase;
        items.push({ label: 'Desarrollo Sitio Web Base (5-7 secciones)' });
        if (formData.necesitaWooCommerce === 'Sí') {
          total += p.wooCommerce;
          items.push({ label: '+ Integración E-commerce Completa' });
        }
        if (formData.tieneBranding === 'No') {
          total += p.branding;
          items.push({ label: '+ Diseño de Branding y Manual de Marca' });
        }
        break;

      case 'Soporte':
        if (formData.necesidadesSoporte.includes('Soporte Global')) {
          total += p.soporteGlobal;
          items.push({ label: `Soporte Global Integral (${formData.plataformaSoporte})`, highlight: true });
        } else if (formData.plataformaSoporte === 'Otro') {
          total += p.soporteModulo * 1.5; // Revisión custom
          items.push({ label: `Revisión Técnica Custom (${formData.plataformaSoporte})` });
        } else {
          formData.necesidadesSoporte.forEach(need => {
            total += p.soporteModulo;
            items.push({ label: `+ ${need}` });
          });
        }
        break;

      case 'Por Horas':
        const rate = formData.tipoHoras === 'Code' ? p.horaCode : p.horaNoCode;
        total += rate * formData.cantidadHoras;
        items.push({ label: `Bolsa de ${formData.cantidadHoras} horas (${formData.tipoHoras})`, highlight: true });
        break;

      case 'SEO':
        total += p.seo;
        items.push({ label: 'Auditoría y Estrategia SEO Inicial' });
        break;
    }

    return { total, items };
  };

  const { total, items } = getCalculation();

  // Formateador de moneda profesional
  const formattedTotal = new Intl.NumberFormat(formData.moneda === 'COP' ? 'es-CO' : 'en-US', {
    style: 'currency',
    currency: formData.moneda,
    minimumFractionDigits: formData.moneda === 'COP' ? 0 : 2
  }).format(total);

  // 2. ENLACES Y ACCIONES
  const generateWhatsAppLink = () => {
    const text = `¡Hola Adrián! 👋 Acabo de realizar una cotización en tu web.\n\n*Nombre:* ${formData.nombre}\n*Servicio:* ${formData.servicioPrincipal}\n*Total estimado:* ${formattedTotal} ${formData.moneda}\n\nMe gustaría hablar sobre los detalles para empezar.`;
    return `https://wa.me/573246454061?text=${encodeURIComponent(text)}`;
  };

  const handlePrintPDF = () => {
    const printWindow = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    if (!printWindow) return;

    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    const htmlContent = `
      <html>
        <head>
          <title>Cotización - Alsnippets</title>
          <style>
            body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #1a1a1a; line-height: 1.6; max-width: 800px; margin: 0 auto; }
            .header { border-bottom: 2px solid #f0f0f0; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { max-width: 180px; margin-bottom: 10px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; }
            .info-grid p { margin: 5px 0; font-size: 14px; }
            .item-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px dashed #e2e8f0; font-size: 15px; }
            .highlight { color: #b45309; font-weight: bold; }
            .total-box { margin-top: 30px; padding: 20px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; text-align: right; }
            .total-title { font-size: 12px; color: #166534; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; margin: 0; }
            .total-amount { font-size: 32px; font-weight: 900; color: #15803d; margin: 5px 0 0 0; }
            .footer { margin-top: 50px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="${window.location.origin}/brand/logo-dark-eslogan-es.svg" class="logo" alt="Alsnippets Logo" onerror="this.style.display='none'" />
            <h1 style="margin: 10px 0 5px 0; font-size: 24px;">Presupuesto Estimado</h1>
            <p style="margin: 0; color: #64748b; font-size: 14px;">Fecha: ${today}</p>
          </div>

          <div class="info-grid">
            <div>
              <strong style="color: #0f172a;">Preparado para:</strong>
              <p>${formData.nombre}</p>
              <p>${formData.email}</p>
              <p>${formData.whatsapp} (${formData.pais})</p>
            </div>
            <div>
              <strong style="color: #0f172a;">Consultor Técnico:</strong>
              <p>Adrián Loaiza - Alsnippets</p>
              <p>contact@alsnippets.com</p>
              <p>+57 324 645 4061</p>
            </div>
          </div>

          <h3 style="margin-bottom: 15px; border-bottom: 2px solid #0f172a; display: inline-block; padding-bottom: 5px;">Desglose de Servicios (${formData.servicioPrincipal})</h3>
          
          ${items.map(i => `
            <div class="item-row">
              <span class="${i.highlight ? 'highlight' : ''}">${i.label}</span>
              <span style="color: #64748b;">Incluido</span>
            </div>
          `).join('')}

          <div class="total-box">
            <p class="total-title">Inversión Aproximada (${formData.moneda})</p>
            <p class="total-amount">${formattedTotal}</p>
          </div>

          <div class="footer">
            <p>Este documento es una estimación automatizada basada en la información proporcionada y no representa un contrato vinculante.</p>
            <p>Los precios finales pueden variar tras una auditoría técnica profunda del sitio web y los requerimientos exactos.</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 700); // Damos un poco más de tiempo para que cargue el logo
  };

  return (
    <div className="space-y-8 animate-fade-in pb-4">
      <div className="text-center space-y-3">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h2 className="text-3xl font-black text-[var(--text-primary)]">Cotización Estimada</h2>
        <p className="text-[var(--text-secondary)]">Preparada especialmente para <strong className="text-[var(--text-primary)]">{formData.nombre}</strong></p>
      </div>

      <div className="bg-[var(--bg-body)] p-6 md:p-8 rounded-2xl border border-[var(--border-subtle)] space-y-4 shadow-sm">
        <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-4">
          <span className="font-bold text-[var(--text-primary)] uppercase tracking-wider text-sm">
            Servicio: {formData.servicioPrincipal}
          </span>
          <span className="text-xs bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] px-2 py-1 rounded-md font-bold">
            {formData.moneda}
          </span>
        </div>
        
        <div className="space-y-3 py-2">
          {items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-start border-b border-[var(--border-subtle)] border-dashed pb-3 last:border-0">
              <span className={`text-sm ${item.highlight ? 'text-[var(--brand-primary)] font-bold' : 'text-[var(--text-secondary)]'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-6 mt-2 flex flex-col md:flex-row justify-between items-end md:items-center gap-2 border-t border-[var(--border-subtle)]">
          <div>
            <span className="block text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold">Inversión Aproximada</span>
            <span className="text-xs opacity-60 text-[var(--text-muted)]">*Sujeto a auditoría final</span>
          </div>
          <span className="text-4xl md:text-5xl font-black text-[var(--brand-primary)]">
            {formattedTotal}
          </span>
        </div>
      </div>

      {/* BOTONES DE ACCIÓN */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <a 
          href={generateWhatsAppLink()} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center gap-2 p-4 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#1ebe57] transition-all hover:-translate-y-1 shadow-md shadow-green-900/10"
        >
          <MessageCircle className="w-5 h-5" /> WhatsApp
        </a>
        <button 
          onClick={handlePrintPDF} 
          className="flex items-center justify-center gap-2 p-4 bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--brand-primary)] rounded-xl font-bold transition-all hover:-translate-y-1 shadow-sm"
        >
          <Download className="w-5 h-5" /> Generar PDF
        </button>
        <button 
          onClick={onReset} 
          className="flex items-center justify-center gap-2 p-4 bg-[var(--bg-body)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--brand-primary)] rounded-xl font-bold transition-all hover:-translate-y-1 shadow-sm md:col-span-2 lg:col-span-1"
        >
          <RefreshCw className="w-5 h-5" /> Nueva Cotización
        </button>
      </div>
      
      <p className="text-center text-xs text-[var(--text-muted)] pt-4">
        Tus datos están seguros. Al hacer clic en WhatsApp, me enviarás este resumen directamente.
      </p>
    </div>
  );
}