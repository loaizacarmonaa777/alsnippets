import Link from "next/link";
import PageHero from "@/components/hero/PageHero";

/* =====================================================
   Página — Soporte y Mantenimiento WordPress
===================================================== */

export default function SoporteMantenimientoPage() {
  return (
    <>
      {/* =====================================================
          HERO — Presentación del servicio
          ===================================================== */}
      <PageHero
        title="Soporte y Mantenimiento WordPress"
        subtitle="No necesitas aprender WordPress. Necesitas que funcione. Me encargo de la seguridad, los errores y la estabilidad de tu sitio para que puedas concentrarte en tu negocio."
      />

      {/* =====================================================
          Contenido de la página - BLOQUE DE CARDS
          ===================================================== */}
      <main className="max-w-6xl mx-auto px-5 py-12 space-y-24">
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-center">
            Problemas que soluciono en WordPress
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <h3 className="font-semibold">Errores críticos</h3>
              <p className="text-sm opacity-80">
                Errores 400, 500, pantallas blancas y fallos que impiden el
                funcionamiento normal del sitio.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <h3 className="font-semibold">Actualizaciones sin riesgo</h3>
              <p className="text-sm opacity-80">
                Actualización segura de WordPress, plugins y themes, evitando
                conflictos y pérdidas de información.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <h3 className="font-semibold">Lentitud y rendimiento</h3>
              <p className="text-sm opacity-80">
                Identificación de cuellos de botella que afectan la velocidad y
                experiencia del usuario.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <h3 className="font-semibold">Configuración del servidor</h3>
              <p className="text-sm opacity-80">
                Revisión de memoria, tiempos de ejecución, SSL, caché y ajustes
                clave del hosting.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <h3 className="font-semibold">Soporte técnico real</h3>
              <p className="text-sm opacity-80">
                Respuesta clara y directa cuando algo falla, sin tickets eternos
                ni respuestas genéricas.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
          MANTENIMIENTO RESPONSABLE — Cómo trabajo
          ===================================================== */}
        <section className="space-y-6 max-w-6xl text-center mx-auto">
          <h2 className="text-2xl font-semibold">Mantenimiento responsable</h2>

          <p className="opacity-80 max-w-3xl mx-auto">
            El mantenimiento no es solo actualizar por actualizar. Es entender
            el estado del sitio, anticipar problemas y actuar con criterio
            técnico.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Copias de seguridad confiables
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Revisión de compatibilidad
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Monitoreo básico de seguridad
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Soporte técnico cuando lo necesitas
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
          CTA — Auditoría como eje del servicio
          ===================================================== */}
        <section className="border rounded-2xl p-8 space-y-6 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold">
            Empieza por una auditoría WordPress
          </h2>

          <p className="opacity-80">
            Antes de intervenir cualquier sitio, realizo una auditoría técnica
            para evaluar el estado real de tu WordPress y definir el mejor
            camino.
          </p>

          <Link
            href="/auditoria"
            className="inline-block border px-6 py-4 rounded-lg"
          >
            Solicitar auditoría
          </Link>
        </section>
      </main>
    </>
  );
}
