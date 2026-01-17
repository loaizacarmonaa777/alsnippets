import Link from "next/link";
import PageHero from "@/components/hero/PageHero";
import FakeWordPressLogin from "@/components/forms/FakeWordPressLogin"; // Importa el formulario de login muestra

/* =====================================================
   Página — Optimización y Rendimiento WordPress
===================================================== */

export default function OptimizacionRendimientoPage() {
  return (
    <>
      {/* =====================================================
          HERO — Página de Optimización y Rendimiento WordPress
          ===================================================== */}
      <PageHero
        title="Optimización y Rendimiento WordPress"
        subtitle="Un sitio lento pierde visitas, conversiones y posicionamiento. Optimizo tu WordPress para que cargue rápido, sea estable y ofrezca una mejor experiencia al usuario."
      />

      {/* =====================================================
          Contenido de la página BLOQUE DE CARDS — Problemas de rendimiento comunes
          ===================================================== */}
      <main className="w-full space-y-24">
        <section className="max-w-6xl mx-auto px-5 space-y-6">
          <h2 className="text-2xl font-semibold text-center">
            Problemas de rendimiento más frecuentes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <h3 className="font-semibold">Carga lenta del sitio</h3>
              <p className="text-sm opacity-80">
                Tiempos de carga elevados que afectan la experiencia del usuario
                y el SEO.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <h3 className="font-semibold">Imágenes sin optimizar</h3>
              <p className="text-sm opacity-80">
                Archivos demasiado pesados o mal gestionados que ralentizan cada
                página.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <h3 className="font-semibold">Exceso de plugins</h3>
              <p className="text-sm opacity-80">
                Plugins innecesarios o mal desarrollados que consumen recursos.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <h3 className="font-semibold">Base de datos saturada</h3>
              <p className="text-sm opacity-80">
                Revisiones, transients y registros acumulados que afectan el
                rendimiento general.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <h3 className="font-semibold">Hosting mal configurado</h3>
              <p className="text-sm opacity-80">
                Servidores sin cacheo, versiones antiguas de PHP o recursos
                limitados.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
          OPTIMIZACIÓN — Qué hago exactamente
          ===================================================== */}
        <section className="max-w-6xl mx-auto px-5 space-y-6 text-center">
          <h2 className="text-2xl font-semibold">
            Optimización técnica del sitio
          </h2>

          <p className="opacity-80 max-w-3xl mx-auto">
            La optimización va mucho más allá de instalar un plugin. Analizo el
            sitio completo y aplico mejoras reales a nivel técnico.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Optimización de imágenes y recursos
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Configuración avanzada de caché
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Limpieza y optimización de base de datos
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Revisión de plugins y dependencias
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
          EXPERIENCIA — Rendimiento enfocado en el usuario
          ===================================================== */}
        <section className="max-w-6xl mx-auto px-5 space-y-6 py-16 sm:py-18 lg:py-24 text-center">
          <h2 className="text-2xl font-semibold">
            Rendimiento orientado a la experiencia
          </h2>

          <p className="opacity-80 max-w-3xl mx-auto">
            No se trata solo de números en una herramienta, sino de cómo se
            siente el sitio al navegarlo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Mejora de Core Web Vitals
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Reducción de tiempos de respuesta
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Navegación más fluida
              </p>
            </div>

            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Menor tasa de rebote
              </p>
            </div>
          </div>
        </section>


        {/* =====================================================
            ACCESO AL SITIO WEB + Login WordPress (visual)
            ===================================================== */}
        <section
          className="
            w-full
            bg-slate-50
            py-16 sm:py-24 lg:py-32
            shadow-lg
          "
        >
          <div
            className="
              max-w-6xl mx-auto
              px-5
              grid gap-12
              md:grid-cols-2
              items-center
            "
          >
            {/* COLUMNA IZQUIERDA — Texto explicativo */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">
                Acceso al sitio web
              </h2>

              <p className="opacity-80">
                Para realizar una optimización real y responsable, es necesario acceder
                al entorno del sitio web.
              </p>

              <p className="opacity-80">
                Esto puede incluir acceso al panel de WordPress y, según el caso,
                al servidor o sistema de hosting.
              </p>

              <p className="opacity-80">
                Toda la información se maneja de forma confidencial y se utiliza
                únicamente para fines técnicos relacionados con tu proyecto.
              </p>
            </div>

            {/* COLUMNA DERECHA — Login WordPress (visual) */}
            <div
              className="
                 max-w-md mx-auto
                w-full
                bg-white
                border border-slate-300
                rounded-xl
                p-6
                shadow-lg
              "
            >
              <FakeWordPressLogin />
            </div>
          </div>
        </section>


        {/* =====================================================
          CTA — Auditoría de rendimiento
          ===================================================== */}
        <section className="border rounded-2xl p-8 space-y-6 max-w-3xl text-center mx-auto">
          <h2 className="text-2xl font-semibold">
            Auditoría de rendimiento WordPress
          </h2>

          <p className="opacity-80">
            Antes de optimizar, realizo una auditoría técnica para detectar
            cuellos de botella y definir la mejor estrategia de mejora.
          </p>

          <Link
            href="/auditoria"
            className="inline-block border px-6 py-4 rounded-lg"
          >
            Solicitar auditoría de rendimiento
          </Link>
        </section>
      </main>
    </>
  );
}
