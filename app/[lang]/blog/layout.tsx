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
  const { lang } = await params;
  const dict = await getDictionary(lang as 'es' | 'en');
  const t = dict.blog.meta;
  const baseUrl = 'https://alsnippets.com';

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.og_title,
      description: t.og_description,
      url: `${baseUrl}/${lang}/blog`,
      siteName: 'Alsnippets',
      locale: lang === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
      images: [{
        url: '/images/og/og-global-alsnippets.webp',
        width: 1200,
        height: 630,
        alt: t.og_alt,
      }],
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/blog`,
    },
    robots: {
      index: true,
      follow: true,
    }
  }
}

export default async function BlogLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'es' | 'en');
  const s = dict.blog.schema;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: s.name,
    description: s.description,
    url: `https://alsnippets.com/${lang}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'Alsnippets',
      logo: {
        '@type': 'ImageObject',
        url: 'https://alsnippets.com/images/logo.png'
      }
    },
    author: {
      '@type': 'Person',
      name: 'Adrián Loaiza',
      url: `https://alsnippets.com/${lang}/sobre-mi`
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}