// app/api/auditoria/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  // Inicializamos las variables secretas ADENTRO de la función
  const resend = new Resend(process.env.RESEND_API_KEY);
  const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
  
  try {
    const body = await request.json();
    const { 
      tipoServicio, 
      nombreCompleto, 
      email, 
      codigoPais, 
      telefono, 
      medioContacto, 
      mensajeAuditoria, 
      turnstileToken 
    } = body;

    // 1. VERIFICACIÓN CLOUDFLARE TURNSTILE
    if (!turnstileToken) {
      return NextResponse.json({ success: false, error: 'Falta validación de seguridad.' }, { status: 400 });
    }

    const verifyFormData = new FormData();
    verifyFormData.append('secret', TURNSTILE_SECRET_KEY!);
    verifyFormData.append('response', turnstileToken);

    const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: verifyFormData,
    });
    
    const turnstileData = await turnstileRes.json();

    if (!turnstileData.success) {
      return NextResponse.json({ success: false, error: 'Verificación de seguridad fallida.' }, { status: 403 });
    }

    // 2. CONSTRUIR EL CORREO PARA TI
    const tipoLabel = tipoServicio === 'auditoria' ? 'Auditoría Técnica' : 'Consultoría Estratégica';
    
    const htmlEmail = `
      <div style="font-family: sans-serif; padding: 20px; background-color: #f7f8fa; color: #0f172a; border-radius: 10px; max-width: 600px;">
          <h2 style="color: #c9a34e; margin-bottom: 5px;">¡Nueva Solicitud de ${tipoLabel}! 🎯</h2>
          <p style="color: #64748b; font-size: 14px; margin-top: 0;">Un prospecto quiere trabajar contigo.</p>
          
          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin-top: 20px;">
            <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-top: 0;">👤 Datos del Cliente</h3>
            <p><strong>Nombre:</strong> ${nombreCompleto}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> <a href="https://wa.me/${codigoPais.replace('+', '')}${telefono}">${codigoPais} ${telefono}</a></p>
            <p><strong>Medio Preferido:</strong> ${medioContacto}</p>
          </div>

          ${tipoServicio === 'auditoria' ? `
          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin-top: 20px;">
            <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-top: 0;">🔍 Detalles del Sitio</h3>
            <p style="white-space: pre-wrap;">${mensajeAuditoria}</p>
          </div>
          ` : ''}
      </div>
    `;

    // 3. ENVIAR CON RESEND USANDO DOMINIO VERIFICADO
    console.log("Intentando enviar correo de Auditoría...");

    const { data, error } = await resend.emails.send({
      from: 'Alsnippets <notificaciones@alsnippets.com>', 
      to: ['contact@alsnippets.com'], 
      subject: `🚨 Solicitud: ${tipoLabel} - ${nombreCompleto}`,
      html: htmlEmail,
    });

    if (error) {
      console.error("🔴 ERROR DE RESEND:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    console.log("🟢 CORREO ENVIADO CON ÉXITO:", data);
    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error("🔴 ERROR CRÍTICO EN API AUDITORIA:", error);
    return NextResponse.json({ success: false, error: 'Fallo del servidor' }, { status: 500 });
  }
}