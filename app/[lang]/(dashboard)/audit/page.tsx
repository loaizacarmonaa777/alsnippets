import { getDictionary } from '@/i18n/get-dictionary'
import AuditDashboard from './components/layout/AuditDashboard'
import { Metadata } from 'next'

interface Props {
  params: {
    lang: string
  }
}

/**
 * Generamos metadatos dinámicos para SEO de la herramienta
 */
export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  const dict = await getDictionary(lang as 'es' | 'en')
  return {
    title: dict.audit_pro?.audit?.header?.title || 'Audit PRO - ALSNIPPETS',
    description: dict.audit_pro?.audit?.header?.subtitle || 'Análisis de Inteligencia de Sistemas',
  }
}

export default async function AuditPage({ params: { lang } }: Props) {
  // 1. Cargamos las traducciones de forma asíncrona en el servidor.
  // Esto garantiza que el cliente reciba el HTML ya traducido (SEO Friendly).
  const dict = await getDictionary(lang as 'es' | 'en')

  return (
    <div className="min-h-screen bg-[var(--bg-body)] transition-colors duration-500">
      {/* AuditDashboard es un Client Component que recibe el diccionario.
          - dict.audit_pro: Contiene los textos de la suite de auditoría.
          - lang: El idioma actual para formateo de fechas, monedas o prompts de IA.
      */}
      <AuditDashboard 
        dict={dict.audit_pro} 
        lang={lang} 
      />
    </div>
  )
}