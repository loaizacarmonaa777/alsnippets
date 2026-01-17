import Link from "next/link";

/* =====================================================
   ProjectsPreview
   Vista previa de proyectos destacados en la Home
   Estructura tipo cards, lista para Tailwind
   ===================================================== */
export default function ProjectsPreview() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-center max-w-2xl mx-auto">
        Proyectos y creaciones
      </h2>
       {/* =========================
          Texto descriptivo
         ========================= */}
      <p className="max-w-2xl text-sm opacity-80 text-center mx-auto">
        Algunos de los proyectos, sistemas y desarrollos que he creado,
        tanto para clientes reales como iniciativas propias, enfocados
        en rendimiento, estructura y soluciones prácticas.
      </p>

      {/* =========================
          Grid de proyectos
         ========================= */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Card — Suite Text */}
        <Link
          href="/proyectos/suite-text"
          className="card block space-y-2"
        >
          <h3 className="text-lg font-medium">
            Suite Text
          </h3>
          <p className="text-sm opacity-80">
            Herramienta enfocada en texto, SEO y estructura de contenidos.
          </p>
        </Link>

        {/* Card — Barber Short */}
        <Link
          href="/proyectos/barber-short"
          className="card block space-y-2"
        >
          <h3 className="text-lg font-medium">
            Barber Short
          </h3>
          <p className="text-sm opacity-80">
            Sistema de reservas diseñado para barberías y negocios locales.
          </p>
        </Link>

        {/* Card — Casos de éxito */}
        <Link
          href="/proyectos/casos-de-exito"
          className="card block space-y-2"
        >
          <h3 className="text-lg font-medium">
            Casos de éxito
          </h3>
          <p className="text-sm opacity-80">
            Proyectos WordPress reales con resultados medibles.
          </p>
        </Link>

        {/* Card — Mis creaciones */}
        <Link
          href="/proyectos/mis-creaciones"
          className="card block space-y-2"
        >
          <h3 className="text-lg font-medium">
            Mis creaciones
          </h3>
          <p className="text-sm opacity-80">
            Plugins, experimentos y desarrollos propios.
          </p>
        </Link>
      </div>
    </section>
  );
}
