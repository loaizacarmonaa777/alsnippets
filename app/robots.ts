import { MetadataRoute } from 'next'

/* =====================================================
    CONFIGURACIÓN DE ROBOTS.TS
   ===================================================== */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',               // 🚨 Rutas de backend
        '/*/login',            // 🚨 Acceso administrativo
        '/*/dashboard/',       // 🚨 Panel de control
        '/*/tarjetas/',        // 🚨 Páginas privadas/personales
        '/*/gracias',          // 🚨 Páginas de éxito
        '/*?*',                // 🚨 Evita indexar parámetros (Search Console Fix)
        '/cdn-cgi/',           // 💡 Bloqueo de Cloudflare (Email Protection Fix)
        '/_next/',             // 💡 Bloqueo de archivos internos de Next.js
      ],
    },
    sitemap: 'https://www.alsnippets.com/sitemap.xml',
  }
}