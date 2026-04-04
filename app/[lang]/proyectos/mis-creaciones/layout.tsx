import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
    COMPONENTE LAYOUT (Sin Metadata - Ahora en Page.tsx)
   ===================================================== */
export default async function MisCreacionesLayout ({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en'
  const dict = await getDictionary(lang)
  const s = (dict as any).proyecto_creaciones.hero
  const baseUrl = 'https://www.alsnippets.com'

  /* =====================================================
      SCHEMA JSON-LD DINÁMICO
  ===================================================== */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    // ✅ Sincronizado con las llaves de tu JSON
    name: s.title,
    description: s.subtitle,
    url: `${baseUrl}/${lang}/proyectos/mis-creaciones`,
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
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Suite Text'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Barber Short'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Alsnippets'
        }
      ]
    }
  }

  return (
    <>
      {/* Inyección de datos estructurados para Google */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Estructura visual del layout preservando children intacto */}
      <section className="relative w-full">
        {children}
      </section>
    </>
  )
}