import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
    COMPONENTE LAYOUT - OPTIMIZADO (Sin Metadata)
   ===================================================== */
export default async function PreciosLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  const dict = await getDictionary(lang);
  const s = dict.precios.schema;
  const baseUrl = 'https://www.alsnippets.com';

  /* =====================================================
      SCHEMA JSON-LD DINÁMICO (URLs Absolutas)
     ===================================================== */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: s.name,
    description: s.description,
    url: `${baseUrl}/${lang}/precios`,
    publisher: {
      '@type': 'ProfessionalService',
      name: 'Alsnippets',
      image: `${baseUrl}/images/og/openGraph-precios.png`,
      url: `${baseUrl}/${lang}`,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CO'
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <section className="relative w-full">
        {children}
      </section>
    </>
  )
}