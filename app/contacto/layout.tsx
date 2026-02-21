import { Metadata } from "next";

// Metadata específico para la página de contacto
export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbeme para hablar sobre tu proyecto, resolver tus dudas y dar el siguiente paso con confianza. Estoy aquí para ayudarte.",
};

export default function ContactoLayout({
  children,
}: {    children: React.ReactNode;  }) {
  return <>{children}</>;
}