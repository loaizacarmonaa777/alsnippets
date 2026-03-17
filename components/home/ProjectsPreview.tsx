import React from "react";
import IconCard from "@/components/ui/IconCard";
import { getDictionary } from '@/i18n/get-dictionary';

// Importamos los iconos
import IconSuiteText from "@/components/icons/IconSuiteText";
import IconBarber from "@/components/icons/IconBarber";
import IconCasosExito from "@/components/icons/IconCasosExito";
import IconMisCreaciones from "@/components/icons/IconMisCreaciones";

/* =====================================================
   ProjectsPreview (PROTOCOLO ALSNIPPETS - SERVER SIDE)
   ===================================================== */
export default async function ProjectsPreview({ lang }: { lang: string }) {
  // Obtenemos el diccionario directamente en el servidor
  const fullDict = await getDictionary(lang as 'es' | 'en');
  
  // Llamo a el componente donde están todos los textos
  const dict = fullDict.home_projects as any;

  if (!dict) return null;

  // Mapeo de Iconos
  const iconMap: Record<string, React.FC> = {
    suite: IconSuiteText,
    barber: IconBarber,
    casos: IconCasosExito,
    creaciones: IconMisCreaciones
  };

  return (
    <section className="relative w-full py-24 my-0 overflow-hidden">
      {/* Fondos Visuales */}
      <div 
        className="absolute inset-0 -z-20 opacity-100 dark:opacity-0 transition-opacity duration-300"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="absolute inset-0 -z-10 opacity-0 dark:opacity-100 bg-[var(--bg-3)] transition-opacity duration-300" />

      <div className="container mx-auto px-6 max-w-[1200px] space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <h2 className="text-[var(--text-1)]">{dict.title}</h2>
          <p className="text-lg text-[var(--text-2)] leading-relaxed">
            {dict.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.items && dict.items.map((item: any, idx: number) => {
            // Verificar que item.href existe
            const href = item.href ? `/${lang}${item.href}` : '#';
            
            return (
              <IconCard
                key={idx}
                href={href}
                title={item.title}
                description={item.description}
                icon={iconMap[item.iconKey]}
                lang={lang} 
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}