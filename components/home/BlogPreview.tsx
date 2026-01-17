import Link from "next/link";
import { getAllPosts } from "@/lib/blog/getPosts";

/* =====================================================
   BlogPreview — Home
   - Muestra posts FEATURED
   - Editorialmente controlado
   ===================================================== */
export default function BlogPreview() {
  const allPosts = getAllPosts();

  /* =====================================================
     1. Posts destacados (featured)
     ===================================================== */
  const featuredPosts = allPosts.filter(
    (post) => post.featured === true
  );

  /* =====================================================
     2. Fallback: si hay menos de 3 featured
     ===================================================== */
  const postsToShow =
    featuredPosts.length >= 3
      ? featuredPosts.slice(0, 3)
      : allPosts.slice(0, 3);

  return (
    <section className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-center max-w-2xl mx-auto">
          Blog y recursos
        </h2>

        <p className="max-w-2xl opacity-80 text-center mx-auto text-sm">
          Comparto guías, soluciones y experiencias reales sobre WordPress,
          seguridad, optimización y desarrollo web.
        </p>
      </div>

      {/* Grid de posts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {postsToShow.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card space-y-3"
          >
            {/* Categoría visual */}
            <span className="text-xs uppercase opacity-60">
              {post.categoryName}
            </span>

            <h3 className="font-semibold text-lg">
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

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/blog"
          className="inline-block border px-6 py-3 rounded-lg"
        >
          Ver todos los artículos
        </Link>
      </div>
    </section>
  );
}
