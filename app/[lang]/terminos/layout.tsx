import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
   METADATA — TÉRMINOS Y CONDICIONES
   ===================================================== */

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;
  
  // Protocolo: Acceso al diccionario con cast para evitar errores de tipado
  const dict: any = await getDictionary(lang as 'es' | 'en');
  const t = dict.terminos.meta;

  return {
    // Título limpio (el layout raíz añade el sufijo de marca)
    title: t.title,
    description: t.description,
    
    // 1. PRIVACIDAD SEO: Evitamos indexación según tu configuración original
    robots: {
      index: false,
      follow: true,
    },

    // 2. CANONICAL DINÁMICO
    alternates: {
      canonical: `/${lang}/terminos`,
    },
  }
}

export default async function TerminosLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  // Blindaje de Promise para params en Next.js 15+
  const { lang } = await params;

  return (
    <div className="min-h-screen bg-[var(--bg-body)]">
      {children}
    </div>
  )
}