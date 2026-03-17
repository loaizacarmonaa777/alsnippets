import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'

/* =====================================================
   METADATA DINÁMICA — TARJETAS DIGITALES
   ===================================================== */

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string; lang: string }> 
}): Promise<Metadata> {
  const { slug, lang } = await params;
  
  // Forzado de tipo para evitar errores de tipado en diccionarios dinámicos
  const dict: any = await getDictionary(lang as 'es' | 'en');
  const t = dict.tarjetas.meta;

  const name = slug
    .replace(/([A-Z])/g, ' $1') // Separa camellos: adrianLoaiza -> adrian Loaiza
    .replace(/^./, (str) => str.toUpperCase()); // Primera en mayúscula

  return {
    // Se eliminan sufijos de marca por protocolo (el padre lo gestiona)
    title: `${t.title_prefix} ${name}`,
    description: t.description.replace('{name}', name),
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: `${t.og_title} ${name}`,
      description: t.og_description,
      type: 'profile',
      images: [{ url: '/images/og/og-tarjetas.webp' }],
    },
    twitter: {
      card: 'summary',
      title: `${t.title_prefix} ${name}`,
    }
  }
}

export default function TarjetaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[var(--bg-body)]">
      {children}
    </div>
  )
}