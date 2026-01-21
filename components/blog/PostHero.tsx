/* =====================================================
   PostHero
   Hero reutilizable para posts del blog
   ===================================================== */

type PostHeroProps = {
  title: string;
  description?: string;
  category: string;
  author?: string;
  date: string;  //Obligatorio
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
    <header className="space-y-6">

      {/* Imagen destacada */}
      {image && (
        <div
          className="w-full h-[360px] rounded-2xl bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}

      {/* Meta */}
      <div className="space-y-2">
        <span className="text-sm uppercase opacity-60">
          {category}
        </span>

        <h1 className="text-4xl font-bold">
          {title}
        </h1>

        {description && (
          <p className="text-lg opacity-80 max-w-2xl">
            {description}
          </p>
        )}

        <span className="text-sm opacity-50">
          Por {author} · {date}
        </span>
      </div>
    </header>
  );
}
