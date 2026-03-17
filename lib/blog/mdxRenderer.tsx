/* =====================================================
   MDX Renderer — Server Component
   Renderiza contenido MDX real con estética corporativa
   ===================================================== */

import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

/* =====================================================
   Componentes MDX personalizados
   ===================================================== */
const components = {
  h2: (props: any) => (
    <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-[var(--text-1)] border-b border-[var(--border-1)] pb-2" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-xl font-bold mt-8 mb-4 text-[var(--text-1)]" {...props} />
  ),
  p: (props: any) => (
    <p className="leading-relaxed text-[var(--text-2)] mb-6 text-base md:text-lg" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc pl-6 mb-6 space-y-3 text-[var(--text-2)]" {...props} />
  ),
  li: (props: any) => (
    <li className="pl-1" {...props} />
  ),
  // Enlaces estilizados dentro del contenido
  a: ({ href, children, ...props }: any) => {
    const isInternal = href?.startsWith("/");
    if (isInternal) {
      return (
        <Link href={href} className="text-[var(--text-brand)] font-bold hover:underline underline-offset-4 decoration-2" {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--text-brand)] font-bold hover:underline underline-offset-4 decoration-2" {...props}>
        {children}
      </a>
    );
  },
  // Bloques de código sutiles
  code: (props: any) => (
    <code className="bg-[var(--bg-3)] px-1.5 py-0.5 rounded text-[var(--text-brand)] font-mono text-sm" {...props} />
  ),
  hr: () => <hr className="my-12 border-[var(--border-1)]" />,
};

/* =====================================================
   Renderer
   ===================================================== */
export function MDXContent({ source }: { source: string }) {
  return (
    <article className="prose prose-invert max-w-none">
      <MDXRemote
        source={source}
        components={components}
      />
    </article>
  );
}