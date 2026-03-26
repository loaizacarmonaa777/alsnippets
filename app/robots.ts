import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',              // 🚨 Rutas de backend (corrector, auditoria, etc)
        '/*/login',           // 🚨 Acceso administrativo en cualquier idioma
        '/*/dashboard/',      // 🚨 El panel de control de auditorías
        '/*/tarjetas/',       // 🚨 Generalmente son privadas/personales
        '/*/gracias',         // 🚨 Páginas de éxito (no queremos tráfico orgánico aquí)
        '/*?*',               // 🚨 Evita indexar parámetros de búsqueda o filtros
      ],
    },
    sitemap: 'https://www.alsnippets.com/sitemap.xml',
  }
}