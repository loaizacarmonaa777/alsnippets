import { getAllPosts } from "./getPosts";

/* =====================================================
   Obtener posts destacados (featured) por idioma
   ===================================================== */
export function getFeaturedPosts(lang: string, limit = 3) {
  return getAllPosts()
    .filter((post) => {
      // 1. Debe estar marcado como destacado (featured: true)
      // 2. Debe coincidir con el idioma actual de la navegación
      return post.featured === true && post.lang === lang;
    })
    // 3. Ordenamos por fecha (más recientes primero) por si hay muchos destacados
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}