import { getAllPosts } from "@/lib/blog/getPosts";
import { getCategories } from "@/lib/blog/getCategories";
import BlogFilter from "@/components/blog/BlogFilter";
import PageHero from "@/components/hero/PageHero";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  // 👇 1. OBTENEMOS EL LANG CRUDO
  const { lang: rawLang } = await params;
  
  // 👇 2. NORMALIZAMOS (eliminamos cualquier / del inicio)
  const lang = rawLang.replace(/^\//, '');
  
  // 👇 3. AHORA USAMOS EL LANG NORMALIZADO
  const dict = await getDictionary(lang as 'es' | 'en');
  const t = dict.blog.index;
  
  const posts = getAllPosts(lang);
  const categories = getCategories(lang);

  return (
    <>
      <PageHero
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image="/images/hero/hero-blog.webp"
      />
      <main className="max-w-[1200px] mx-auto px-5 py-16 space-y-24">
        <BlogFilter 
          posts={posts} 
          categories={categories} 
          lang={lang}  // 👈 lang YA ESTÁ NORMALIZADO
        />
      </main>
    </>
  );
}