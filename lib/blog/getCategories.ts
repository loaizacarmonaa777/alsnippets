/* =====================================================
   Blog — Categorías dinámicas
   Ruta: /lib/blog/getCategories.ts
   Responsabilidad:
   - Derivar categorías desde los posts MDX
   - Separar slug (lógica) y name (UI)
   ===================================================== */

import { getAllPosts } from "./getPosts";

/* =====================================================
   Tipado de categoría
   ===================================================== */
export type BlogCategory = {
  slug: string;
  name: string;
};

/* =====================================================
   Obtener categorías únicas desde los posts
   ===================================================== */
export function getCategories(): BlogCategory[] {
  const posts = getAllPosts();

  const uniqueSlugs = Array.from(
    new Set(posts.map((post) => post.category))
  );

  return uniqueSlugs.map((slug) => ({
    slug, // minúscula, usada para lógica
    name: slug.charAt(0).toUpperCase() + slug.slice(1), // UI
  }));
}
