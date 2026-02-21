import { Metadata } from "next";

// Metadata específico para la página de SEO y GEO
export const metadata: Metadata = {
  title: "SEO y GEO",
  description:
    "El SEO ya no se trata de llenar páginas con palabras clave. Hoy se trata de estructura, contexto y claridad para que Google — y los modelos de lenguaje — entiendan tu sitio y lo consideren una fuente confiable.",
};

export default function SeoGeoLayout({
  children,
}: {    children: React.ReactNode;  }) {
  return <>{children}</>;
}