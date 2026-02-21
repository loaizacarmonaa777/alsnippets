import { Metadata } from "next";

// Metadata específico para esta página
export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos sobre WordPress, SEO, seguridad, rendimiento y tecnología aplicada.",
};

export default function BlogLayout({
  children,
}: { children: React.ReactNode }) {
  return <>{children}</>;
}