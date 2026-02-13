import PageHero from "@/components/hero/PageHero";

/* =====================================================
   Página — Barber-Short
===================================================== */

export default function BarberShortPage() {
  return (
    <>
      {/* =====================================================
          HERO — Barber Short
          ===================================================== */}
      <PageHero
        title="Barber Short"
        subtitle="Plataforma web para barberías, enfocada en reservas, gestión de servicios y pagos en línea."
        image="/images/hero/hero-barber-short.webp"
      />

      {/* =====================================================
          Contenido de la pagina - DESCRIPCIÓN — Qué resuelve
          ===================================================== */}
      <main className="w-6xl mx-auto px-5 py-12 space-y-20">
        <section className="max-w-6xl max-auto space-y-6 text-center">
          <p className="opacity-80 text-center mx-auto">
            Barber Short permite a los clientes reservar citas para corte de
            cabello o barba, elegir el barbero, seleccionar el servicio y pagar
            directamente desde la web.
          </p>

          <p className="opacity-80 text-center mx-auto">
            El sistema contempla promociones, descuentos y una experiencia
            fluida tanto para el cliente como para el negocio.
          </p>
        </section>
      </main>
    </>
  );
}
