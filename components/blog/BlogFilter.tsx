'use client'

import { useState, useRef } from 'react'
import type { BlogPost } from '@/lib/blog/getPosts'
import BlogCard from './BlogCard' // <-- Importamos la nueva tarjeta estilo Airbnb
import { ChevronLeft, ChevronRight } from 'lucide-react' // <-- Iconos elegantes para las flechas

/* =====================================================
   BlogFilter
   - Filtro por categorías
   - Scroll horizontal tipo Airbnb
   - Flechas funcionales
   ===================================================== */
export default function BlogFilter ({
  posts,
  categories
}: {
  posts: BlogPost[]
  categories: { slug: string; name: string }[]
}) {
  /* =====================================================
     Estado
     ===================================================== */
  const [activeCategory, setActiveCategory] = useState('todos')

  /* =====================================================
     Refs por categoría (CLAVE)
     ===================================================== */
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({})

  /* =====================================================
     Categorías + Todos
     ===================================================== */
  const allCategories = [{ slug: 'todos', name: 'Todos' }, ...categories]

  /* =====================================================
     Categorías visibles según filtro
     ===================================================== */
  const visibleCategories =
    activeCategory === 'todos'
      ? categories
      : categories.filter(cat => cat.slug === activeCategory)

  /* =====================================================
     Conteo por categoría
     ===================================================== */
  const countByCategory = (slug: string) => {
    if (slug === 'todos') return posts.length

    return posts.filter(post => post.category === slug).length
  }

  /* =====================================================
     Scroll handlers
     ===================================================== */
  // Ajusté la cantidad de scroll (350) para que coincida mejor con el nuevo ancho de las tarjetas
  const scrollLeft = (slug: string) => {
    scrollRefs.current[slug]?.scrollBy({
      left: -350,
      behavior: 'smooth'
    })
  }

  const scrollRight = (slug: string) => {
    scrollRefs.current[slug]?.scrollBy({
      left: 350,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {/* =====================================================
          BOTONES DE CATEGORÍAS (Filtro Superior)
          ===================================================== */}
      <section className='flex flex-wrap justify-center gap-3'>
        {allCategories.map(cat => {
          const total = countByCategory(cat.slug)

          // Diseño de "Píldoras" (Pills) con tus colores corporativos
          return (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-5 py-2.5 rounded-full border border-[var(--border-subtle)] text-sm font-semibold transition-all duration-300 flex items-center gap-2 hover:shadow-md ${
                activeCategory === cat.slug
                  ? // BOTÓN ACTIVO: Fondo dorado corporativo, texto oscuro, sombreado y ligero zoom
                    'bg-[var(--brand-primary)] text-[var(--bg-primary)] shadow-md scale-105 border-transparent'
                  : // BOTÓN INACTIVO: Fondo de tarjeta, texto normal, hover con borde dorado
                    'bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-[var(--brand-primary)]'
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  activeCategory === cat.slug
                    ? // Píldora del número (Activo): Fondo blanco translúcido
                      'bg-[var(--bg-primary)]/30 text-[var(--bg-primary)]'
                    : // Píldora del número (Inactivo): Gris sutil
                      'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                }`}
              >
                {total}
              </span>
            </button>
          )
        })}
      </section>

      {/* =====================================================
          SECCIONES POR CATEGORÍA (Carruseles)
          ===================================================== */}
      <section className='space-y-24 mt-16'>
        {visibleCategories.map(category => {
          const postsByCategory = posts.filter(
            post => post.category === category.slug
          )

          if (postsByCategory.length === 0) return null

          const activarScroll = postsByCategory.length > 3

          return (
            <section key={category.slug} className='space-y-6'>
              {/* TÍTULO + FLECHAS DE NAVEGACIÓN */}
              <div className='flex justify-between items-end border-b border-[var(--border-subtle)] pb-4'>
                <h2 className='text-3xl font-bold tracking-tight text-[var(--text-primary)] !my-0'>
                  {category.name}
                </h2>

                {activarScroll && (
                  <div className='flex gap-2'>
                    <button
                      onClick={() => scrollLeft(category.slug)}
                      className='w-10 h-10 border border-[var(--border-subtle)] bg-[var(--bg-card)] rounded-full flex items-center justify-center hover:bg-[var(--bg-tertiary)] hover:border-[var(--brand-primary)] transition-colors shadow-sm'
                      aria-label='Desplazar a la izquierda'
                    >
                      <ChevronLeft className='w-5 h-5 text-[var(--text-secondary)]' />
                    </button>

                    <button
                      onClick={() => scrollRight(category.slug)}
                      className='w-10 h-10 border border-[var(--border-subtle)] bg-[var(--bg-card)] rounded-full flex items-center justify-center hover:bg-[var(--bg-tertiary)] hover:border-[var(--brand-primary)] transition-colors shadow-sm'
                      aria-label='Desplazar a la derecha'
                    >
                      <ChevronRight className='w-5 h-5 text-[var(--text-secondary)]' />
                    </button>
                  </div>
                )}
              </div>

              {/* FILA HORIZONTAL (CARRUSEL) */}
              <div className='relative -mx-5 px-5 py-4'>
                <div
                  ref={el => {
                    scrollRefs.current[category.slug] = el
                  }}
                  className={`flex gap-6 pb-4 ${
                    activarScroll
                      ? 'overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar'
                      : 'flex-wrap'
                  }`}
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Oculta la barra de scroll nativa en Firefox/IE
                >
                  {postsByCategory.map(post => (
                    // Aquí llamamos al nuevo componente BlogCard
                    <div
                      key={post.slug}
                      className={`snap-start shrink-0 ${
                        activarScroll
                          ? 'w-[85vw] sm:w-[350px]'
                          : 'w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]'
                      }`}
                    >
                      <BlogCard post={post} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )
        })}
      </section>

      {/* CSS inyectado para ocultar la barra de scroll en Chrome/Safari */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `
        }}
      />
    </>
  )
}
