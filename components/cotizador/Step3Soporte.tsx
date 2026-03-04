// components/cotizador/Step3Soporte.tsx
'use client'

import React from 'react';
import { ChevronLeft, Check, Send } from 'lucide-react';
import type { CotizadorData } from './CotizadorApp';

interface Step3SoporteProps {
  formData: CotizadorData;
  updateFormData: (data: Partial<CotizadorData>) => void;
  onPrev: () => void;
  onFinalize: () => void;
  isSubmitting: boolean;
}

// Diccionario de servicios dinámicos por CMS
const SERVICIOS_POR_CMS: Record<string, { id: string; title: string; desc: string }[]> = {
  WordPress: [
    { id: 'Mantenimiento y Seguridad', title: 'Mantenimiento y Seguridad', desc: 'Actualizaciones de Core/PHP, limpieza de malware, pantalla blanca (WSoD) y copias de seguridad.' },
    { id: 'Optimización WPO', title: 'Rendimiento y Optimización (WPO)', desc: 'Solución a carga lenta, optimización de caché, base de datos e imágenes para mejorar PageSpeed.' },
    { id: 'Diseño y Estructura', title: 'Diseño y Maquetadores', desc: 'Soporte para Elementor/Divi, incompatibilidades tras actualizar y errores de visualización 404.' },
    { id: 'E-commerce Core', title: 'Tienda (WooCommerce)', desc: 'Resolución de conflictos de carrito, pasarelas de pago y problemas de conexión con base de datos.' },
    { id: 'Asistencia e Infraestructura', title: 'Asistencia e Infraestructura', desc: 'Resolución de errores de servidor (500), límites de memoria PHP y configuración de hosting.' },
    { id: 'Soporte Global', title: 'Soporte Global Integral', desc: 'Me encargo de todo. Un paquete completo que cubre mantenimiento, rendimiento, diseño y seguridad.' }
  ],
  Shopify: [
    { id: 'Configuración Core', title: 'Configuración Core y Dominios', desc: 'Gestión de SSL, "Sitio no seguro", conexión de dominios DNS y configuración de correos.' },
    { id: 'Optimización WPO', title: 'Rendimiento y Optimización', desc: 'Optimización de código Liquid, compresión de imágenes y reducción de apps pesadas que bloquean la navegación.' },
    { id: 'Diseño Liquid', title: 'Diseño y Código Liquid', desc: 'Personalización de secciones, solución a diseños rotos por edición manual y adaptación móvil.' },
    { id: 'E-commerce Core', title: 'Ventas y Checkout', desc: 'Solución a "Checkout no disponible", Shopify Payments, zonas de envío y sincronización de inventario.' },
    { id: 'Apps e Integraciones', title: 'Conflictos de Apps', desc: 'Depuración de aplicaciones que chocan entre sí (ej. pop-ups) y configuración de APIs de terceros.' },
    { id: 'Soporte Global', title: 'Soporte Global Integral', desc: 'Me encargo de todo. Un paquete completo para blindar tu tienda Shopify técnica y visualmente.' }
  ],
  Prestashop: [
    { id: 'Actualizaciones', title: 'Mantenimiento y Actualizaciones', desc: 'Soporte para 1-Click Upgrade, fallos críticos de versión a versión y bucles de redirección SSL.' },
    { id: 'Rendimiento BD', title: 'Rendimiento y Servidor', desc: 'Solución a errores 500 al regenerar imágenes, límites de tiempo del servidor (RAM) y caché.' },
    { id: 'Smarty y Diseño', title: 'Diseño y Plantillas (Smarty)', desc: 'Errores de compilación, sitios que no muestran cambios y soporte para Creative Elements.' },
    { id: 'E-commerce Módulos', title: 'Conflictos de Módulos', desc: 'Depuración de módulos de pago/envío que chocan en el checkout y rompen la pasarela.' },
    { id: 'Asistencia e Infraestructura', title: 'Asistencia y Catálogo', desc: 'Solución a pérdida de índice de búsqueda (productos que no aparecen) y bases de datos.' },
    { id: 'Soporte Global', title: 'Soporte Global Integral', desc: 'Me encargo de todo. Estabilización completa de tu tienda Prestashop.' }
  ],
  Wix: [
    { id: 'Configuración DNS', title: 'Configuración y Dominios', desc: 'Fallos al conectar dominios externos (GoDaddy, Namecheap) y certificados de seguridad.' },
    { id: 'SEO y Rendimiento', title: 'SEO y Velocidad de Carga', desc: 'Solución a carga lenta por exceso de scripts, configuración de Wix SEO Wiz y meta-etiquetas.' },
    { id: 'Diseño Móvil', title: 'Diseño y Adaptación Móvil', desc: 'Reparación de elementos que se solapan en móviles, Editor X y restauración de historial.' },
    { id: 'E-commerce Wix', title: 'Wix Stores', desc: 'Configuración avanzada de catálogo de productos, pasarelas de pago y métodos de envío.' },
    { id: 'Velo JS', title: 'Código Velo (JavaScript)', desc: 'Depuración de errores en scripts personalizados, bases de datos internas e integraciones.' },
    { id: 'Soporte Global', title: 'Soporte Global Integral', desc: 'Me encargo de todo. Revisión completa de tu sitio Wix, desde el diseño hasta el código Velo.' }
  ],
  Joomla: [
    { id: 'Mantenimiento Joomla', title: 'Mantenimiento y Seguridad', desc: 'Actualización de componentes, protección contra inyecciones SQL y migraciones complejas (J3 a J4/5).' },
    { id: 'Rendimiento y SEF', title: 'Rendimiento y Estructura', desc: 'Errores de rutas (SEF URLs), enlaces que dejan de funcionar y configuración de caché.' },
    { id: 'Diseño y jQuery', title: 'Diseño y Conflictos jQuery', desc: 'Solución a librerías duplicadas que rompen menús o sliders, y soporte para SP Page Builder.' },
    { id: 'E-commerce Joomla', title: 'Tienda (Virtuemart / Hikashop)', desc: 'Mantenimiento de catálogos complejos, carritos de compra y pasarelas de pago.' },
    { id: 'Gestión ACL', title: 'Gestión de Permisos (ACL)', desc: 'Solución a errores de acceso de usuarios y configuración avanzada de niveles de seguridad.' },
    { id: 'Soporte Global', title: 'Soporte Global Integral', desc: 'Me encargo de todo. Estabilización, seguridad y rendimiento para tu portal Joomla.' }
  ],
  Drupal: [
    { id: 'Mantenimiento Drush', title: 'Mantenimiento (Composer/Drush)', desc: 'Actualización de Core y Módulos vía consola, resolución de dependencias y migraciones.' },
    { id: 'Rendimiento Caché', title: 'Rendimiento Avanzado', desc: 'Solución a problemas con Varnish/Redis y fallos en la limpieza de caché interna (sitio desactualizado).' },
    { id: 'Estructura Nodos', title: 'Estructura y Contenido', desc: 'Gestión de Nodos, Taxonomías complejas que se vuelven inmanejables y Layout Builder.' },
    { id: 'Drupal Commerce', title: 'Drupal Commerce', desc: 'Mantenimiento de flujos de pago, reglas de precios y catálogos de alta capacidad.' },
    { id: 'Configuración Entidades', title: 'Arquitectura y Entidades', desc: 'Errores al crear campos personalizados (fields) que no se visualizan o rompen la vista.' },
    { id: 'Soporte Global', title: 'Soporte Global Integral', desc: 'Me encargo de todo. Mantenimiento técnico de alto nivel para infraestructuras Drupal.' }
  ]
};

