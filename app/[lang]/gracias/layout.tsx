import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
   METADATA DINÁMICA: PÁGINA DE GRACIAS (CONVERSIÓN)
===================================================== */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'es' | 'en');
  const t = dict.gracias.meta;

  return {
    title: t.title,
    description: t.description,
    
    // REGLA DE ORO: Bloqueamos a los buscadores para no ensuciar las métricas de GA4
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  }
}

export default async function GraciasLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <>
      {/* [PREPARACIÓN PARA GA4 / TAG MANAGER]
          Se preserva la estructura para futuros scripts de conversión usando {lang}
      */}
      {children}
    </>
  )
}