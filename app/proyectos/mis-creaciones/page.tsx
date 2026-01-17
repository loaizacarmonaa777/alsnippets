import PageHero from "@/components/hero/PageHero";

/* =====================================================
   Página — Mis creaciones
===================================================== */

export default function MisCreacionesPage() {
  return (
    <>
      {/* =====================================================
          HERO — Mis Creaciones
          ===================================================== */}
      <PageHero
        title="Mis creaciones"
        subtitle="Proyectos desarrollados desde cero, plugins, themes y soluciones propias."
      />

      {/* =====================================================
          Contenido de la pagina - DESCRIPCIÓN — Qué encontrarás aquí
          ===================================================== */}
      <main className="w-6xl mx-auto px-5 py-12 space-y-20">
        <section className="max-w-6xl max-auto space-y-6 text-center">
          <p className="opacity-80 text-center mx-auto">
            En esta sección se recopilan páginas web, plugins y themes creados
            por mí, enfocados en resolver necesidades reales de proyectos
            WordPress.
          </p>

          <p className="opacity-80 text-center mx-auto">
            Con el tiempo, este espacio crecerá como un laboratorio de ideas,
            productos y soluciones técnicas.
          </p>
        </section>
      </main>
    </>
  );
}
