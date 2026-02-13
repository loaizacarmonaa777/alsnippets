import Link from "next/link";
import PageHero from "@/components/hero/PageHero";
import { Metadata } from "next";

// Metadata específico para la página de precios
export const metadata: Metadata = {
  title: "Precios y forma de trabajo",
  description:
    "Cada proyecto es distinto. Por eso no trabajo con precios genéricos ni paquetes cerrados sin entender primero el contexto real.",
}

/* =====================================================
   Página — Precios
===================================================== */

export default function PreciosPage() {
  return (
    <>
      {/* =====================================================
          HERO — Precios
          ===================================================== */}
      <PageHero
        title="Precios y forma de trabajo"
        subtitle="Cada proyecto es distinto. Por eso no trabajo con precios genéricos ni paquetes cerrados sin entender primero el contexto real."
        image="/images/hero/hero-precios.webp"
      />

      {/* =====================================================
          Contenido - FILOSOFÍA — Cómo se define un precio
          ===================================================== */}
      <main className="w-full space-y-24">
        <section className="max-w-6xl mx-auto px-5 space-y-6">
          <h2 className="text-2xl font-semibold text-center">
            ¿Cómo se define el precio de un proyecto?
          </h2>

          <p className="opacity-80 text-center max-w-3xl mx-auto">
            El precio de un servicio técnico no depende solo del número de
            páginas o de instalar un plugin. Depende del estado actual del
            sitio, su complejidad y los objetivos que se quieren alcanzar.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Estado actual del sitio web
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Nivel de personalización requerido
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Complejidad técnica y funcional
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Cantidad de trabajo manual
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Riesgos técnicos y responsabilidad
              </p>
            </div>            
          </div>
        </section>

        {/* =====================================================
          TRANSPARENCIA — Qué puedes esperar
          ===================================================== */}
        <section className="max-w-6xl mx-auto px-5 space-y-6">
          <h2 className="text-2xl font-semibold text-center">
            Transparencia desde el inicio
          </h2>

          <p className="opacity-80 text-center max-w-3xl mx-auto">
            Antes de iniciar cualquier trabajo, realizo una revisión técnica
            para entender el proyecto y proponer una solución realista.
          </p>

          <p className="opacity-80 text-center max-w-3xl mx-auto">
            Esto permite definir tiempos, prioridades y un presupuesto acorde al
            alcance real, evitando sorpresas durante el proceso.
          </p>
        </section>

        {/* =====================================================
          OPCIONES — Cómo trabajar juntos
          ===================================================== */}
        <section className="max-w-6xl mx-auto px-5 space-y-6">
          <h2 className="text-2xl font-semibold text-center">Formas de trabajo</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl text-center mx-auto">
            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <h3 className="font-semibold">Servicios a medida</h3>
              <p className="text-sm opacity-80">
                Ideal para proyectos específicos, mejoras puntuales o
                desarrollos con requerimientos particulares.
              </p>

              <Link
                href="/precios/servicios-a-medida"
                className="inline-block text-sm underline"
              >
                Ver servicios a medida
              </Link>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <h3 className="font-semibold">Auditoría WordPress</h3>
              <p className="text-sm opacity-80">
                El primer paso recomendado para conocer el estado real de tu
                sitio antes de intervenir.
              </p>

              <Link
                href="/auditoria"
                className="inline-block text-sm underline"
              >
                Solicitar auditoría
              </Link>
            </div>
          </div>
        </section>

        {/* =====================================================
          FUTURO — Cotización interactiva
          ===================================================== */}
        <section className="border rounded-2xl p-8 space-y-4 max-w-3xl mx-auto px-5">
          <h2 className="text-2xl font-semibold">Cotización orientativa</h2>

          <p className="opacity-80">
            Próximamente podrás realizar una cotización orientativa respondiendo
            algunas preguntas sobre tu proyecto.
          </p>

          <p className="opacity-80">
            Esta herramienta permitirá estimar rangos de inversión según el
            alcance y complejidad, manteniendo siempre una revisión final
            humana.
          </p>
        </section>

        {/* =====================================================
          CTA — Contacto directo
          ===================================================== */}
        <section className="border rounded-2xl p-8 space-y-6 max-w-3xl text-center mx-auto">
          <h2 className="text-2xl font-semibold">Hablemos de tu proyecto</h2>

          <p className="opacity-80">
            Si tienes claro lo que necesitas o prefieres una conversación
            directa, puedes escribirme y lo revisamos juntos.
          </p>

          <Link
            href="/contacto"
            className="inline-block border px-6 py-4 rounded-lg"
          >
            Contactar
          </Link>
        </section>
      </main>
    </>
  );
}
