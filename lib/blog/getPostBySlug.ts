/* =====================================================
   Obtener post individual desde MDX
   ===================================================== */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_PATH = path.join(process.cwd(), "content/blog");

export function getPostBySlug(slug: string) {
  const filePath = path.join(CONTENT_PATH, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error("Post no encontrado");
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    content,
    title: data.title,
    description: data.description,
    category: data.category,
    author: data.author,
    image: data.image,
  };
}