export default function Step3Soporte({ formData, updateFormData, onPrev, onFinalize, isSubmitting }: Step3SoporteProps) {
  
  const plataformas = ['WordPress', 'Shopify', 'Prestashop', 'Wix', 'Joomla', 'Drupal', 'Otro'];

  // Obtenemos los servicios de la plataforma seleccionada (si existe en el diccionario)
  const serviciosActuales = SERVICIOS_POR_CMS[formData.plataformaSoporte] || [];

  const toggleNeed = (needId: string) => {
    // Si elige "Soporte Global", desmarcamos las demás para no cobrar doble.
    if (needId === 'Soporte Global') {
      const isAlreadyGlobal = formData.necesidadesSoporte.includes('Soporte Global');
      updateFormData({ necesidadesSoporte: isAlreadyGlobal ? [] : ['Soporte Global'] });
      return;
    }

    // Si elige otra opción, quitamos "Soporte Global" si estaba marcado
    let currentNeeds = formData.necesidadesSoporte.filter(n => n !== 'Soporte Global');

    if (currentNeeds.includes(needId)) {
      currentNeeds = currentNeeds.filter(n => n !== needId);
    } else {
      currentNeeds.push(needId);
    }
    
    updateFormData({ necesidadesSoporte: currentNeeds });
  };

  return (
    <div className="space-y-8 animate-fade-in pb-4">
      {/* HEADER Y BOTÓN VOLVER */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onPrev} className="text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors p-2 -ml-2 rounded-lg hover:bg-white/5">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h3 className="text-2xl font-bold text-[var(--text-primary)]">Soporte Técnico</h3>
          <p className="text-[var(--text-secondary)]">¿En qué tecnología está creado tu sitio web?</p>
        </div>
      </div>

      {/* 1. SELECCIÓN DE PLATAFORMA */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {plataformas.map(plat => (
          <button
            key={plat}
            onClick={() => {
              // Si cambia de plataforma, actualiza y limpia los checkboxes anteriores
              if (plat !== formData.plataformaSoporte) {
                updateFormData({ plataformaSoporte: plat, necesidadesSoporte: [], descripcionProyecto: '' });
              }
            }}
            className={`
              p-4 rounded-xl border-2 transition-all text-sm font-bold
              ${formData.plataformaSoporte === plat 
                ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] shadow-md' 
                : 'border-[var(--border-subtle)] bg-[var(--bg-body)] text-[var(--text-secondary)] hover:border-[var(--brand-primary)]/50'
              }
            `}
          >
            {plat}
          </button>
        ))}
      </div>

      {/* 2. BIFURCACIÓN: SI ELIGE UNA PLATAFORMA CON DICCIONARIO (WordPress, Shopify, etc.) */}
      {formData.plataformaSoporte !== '' && formData.plataformaSoporte !== 'Otro' && (
        <div className="animate-fade-in mt-8 pt-8 border-t border-[var(--border-subtle)]">
          <h4 className="text-xl font-bold text-[var(--text-primary)] mb-1">Servicios para {formData.plataformaSoporte}</h4>
          <p className="text-[var(--text-secondary)] mb-6 text-sm">Selecciona las áreas en las que necesitas ayuda (puedes elegir varias):</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviciosActuales.map(servicio => {
              const isSelected = formData.necesidadesSoporte.includes(servicio.id);
              return (
                <div 
                  key={servicio.id}
                  onClick={() => toggleNeed(servicio.id)}
                  className={`
                    flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-300
                    ${isSelected 
                      ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/5' 
                      : 'border-[var(--border-subtle)] bg-[var(--bg-body)] hover:border-[var(--brand-primary)]/30'
                    }
                  `}
                >
                  <div className={`
                    mt-1 w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors
                    ${isSelected ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]' : 'border-[var(--text-muted)]'}
                  `}>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <div>
                    <h5 className={`font-bold mb-1 ${isSelected ? 'text-[var(--brand-primary)]' : 'text-[var(--text-primary)]'}`}>
                      {servicio.title}
                    </h5>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {servicio.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ALTERNATIVA: SI ELIGE "OTRO" */}
      {formData.plataformaSoporte === 'Otro' && (
        <div className="animate-fade-in mt-8 pt-8 border-t border-[var(--border-subtle)]">
           <h4 className="text-xl font-bold text-[var(--text-primary)] mb-2">Soporte para Otros CMS / Custom</h4>
           <div className="bg-[var(--bg-tertiary)] p-6 rounded-xl border border-[var(--border-subtle)]">
             <p className="text-[var(--text-secondary)] text-sm mb-4">
               Como desarrollador Full-Stack, también trabajo con sitios creados a medida (React, PHP puro, Node) o CMS menos comunes. 
               Por favor, describe brevemente tu plataforma y el problema para generar una cotización base.
             </p>
             <textarea 
                placeholder="Ej: Mi sitio está hecho a medida en Laravel y tengo un problema con la base de datos..."
                value={formData.descripcionProyecto}
                onChange={(e) => updateFormData({ descripcionProyecto: e.target.value })}
                className="w-full p-4 rounded-xl bg-[var(--bg-body)] border border-[var(--border-subtle)] focus:border-[var(--brand-primary)] outline-none transition-colors text-[var(--text-primary)] placeholder-[var(--text-muted)] resize-none h-24 text-sm"
             />
           </div>
        </div>
      )}

      {/* BOTÓN FINAL */}
      <div className="pt-8 flex justify-end">
        <button 
          disabled={
            !formData.plataformaSoporte || 
            (formData.plataformaSoporte !== 'Otro' && formData.necesidadesSoporte.length === 0) ||
            (formData.plataformaSoporte === 'Otro' && formData.descripcionProyecto.length < 10) ||
            isSubmitting
          }
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