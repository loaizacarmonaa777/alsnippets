import { Metadata } from "next";

/* =========================================================================
   SEGURIDAD DE URL BASE
   -------------------------------------------------------------------------
   Esta lógica protege tu SEO. Si el entorno no define una URL (como en local),
   forzamos el uso de tu dominio de producción seguro (https).
   Esto evita que se indexen URLs de desarrollo o staging por error.
   ========================================================================= */
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL 
  ? process.env.NEXT_PUBLIC_SITE_URL 
  : "https://alsnippets.com";

export const metadata: Metadata = {
  // 1. TÍTULO Y DESCRIPCIÓN (Información Pública para Google)
  title: "Optimización y Rendimiento WordPress",
  description:
    "Servicio profesional de WPO. Optimizo la velocidad de carga, Core Web Vitals y estabilidad de tu WordPress para mejorar el SEO y la experiencia de usuario.",

  // 2. PALABRAS CLAVE (Keywords seguras, solo términos del servicio)
  keywords: [
    "optimización wordpress",
    "wpo wordpress",
    "acelerar web",
    "core web vitals",
    "velocidad de carga",
    "consultor wpo",
    "adrian loaiza",
    "alsnippets",
    "snippets",
  ],

  // 3. SEGURIDAD DE ENLACES (Canonical & Base)
  // metadataBase asegura que todos los enlaces sociales se generen 
  // con tu dominio https correcto, evitando inyecciones de URLs extrañas.
  metadataBase: new URL(baseUrl),
  
  alternates: {
    // La canonical le dice a Google: "Esta es la URL original", 
    // protegiéndote de contenido duplicado o copias maliciosas.
    canonical: "/servicios/optimizacion-rendimiento",
  },

  // 4. OPEN GRAPH (Configuración segura para Redes Sociales)
  openGraph: {
    title: "Optimización de Velocidad y Rendimiento | Alsnippets",
    description:
      "¿Tu web carga lenta? Auditoría y optimización técnica para que tu WordPress vuele. Mejora tu posicionamiento hoy mismo.",
    url: "/servicios/optimizacion-rendimiento",
    siteName: "Adrián Loaiza - alsnippets.com",
    locale: "es_ES",
    type: "website",
    images: [
      {
        // Ruta pública segura. No revela estructura interna del servidor.
        url: "/images/og/og-optimizacion.jpg", 
        width: 1200,
        height: 630,
        alt: "Optimización WPO WordPress",
      },
    ],
  },

  // 5. TWITTER CARD
  twitter: {
    card: "summary_large_image",
    title: "Optimización WPO WordPress | Alsnippets",
    description:
      "Acelera tu sitio web. Servicios de optimización de rendimiento y velocidad para WordPress.",
    images: ["/images/og/og-optimizacion.jpg"],
  },

  // 6. CONTROL DE ROBOTS
  // Aquí le decimos a los robots BUENOS (Google, Bing) que pueden leer esta página.
  // Los robots MALOS ignoran estas reglas, pero se bloquean a nivel de servidor (firewall),
  // no en este archivo. Este archivo es seguro.
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

export default function OptimizacionRendimientoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}