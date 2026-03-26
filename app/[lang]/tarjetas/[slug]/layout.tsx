import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
    METADATA DINÁMICA — TARJETAS DIGITALES
   ===================================================== */

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string; lang: string }> 
}): Promise<Metadata> {
  const { slug, lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  
  // Forzado de tipo para evitar errores de tipado en diccionarios dinámicos
  const dict: any = await getDictionary(lang);
  const t = dict.tarjetas.meta;
  const baseUrl = 'https://www.alsnippets.com';

  const name = slug
    .replace(/([A-Z])/g, ' $1') // Separa camellos: adrianLoaiza -> adrian Loaiza
    .replace(/^./, (str) => str.toUpperCase()); // Primera en mayúscula

  return {
    // ✅ Regla de Títulos (SEO): Solo el nombre/título dinámico, el Root Layout gestiona el sufijo
    title: `${t.title_prefix} ${name}`,
    description: t.description.replace('{name}', name),
    
    alternates: {
      // ✅ Regla de Enlaces (I18n): Inyección automática de /${lang}/
      canonical: `${baseUrl}/${lang}/tarjetas/${slug}`,
    },

    // ✅ REGLA DE ORO: Las tarjetas individuales suelen ser privadas/específicas, 
    // pero permitimos seguimiento (follow) para autoridad.
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },

    openGraph: {
      title: `${t.og_title} ${name}`,
      description: t.og_description,
      url: `${baseUrl}/${lang}/tarjetas/${slug}`,
      siteName: 'Alsnippets',
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      type: 'profile',
      images: [{ 
        // ✅ Imagen actualizada: openGraph-tarjetas.png
        url: '/images/og/openGraph-tarjetas.png',
        width: 1200,
        height: 630,
        alt: `Tarjeta Digital de ${name} - Alsnippets`
      }],
    },

    twitter: {
      card: 'summary_large_image',
      title: `${t.title_prefix} ${name}`,
      description: t.og_description,
      images: ['/images/og/openGraph-tarjetas.png'],
      creator: '@alsnippets',
    }
  }
}

/* =====================================================
    COMPONENTE LAYOUT
   ===================================================== */
export default function TarjetaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="min-h-screen bg-[var(--bg-body)] relative w-full">
      {/* Preservación de lógica: Este contenedor asegura que las tarjetas 
          mantengan su estilo de fondo independiente del resto del sitio.
      */}
      {children}
    </section>
  )
}