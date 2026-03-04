'use client';

import React, { useState, useEffect } from 'react';
import { Send, Download, MessageCircle, ChevronRight, ChevronLeft, CheckCircle, RefreshCw } from 'lucide-react';

// Tipos de datos
type Currency = 'COP' | 'USD' | 'EUR';
type Platform = 'WordPress' | 'Shopify' | 'Wix' | 'Prestashop' | 'Joomla' | 'Drupal' | 'Otro';

interface FormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  platform: Platform | '';
  needs: string[];
  customCode: boolean;
}

export default function QuoteCalculator() {
  const [step, setStep] = useState(1);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [exchangeRate, setExchangeRate] = useState({ COP: 4000, EUR: 0.92, USD: 1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', country: '', platform: '', needs: [], customCode: false
  });

  // 1. Geolocalización por IP (Con fallback seguro)
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => {
        if (!res.ok) throw new Error('API Bloqueada');
        return res.json();
      })
      .then(data => {
        if (data.country_code === 'CO') setCurrency('COP');
        else if (['ES', 'FR', 'DE', 'IT', 'PT'].includes(data.country_code)) setCurrency('EUR');
        else setCurrency('USD');
        
        // Autocompleta el país si lo encuentra
        if (data.country_name) {
          setFormData(prev => ({ ...prev, country: data.country_name }));
        }
      })
      .catch(() => {
        // Si hay un adblocker o falla en localhost, lo dejamos por defecto
        setCurrency('USD');
        // No forzamos ningún país, dejamos que el usuario lo escriba
      });
  }, []);

  // 2. Lógica de Precios
  const calculatePrice = () => {
    let baseUsd = 0;
    
    if (formData.platform === 'WordPress') baseUsd += 250;
    else if (formData.platform === 'Shopify') baseUsd += 350;
    else if (formData.platform === 'Prestashop') baseUsd += 400;
    else if (formData.platform !== '') baseUsd += 200;

    const extraCosts: Record<string, number> = {
      'Optimización WPO': 150,
      'Seguridad y Malware': 200,
      'Mantenimiento Mensual': 100,
      'Migración de Hosting': 120,
      'Instalación de Plugins/Apps': 80,
      'Errores de diseño/responsive': 130
    };

    formData.needs.forEach(need => {
      if (extraCosts[need]) baseUsd += extraCosts[need];
    });

    if (formData.customCode) baseUsd += 300;

    const finalPrice = baseUsd * exchangeRate[currency];
    
    return new Intl.NumberFormat('es-CO', { 
      style: 'currency', 
      currency: currency,
      maximumFractionDigits: currency === 'COP' ? 0 : 2
    }).format(finalPrice);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleNeed = (need: string) => {
    setFormData(prev => {
      const needs = prev.needs.includes(need) 
        ? prev.needs.filter(n => n !== need) 
        : [...prev.needs, need];
      return { ...prev, needs };
    });
  };

  const handleFinalize = async () => {
    setIsSubmitting(true);
    try {
      // Simulación de envío a tu correo
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      setQuoteSent(true);
      setStep(4);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ------------------------------------------------------------------
  // ACCIONES FINALES: WhatsApp, PDF y Resetear
  // ------------------------------------------------------------------
  const generateWhatsAppLink = () => {
    const text = `Hola Adrián, acabo de realizar una cotización en tu web.\nMi nombre es ${formData.name}.\nPlataforma: ${formData.platform}\nTotal estimado: ${calculatePrice()}.\nMe gustaría hablar los detalles.`;
    return `https://wa.me/573246454061?text=${encodeURIComponent(text)}`;
  };

  const handleReset = () => {
    setFormData(prev => ({
      ...prev, name: '', email: '', phone: '', platform: '', needs: [], customCode: false
    }));
    setStep(1);
    setQuoteSent(false);
  };

  const handlePrintPDF = () => {
    // Generamos un documento limpio en memoria solo con los datos de la cotización
    const printWindow = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    if (!printWindow) return;

    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    const price = calculatePrice();

    const htmlContent = `
      <html>
        <head>
          <title>Cotización - Alsnippets</title>
          <style>
            body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #1a1a1a; line-height: 1.6; max-width: 800px; margin: 0 auto; }
            .header { border-bottom: 2px solid #f0f0f0; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { max-width: 200px; margin-bottom: 10px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; background: #f9f9f9; padding: 20px; border-radius: 8px; }
            .info-grid p { margin: 5px 0; font-size: 14px; }
            .item-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px dashed #e0e0e0; font-size: 15px; }
            .total-box { margin-top: 30px; padding: 20px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; text-align: right; }
            .total-title { font-size: 12px; color: #166534; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; margin: 0; }
            .total-amount { font-size: 32px; font-weight: 900; color: #15803d; margin: 5px 0 0 0; }
            .footer { margin-top: 50px; text-align: center; font-size: 11px; color: #888; border-top: 1px solid #eee; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="${window.location.origin}/brand/logo-light-eslogan-es.svg" class="logo" alt="Alsnippets Logo" />
            <h1 style="margin: 10px 0 5px 0; font-size: 24px;">Presupuesto Estimado</h1>
            <p style="margin: 0; color: #666; font-size: 14px;">Fecha: ${today}</p>
          </div>

          <div class="info-grid">
            <div>
              <strong>Preparado para:</strong>
              <p>${formData.name}</p>
              <p>${formData.email}</p>
              <p>${formData.phone}</p>
            </div>
            <div>
              <strong>Consultor Técnico:</strong>
              <p>Adrián Loaiza - Alsnippets</p>
              <p>loaizacarmonaa@gmail.com</p>
              <p>+57 324 645 4061</p>
            </div>
          </div>

          <h3 style="margin-bottom: 15px; border-bottom: 2px solid #1a1a1a; display: inline-block; padding-bottom: 5px;">Detalles del Proyecto</h3>
          
          <div class="item-row">
            <span>Plataforma base instalada</span>
            <strong>${formData.platform}</strong>
          </div>
          
          ${formData.needs.map(need => `
            <div class="item-row">
              <span>+ ${need}</span>
              <span style="color: #666;">Incluido</span>
            </div>
          `).join('')}
          
          ${formData.customCode ? `
            <div class="item-row">
              <span style="color: #b45309; font-weight: bold;">+ Desarrollo de código personalizado</span>
              <span style="color: #b45309;">Requerido</span>
            </div>
          ` : ''}

          <div class="total-box">
            <p class="total-title">Inversión Aproximada</p>
            <p class="total-amount">${price}</p>
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
    
    // Pequeño timeout para permitir que el logo se cargue antes de lanzar la impresión
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div className="w-full bg-white/70 dark:bg-[#121212]/70 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300">
      
      {/* Barra de Progreso */}
      <div className="w-full bg-[var(--bg-tertiary)] h-2">
        <div 
          className="bg-[var(--brand-primary)] h-2 transition-all duration-500 ease-out" 
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="p-8 md:p-12">
        {/* PASO 1: Datos de Contacto */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">Tus Datos</h3>
            <p className="text-[var(--text-secondary)]">Para enviarte la cotización detallada, necesito saber con quién hablo.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required name="name" value={formData.name} onChange={handleInputChange} placeholder="Nombre completo" className="w-full p-3 rounded-lg bg-[var(--bg-body)] border border-[var(--border-subtle)] focus:border-[var(--brand-primary)] outline-none" />
              <input required name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Correo electrónico" className="w-full p-3 rounded-lg bg-[var(--bg-body)] border border-[var(--border-subtle)] focus:border-[var(--brand-primary)] outline-none" />
              <input required name="phone" value={formData.phone} onChange={handleInputChange} placeholder="WhatsApp o Teléfono" className="w-full p-3 rounded-lg bg-[var(--bg-body)] border border-[var(--border-subtle)] focus:border-[var(--brand-primary)] outline-none" />
              <input required name="country" value={formData.country} onChange={handleInputChange} placeholder="País o Ciudad" className="w-full p-3 rounded-lg bg-[var(--bg-body)] border border-[var(--border-subtle)] focus:border-[var(--brand-primary)] outline-none" />
            </div>
            <button 
              disabled={!formData.name || !formData.email || !formData.phone}
              onClick={() => setStep(2)} 
              className="mt-6 flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 bg-[var(--brand-primary)] text-white rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Siguiente <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* PASO 2: Plataforma */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <button onClick={() => setStep(1)} className="text-[var(--text-secondary)] flex items-center gap-1 hover:text-[var(--brand-primary)] mb-4 text-sm"><ChevronLeft className="w-4 h-4"/> Volver</button>
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">¿Qué plataforma utilizas?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['WordPress', 'Shopify', 'Prestashop', 'Wix', 'Joomla', 'Drupal', 'Otro'].map(plat => (
                <button
                  key={plat}
                  onClick={() => setFormData(prev => ({ ...prev, platform: plat as Platform }))}
                  className={`p-4 rounded-xl border transition-all text-sm font-bold ${formData.platform === plat ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]' : 'border-[var(--border-subtle)] bg-[var(--bg-body)] text-[var(--text-secondary)] hover:border-[var(--brand-primary)]/50'}`}
                >
                  {plat}
                </button>
              ))}
            </div>
            <button disabled={!formData.platform} onClick={() => setStep(3)} className="mt-6 flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 bg-[var(--brand-primary)] text-white rounded-lg font-bold hover:opacity-90 disabled:opacity-50">
              Siguiente <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* PASO 3: Necesidades Específicas */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <button onClick={() => setStep(2)} className="text-[var(--text-secondary)] flex items-center gap-1 hover:text-[var(--brand-primary)] mb-4 text-sm"><ChevronLeft className="w-4 h-4"/> Volver</button>
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">¿Qué necesitas resolver en {formData.platform}?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Optimización WPO', 'Seguridad y Malware', 'Mantenimiento Mensual', 'Migración de Hosting', 'Instalación de Plugins/Apps', 'Errores de diseño/responsive'].map(need => (
                <label key={need} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData.needs.includes(need) ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/5' : 'border-[var(--border-subtle)] bg-[var(--bg-body)]'}`}>
                  <input type="checkbox" checked={formData.needs.includes(need)} onChange={() => toggleNeed(need)} className="w-5 h-5 accent-[var(--brand-primary)]" />
                  <span className="text-sm font-medium text-[var(--text-primary)]">{need}</span>
                </label>
              ))}
            </div>

            <div className="mt-6 p-5 border border-yellow-500/30 bg-yellow-500/5 rounded-xl flex items-start gap-3">
              <input type="checkbox" id="customCode" checked={formData.customCode} onChange={(e) => setFormData(prev => ({...prev, customCode: e.target.checked}))} className="w-5 h-5 mt-1 accent-yellow-600" />
              <div>
                <label htmlFor="customCode" className="font-bold text-[var(--text-primary)] cursor-pointer">Requiero programación a medida (PHP, JS, React)</label>
                <p className="text-xs text-[var(--text-secondary)] mt-1">Selecciona esto si necesitas una funcionalidad que no existe en plugins o plantillas comerciales.</p>
              </div>
            </div>

            <button onClick={handleFinalize} disabled={isSubmitting} className="mt-6 flex items-center justify-center gap-2 w-full px-8 py-4 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all text-lg shadow-lg hover:shadow-green-600/30">
              {isSubmitting ? 'Calculando y enviando...' : 'Generar mi Cotización'} <Send className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* PASO 4: RESULTADO */}
        {step === 4 && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-3">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h2 className="text-3xl font-black text-[var(--text-primary)]">Cotización Estimada</h2>
              <p className="text-[var(--text-secondary)]">Preparada especialmente para {formData.name}</p>
            </div>

            <div className="bg-[var(--bg-body)] p-6 rounded-2xl border border-[var(--border-subtle)] space-y-4">
              <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-4">
                <span className="font-bold text-[var(--text-primary)]">Plataforma base ({formData.platform})</span>
              </div>
              
              {formData.needs.map(need => (
                <div key={need} className="flex justify-between items-center border-b border-[var(--border-subtle)] border-dashed pb-2">
                  <span className="text-sm text-[var(--text-secondary)]">+ {need}</span>
                </div>
              ))}

              {formData.customCode && (
                <div className="flex justify-between items-center border-b border-[var(--border-subtle)] border-dashed pb-2">
                  <span className="text-sm text-yellow-600 font-semibold">+ Desarrollo de código a medida</span>
                </div>
              )}

              <div className="pt-4 flex justify-between items-end">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold">Inversión Aproximada</span>
                  <span className="text-xs opacity-60">*Sujeto a auditoría final</span>
                </div>
                <span className="text-3xl md:text-5xl font-black text-[var(--brand-primary)]">
                  {calculatePrice()}
                </span>
              </div>
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-4 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#1ebe57] transition-colors shadow-sm">
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
              <button onClick={handlePrintPDF} className="flex items-center justify-center gap-2 p-4 bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--brand-primary)] rounded-xl font-bold transition-all shadow-sm">
                <Download className="w-5 h-5" /> Generar PDF
              </button>
              <button onClick={handleReset} className="flex items-center justify-center gap-2 p-4 bg-[var(--bg-body)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--brand-primary)] rounded-xl font-bold transition-all shadow-sm md:col-span-2 lg:col-span-1">
                <RefreshCw className="w-5 h-5" /> Nueva
              </button>
            </div>
            
            <p className="text-center text-xs opacity-50 pt-2">Tu solicitud también ha sido enviada a mi correo. Me pondré en contacto contigo pronto.</p>
          </div>
        )}
      </div>
    </div>
  );
}