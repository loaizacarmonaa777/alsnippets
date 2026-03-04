import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, pais, mensaje, turnstileToken } = body;

    /* =====================================================
       1. VALIDACIÓN ESTRICTA DE BACKEND
       Evita ataques directos a la API sin pasar por la web
    ===================================================== */
    if (!nombre || !email || !telefono || !turnstileToken) {
      return NextResponse.json({ success: false, error: 'Faltan campos obligatorios o token de seguridad.' }, { status: 400 });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Formato de correo inválido.' }, { status: 400 });
    }

    /* =====================================================
       2. VERIFICACIÓN DE CLOUDFLARE TURNSTILE
       Le preguntamos a Cloudflare si este token es de un humano
    ===================================================== */
    const verifyFormData = new FormData();
    verifyFormData.append('secret', TURNSTILE_SECRET_KEY!);
    verifyFormData.append('response', turnstileToken);

    const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: verifyFormData,
    });
    
    const turnstileData = await turnstileRes.json();

    if (!turnstileData.success) {
      console.warn("Intento de bot bloqueado por Turnstile:", turnstileData);
      return NextResponse.json({ success: false, error: 'Verificación de seguridad fallida. ¿Eres un robot?' }, { status: 403 });
    }

    /* =====================================================
       3. ENVÍO DEL CORREO (Solo si pasó las dos pruebas)
    ===================================================== */
    const data = await resend.emails.send({
      from: 'Alsnippets Web <notificaciones@alsnippets.com>', 
      to: ['contact@alsnippets.com'],
      subject: `🚨 Nuevo Lead Web: ${nombre}`,
      html: `
        <div style="font-family: sans-serif; color: #333; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
            <h2 style="color: #c9a34e;">¡Tienes un nuevo mensaje de contacto!</h2>
            <p>Alguien ha llenado el formulario en la página de contacto de Alsnippets:</p>
            <table style="width: 100%; border-collapse: collapse; background: #fff; padding: 15px; border-radius: 8px;">
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Nombre:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${nombre}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Teléfono:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${telefono}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>País:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${pais}</td></tr>
                <tr><td style="padding: 8px;"><strong>Mensaje:</strong></td><td style="padding: 8px;">${mensaje}</td></tr>
            </table>
            <p style="margin-top: 20px; font-size: 12px; color: #888;">Validado por Cloudflare Turnstile ✅</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error enviando el correo:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}