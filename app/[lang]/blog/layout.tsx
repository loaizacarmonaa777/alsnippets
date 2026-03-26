import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
   METADATA SEO DINÁMICA
   ===================================================== */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  const dict = await getDictionary(lang);
  const t = dict.blog.meta;
  const baseUrl = 'https://www.alsnippets.com';

  return {
    // ✅ Regla de Títulos: Solo el nombre de la página
    title: "Blog", 
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.og_title,
      description: t.og_description,
      // ✅ Regla de Enlaces: Inyección de /${lang}/
      url: `${baseUrl}/${lang}/blog`,
      siteName: 'Alsnippets',
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
      images: [{
        // ✅ Actualizado a tu nueva ruta de imágenes OG
        url: '/images/og/openGraph-blog.png',
        width: 1200,
        height: 630,
        alt: t.og_alt,
      }],
    },
    alternates: {
      // ✅ Regla de Enlaces: Inyección de /${lang}/
      canonical: `${baseUrl}/${lang}/blog`,
    },
    twitter: {
      card: 'summary_large_image',
      title: t.og_title,
      description: t.og_description,
      images: ['/images/og/openGraph-blog.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      },
    }
  }
}

/* =====================================================
   COMPONENTE LAYOUT
   ===================================================== */
export default async function BlogLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  const dict = await getDictionary(lang);
  const s = dict.blog.schema;
  const baseUrl = 'https://www.alsnippets.com';

  /* =====================================================
     SCHEMA JSON-LD DINÁMICO
     ===================================================== */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: s.name,
    description: s.description,
    // ✅ Regla de Enlaces: Inyección de /${lang}/
    url: `${baseUrl}/${lang}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'Alsnippets',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/brand/logo-fondo-dark-menu.svg`
      }
    },
    author: {
      '@type': 'Person',
      name: 'Adrián Loaiza',
      // ✅ Regla de Enlaces: Inyección de /${lang}/
      url: `${baseUrl}/${lang}/sobre-mi`
    }
  }

  return (
    <>
      {/* Inyección de datos estructurados para Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Estructura visual del layout */}
      <section className="relative w-full">
        {children}
      </section>
    </>
  )
}