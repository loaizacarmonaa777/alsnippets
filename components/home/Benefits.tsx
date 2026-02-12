import React from "react";
import Image from "next/image";

// Definimos la estructura de los datos de cada tarjeta
export type BenefitItem = {
  title: string;
  description: string;
  chips: string[];
  image?: string;
};

type BenefitsProps = {
  title: string;
  items: BenefitItem[];
};

/* =====================================================
   Benefits
   Lista de beneficios en formato grid con tarjetas detalladas
   ===================================================== */
export default function Benefits({ title, items }: BenefitsProps) {
  return (
    <section className="space-y-10">
      {/* Solo mostramos el título si existe */}
      {title && (
        <h2 className="text-2xl font-semibold text-center max-w-2xl mx-auto">
          {title}
        </h2>
      )}

      {/* =========================
          Grid de beneficios
          ========================= */}
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <li
            key={index}
            // Agregamos clases de Tailwind para dar el estilo de "Card" (borde, sombra suave, redondeado)
            className="group card w-full max-w-[350px] h-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
          >
            {/* 1. Placeholder de Imagen (Espacio reservado) */}
            <div className="h-48 w-full relative bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 shrink-0">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill // Ocupa todo el contenedor padre (h-48)
                  className="object-cover rounded-t-xl transition-transform duration-500 ease-in-out group-hover:scale-105" // Recorta la imagen para llenar sin deformar
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <span className="text-sm">[Imagen]</span>
              )}
            </div>


            {/* Contenedor de contenido con padding */}
            <div className="p-2 flex flex-col flex-grow items-center text-center space-y-0">

              {/* 2. Título (H3) */}
              <h3 className="!text-2xl text-neutral-500 dark:text-neutral-100 py-5">
                {item.title}
              </h3>

              {/* 3. Descripción (Párrafo) */}
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed py-2">
                {item.description}
              </p>

              {/* 4. Listado de Chips */}
              <div className="mt-auto pt-2 flex flex-wrap justify-center gap-2">
                {item.chips.map((chip, chipIndex) => {
                  // Lógica para el chip verde específico
                  const isGreen = chip === "Decisiones técnicas" || chip === "Dudas constantes" || chip === "Cambios urgentes" || chip === "Soporte humano" || chip === "Comunicación directa" || chip === "Respuesta rápida" || chip === "Tranquilidad operativa";

                  return (
                    <span
                      key={chipIndex}
                      className={`px-2.5 py-0.5 rounded-full text-xs text-[0.8rem] border transition-colors cursor-default leading-tight
                        ${isGreen
                          ? "border-green-600 text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                          : "border-red-600 text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                        }
                      `}
                    >
                      {chip}
                    </span>
                  );
                })}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}