'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Share2 } from 'lucide-react';
import type { BlogPost } from "@/lib/blog/getPosts";

interface BlogCardProps {
  post: BlogPost;
  lang: string; 
}

export default function BlogCard({ post, lang }: BlogCardProps) {
  // 👇 1. NORMALIZAMOS EL LANG (por si acaso)
  const normalizedLang = lang.replace(/^\//, '');

  // 👇 2. USAMOS EL LANG NORMALIZADO EN TODO
  const t = {
    es: {
      shareText: "Lee este artículo en Alsnippets",
      copySuccess: "¡Enlace del artículo copiado al portapapeles!",
      ariaShare: "Compartir artículo"
    },
    en: {
      shareText: "Read this article on Alsnippets",
      copySuccess: "Article link copied to clipboard!",
      ariaShare: "Share article"
    }
  }[normalizedLang as 'es' | 'en'] || {
    shareText: "Lee este artículo en Alsnippets",
    copySuccess: "¡Enlace del artículo copiado al portapapeles!",
    ariaShare: "Compartir artículo"
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault(); 
    
    // 👇 URL CON LANG NORMALIZADO
    const url = `${window.location.origin}/${normalizedLang}/blog/${post.slug}`;
    
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description || t.shareText, 
        url: url,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      alert(t.copySuccess);
    }
  };

  const imageSrc = post.coverImage || post.image || '/images/hero/hero-blog.webp';

  return (
    // 👇 HREF CON LANG NORMALIZADO
    <Link 
      href={`/${normalizedLang}/blog/${post.slug}`} 
      className="group flex flex-col gap-3 cursor-pointer outline-none"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[var(--bg-3)] shadow-[var(--shadow-1)]">
        <Image 
          src={imageSrc} 
          alt={`Imagen de ${post.title}`} 
          fill 
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent opacity-60"></div>
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 bg-[var(--bg-1)]/90 backdrop-blur-md text-[var(--text-1)] text-xs font-bold rounded-full shadow-[var(--shadow-1)] uppercase tracking-wider">
            {post.categoryName}
          </span>
        </div>

        <button 
          onClick={handleShare}
          className="absolute top-4 right-4 z-10 p-2.5 bg-[var(--bg-brand)] hover:bg-[var(--bg-inverse)] border border-transparent hover:border-[var(--border-brand)] rounded-full transition-all duration-300 shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-brand-glow)] group/btn"
          aria-label={t.ariaShare}
        >
          <Share2 className="w-[18px] h-[18px] text-[var(--text-inverse)] group-hover/btn:text-[var(--text-brand)] group-hover/btn:-rotate-12 group-hover/btn:scale-110 transition-all duration-300" />
        </button>
      </div>

      <div className="flex flex-col px-1">
        <h3 className="text-[1.1rem] font-bold text-[var(--text-1)] leading-tight line-clamp-2 !my-0 group-hover:text-[var(--text-brand)] transition-colors">
          {post.title}
        </h3>
        
        {post.description && (
          <p className="text-sm text-[var(--text-2)] line-clamp-2 mt-1 opacity-90">
            {post.description}
          </p>
        )}

        <div className="flex items-center gap-2 mt-3 text-xs text-[var(--text-3)] font-medium">
          <span>{post.date}</span>
          
          {post.author && (
            <>
              <span className="w-1 h-1 rounded-full bg-[var(--border-1)]"></span>
              <span>{post.author}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}