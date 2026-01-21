import Link from "next/link";
import SocialIcon from "@/components/icons/SocialIcon";
import { SOCIAL_LINKS } from "@/components/icons/social.config";
import MailIcon from "@/components/icons/MailIcon";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import WebIcon from "@/components/icons/WebIcon";
import PinIcon from "@/components/icons/PinIcon";
import SunIcon from "@/components/icons/SunIcon";
import MoonIcon from "@/components/icons/MoonIcon";


/* =====================================================
   Footer — Alsnippets
   - Full width real (100vw)
   - Fondo degradado
   - Contenido centrado 1200px
   - 3 columnas
   ===================================================== */

export default function Footer() {
  return (
    <footer
      className="
        relative
        left-1/2 right-1/2
        -ml-[50vw] -mr-[50vw]
        w-screen
        mt-24
      "
      style={{
        backgroundImage: "var(--bg-footer)",
      }}
    >
      {/* =====================================================
         Contenedor principal
         ===================================================== */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">

        {/* =====================================================
           Grid principal
           ===================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* =====================================================
             COLUMNA 1 — Branding & contacto
             ===================================================== */}
          <div className="
            space-y-6 
            text-sm 
            text-[var(--text-white)]
            text-center
            items-center

            md:text-left
            md:items-start
            "
          >

            {/* Logo */}
            <img
              src="/brand/logo-dark-eslogan-es.svg"
              alt="Alsnippets"
              className="h-20 w-auto mx-auto md:mx-0"
            />

            {/* Datos de contacto */}
            <ul className="space-y-3 text-sm flex flex-col items-center md:items-start">

              {/* Email */}
              <li>
                <a
                  href="mailto:contact@alsnippets.com"
                  className="
                    group
                    flex items-start gap-3
                    justify-center md:justify-start
                    transition-colors duration-300
                    hover:text-[var(--brand-primary)]
                  "
                >
                  <MailIcon className="w-6 h-6 transition-colors duration-300" />
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    contact@alsnippets.com
                  </span>
                </a>
              </li>

              {/* WhatsApp */}
              <li>
                <a
                  href={`https://wa.me/573246454061?text=${encodeURIComponent(
                    "Hola, gracias por dar clic en el número de teléfono. Ahora podemos conversar de tu a tu para ayudarte con tu proyecto, impulsar el que tienes o crear uno desde cero."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    flex items-start gap-3
                    justify-center md:justify-start
                    transition-colors duration-300
                    hover:text-[var(--brand-primary)]
                  "
                >
                  <WhatsAppIcon className="w-6 h-6 transition-colors duration-300" />
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    (+57 324 645 4061)
                  </span>
                </a>
              </li>

              {/* Web */}
              <li>
                <a
                  href="https://alsnippets.com"
                  className="
                    group
                    flex items-start gap-3
                    justify-center md:justify-start
                    transition-colors duration-300
                    hover:text-[var(--brand-primary)]
                  "
                >
                  <WebIcon className="w-6 h-6 transition-colors duration-300" />
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    alsnippets.com
                  </span>
                </a>
              </li>

              {/* Dirección */}
              <li className="flex items-start gap-3 justify-center md:justify-start">
                <PinIcon className="w-6 h-6 mt-0.5 text-[var(--brand-primary)]" />
                <span className="leading-snug">
                  Carrera 50A Santander, Santa Bárbara<br />
                  <small className="opacity-80">Antioquia - Colombia</small>
                </span>
              </li>

            </ul>


            {/* =====================================================
                  Theme icons — preparado para theme switch
                  ===================================================== */}
            <div className="flex items-center gap-2 pt-2 justify-center md:justify-start">

              {/* Light theme */}
              <button
                type="button"
                data-theme="light"
                aria-label="Activar modo claro"
                className="
                  inline-flex
                  items-center
                  justify-center
                  border-none

                  w-11 h-11

                  text-[var(--text-white)]

                  transition-all duration-300 ease-out
                  hover:text-[var(--brand-primary)]
                  hover:scale-110
                  hover:shadow-[0_0_18px_rgba(201,163,78,0.55)]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[var(--brand-primary)]
                "
              >
                <SunIcon className="w-8 h-8" />
              </button>

              {/* Dark theme */}
              <button
                type="button"
                data-theme="dark"
                aria-label="Activar modo oscuro"
                className="
                  inline-flex
                  items-center
                  justify-center
                  border-none

                  w-11 h-11

                  text-[var(--text-white)]

                  transition-all duration-300 ease-out
                  hover:text-[var(--brand-primary)]
                  hover:scale-110
                  hover:shadow-[0_0_18px_rgba(201,163,78,0.55)]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[var(--brand-primary)]
                "
              >
                <MoonIcon className="w-8 h-8" />
              </button>

            </div>

            <div className="space-y-4">
            </div>


            {/* Redes sociales */}
            <div className="flex gap-4 pt-4 justify-center md:justify-start">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <SocialIcon
                  key={label}
                  href={href}
                  label={label}
                >
                  <Icon />
                </SocialIcon>
              ))}
            </div>
          </div>


          {/* =====================================================
             COLUMNA 2 — Enlaces
             ===================================================== */}
          <div
            className="
              backdrop-blur-sm

              border
              border-[var(--brand-primary)]

              rounded-2xl
              shadow-[var(--shadow-md)]
              p-8
            "
            style={{
              backgroundColor: "color-mix(in srgb, var(--bg-primary) 80%, transparent)",
            }}
          >
            <h4 className="text-sm font-semibold mb-6 text-center">
              Enlaces de interés
            </h4>

            <div className="grid grid-cols-2 gap-6 text-sm">

              {/* Izquierda */}
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/sobre-mi"
                    className="
                      text-footer3
                      inline-block py-0.5
                      transition-all duration-300 ease-out
                      text-[var(--text-primary)]
                      hover:text-[var(--text-yellow1)]
                      hover:translate-x-1
                      relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[var(--brand-primary)] after:transition-all after:duration-300 hover:after:w-full
                    "
                  >
                    Sobre mí
                  </Link>
                </li>

                <li>
                  <Link
                    href="/precios"
                    className="
                      text-footer3
                      inline-block py-0.5
                      transition-all duration-300 ease-out
                      text-[var(--text-primary)]
                      hover:text-[var(--text-yellow1)]
                      hover:translate-x-1
                      relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[var(--brand-primary)] after:transition-all after:duration-300 hover:after:w-full
                    "
                  >
                    Precios
                  </Link>
                </li>

                <li>
                  <Link
                    href="/blog"
                    className="
                      text-footer3
                      inline-block py-0.5
                      transition-all duration-300 ease-out
                      text-[var(--text-primary)]
                      hover:text-[var(--text-yellow1)]
                      hover:translate-x-1
                      relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[var(--brand-primary)] after:transition-all after:duration-300 hover:after:w-full
                    "
                  >
                    Blog
                  </Link>
                </li>

                <li>
                  <Link
                    href="/servicios/soporte-mantenimiento-wordpress"
                    className="
                      text-footer3
                      inline-block py-0.5
                      transition-all duration-300 ease-out
                      text-[var(--text-primary)]
                      hover:text-[var(--text-yellow1)]
                      hover:translate-x-1
                      relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[var(--brand-primary)] after:transition-all after:duration-300 hover:after:w-full
                    "
                  >
                    Soporte
                  </Link>
                </li>

                <li>
                  <Link
                    href="/servicios/seguridad-limpieza"
                    className="
                      text-footer3
                      inline-block py-0.5
                      transition-all duration-300 ease-out
                      text-[var(--text-primary)]
                      hover:text-[var(--text-yellow1)]
                      hover:translate-x-1
                      relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[var(--brand-primary)] after:transition-all after:duration-300 hover:after:w-full
                    "
                  >
                    Seguridad
                  </Link>
                </li>

                <li>
                  <Link
                    href="/servicios/optimizacion-rendimiento"
                    className="
                      text-footer3
                      inline-block py-0.5
                      transition-all duration-300 ease-out
                      text-[var(--text-primary)]
                      hover:text-[var(--text-yellow1)]
                      hover:translate-x-1
                      relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[var(--brand-primary)] after:transition-all after:duration-300 hover:after:w-full
                    "
                  >
                    Optimización
                  </Link>
                </li>

                <li>
                  <Link
                    href="/servicios/seo-geo"
                    className="
                      text-footer3
                      inline-block py-0.5
                      transition-all duration-300 ease-out
                      text-[var(--text-primary)]
                      hover:text-[var(--text-yellow1)]
                      hover:translate-x-1
                      relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[var(--brand-primary)] after:transition-all after:duration-300 hover:after:w-full
                  "
                  >
                    SEO & GEO
                  </Link>
                </li>

              </ul>

              {/* Derecha */}
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/proyectos/mis-creaciones"
                    className="
                      text-footer3
                      inline-block py-0.5
                      transition-all duration-300 ease-out
                      text-[var(--text-primary)]
                      hover:text-[var(--text-yellow1)]
                      hover:translate-x-1
                      relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[var(--brand-primary)] after:transition-all after:duration-300 hover:after:w-full
                    "
                  >
                    Mis creaciones
                  </Link>
                </li>

                <li>
                  <Link
                    href="/qr"
                    className="
                      text-footer3
                      inline-block py-0.5
                      transition-all duration-300 ease-out
                      text-[var(--text-primary)]
                      hover:text-[var(--text-yellow1)]
                      hover:translate-x-1
                      relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[var(--brand-primary)] after:transition-all after:duration-300 hover:after:w-full
                    "
                  >
                    QR personal
                  </Link>
                </li>

                <li>
                  <Link
                    href="/proyectos/suite-text"
                    className="
                      text-footer3
                      inline-block py-0.5
                      transition-all duration-300 ease-out
                      text-[var(--text-primary)]
                      hover:text-[var(--text-yellow1)]
                      hover:translate-x-1
                      relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[var(--brand-primary)] after:transition-all after:duration-300 hover:after:w-full
                    "
                  >
                    Suite text
                  </Link>
                </li>

                <li>
                  <Link
                    href="/proyectos/barber-short"
                    className="
                      text-footer3
                      inline-block py-0.5
                      transition-all duration-300 ease-out
                      text-[var(--text-primary)]
                      hover:text-[var(--text-yellow1)]
                      hover:translate-x-1
                      relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[var(--brand-primary)] after:transition-all after:duration-300 hover:after:w-full
                    "
                  >
                    Barber
                  </Link>
                </li>

                <li>
                  <Link
                    href="/proyectos/casos-de-exito"
                    className="
                      text-footer3
                      inline-block py-0.5
                      transition-all duration-300 ease-out
                      text-[var(--text-primary)]
                      hover:text-[var(--text-yellow1)]
                      hover:translate-x-1
                      relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[var(--brand-primary)] after:transition-all after:duration-300 hover:after:w-full
                    "
                  >
                    Casos de éxito
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contacto#faq"
                    className="
                      text-footer3
                      inline-block py-0.5
                      transition-all duration-300 ease-out
                      text-[var(--text-primary)]
                      hover:text-[var(--text-yellow1)]
                      hover:translate-x-1
                      relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[var(--brand-primary)] after:transition-all after:duration-300 hover:after:w-full
                    "
                  >
                    FAQ
                  </Link>
                </li>
              </ul>

            </div>

            {/* CTAs */}
            <div className="flex gap-4 pt-8 text-center justify-center">

              {/* Auditoría — Button General Dark */}
              <Link href="/auditoria" className="inline-block">
                <div className="button-general-dark-wrapper">
                  <button className="button-general-dark">
                    Auditoría
                  </button>
                </div>
              </Link>

              {/* Contacto — se queda simple por ahora */}
              <Link href="/contacto" className="inline-block">
                <span className="button-general-light">
                  Contacto
                </span>
              </Link>

            </div>


          </div>

          {/* =====================================================
             COLUMNA 3 — Newsletter & pagos
             ===================================================== */}
          <div
            className="
             backdrop-blur-sm

              border
              border-[var(--brand-primary)]

              rounded-2xl
              shadow-[var(--shadow-md)]
              p-8
            "
            style={{
              backgroundColor: "color-mix(in srgb, var(--bg-primary) 80%, transparent)",
            }}
          >
            <h4 className="text-sm font-semibold mb-6 text-center">
              Suscríbete a mi boletín
            </h4>

            {/* Newsletter */}
            <div className="
              flex
              mb-6
              shadow-[0_12px_32px_rgba(0,0,0,0.25)]
            "
            >
              <input
                type="email"
                placeholder="Ingresa tu correo@"
                className="
                  w-[70%]
                  px-5 py-3
                  border
                  border-r-0
                  border-[var(--brand-primary)]
                  bg-transparent
                  outline-none
                  flex items-center
                "
              />

              <button type="submit" className="button-send">
                <div className="svg-wrapper-1">
                  <div className="svg-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      aria-hidden="true"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        fill="currentColor"
                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                      />
                    </svg>
                  </div>
                </div>

                <span>Enviar</span>
              </button>
            </div>


            {/* Bloque de confianza */}
            <div className="mt-6 space-y-4 text-sm text-center">

              <p className="font-medium text-[var(--text-primary)]">
                Trabajo con WordPress de forma profesional y responsable.
              </p>

              <ul className="space-y-2 opacity-90">
                <li>✔️ <b>Más de 6 años</b> trabajando con WordPress</li>
                <li>✔️ <b>Optimización real</b></li>
                <li>✔️ Seguridad, rendimiento y <b>soporte humano</b></li>
              </ul>

            </div>



            {/* Pagos */}
            <div className="mt-6 flex justify-center">
              <img
                src="/images/footer/formas-de-pago-para-alsnippets.webp"
                alt="Formas de pago aceptadas por Alsnippets"
                className="
                  h-20
                  w-auto
                  opacity-80
                "
              />
            </div>

          </div>
        </div>

        {/* =====================================================
           Legal
           ===================================================== */}
        <div className="
          mt-16 pt-6
          border-t border-white/20
          text-sm
          flex flex-col md:flex-row
          items-center md:items-start
          justify-center md:justify-between
          gap-4
          text-center md:text-left
          text-[var(--text-white)]
          "
        >
          <p>
            © 2023 - {new Date().getFullYear()} Alsnippets. Todos los derechos reservados.
          </p>

          <div className="flex gap-4 justify-center md:justify-start">
            <Link className="hover:text-[var(--brand-primary)]" href="/privacidad">Privacidad</Link>
            <Link className="hover:text-[var(--brand-primary)]" href="/terminos">Términos</Link>
            <Link className="hover:text-[var(--brand-primary)]" href="/devoluciones">Devoluciones</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
