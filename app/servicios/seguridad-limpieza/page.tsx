import Link from "next/link";
import PageHero from "@/components/hero/PageHero";
import { Metadata } from "next";

// Metadata específico para la página de Seguridad y Limpieza WordPress
export const metadata: Metadata = {
  title: "Seguridad y Limpieza WordPress",
  description:
    "Un sitio WordPress inseguro no solo es un riesgo técnico, también afecta la confianza de tus usuarios y tu posicionamiento. Me encargo de detectar, limpiar y proteger tu web.",
};

/* =====================================================
   Página — Seguridad y Limpieza
===================================================== */

// Página: Seguridad y Limppieza WordPress
export default function SeguridadLimpiezaPage() {
  return (
    <>
      {/* =====================================================
      HERO — Página Seguridad y Limpieza
      ===================================================== */}
      <PageHero
        title="Seguridad y Limpieza WordPress"
        subtitle="Un sitio WordPress inseguro no solo es un riesgo técnico, también afecta la confianza de tus usuarios y tu posicionamiento. Me encargo de detectar, limpiar y proteger tu web."
        image="/images/hero/hero-seguridad-limpieza.webp"
      />

      {/* =====================================================
        Contenido de la página BLOQUE DE CARDS — Amenazas y problemas comunes
        ===================================================== */}
      <main className="max-w-6xl mx-auto px-5 py-12 space-y-24">
        <section className="space-y-8 text-center">
          <h2 className="text-2xl font-semibold">
            Problemas de seguridad más comunes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <h3 className="font-semibold">Malware y código malicioso</h3>
              <p className="text-sm opacity-80">
                Archivos infectados, scripts ocultos o código inyectado que
                comprometen el funcionamiento del sitio.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <h3 className="font-semibold">Sitio en blacklist</h3>
              <p className="text-sm opacity-80">
                Penalizaciones por parte de Google o navegadores que bloquean el
                acceso y dañan tu reputación.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <h3 className="font-semibold">Accesos no autorizados</h3>
              <p className="text-sm opacity-80">
                Usuarios sospechosos, intentos de fuerza bruta o credenciales
                comprometidas.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <h3 className="font-semibold">Plugins vulnerables</h3>
              <p className="text-sm opacity-80">
                Extensiones obsoletas o mal configuradas que abren puertas a
                ataques.
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <h3 className="font-semibold">Configuraciones inseguras</h3>
              <p className="text-sm opacity-80">
                Permisos incorrectos, rutas expuestas o ajustes peligrosos en el
                servidor.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
          LIMPIEZA — Qué hago exactamente
          ===================================================== */}
        <section className="space-y-6 max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-semibold">
            Limpieza y recuperación del sitio
          </h2>

          <p className="opacity-80 max-w-3xl mx-auto">
            Cuando un sitio ha sido comprometido, no basta con “pasar un
            plugin”. La limpieza debe ser manual, cuidadosa y con criterio
            técnico.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Eliminación de malware y archivos infectados
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Revisión completa de código y base de datos
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Restauración segura si es necesario
              </p>
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Refuerzo de accesos y permisos
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
          PREVENCIÓN — Seguridad a futuro
          ===================================================== */}
        <section className="space-y-6 max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-semibold">Protección y prevención</h2>

          <p className="opacity-80 max-w-3xl mx-auto">
            Después de la limpieza, implemento medidas para reducir riesgos
            futuros y mantener el sitio protegido.
          </p>

          {/* Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Endurecimiento de WordPress
              </p>
            </div>

            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Configuración de plugins de seguridad
              </p>
            </div>

            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Monitoreo básico de actividad
              </p>
            </div>

            <div className="border rounded-xl p-6 space-y-3 card">
              <p className="text-sm opacity-80">
                Buenas prácticas de actualización
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
          REQUISITOS — Acceso al entorno de trabajo
          ===================================================== */}
        <section className="space-y-4 max-w-3xl text-center mx-auto">
          <h2 className="text-2xl font-semibold">Acceso al sitio web</h2>

          <p className="opacity-80 max-w-3xl mx-auto">
            Para poder realizar cualquier intervención técnica, es necesario
            contar con acceso al entorno de trabajo.
          </p>

          <p className="opacity-80 max-w-3xl mx-auto">
            Esto puede incluir acceso al panel de administración de WordPress y,
            cuando sea necesario, al servidor (hosting, cPanel, Plesk u otro
            sistema).
          </p>

          <p className="opacity-80 max-w-3xl mx-auto">
            Toda la información se maneja de forma confidencial y únicamente con
            fines técnicos relacionados con el servicio solicitado.
          </p>
        </section>

        {/* =====================================================
          CTA — Auditoría de seguridad
          ===================================================== */}
        <section className="border rounded-2xl p-8 space-y-6 max-w-3xl text-center mx-auto">
          <h2 className="text-2xl font-semibold">
            Auditoría de seguridad WordPress
          </h2>

          <p className="opacity-80 max-w-3xl mx-auto">
            Antes de intervenir, realizo una auditoría de seguridad para
            identificar vulnerabilidades y definir la mejor estrategia de
            limpieza y protección.
          </p>

          <Link
            href="/auditoria"
            className="inline-block border px-6 py-4 rounded-lg"
          >
            Solicitar auditoría de seguridad
          </Link>
        </section>
      </main>
    </>
  );
}
