import PageHero from "@/components/hero/PageHero";
import FormAuditoria from "@/components/forms/FormAuditoria"; // <--- Importamos el componente
import { ShieldCheck, Search, CheckCircle, Clock } from "lucide-react";

export default function AuditoriaPage() {
  return (
    <>
      <PageHero
        title="Auditoría y Consultoría WordPress"
        subtitle="Identifica problemas técnicos, reduce riesgos y escala tu sitio web con un acompañamiento profesional y remoto."
        image="/images/hero/hero-auditoria.webp"
      />

      <main className="w-full max-w-[1200px] mx-auto px-5 pt-20 pb-0 space-y-32">
        
        {/* INTRODUCCIÓN Y GARANTÍA */}
        <section className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h2 className="!my-0">Anticipar es mejor que lamentar</h2>
            <p className="opacity-90">
              La tecnología no es infalible. Mi trabajo es anticipar problemas,
              reducir riesgos y responder con criterio cuando algo ocurre. Ofrezco servicio remoto para Colombia, Latinoamérica, España, USA, Canadá y más.
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--brand-primary)]/30 rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-start shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--brand-primary)]/5 rounded-bl-full pointer-events-none" />
            <ShieldCheck className="w-12 h-12 text-[var(--brand-primary)] shrink-0" />
            <div className="space-y-3 relative z-10">
              <h3 className="!my-0 text-xl font-bold">Trabajo responsable, sin sobrecarga ni abandono</h3>
              <p className="text-sm md:text-base opacity-80">
                Trabajo con un número limitado de proyectos. Prefiero cumplir bien cada compromiso, mantener comunicación clara y acompañar cada proyecto de principio a fin sin delegarlo a terceros.
              </p>
            </div>
          </div>
        </section>

        {/* DIFERENCIA — Auditoría vs Consultoría */}
        <section className="space-y-12">
          <div className="text-center">
            <h2>¿Qué opción necesitas?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Tarjeta Auditoría */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--brand-primary)]/50 transition-colors rounded-3xl p-8 space-y-6 shadow-sm group">
              <div className="w-14 h-14 bg-[var(--bg-tertiary)] group-hover:bg-[var(--brand-primary)]/10 rounded-2xl flex items-center justify-center transition-colors">
                <Search className="w-7 h-7 text-[var(--text-secondary)] group-hover:text-[var(--brand-primary)] transition-colors" />
              </div>
              <h3 className="!my-0 text-2xl font-bold">Auditoría Técnica</h3>
              <p className="opacity-80 leading-relaxed">
                Revisión profunda del estado real de tu sitio web para detectar vulnerabilidades, cuellos de botella y oportunidades de mejora (WPO).
              </p>
              <ul className="space-y-3 opacity-90">
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-[var(--brand-primary)] shrink-0 mt-0.5" /> Revisión de Core, hosting y dominio.</li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-[var(--brand-primary)] shrink-0 mt-0.5" /> Análisis de seguridad y rendimiento.</li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-[var(--brand-primary)] shrink-0 mt-0.5" /> Requiere acceso al entorno técnico.</li>
              </ul>
              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <p className="text-sm font-medium text-[var(--brand-primary)]">
                  * El costo de la auditoría se descuenta del servicio final si decides realizar el trabajo técnico conmigo.
                </p>
              </div>
            </div>

            {/* Tarjeta Consultoría */}
            <div id="consultoria" className="bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--brand-primary)]/50 transition-colors rounded-3xl p-8 space-y-6 shadow-sm group">
              <div className="w-14 h-14 bg-[var(--bg-tertiary)] group-hover:bg-[var(--brand-primary)]/10 rounded-2xl flex items-center justify-center transition-colors">
                <Clock className="w-7 h-7 text-[var(--text-secondary)] group-hover:text-[var(--brand-primary)] transition-colors" />
              </div>
              <h3 className="!my-0 text-2xl font-bold">Consultoría Estratégica</h3>
              <p className="opacity-80 leading-relaxed">
                Sesión de orientación y diagnóstico 1 a 1 donde resolvemos dudas específicas, evaluamos ideas y definimos la arquitectura o camino a seguir.
              </p>
              <ul className="space-y-3 opacity-90">
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-[var(--brand-primary)] shrink-0 mt-0.5" /> Primera sesión gratuita (60 mins).</li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-[var(--brand-primary)] shrink-0 mt-0.5" /> Videollamada (Meet / Teams / Zoom).</li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-[var(--brand-primary)] shrink-0 mt-0.5" /> No requiere compartir accesos.</li>
              </ul>
              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <p className="text-sm font-medium text-[var(--text-secondary)] opacity-80">
                  Las sesiones posteriores tienen un costo basado en el tiempo de dedicación y el alcance del requerimiento.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN DEL FORMULARIO */}
        <div 
          className="relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] py-24 my-0 border-t border-[var(--border-subtle)]"
          style={{ background: 'var(--bg-hero-gradient)' }}
        >
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* TEXTO IZQUIERDO */}
              <div className="lg:col-span-5 space-y-6 pt-4 lg:sticky lg:top-24">
                <h2 className="text-left !my-0 text-4xl md:text-5xl">Comencemos<br/><span className="text-[var(--brand-primary)]">hoy mismo.</span></h2>
                <p className="text-lg opacity-90 max-w-md">
                  Rellena este formulario con los detalles de lo que necesitas. Te responderé lo más pronto posible para coordinar nuestra primera toma de contacto.
                </p>
                <div className="hidden lg:block w-24 h-1 bg-[var(--brand-primary)]/30 rounded-full mt-8"></div>
              </div>

              {/* FORMULARIO DERECHO (Componente aislado) */}
              <div className="lg:col-span-7">
                <div className="bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                  <FormAuditoria />
                </div>
              </div>

            </div>
          </div>
        </div>

      </main>
    </>
  );
}