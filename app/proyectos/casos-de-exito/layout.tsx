import { Metadata } from "next";

// Metadata específico para la página de Casos de Éxito
export const metadata: Metadata = {
  title: "Casos de éxito",
  description:
    "Sitios web y proyectos reales en los que he trabajado, optimizado o acompañado técnicamente.",
};

export default function CasosDeExitoLayout({
  children,
}: {    children: React.ReactNode;  }) {
  return <>{children}</>;
}