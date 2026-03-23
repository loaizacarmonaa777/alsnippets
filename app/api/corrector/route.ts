import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { texto, comando, lang } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) return NextResponse.json({ success: false, error: 'API Key missing' });

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
            4. Responde con un JSON estricto:
               {
                 "resultado": "el texto final",
                 "info": "breve mensaje de lo realizado (ej: 5 reemplazos hechos)"
               }`
          },
          { role: "user", content: `Texto: ${texto} | Comando: ${comando}` }
        ],
        temperature: 0.1,
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);
    return NextResponse.json({ success: true, ...content });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error en el cerebro IA' });
  }
}