import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

/* =====================================================
    CONFIGURACIÓN DE SITEMAP.TS - TAREA 4 (FINAL)
   ===================================================== */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.alsnippets.com'
  const locales = ['es', 'en']
  
  // 1. Páginas Estáticas Principales
  const mainPages = [
    '', '/sobre-mi', '/precios', '/contacto', '/auditoria', 
    '/blog', '/proyectos/barber-short', '/proyectos/suite-text',
    '/proyectos/casos-de-exito', '/proyectos/mis-creaciones'
  ]

  // Mapeo de entradas estáticas con soporte de idiomas cruzados (Hreflang en Sitemap)
  const staticEntries = locales.flatMap((lang) =>
    mainPages.map((page) => ({
      url: `${baseUrl}/${lang}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1 : 0.8,
      // 💡 Optimización SEO: Indica a Google las versiones alternativas directamente
      languages: {
        es: `${baseUrl}/es${page}`,
        en: `${baseUrl}/en${page}`,
      },
    }))
  )

  // 2. Páginas Dinámicas del Blog (Escaneando archivos .mdx)
  const blogEntries = locales.flatMap((lang) => {
    const blogDir = path.join(process.cwd(), `content/blog/${lang}`)
    
    if (!fs.existsSync(blogDir)) return []

    const files = fs.readdirSync(blogDir)
    
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => {
        const slug = file.replace('.mdx', '')
        return {
          url: `${baseUrl}/${lang}/blog/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
          // 💡 Versiones alternativas para el blog
          languages: {
            es: `${baseUrl}/es/blog/${slug}`,
            en: `${baseUrl}/en/blog/${slug}`,
          },
        }
      })
  })

  return [...staticEntries, ...blogEntries]
}