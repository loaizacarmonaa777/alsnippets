// app/api/pagespeed/route.ts
import { NextResponse } from 'next/server'
import { scanSourceCode } from '@/lib/audit/scanner' // Importamos tu scanner de Cheerio

export async function GET (request: Request) {
  const { searchParams } = new URL(request.url)
  const targetUrl = searchParams.get('url')

  if (!targetUrl) {
    return NextResponse.json({ error: 'URL no proporcionada' }, { status: 400 })
  }

  const API_KEY = process.env.GOOGLE_PAGESPEED_KEY || ''

  try {
    // --- PASO 1: ANÁLISIS INTERNO (TU SCANNER) ---
    // Descargamos el HTML para que Cheerio busque Plugins, Malware y SEO Técnico
    const htmlRes = await fetch(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AuditPRO/2.0)' }
    });
    const htmlText = await htmlRes.text();
    const internalResults = scanSourceCode(htmlText);

    // --- PASO 2: ANÁLISIS EXTERNO (GOOGLE PAGESPEED) ---
    const googleUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      targetUrl
    )}&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&strategy=mobile${
      API_KEY ? `&key=${API_KEY}` : ''
    }`

    const res = await fetch(googleUrl)
    const json = await res.json()
    
    const lighthouse = json.lighthouseResult
    const audits = lighthouse?.audits || {}

    // --- PASO 3: FUSIÓN DE DATOS ---
    // Creamos el objeto final que el AuditGrid espera recibir
    return NextResponse.json({
      ...internalResults, // Inyectamos SEO, Seguridad y Plugins del scanner.ts
      meta: {
        ...internalResults.meta,
        domain: new URL(targetUrl).hostname,
        overallScore: Math.round(lighthouse?.categories?.performance?.score * 100) || 0,
      },
      performance: {
        score: Math.round(lighthouse?.categories?.performance?.score * 100) || 0,
        metrics: {
          fcp: audits['first-contentful-paint']?.displayValue,
          lcp: audits['largest-contentful-paint']?.displayValue,
          cls: audits['cumulative-layout-shift']?.displayValue,
          tti: audits['interactive']?.displayValue
        },
        resources: {
          images: audits['resource-summary']?.details?.items?.find((i: any) => i.resourceType === 'image')?.size || 0,
          scripts: audits['resource-summary']?.details?.items?.find((i: any) => i.resourceType === 'script')?.size || 0,
          fonts: audits['resource-summary']?.details?.items?.find((i: any) => i.resourceType === 'font')?.size || 0,
          html: audits['resource-summary']?.details?.items?.find((i: any) => i.resourceType === 'third-party')?.size || 0,
        }
      }
    })
  } catch (error: any) {
    console.error("Error en motor de análisis:", error);
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}