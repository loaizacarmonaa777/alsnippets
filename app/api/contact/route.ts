import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  // Inicializamos las variables secretas ADENTRO de la función
  const resend = new Resend(process.env.RESEND_API_KEY);
  const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
  
  try {
    const body = await request.json();
    // ✅ CORREGIDO: Coincidir con los nombres del frontend
    const { name, email, phone, message, lang, turnstileToken } = body;

    /* =====================================================
       1. VALIDACIÓN ESTRICTA DE BACKEND
    ===================================================== */
    if (!name || !email || !phone || !turnstileToken) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos obligatorios o token de seguridad.' }, 
        { status: 400 }
      );
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Formato de correo inválido.' }, 
        { status: 400 }
      );
    }

    // Validar que el teléfono tenga formato básico
    const phoneRegex = /^[\+\d\s-]{8,20}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, error: 'Formato de teléfono inválido.' }, 
        { status: 400 }
      );
    }

    /* =====================================================
       2. VERIFICACIÓN DE CLOUDFLARE TURNSTILE
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
      return NextResponse.json(
        { success: false, error: 'Verificación de seguridad fallida. ¿Eres un robot?' }, 
        { status: 403 }
      );
    }

    /* =====================================================
       3. SANITIZACIÓN BÁSICA para el email
    ===================================================== */
    const sanitizeHTML = (str: string) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const safeName = sanitizeHTML(name);
    const safeEmail = sanitizeHTML(email);
    const safePhone = sanitizeHTML(phone);
    const safeMessage = message ? sanitizeHTML(message) : 'No proporcionado';
    const safeLang = sanitizeHTML(lang || 'es');

    /* =====================================================
       4. ENVÍO DEL CORREO
    ===================================================== */
    const data = await resend.emails.send({
      from: 'Alsnippets Web <notificaciones@alsnippets.com>', 
      to: ['contact@alsnippets.com'],
      subject: `🚨 Nuevo Lead Web: ${safeName}`,
      html: `
        <div style="font-family: sans-serif; color: #333; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #c9a34e;">¡Tienes un nuevo mensaje de contacto!</h2>
          <p>Alguien ha llenado el formulario en la página de contacto de Alsnippets:</p>
          <table style="width: 100%; border-collapse: collapse; background: #fff; padding: 15px; border-radius: 8px;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Nombre:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${safeEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Teléfono:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${safePhone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Idioma:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${safeLang === 'en' ? 'English' : 'Español'}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>Mensaje:</strong></td>
              <td style="padding: 8px;">${safeMessage}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #888;">Validado por Cloudflare Turnstile ✅</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
    
  } catch (error) {
    console.error("Error enviando el correo:", error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' }, 
      { status: 500 }
    );
  }
}