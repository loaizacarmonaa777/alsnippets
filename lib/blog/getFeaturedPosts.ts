import { getAllPosts } from "./getPosts";

/* =====================================================
   Obtener posts destacados (featured)
   ===================================================== */
export function getFeaturedPosts(limit = 3) {
  return getAllPosts()
    .filter((post) => post.featured)
    .slice(0, limit);
}
