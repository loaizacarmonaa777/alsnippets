type BenefitsProps = {
  title: string;
  items: string[];
};

/* =====================================================
   Benefits
   Lista de beneficios en formato grid
   ===================================================== */
export default function Benefits({ title, items }: BenefitsProps) {
  return (
    <section className="space-y-10">
      <h2 className="text-2xl font-semibold text-center max-w-2xl mx-auto">
        {title}
      </h2>

      {/* =========================
          Grid de beneficios
         ========================= */}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="card"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
