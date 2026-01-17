import Link from "next/link";

export default function CTA() {
  return (
    <section className="space-y-10 text-center">
      <h2 className="text-3xl font-bold">
        Auditoría WordPress Profesional
      </h2>

      <p className="max-w-2xl mx-auto text-lg">
        Reviso tu sitio WordPress, detecto errores, problemas de seguridad,
        rendimiento y malas prácticas, y te entrego un diagnóstico claro
        con los pasos a seguir.
      </p>

      {/* =========================
          CTA principal
         ========================= */}
      <Link
        href="/auditoria"
        className="inline-block border px-6 py-4 text-lg text-center"
      >
        Solicitar auditoría
      </Link>

      <p className="text-sm opacity-70 text-center max-w-md mx-auto">
        Sin compromiso. Sin tecnicismos innecesarios.
      </p>
    </section>
  );
}
