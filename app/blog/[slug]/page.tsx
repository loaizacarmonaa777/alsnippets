import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog/getPosts";
import { MDXContent } from "@/lib/blog/mdxRenderer";
import PostCTA from "@/components/blog/PostCTA";
import PostHero from "@/components/blog/PostHero";

/* =====================================================
   Página Post Individual
   ===================================================== */
export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  if (!post) {
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
