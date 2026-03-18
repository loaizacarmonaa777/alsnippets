'use client'

import React from 'react'

const logos = [
  '01-wordpress.svg',
  '02-woocommerce.svg',
  '03-shopify.svg',
  '04-wix.svg',
  '05-squarespace.svg',
  '06-wpml.svg',
  '07-figma.svg',
  '08-photoshop.svg',
  '09-illustrator.svg',
  '10-cloudflare.svg',
  '11-yoast-seo.svg',
  '12-cpanel.svg',
  '13-plesk.svg',
  '14-divi.svg',
  '15-elementor.svg',
  '16-wordfence.svg',
  '17-i-themes-security.svg',
  '18-lite-speed.svg',
  '19-wp-rocket.svg',
  '20-paypal.svg',
  '21-payu.svg',
  '22-html.svg',
  '23-css.svg',
  '24-java-script.svg',
  '25-php.svg',
  '26-tailwind-css.svg',
  '27-next-js.svg',
  '28-vercel.svg'
]

export default function StackLogos ({ lang }: { lang?: string }) {
  return (
    <section className='relative w-full z-10 my-0'>
      {/* GLOW SUPERIOR */}
      <div className='absolute -top-3 left-0 w-full h-6 bg-gradient-to-r from-cyan-400 via-purple-500 via-yellow-400 to-cyan-400 blur-lg opacity-60 animate-glow-ltr pointer-events-none z-0' />
      <div className='absolute top-0 left-0 w-full h-[1px] bg-[var(--border-1)] z-20' />

      {/* CONTENEDOR PRINCIPAL - CARRUSEL INFINITO */}
      <div className='relative z-10 w-full bg-white py-12 overflow-hidden'>
        {/* 👇 ANIMACIÓN CON CLASE TAILWIND */}
        <div className='flex gap-16 animate-scroll w-max min-w-full items-center hover:[animation-play-state:paused]'>
          {/* Duplicamos los logos para loop infinito */}
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className='flex-shrink-0 flex items-center justify-center grayscale opacity-60 dark:brightness-0 hover:grayscale-0 hover:opacity-100 dark:hover:brightness-100 transition-all duration-300'
            >
              <img
                src={`/logos/stack/${logo}`}
                alt={logo
                  .replace(/^\d+-/, '')
                  .replace('.svg', '')
                  .replace(/-/g, ' ')}
                className='block h-12 md:h-16 w-auto object-contain'
                loading='lazy'
              />
            </div>
          ))}
        </div>
      </div>

      {/* GLOW INFERIOR */}
      <div className='absolute -bottom-3 left-0 w-full h-6 bg-gradient-to-r from-green-400 via-pink-500 via-blue-500 to-green-400 blur-lg opacity-60 animate-glow-rtl pointer-events-none z-0' />
      <div className='absolute bottom-0 left-0 w-full h-[1px] bg-[var(--border-1)] z-20' />
    </section>
  )
}
