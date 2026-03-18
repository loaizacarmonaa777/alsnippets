// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (request: NextRequest) {
  const { pathname } = request.nextUrl

  // =====================================================
  // 1. GENERAR NONCE PARA CSP (seguridad)
  // =====================================================
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  // Crear respuesta base
  const response = NextResponse.next()

  // Añadir nonce a headers (para usarlo en CSP)
  response.headers.set('x-nonce', nonce)

  // =====================================================
  // 2. APLICAR HEADERS DE SEGURIDAD EN PRODUCCIÓN
  // =====================================================
  if (process.env.NODE_ENV === 'production') {
    const cspHeader =
      `default-src 'self'; script-src 'self' https://challenges.cloudflare.com 'nonce-${nonce}' 'strict-dynamic' 'unsafe-inline'; frame-src 'self' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;`
        .replace(/\s{2,}/g, ' ')
        .trim()

    response.headers.set('Content-Security-Policy', cspHeader)
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'SAMEORIGIN')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  }

  // =====================================================
  // 3. PROTECCIÓN DE RUTA PRIVADA (NUEVA SECCIÓN)
  // =====================================================
  // Verificamos si la ruta es la de auditoría privada (exactamente 'audit')
  const isAuditRoute = pathname.split('/').some(segment => segment === 'audit')
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true'

  // Caso A: Intenta entrar a ruta privada SIN estar logueado
  if (isAuditRoute && !isLoggedIn) {
    // Detectamos el idioma actual desde la URL (es o en)
    const lang = pathname.split('/')[1] || 'es'
    // Redirigir al login del idioma actual
    const loginUrl = new URL(`/${lang}/login`, request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Caso B: Está logueado y en ruta privada -> Refrescamos la sesión (1 hora de inactividad)
  if (isAuditRoute && isLoggedIn) {
    // Continuamos con la respuesta (incluyendo el nonce y headers previos)
    const responseNext = NextResponse.next()

    // Sincronizamos los headers de seguridad ya configurados
    response.headers.forEach((value, key) => {
      responseNext.headers.set(key, value)
    })

    // Renovamos la cookie por 1 hora (3600 segundos) para persistencia y control de inactividad
    responseNext.cookies.set('isLoggedIn', 'true', {
      path: '/',
      maxAge: 60 * 60,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    })

    return responseNext
  }

  // =====================================================
  // 4. TU LÓGICA ORIGINAL (INTACTA)
  // =====================================================
  // Interceptamos SOLO la raíz ("/")
  if (pathname === '/') {
    // Leemos el idioma que tiene configurado el navegador del usuario
    const acceptLanguage = request.headers.get('accept-language') || ''

    // Si el navegador tiene "es", va a español. Si no, a inglés.
    const locale = acceptLanguage.toLowerCase().includes('es') ? 'es' : 'en'

    // Reescribimos la URL y hacemos la redirección inmediata
    request.nextUrl.pathname = `/${locale}`
    return NextResponse.redirect(request.nextUrl)
  }

  return response
}

// Configuración para que el middleware no gaste recursos en imágenes o APIs
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)']
}
