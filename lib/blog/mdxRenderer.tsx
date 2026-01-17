/* =====================================================
   MDX Renderer — Server Component
   Renderiza contenido MDX real
   ===================================================== */

import { MDXRemote } from "next-mdx-remote/rsc";

/* =====================================================
   Componentes MDX personalizados
   (luego los ampliamos)
   ===================================================== */
const components = {
  h2: (props: any) => (
    <h2 className="text-2xl font-semibold mt-10 mb-4" {...props} />
  ),
  p: (props: any) => (
    <p className="leading-relaxed opacity-90 mb-4" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
  ),
};

/* =====================================================
   Renderer
   ===================================================== */
export function MDXContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
    />
  );
}
