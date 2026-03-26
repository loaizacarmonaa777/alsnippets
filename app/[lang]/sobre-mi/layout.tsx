import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
    KEYWORDS GLOBALES
   ===================================================== */
const GLOBAL_KEYWORDS = [
  'Desarrollador Web Full Stack',
  'Experto WordPress & WooCommerce',
  'Consultor WPO',
  'Seguridad WordPress',
  'Next.js Developer',
  'Freelance Remoto'
]

/* =====================================================
    METADATA SEO DINÁMICA — SOBRE MÍ
   ===================================================== */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  const dict = await getDictionary(lang);
  
  // ✅ Sincronizado con la estructura del diccionario (sobre-mi.json)
  const t = (dict as any)['sobre-mi']?.meta;
  const baseUrl = 'https://www.alsnippets.com';

  return {
    // ✅ Regla de Títulos (SEO): Solo el nombre de la página
    title: "Sobre mí", 
    description: t?.description,
    keywords: [...GLOBAL_KEYWORDS, ...(t?.extra_keywords || [])],
    
    alternates: {
      // ✅ Regla de Enlaces (I18n): Inyección automática de /${lang}/
      canonical: `${baseUrl}/${lang}/sobre-mi`,
    },

    openGraph: {
      title: t?.og_title,
      description: t?.og_description,
      // ✅ Regla de Enlaces (I18n): Inyección de /${lang}/
      url: `${baseUrl}/${lang}/sobre-mi`,
      siteName: 'Alsnippets',
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
      images: [
        {
          // ✅ Imagen actualizada: openGraph-sobre-mi.png
          url: '/images/og/openGraph-sobre-mi.png',
          width: 1200,
          height: 630,
          alt: t?.og_alt || 'Adrián Loaiza - Alsnippets',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: t?.og_title,
      description: t?.twitter_description,
      creator: '@alsnippets',
      images: ['/images/og/openGraph-sobre-mi.png'],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      },
    },
  }
}

/* =====================================================
    COMPONENTE LAYOUT
   ===================================================== */
export default async function SobreMiLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  const dict = await getDictionary(lang);
  const s = (dict as any)['sobre-mi']?.page?.hero;
  const baseUrl = 'https://www.alsnippets.com';

  /* =====================================================
      SCHEMA JSON-LD DINÁMICO (AboutPage / Person)
     ===================================================== */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'mainEntity': {
      '@type': 'Person',
      'name': 'Adrián Loaiza',
      'alternateName': 'Alsnippets',
      'description': s?.subtitle,
      'url': `${baseUrl}/${lang}/sobre-mi`,
      'image': `${baseUrl}/images/og/openGraph-sobre-mi.png`,
      'jobTitle': 'Senior Web Developer & WordPress Expert',
      'knowsAbout': [
        'WordPress',
        'Next.js',
        'React',
        'WPO',
        'Cybersecurity',
        'SEO Técnico'
      ],
      'sameAs': [
        'https://github.com/alsnippets',
        'https://linkedin.com/in/adrian-loaiza'
      ]
    }
  }

  return (
    <>
      {/* Inyección de datos estructurados para Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Estructura visual del layout preservando children intacto */}
      <section className="relative w-full">
        {children}
      </section>
    </>
  )
}