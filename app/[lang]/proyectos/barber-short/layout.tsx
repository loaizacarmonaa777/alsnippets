import { getDictionary } from '@/i18n/get-dictionary'

export default async function BarberShortLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode; 
  params: Promise<{ lang: string }>; 
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  const dict = await getDictionary(lang);
  const s = (dict as any).proyecto_barber.schema;
  const baseUrl = 'https://www.alsnippets.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Barber Short',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: s.description,
    url: `${baseUrl}/${lang}/proyectos/barber-short`,
    author: {
      '@type': 'Person',
      name: 'Adrián Loaiza',
      url: `${baseUrl}/${lang}/sobre-mi`
    },
    publisher: {
      '@type': 'Organization',
      name: 'Alsnippets',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/brand/logo-fondo-dark-menu.svg`
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