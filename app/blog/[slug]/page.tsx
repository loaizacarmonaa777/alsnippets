import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from "next"; // <-- 1. Importa el tipo Metadata
import { getPostBySlug, getAllPosts } from '@/lib/blog/getPosts'
import { getCategories } from '@/lib/blog/getCategories'
import { MDXContent } from '@/lib/blog/mdxRenderer'
import PostCTA from '@/components/blog/PostCTA'
import PostHero from '@/components/blog/PostHero'
import { ArrowLeft } from 'lucide-react'

/* =====================================================
   METADATOS DINÁMICOS PARA SEO (La pestaña del navegador)
   ===================================================== */
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Artículo no encontrado | Alsnippets",
    };
  }

  return {
    title: `${post.title} | Alsnippets`, // Así se verá en la pestaña
    description: post.description,
  };
}

/* =====================================================
   Página Post Individual con Sidebar
   ===================================================== */
   
export default function BlogPostPage ({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const allPosts = getAllPosts()
  const categories = getCategories()

  let relatedPosts = allPosts.filter(
    p => p.category === post.category && p.slug !== post.slug
  )
  if (relatedPosts.length === 0) {
    relatedPosts = allPosts.filter(p => p.slug !== post.slug).slice(0, 3)
  } else {
    relatedPosts = relatedPosts.slice(0, 3)
  }

  const heroImage =
    post.image || post.coverImage || '/images/hero/hero-blog.webp'

  return (
    // PUNTO 1: Cambié pt-32 por pt-24 para reducir el espacio en blanco gigante arriba
    <main className='w-full flex flex-col items-center pt-24 pb-24'>
      <div className='w-full max-w-[1200px] mx-auto px-5 mb-8'>
        <Link
          href='/blog'
          className='inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors group'
        >
          <ArrowLeft className='w-4 h-4 transition-transform group-hover:-translate-x-1' />
          Volver al índice del blog
        </Link>
      </div>

      <div className='w-full max-w-[1200px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start'>
        <div className='lg:col-span-8 w-full space-y-12'>
          <PostHero
            title={post.title}
            description={post.description}
            category={post.categoryName || post.category}
            author={post.author}
            date={post.date}
            image={heroImage}
          />

          <article className="
            prose prose-lg md:prose-xl max-w-none w-full text-left
            prose-slate dark:prose-invert 
            
            /* =======================================================
               FORZAR ALINEACIÓN A LA IZQUIERDA
               ======================================================= */
            [&_h1]:text-left [&_h2]:text-left [&_h3]:text-left [&_h4]:text-left
            [&_h1]:text-[var(--text-primary)] [&_h2]:text-[var(--text-primary)] [&_h3]:text-[var(--text-primary)]
            [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold
            [&_h1]:mt-12 [&_h2]:mt-10 [&_h3]:mt-8
            [&_h1]:mb-6 [&_h2]:mb-4 [&_h3]:mb-4
            
            /* Textos base */
            prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed
            
            /* =======================================================
               ENLACES (Normal, Hover y Visitado)
               ======================================================= */
            prose-a:text-[var(--brand-primary)] prose-a:font-bold prose-a:no-underline 
            hover:prose-a:text-[var(--text-yellow2)] hover:prose-a:underline hover:prose-a:decoration-[var(--brand-primary)] hover:prose-a:underline-offset-4
            /* ESTADO VISITADO (Blindado con selector directo) */
            [&_a:visited]:text-[var(--text-yellow1)] dark:[&_a:visited]:text-[#a67c17]
            
            /* Imágenes y Citas */
            prose-img:rounded-3xl prose-img:shadow-lg prose-img:mx-auto
            prose-strong:text-[var(--text-primary)]
            prose-blockquote:border-l-[var(--brand-primary)] prose-blockquote:bg-[var(--bg-tertiary)]/50 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-2xl prose-blockquote:italic
          ">
            <MDXContent source={post.content} />
          </article>

          <div className='pt-12 mt-12 border-t border-[var(--border-subtle)]'>
            <PostCTA category={post.category} />
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className='lg:col-span-4 w-full space-y-10 lg:sticky lg:top-28 hidden lg:block'>
          <div className='bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl p-6 shadow-sm'>
            <h3 className='text-lg font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2'>
              <span className='w-2 h-6 bg-[var(--brand-primary)] rounded-full'></span>
              Lecturas recomendadas
            </h3>

            <div className='space-y-6'>
              {relatedPosts.map(related => {
                const img =
                  related.image ||
                  related.coverImage ||
                  '/images/hero/hero-blog.webp'
                return (
                  <Link
                    href={`/blog/${related.slug}`}
                    key={related.slug}
                    className='group flex gap-4 items-center'
                  >
                    <div className='relative w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-[var(--bg-tertiary)]'>
                      <Image
                        src={img}
                        alt={related.title}
                        fill
                        className='object-cover group-hover:scale-110 transition-transform duration-500'
                        sizes='96px'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <h4 className='text-sm font-bold text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--brand-primary)] transition-colors leading-tight'>
                        {related.title}
                      </h4>
                      <span className='text-xs text-[var(--text-muted)] mt-1'>
                        {related.date}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className='bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl p-6 shadow-sm'>
            <h3 className='text-lg font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2'>
              <span className='w-2 h-6 bg-[var(--text-primary)] rounded-full'></span>
              Explorar temas
            </h3>

            <div className='flex flex-wrap gap-2'>
              {categories.map(cat => (
                <Link
                  key={cat.slug}
                  href='/blog'
                  className='px-4 py-2 rounded-xl bg-[var(--bg-tertiary)] text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--brand-primary)] hover:text-[var(--bg-primary)] transition-colors'
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
