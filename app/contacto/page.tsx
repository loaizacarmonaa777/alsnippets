'use client';

import React, { useState } from "react";
import ContactForm from "@/components/contacto/ContactForm";
import { Mail, MessageCircle, MapPin, Instagram, Facebook, Youtube, Linkedin, Github, ChevronDown } from "lucide-react";

/* =====================================================
   DATA: FAQs
===================================================== */
const faqs = [
  {
    q: "¿Trabajas como freelance o como empresa?",
    a: "Trabajo como freelance profesional. Esto me permite involucrarme directamente en cada proyecto, sin intermediarios ni delegaciones. Tú hablas directamente conmigo en todo el proceso."
  },
  {
    q: "¿Por qué tus servicios no son los más baratos?",
    a: "Porque no ofrezco soluciones genéricas ni trabajos automatizados. Mi enfoque es preventivo, técnico y responsable. Invierto tiempo real en analizar, proponer y ejecutar correctamente."
  },
  {
    q: "¿Cómo sé que no desaparecerás a mitad del proyecto?",
    a: "Trabajo con un número limitado de proyectos al mismo tiempo y mantengo comunicación clara desde el inicio. No sobrecargo mi agenda ni delego tu proyecto a terceros."
  },
  {
    q: "¿Con qué tipo de clientes trabajas?",
    a: "Trabajo con personas y empresas que valoran la estabilidad, la seguridad y el trabajo bien hecho. No acepto proyectos donde se busque solo “lo más barato”."
  },
  {
    q: "¿Necesitas accesos a mi sitio web?",
    a: "Para auditorías y trabajos técnicos, sí. Los accesos son necesarios para revisar el estado real del sitio. Todo se maneja con confidencialidad y buenas prácticas."
  },
  {
    q: "¿Trabajas solo con WordPress?",
    a: "Mi especialidad principal es WordPress, pero también trabajo con tecnologías modernas y desarrollo a medida cuando el proyecto lo requiere."
  },
  {
    q: "¿Ofreces soporte después del trabajo?",
    a: "Sí. Dependiendo del servicio, ofrezco acompañamiento, mantenimiento o soporte continuo. No entrego un proyecto y desaparezco."
  },
  {
    q: "¿Trabajas con clientes fuera de Colombia?",
    a: "Sí. Trabajo de forma remota con clientes en distintos países. La comunicación se adapta al medio y horario acordado."
  },
  {
    q: "¿Cuánto tiempo toma una auditoría o intervención?",
    a: "Depende del estado y tamaño del sitio. Antes de iniciar, explico el alcance, tiempos estimados y próximos pasos para que no haya sorpresas."
  },
  {
    q: "¿Qué pasa si mi problema no se puede resolver?",
    a: "Soy honesto desde el inicio. Si algo no es viable o no vale la pena hacerlo, lo digo claramente. Prefiero transparencia a promesas irreales."
  }
];

/* =====================================================
   COMPONENTE AUXILIAR: Accordion Suave
===================================================== */
const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[var(--border-subtle)] bg-[var(--bg-card)] rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:border-[var(--brand-primary)]/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left font-semibold text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition-colors"
      >
        <span>{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[var(--brand-primary)]' : 'text-[var(--text-secondary)]'}`} />
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out px-5 overflow-hidden ${isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-[var(--text-secondary)] border-t border-[var(--border-subtle)]/50 pt-4">
          {answer}
        </p>
      </div>
    </div>
  );
};

