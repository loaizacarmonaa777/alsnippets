import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
   METADATA DINÁMICA: PÁGINA DE CAFÉ
===================================================== */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  const dict = await getDictionary(lang);
  const t = dict.cafe.meta_cancel; // ✅ Sincronizado con tu .json
  const baseUrl = 'https://www.alsnippets.com';

  return {
    // ✅ Regla de Títulos: Solo el nombre de la página (El resto lo pone el Root)
    title: "Café", 
    description: t.description,
    
    // ✅ Regla de Enlaces: Inyección de /${lang}/ e imagen de la Home
    openGraph: {
      title: t.title,
      description: t.description,
      url: `${baseUrl}/${lang}/cafe`,
      siteName: 'Alsnippets',
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
      images: [{
        url: '/images/og/openGraph-home.png',
        width: 1200,
        height: 630,
        alt: 'Alsnippets',
      }],
    },

    alternates: {
      canonical: `${baseUrl}/${lang}/cafe`,
    },

    // ✅ REGLA DE ORO: Bloqueamos a los buscadores (Página de retorno de pago)
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
export default async function CafeLayout({
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
      {/* Estructura visual preservada con el parámetro {lang} */}
      <section className="relative w-full">
        {children}
      </section>
    </>
  )
}