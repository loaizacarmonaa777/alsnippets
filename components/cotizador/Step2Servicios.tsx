// components/cotizador/Step2Servicios.tsx
'use client'

import React from 'react';
import { ChevronRight, ChevronLeft, Wrench, Search, MonitorSmartphone, Clock } from 'lucide-react'; // Añadimos Clock
import type { ServicioPrincipal, CotizadorData } from './CotizadorApp'; // Importamos CotizadorData

interface Step2Props {
  formData: { servicioPrincipal: ServicioPrincipal; };
  updateFormData: (data: Partial<CotizadorData>) => void; // Cambiamos esto a Partial<CotizadorData>
  onNext: () => void;
  onPrev: () => void;
}

export default function Step2Servicios({ formData, updateFormData, onNext, onPrev }: Step2Props) {
  
  const servicios: { id: ServicioPrincipal; title: string; description: string; icon: React.ReactNode }[] = [
    {
      id: 'Soporte',
      title: 'Soporte Técnico',
      description: 'Mantenimiento, limpieza de malware, optimización o errores en tu web actual.',
      icon: <Wrench className="w-8 h-8 mb-4" />
    },
    {
      id: 'SEO',
      title: 'Posicionamiento SEO',
      description: 'Auditoría SEO, optimización de palabras clave y visibilidad en Google.',
      icon: <Search className="w-8 h-8 mb-4" />
    },
    {
      id: 'Crear Web',
      title: 'Crear sitio web desde cero',
      description: 'Diseño y desarrollo completo de páginas corporativas o tiendas online.',
      icon: <MonitorSmartphone className="w-8 h-8 mb-4" />
    },
    {
      id: 'Por Horas',
      title: 'Bolsa de Horas',
      description: 'Desarrollo No-Code (WordPress/Shopify etc...) o programación a medida (Code).',
      icon: <Clock className="w-8 h-8 mb-4" />
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onPrev} className="text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors p-2 -ml-2 rounded-lg hover:bg-white/5">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h3 className="text-2xl font-bold text-[var(--text-primary)]">Elige el servicio que necesitas</h3>
          <p className="text-[var(--text-secondary)]">Selecciona el área en la que te puedo ayudar hoy.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {servicios.map((servicio) => (
          <button
            key={servicio.id}
            onClick={() => updateFormData({ 
              servicioPrincipal: servicio.id,
              // MAGIA: Reseteamos todos los campos del paso 3 al cambiar de servicio
              descripcionProyecto: '', plataformaSoporte: '', necesidadesSoporte: [], 
              tieneDominio: '', tieneHosting: '', tieneBranding: '', tieneEstructura: '', 
              necesitaWooCommerce: '', tipoHoras: '', cantidadHoras: 0
            })}
            className={`
              relative flex flex-col items-center text-center p-6 rounded-2xl border-2 transition-all duration-300
              ${formData.servicioPrincipal === servicio.id 
                ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 shadow-[0_0_20px_rgba(201,163,78,0.15)] -translate-y-2' 
                : 'border-[var(--border-subtle)] bg-[var(--bg-body)] hover:border-[var(--brand-primary)]/50 hover:-translate-y-1'
              }
            `}
          >
            <div className={`${formData.servicioPrincipal === servicio.id ? 'text-[var(--brand-primary)]' : 'text-[var(--text-secondary)]'}`}>
              {servicio.icon}
            </div>
            <h4 className={`text-lg font-bold mb-2 ${formData.servicioPrincipal === servicio.id ? 'text-[var(--brand-primary)]' : 'text-[var(--text-primary)]'}`}>
              {servicio.title}
            </h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {servicio.description}
            </p>
            {formData.servicioPrincipal === servicio.id && (
              <div className="absolute top-4 right-4 w-3 h-3 bg-[var(--brand-primary)] rounded-full animate-pulse shadow-[0_0_10px_rgba(201,163,78,0.8)]"></div>
            )}
          </button>
        ))}
      </div>

      <div className="pt-6 border-t border-[var(--border-subtle)] flex justify-end">
        <button 
          disabled={!formData.servicioPrincipal}
          onClick={onNext} 
          className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 bg-[var(--brand-primary)] text-white rounded-xl font-bold hover:brightness-110 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:pointer-events-none"
        >
          Siguiente <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}