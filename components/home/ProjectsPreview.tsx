import React from "react";
import Link from "next/link";
import IconSuiteText from "@/components/icons/IconSuiteText";
import IconBarber from "@/components/icons/IconBarber";
import IconCasosExito from "@/components/icons/IconCasosExito";
import IconMisCreaciones from "../icons/IconMisCreaciones";

/* =====================================================
   ProjectsPreview
   Vista previa de proyectos destacados en la Home
   ===================================================== */
export default function ProjectsPreview() {
  return (
    <section
      className="w-full py-24 px-4 md:px-0 dark:bg-neutral-900 !mb-0"
      style={{
        backgroundImage:
          "linear-gradient(to left top, #f0f3ff, #faf2fc, #fff3f7, #fff5f4, #fff8f3, #fdf9f2, #fafbf2, #f6fcf4, #f0fcf7, #ebfafb, #ebf8fe, #eef5ff)",
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Proyectos y creaciones
          </h2>

          <p className="opacity-80 text-sm md:text-base text-neutral-600 dark:text-neutral-400">
            Algunos de los proyectos, sistemas y desarrollos que he creado,
            tanto para clientes reales como iniciativas propias, enfocados en
            rendimiento, estructura y soluciones prácticas.
          </p>
        </div>

        {/* =========================
            Grid de proyectos
            ========================= */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card — Suite Text */}
          <Link
            href="/proyectos/suite-text"
            className="group card flex flex-col items-center text-center space-y-4 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Icono: Documento / Texto */}
            <div className="w-18 h-18 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <IconSuiteText />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Suite Text
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Herramienta enfocada en texto, SEO y estructura de contenidos.
              </p>
            </div>
          </Link>

          {/* Card — Barber Short */}
          <Link
            href="/proyectos/barber-short"
            className="group card flex flex-col items-center text-center space-y-4 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Círculo contenedor */}
            {/* Colores:
                - bg-orange-50 text-orange-600: Estado normal (Naranja Barbería)
                - group-hover:bg-orange-600 group-hover:text-white: Estado Hover
                Si prefieres usar tu variable CSS global, cambia 'text-orange-600' por 'text-[var(--brand-primary)]'
            */}
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">

              {/* Nuevo Icono Animado */}
              <IconBarber />

            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Barber Short
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Sistema de reservas diseñado para barberías y negocios locales.
              </p>
            </div>
          </Link>

          {/* Card — Casos de éxito */}
          <Link
            href="/proyectos/casos-de-exito"
            className="group card flex flex-col items-center text-center space-y-4 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Círculo contenedor:
               - bg-green-50 / text-green-600 (Estado normal)
               - hover:bg-green-600 / hover:text-white (Estado hover)
            */}
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">

              {/* COMPONENTE ANIMADO */}
              <IconCasosExito />

            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Casos de éxito
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Proyectos WordPress reales con resultados medibles.
              </p>
            </div>
          </Link>

          {/* Card — Mis creaciones */}
          <Link
            href="/proyectos/mis-creaciones"
            className="group card flex flex-col items-center text-center space-y-4 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Círculo contenedor (Morado) */}
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">

              <IconMisCreaciones />

            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Mis creaciones
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Plugins, experimentos y desarrollos propios.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}