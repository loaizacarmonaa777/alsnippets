// components/cotizador/Step3CrearWeb.tsx
'use client'

import React from 'react';
import { ChevronLeft, Send, Globe, Server, Palette, LayoutTemplate, ShoppingCart, PenTool } from 'lucide-react';
import type { CotizadorData } from './CotizadorApp';

interface Step3CrearWebProps {
  formData: CotizadorData;
  updateFormData: (data: Partial<CotizadorData>) => void;
  onPrev: () => void;
  onFinalize: () => void;
  isSubmitting: boolean;
}

export default function Step3CrearWeb({ formData, updateFormData, onPrev, onFinalize, isSubmitting }: Step3CrearWebProps) {
  
  // Componente reutilizable para las preguntas de Sí/No
  const QuestionToggle = ({ 
    title, desc, icon, field, value 
  }: { 
    title: string, desc: string, icon: React.ReactNode, field: keyof CotizadorData, value: string 
  }) => (
    <div className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-body)] hover:border-[var(--brand-primary)]/30 transition-all duration-300">
      <div className="flex gap-4">
        <div className="mt-1 text-[var(--brand-primary)]">
          {icon}
        </div>
        <div className="flex-grow">
          <h5 className="font-bold text-[var(--text-primary)] mb-1">{title}</h5>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">{desc}</p>
          
          <div className="flex gap-3">
            <button
              onClick={() => updateFormData({ [field]: 'Sí' })}
              className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all border-2 ${
                value === 'Sí' 
                  ? 'bg-[var(--brand-primary)] border-[var(--brand-primary)] text-white shadow-md' 
                  : 'bg-transparent border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--brand-primary)]/50'
              }`}
            >
              Sí
            </button>
            <button
              onClick={() => updateFormData({ [field]: 'No' })}
              className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all border-2 ${
                value === 'No' 
                  ? 'bg-[var(--text-secondary)] border-[var(--text-secondary)] text-white shadow-md' 
                  : 'bg-transparent border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-gray-400'
              }`}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Validación: Todos los campos de "Sí/No" deben estar respondidos para poder avanzar
  const isFormComplete = 
    formData.tieneDominio !== '' && 
    formData.tieneHosting !== '' && 
    formData.tieneBranding !== '' && 
    formData.tieneEstructura !== '' && 
    formData.necesitaWooCommerce !== '';

  return (
    <div className="space-y-8 animate-fade-in pb-4">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onPrev} className="text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors p-2 -ml-2 rounded-lg hover:bg-white/5">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h3 className="text-2xl font-bold text-[var(--text-primary)]">Crear sitio web</h3>
          <p className="text-[var(--text-secondary)]">Conozcamos los cimientos de tu nuevo proyecto.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <QuestionToggle 
          title="¿Tienes un Dominio web?" 
          desc="El dominio es el nombre único de tu empresa en internet (ejemplo: tuempresa.com)."
          icon={<Globe className="w-6 h-6" />}
          field="tieneDominio"
          value={formData.tieneDominio}
        />

        <QuestionToggle 
          title="¿Cuentas con Hosting?" 
          desc="El hosting es el servidor o 'terreno virtual' donde se guardan los archivos de tu web para que esté en línea 24/7."
          icon={<Server className="w-6 h-6" />}
          field="tieneHosting"
          value={formData.tieneHosting}
        />

        <QuestionToggle 
          title="¿Tienes Branding definido?" 
          desc="Necesitaremos tu logotipo en alta resolución, tipografías y paleta de colores corporativos."
          icon={<Palette className="w-6 h-6" />}
          field="tieneBranding"
          value={formData.tieneBranding}
        />

        <QuestionToggle 
          title="¿Estructura y Textos listos?" 
          desc="Saber qué páginas necesitas (Inicio, Servicios, Contacto) y tener los textos redactados para cada una."
          icon={<LayoutTemplate className="w-6 h-6" />}
          field="tieneEstructura"
          value={formData.tieneEstructura}
        />

        <QuestionToggle 
          title="¿Vas a vender online?" 
          desc="Si necesitas catálogo de productos, carrito de compras y pasarelas de pago (WordPress/WooCommerce o Shopify)."
          icon={<ShoppingCart className="w-6 h-6" />}
          field="necesitaWooCommerce"
          value={formData.necesitaWooCommerce}
        />

      </div>

      {/* DESCRIPCIÓN BREVE */}
      <div className="mt-8 pt-8 border-t border-[var(--border-subtle)]">
        <div className="flex gap-4">
          <PenTool className="w-6 h-6 text-[var(--brand-primary)] flex-shrink-0 mt-1" />
          <div className="flex-grow">
            <h5 className="font-bold text-[var(--text-primary)] mb-1">Descripción del proyecto (Opcional)</h5>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
              Cuéntame brevemente de qué trata tu negocio o qué funcionalidad especial tienes en mente.
            </p>
            <textarea 
              placeholder="Ej: Soy un despacho de abogados y necesito una web corporativa elegante que permita agendar citas online..."
              value={formData.descripcionProyecto}
              onChange={(e) => updateFormData({ descripcionProyecto: e.target.value })}
              className="w-full p-4 rounded-xl bg-[var(--bg-body)] border border-[var(--border-subtle)] focus:border-[var(--brand-primary)] outline-none transition-colors text-[var(--text-primary)] placeholder-[var(--text-muted)] resize-none h-28 text-sm"
            />
          </div>
        </div>
      </div>

      {/* BOTÓN FINAL */}
      <div className="pt-8 flex justify-end">
        <button 
          disabled={!isFormComplete || isSubmitting}
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