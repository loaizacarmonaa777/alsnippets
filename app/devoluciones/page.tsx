import PageHero from "@/components/hero/PageHero";

/* =====================================================
   Página — Política de devoluciones
   ===================================================== */

export default function DevolucionesPage() {
  return (
    <>
      {/* =====================================================
         HERO — Política de devoluciones
         ===================================================== */}
      <PageHero
        title="Política de devoluciones"
        subtitle="Condiciones de reembolso y alcance de los servicios ofrecidos por Alsnippets."
        image="/images/hero/hero-devoluciones.webp"
      />

      {/* =====================================================
         Contenido de la página
         ===================================================== */}
      <main className="max-w-5xl mx-auto px-5 py-12 space-y-12">
        <p className="max-w-3xl">
          Esta política regula las condiciones de reembolso para los servicios
          ofrecidos por Alsnippets.
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Auditorías</h2>

          <p className="max-w-3xl">
            Las auditorías WordPress son servicios de diagnóstico profesional.
            Una vez iniciado el análisis, no se realizan devoluciones.
          </p>

          <p className="max-w-3xl">
            Si el cliente decide contratar el trabajo posterior, el costo de la
            auditoría se descuenta del servicio final.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Consultorías</h2>

          <p className="max-w-3xl">
            Las consultorías gratuitas no generan obligación de pago ni derecho
            a reembolso.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Servicios contratados</h2>

          <p className="max-w-3xl">
            Las condiciones de pago y reembolso para servicios personalizados se
            definirán de forma específica en cada acuerdo.
          </p>
        </section>
      </main>
    </>
  );
}
