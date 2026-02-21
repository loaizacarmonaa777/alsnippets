import { Metadata } from "next";

// Metadata específico para la página de precios
export const metadata: Metadata = {
  title: "Precios y forma de trabajo",
  description:
    "Cada proyecto es distinto. Por eso no trabajo con precios genéricos ni paquetes cerrados sin entender primero el contexto real.",
}

export default function PreciosLayout({
  children,
}: {    children: React.ReactNode;  }) {
  return <>{children}</>;
}