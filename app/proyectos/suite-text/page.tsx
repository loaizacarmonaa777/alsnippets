import PageHero from "@/components/hero/PageHero";

/* =====================================================
   Página — Suite Text
===================================================== */

export default function SuiteTextPage() {
  return (
    <>
      {/* =====================================================
          HERO — Suite Text
          ===================================================== */}
      <PageHero
        title="Suite Text"
        subtitle="Un producto en desarrollo enfocado en optimizar, analizar y trabajar textos con una visión técnica, estratégica y orientada a resultados."
        image="/images/hero/hero-suite-text.webp"
      />

      {/* =====================================================
          Contenido de la página - DESCRIPCIÓN — Estado actual
          ===================================================== */}
      <main className="w-full space-y-24">
        <section className="max-w-6xl mx-auto px-5 space-y-6 text-center">
          <p className="opacity-80 mx-auto">
            Suite Text está siendo diseñado como un producto propio, pensado
            para creadores, equipos y proyectos digitales que necesitan trabajar
            el contenido con mayor control.
          </p>

          <p className="opacity-80 mx-auto">
            Próximamente se detallarán sus funcionalidades, casos de uso y
            alcance técnico.
          </p>
        </section>
      </main>
    </>
  );
}
