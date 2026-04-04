import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'
import { notFound } from 'next/navigation'
import DigitalBusinessCardClient from './DigitalBusinessCardClient'

/* =====================================================
    DUPLICADO DE MOCK DB (Para acceso en Servidor)
   ===================================================== */
const mockDatabase: Record<string, any> = {
  adrianLoaiza: { name: 'Adrián Loaiza Carmona' },
  yeseniaSanmartin: { name: 'Yesenia Sanmartín Sánchez' }
};

/* =====================================================
    METADATA DINÁMICA (SEO & WHATSAPP) - OPTIMIZADA
   ===================================================== */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string; lang: string }> 
}): Promise<Metadata> {
  const { slug, lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  
  // 1. Cargamos el diccionario específico de tarjetas
  const dict = await getDictionary(lang) as any;
  const baseUrl = 'https://www.alsnippets.com';
  
  const user = mockDatabase[slug];
  if (!user) return { title: "Contacto" };

  // 2. Accedemos a tarjetas.meta (Asegúrate de que getDictionary devuelva el objeto completo)
  const meta = dict.tarjetas?.meta;
  const seoPrefix = meta?.title_prefix || (lang === 'es' ? 'Tarjeta Digital' : 'Digital Card');
  const description = (meta?.description || "").replace('{name}', user.name);

  const ogImage = `${baseUrl}/images/og/openGraph-tarjetas.png`;

  return {
    title: `${seoPrefix} ${user.name}`, 
    description: description,
    alternates: {
      canonical: `${baseUrl}/${lang}/tarjetas/${slug}`,
      languages: {
        'es': `${baseUrl}/es/tarjetas/${slug}`,
        'en': `${baseUrl}/en/tarjetas/${slug}`,
      },
    },
    openGraph: {
      title: `${meta?.og_title || seoPrefix} ${user.name}`,
      description: meta?.og_description || description,
      url: `${baseUrl}/${lang}/tarjetas/${slug}`,
      siteName: 'Alsnippets',
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      type: 'profile',
      images: [{ 
        url: ogImage,
        width: 1200,
        height: 630,
        alt: user.name
      }],
    },
    robots: { index: true, follow: true }
  }
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  
  if (!mockDatabase[slug]) notFound();

  return <DigitalBusinessCardClient params={{ lang, slug }} />;
}