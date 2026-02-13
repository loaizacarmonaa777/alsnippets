import React from "react";
import Link from "next/link";
import IconSuiteText from "@/components/icons/IconSuiteText";
import IconBarber from "@/components/icons/IconBarber";
import IconCasosExito from "@/components/icons/IconCasosExito";
import IconMisCreaciones from "@/components/icons/IconMisCreaciones";

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
            tanto para clientes reales como iniciativas propias.
          </p>
        </div>

        {/* =========================
            Grid de proyectos
            ========================= */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Helper para generar las cards limpias */}
          {[
            {
              href: "/proyectos/suite-text",
              title: "Suite Text",
              desc: "Herramienta enfocada en texto, SEO y estructura de contenidos.",
              Icon: IconSuiteText,
            },
            {
              href: "/proyectos/barber-short",
              title: "Barber Short",
              desc: "Sistema de reservas diseñado para barberías y negocios locales.",
              Icon: IconBarber,
            },
            {
              href: "/proyectos/casos-de-exito",
              title: "Casos de éxito",
              desc: "Proyectos WordPress reales con resultados medibles.",
              Icon: IconCasosExito,
            },
            {
              href: "/proyectos/mis-creaciones",
              title: "Mis creaciones",
              desc: "Plugins, experimentos y desarrollos propios.",
              Icon: IconMisCreaciones,
            },
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="
                group relative 
                bg-white 
                rounded-xl /* Petición explícita: rounded-xl */
                p-8 
                flex flex-col items-center text-center space-y-4 
                min-h-[280px]
                border border-neutral-100
                shadow-sm

                /* ANIMACIÓN SUAVE Y SOMBRA (Mismo estilo que Soporte) */
                transition-all duration-500 ease-in-out
                hover:-translate-y-2 
                hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]
                hover:border-neutral-200
              "
            >
              {/* CÍRCULO DEL ICONO
                  - Normal: Fondo Oscuro / Icono Dorado
                  - Hover: Fondo Dorado / Icono Oscuro
              */}
              <div className="
                w-24 h-24 
                rounded-full 
                flex items-center justify-center
                transition-colors duration-500 ease-in-out
                
                bg-[var(--bg-secondary)] 
                text-[var(--text-yellow1)]
                
                group-hover:bg-[var(--text-yellow1)] 
                group-hover:text-[var(--bg-secondary)]
              ">
                <item.Icon className="w-12 h-12 transition-all duration-500 ease-in-out" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-neutral-900">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}