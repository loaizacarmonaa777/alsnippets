/* =====================================================
   Blog — Lectura de posts MDX (Bilingüe)
   ===================================================== */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getCategoryLabel } from "./categoryLabels";

/* =====================================================
   Tipado del post
   ===================================================== */
export type BlogPost = {
  slug: string;
  lang: string;            // OBLIGATORIO: 'es' | 'en'
  title: string;
  description?: string;
  category: string;        // slug (seo, wordpress)
  categoryName: string;    // traducido (SEO, Optimization)
  author?: string;
  date: string;
  coverImage?: string | null;
  image?: string | null;   
  featured?: boolean;
  content: string;
};

const BLOG_PATH = path.join(process.cwd(), "content", "blog");

/* =====================================================
   Obtener TODOS los posts (con filtrado opcional de lang)
   ===================================================== */
export function getAllPosts(lang?: string): BlogPost[] {
  try {
    if (!fs.existsSync(BLOG_PATH)) return [];

    // 👇 1. SI SE ESPECIFICA UN IDIOMA, SOLO LEEMOS ESA CARPETA
    if (lang) {
      const langPath = path.join(BLOG_PATH, lang);
      if (!fs.existsSync(langPath)) return [];
      
      const files = fs
        .readdirSync(langPath)
        .filter((file) => file.endsWith(".mdx"));

      const posts = files.map((file) => {
        try {
          const slug = file.replace(/\.mdx$/, "");
          const filePath = path.join(langPath, file);
          const fileContent = fs.readFileSync(filePath, "utf8");
          const { data, content } = matter(fileContent);

          return {
            slug,
            lang: data.lang || lang,
            title: data.title ?? "Sin título",
            description: data.description ?? "",
            category: (data.category ?? "general").toLowerCase(),
            categoryName: getCategoryLabel(data.category ?? "general", data.lang || lang),
            author: data.author ?? "Adrián Loaiza",
            date: data.date || new Date().toISOString().split('T')[0],
            coverImage: data.coverImage ?? null,
            image: data.image ?? data.coverImage ?? null,
            featured: data.featured === true,
            content,
          };
        } catch (error) {
          console.error(`Error leyendo archivo ${file}:`, error);
          return null;
        }
      });

      return posts.filter(Boolean) as BlogPost[];
    }

    // 👇 2. SI NO HAY IDIOMA, LEEMOS TODAS LAS CARPETAS (es, en, etc.)
    const languages = fs.readdirSync(BLOG_PATH).filter((dir) => {
      const dirPath = path.join(BLOG_PATH, dir);
      return fs.statSync(dirPath).isDirectory();
    });

    let allPosts: BlogPost[] = [];

    for (const langCode of languages) {
      const langPath = path.join(BLOG_PATH, langCode);
      const files = fs
        .readdirSync(langPath)
        .filter((file) => file.endsWith(".mdx"));

      const langPosts = files.map((file) => {
        try {
          const slug = file.replace(/\.mdx$/, "");
          const filePath = path.join(langPath, file);
          const fileContent = fs.readFileSync(filePath, "utf8");
          const { data, content } = matter(fileContent);

          return {
            slug,
            lang: data.lang || langCode,
            title: data.title ?? "Sin título",
            description: data.description ?? "",
            category: (data.category ?? "general").toLowerCase(),
            categoryName: getCategoryLabel(data.category ?? "general", data.lang || langCode),
            author: data.author ?? "Adrián Loaiza",
            date: data.date || new Date().toISOString().split('T')[0],
            coverImage: data.coverImage ?? null,
            image: data.image ?? data.coverImage ?? null,
            featured: data.featured === true,
            content,
          };
        } catch (error) {
          console.error(`Error leyendo archivo ${file}:`, error);
          return null;
        }
      });

      allPosts = [...allPosts, ...langPosts.filter(Boolean) as BlogPost[]];
    }

    return allPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error en getAllPosts:", error);
    return [];
  }
}

/* =====================================================
   Obtener un post por slug (con soporte de idioma)
   ===================================================== */
export function getPostBySlug(slug: string, lang?: string): BlogPost | null {
  try {
    // 👇 3. BUSCAR EN LA CARPETA DEL IDIOMA CORRESPONDIENTE
    const langCode = lang || "es";
    const filePath = path.join(BLOG_PATH, langCode, `${slug}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      lang: data.lang || langCode,
      title: data.title ?? "Sin título",
      description: data.description ?? "",
      category: (data.category ?? "general").toLowerCase(),
      categoryName: getCategoryLabel(data.category ?? "general", data.lang || langCode),
      author: data.author ?? "Adrián Loaiza",
      date: data.date || new Date().toISOString().split('T')[0],
      coverImage: data.coverImage ?? null,
      image: data.image ?? data.coverImage ?? null,
      featured: data.featured === true,
      content,
    };
  } catch (error) {
    console.error(`Error en getPostBySlug para ${slug}:`, error);
    return null;
  }
}