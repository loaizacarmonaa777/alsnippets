// components/cotizador/Step3SEO.tsx
'use client'

import React from 'react';
import { ChevronLeft, Send, Search } from 'lucide-react';
import type { CotizadorData } from './CotizadorApp';

interface Step3SEOProps {
  formData: CotizadorData;
  updateFormData: (data: Partial<CotizadorData>) => void;
  onPrev: () => void;
  onFinalize: () => void;
  isSubmitting: boolean;
}

export default function Step3SEO({ formData, updateFormData, onPrev, onFinalize, isSubmitting }: Step3SEOProps) {
  return (
    <div className="space-y-8 animate-fade-in pb-4">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onPrev} className="text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors p-2 -ml-2 rounded-lg hover:bg-white/5">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h3 className="text-2xl font-bold text-[var(--text-primary)]">Posicionamiento SEO</h3>
          <p className="text-[var(--text-secondary)]">Impulsemos tu visibilidad orgánica en Google.</p>
        </div>
      </div>

      <div className="bg-[var(--bg-body)] p-6 md:p-8 rounded-2xl border border-[var(--border-subtle)]">
        <div className="flex gap-4">
          <Search className="w-6 h-6 text-[var(--brand-primary)] flex-shrink-0 mt-1" />
          <div className="flex-grow">
            <h5 className="font-bold text-[var(--text-primary)] mb-2">¿Cuál es tu objetivo principal?</h5>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              El SEO es una estrategia a mediano plazo. Cuéntame sobre tu sitio actual, quién es tu competencia y qué palabras clave te gustaría dominar.
            </p>
            <textarea 
              placeholder="Ej: Tengo una clínica dental en Madrid y quiero aparecer primero cuando busquen 'implantes dentales madrid'..."
              value={formData.descripcionProyecto}
              onChange={(e) => updateFormData({ descripcionProyecto: e.target.value })}
              className="w-full p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] focus:border-[var(--brand-primary)] outline-none transition-colors text-[var(--text-primary)] placeholder-[var(--text-muted)] resize-none h-32 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button 
          disabled={isSubmitting || formData.descripcionProyecto.length < 10}
          onClick={onFinalize} 
          className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-green-900/20"
        >
          {isSubmitting ? 'Procesando...' : 'Generar mi Cotización'} 
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}