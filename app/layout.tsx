import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/navigation/MainNav"; // Navegación global del sitio
import Footer from "@/components/layout/Footer"; // Footer global del sitio


// Tipografías base
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Metadata base (SEO global)
export const metadata: Metadata = {
  title: {
    template: "%s | Alsnippets",
    default: "Alsnippets | Soporte y Mantenimiento WordPress",
  },
  description:
    "Soporte técnico WordPress, seguridad, rendimiento y mantenimiento. Soluciones claras y auditoría profesional.",
};

// Layout raíz (se aplica a TODO el sitio)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`
         ${inter.className}
         antialiased
      `}
      >

        {/* Navegación global */}
        <MainNav />
        {children}
        {/* Contenido de cada página */}

        {/* Footer global */}
        <Footer />
      </body>
    </html>
  );
}
