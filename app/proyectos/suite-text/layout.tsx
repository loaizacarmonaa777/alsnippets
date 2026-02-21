import { Metadata } from "next";

// Metadata específico para la página de Suite Text
export const metadata: Metadata = {
  title: "Suite Text",
  description:
    "Un producto en desarrollo enfocado en optimizar, analizar y trabajar textos con una visión técnica, estratégica y orientada a resultados SEO.",
};

export default function SuiteTextLayout({
  children,
}: {    children: React.ReactNode;  }) {
  return <>{children}</>;
}