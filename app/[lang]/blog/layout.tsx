import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
    COMPONENTE LAYOUT - OPTIMIZADO
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
      SCHEMA JSON-LD DINÁMICO (URLs Absolutas)
     ===================================================== */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: s.name,
    description: s.description,
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
      
      {/* Estructura visual del layout (Se mantiene intacta) */}
      <section className="relative w-full">
        {children}
      </section>
    </>
  )
}