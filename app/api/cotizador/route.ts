import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY

export async function POST (request: Request) {
  try {
    const { formData, turnstileToken, totalFormateado } = await request.json()

    // 1. VERIFICACIÓN CLOUDFLARE TURNSTILE
    if (!turnstileToken) {
      return NextResponse.json(
        { success: false, error: 'Falta token de seguridad.' },
        { status: 400 }
      )
    }

    const verifyFormData = new FormData()
    verifyFormData.append('secret', TURNSTILE_SECRET_KEY!)
    verifyFormData.append('response', turnstileToken)

    const turnstileRes = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: verifyFormData
      }
    )

    const turnstileData = await turnstileRes.json()

    if (!turnstileData.success) {
      return NextResponse.json(
        { success: false, error: 'Verificación de seguridad fallida.' },
        { status: 403 }
      )
    }

    // 2. CONSTRUIR EL DESGLOSE SEGÚN LA RAMA ELEGIDA
    let detallesHTML = ''

    if (formData.servicioPrincipal === 'Soporte') {
      detallesHTML = `
        <p><strong>Plataforma:</strong> ${formData.plataformaSoporte}</p>
        <p><strong>Necesidades:</strong> ${
          formData.necesidadesSoporte.length > 0
            ? formData.necesidadesSoporte.join(', ')
            : 'N/A'
        }</p>
        <p><strong>Descripción de ayuda:</strong> ${
          formData.descripcionProyecto || 'No proporcionada'
        }</p>
      `
    } else if (formData.servicioPrincipal === 'Crear Web') {
      detallesHTML = `
        <p><strong>Dominio comprado:</strong> ${formData.tieneDominio}</p>
        <p><strong>Hosting contratado:</strong> ${formData.tieneHosting}</p>
        <p><strong>Branding listo:</strong> ${formData.tieneBranding}</p>
        <p><strong>Textos y estructura:</strong> ${formData.tieneEstructura}</p>
        <p><strong>Tienda Online (WooCommerce):</strong> ${
          formData.necesitaWooCommerce
        }</p>
        <p><strong>Idea del proyecto:</strong> ${
          formData.descripcionProyecto || 'No proporcionada'
        }</p>
      `
    } else if (formData.servicioPrincipal === 'Por Horas') {
      detallesHTML = `
        <p><strong>Tipo de Desarrollo:</strong> ${formData.tipoHoras}</p>
        <p><strong>Paquete seleccionado:</strong> ${
          formData.cantidadHoras
        } horas</p>
        <p><strong>Tareas a realizar:</strong> ${
          formData.descripcionProyecto || 'No proporcionada'
        }</p>
      `
    } else if (formData.servicioPrincipal === 'SEO') {
      detallesHTML = `
        <p><strong>Objetivos y competencia:</strong> ${
          formData.descripcionProyecto || 'No proporcionada'
        }</p>
      `
    }

    // 3. DISEÑO DEL CORREO QUE TE LLEGARÁ A TI
    const htmlEmail = `
      <div style="font-family: sans-serif; padding: 20px; background-color: #f7f8fa; color: #0f172a; border-radius: 10px; max-width: 600px;">
          <h2 style="color: #c9a34e; margin-bottom: 5px;">¡Nueva Cotización Recibida! 🚀</h2>
          <p style="color: #64748b; font-size: 14px; margin-top: 0;">Alguien completó el cotizador de Alsnippets.</p>
          
          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin-top: 20px;">
            <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-top: 0;">👤 Datos del Lead</h3>
            <p><strong>Nombre:</strong> ${formData.nombre}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/${formData.whatsapp.replace(
              '+',
              ''
            )}">${formData.whatsapp}</a></p>
            <p><strong>País:</strong> ${formData.pais} (Moneda: ${
      formData.moneda
    })</p>
          </div>

          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin-top: 20px;">
            <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-top: 0;">🛠️ Detalles del Servicio</h3>
            <p><strong>Rama Elegida:</strong> <span style="background-color: #c9a34e22; color: #c9a34e; padding: 3px 8px; border-radius: 4px; font-weight: bold;">${
              formData.servicioPrincipal
            }</span></p>
            ${detallesHTML}
          </div>

          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin-top: 20px;">
            <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-top: 0;">💰 Inversión Estimada</h3>
            <p style="font-size: 28px; font-weight: 900; color: #15803d; margin: 10px 0;">
              ${totalFormateado} <span style="font-size: 14px; color: #64748b; font-weight: normal;">${
      formData.moneda
    }</span>
            </p>
          </div>
      </div>
    `

    // 4. ENVIAR A TRAVÉS DE RESEND
    const data = await resend.emails.send({
      from: 'Alsnippets Web <notificaciones@alsnippets.com>',
      to: ['contact@alsnippets.com'],
      subject: `💰 Lead Cotizador: ${formData.servicioPrincipal} - ${formData.nombre}`,
      html: htmlEmail
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}
