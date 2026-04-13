import { getAllPosts } from '@/lib/blog/getPosts'
import { getCategories } from '@/lib/blog/getCategories'
import BlogFilter from '@/components/blog/BlogFilter'
import PageHero from '@/components/hero/PageHero'
import { getDictionary } from '@/i18n/get-dictionary'
import { Metadata } from 'next'
import { Suspense } from 'react'

/* =====================================================
    METADATA DINÁMICA (SEO & SOCIAL) - OPTIMIZADA
   ===================================================== */
export async function generateMetadata ({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en'
  const dict = await getDictionary(lang)
  const t = dict.blog.meta
  const baseUrl = 'https://www.alsnippets.com'
  const ogImage = `${baseUrl}/images/og/openGraph-blog.png` // ✅ URL ABSOLUTA

  return {
    title: t.title || 'Blog',
    description: t.description,
    keywords: t.keywords,
    alternates: {
      canonical: `${baseUrl}/${lang}/blog`,
      languages: {
        'es-CO': `${baseUrl}/es/blog`,
        'en-US': `${baseUrl}/en/blog`
      }
    },
    openGraph: {
      title: t.og_title,
      description: t.og_description,
      url: `${baseUrl}/${lang}/blog`,
      siteName: 'Alsnippets',
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: t.og_alt || 'Blog Alsnippets'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t.og_title,
      description: t.og_description,
      images: [ogImage]
    }
  }
}

export default async function BlogPage ({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  // 👇 1. OBTENEMOS EL LANG CRUDO
  const { lang: rawLang } = await params

  // 👇 2. NORMALIZAMOS (eliminamos cualquier / del inicio)
  const lang = rawLang.replace(/^\//, '')

  // 👇 3. AHORA USAMOS EL LANG NORMALIZADO
  const dict = await getDictionary(lang as 'es' | 'en')
  const t = dict.blog.index

  const posts = getAllPosts(lang)
  const categories = getCategories(lang)

  return (
    <>
      <PageHero
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image='/images/hero/hero-blog.webp'
      />
      <main className='w-full'>
        <section className='w-full max-w-[1200px] mx-auto px-5 py-16 md:py-24 space-y-12'>
          <Suspense
            fallback={
              <div className='h-96 animate-pulse bg-gray-100 rounded-3xl' />
            }
          >
            <BlogFilter posts={posts} categories={categories} lang={lang} />
          </Suspense>
        </section>
      </main>
    </>
  )
}
