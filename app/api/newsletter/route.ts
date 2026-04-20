import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  // Inicializamos las variables secretas ADENTRO de la función
  const resend = new Resend(process.env.RESEND_API_KEY);
  const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
  
  try {
    const body = await request.json();
    const { email, turnstileToken } = body;

    // 1. VALIDACIÓN BÁSICA
    if (!email || !turnstileToken) {
      return NextResponse.json({ success: false, error: 'Faltan datos.' }, { status: 400 });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Correo inválido.' }, { status: 400 });
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
      return NextResponse.json({ success: false, error: 'Verificación fallida.' }, { status: 403 });
    }

    // 3. ENVÍO DE NOTIFICACIÓN A TU CORREO
    const data = await resend.emails.send({
      from: 'Alsnippets Web <notificaciones@alsnippets.com>', 
      to: ['contact@alsnippets.com'],
      subject: `📰 Nuevo Suscriptor: ${email}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
            <h2 style="color: #c9a34e;">¡Tienes un nuevo suscriptor a la Newsletter!</h2>
            <p>Adrián, Hola! este correo se añadió correctamente a tu base de datos de Turso:</p>
            <h3>${email}</h3>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}