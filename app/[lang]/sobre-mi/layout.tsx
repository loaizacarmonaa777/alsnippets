import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
    COMPONENTE LAYOUT - OPTIMIZADO (Sin Metadata)
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
        'WordPress', 'Next.js', 'React', 'WPO', 'Cybersecurity', 'SEO Técnico'
      ],
      'sameAs': [
        'https://github.com/loaizacarmonaa777',
        'https://linkedin.com/in/adrian-loaiza-carmona-alc/',
        'https://www.instagram.com/alsnippets/'
      ]
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Estructura visual preservada al 100% */}
      <section className="relative w-full">
        {children}
      </section>
    </>
  )
}