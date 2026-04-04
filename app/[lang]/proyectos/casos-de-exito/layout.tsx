import { getDictionary } from "@/i18n/get-dictionary";

/* =========================================================================
    COMPONENTE LAYOUT - OPTIMIZADO (Sin Metadata)
   ========================================================================= */
export default async function CasosDeExitoLayout({ 
  children,
  params 
}: { 
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  const dict = await getDictionary(lang);
  
  const s = (dict as any).proyecto_casos.schema;
  const tPage = (dict as any).proyecto_casos.page;
  const baseUrl = 'https://www.alsnippets.com';

  /* =====================================================
      SCHEMA JSON-LD DINÁMICO (CollectionPage)
     ===================================================== */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    // ✅ CORREGIDO: Nombre dinámico desde el Hero del JSON (Sin texto plano)
    name: tPage.hero.title,
    description: s.description,
    url: `${baseUrl}/${lang}/proyectos/casos-exito`,
    publisher: {
      '@type': 'ProfessionalService',
      name: 'Alsnippets',
      image: `${baseUrl}/images/og/openGraph-casos-exito.png`,
      url: `${baseUrl}/${lang}`
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Transcendent Institute'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Inner Mastery Europa'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'EDESO'
        }
      ]
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