// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Interceptamos SOLO la raíz ("/") 
  if (pathname === '/') {
    
    // Leemos el idioma que tiene configurado el navegador del usuario
    const acceptLanguage = request.headers.get('accept-language') || '';

    // Si el navegador tiene "es" (es-ES, es-CO, es-MX), va a español. Si no, a inglés.
    const locale = acceptLanguage.toLowerCase().includes('es') ? 'es' : 'en';

    // Reescribimos la URL y hacemos la redirección inmediata
    request.nextUrl.pathname = `/${locale}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Si entran a /auditoria, /blog, etc., los dejamos pasar normalmente
  return NextResponse.next();
}

// Configuración para que el middleware no gaste recursos en imágenes o APIs
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\..*).*)',
  ],
};