/* =====================================================
   Página de Contacto
===================================================== */
export default function ContactoPage() {
  return (
    <>
      {/* =====================================================
          HERO & FORMULARIO (Diseño Asimétrico Integrado)
          ===================================================== */}
      <section
        className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-5"
        style={{
          backgroundImage: `linear-gradient(rgba(5,5,5,0.85), rgba(5,5,5,0.95)), url('/images/contact/alsnippets-hero-contact-desktop.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed" 
        }}
      >
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
          
          {/* TEXTO Y DATOS DIRECTOS (Izquierda/Arriba) */}
          <div className="lg:col-span-5 space-y-10 text-white pt-10">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter !text-white leading-tight">
                Hablemos de <br/>
                {/* CAMBIO: Gradiente utilizando tu paleta dorada/brand */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-[var(--text-yellow1)]">
                  tu proyecto.
                </span>
              </h1>
              <p className="text-lg text-neutral-300 opacity-90 max-w-md">
                Escríbeme y conversemos con calma sobre tu sitio, tus dudas actuales y el siguiente paso real que necesitas dar para avanzar.
              </p>
            </div>

            {/* Tarjetas de contacto directo Glassmorphism */}
            <div className="space-y-4">
              {/* CAMBIO: Icono de Email ahora usa tus variables Brand */}
              <a href="mailto:contact@alsnippets.com" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[var(--brand-primary)]/50 transition-all group backdrop-blur-sm">
                <div className="p-3 bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] rounded-xl group-hover:bg-[var(--brand-primary)] group-hover:text-black transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400 font-medium">Email Directo</p>
                  <p className="font-bold text-white">contact@alsnippets.com</p>
                </div>
              </a>

              {/* WhatsApp (Se mantiene con su color de marca #25D366 por buenas prácticas de UX) */}
              <a href="https://wa.me/573246454061" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#25D366]/50 transition-all group backdrop-blur-sm">
                <div className="p-3 bg-[#25D366]/20 text-[#25D366] rounded-xl group-hover:bg-[#25D366] group-hover:text-black transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400 font-medium">WhatsApp / Teléfono</p>
                  <p className="font-bold text-white">+57 324 645 4061</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="p-3 bg-white/10 text-neutral-300 rounded-xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400 font-medium">Ubicación (Trabajo Remoto)</p>
                  <p className="font-bold text-white">Santa Bárbara, Antioquia – Colombia</p>
                </div>
              </div>
            </div>
          </div>

          {/* FORMULARIO DE CONTACTO (Derecha) */}
          <div className="lg:col-span-7">
            <div className="bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full">
              <ContactForm />
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          REDES SOCIALES ANIMADAS
          ===================================================== */}
      <section className="max-w-[1200px] mx-auto px-5 py-24">
        <div className="text-center space-y-10">
          <h2>Encuéntrame también en</h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              { icon: Instagram, name: 'Instagram', link: 'https://www.instagram.com/alsnippets/' },
              { icon: Facebook, name: 'Facebook', link: 'https://www.facebook.com/alsnippets' },
              { icon: Youtube, name: 'YouTube', link: 'https://www.youtube.com/' },
              { icon: Linkedin, name: 'LinkedIn', link: 'https://www.linkedin.com/in/adrian-loaiza-carmona-alc/' },
              { icon: Github, name: 'GitHub', link: 'https://github.com/loaizacarmonaa777' }
            ].map((social, idx) => (
              <a 
                key={idx}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 p-6 w-32 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl hover:-translate-y-2 hover:shadow-xl hover:border-[var(--brand-primary)]/50 transition-all duration-300"
              >
                <social.icon className="w-8 h-8 text-[var(--text-secondary)] group-hover:text-[var(--brand-primary)] transition-colors duration-300 group-hover:scale-110" />
                <span className="text-sm font-semibold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQs — Preguntas frecuentes (FULLWIDTH + GRADIENTE)
          ===================================================== */}
      <section
        id="faq"
        className="relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] py-24 px-5 border-t border-[var(--border-subtle)] !my-0"
        style={{ background: 'var(--bg-hero-gradient)' }}
      >
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <h2>Preguntas frecuentes</h2>
            <p className="opacity-80">
              Estas son algunas de las dudas más comunes antes de iniciar un
              trabajo conmigo. La idea es que tengas claridad, confianza y
              expectativas reales.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}