// components/cotizador/Step3Horas.tsx
'use client'

import React from 'react';
import { ChevronLeft, Send, Code, PenTool } from 'lucide-react';
import type { CotizadorData } from './CotizadorApp';

interface Step3HorasProps {
  formData: CotizadorData;
  updateFormData: (data: Partial<CotizadorData>) => void;
  onPrev: () => void;
  onFinalize: () => void;
  isSubmitting: boolean;
}

export default function Step3Horas({ formData, updateFormData, onPrev, onFinalize, isSubmitting }: Step3HorasProps) {
  
  const paquetesHoras = [5, 10, 20, 40];

  return (
    <div className="space-y-8 animate-fade-in pb-4">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onPrev} className="text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors p-2 -ml-2 rounded-lg hover:bg-white/5">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h3 className="text-2xl font-bold text-[var(--text-primary)]">Bolsa de Horas</h3>
          <p className="text-[var(--text-secondary)]">Elige el perfil técnico que necesitas.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => updateFormData({ tipoHoras: 'No-Code' })}
          className={`p-6 rounded-2xl border-2 text-left transition-all ${
            formData.tipoHoras === 'No-Code' 
            ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 shadow-md' 
            : 'border-[var(--border-subtle)] bg-[var(--bg-body)] hover:border-[var(--brand-primary)]/30'
          }`}
        >
          <h4 className={`text-xl font-bold mb-2 ${formData.tipoHoras === 'No-Code' ? 'text-[var(--brand-primary)]' : 'text-[var(--text-primary)]'}`}>Desarrollo No-Code</h4>
          <p className="text-sm text-[var(--text-secondary)]">Ideal para configuraciones en WordPress, Shopify entre otros CMS, maquetación con Elementor/Divi y ajustes visuales.</p>
        </button>

        <button
          onClick={() => updateFormData({ tipoHoras: 'Code' })}
          className={`p-6 rounded-2xl border-2 text-left transition-all ${
            formData.tipoHoras === 'Code' 
            ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 shadow-md' 
            : 'border-[var(--border-subtle)] bg-[var(--bg-body)] hover:border-[var(--brand-primary)]/30'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className={`text-xl font-bold ${formData.tipoHoras === 'Code' ? 'text-[var(--brand-primary)]' : 'text-[var(--text-primary)]'}`}>Desarrollo a Medida</h4>
            <Code className={`w-5 h-5 ${formData.tipoHoras === 'Code' ? 'text-[var(--brand-primary)]' : 'text-[var(--text-secondary)]'}`} />
          </div>
          <p className="text-sm text-[var(--text-secondary)]">Ideal para programación compleja (React, JavaScript, PHP), integraciones de APIs o bases de datos.</p>
        </button>
      </div>

      {formData.tipoHoras !== '' && (
        <div className="animate-fade-in pt-6 border-t border-[var(--border-subtle)]">
          <h5 className="font-bold text-[var(--text-primary)] mb-4">¿Cuántas horas estimas que necesitas?</h5>
          <div className="flex flex-wrap gap-3">
            {paquetesHoras.map(horas => (
              <button
                key={horas}
                onClick={() => updateFormData({ cantidadHoras: horas })}
                className={`py-3 px-6 rounded-xl font-bold border-2 transition-all ${
                  formData.cantidadHoras === horas 
                  ? 'bg-[var(--brand-primary)] border-[var(--brand-primary)] text-white shadow-md' 
                  : 'bg-[var(--bg-body)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--brand-primary)]/50'
                }`}
              >
                {horas} horas
              </button>
            ))}
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-3">Si no estás seguro, elige un paquete inicial de 5 horas para comenzar y evaluar el proyecto.</p>
        </div>
      )}

      {/* DESCRIPCIÓN */}
      <div className="mt-8 pt-8 border-t border-[var(--border-subtle)]">
        <div className="flex gap-4">
          <PenTool className="w-6 h-6 text-[var(--brand-primary)] flex-shrink-0 mt-1" />
          <div className="flex-grow">
            <h5 className="font-bold text-[var(--text-primary)] mb-1">¿Qué tareas realizaremos?</h5>
            <textarea 
              placeholder="Ej: Necesito conectar el CRM de mi empresa con mi tienda WooCommerce..."
              value={formData.descripcionProyecto}
              onChange={(e) => updateFormData({ descripcionProyecto: e.target.value })}
              className="w-full p-4 rounded-xl bg-[var(--bg-body)] border border-[var(--border-subtle)] focus:border-[var(--brand-primary)] outline-none transition-colors text-[var(--text-primary)] placeholder-[var(--text-muted)] resize-none h-24 text-sm mt-2"
            />
          </div>
        </div>
      </div>

      {/* BOTÓN FINAL */}
      <div className="pt-4 flex justify-end">
        <button 
          disabled={!formData.tipoHoras || formData.cantidadHoras === 0 || isSubmitting}
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