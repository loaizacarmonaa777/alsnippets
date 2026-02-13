import PageHero from "@/components/hero/PageHero";

/* =====================================================
   Página — Privacidad
===================================================== */

export default function PrivacidadPage() {
  return (
    <>
      {/* =====================================================
         HERO — Politicas
         ===================================================== */}
      <PageHero
        title="Política de privacidad"
        subtitle="En Alsnippets respeto tu privacidad y me comprometo a proteger los datos
        personales que compartes a través de este sitio web."
        image="/images/hero/hero-politica-privacidad.webp"
      />

      {/* =====================================================
         Contenido de la página Sobre mi
         ===================================================== */}

      <main className="max-w-5xl mx-auto px-5 py-12 space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Datos que se recopilan</h2>

          <p className="max-w-3xl">
            Puedo recopilar datos como nombre, correo electrónico, información
            del sitio web y mensajes enviados mediante formularios o contacto
            directo.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Uso de la información</h2>

          <p className="max-w-3xl">
            La información se utiliza únicamente para responder consultas,
            prestar servicios, mejorar la experiencia del usuario y cumplir
            obligaciones legales.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Protección de datos</h2>

          <p className="max-w-3xl">
            Aplico medidas técnicas y organizativas razonables para proteger los
            datos personales frente a accesos no autorizados, pérdida o uso
            indebido.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Derechos del usuario</h2>

          <p className="max-w-3xl">
            Puedes solicitar acceso, rectificación o eliminación de tus datos
            personales en cualquier momento escribiendo a
            contact@alsnippets.com.
          </p>
        </section>

        <p className="text-sm opacity-70">
          Esta política cumple con normativas de protección de datos aplicables
          en América Latina, Estados Unidos y la Unión Europea (GDPR).
        </p>
      </main>
    </>
  );
}
