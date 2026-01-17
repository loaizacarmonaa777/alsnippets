import type { Metadata } from "next";

/* =====================================================
   METADATA SEO — Auditoría WordPress
   ===================================================== */
export const metadata: Metadata = {
  title: "Auditoría y Consultoría WordPress Profesional | Soporte Técnico Remoto",
  description:
    "Auditoría y consultoría WordPress profesional. Trabajo de forma remota con proyectos en Colombia, Latinoamérica, España, USA, Canadá y otros países. Seguridad, rendimiento y acompañamiento técnico real.",
  keywords: [
    "auditoría WordPress",
    "consultoría WordPress",
    "soporte WordPress remoto",
    "mantenimiento WordPress profesional",
    "seguridad WordPress",
    "optimización WordPress",
  ],
  openGraph: {
    title: "Auditoría y Consultoría WordPress Profesional",
    description:
      "Auditoría y consultoría WordPress remota para proyectos en distintos países.",
    url: "https://alsnippets.com/auditoria",
    siteName: "Alsnippets",
    type: "website",
  },
};

export default function AuditoriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
