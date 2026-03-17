import PageHero from "@/components/hero/PageHero";
import { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";

/* =====================================================
   METADATA DINÁMICA (SEO)
   ===================================================== */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'es' | 'en');
  return {
    title: dict.privacidad.meta.title,
    description: dict.privacidad.meta.description,
  };
}

/* =====================================================
   Página — Privacidad (Limpia)
===================================================== */

export default async function PrivacidadPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'es' | 'en');
  const t = dict.privacidad.page;

  return (
    <>
      {/* HERO — Politicas */}
      <PageHero
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image="/images/hero/hero-politica-privacidad.webp"
      />

      {/* Contenido de la página - BLINDAJE VISUAL MANTENIDO */}
      <main className="max-w-5xl mx-auto px-5 py-12 space-y-12">
        <section className="space-y-4">
          <h2>{t.sections.collection.title}</h2>
          <p className="max-w-3xl text-[var(--text-2)]">
            {t.sections.collection.content}
          </p>
        </section>

        <section className="space-y-4">
          <h2>{t.sections.usage.title}</h2>
          <p className="max-w-3xl text-[var(--text-2)]">
            {t.sections.usage.content}
          </p>
        </section>

        <section className="space-y-4">
          <h2>{t.sections.protection.title}</h2>
          <p className="max-w-3xl text-[var(--text-2)]">
            {t.sections.protection.content}
          </p>
        </section>

        <section className="space-y-4">
          <h2>{t.sections.rights.title}</h2>
          <p className="max-w-3xl text-[var(--text-2)]">
            {t.sections.rights.content}
          </p>
        </section>

        <p className="text-sm text-[var(--text-3)]">
          {t.footer_note}
        </p>
      </main>
    </>
  );
}