import { Metadata } from "next";

// Metadata específico para la página de Mis Creaciones
export const metadata: Metadata = {
  title: "Mis creaciones",
  description:
    "Proyectos desarrollados desde cero, plugins, themes y soluciones propias.",
};

export default function MisCreacionesLayout({
  children,
}: {    children: React.ReactNode;  }) {
  return <>{children}</>;
}