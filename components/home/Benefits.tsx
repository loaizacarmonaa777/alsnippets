"use client";

import React from "react";
// Importamos la tarjeta desde la carpeta UI
import VerticalCard, { CardTag } from "@/components/ui/VerticalCard"; 

/* =====================================================
   Tipos
   ===================================================== */
export type BenefitItem = {
  title: string;
  description: string;
  chips: string[];
  image?: string;
};

type BenefitsProps = {
  title?: string;
  items: BenefitItem[];
};

/* =====================================================
   Helper: Lógica de Colores (Verde vs Rojo)
   ===================================================== */
const getTagVariant = (text: string): CardTag["variant"] => {
  const positives = [
    "Decisiones técnicas", "Dudas constantes", "Cambios urgentes",
    "Soporte humano", "Comunicación directa", "Respuesta rápida",
    "Tranquilidad operativa", "Solución experta"
  ];
  return positives.includes(text) ? "success" : "error";
};

/* =====================================================
   Componente Benefits
   ===================================================== */
export default function Benefits({ title, items }: BenefitsProps) {
  return (
    <section className="w-full space-y-12">
      
      {/* Título */}
      {title && (
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2>
            {title}
          </h2>
        </div>
      )}

      {/* Grid */}
      <div className="container mx-auto px-4">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          
          {items.map((item, index) => {
            
            // Convertimos tus strings simples en objetos Tag con color
            const formattedTags: CardTag[] = item.chips.map(chip => ({
              text: chip,
              variant: getTagVariant(chip)
            }));

            return (
              <li key={index} className="w-full max-w-md flex">
                <VerticalCard
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  tags={formattedTags}
                  // href="/servicios" // Descomenta si quieres que sean clickeables
                />
              </li>
            );
          })}

        </ul>
      </div>
    </section>
  );
}