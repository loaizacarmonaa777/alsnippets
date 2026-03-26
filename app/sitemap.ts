import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.alsnippets.com'
  const locales = ['es', 'en']
  
  // 1. Páginas Estáticas Principales
  const mainPages = [
    '', '/sobre-mi', '/precios', '/contacto', '/auditoria', 
    '/blog', '/proyectos/barber-short', '/proyectos/suite-text',
    '/proyectos/casos-de-exito', '/proyectos/mis-creaciones'
  ]

  const staticEntries = locales.flatMap((lang) =>
    mainPages.map((page) => ({
      url: `${baseUrl}/${lang}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  )

  // 2. Páginas Dinámicas del Blog (Escaneando tus archivos .mdx)
  const blogEntries = locales.flatMap((lang) => {
    const blogDir = path.join(process.cwd(), `content/blog/${lang}`)
    
    // Verificamos si la carpeta existe para evitar errores en el build
    if (!fs.existsSync(blogDir)) return []

    const files = fs.readdirSync(blogDir)
    
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => {
        const slug = file.replace('.mdx', '')
        return {
          url: `${baseUrl}/${lang}/blog/${slug}`,
          lastModified: new Date(), // Lo ideal sería leer la fecha del archivo, pero esto funciona
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        }
      })
  })

  return [...staticEntries, ...blogEntries]
}