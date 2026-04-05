'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

/* =====================================================
   Hero — Home Bilingüe (PROTOCOLO ALSNIPPETS)
   ===================================================== */

type Slide = {
  title: string
  subtitle: string
  imageDesktop: string
  imageMobile: string
  textColor?: string
  ctaText: string
  ctaHref: string
  ctaVariant?: 'primary' | 'secondary' | 'outline'
}

export default function Hero ({ lang }: { lang: string }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // PROTOCOLO ALSNIPPETS: Objeto de traducción local para Slides
  const slidesData: Record<string, Slide[]> = {
    es: [
      {
        title: 'Tu WordPress al 100%',
        subtitle:
          'Auditorías técnicas reales, optimización profunda y soluciones claras para que tu sitio funcione como debe.',
        imageDesktop: '/images/home/hero-home-desktop.webp',
        imageMobile: '/images/home/hero-home-mobile.webp',
        textColor: 'text-white',
        ctaText: 'Auditoría WordPress',
        ctaHref: `/es/auditoria#form`,
        ctaVariant: 'primary'
      },
      {
        title: 'Preformateado de texto',
        subtitle:
          'Sección pensada para SEO, desarrolladores y programadores. Texto funcional, limpio y optimizado para humanos y máquinas.',
        imageDesktop: '/images/home/hero-home-desktop-seo-geo.webp',
        imageMobile: '/images/home/hero-home-mobile-seo-geo.webp',
        textColor: 'text-neutral-900',
        ctaText: 'Jugar en Suite Text',
        ctaHref: `/es/proyectos/suite-text`,
        ctaVariant: 'secondary'
      },
      {
        title: 'Un QR con toda tu información',
        subtitle:
          'Contribuimos al cuidado del medio ambiente. Reemplaza tarjetas impresas por un QR virtual con toda tu información.',
        imageDesktop: '/images/home/hero-home-desktop-qr.webp',
        imageMobile: '/images/home/hero-home-mobile-qr.webp',
        textColor: 'text-neutral-900',
        ctaText: 'Contacta para tu QR',
        ctaHref: `/es/tarjetas/adrianLoaiza`,
        ctaVariant: 'secondary'
      }
    ],
    en: [
      {
        title: 'Your WordPress at 100%',
        subtitle:
          'Real technical audits, deep optimization, and clear solutions to make your site work as it should.',
        imageDesktop: '/images/home/hero-home-desktop.webp',
        imageMobile: '/images/home/hero-home-mobile.webp',
        textColor: 'text-white',
        ctaText: 'WordPress Audit',
        ctaHref: `/en/auditoria#form`,
        ctaVariant: 'primary'
      },
      {
        title: 'Text Preformatting',
        subtitle:
          'Section designed for SEO, developers, and programmers. Functional, clean text optimized for humans and machines.',
        imageDesktop: '/images/home/hero-home-desktop-seo-geo.webp',
        imageMobile: '/images/home/hero-home-mobile-seo-geo.webp',
        textColor: 'text-neutral-900',
        ctaText: 'Play in Suite Text',
        ctaHref: `/en/proyectos/suite-text`,
        ctaVariant: 'secondary'
      },
      {
        title: 'A QR with all your info',
        subtitle:
          'We contribute to environmental care. Replace printed cards with a virtual QR with all your information.',
        imageDesktop: '/images/home/hero-home-desktop-qr.webp',
        imageMobile: '/images/home/hero-home-mobile-qr.webp',
        textColor: 'text-neutral-900',
        ctaText: 'Contact for your QR',
        ctaHref: `/en/tarjetas/adrianLoaiza`,
        ctaVariant: 'secondary'
      }
    ]
  }

  const slides: Slide[] = slidesData[lang as 'es' | 'en'] || slidesData.es

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [slides.length])

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <section className='relative w-full h-[90vh] overflow-hidden bg-[var(--bg-inverse)]'>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`
            absolute inset-0 w-full h-full
            transition-opacity duration-1000 ease-in-out
            ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}
          `}
          aria-hidden={index !== currentSlide}
        >
          {/* Imágenes */}
          <div className='hidden md:block relative w-full h-full'>
            <Image
              src={slide.imageDesktop}
              alt={slide.title}
              fill
              priority={index === 0}
              loading={index === 0 ? undefined : "lazy"}
              className='object-cover'
              sizes='100vw'
            />
          </div>

          <div className='md:hidden relative w-full h-full'>
            <Image
              src={slide.imageMobile}
              alt={slide.title}
              fill
              priority={index === 0}
              loading={index === 0 ? undefined : "lazy"}
              className='object-cover'
              sizes='100vw'
            />
          </div>

          {/* Contenido */}
          <div className='absolute inset-0 flex items-center justify-center p-6 text-center z-20'>
            <div className='max-w-4xl space-y-6'>
              <h1
                className={`text-4xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-md ${
                  slide.textColor || 'text-white'
                }`}
              >
                {slide.title}
              </h1>

              <p
                className={`text-lg md:text-xl font-medium max-w-2xl mx-auto drop-shadow-sm opacity-90 ${
                  slide.textColor || 'text-white'
                }`}
              >
                {slide.subtitle}
              </p>

              <div className='pt-6 '>
                <Link
                  href={slide.ctaHref}
                  target='_blank' // Abre en pestaña nueva
                  rel='noopener noreferrer' // Seguridad
                  className={`inline-block px-8 py-3 border border-[var(--border-brand)] rounded-full text-lg font-bold transition-transform duration-300 hover:scale-105 shadow-lg ${
                    slide.ctaVariant === 'primary'
                      ? 'bg-[var(--bg-brand)] text-[var(--text-inverse)] hover:brightness-110'
                      : 'bg-[var(--bg-1)] text-[var(--text-1)] hover:bg-[var(--bg-2)]'
                  }`}
                >
                  {slide.ctaText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navegación */}
      <button
        onClick={prevSlide}
        className='hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className='w-8 h-8'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.75 19.5L8.25 12l7.5-7.5'
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className='hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className='w-8 h-8'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8.25 4.5l7.5 7.5-7.5 7.5'
          />
        </svg>
      </button>

      {/* Indicadores */}
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3'>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`rounded-full transition-all duration-300 shadow-sm ${
              index === currentSlide
                ? 'bg-white w-8 h-3'
                : 'bg-white/50 hover:bg-white/80 w-3 h-3'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
