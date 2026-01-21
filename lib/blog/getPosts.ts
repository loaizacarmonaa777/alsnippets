/* =====================================================
   Blog — Lectura de posts MDX
   Cada archivo .mdx = un post
   ===================================================== */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

/* =====================================================
   Tipado del post
   ===================================================== */
export type BlogPost = {
  slug: string;
  title: string;
  description?: string;
  category: string;        // slug normalizado (seo, virus, etc.)
  categoryName: string;    // nombre visual (SEO, Virus, etc.)
  author?: string;
  date: string;            // OBLIGATORIO
  image?: string | null;
  featured?: boolean;
  content: string;
};

/* =====================================================
   Ruta absoluta al contenido del blog
   ===================================================== */
const BLOG_PATH = path.join(
  process.cwd(),
  "content",
  "blog"
);

/* =====================================================
   Obtener TODOS los posts
   ===================================================== */
export function getAllPosts(): BlogPost[] {
  const files = fs
    .readdirSync(BLOG_PATH)
    .filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(BLOG_PATH, file);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(fileContent);

    if (!data.date) {
      throw new Error(
        `El post "${slug}" no tiene la propiedad 'date' en el frontmatter`
      );
    }

    return {
      slug,
      title: data.title ?? "Sin título",
      description: data.description ?? "",
      category: (data.category ?? "general").toLowerCase(), // slug
      categoryName: data.category ?? "General",             // visual
      author: data.author ?? "",
      date: data.date,
      image: data.image ?? null,
      featured: data.featured === true,
      content,
    };
  });

  /* =====================================================
     Ordenar por fecha
     ===================================================== */
  return posts.sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  );
}

/* =====================================================
   Obtener un post por slug
   ===================================================== */
export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_PATH, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  if (!data.date) {
    throw new Error(
      `El post "${slug}" no tiene la propiedad 'date' en el frontmatter`
    );
  }

  return {
    slug,
    title: data.title ?? "Sin título",
    description: data.description ?? "",
    category: (data.category ?? "general").toLowerCase(),
    categoryName: data.category ?? "General",
    author: data.author ?? "",
    date: data.date,
    image: data.image ?? null,
    featured: data.featured === true,
    content,
  };

}
