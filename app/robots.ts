import { MetadataRoute } from 'next'

/* =====================================================
    CONFIGURACIÓN DE ROBOTS.TS (SEO 100% VALIDADO)
   ===================================================== */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',             // 🚨 Rutas de backend
          '/*/login',          // 🚨 Acceso administrativo
          '/*/dashboard/',      // 🚨 Panel de control
          '/*/tarjetas/',       // 🚨 Páginas privadas/personales
          '/*/gracias',        // 🚨 Páginas de éxito
          '/*?*',              // 🚨 Evita indexar parámetros
          '/cdn-cgi/',         // 💡 Bloqueo de Cloudflare
          '/_next/',           // 💡 Bloqueo de archivos internos de Next.js
        ],
      },
      {
        userAgent: ['GPTBot', 'CCBot'], // Bloqueo de IAs de forma estándar
        disallow: '/',
      }
    ],
    sitemap: 'https://www.alsnippets.com/sitemap.xml',
  }
}