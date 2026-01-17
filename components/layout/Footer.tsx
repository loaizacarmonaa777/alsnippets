import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-24">
      <div className="max-w-6xl mx-auto px-5 py-12 space-y-10">

        {/* MARCA */}
        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Alsnippets</h3>
          <p className="max-w-xl text-sm opacity-80">
            Soporte técnico especializado en WordPress, enfocado en seguridad,
            mantenimiento y optimización.
          </p>
        </section>

        {/* NAVEGACIÓN */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* SERVICIOS */}
          <div className="space-y-2">
            <h4 className="font-semibold">Servicios</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/servicios/soporte-mantenimiento-wordpress">
                  Soporte y mantenimiento
                </Link>
              </li>
              <li>
                <Link href="/servicios/seguridad-limpieza">
                  Seguridad y limpieza
                </Link>
              </li>
              <li>
                <Link href="/servicios/optimizacion-rendimiento">
                  Optimización y rendimiento
                </Link>
              </li>
              <li>
                <Link href="/auditoria#consultoria">
                  Consultoría WordPress
                </Link>
              </li>
              <li>
                <Link href="/servicios/seo-geo">
                  SEO y GEO
                </Link>
              </li>
            </ul>
          </div>

          {/* PROYECTOS */}
          <div className="space-y-2">
            <h4 className="font-semibold">Proyectos</h4>
            <ul className="space-y-1 text-sm">
              <li><Link href="/proyectos/suite-text">Suite Text</Link></li>
              <li><Link href="/proyectos/barber-short">Barber Short</Link></li>
              <li><Link href="/proyectos/casos-de-exito">Casos de éxito</Link></li>
              <li><Link href="/proyectos/mis-creaciones">Mis creaciones</Link></li>
            </ul>
          </div>

          {/* CONTACTO */}
          <div className="space-y-2">
            <h4 className="font-semibold">Contacto</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/contacto">Contáctame</Link>
              </li>
              <li>
                <Link href="/contacto#faq">FAQ</Link>
              </li>
              <li>
                <Link href="/auditoria">Solicitar auditoría</Link>
              </li>
              <li>
                <a href="mailto:contacto@alsnippets.com">
                  contact@alsnippets.com
                </a>
              </li>
            </ul>
          </div>

        </section>

        {/* LEGALES */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t pt-6 text-sm opacity-70">
          {(() => {
            const startYear = 2023;
            const currentYear = new Date().getFullYear();

            return (
              <p>
                © {startYear}
                {currentYear > startYear && ` - ${currentYear}`} Alsnippets.
                Todos los derechos reservados.
              </p>
            );
          })()}

          <div className="flex gap-4">
            <Link href="/privacidad">Privacidad</Link>
            <Link href="/terminos">Términos</Link>
            <Link href="/devoluciones">Devoluciones</Link>
          </div>
        </section>
        
      </div>
    </footer>
  );
}
