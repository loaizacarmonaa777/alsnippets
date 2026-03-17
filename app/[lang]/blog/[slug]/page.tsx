import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from "next"; 
import { getPostBySlug, getAllPosts } from '@/lib/blog/getPosts'
import { getCategories } from '@/lib/blog/getCategories'
import { MDXContent } from '@/lib/blog/mdxRenderer'
import PostCTA from '@/components/blog/PostCTA'
import PostHero from '@/components/blog/PostHero'
import { ArrowLeft } from 'lucide-react'
import { getDictionary } from '@/i18n/get-dictionary'

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { slug, lang } = await params;
  const post = getPostBySlug(slug, lang);
  const dict = await getDictionary(lang as 'es' | 'en');

  if (!post) {
    return {
      title: `${dict.blog.post.not_found_title} | Alsnippets`,
    };
  }

  return {
    title: `${post.title} | Alsnippets`,
    description: post.description,
  };
}

export default async function BlogPostPage ({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  // 👇 1. OBTENEMOS EL LANG CRUDO Y LO NORMALIZAMOS
  const { lang: rawLang, slug } = await params;
  const lang = rawLang.replace(/^\//, '');
  
  // 👇 2. OBTENEMOS EL DICCIONARIO Y EL POST
  const dict = await getDictionary(lang as 'es' | 'en');
  const t = dict.blog.post;
  
  // 👇 3. BUSCAMOS EL POST EN LA CARPETA CORRECTA USANDO EL LANG NORMALIZADO
  const post = getPostBySlug(slug, lang);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts(lang);
  const categories = getCategories(lang);

  let relatedPosts = allPosts.filter(
    p => p.category === post.category && p.slug !== post.slug
  );
  
  if (relatedPosts.length === 0) {
    relatedPosts = allPosts.filter(p => p.slug !== post.slug).slice(0, 3);
  } else {
    relatedPosts = relatedPosts.slice(0, 3);
  }

  const heroImage = post.image || post.coverImage || '/images/hero/hero-blog.webp';

  return (
    <main className='w-full flex flex-col items-center pt-24 pb-24 bg-[var(--bg-body)]'>
      {/* Botón Volver */}
      <div className='w-full max-w-[1200px] mx-auto px-5 mb-8'>
        <Link
          href={`/${lang}/blog`}
          className='inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-2)] hover:text-[var(--text-brand)] transition-colors group'
        >
          <ArrowLeft className='w-4 h-4 transition-transform group-hover:-translate-x-1' />
          {t.back_to_index}
        </Link>
      </div>

      <div className='w-full max-w-[1200px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start'>
        
        {/* COLUMNA PRINCIPAL (ARTÍCULO) */}
        <div className='lg:col-span-8 w-full space-y-12'>
          <PostHero
            title={post.title}
            description={post.description}
            category={post.categoryName || post.category}
            author={post.author}
            date={post.date}
            image={heroImage}
            lang={lang}
          />

          <article className="
            prose prose-lg md:prose-xl max-w-none w-full text-left
            prose-slate dark:prose-invert 
            [&_h1]:text-left [&_h2]:text-left [&_h3]:text-left [&_h4]:text-left
            [&_h1]:text-[var(--text-1)] [&_h2]:text-[var(--text-1)] [&_h3]:text-[var(--text-1)]
            [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold
            prose-p:text-[var(--text-2)] prose-p:leading-relaxed
            prose-a:text-[var(--text-brand)] prose-a:font-bold prose-a:no-underline 
            hover:prose-a:text-[var(--text-1)] hover:prose-a:underline hover:prose-a:decoration-[var(--text-brand)] hover:prose-a:underline-offset-4
            prose-img:rounded-3xl prose-img:shadow-[var(--shadow-2)] prose-img:mx-auto
            prose-strong:text-[var(--text-1)]
            prose-blockquote:border-l-[var(--text-brand)] prose-blockquote:bg-[var(--bg-3)]/50 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-2xl prose-blockquote:italic
            prose-blockquote:text-[var(--text-2)]
          ">
            <MDXContent source={post.content} />
          </article>

          {/* Separador y CTA final */}
          <div className='pt-12 mt-12 border-t border-[var(--border-1)]'>
            <PostCTA category={post.category} lang={lang} />
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className='lg:col-span-4 w-full space-y-10 lg:sticky lg:top-28 hidden lg:block'>
          
          {/* Widget: Recomendados */}
          <div className='bg-[var(--bg-1)] border border-[var(--border-1)] rounded-3xl p-6 shadow-[var(--shadow-1)]'>
            <h3 className='text-lg font-bold text-[var(--text-1)] mb-6 flex items-center gap-2'>
              <span className='w-2 h-6 bg-[var(--bg-brand)] rounded-full'></span>
              {t.sidebar.recommended_title}
            </h3>

            <div className='space-y-6'>
              {relatedPosts.map(related => {
                const img = related.image || related.coverImage || '/images/hero/hero-blog.webp'
                return (
                  <Link
                    href={`/${lang}/blog/${related.slug}`}
                    key={related.slug}
                    className='group flex gap-4 items-center'
                  >
                    <div className='relative w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-[var(--bg-3)]'>
                      <Image
                        src={img}
                        alt={related.title}
                        fill
                        className='object-cover group-hover:scale-110 transition-transform duration-500'
                        sizes='96px'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <h4 className='text-sm font-bold text-[var(--text-1)] line-clamp-2 group-hover:text-[var(--text-brand)] transition-colors leading-tight'>
                        {related.title}
                      </h4>
                      <span className='text-xs text-[var(--text-3)] mt-1'>
                        {related.date}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Widget: Temas */}
          <div className='bg-[var(--bg-1)] border border-[var(--border-1)] rounded-3xl p-6 shadow-[var(--shadow-1)]'>
            <h3 className='text-lg font-bold text-[var(--text-1)] mb-6 flex items-center gap-2'>
              <span className='w-2 h-6 bg-[var(--text-1)] rounded-full'></span>
              {t.sidebar.categories_title}
            </h3>

            <div className='flex flex-wrap gap-2'>
              {categories.map(cat => (
                <Link
                  key={cat.slug}
                  href={`/${lang}/blog?category=${cat.slug}`}
                  className='px-4 py-2 rounded-xl bg-[var(--bg-3)] text-sm font-semibold text-[var(--text-2)] hover:bg-[var(--bg-brand)] hover:text-[var(--text-inverse)] transition-all duration-300'
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