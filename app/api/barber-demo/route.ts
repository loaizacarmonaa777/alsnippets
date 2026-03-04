import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  // Inicializamos las variables secretas ADENTRO de la función
  const resend = new Resend(process.env.RESEND_API_KEY);
  const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
  
  try {
    const body = await request.json();
    const { name, phone, turnstileToken } = body;

    // 1. VALIDACIÓN BÁSICA
    if (!name || !phone || !turnstileToken) {
      return NextResponse.json({ success: false, error: 'Faltan datos obligatorios.' }, { status: 400 });
    }

    // 2. VERIFICACIÓN CLOUDFLARE
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

    // 3. ENVÍO DE NOTIFICACIÓN A TU CORREO
    const data = await resend.emails.send({
      from: 'Alsnippets Web <notificaciones@alsnippets.com>', 
      to: ['contact@alsnippets.com'],
      subject: `💈 Nuevo Lead: Demo Barber Short (${name})`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #1a1a1a; color: #fff; border-radius: 10px;">
            <h2 style="color: #c9a34e;">¡Alguien está probando Barber Short!</h2>
            <p style="color: #ccc;">Un usuario ha iniciado sesión en la demo y ha dejado sus datos de contacto:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <tr><td style="padding: 10px; border-bottom: 1px solid #333;"><strong>Nombre:</strong></td><td style="padding: 10px; border-bottom: 1px solid #333;">${name}</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #333;"><strong>Teléfono (WhatsApp):</strong></td><td style="padding: 10px; border-bottom: 1px solid #333;">${phone}</td></tr>
            </table>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">Validado por Cloudflare Turnstile ✅</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}