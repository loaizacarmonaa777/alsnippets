import PageHero from "@/components/hero/PageHero";
import { getDictionary } from "@/i18n/get-dictionary";

/* =====================================================
    Página — Términos y condiciones
===================================================== */

export default async function TerminosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict: any = await getDictionary(lang as 'es' | 'en');
  const t = dict.terminos.page;

  return (
    <>
      {/* HERO */}
      <PageHero
        title={t.hero_title}
        subtitle={t.hero_subtitle}
        image="/images/hero/hero-terminos-condiciones.webp"
      />

      <main className="max-w-5xl mx-auto px-5 py-12 space-y-12">
        {t.sections.map((section: any, index: number) => (
          <section key={index} className="space-y-4">
            <h2>
              {section.title}
            </h2>
            <p className="max-w-3xl text-[var(--text-2)]">
              {section.content}
            </p>
          </section>
        ))}

        <p className="text-sm text-[var(--text-3)]">
          {t.footer_note}
        </p>
      </main>
    </>
  );
}