import Link from "next/link";
import ContactForm from "@/components/contacto/ContactForm";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import {
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Github,
} from "lucide-react";


/* =====================================================
   Página de Contacto
===================================================== */

export default function ContactoPage() {
  return (
    <>
      {/* =====================================================
    HERO — Contacto (con imagen de fondo)
   ===================================================== */}
      <section
        className="
          relative
          w-full
          h-[70vh]
          min-h-[520px]
          flex
          items-start
          text-center
          pt-24
          pb-[22rem]
          sm:pb-[20rem]
          lg:pb-[14rem]
        "
        style={{
          "--text-primary": "var(--text-white)",
          backgroundImage: `
          linear-gradient(
            rgba(0,0,0,0.55),
            rgba(0,0,0,0.55)
          ),
          url('/images/contact/alsnippets-hero-contact-desktop.webp')
        `,
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
        } as React.CSSProperties}
      >
        <div
          className="
            relative z-10
            w-full
            max-w-3xl
            mx-auto
            px-5
            space-y-4
            text-white
          "
        >
          <h1 className="text-4xl font-bold">
            Hablemos de tu proyecto
          </h1>

          <p className="text-lg opacity-90">
            Escríbeme y conversemos con calma sobre tu sitio,
            tus dudas actuales y el siguiente paso real que necesitas dar
            para avanzar con confianza.
          </p>
        </div>
      </section>



      {/* =====================================================
          FORMULARIO — Flotante sobre el hero
          ===================================================== */}
      <section className="relative z-10">
        <div
          className="
            max-w-3xl mx-auto
            px-5
            -mt-[45vh]
          "
        >
          <div className="bg-white border rounded-2xl p-8 shadow-xl">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* =====================================================
          DATOS DE CONTACTO
          ===================================================== */}
      <main className="w-full space-y-24 mt-24">
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-5 space-y-10 text-center">

            {/* Título */}
            <h2 className="text-2xl font-semibold">
              Datos de contacto
            </h2>

            {/* Texto */}
            <p className="opacity-80 max-w-3xl mx-auto">
              Trabajo de forma remota con clientes en Colombia, España,
              Estados Unidos, Canadá y otros países.
              Puedes escribirme directamente por los siguientes medios.
            </p>

            {/* Grid de contacto */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pt-8">

              {/* Email */}
              <div className="space-y-3 card">
                <Mail className="w-7 h-7 mx-auto opacity-80" />
                <p className="font-medium">Email</p>
                <a
                  href="mailto:contact@alsnippets.com"
                  className="underline opacity-80"
                >
                  contact@alsnippets.com
                </a>
              </div>

              {/* WhatsApp */}
              <div className="space-y-3 card">
                <MessageCircle className="w-7 h-7 mx-auto opacity-80" />
                <p className="font-medium">WhatsApp</p>
                <a
                  href="https://wa.me/573246454061"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline opacity-80"
                >
                  +57 324 645 4061
                </a>
              </div>

              {/* Ubicación */}
              <div className="space-y-3 card">
                <MapPin className="w-7 h-7 mx-auto opacity-80" />
                <p className="font-medium">Ubicación</p>
                <p className="opacity-80">
                  Santa Bárbara, Antioquia – Colombia
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* =====================================================
             Redes Sociales
            ===================================================== */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-5 space-y-10 text-center">

            {/* Título */}
            <h2 className="text-2xl font-semibold">
              Encuéntrame también en
            </h2>

            {/* Grid de redes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-10 pt-8">

              {/* Instagram */}
              <div className="space-y-3 card">
                <Instagram className="w-7 h-7 mx-auto opacity-80" />
                <p className="font-medium">Instagram</p>
                <a
                  href="https://www.instagram.com/alsnippets/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline opacity-80"
                >
                  @alsnippets
                </a>
              </div>

              {/* Facebook */}
              <div className="space-y-3 card">
                <Facebook className="w-7 h-7 mx-auto opacity-80" />
                <p className="font-medium">Facebook</p>
                <a
                  href="https://www.facebook.com/alsnippets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline opacity-80"
                >
                  Alsnippets
                </a>
              </div>

              {/* YouTube */}
              <div className="space-y-3 card">
                <Youtube className="w-7 h-7 mx-auto opacity-80" />
                <p className="font-medium">YouTube</p>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline opacity-80"
                >
                  Canal
                </a>
              </div>

              {/* LinkedIn */}
              <div className="space-y-3 card">
                <Linkedin className="w-7 h-7 mx-auto opacity-80" />
                <p className="font-medium">LinkedIn</p>
                <a
                  href="https://www.linkedin.com/in/adrian-loaiza-carmona-alc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline opacity-80"
                >
                  Perfil
                </a>
              </div>

              {/* GitHub */}
              <div className="space-y-3 card">
                <Github className="w-7 h-7 mx-auto opacity-80" />
                <p className="font-medium">GitHub</p>
                <a
                  href="https://github.com/loaizacarmonaa777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline opacity-80"
                >
                  Repositorios
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* =====================================================
              FAQs — Preguntas frecuentes (FULLWIDTH)
            ===================================================== */}
        <section
          id="faq"
          className="--fullwidth"
        >
          <div className="max-w-4xl mx-auto px-5 space-y-10 text-center">

            <h2 className="text-2xl font-semibold">
              Preguntas frecuentes
            </h2>

            <p className="opacity-80 max-w-3xl mx-auto">
              Estas son algunas de las dudas más comunes antes de iniciar un
              trabajo conmigo. La idea es que tengas claridad, confianza y
              expectativas reales.
            </p>

            {/* =====================================================
                Accordion
              ===================================================== */}
            <div className="space-y-4 text-left">

              {/* FAQ 1 */}
              <details className="group border rounded-xl p-5 card">
                <summary className="cursor-pointer font-medium flex justify-between items-center">
                  ¿Trabajas como freelance o como empresa?
                  <span className="transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 opacity-80">
                  Trabajo como freelance profesional. Esto me permite involucrarme
                  directamente en cada proyecto, sin intermediarios ni
                  delegaciones. Tú hablas directamente conmigo en todo el proceso.
                </p>
              </details>

              {/* FAQ 2 */}
              <details className="group border rounded-xl p-5 card">
                <summary className="cursor-pointer font-medium flex justify-between items-center">
                  ¿Por qué tus servicios no son los más baratos?
                  <span className="transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 opacity-80">
                  Porque no ofrezco soluciones genéricas ni trabajos
                  automatizados. Mi enfoque es preventivo, técnico y responsable.
                  Invierto tiempo real en analizar, proponer y ejecutar
                  correctamente.
                </p>
              </details>

              {/* FAQ 3 */}
              <details className="group border rounded-xl p-5 card">
                <summary className="cursor-pointer font-medium flex justify-between items-center">
                  ¿Cómo sé que no desaparecerás a mitad del proyecto?
                  <span className="transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 opacity-80">
                  Trabajo con un número limitado de proyectos al mismo tiempo y
                  mantengo comunicación clara desde el inicio. No sobrecargo mi
                  agenda ni delego tu proyecto a terceros.
                </p>
              </details>

              {/* FAQ 4 */}
              <details className="group border rounded-xl p-5 card">
                <summary className="cursor-pointer font-medium flex justify-between items-center">
                  ¿Con qué tipo de clientes trabajas?
                  <span className="transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 opacity-80">
                  Trabajo con personas y empresas que valoran la estabilidad, la
                  seguridad y el trabajo bien hecho. No acepto proyectos donde se
                  busque solo “lo más barato”.
                </p>
              </details>

              {/* FAQ 5 */}
              <details className="group border rounded-xl p-5 card">
                <summary className="cursor-pointer font-medium flex justify-between items-center">
                  ¿Necesitas accesos a mi sitio web?
                  <span className="transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 opacity-80">
                  Para auditorías y trabajos técnicos, sí. Los accesos son
                  necesarios para revisar el estado real del sitio. Todo se maneja
                  con confidencialidad y buenas prácticas.
                </p>
              </details>

              {/* FAQ 6 */}
              <details className="group border rounded-xl p-5 card">
                <summary className="cursor-pointer font-medium flex justify-between items-center">
                  ¿Trabajas solo con WordPress?
                  <span className="transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 opacity-80">
                  Mi especialidad principal es WordPress, pero también trabajo con
                  tecnologías modernas y desarrollo a medida cuando el proyecto lo
                  requiere.
                </p>
              </details>

              {/* FAQ 7 */}
              <details className="group border rounded-xl p-5 card">
                <summary className="cursor-pointer font-medium flex justify-between items-center">
                  ¿Ofreces soporte después del trabajo?
                  <span className="transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 opacity-80">
                  Sí. Dependiendo del servicio, ofrezco acompañamiento,
                  mantenimiento o soporte continuo. No entrego un proyecto y
                  desaparezco.
                </p>
              </details>

              {/* FAQ 8 */}
              <details className="group border rounded-xl p-5 card">
                <summary className="cursor-pointer font-medium flex justify-between items-center">
                  ¿Trabajas con clientes fuera de Colombia?
                  <span className="transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 opacity-80">
                  Sí. Trabajo de forma remota con clientes en distintos países. La
                  comunicación se adapta al medio y horario acordado.
                </p>
              </details>

              {/* FAQ 9 */}
              <details className="group border rounded-xl p-5 card">
                <summary className="cursor-pointer font-medium flex justify-between items-center">
                  ¿Cuánto tiempo toma una auditoría o intervención?
                  <span className="transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 opacity-80">
                  Depende del estado y tamaño del sitio. Antes de iniciar, explico
                  el alcance, tiempos estimados y próximos pasos para que no haya
                  sorpresas.
                </p>
              </details>

              {/* FAQ 10 */}
              <details className="group border rounded-xl p-5 card">
                <summary className="cursor-pointer font-medium flex justify-between items-center">
                  ¿Qué pasa si mi problema no se puede resolver?
                  <span className="transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 opacity-80">
                  Soy honesto desde el inicio. Si algo no es viable o no vale la
                  pena hacerlo, lo digo claramente. Prefiero transparencia a
                  promesas irreales.
                </p>
              </details>

            </div>
          </div>
        </section>


      </main>
    </>
  );
}
