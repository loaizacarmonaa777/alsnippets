"use client";

import { useState } from "react";
import Link from "next/link";

// Página: Auditoría y Consultoría WordPress
export default function AuditoriaPage() {
  const [tipoServicio, setTipoServicio] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensajeAuditoria, setMensajeAuditoria] = useState("");
  const [medioContacto, setMedioContacto] = useState("");
  const [medioContactoError, setMedioContactoError] = useState("");
  const [aceptaLegales, setAceptaLegales] = useState(false);
  const [errores, setErrores] = useState<Record<string, string>>({});

  // Mensajes en tiempo real
  const [nombreError, setNombreError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");



  const MAX_CARACTERES = 500;

  /* =====================================================
     Utilidades
     ===================================================== */

  const contarPalabras = (texto: string) =>
    texto.trim() === "" ? 0 : texto.trim().split(/\s+/).length;

  const caracteresRestantes =
    MAX_CARACTERES - mensajeAuditoria.length;

  /* =====================================================
     Validación del formulario
     ===================================================== */
  const validarFormulario = () => {
    const nuevosErrores: Record<string, string> = {};

    if (!tipoServicio) {
      nuevosErrores.tipoServicio = "Este campo es obligatorio.";
    }

    if (!nombreCompleto) {
      nuevosErrores.nombreCompleto = "El nombre completo es obligatorio.";
    }

    if (!email) {
      nuevosErrores.email = "El correo electrónico es obligatorio.";
    } else if (!email.includes("@")) {
      nuevosErrores.email =
        "Verifica que tu email tenga el @ y sea válido.";
    }

    if (!telefono) {
      nuevosErrores.telefono =
        "El número de teléfono es obligatorio.";
    } else if (!/^\d+$/.test(telefono)) {
      nuevosErrores.telefono =
        "Por favor, solo caracteres numéricos.";
    }

    if (tipoServicio === "auditoria" && !mensajeAuditoria) {
      nuevosErrores.mensajeAuditoria =
        "Este campo es obligatorio para solicitar una auditoría.";
    }

    if (!aceptaLegales) {
      nuevosErrores.legales =
        "Debes aceptar los términos, políticas y cookies.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };


  /* =====================================================
   Envío (con protección anti-spam básica)
   ===================================================== */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    // Honeypot: si este campo tiene valor, es un bot
    const honeypot = (form.elements.namedItem("empresa") as HTMLInputElement)?.value;

    if (honeypot) {
      // Bot detectado → no hacer nada
      return;
    }

    if (validarFormulario()) {
      // Aquí irá el envío real al endpoint /api/auditoria
      console.log("Formulario válido y humano");
    }
  };


  /* =====================================================
     Validación Nombre Completo (onBlur)
     ===================================================== */
  const validarNombreCompleto = () => {
    const palabras = nombreCompleto
      .trim()
      .split(/\s+/);

    if (palabras.length < 2) {
      setNombreError("Por favor, escribe al menos un nombre y apellido.");
    } else {
      setNombreError("");
    }
  };

  /* =====================================================
  Validación Email (onBlur)
  ===================================================== */
  const validarEmail = () => {
    if (!email || !email.includes("@")) {
      setEmailError("Por favor, pon un correo válido con '@'.");
    } else {
      setEmailError("");
    }
  };

  /* =====================================================
  Validación Medio de Contacto (onBlur)
  ===================================================== */
  const validarMedioContacto = () => {
    if (!medioContacto) {
      setMedioContactoError(
        "Por favor selecciona un medio de contacto."
      );
    } else {
      setMedioContactoError("");
    }
  };




  return (
    <main className="max-w-6xl mx-auto px-5 py-12 space-y-24">
      {/* =====================================================
          HERO — preparado para imagen de fondo
          ===================================================== */}
      <section className="relative overflow-hidden rounded-2xl p-10 md:p-16 space-y-6 max-w-5xl">
        {/* Overlay para imagen futura */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* Contenido */}
        <div className="relative z-10 space-y-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold">
            Auditoría y Consultoría WordPress Profesional
          </h1>

          <p className="text-lg opacity-90">
            Ofrezco auditoría y consultoría WordPress de forma remota,
            trabajando con proyectos en Colombia, Latinoamérica, España, USA, Canadá
            y otros países.
          </p>

          <p className="text-sm opacity-80">
            La tecnología no es infalible. Mi trabajo es anticipar problemas,
            reducir riesgos y responder con criterio cuando algo ocurre.
          </p>
        </div>
      </section>


      {/* =====================================================
          DIFERENCIA — Auditoría vs Consultoría
          ===================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        {/* =====================================================
            AUDITORÍA
            ===================================================== */}
        <div className="border rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Auditoría WordPress
          </h2>

          <p className="text-sm opacity-80">
            La auditoría es un servicio técnico que consiste
            en revisar el estado real de tu sitio web para
            detectar problemas, riesgos y oportunidades de
            mejora.
          </p>

          <ul className="text-sm opacity-80 space-y-1">
            <li>— Revisión de WordPress, hosting y dominio</li>
            <li>
              — Análisis de seguridad, rendimiento y estructura
            </li>
            <li>
              — Evaluación de buenas prácticas técnicas
            </li>
            <li>— Requiere acceso al entorno técnico</li>
          </ul>

          <p className="text-sm opacity-80">
            La auditoría tiene un costo. Si decides realizar
            el trabajo conmigo, este valor se descuenta del
            servicio final, quedando la auditoría sin costo
            adicional.
          </p>
        </div>

        {/* =====================================================
            CONSULTORÍA
            ===================================================== */}
        <div
          id="consultoria"
          className="border rounded-xl p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold">
            Consultoría
          </h2>

          <p className="text-sm opacity-80">
            La consultoría es una sesión de orientación donde
            resolvemos dudas, evaluamos ideas y definimos
            posibles caminos para tu proyecto.
          </p>

          <ul className="text-sm opacity-80 space-y-1">
            <li>— Primera sesión gratuita (60 minutos)</li>
            <li>— No requiere accesos técnicos</li>
            <li>
              — Reunión por videollamada o WhatsApp
            </li>
          </ul>

          <p className="text-sm opacity-80">
            Las sesiones adicionales tienen costo según el
            tiempo y el alcance requerido.
          </p>
        </div>
      </section>

      {/* =====================================================
          GARANTÍA DE PROCESO Y CONFIANZA
          ===================================================== */}
      <section className="max-w-4xl border-l-4 border-black/60 pl-6 space-y-4">
        <h2 className="text-xl font-semibold">
          Trabajo responsable, sin sobrecarga ni abandono
        </h2>

        <p className="text-sm opacity-80">
          Trabajo con un número limitado de proyectos.
          Prefiero cumplir bien cada compromiso, mantener comunicación
          clara y acompañar cada proyecto de principio a fin.
        </p>

        <p className="text-sm opacity-80">
          Colaboro de forma remota con clientes de distintos países,
          adaptándome a horarios y contextos, sin delegar tu proyecto
          ni desaparecer a mitad del proceso.
        </p>
      </section>


      {/* =====================================================
          FORMULARIO
          ===================================================== */}
      <section className="border rounded-2xl p-8 space-y-8 max-w-3xl">
        <h2 className="text-2xl font-semibold">
          Solicitud de auditoría o consultoría
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot anti-spam (invisible) */}
          <input
            type="text"
            name="empresa"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          {/* =====================================================
          Tipo de servicio
          ===================================================== */}
          <div className="space-y-1">
            <label className="text-sm font-medium">
              ¿Qué servicio necesitas?{" "}
              <span className="text-red-500">*</span>
            </label>

            <select
              value={tipoServicio}
              onChange={(e) =>
                setTipoServicio(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="">
                Selecciona una opción
              </option>
              <option value="consultoria">
                Quiero una consultoría
              </option>
              <option value="auditoria">
                Quiero una auditoría
              </option>
            </select>

            {errores.tipoServicio && (
              <p className="text-red-500 text-sm">
                {errores.tipoServicio}
              </p>
            )}
          </div>

          {/* =====================================================
            Nombre completo
            ===================================================== */}
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Nombre completo{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={nombreCompleto}
              placeholder="Tu nombre completo"
              onChange={(e) =>
                setNombreCompleto(e.target.value)
              }
              onBlur={validarNombreCompleto}
              className={`w-full border rounded-lg px-4 py-3 ${nombreError ? "border-red-500" : ""
                }`}
            />

            {nombreError && (
              <p className="text-red-500 text-sm">
                {nombreError}
              </p>
            )}
          </div>


          {/* =====================================================
            Email
            ===================================================== */}
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Correo electrónico{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="email"
              value={email}
              placeholder="tuemail@email.com"
              onChange={(e) =>
                setEmail(e.target.value)
              }
              onBlur={validarEmail}
              className={`w-full border rounded-lg px-4 py-3 ${emailError ? "border-red-500" : ""
                }`}
            />

            {emailError && (
              <p className="text-red-500 text-sm">
                {emailError}
              </p>
            )}
          </div>

          {/* =====================================================
              Medio de comunicación
              ===================================================== */}
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Medio de comunicación preferido{" "}
              <span className="text-red-500">*</span>
            </label>

            <select
              value={medioContacto}
              onChange={(e) =>
                setMedioContacto(e.target.value)
              }
              onBlur={validarMedioContacto}
              className={`w-full border rounded-lg px-4 py-3 ${medioContactoError ? "border-red-500" : ""
                }`}
            >
              <option value="">
                Selecciona una opción
              </option>
              <option value="whatsapp">
                WhatsApp
              </option>
              <option value="google-meet">
                Google Meet
              </option>
              <option value="microsoft-teams">
                Microsoft Teams
              </option>
              <option value="zoom">
                Zoom
              </option>
            </select>

            {medioContactoError && (
              <p className="text-red-500 text-sm">
                {medioContactoError}
              </p>
            )}

            {/* Texto informativo (UX, no técnico) */}
            <p className="text-sm opacity-70">
              Para Google Meet, Microsoft Teams y Zoom,
              recibirás un correo con el enlace de la
              reunión. Si eliges WhatsApp, el contacto
              será directo por ese medio.
            </p>
          </div>



          {/* =====================================================
    Teléfono con código de país
   ===================================================== */}
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Teléfono (con código de país){" "}
              <span className="text-red-500">*</span>
            </label>

            {/* Contenedor horizontal: select + input */}
            <div className="flex gap-3">
              {/* Código de país */}
              <select
                required
                className="w-1/3 border rounded-lg px-3 py-3"
              >
                <option value="">Código</option>

                {/* =========================
         Norteamérica
         ========================= */}
                <optgroup label="Norteamérica">
                  <option value="+1">+1 Canadá</option>
                  <option value="+1">+1 Estados Unidos</option>
                  <option value="+52">+52 México</option>
                </optgroup>

                {/* =========================
          Centroamérica
         ========================= */}
                <optgroup label="Centroamérica">
                  <option value="+501">+501 Belice</option>
                  <option value="+506">+506 Costa Rica</option>
                  <option value="+503">+503 El Salvador</option>
                  <option value="+502">+502 Guatemala</option>
                  <option value="+504">+504 Honduras</option>
                  <option value="+505">+505 Nicaragua</option>
                  <option value="+507">+507 Panamá</option>
                </optgroup>

                {/* =========================
          Sudamérica
         ========================= */}
                <optgroup label="Sudamérica">
                  <option value="+54">+54 Argentina</option>
                  <option value="+591">+591 Bolivia</option>
                  <option value="+55">+55 Brasil</option>
                  <option value="+56">+56 Chile</option>
                  <option value="+57">+57 Colombia</option>
                  <option value="+593">+593 Ecuador</option>
                  <option value="+592">+592 Guyana</option>
                  <option value="+595">+595 Paraguay</option>
                  <option value="+51">+51 Perú</option>
                  <option value="+597">+597 Surinam</option>
                  <option value="+598">+598 Uruguay</option>
                  <option value="+58">+58 Venezuela</option>
                </optgroup>

                {/* =========================
          Caribe
         ========================= */}
                <optgroup label="Caribe">
                  <option value="+1">+1 Antigua y Barbuda</option>
                  <option value="+1">+1 Bahamas</option>
                  <option value="+1">+1 Barbados</option>
                  <option value="+53">+53 Cuba</option>
                  <option value="+1">+1 Dominica</option>
                  <option value="+1">+1 Granada</option>
                  <option value="+509">+509 Haití</option>
                  <option value="+1">+1 Jamaica</option>
                  <option value="+1">+1 República Dominicana</option>
                  <option value="+1">+1 San Cristóbal y Nieves</option>
                  <option value="+1">+1 San Vicente y las Granadinas</option>
                  <option value="+1">+1 Santa Lucía</option>
                  <option value="+1">+1 Trinidad y Tobago</option>
                </optgroup>

                {/* =========================
          Unión Europea
          ========================= */}
                <optgroup label="Unión Europea">
                  <option value="+49">+49 Alemania</option>
                  <option value="+43">+43 Austria</option>
                  <option value="+32">+32 Bélgica</option>
                  <option value="+359">+359 Bulgaria</option>
                  <option value="+420">+420 Chequia</option>
                  <option value="+357">+357 Chipre</option>
                  <option value="+385">+385 Croacia</option>
                  <option value="+45">+45 Dinamarca</option>
                  <option value="+421">+421 Eslovaquia</option>
                  <option value="+386">+386 Eslovenia</option>
                  <option value="+34">+34 España</option>
                  <option value="+372">+372 Estonia</option>
                  <option value="+358">+358 Finlandia</option>
                  <option value="+33">+33 Francia</option>
                  <option value="+30">+30 Grecia</option>
                  <option value="+36">+36 Hungría</option>
                  <option value="+353">+353 Irlanda</option>
                  <option value="+39">+39 Italia</option>
                  <option value="+371">+371 Letonia</option>
                  <option value="+370">+370 Lituania</option>
                  <option value="+352">+352 Luxemburgo</option>
                  <option value="+356">+356 Malta</option>
                  <option value="+31">+31 Países Bajos</option>
                  <option value="+48">+48 Polonia</option>
                  <option value="+351">+351 Portugal</option>
                  <option value="+40">+40 Rumanía</option>
                  <option value="+46">+46 Suecia</option>
                </optgroup>

                {/* =========================
                     Reino Unido
                    ========================= */}
                <optgroup label="Reino Unido">
                  <option value="+44">+44 Reino Unido</option>
                </optgroup>
              </select>

              {/* Número de teléfono */}
              <input
                type="text"
                inputMode="numeric"
                value={telefono}
                placeholder="Número de teléfono"
                onChange={(e) => {
                  const valor = e.target.value;

                  if (/^\d*$/.test(valor)) {
                    setTelefono(valor);
                    setTelefonoError("");
                  } else {
                    setTelefonoError("Escribe sólo números sin espacios.");
                  }
                }}
                className={`w-2/3 border rounded-lg px-4 py-3 ${telefonoError ? "border-red-500" : ""
                  }`}
              />
            </div>

            {/* Mensaje de error DEBAJO */}
            {telefonoError && (
              <p className="text-red-500 text-sm">
                {telefonoError}
              </p>
            )}
          </div>

        {/* =====================================================
              Campo condicional Auditoría
              ===================================================== */}
        {tipoServicio === "auditoria" && (
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Información sobre la auditoría{" "}
              <span className="text-red-500">*</span>
            </label>

            <textarea
              value={mensajeAuditoria}
              onChange={(e) => {
                if (e.target.value.length <= MAX_CARACTERES) {
                  setMensajeAuditoria(e.target.value);
                }
              }}
              placeholder="Cuéntame un poco sobre tu auditoría. Pega aquí el enlace de tu sitio web."
              className="w-full border rounded-lg px-4 py-3 min-h-[140px]"
            />

            <p className="text-sm opacity-70">
              Caracteres restantes: {caracteresRestantes}
            </p>

            {errores.mensajeAuditoria && (
              <p className="text-red-500 text-sm">
                {errores.mensajeAuditoria}
              </p>
            )}
          </div>
        )}

        {/* =====================================================
              Legales
              ===================================================== */}
        <div className="space-y-2 text-sm">
          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={aceptaLegales}
              onChange={(e) =>
                setAceptaLegales(
                  e.target.checked
                )
              }
            />
            Acepto los{" "}
            <Link
              href="/terminos"
              className="underline"
            >
              términos y condiciones
            </Link>{" "}
            y la{" "}
            <Link
              href="/privacidad"
              className="underline"
            >
              política de privacidad
            </Link>
          </label>

          {errores.legales && (
            <p className="text-red-500">
              {errores.legales}
            </p>
          )}
        </div>

        {/* =====================================================
              Enviar
              ===================================================== */}
        <button
          type="submit"
          className="border px-6 py-4 rounded-lg"
        >
          Enviar solicitud
        </button>
      </form>
      </section>
    </main >
  );
}
