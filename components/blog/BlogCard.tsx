'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Share2 } from 'lucide-react';

// Importamos el tipo real directamente desde tu lógica del blog
import type { BlogPost } from "@/lib/blog/getPosts";

export default function BlogCard({ post }: { post: BlogPost }) {
  
  // Lógica para el botón de compartir estilo Airbnb
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita que al hacer clic en compartir se abra el post
    
    const url = `${window.location.origin}/blog/${post.slug}`;
    
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description || "Lee este artículo en Alsnippets", 
        url: url,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      alert('¡Enlace del artículo copiado al portapapeles!');
    }
  };

  // SOLUCIÓN ESTRICTA PARA TYPESCRIPT: 
  // Creamos una variable constante que siempre, siempre será un string.
  // Si coverImage no existe, busca image, y si tampoco, pone una por defecto.
  const imageSrc = post.coverImage || post.image || '/images/hero/hero-blog.webp';

  return (
    <Link 
      href={`/blog/${post.slug}`} 
      className="group flex flex-col gap-3 cursor-pointer outline-none"
    >
      {/* ==========================================
          CONTENEDOR DE LA IMAGEN (Estilo Airbnb)
          ========================================== */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[var(--bg-tertiary)] shadow-sm">
        <Image 
          src={imageSrc} 
          alt={`Imagen de ${post.title}`} 
          fill 
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent opacity-60"></div>

        {/* Píldora de Categoría (Usamos categoryName que definiste en el backend) */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 bg-white/90 dark:bg-[#0a0a0a]/80 backdrop-blur-md text-[var(--text-primary)] text-xs font-bold rounded-full shadow-sm uppercase tracking-wider">
            {post.categoryName}
          </span>
        </div>

        {/* Botón Compartir */}
        <button 
          onClick={handleShare}
          className="absolute top-4 right-4 z-10 p-2 bg-transparent hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors group/btn"
          aria-label="Compartir artículo"
        >
          <Share2 className="w-5 h-5 text-white drop-shadow-md group-hover/btn:scale-110 transition-transform" />
        </button>
      </div>

      {/* ==========================================
          INFORMACIÓN DE TEXTO
          ========================================== */}
      <div className="flex flex-col px-1">
        <h3 className="text-[1.1rem] font-bold text-[var(--text-primary)] leading-tight line-clamp-2 !my-0 group-hover:text-[var(--brand-primary)] transition-colors">
          {post.title}
        </h3>
        
        {/* Solo renderizamos la descripción si viene del backend */}
        {post.description && (
          <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mt-1 opacity-90">
            {post.description}
          </p>
        )}

        <div className="flex items-center gap-2 mt-3 text-xs text-[var(--text-muted)] font-medium">
          <span>{post.date}</span>
          
          {/* Solo mostramos el punto separador y el autor si el autor existe */}
          {post.author && (
            <>
              <span className="w-1 h-1 rounded-full bg-[var(--border-subtle)]"></span>
              <span>{post.author}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}