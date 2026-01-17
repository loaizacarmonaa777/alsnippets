"use client";

import { useState, useRef } from "react";
import Link from "next/link";

/* =====================================================
   BlogFilter
   - Filtro por categorías
   - Scroll horizontal tipo Airbnb
   - Flechas funcionales
   ===================================================== */
export default function BlogFilter({
  posts,
  categories,
}: {
  posts: any[];
  categories: { slug: string; name: string }[];
}) {
  /* =====================================================
     Estado
     ===================================================== */
  const [activeCategory, setActiveCategory] = useState("todos");

  /* =====================================================
     Refs por categoría (CLAVE)
     ===================================================== */
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  /* =====================================================
     Categorías + Todos
     ===================================================== */
  const allCategories = [
    { slug: "todos", name: "Todos" },
    ...categories,
  ];

  /* =====================================================
     Categorías visibles según filtro
     ===================================================== */
  const visibleCategories =
    activeCategory === "todos"
      ? categories
      : categories.filter(
          (cat) => cat.slug === activeCategory
        );

  /* =====================================================
     Conteo por categoría
     ===================================================== */
  const countByCategory = (slug: string) => {
    if (slug === "todos") return posts.length;

    return posts.filter(
      (post) => post.category === slug
    ).length;
  };

  /* =====================================================
     Scroll handlers
     ===================================================== */
  const scrollLeft = (slug: string) => {
    scrollRefs.current[slug]?.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  };

  const scrollRight = (slug: string) => {
    scrollRefs.current[slug]?.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* =====================================================
          BOTONES DE CATEGORÍAS
          ===================================================== */}
      <section className="flex flex-wrap justify-center gap-4">
        {allCategories.map((cat) => {
          const total = countByCategory(cat.slug);

          return (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-5 py-2 rounded-full border text-sm transition flex items-center gap-2 ${
                activeCategory === cat.slug
                  ? "bg-black text-white"
                  : "hover:bg-black/5"
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-xs opacity-70">
                ({total})
              </span>
            </button>
          );
        })}
      </section>

      {/* =====================================================
          SECCIONES POR CATEGORÍA
          ===================================================== */}
      <section className="space-y-20 mt-12">
        {visibleCategories.map((category) => {
          const postsByCategory = posts.filter(
            (post) => post.category === category.slug
          );

          if (postsByCategory.length === 0) return null;

          const activarScroll = postsByCategory.length > 3;

          return (
            <section
              key={category.slug}
              className="space-y-6"
            >
              {/* TÍTULO + FLECHAS */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">
                  {category.name}
                </h2>

                {activarScroll && (
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        scrollLeft(category.slug)
                      }
                      className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-black/5"
                      aria-label="Scroll izquierda"
                    >
                      ‹
                    </button>

                    <button
                      onClick={() =>
                        scrollRight(category.slug)
                      }
                      className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-black/5"
                      aria-label="Scroll derecha"
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>

              {/* FILA HORIZONTAL */}
              <div
                ref={(el) =>
                  (scrollRefs.current[category.slug] =
                    el)
                }
                className={`flex gap-6 ${
                  activarScroll
                    ? "overflow-x-auto scroll-smooth"
                    : "flex-wrap"
                } no-scrollbar`}
              >
                {postsByCategory.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="min-w-[300px] max-w-[300px] border rounded-xl p-5 space-y-2 hover:shadow-md transition"
                  >
                    <h3 className="font-semibold">
                      {post.title}
                    </h3>

                    {post.description && (
                      <p className="text-sm opacity-70">
                        {post.description}
                      </p>
                    )}

                    <span className="text-xs opacity-50">
                      {post.author}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </section>
    </>
  );
}
