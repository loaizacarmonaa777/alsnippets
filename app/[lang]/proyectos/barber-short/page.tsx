import React, { Suspense } from 'react'
import { getDictionary } from '@/i18n/get-dictionary'
import { Metadata } from 'next'
import BarberShortClientWrapper from './BarberShortClientWrapper'

/* =====================================================
    METADATA DINÁMICA (SEO & WHATSAPP) - V3.1
   ===================================================== */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang.replace(/^\//, '') as 'es' | 'en';
  const dict = await getDictionary(lang);
  
  const t = (dict as any).proyecto_barber.meta;
  const baseUrl = 'https://www.alsnippets.com';
  const ogImage = `${baseUrl}/images/og/openGraph-barber-short.png`;

  return {
    title: t.title, 
    description: t.description,
    keywords: t.keywords,
    alternates: {
      canonical: `${baseUrl}/${lang}/proyectos/barber-short`,
      languages: {
        'es': `${baseUrl}/es/proyectos/barber-short`,
        'en': `${baseUrl}/en/proyectos/barber-short`,
      },
    },
    openGraph: {
      title: t.og_title,
      description: t.og_description,
      url: `${baseUrl}/${lang}/proyectos/barber-short`,
      siteName: 'Alsnippets',
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: t.og_alt }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [ogImage],
    },
  }
}

/* =====================================================
    PÁGINA (SERVER COMPONENT)
   ===================================================== */
export default async function BarberShortPage({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  const { lang } = await params;
  const dictData = await getDictionary(lang as 'es' | 'en');
  
  // ✅ Pasamos todo el objeto del proyecto al cliente
  const dict = (dictData as any).proyecto_barber;

  return (
    <Suspense fallback={null}>
      <BarberShortClientWrapper 
        lang={lang} 
        dict={dict} 
      />
    </Suspense>
  )
}