import { NextResponse } from 'next/server';

// Forzamos el uso de Node.js runtime para evitar problemas de compatibilidad con algunas librerías en Edge
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { texto, comando, lang } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    // 1. Verificación de API Key
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'API Key missing on server' }, { status: 500 });
    }

    // 2. Llamada a Groq
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `Eres SuiteText AI, un motor de transformación de texto profesional. 
            Instrucciones:
            1. Ejecuta el comando del usuario sobre el texto proporcionado.
            2. Si pide buscar y reemplazar, indícale cuántos cambios hiciste.
            3. Si pide generar texto (como Lorem Ipsum o Passwords), hazlo.
            4. Responde ÚNICAMENTE con un JSON estricto:
               {
                 "resultado": "el texto final",
                 "info": "breve mensaje de lo realizado"
               }`
          },
          { role: "user", content: `Texto: ${texto || ''} | Comando: ${comando}` }
        ],
        temperature: 0.1,
        response_format: { type: "json_object" }
      }),
    });

    // 3. Verificar si el fetch fue exitoso
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ 
        success: false, 
        error: `Groq API Error: ${errorData.error?.message || 'Unknown error'}` 
      }, { status: response.status });
    }

    const data = await response.json();
    
    // 4. Validar estructura de respuesta de la IA
    if (!data.choices || !data.choices[0]?.message?.content) {
      return NextResponse.json({ success: false, error: 'IA no respondió correctamente' }, { status: 502 });
    }

    let rawContent = data.choices[0].message.content;

    // 5. Limpieza de posibles bloques Markdown (```json ... ```)
    const cleanJson = rawContent
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();
    
    try {
      const content = JSON.parse(cleanJson);
      // Retornamos éxito con la estructura que el frontend espera
      return NextResponse.json({ 
        success: true, 
        resultado: content.resultado, 
        info: content.info || 'Procesado correctamente'
      });
    } catch (parseError) {
      // Fallback: Si el JSON falla pero hay texto, intentamos rescatarlo
      return NextResponse.json({ 
        success: true, 
        resultado: rawContent, 
        info: "Procesado (formato no estándar)" 
      });
    }

  } catch (error: any) {
    console.error('SERVER_ERROR_SUITE_TEXT:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Error en el cerebro IA: ' + (error.message || 'Unknown')
    }, { status: 500 });
  }
}