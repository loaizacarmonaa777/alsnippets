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
    <section
      /* CONFIGURACIÓN DE SECCIÓN
         - w-full: Ancho total
         - py-24: Mucho aire arriba y abajo
         - style: Aplicamos tu degradado específico
      */
      className="w-full py-24 px-4 md:px-0 dark:bg-neutral-900" // En dark mode el degradado claro podría molestar, aquí puedes ajustar si prefieres quitarlo con dark:bg-none
      style={{
        backgroundImage:
          "linear-gradient(to left top, #f0f3ff, #faf2fc, #fff3f7, #fff5f4, #fff8f3, #fdf9f2, #fafbf2, #f6fcf4, #f0fcf7, #ebfafb, #ebf8fe, #eef5ff)",
      }}
    >
      {/* CONTENEDOR CENTRADO (Limitado a 1200px) */}
      <div className="w-full max-w-[1200px] mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900">
            Blog y recursos
          </h2>

          <p className="opacity-80 text-sm md:text-base text-neutral-600">
            Comparto guías, soluciones y experiencias reales sobre WordPress,
            seguridad, optimización y desarrollo web.
          </p>
        </div>

        {/* Grid de posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postsToShow.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group card flex flex-col overflow-hidden h-full bg-white hover:shadow-xl transition-all duration-300 border border-neutral-100"
            >
              {/* Imagen */}
              <div className="relative w-full h-56 overflow-hidden bg-neutral-100">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-neutral-400 text-sm">
                    <span className="text-4xl opacity-20">📝</span>
                  </div>
                )}

                {/* Badge Categoría */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-sm rounded-full text-[var(--brand-primary)] shadow-sm">
                    {post.categoryName || "Blog"}
                  </span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <div className="flex items-center space-x-2 text-xs text-neutral-500">
                  <span>{post.author || "Adrian Loaiza"}</span>
                </div>

                <h3 className="!text-lg font-bold text-neutral-900 line-clamp-2 group-hover:text-[var(--brand-primary)] transition-colors">
                  {post.title}
                </h3>

                {post.description && (
                  <p className="text-sm text-neutral-600 line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>
                )}

                <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-[var(--brand-primary)]">
                  <span className="group-hover:underline">Leer artículo</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA - Ver todos */}
        <div className="pt-6 text-center">
          <Link
            href="/blog"
            className="button-home-light inline-flex bg-white/50 backdrop-blur-sm" // Agregué un fondo sutil al botón para que resalte sobre el gradiente
          >
            <span>Ver todos los artículos</span>
          </Link>
        </div>
      </div>
    </section>
  );
}