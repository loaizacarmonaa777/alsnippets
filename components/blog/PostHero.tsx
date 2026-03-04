import Image from "next/image";
import { Calendar, User } from "lucide-react";

type PostHeroProps = {
  title: string;
  description?: string;
  category: string;
  author?: string;
  date: string;  
  image?: string | null;
};

export default function PostHero({
  title,
  description,
  category,
  author,
  date,
  image,
}: PostHeroProps) {
  return (
    <header className="space-y-8 mb-12 text-left w-full">
      
      {/* =====================================================
          META Y TÍTULO
          ===================================================== */}
      <div className="space-y-4 max-w-4xl">
        <span className="inline-block px-4 py-1.5 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-xs font-bold rounded-full uppercase tracking-wider">
          {category}
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)] leading-tight !my-0 tracking-tight">
          {title}
        </h1>

        {description && (
          <p className="text-lg md:text-xl text-[var(--text-secondary)] opacity-90 leading-relaxed max-w-3xl">
            {description}
          </p>
        )}

        {/* Autor y Fecha en Dorado */}
        <div className="flex items-center gap-4 text-sm font-bold pt-2">
          {author && (
            <span className="flex items-center gap-1.5 text-[var(--brand-primary)] drop-shadow-sm">
              <User className="w-4 h-4" /> {author}
            </span>
          )}
          
          {/* El punto separador lo dejamos sutil para no recargar */}
          {author && <span className="w-1 h-1 rounded-full bg-[var(--border-subtle)]"></span>}
          
          <span className="flex items-center gap-1.5 text-[var(--brand-primary)] drop-shadow-sm">
            <Calendar className="w-4 h-4" /> {date}
          </span>
        </div>
      </div>

      {/* =====================================================
          IMAGEN DESTACADA
          ===================================================== */}
      {image && (
        <div className="relative w-full aspect-[21/9] md:aspect-[2/1] rounded-3xl overflow-hidden shadow-xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]">
          <Image 
            src={image} 
            alt={`Portada de ${title}`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      )}
    </header>
  );
}