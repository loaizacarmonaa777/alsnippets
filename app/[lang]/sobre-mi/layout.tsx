// app/[lang]/sobre-mi/layout.tsx
import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'

const GLOBAL_KEYWORDS = [
  'Desarrollador Web Full Stack',
  'Experto WordPress & WooCommerce',
  // ... resto de keywords
]

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'es' | 'en');
  
  // ✅ CORREGIDO: Usamos 'sobreMi' (camelCase) en lugar de 'sobre-mi'
  const t = (dict as any).sobreMi?.meta;

  return {
    title: t?.title,
    description: t?.description,
    keywords: [...GLOBAL_KEYWORDS, ...(t?.extra_keywords || [])],
    // ... resto del metadata
  }
}

export default async function SobreMiLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const jsonLd = {
    // ... tu schema existente
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