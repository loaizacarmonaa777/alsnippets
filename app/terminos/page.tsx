import PageHero from "@/components/hero/PageHero";
import { Metadata } from "next";

// Metadata específico para la página de Términos y condiciones
export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "El uso de este sitio web implica la aceptación de los siguientes términos y condiciones.",
};

/* =====================================================
   Página — Términos y condiciones
===================================================== */

export default function TerminosPage() {
  return (
    <>
      {/* =====================================================
         HERO — STérminos y condiciones
         ===================================================== */}
      <PageHero
        title="Términos y condiciones"
        subtitle="El uso de este sitio web implica la aceptación de los siguientes términos y condiciones."
        image="/images/hero/hero-terminos-condiciones.webp"
      />

      {/* =====================================================
         Contenido de la página
         ===================================================== */}

      <main className="max-w-5xl mx-auto px-5 py-12 space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Uso del sitio</h2>

          <p className="max-w-3xl">
            El contenido de Alsnippets es informativo y profesional. No se
            permite el uso indebido del sitio, ni la reproducción no autorizada
            de sus contenidos.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Servicios</h2>

          <p className="max-w-3xl">
            Los servicios ofrecidos están sujetos a evaluación previa. Ningún
            servicio se considera contratado hasta que exista un acuerdo
            explícito entre ambas partes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Responsabilidad</h2>

          <p className="max-w-3xl">
            Alsnippets no se hace responsable por daños derivados del uso
            indebido del sitio o por decisiones tomadas sin asesoría directa.
          </p>
        </section>

        <p className="text-sm opacity-70">
          Estos términos pueden actualizarse sin previo aviso.
        </p>
      </main>
    </>
  );
}
