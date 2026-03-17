import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
// Cambiamos Contentlayer por nuestra implementación actual
import { getAllPosts } from '@/lib/blog/getPosts'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
   Interfaces de Blindaje (Evitan errores de TypeScript)
   ===================================================== */
interface BlogDict {
  title: string;
  subtitle: string;
  read_article?: string;
  view_all?: string;
}

/* =====================================================
   BlogPreview (PROTOCOLO ALSNIPPETS - CON GETPOSTS)
   ===================================================== */
export default async function BlogPreview({ lang }: { lang: string }) {
  // 1. Carga de Diccionario con Cast Seguro
  const fullDict = await getDictionary(lang as 'es' | 'en')
  const dict = (fullDict.home_blog as BlogDict)

  if (!dict) return null

  // 2. Obtener posts usando nuestra función existente (filtrados por idioma)
  const allPosts = getAllPosts(lang) // Esto ya devuelve posts del idioma correcto

  // Lógica de destacados: si hay 3 o más destacados, mostramos esos. Si no, los 3 más recientes.
  const featuredPosts = allPosts.filter((post) => post.featured === true)
  const postsToShow = featuredPosts.length >= 3 
    ? featuredPosts.slice(0, 3) 
    : allPosts.slice(0, 3)

  if (postsToShow.length === 0) return null

  return (
    <section className='relative w-full py-20 my-0 overflow-hidden'>
      {/* Fondos Visuales de Marca */}
      <div
        className='absolute inset-0 -z-20 opacity-100 dark:opacity-0'
        style={{ background: 'var(--gradient-hero)' }}
      />
      <div className='absolute inset-0 -z-10 opacity-0 dark:opacity-100 bg-[var(--bg-1)]' />

      <div className='w-full max-w-[1200px] mx-auto px-6'>
        {/* Header de Sección */}
        <div className='text-center max-w-2xl mx-auto mb-12'>
          <h2 className='text-[var(--text-1)] text-3xl md:text-4xl font-bold'>
            {dict.title}
          </h2>
          <p className='text-lg text-[var(--text-2)] mt-4 leading-relaxed'>
            {dict.subtitle}
          </p>
        </div>

        {/* Grid de Posts */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center'>
          {postsToShow.map((post) => (
            <Link
              key={post.slug}
              href={`/${lang}/blog/${post.slug}`} // Construimos la URL manualmente
              className='group flex flex-col w-full max-w-[380px] h-full bg-[var(--bg-1)] border border-[var(--border-1)] rounded-2xl overflow-hidden shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] hover:-translate-y-1 hover:border-[var(--border-brand)] transition-all duration-300 ease-out'
            >
              {/* Imagen del Post */}
              <div className='relative w-full h-48 bg-[var(--bg-3)] overflow-hidden'>
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className='object-cover transition-transform duration-700 ease-in-out group-hover:scale-105'
                    sizes='(max-width: 768px) 100vw, 33vw'
                  />
                ) : (
                  <div className='flex items-center justify-center h-full text-[var(--text-3)]'>
                    <span className='text-4xl opacity-50'>📝</span>
                  </div>
                )}

                {/* Tag de Categoría */}
                <div className='absolute top-3 left-3'>
                  <span className='px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[var(--bg-1)]/95 backdrop-blur-md text-[var(--text-brand)] rounded-full border border-[var(--border-1)]'>
                    {post.categoryName || post.category || 'SEO'}
                  </span>
                </div>
              </div>

              {/* Contenido del Post */}
              <div className='p-5 flex flex-col flex-grow'>
                <div className='flex items-center space-x-2 text-xs text-[var(--text-3)] mb-2'>
                  <span className='font-medium'>{post.author || 'Adrián Loaiza'}</span>
                  <span>•</span>
                  <span>
                    {new Date(post.date).toLocaleDateString(
                      lang === 'en' ? 'en-US' : 'es-ES',
                      { day: 'numeric', month: 'short', year: 'numeric' }
                    )}
                  </span>
                </div>

                <h3 className='text-xl font-bold text-[var(--text-1)] group-hover:text-[var(--text-brand)] transition-colors line-clamp-2'>
                  {post.title}
                </h3>

                <p className='text-sm text-[var(--text-2)] line-clamp-2 leading-relaxed mt-2 mb-4'>
                  {post.description}
                </p>

                <div className='mt-auto flex items-center text-xs font-bold text-[var(--text-brand)] uppercase tracking-wide'>
                  <span className='group-hover:underline decoration-2 underline-offset-4'>
                    {dict.read_article || (lang === 'en' ? 'Read article' : 'Leer artículo')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Botón Ver Todo */}
        <div className='mt-12 text-center'>
          <Link
            href={`/${lang}/blog`}
            target="_blank"
            className='inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-bold bg-[var(--bg-1)] text-[var(--text-1)] border border-[var(--border-1)] hover:bg-[var(--bg-2)] hover:border-[var(--border-brand)] hover:text-[var(--text-brand)] transition-all duration-300'
          >
            {dict.view_all || (lang === 'en' ? 'View all' : 'Ver todo')}
          </Link>
        </div>
      </div>
    </section>
  )
}