import Link from "next/link";

/* =====================================================
   Solutions
   Problemas comunes que resuelve la consultoría
   ===================================================== */
export default function Solutions() {
  return (
    <section className="space-y-10">
      <h2 className="text-2xl font-semibold text-center max-w-2xl mx-auto">
        ¿Qué problema tiene tu WordPress ahora?
      </h2>

      {/* =========================
          Grid de problemas (cards)
         ========================= */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="card text-center">
          <p>
            Mi web fue hackeada o muestra errores extraños
          </p>
        </div>

        <div className="card text-center">
          <p>
            Mi web es lenta y pierde visitas
          </p>
        </div>

        <div className="card text-center">
          <p>
            Tengo miedo de actualizar WordPress o los plugins
          </p>
        </div>

        <div className="card text-center">
          <p>
            Quiero mejorar mi sitio pero no sé por dónde empezar
          </p>
        </div>
      </div>

      {/* =========================
          CTA principal — Consultoría
         ========================= */}
      <div className="pt-4 text-center">
        <Link
          href="/auditoria"
          className="inline-block border px-6 py-4 text-lg text-center"
        >
          Solicitar consultoría
        </Link>
      </div>
    </section>
  );
}
