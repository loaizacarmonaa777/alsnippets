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

      <main className="flex min-h-screen flex-col items-center overflow-x-hidden space-y-32 pb-20 px-4 md:px-0">
        <section className="space-y-6">
          <div className="space-y-4 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold">
              Tu WordPress estable, seguro y rápido
            </h2>

            <p className="max-w-2xl opacity-80">
              La tecnología no es infalible. Mi trabajo es anticipar problemas,
              reducir riesgos y responder de forma clara cuando algo ocurre.
            </p>
          </div>

          {/* =========================
              Cards beneficios
              ========================= */}
          <div className="mt-12 w-full max-w-[1200px] mx-auto px-4 sm:px-6">
            <Benefits
              title=""
              items={[
                {
                  title: "Análisis y Protección contra ataques",
                  image: "/images/home/card-proteccion-contra-ataques-home.webp",
                  description: "La falta de protección expone tu sitio a riesgos.",
                  chips: [
                    "Malware",
                    "Virus",
                    "Backdoors",
                    "Fuerza bruta",
                    "Robo de datos",
                    "Accesos no autorizados",
                    "Sitio comprometido",
                  ],
                },
                {
                  title: "Actualizaciones controladas",
                  image: "/images/home/card-actualizaciones-controladas-home.webp",
                  description: "Actualizar sin control impacta más de lo que imaginas.",
                  chips: [
                    "Incompatibilidad",
                    "Errores críticos",
                    "Pantalla blanca",
                    "Fallos de plugins",
                    "Conflictos versión",
                    "Errores PHP",
                    "Caídas del sitio",
                  ],
                },
                {
                  title: "Copias de seguridad confiables",
                  image: "/images/home/card-copias-seguridad-home.webp",
                  description: "Sin copias funcionales, cualquier error puede convertirse en.",
                  chips: [
                    "Pérdidas",
                    "Backups rotos",
                    "Fallos de restauración",
                    "Datos irrecuperables",
                    "Cambios perdidos",
                    "Caídas",
                  ],
                },
                {
                  title: "Optimización de velocidad y carga",
                  image: "/images/home/card-optimizacion-velocidad-home.webp",
                  description: "No identificar los cuellos de botella afecta rendimiento y experiencia:",
                  chips: [
                    "Carga lenta",
                    "CLS elevado",
                    "LCP deficiente",
                    "TTFB alto",
                    "Scripts bloqueantes",
                    "Imágenes pesadas",
                    "Mala experiencia móvil",
                  ],
                },
                {
                  title: "Acompañamiento en todo el proceso",
                  image: "/images/home/card-acompanamiento-proceso-home.webp",
                  description: "Conmigo cada decisión técnica tiene respaldo, criterio y seguimiento.",
                  chips: [
                    "Decisiones técnicas", // Este saldrá verde automáticamente
                    "Dudas constantes",
                    "Cambios urgentes",
                    "Soporte humano",
                    "Comunicación directa",
                    "Respuesta rápida",
                    "Tranquilidad operativa",
                  ],
                },
                {
                  title: "Los errores son parte del proceso",
                  image: "/images/home/card-errores-proceso-home.webp",
                  description: "WordPress no es solo no-code: se necesita experiencia para resolver.",
                  chips: [
                    "Errores 404",
                    "Errores 500",
                    "Conflictos",
                    "Fallos en servidor",
                    "Fallos del Layout",
                    "Bugs inesperados",
                    "Diagnóstico técnico",
                  ],
                },
              ]}
            />
          </div>
        </section>

        <Authority />
        <Solutions />
        <ProjectsPreview />

        {/* =========================
            Stack Logos (Authority)
            ========================= */}
        <section
          className="
            w-full
            py-12
            spectrum-frame
            overflow-hidden
            !mb-0
          "
          style={{ background: "var(--bg-stack)" }}
        >
          {/* Contenedor interno para centrar el contenido si fuera necesario, 
              pero permitiendo que los logos fluyan */}
          <div className="w-full max-w-[1200px] mx-auto px-4">
            <StackLogos />
          </div>
        </section>

        <BlogPreview />
        <CTA />
      </main >
    </>
  );
}
