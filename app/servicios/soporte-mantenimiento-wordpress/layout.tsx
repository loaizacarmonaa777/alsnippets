import { Metadata } from "next";

// Metadata específico para el layout de Soporte y Mantenimiento WordPress
export const metadata: Metadata = {
  title: "Soporte y Mantenimiento WordPress",
  description:
    "Mantenimiento técnico, actualizaciones, seguridad y optimización de tu sitio WordPress. Soluciones profesionales para mantener tu web funcionando correctamente.",
};

export default function SoporteMantenimientoWordPressLayout({
  children,
}: {    children: React.ReactNode;  }) {
  return <>{children}</>;
}