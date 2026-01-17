import Link from "next/link";
import StackLogos from "@/components/shared/StackLogos";
import PageHero from "@/components/hero/PageHero";

/* =====================================================
   Página — Sobre mí
   ===================================================== */

export default function SobreMiPage() {
  return (
    <>
      {/* =====================================================
         HERO — Sobre mí
         ===================================================== */}
      <PageHero
        title="Sobre mí"
        subtitle="Soy Adrián Loaiza, la persona detrás de Alsnippets. Trabajo directamente contigo, sin intermediarios ni equipos ocultos, resolviendo problemas reales en sitios WordPress."
      />

      {/* =====================================================
         CONTENIDO — Sobre mí
         ===================================================== */}
      <main className="max-w-5xl mx-auto px-5 py-16 space-y-32">

        {/* =====================================================
           QUÉ HAGO
           ===================================================== */}
        <section className="space-y-6 text-center">
          <h2 className="text-2xl font-semibold">
            Qué hago
          </h2>

          <p className="max-w-2xl mx-auto">
            Me especializo en soporte, mantenimiento y optimización de sitios
            WordPress, con más de cinco años de experiencia trabajando con
            WordPress y otros CMS.
          </p>

          <p className="max-w-2xl mx-auto">
            Mi enfoque no es rehacer por rehacer, sino mejorar lo que ya existe,
            respetando tu inversión y haciendo que tu web sea más estable,
            segura y rápida.
          </p>
        </section>

        {/* =====================================================
           BLOQUE VISUAL — Imagen (placeholder oscuro)
           ===================================================== */}
        <section className="relative h-[320px] rounded-2xl bg-neutral-900 flex items-center justify-center">
          <span className="text-sm opacity-50">
            Imagen / retrato / contexto personal
          </span>
        </section>

        {/* =====================================================
           VISIÓN INTEGRAL
           ===================================================== */}
        <section className="space-y-6 text-center">
          <h2 className="text-2xl font-semibold">
            Visión integral
          </h2>

          <p className="max-w-2xl mx-auto">
            Además del desarrollo web, tengo formación en diseño gráfico,
            marketing digital, fotografía y edición de video. Esto me permite
            cuidar tanto el código como la experiencia visual y funcional.
          </p>

          <p className="max-w-2xl mx-auto">
            Puedo acompañar un proyecto desde el logo hasta el proceso de pago,
            manteniendo coherencia técnica y estética.
          </p>
        </section>

        {/* =====================================================
           BLOQUE VISUAL — Imagen (placeholder oscuro)
           ===================================================== */}
        <section className="relative h-[280px] rounded-2xl bg-neutral-800 flex items-center justify-center">
          <span className="text-sm opacity-50">
            Imagen / proceso / trabajo en curso
          </span>
        </section>

        {/* =====================================================
           CÓMO TRABAJO
           ===================================================== */}
        <section className="space-y-6 text-center">
          <h2 className="text-2xl font-semibold">
            Cómo trabajo
          </h2>

          <p className="max-w-2xl mx-auto">
            Analizo antes de actuar, explico lo técnico en lenguaje claro y
            priorizo soluciones que realmente aporten valor.
          </p>

          <p className="max-w-2xl mx-auto">
            No aplico recetas genéricas ni prometo lo que no conviene. Cada
            sitio tiene su contexto, y así lo trato.
          </p>
        </section>

        {/* =====================================================
           EVOLUCIÓN CONSTANTE
           ===================================================== */}
        <section className="space-y-6 text-center">
          <h2 className="text-2xl font-semibold">
            Evolución constante
          </h2>

          <p className="max-w-2xl mx-auto">
            Sigo reforzando mis bases y aprendiendo nuevas tecnologías como
            React y Tailwind, integrando también herramientas de inteligencia
            artificial para optimizar procesos sin perder criterio humano.
          </p>
        </section>

        {/* =====================================================
           STACK TECNOLÓGICO — Full width + spectrum
           ===================================================== */}
        <section
          className="
            relative
            left-1/2 right-1/2 -mx-[50vw] w-screen
            flex items-center
            py-12 sm:py-16
            spectrum-frame
          "
          style={{ background: "var(--bg-stack)" }}
        >
          <div className="max-w-5xl mx-auto px-5 w-full space-y-6 text-center">
            <h2 className="text-2xl font-semibold">
              Tecnologías y herramientas
            </h2>

            <p className="max-w-2xl mx-auto text-sm opacity-80">
              Estas son algunas de las tecnologías y herramientas que utilizo en
              proyectos reales. No se trata de acumular nombres, sino de saber
              cuándo y cómo usar cada herramienta según el contexto de tu sitio.
            </p>

            <StackLogos />
          </div>
        </section>

        {/* =====================================================
           CTA FINAL
           ===================================================== */}
        <section className="space-y-8 text-center">
          <h2 className="text-2xl font-semibold">
            ¿Hablamos de tu sitio?
          </h2>

          <p className="max-w-2xl mx-auto">
            Si quieres saber en qué estado está tu web y qué vale la pena
            mejorar, puedes empezar con una auditoría WordPress o escribirme
            directamente.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/auditoria"
              className="border px-6 py-4 text-center"
            >
              Solicitar auditoría
            </Link>

            <Link
              href="/contacto"
              className="border px-6 py-4 text-center"
            >
              Contactar
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
