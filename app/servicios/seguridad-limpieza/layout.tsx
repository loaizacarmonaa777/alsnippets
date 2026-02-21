import { Metadata } from "next";

/* DEFINICIÓN DE LA URL BASE
  -------------------------------------------------------------------------
  Usamos 'process.env.NEXT_PUBLIC_SITE_URL' por si configuras variables 
  de entorno en Vercel para previews. 
  
  Si no existe (como suele pasar en el primer despliegue), usará 
  automáticamente "https://alsnippets.com" para evitar errores.
*/
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alsnippets.com";

export const metadata: Metadata = {
  // 1. TÍTULO Y DESCRIPCIÓN
  title: "Seguridad y Limpieza WordPress",
  description:
    "Servicios profesionales de seguridad y limpieza de WordPress. Eliminación de malware, protección contra hackeos y auditorías de seguridad técnica.",

  // 2. PALABRAS CLAVE
  keywords: [
    "seguridad wordpress",
    "limpieza malware",
    "sitio hackeado wordpress",
    "protección web",
    "firewall wordpress",
    "adrian loaiza",
    "alsnippets",
  ],

  // 3. URL CANÓNICA Y ALTERNATIVAS
  // Esto ayuda a Google a saber cuál es la URL original
  metadataBase: new URL(baseUrl), // Importante para resolver rutas relativas de imágenes
  alternates: {
    canonical: "/servicios/seguridad-limpieza",
  },

  // 4. OPEN GRAPH (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    title: "Seguridad y Limpieza WordPress | Adrián Loaiza",
    description:
      "Recupero y protejo tu sitio web. Eliminación de malware y blindaje de seguridad para WordPress.",
    url: "/servicios/seguridad-limpieza",
    siteName: "Adrián Loaiza - alsnippets.com",
    locale: "es_ES",
    type: "website",
    images: [
      {
        // Asegúrate de que esta imagen exista en public/images/og/
        url: "/images/og/og-seguridad.jpg", 
        width: 1200,
        height: 630,
        alt: "Seguridad y Limpieza WordPress",
      },
    ],
  },

  // 5. TWITTER CARD
  twitter: {
    card: "summary_large_image",
    title: "Seguridad y Limpieza WordPress | Adrián Loaiza",
    description:
      "Servicios de seguridad y limpieza de WordPress. Eliminación de malware y protección profesional.",
    images: ["/images/og/og-seguridad.jpg"],
  },

  // 6. ROBOTS
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function SeguridadLimpiezaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}