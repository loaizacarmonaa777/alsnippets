'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X, Settings2, ShieldCheck } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Estado para las preferencias granulares
  const [preferences, setPreferences] = useState({
    essential: true, // Estas no se pueden desactivar
    analytics: false,
    marketing: false,
  });

  // Comprobar si ya existe el consentimiento al cargar la página
  useEffect(() => {
    const consent = localStorage.getItem('alsnippets_cookie_consent');
    if (!consent) {
      // Pequeño retraso para que no aparezca de golpe al cargar
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allConsented = { essential: true, analytics: true, marketing: true };
    localStorage.setItem('alsnippets_cookie_consent', JSON.stringify(allConsented));
    setPreferences(allConsented);
    setIsVisible(false);
    // Aquí puedes disparar tus scripts de Google Analytics, Píxel de Meta, etc.
  };

  const handleRejectAll = () => {
    const onlyEssential = { essential: true, analytics: false, marketing: false };
    localStorage.setItem('alsnippets_cookie_consent', JSON.stringify(onlyEssential));
    setPreferences(onlyEssential);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('alsnippets_cookie_consent', JSON.stringify(preferences));
    setIsVisible(false);
    setShowSettings(false);
  };

  const togglePreference = (type: 'analytics' | 'marketing') => {
    setPreferences(prev => ({ ...prev, [type]: !prev[type] }));
  };

  if (!isVisible) return null;

  return (
    <>
      {/* =====================================================
          BANNER PRINCIPAL (Flotante inferior)
          ===================================================== */}
      <div className="fixed bottom-0 left-0 w-full z-[9998] p-4 md:p-6 pointer-events-none animate-fade-in-up">
        <div className="max-w-6xl mx-auto bg-[var(--bg-primary)]/95 backdrop-blur-xl border border-[var(--border-subtle)] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.6)] rounded-2xl p-6 pointer-events-auto flex flex-col md:flex-row gap-6 items-center justify-between">
          
          {/* Texto e Información */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold">
              <Cookie className="w-5 h-5 text-[var(--brand-primary)]" />
              <h3>Privacidad y Cookies</h3>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Utilizamos cookies propias y de terceros para garantizar el correcto funcionamiento del sitio (esenciales), analizar nuestro tráfico (analíticas) y personalizar el contenido (marketing). Cumplimos con las normativas GDPR, CCPA y leyes internacionales de protección de datos. Puedes configurar tus preferencias o aceptar todas las políticas. 
              Lee nuestros <Link href="/terminos" className="font-bold text-[var(--brand-primary)] hover:underline">Términos y Condiciones</Link> y la <Link href="/privacidad" className="font-bold text-[var(--brand-primary)] hover:underline">Política de Privacidad</Link>.
            </p>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <button 
              onClick={() => setShowSettings(true)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:border-[var(--brand-primary)] border border-transparent transition-colors flex items-center justify-center gap-2"
            >
              <Settings2 className="w-4 h-4" /> Configurar
            </button>
            <button 
              onClick={handleRejectAll}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              Rechazar
            </button>
            <button 
              onClick={handleAcceptAll}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold bg-[var(--brand-primary)] text-[var(--bg-primary)] hover:bg-[var(--text-yellow2)] transition-colors shadow-md"
            >
              Aceptar todas
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          MODAL DE CONFIGURACIÓN GRANULAR (GDPR / CCPA)
          ===================================================== */}
      {showSettings && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          {/* CAMBIO CLAVE: Usamos bg-[var(--bg-primary)] para que sea un color sólido y legible */}
          <div className="bg-[var(--bg-primary)] p-6 md:p-8 rounded-[2rem] shadow-2xl max-w-lg w-full relative flex flex-col scale-up border border-[var(--border-subtle)]">
            
            <button 
              onClick={() => setShowSettings(false)}
              className="absolute top-5 right-5 p-2 bg-[var(--bg-tertiary)] hover:bg-red-500/10 hover:text-red-500 text-[var(--text-secondary)] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-8 h-8 text-[var(--brand-primary)]" />
              <h3 className="text-2xl font-bold text-[var(--text-primary)] !my-0">Preferencias</h3>
            </div>
            
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              Revisa y personaliza el uso que hacemos de tus datos. Las cookies esenciales no se pueden desactivar ya que son necesarias para el funcionamiento de la web.
            </p>

            <div className="space-y-4 mb-8">
              {/* Esenciales (Bloqueadas en true) */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-tertiary)]/50 opacity-70">
                <div>
                  <p className="font-bold text-[var(--text-primary)] text-sm">Estrictamente Necesarias</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Garantizan la seguridad y el funcionamiento básico.</p>
                </div>
                <div className="w-11 h-6 bg-[var(--brand-primary)] rounded-full relative opacity-50 cursor-not-allowed">
                  <div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full"></div>
                </div>
              </div>

              {/* Analíticas */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
                <div className="pr-4">
                  <p className="font-bold text-[var(--text-primary)] text-sm">Rendimiento y Analíticas</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Nos ayudan a saber qué páginas son más populares y cómo navegan los usuarios.</p>
                </div>
                <button 
                  onClick={() => togglePreference('analytics')}
                  className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${preferences.analytics ? 'bg-[var(--brand-primary)]' : 'bg-gray-300 dark:bg-gray-700'}`}
                >
                  <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all ${preferences.analytics ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>

              {/* Marketing */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
                <div className="pr-4">
                  <p className="font-bold text-[var(--text-primary)] text-sm">Marketing y Publicidad</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Se usan para rastrear a los visitantes y mostrar anuncios relevantes.</p>
                </div>
                <button 
                  onClick={() => togglePreference('marketing')}
                  className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${preferences.marketing ? 'bg-[var(--brand-primary)]' : 'bg-gray-300 dark:bg-gray-700'}`}
                >
                  <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all ${preferences.marketing ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>
            </div>

            <button 
              onClick={handleSavePreferences}
              className="w-full py-4 rounded-xl text-sm font-bold bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition-opacity shadow-lg"
            >
              Guardar mis preferencias
            </button>
          </div>
        </div>
      )}
    </>
  );
}