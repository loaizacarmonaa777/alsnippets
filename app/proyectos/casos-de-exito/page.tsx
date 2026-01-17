import PageHero from "@/components/hero/PageHero";

/* =====================================================
   Página — Casos de éxito
===================================================== */

export default function CasosDeExitoPage() {
  return (
    <>
      {/* =====================================================
          HERO — Casos de Éxito
          ===================================================== */}
      <PageHero
        title="Casos de éxito"
        subtitle="Sitios web y proyectos reales en los que he trabajado, optimizado o acompañado técnicamente."
      />

      {/* =====================================================
          Contenido de la página DESCRIPCIÓN — Alcance
          ===================================================== */}
      <main className="w-6xl mx-auto px-5 py-12 space-y-20">
        <section className="max-w-6xl max-auto space-y-6 text-center">
          <p className="opacity-80 text-center mx-auto">
            Aquí se mostrarán proyectos desarrollados en WordPress y otras
            tecnologías, incluyendo optimización, mantenimiento, seguridad y
            mejoras de rendimiento.
          </p>

          <p className="opacity-80 text-center mx-auto">
            Cada caso destacará el problema, la solución aplicada y el impacto
            logrado.
          </p>
        </section>
      </main>
    </>
  );
}
