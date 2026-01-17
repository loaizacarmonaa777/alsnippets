import Link from "next/link";
import PageHero from "@/components/hero/PageHero";

/* =====================================================
   Página — SEO - GEO Optimización para buscadores y LLMs
===================================================== */

export default function SeoGeoPage() {
  return (
    <>
      {/* =====================================================
          HERO — SEO y GEO
          ===================================================== */}
      <PageHero
        title="SEO y GEO (Optimización para buscadores y LLMs)"
        subtitle="El SEO ya no se trata de llenar páginas con palabras clave. Hoy se trata de estructura, contexto y claridad para que Google — y los modelos de lenguaje — entiendan tu sitio y lo consideren una fuente confiable."
      />

      {/* =====================================================
          Contenido de la página SEO GEO
          ===================================================== */}
      <main className="w-6xl mx-auto px-5 py-12 space-y-24">
        <section className="max-w-6xl max-auto space-y-6 text-center">
          <h2 className="text-2xl font-semibold">
            SEO en 2026: cómo funciona realmente
          </h2>

          <p className="opacity-80 text-center mx-auto">
            El SEO moderno no busca engañar algoritmos. Busca facilitar la
            comprensión del contenido, tanto para personas como para sistemas
            automáticos.
          </p>

          <p className="opacity-80 text-center mx-auto">
            Google ya no premia la repetición forzada de keywords, sino la
            intención, la estructura semántica, la experiencia de usuario y la
            coherencia del sitio.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card */}
            <div className="border rounded-xl p-6 space-y-2 card">
              <h3 className="font-semibold">Arquitectura clara del sitio</h3>
              <p className="text-sm opacity-80">
                Estructura lógica de páginas y contenidos para que buscadores y
                personas entiendan el sitio sin fricción.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-2 card">
              <h3 className="font-semibold">
                Contenido comprensible y jerarquizado
              </h3>
              <p className="text-sm opacity-80">
                Uso correcto de títulos, secciones y niveles de información que
                facilitan la lectura y el análisis.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-2 card">
              <h3 className="font-semibold">Contexto real, no texto inflado</h3>
              <p className="text-sm opacity-80">
                Contenido con intención clara, sin relleno artificial ni
                repeticiones forzadas de palabras clave.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-2 card">
              <h3 className="font-semibold">Experiencia técnica sólida</h3>
              <p className="text-sm opacity-80">
                Rendimiento, accesibilidad y estabilidad técnica como base del
                posicionamiento real.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
          GEO — LLMs
          ===================================================== */}
        <section className="max-w-6xl max-auto space-y-6 text-center">
          <h2 className="text-2xl font-semibold">
            ¿Qué es GEO (Generative Engine Optimization)?
          </h2>

          <p className="opacity-80 text-center mx-auto">
            GEO es la optimización de contenidos y estructuras para que los
            modelos de lenguaje (LLMs) puedan interpretar, resumir y citar tu
            sitio correctamente.
          </p>

          <p className="opacity-80 text-center mx-auto">
            Cuando una persona pregunta a un asistente como ChatGPT, Gemini o
            Perplexity, estos modelos no “buscan palabras clave”: seleccionan
            fuentes claras, confiables y bien estructuradas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card */}
            <div className="border rounded-xl p-6 space-y-2">
              <h3 className="font-semibold">Lenguaje claro y directo</h3>
              <p className="text-sm opacity-80">
                Contenido escrito para personas reales, sin tecnicismos
                innecesarios ni frases ambiguas.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-2">
              <h3 className="font-semibold">Respuestas bien delimitadas</h3>
              <p className="text-sm opacity-80">
                Cada sección responde a una intención concreta, facilitando la
                lectura y el análisis por sistemas de IA.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-2">
              <h3 className="font-semibold">Contexto completo por sección</h3>
              <p className="text-sm opacity-80">
                Información suficiente para entender el tema sin depender de
                otros bloques del sitio.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-2">
              <h3 className="font-semibold">
                Señales de autoridad y experiencia
              </h3>
              <p className="text-sm opacity-80">
                Contenido respaldado por experiencia real, coherencia técnica y
                enfoque profesional.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
          CÓMO TRABAJO
          ===================================================== */}
        <section className="max-w-6xl max-auto space-y-6 text-center">
          <h2 className="text-2xl font-semibold">
            Cómo trabajo el SEO y el GEO
          </h2>

          <p className="opacity-80 text-center mx-auto">
            No aplico fórmulas genéricas ni paquetes cerrados. Cada proyecto
            tiene un contexto, un mercado y unos objetivos distintos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card */}
            <div className="border rounded-xl p-6 space-y-2">
              <h3 className="font-semibold">
                Auditoría técnica y de contenidos
              </h3>
              <p className="text-sm opacity-80">
                Revisión profunda del estado real del sitio, su estructura,
                contenidos y configuración técnica.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-2">
              <h3 className="font-semibold">
                Análisis de intención y estructura
              </h3>
              <p className="text-sm opacity-80">
                Identificación de qué busca el usuario y cómo debe organizarse
                el contenido para responder correctamente.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-2">
              <h3 className="font-semibold">
                Reorganización semántica del sitio
              </h3>
              <p className="text-sm opacity-80">
                Ajuste de secciones, jerarquías y relaciones entre páginas para
                mejorar comprensión y relevancia.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-2">
              <h3 className="font-semibold">
                Optimización para buscadores y LLMs
              </h3>
              <p className="text-sm opacity-80">
                Preparación del contenido para Google y modelos de lenguaje,
                priorizando claridad, contexto y autoridad.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-2">
              <h3 className="font-semibold">
                Seguimiento y ajustes progresivos
              </h3>
              <p className="text-sm opacity-80">
                Evaluación continua del rendimiento y ajustes estratégicos según
                resultados y evolución del proyecto.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
          EXPECTATIVAS
          ===================================================== */}
        <section className="max-w-6xl max-auto space-y-6 text-center">
          <h2 className="text-2xl font-semibold">
            Qué debes tener en cuenta como cliente
          </h2>

          <p className="opacity-80">
            El SEO y el GEO no son inmediatos. He participado en proyectos que
            han requerido varios meses de trabajo continuo para lograr
            resultados sólidos y sostenibles.
          </p>

          <p className="opacity-80">
            Este servicio requiere paciencia, criterio y una visión a mediano y
            largo plazo. No prometo resultados mágicos ni posiciones
            instantáneas.
          </p>
        </section>

        {/* =====================================================
          CTA
          ===================================================== */}
        <section className="border rounded-2xl p-8 space-y-6 max-w-3xl text-center mx-auto">
          <h2 className="text-2xl font-semibold">Auditoría SEO y GEO</h2>

          <p className="opacity-80">
            Todo proyecto comienza con una auditoría. Analizo tu sitio, detecto
            oportunidades reales y te explico con claridad qué vale la pena
            hacer y qué no.
          </p>

          <Link
            href="/auditoria"
            className="inline-block border px-6 py-4 rounded-lg"
          >
            Solicitar auditoría SEO / GEO
          </Link>
        </section>
      </main>
    </>
  );
}
