import { Metadata } from "next";

// Metadata específico para la página de Barber Short
export const metadata: Metadata = {
  title: "Barber Short",
  description:
    "Plataforma web para barberías, enfocada en reservas, gestión de servicios y pagos en línea.",
};

export default function BarberShortLayout({
  children,
}: {    children: React.ReactNode;  }) {
  return <>{children}</>;
}