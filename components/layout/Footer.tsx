'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import SocialIcon from '@/components/icons/SocialIcon'
import { SOCIAL_LINKS } from '@/components/icons/social.config'
import MailIcon from '@/components/icons/MailIcon'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon'
import WebIcon from '@/components/icons/WebIcon'
import PinIcon from '@/components/icons/PinIcon'
import SunIcon from '@/components/icons/SunIcon'
import MoonIcon from '@/components/icons/MoonIcon'
import FormNewsletter from '@/components/forms/FormNewsletter'
import { motion, AnimatePresence } from 'framer-motion'

interface FooterProps {
  lang: string
  dict: any
}

export default function Footer ({ lang, dict }: FooterProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const currentLang = lang || 'es'

  // Acceso seguro con fallback de objeto vacío
  const f = dict?.footer?.page || {}

  useEffect(() => {
    setMounted(true)
  }, [])

  // Renderizado Condicional Seguro:
  // Mantenemos la estructura externa siempre para evitar saltos de layout (CLS)
  return (
    <footer
      className='relative w-full mt-0 pt-16 pb-8 text-[var(--text-1)] dark:text-[var(--text-white-1)]'
      style={{ background: 'var(--gradient-hero)' }}
    >
      <div className='container mx-auto px-6 max-w-[1200px]'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16'>
          {/* ==== COLUMNA 1 — Branding & contacto ==== */}
          <div className='flex flex-col items-center md:items-start space-y-8 text-base md:text-sm'>
            <div className='h-32 flex items-center justify-center md:justify-start'>
              {mounted ? (
                <motion.img
                  key={`footer-logo-${theme}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  src={
                    theme === 'dark'
                      ? '/brand/logo-fondo-dark-menu.svg'
                      : '/brand/logo-fondo-light-menu.svg'
                  }
                  alt='Alsnippets'
                  className='h-20 md:h-24 w-auto object-contain select-none'
                  onError={e => {
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              ) : (
                <div className='h-20 w-48 bg-[var(--bg-3)] animate-pulse rounded-xl' />
              )}
            </div>

            <ul className='space-y-5 w-full'>
              {[
                {
                  href: 'mailto:contact@alsnippets.com',
                  icon: <MailIcon className='w-6 h-6' />,
                  text: 'contact@alsnippets.com',
                  target: '_self'
                },
                {
                  href: `https://wa.me/573246454061?text=${encodeURIComponent(
                    f?.waMsg || ''
                  )}`,
                  icon: <WhatsAppIcon className='w-6 h-6' />,
                  text: '(+57 324 645 4061)',
                  target: '_blank'
                },
                {
                  href:
                    currentLang === 'en'
                      ? 'https://alsnippets.com/en'
                      : 'https://alsnippets.com',
                  icon: <WebIcon className='w-6 h-6' />,
                  text: 'alsnippets.com',
                  target: '_self'
                }
              ].map((item, idx) => (
                <motion.li key={idx} whileHover={{ x: 5 }}>
                  <a
                    href={item.href}
                    target={item.target}
                    rel={item.target === '_blank' ? 'noopener noreferrer' : ''}
                    className='flex items-center justify-center md:justify-start gap-4 group text-[var(--text-1)] dark:text-[var(--text-white-2)] hover:text-[var(--text-brand)] transition-colors'
                  >
                    <div className='p-2 rounded-lg bg-[var(--bg-2)] dark:bg-[var(--bg-3)] border border-[var(--border-1)] dark:border-[var(--border-2)] group-hover:border-[var(--border-brand)] group-hover:shadow-[var(--shadow-brand-glow)] transition-all duration-300'>
                      {item.icon}
                    </div>
                    <span className='font-medium tracking-tight'>
                      {item.text}
                    </span>
                  </a>
                </motion.li>
              ))}

              <li className='flex items-start justify-center md:justify-start gap-4'>
                <div className='p-2 rounded-lg bg-[var(--bg-brand)] text-[var(--text-inverse)]'>
                  <PinIcon className='w-6 h-6' />
                </div>
                <span className='leading-tight text-[var(--text-2)] dark:text-[var(--text-white-3)]'>
                  {f?.locationStreet}
                  <br />
                  <span className='text-[var(--text-3)] dark:text-[var(--text-white-4)] text-xs font-bold uppercase tracking-wider'>
                    {f?.locationRegion}
                  </span>
                </span>
              </li>
            </ul>

            <div className='pt-6 flex flex-col items-center md:items-start gap-6 w-full'>
              <div className='flex p-1.5 bg-[var(--bg-inverse)] dark:bg-[var(--bg-3)] rounded-full gap-1'>
                {mounted && (
                  <>
                    <button
                      type='button'
                      onClick={() => setTheme('light')}
                      aria-label={f?.sunAria}
                      className={`p-2.5 rounded-full transition-all duration-500 ${
                        theme === 'light'
                          ? 'bg-[var(--bg-brand)] text-[var(--text-inverse)] shadow-lg scale-110'
                          : 'text-[var(--text-white-4)] hover:text-[var(--text-brand)]'
                      }`}
                    >
                      <SunIcon className='w-5 h-5' />
                    </button>
                    <button
                      type='button'
                      onClick={() => setTheme('dark')}
                      aria-label={f?.moonAria}
                      className={`p-2.5 rounded-full transition-all duration-500 ${
                        theme === 'dark'
                          ? 'bg-[var(--bg-brand)] text-[var(--text-inverse)] shadow-lg scale-110'
                          : 'text-[var(--text-white-4)] hover:text-[var(--text-brand)]'
                      }`}
                    >
                      <MoonIcon className='w-5 h-5' />
                    </button>
                  </>
                )}
              </div>
              <div className='flex gap-4 mt-2'>
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className='rounded-full transition-all duration-300 hover:shadow-[var(--shadow-brand-glow-hover)]'
                  >
                    <SocialIcon href={href} label={label}>
                      <div className='w-8 h-8 flex items-center justify-center text-[var(--text-1)] dark:text-[var(--text-white-1)]'>
                        <Icon />
                      </div>
                    </SocialIcon>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ==== COLUMNA 2 — Enlaces ==== */}
          <div className='bg-[var(--bg-1)] dark:bg-[var(--bg-2)] border border-[var(--border-brand)] rounded-2xl p-8 shadow-[var(--shadow-2)] dark:shadow-[var(--shadow-brand-glow)] transition-all duration-300'>
            <h4 className='text-lg font-bold mb-6 text-center md:text-left text-[var(--text-brand)] uppercase tracking-wider'>
              {f?.quickLinks}
            </h4>
            <div className='grid grid-cols-2 gap-6 text-sm'>
              <ul className='space-y-4 font-medium text-[var(--text-2)] dark:text-[var(--text-white-2)]'>
                <li>
                  <Link
                    href={`/${currentLang}/sobre-mi`}
                    className='hover:text-[var(--text-brand)] transition-all hover:translate-x-2 inline-block'
                  >
                    {f?.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${currentLang}/proyectos/casos-de-exito`}
                    className='hover:text-[var(--text-brand)] transition-all hover:translate-x-2 inline-block font-bold text-[var(--text-brand)]'
                  >
                    {f?.successStories}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${currentLang}/servicios/soporte-mantenimiento-wordpress`}
                    className='hover:text-[var(--text-brand)] transition-all hover:translate-x-2 inline-block'
                  >
                    {f?.support}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${currentLang}/servicios/optimizacion-rendimiento`}
                    className='hover:text-[var(--text-brand)] transition-all hover:translate-x-2 inline-block'
                  >
                    {f?.optimization}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${currentLang}/servicios/seguridad-limpieza`}
                    className='hover:text-[var(--text-brand)] transition-all hover:translate-x-2 inline-block'
                  >
                    {f?.security}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${currentLang}/blog`}
                    className='hover:text-[var(--text-brand)] transition-all hover:translate-x-2 inline-block'
                  >
                    {f?.blog}
                  </Link>
                </li>
              </ul>
              <ul className='space-y-4 font-medium text-[var(--text-2)] dark:text-[var(--text-white-2)]'>
                <li>
                  <Link
                    href={`/${currentLang}/suite-text`}
                    className='hover:text-[var(--text-brand)] transition-all hover:translate-x-2 inline-block'
                  >
                    {f?.suiteText}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${currentLang}/barber-short`}
                    className='hover:text-[var(--text-brand)] transition-all hover:translate-x-2 inline-block'
                  >
                    {f?.barberShort}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${currentLang}/precios`}
                    className='hover:text-[var(--text-brand)] transition-all hover:translate-x-2 inline-block'
                  >
                    {f?.pricing}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${currentLang}/proyectos/mis-creaciones`}
                    className='hover:text-[var(--text-brand)] transition-all hover:translate-x-2 inline-block'
                  >
                    {f?.creations}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${currentLang}/tarjetas/adrianLoaiza`}
                    className='hover:text-[var(--text-brand)] transition-all hover:translate-x-2 inline-block'
                  >
                    {f?.qr}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${currentLang}/contacto#faq`}
                    className='hover:text-[var(--text-brand)] transition-all hover:translate-x-2 inline-block'
                  >
                    {f?.faq}
                  </Link>
                </li>
              </ul>
            </div>
            <div className='mt-10 flex flex-col items-center gap-4 w-full'>
              <Link
                href={`/${currentLang}/auditoria#form`}
                className='w-full group'
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className='relative w-full py-3.5 rounded-full bg-[var(--bg-brand)] text-[var(--text-inverse)] font-bold shadow-[var(--shadow-brand-glow)] overflow-hidden transition-all duration-300'
                >
                  <span className='relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest text-xs'>
                    {f?.audit}
                  </span>
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]' />
                </motion.button>
              </Link>
              <Link href={`/${currentLang}/contacto`} className='w-full group'>
                <motion.button
                  whileHover={{ backgroundColor: 'var(--bg-brand-hover)' }}
                  className='w-full py-3 rounded-full border-2 border-[var(--border-brand)] text-[var(--text-brand)] font-bold text-xs uppercase tracking-widest transition-all duration-300'
                >
                  {f?.contact}
                </motion.button>
              </Link>
            </div>
          </div>

          {/* ==== COLUMNA 3 — Newsletter ==== */}
          <div className='bg-[var(--bg-1)] dark:bg-[var(--bg-2)] border border-[var(--border-brand)] rounded-2xl p-8 shadow-[var(--shadow-2)] dark:shadow-[var(--shadow-brand-glow)] flex flex-col'>
            <h4 className='text-lg font-bold mb-6 text-center md:text-left text-[var(--text-brand)] uppercase tracking-wider'>
              {f?.newsletter}
            </h4>
            <FormNewsletter lang={currentLang} />
            <div className='text-base space-y-4 pt-8 text-center md:text-left flex-grow font-medium'>
              <p className='text-[var(--text-1)] dark:text-[var(--text-white-2)] font-bold'>
                {f?.trust}
              </p>
              <ul className='space-y-2 text-sm text-[var(--text-2)] dark:text-[var(--text-white-3)]'>
                <li>{f?.experience}</li>
                <li>{f?.realOptimization}</li>
                <li>{f?.humanSupport}</li>
              </ul>
            </div>
            <div className='mt-8 flex justify-center items-center p-6 rounded-xl bg-[var(--bg-img-pago)] border border-[var(--border-1)] dark:border-[var(--border-2)]'>
              <img
                src='/images/footer/formas-de-pago-para-alsnippets.webp'
                alt={f?.payments || 'Payments'}
                className='h-14 md:h-16 w-auto object-contain opacity-90 transition-transform duration-300 hover:scale-105'
              />
            </div>
          </div>
        </div>

        {/* ==== Copyright & Legal ==== */}
        <div className='mt-16 pt-8 border-t border-[var(--border-inverse)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium'>
          <p className='text-sm text-center md:text-left text-[var(--text-1)]'>
            {f?.rights?.replace('{year}', new Date().getFullYear().toString())}
          </p>
          <div className='flex flex-wrap justify-center gap-4 md:gap-6 text-[var(--text-2)] dark:text-[var(--text-white-3)]'>
            <Link
              href={`/${currentLang}/privacidad`}
              className='hover:text-[var(--text-brand)] dark:hover:text-[var(--bg-brand)] transition-colors hover:underline'
            >
              {f?.privacy}
            </Link>
            <Link
              href={`/${currentLang}/terminos`}
              className='hover:text-[var(--text-brand)] dark:hover:text-[var(--bg-brand)] transition-colors hover:underline'
            >
              {f?.terms}
            </Link>
            <Link
              href={`/${currentLang}/devoluciones`}
              className='hover:text-[var(--text-brand)] dark:hover:text-[var(--bg-brand)] transition-colors hover:underline'
            >
              {f?.refunds}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
