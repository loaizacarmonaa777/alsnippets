'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

/* =====================================================
   COMPONENTE INTERNO: Fila individual del Accordion
   (Ahora recibe isOpen y onClick desde el padre)
===================================================== */
const SingleAccordionRow = ({ 
  question, 
  answer, 
  isOpen, 
  onToggle 
}: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onToggle: () => void 
}) => {
  return (
    <div 
      className={`border rounded-xl overflow-hidden shadow-sm transition-all duration-300 
        ${isOpen 
          ? 'border-[var(--border-brand)] shadow-md' 
          : 'border-[var(--border-1)] hover:border-[var(--border-brand)]' 
        } bg-[var(--bg-1)]`}
    >
      <button
        onClick={onToggle} // 👈 Llama a la función del padre
        className={`w-full flex justify-between items-center p-5 text-left font-semibold transition-all duration-200 
          ${isOpen ? 'text-[var(--text-brand)]' : 'text-[var(--text-1)]'} 
          hover:text-[var(--text-brand)]`}
      >
        <span>{question}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-[var(--text-brand)]' : 'text-[var(--text-2)]'
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out px-5 overflow-hidden ${
          isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className='text-[var(--text-2)] border-t border-[var(--border-1)]/50 pt-4'>
          {answer}
        </p>
      </div>
    </div>
  )
}

/* =====================================================
   COMPONENTE PRINCIPAL: Sección FAQ Completa
===================================================== */
export default function AccordionSection({ t }: { t: any }) {
  // 1. Guardamos el INDEX del que está abierto (-1 significa todos cerrados)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    // Si hago clic en el que ya está abierto, lo cierro. Si no, abro el nuevo.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id='faq'
      className='relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] py-24 px-5 border-t border-[var(--border-1)] !my-0'
      style={{ background: 'var(--gradient-animated)' }}
    >
      <div className='max-w-3xl mx-auto space-y-10'>
        <div className='text-center space-y-4'>
          <h2>
            {t.faq_section.title}
          </h2>
          <p className='text-[var(--text-2)] opacity-80'>
            {t.faq_section.description}
          </p>
        </div>

        <div className='space-y-4'>
          {t.faq_section.items.map((faq: any, index: number) => (
            <SingleAccordionRow 
              key={index} 
              question={faq.q} 
              answer={faq.a} 
              isOpen={openIndex === index} // 👈 El padre decide si está abierto
              onToggle={() => handleToggle(index)} // 👈 El padre maneja el clic
            />
          ))}
        </div>
      </div>
    </section>
  )
}