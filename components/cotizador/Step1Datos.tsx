// components/cotizador/Step1Datos.tsx
'use client'

import React, { useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { getCountryFromPhone } from './utils/pricingLogic';

interface Step1Props {
  formData: {
    nombre: string;
    email: string;
    whatsapp: string;
    pais: string;
    moneda: string;
  };
  updateFormData: (data: Partial<Step1Props['formData']>) => void;
  onNext: () => void;
}

export default function Step1Datos({ formData, updateFormData, onNext }: Step1Props) {
  
  // Auto-detectar país basado en el prefijo del WhatsApp
  useEffect(() => {
    if (formData.whatsapp.includes('+') && formData.whatsapp.length >= 3) {
      const countryData = getCountryFromPhone(formData.whatsapp);
      if (countryData.name) {
        updateFormData({ pais: countryData.name, moneda: countryData.currency });
      } else {
        updateFormData({ pais: '', moneda: 'USD' });
      }
    } else if (formData.whatsapp.length === 0) {
      updateFormData({ pais: '', moneda: 'USD' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.whatsapp]);

  const isValid = formData.nombre.trim() !== '' && 
                  formData.email.includes('@') && 
                  formData.whatsapp.trim().length >= 6 && 
                  formData.pais !== '';

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-2xl font-bold text-[var(--text-primary)]">Tus Datos</h3>
        <p className="text-[var(--text-secondary)]">Para enviarte la cotización detallada, necesito saber con quién hablo.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="text"
          placeholder="Nombre completo" 
          value={formData.nombre}
          onChange={(e) => updateFormData({ nombre: e.target.value })}
          className="w-full p-4 rounded-xl bg-[var(--bg-body)] border border-[var(--border-subtle)] focus:border-[var(--brand-primary)] outline-none transition-colors text-[var(--text-primary)] placeholder-[var(--text-muted)]" 
        />
        
        <input 
          type="email"
          placeholder="Correo electrónico" 
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          className="w-full p-4 rounded-xl bg-[var(--bg-body)] border border-[var(--border-subtle)] focus:border-[var(--brand-primary)] outline-none transition-colors text-[var(--text-primary)] placeholder-[var(--text-muted)]" 
        />
        
        <div className="space-y-1">
          <input 
            type="tel"
            placeholder="WhatsApp (Ej: +57 300...)" 
            value={formData.whatsapp}
            onChange={(e) => updateFormData({ whatsapp: e.target.value })}
            className="w-full p-4 rounded-xl bg-[var(--bg-body)] border border-[var(--border-subtle)] focus:border-[var(--brand-primary)] outline-none transition-colors text-[var(--text-primary)] placeholder-[var(--text-muted)]" 
          />
          <p className="text-xs text-[var(--text-muted)] ml-1">Añade el prefijo (ej: +34, +52) que corresponda a tu país.</p>
        </div>

        <div className="space-y-1">
          <input 
            type="text"
            placeholder="País (Auto-detectado)" 
            value={formData.pais}
            readOnly
            className="w-full p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] outline-none cursor-not-allowed text-[var(--brand-primary)] font-bold transition-colors" 
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button 
          disabled={!isValid}
          onClick={onNext} 
          className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 bg-[var(--brand-primary)] text-white rounded-xl font-bold hover:brightness-110 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0"
        >
          Siguiente <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}