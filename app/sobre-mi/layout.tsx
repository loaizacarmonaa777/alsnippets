import { Metadata } from "next";

// Metadata específico para la página de Sobre mí
export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Conoce a Adrian Loaiza Carmona, creador de Alsnippets y desarrollador freelance especializado en WordPress, SEO y optimización web.",
};

export default function SobreMiLayout({
  children,
}: {    children: React.ReactNode;  }) {
  return <>{children}</>;
}