import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
    METADATA DINÁMICA: PÁGINA DE GRACIAS (CONVERSIÓN)
===================================================== */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  const dict = await getDictionary(lang);
  const t = dict.gracias.meta;
  const baseUrl = 'https://www.alsnippets.com';

  return {
    // ✅ Regla de Títulos: Solo el nombre de la página
    title: "Gracias", 
    description: t.description,
    
    // ✅ Regla de Enlaces: Inyección de /${lang}/ y subdominio www
    openGraph: {
      title: t.title,
      description: t.description,
      url: `${baseUrl}/${lang}/gracias`,
      siteName: 'Alsnippets',
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/og/openGraph-home.png', // Imagen general para páginas de éxito
          width: 1200,
          height: 630,
          alt: 'Alsnippets',
        },
      ],
    },

    alternates: {
      canonical: `${baseUrl}/${lang}/gracias`,
    },

    // ✅ REGLA DE ORO: Bloqueamos a los buscadores para no ensuciar las métricas de GA4
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        'max-image-preview': 'none',
        'max-snippet': 0,
      },
    },
  }
}

/* =====================================================
    COMPONENTE LAYOUT
===================================================== */
export default async function GraciasLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';

  return (
    <>
      {/* [PREPARACIÓN PARA GA4 / TAG MANAGER]
          Se preserva la estructura para futuros scripts de conversión usando el {lang} normalizado.
      */}
      <section className="relative w-full">
        {children}
      </section>
    </>
  )
}