'use client'
import Link from 'next/link'

interface TopBarProps {
  lang: string
}

export default function TopBar ({ lang }: TopBarProps) {
  // PROTOCOLO ALSNIPPETS: Objeto de traducción local para Componentes de UI
  const translations = {
    es: {
      promoText:
        'Auditorías gratuitas por tiempo limitado · ALSNIPPETS EXPERT ·',
      buttonText: 'PROMO',
      whatsappUrl:
        'https://wa.me/573246454061?text=%C2%A1Hola%20Adri%C3%A1n!.%20Quiero%20una%20asesor%C3%ADa%20gratuita%2C%20Cont%C3%A1ctame.'
    },
    en: {
      promoText: 'Limited time free audits · ALSNIPPETS EXPERT ·',
      buttonText: 'OFFER',
      whatsappUrl:
        'https://wa.me/573246454061?text=Hi%20Adrian!%20I%20want%20a%20free%20consultancy%2C%20contact%20me.'
    }
  }

  const t = translations[lang as 'es' | 'en'] || translations.es

  return (
    <div className='relative z-[110] bg-[var(--bg-2)] border-b border-[var(--border-1)] h-10 overflow-hidden flex items-center'>
      <div className='max-w-[1200px] w-full mx-auto flex items-center justify-between h-full px-4 md:px-6'>
        {/* CONTENEDOR DE TEXTO (70% en mobile, flexible en desktop) */}
        <div className='relative w-[70%] md:flex-1 overflow-hidden h-full flex items-center'>
          <div className='flex animate-marquee whitespace-nowrap text-[9px] md:text-[10px] uppercase font-bold text-[var(--text-3)] tracking-[0.1em] md:tracking-[0.2em]'>
            {/* BLOQUE 1: Texto repetido para llenar el espacio */}
            <div className='flex items-center'>
              <span className='mx-4'>{t.promoText}</span>
              <span className='mx-4'>{t.promoText}</span>
            </div>

            {/* BLOQUE 2: Copia exacta para el bucle infinito al 50% */}
            <div className='flex items-center' aria-hidden='true'>
              <span className='mx-4'>{t.promoText}</span>
              <span className='mx-4'>{t.promoText}</span>
            </div>
          </div>

          {/* Fades laterales para el texto */}
          <div className='pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-[var(--bg-2)] to-transparent z-10' />
          <div className='pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-[var(--bg-2)] to-transparent z-10' />
        </div>

        {/* CONTENEDOR DEL BOTÓN (25-30% en mobile) */}
        <div className='w-[30%] md:w-auto md:flex-none h-full flex items-center justify-end'>
          <Link
            href={t.whatsappUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='group relative flex items-center justify-center w-full md:px-6 h-full overflow-hidden transition-all duration-300'
          >
            {/* 🎨 FONDO ANIMADO: Usa tu variable de degradado promocional */}
            <div
              className='absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity'
              style={{
                background: 'var(--gradient-cta)',
                backgroundSize: '400% 400%',
                animation: 'gradient-cta 15s ease infinite'
              }}
            />

            {/* 💡 PUNTO DE NOTIFICACIÓN: Color adaptativo usando variables del root */}
            <span className='relative z-10 flex h-2 w-2 mr-1.5'>
              <span
                className='animate-ping absolute inline-flex h-full w-full rounded-full opacity-75'
                style={{ backgroundColor: 'var(--bg-img-pago)' }}
              ></span>
              <span
                className='relative inline-flex rounded-full h-2 w-2'
                style={{ backgroundColor: 'var(--bg-brand)' }}
              ></span>
            </span>

            {/* 📝 TEXTO DEL BOTÓN: Optimizado para contraste con el degradado */}
            <span
              className='relative z-10 text-[10px] md:text-[12px] font-bold uppercase tracking-widest whitespace-nowrap'
              style={{ color: 'var(--text-4)' }}
            >
              {t.buttonText}
            </span>

            {/* ✨ BRILLO ANIMADO (Overlay) */}
            <div className='absolute inset-0 animate-glow-ltr opacity-30 mix-blend-overlay' />
          </Link>
        </div>
      </div>
    </div>
  )
}
