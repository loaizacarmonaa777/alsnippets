import { getAllPosts } from "@/lib/blog/getPosts";
import { getCategories } from "@/lib/blog/getCategories";
import BlogFilter from "@/components/blog/BlogFilter";
import PageHero from "@/components/hero/PageHero";
import { Metadata } from "next";

// Metadata específico para esta página
export const metadata: Metadata = {
  title: "Blog | Alsnippets",
  description:
    "Artículos sobre WordPress, SEO, seguridad, rendimiento y tecnología aplicada.",
};

/* =====================================================
   Página — Blog
   ===================================================== */

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <>
      {/* =====================================================
         HERO — Blog
         ===================================================== */}
      <PageHero
        title="Blog"
        subtitle="WordPress, SEO, seguridad, rendimiento y tecnología aplicada."
        image="/images/hero/hero-blog.webp"
      />

      {/* =====================================================
         Contenido del blog
         ===================================================== */}
      <main className="max-w-[1200px] mx-auto px-5 py-16 space-y-24">
        {/* Filtro y listado */}
        <BlogFilter posts={posts} categories={categories} />
      </main>
    </>
  );
}
