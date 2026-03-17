'use client'

import { useState, useRef } from 'react'
import type { BlogPost } from '@/lib/blog/getPosts'
import BlogCard from './BlogCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function BlogFilter ({
  posts,
  categories,
  lang 
}: {
  posts: BlogPost[]
  categories: { slug: string; name: string }[]
  lang: string
}) {
  
  // 👇 1. NORMALIZAMOS EL LANG
  const normalizedLang = lang.replace(/^\//, '');
  
  const [activeCategory, setActiveCategory] = useState('todos')
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // 👇 2. USAMOS EL LANG NORMALIZADO PARA TRADUCCIONES
  const t = {
    es: { all: 'Todos', ariaLeft: 'Deslizar izquierda', ariaRight: 'Deslizar derecha' },
    en: { all: 'All', ariaLeft: 'Scroll left', ariaRight: 'Scroll right' }
  }[normalizedLang as 'es' | 'en'] || { all: 'Todos', ariaLeft: 'Deslizar izquierda', ariaRight: 'Deslizar derecha' };

  const allCategories = [
    { slug: 'todos', name: t.all }, 
    ...categories
  ]

  const visibleCategories =
    activeCategory === 'todos'
      ? categories
      : categories.filter(cat => cat.slug === activeCategory)

  const countByCategory = (slug: string) => {
    if (slug === 'todos') return posts.length
    return posts.filter(post => post.category === slug).length
  }

  const scrollLeft = (slug: string) => {
    scrollRefs.current[slug]?.scrollBy({ left: -350, behavior: 'smooth' })
  }

  const scrollRight = (slug: string) => {
    scrollRefs.current[slug]?.scrollBy({ left: 350, behavior: 'smooth' })
  }

  return (
    <>
      <section className='flex flex-wrap justify-center gap-3'>
        {allCategories.map(cat => {
          const total = countByCategory(cat.slug)
          return (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-5 py-2.5 rounded-full border text-sm font-semibold transition-all duration-300 flex items-center gap-2 hover:shadow-[var(--shadow-2)] ${
                activeCategory === cat.slug
                  ? 'bg-[var(--bg-brand)] text-[var(--text-inverse)] shadow-md scale-105 border-transparent'
                  : 'bg-[var(--bg-1)] text-[var(--text-1)] border-[var(--border-1)] hover:border-[var(--border-brand)]'
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold transition-colors ${
                  activeCategory === cat.slug
                    ? 'bg-white text-black shadow-sm'
                    : 'bg-[var(--bg-3)] text-[var(--text-2)]'
                }`}
              >
                {total}
              </span>
            </button>
          )
        })}
      </section>

      <section className='space-y-24 mt-16'>
        {visibleCategories.map(category => {
          const postsByCategory = posts.filter(
            post => post.category === category.slug
          )

          if (postsByCategory.length === 0) return null
          const activarScroll = postsByCategory.length > 3

          return (
            <section key={category.slug} className='space-y-6'>
              <div className='flex justify-between items-end border-b border-[var(--border-brand)] pb-4'>
                <h2 className='text-3xl font-bold tracking-tight text-[var(--text-1)] !my-0'>
                  {category.name}
                </h2>

                {activarScroll && (
                  <div className='flex gap-2'>
                    <button
                      onClick={() => scrollLeft(category.slug)}
                      className='group w-10 h-10 border border-transparent bg-[var(--bg-brand)] rounded-full flex items-center justify-center hover:bg-[var(--bg-inverse)] hover:border-[var(--border-brand)] transition-all duration-300 shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-brand-glow)]'
                      aria-label={t.ariaLeft}
                    >
                      <ChevronLeft className='w-5 h-5 text-[var(--text-inverse)] group-hover:text-[var(--text-brand)] transition-colors' />
                    </button>

                    <button
                      onClick={() => scrollRight(category.slug)}
                      className='group w-10 h-10 border border-transparent bg-[var(--bg-brand)] rounded-full flex items-center justify-center hover:bg-[var(--bg-inverse)] hover:border-[var(--border-brand)] transition-all duration-300 shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-brand-glow)]'
                      aria-label={t.ariaRight}
                    >
                      <ChevronRight className='w-5 h-5 text-[var(--text-inverse)] group-hover:text-[var(--text-brand)] transition-colors' />
                    </button>
                  </div>
                )}
              </div>

              <div className='relative -mx-5 px-5 py-4'>
                <div
                  ref={el => { scrollRefs.current[category.slug] = el }}
                  className={`flex gap-6 pb-4 ${
                    activarScroll
                      ? 'overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar'
                      : 'flex-wrap'
                  }`}
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {postsByCategory.map(post => (
                    <div
                      key={post.slug}
                      className={`snap-start shrink-0 ${
                        activarScroll
                          ? 'w-[85vw] sm:w-[350px]'
                          : 'w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]'
                      }`}
                    >
                      {/* 👇 3. PASAMOS EL LANG NORMALIZADO A BLOGCARD */}
                      <BlogCard post={post} lang={normalizedLang} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )
        })}
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `.hide-scrollbar::-webkit-scrollbar { display: none; }`
        }}
      />
    </>
  )
}