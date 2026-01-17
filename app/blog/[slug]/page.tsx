import { notFound } from "next/navigation"; // Función para manejar rutas no encontradas
import { getPostBySlug } from "@/lib/blog/getPostBySlug"; // Función para obtener post por slug
import { MDXContent } from "@/lib/blog/mdxRenderer"; // Componente para renderizar contenido MDX
import PostCTA from "@/components/blog/PostCTA"; // Componente de llamada a la acción del post
import PostHero from "@/components/blog/PostHero"; // Componente imagen del hero de cada post



/* =====================================================
   Página Post Individual
   ===================================================== */
export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  let post;

  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <main className="max-w-[900px] mx-auto px-5 py-16 space-y-16">

      {/* HERO DEL POST */}
      <PostHero
        title={post.title}
        description={post.description}
        category={post.category}
        author={post.author}
        date={post.date}
        image={post.image}
      />

      {/* CONTENIDO */}
      <article className="prose max-w-none">
        <MDXContent source={post.content} />
      </article>
    </main>
  );
}