import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog/getPosts";

export default function BlogPreview() {
  const allPosts = getAllPosts();

  // 1. Filtrar destacados
  const featuredPosts = allPosts.filter((post) => post.featured === true);

  // 2. Fallback
  const postsToShow =
    featuredPosts.length >= 3
      ? featuredPosts.slice(0, 3)
      : allPosts.slice(0, 3);

  return (
    <section className="relative w-full py-20 my-0 overflow-hidden">
      
      {/* =====================================================
          FONDO (Igual que antes, adaptativo)
          ===================================================== */}
      {/* Light Mode: Degradado */}
      <div 
        className="absolute inset-0 -z-20 opacity-100 dark:opacity-0"
        style={{
          backgroundImage:
            "linear-gradient(to left top, #f0f3ff, #faf2fc, #fff3f7, #fff5f4, #fff8f3, #fdf9f2, #fafbf2, #f6fcf4, #f0fcf7, #ebfafb, #ebf8fe, #eef5ff)",
        }}
      />
      {/* Dark Mode: Color sólido */}
      <div className="absolute inset-0 -z-10 opacity-0 dark:opacity-100 bg-[var(--bg-primary)]" />


      {/* =====================================================
          CONTENEDOR PRINCIPAL (Limitado a 1200px)
          Usa la clase 'section-contained' si la creaste en css, 
          sino usamos las clases directas equivalentes.
          ===================================================== */}
      <div className="w-full max-w-[1200px] mx-auto px-6">
        
        {/* Header de Sección */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2>
            Blog y recursos
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Guías, soluciones y experiencias reales sobre WordPress y desarrollo web.
          </p>
        </div>

        {/* Grid de Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {postsToShow.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              // Aquí limitamos el ancho máximo de la tarjeta para que no se vea gigante
              className="
                group flex flex-col w-full max-w-[380px] h-full
                bg-[var(--bg-card)] 
                border border-[var(--border-subtle)]
                rounded-2xl overflow-hidden
                shadow-sm hover:shadow-xl hover:-translate-y-1
                transition-all duration-300 ease-out
              "
            >
              {/* Imagen (Altura reducida a h-48 para que sea más compacta) */}
              <div className="relative w-full h-48 bg-[var(--bg-tertiary)] overflow-hidden">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-[var(--text-muted)]">
                    <span className="text-4xl opacity-50">📝</span>
                  </div>
                )}

                {/* Badge Categoría */}
                <div className="absolute top-3 left-3">
                  <span className="
                    px-2.5 py-0.5 
                    text-[10px] font-bold uppercase tracking-wider 
                    bg-[var(--bg-primary)]/95 backdrop-blur-md 
                    text-[var(--brand-primary)] 
                    rounded-full shadow-sm border border-[var(--border-subtle)]
                  ">
                    {post.categoryName || "Blog"}
                  </span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-5 flex flex-col flex-grow">
                
                {/* Meta */}
                <div className="flex items-center space-x-2 text-xs text-[var(--text-muted)] mb-2">
                  <span className="font-medium">{post.author || "Adrian Loaiza"}</span>
                  <span>•</span>
                  <span>{post.date ? new Date(post.date).toLocaleDateString() : "Reciente"}</span>
                </div>

                {/* Título */}
                <h3>
                  {post.title}
                </h3>

                {/* Extracto */}
                {post.description && (
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-4">
                    {post.description}
                  </p>
                )}

                {/* Footer Tarjeta */}
                <div className="mt-auto flex items-center text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wide">
                  <span className="group-hover:underline decoration-2 underline-offset-4">
                    Leer artículo
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Final */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="
              inline-flex items-center justify-center
              px-8 py-3 rounded-full
              text-sm font-bold
              bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-subtle)]
              hover:bg-[var(--bg-tertiary)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]
              shadow-sm hover:shadow-md
              transition-all duration-300
            "
          >
            Ver todos los artículos
          </Link>
        </div>
      </div>
    </section>
  );
}