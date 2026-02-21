import React from "react";
// 1. Importamos el nuevo componente
import IconCard from "@/components/ui/IconCard";

// Importamos los iconos
import IconSuiteText from "@/components/icons/IconSuiteText";
import IconBarber from "@/components/icons/IconBarber";
import IconCasosExito from "@/components/icons/IconCasosExito";
import IconMisCreaciones from "@/components/icons/IconMisCreaciones";

/* =====================================================
   DATA
   ===================================================== */
const PROJECTS = [
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
];

/* =====================================================
   ProjectsPreview
   ===================================================== */
export default function ProjectsPreview() {
  return (
    <section className="relative w-full py-24 my-0 overflow-hidden">
      {/* ... (Fondos y Header se mantienen igual que antes) ... */}
      
      {/* ... Fondo Degradado Light ... */}
      <div 
        className="absolute inset-0 -z-20 opacity-100 dark:opacity-0 transition-opacity duration-300"
        style={{ backgroundImage: "linear-gradient(to left top, #f0f3ff, #faf2fc, #fff3f7, #fff5f4, #fff8f3, #fdf9f2, #fafbf2, #f6fcf4, #f0fcf7, #ebfafb, #ebf8fe, #eef5ff)" }}
      />
      {/* ... Fondo Dark ... */}
      <div className="absolute inset-0 -z-10 opacity-0 dark:opacity-100 bg-[var(--bg-tertiary)] transition-opacity duration-300" />

      <div className="container mx-auto px-6 max-w-[1200px] space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <h2>
            Proyectos y creaciones
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Algunos de los proyectos, sistemas y desarrollos que he creado...
          </p>
        </div>

        {/* Grid de proyectos */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((item, idx) => (
            // 2. Usamos el componente IconCard
            <IconCard
              key={idx}
              href={item.href}
              title={item.title}
              description={item.desc}
              icon={item.Icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}