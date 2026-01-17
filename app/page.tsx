import Hero from "@/components/home/Hero";
import Benefits from "@/components/home/Benefits";
import Authority from "@/components/home/Authority";
import Solutions from "@/components/home/Solutions";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import BlogPreview from "@/components/home/BlogPreview";
import StackLogos from "@/components/shared/StackLogos";
import CTA from "@/components/home/CTA";

/* =====================================================
   Home Page
   - Hero fuera del container
   - Contenido con ancho controlado
   ===================================================== */

export default function HomePage() {
  return (
    <>
      {/* =====================================================
         HERO — Full width / Carousel
         ===================================================== */}
      <Hero />

      {/* =====================================================
         CONTENIDO DEL HOME
         ===================================================== */}

      <main className="max-w-5xl mx-auto px-5 py-16 space-y-32">
        <section className="space-y-6">
          <div className="space-y-4 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold">
              Tu WordPress estable, seguro y rápido
            </h2>

            <p className="max-w-2xl text-sm opacity-80">
              La tecnología no es infalible. Mi trabajo es anticipar problemas,
              reducir riesgos y responder de forma clara cuando algo ocurre.
            </p>
          </div>

          {/* =========================
              Cards beneficios
              ========================= */}
          <div className="text-center">
            <Benefits
              title=""
              items={[
                "Seguridad y protección contra ataques",
                "Actualizaciones controladas",
                "Copias de seguridad confiables",
                "Optimización de velocidad",
                "Acompañamiento cercano en todos los procesos",
                "Los errores son parte del proceso, yo me encargo de resolverlos",
              ]}
            />
          </div>
        </section>

        <Authority />
        <Solutions />
        <ProjectsPreview />

        {/* =====================================================
           Stack de tecnologías
           ===================================================== */}
        <section
          className="
            relative 
            left-1/2 right-1/2 -mx-[50vw] w-screen 
            flex items-center
            py-8 sm:py-12 
            spectrum-frame
          "
          style={{ background: "var(--bg-stack)" }}
        >
          <div className="max-w-5xl mx-auto px-5">
            <StackLogos />
          </div>
        </section>

        <BlogPreview />
        <CTA />
      </main >
    </>
  );
}
