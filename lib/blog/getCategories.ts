/* =====================================================
   Blog — Categorías dinámicas (Localizadas)
   Ruta: /lib/blog/getCategories.ts
   ===================================================== */

import { getAllPosts } from "./getPosts";
import { getCategoryLabel } from "./categoryLabels";

/* =====================================================
   Tipado de categoría
   ===================================================== */
export type BlogCategory = {
  slug: string;
  name: string;
};

/* =====================================================
   Obtener categorías únicas filtradas por idioma
   ===================================================== */
export function getCategories(lang: string): BlogCategory[] {
  // 1. Obtenemos todos los posts
  const allPosts = getAllPosts();

  // 2. Filtramos los posts para obtener solo las categorías que existen
  // en el idioma actual (asumiendo que tus posts tienen el campo post.lang)
  const postsInLang = allPosts.filter((post) => post.lang === lang);

  // 3. Extraemos los slugs únicos
  const uniqueSlugs = Array.from(
    new Set(postsInLang.map((post) => post.category.toLowerCase()))
  );

  // 4. Mapeamos al objeto BlogCategory usando nuestras traducciones
  return uniqueSlugs.map((slug) => ({
    slug, 
    // Usamos el helper bilingüe que creamos antes
    name: getCategoryLabel(slug, lang),
  }));
}