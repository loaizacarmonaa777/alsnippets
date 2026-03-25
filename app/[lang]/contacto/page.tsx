import React from 'react'
import ContactForm from '@/components/contacto/ContactForm'
import {
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Github
} from 'lucide-react'
import { getDictionary } from '@/i18n/get-dictionary'
import AccordionSection from '@/components/contacto/AccordionItem'

/* =====================================================
   Página de Contacto - SERVER COMPONENT
   Refactorizada: Se eliminó Accordion y 'use client'
===================================================== */
export default async function ContactoPage ({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as 'es' | 'en')
  const t = (dict as any).contacto.page

  const socialIcons = [
    {
      icon: Instagram,
      name: 'Instagram',
      link: 'https://www.instagram.com/alsnippets/'
    },
    {
      icon: Facebook,
      name: 'Facebook',
      link: 'https://www.facebook.com/alsnippets'
    },
    {
      icon: Youtube,
      name: 'YouTube',
      link: 'https://www.youtube.com/@alcdiseno8805'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/in/adrian-loaiza-carmona-alc/'
    },
    {
      icon: Github,
      name: 'GitHub',
      link: 'https://github.com/loaizacarmonaa777'
    }
  ]

  return (
    <>
      {/* HERO & FORMULARIO */}
      <section className='relative w-full min-h-screen flex items-center justify-center px-5 py-20 overflow-hidden'>
        <div
          className='absolute inset-0 z-0'
          style={{
            backgroundImage: `var(--gradient-hero-contact), url('/images/contact/alsnippets-hero-contact-desktop.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />

        <div className='relative z-10 w-full max-w-[1200px] mx-auto'>
          <div className='pt-30 mb-12 text-center max-w-3xl mx-auto'>
            <h2>
              {t.hero.title_line1} <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-brand)] to-[#e05b02]'>
                {t.hero.title_highlight}
              </span>
            </h2>
            <p className='text-[var(--text-base)] md:text-[var(--h6)] text-[var(--text-2)] opacity-90 max-w-2xl mx-auto mt-4 leading-[var(--leading-normal)]'>
              {t.hero.description}
            </p>

            {/* CONTACTOS EN LÍNEA */}
            <div className='flex flex-wrap justify-center gap-4 mt-8'>
              <a
                href='mailto:contact@alsnippets.com'
                data-cfemail='false'
                className='group flex items-center gap-3 px-5 py-3 rounded-full bg-[var(--bg-menu)] border border-[var(--border-3)] hover:bg-[var(--bg-brand)] hover:border-[var(--border-brand)] transition-all duration-300 hover:scale-105 text-[var(--text-1)] hover:text-[var(--text-brand)]'
              >
                <div className='p-2 rounded-full bg-[var(--bg-brand)] group-hover:bg-[var(--bg-menu)] transition-colors'>
                  <Mail className='w-4 h-4 text-[var(--text-4)] group-hover:text-[var(--text-1)]' />
                </div>
                <div className='flex flex-col items-start'>
                  <span className='text-xs opacity-70 text-[var(--text-1)] group-hover:text-[var(--text-inverse)]'>
                    {t.info.email_label}
                  </span>
                  <span className='text-sm font-semibold text-[var(--text-1)] group-hover:text-[var(--text-inverse)]'>
                    contact@alsnippets.com
                  </span>
                </div>
              </a>

              <a
                href='https://wa.me/573246454061'
                target='_blank'
                rel='noopener noreferrer'
                className='group flex items-center gap-3 px-5 py-3 rounded-full bg-[var(--bg-menu)] border border-[var(--border-3)] hover:bg-[var(--bg-brand)] hover:border-[var(--border-brand)] transition-all duration-300 hover:scale-105 text-[var(--text-1)] hover:text-[var(--text-brand)]'
              >
                <div className='p-2 rounded-full bg-[var(--bg-brand)] group-hover:bg-[var(--bg-menu)] transition-colors'>
                  <MessageCircle className='w-4 h-4 text-[var(--text-4)] group-hover:text-[var(--text-1)]' />
                </div>
                <div className='flex flex-col items-start'>
                  <span className='text-xs opacity-70 text-[var(--text-1)] group-hover:text-[var(--text-inverse)]'>
                    {t.info.whatsapp_label}
                  </span>
                  <span className='text-sm font-semibold text-[var(--text-1)] group-hover:text-[var(--text-inverse)]'>
                    +57 324 645 4061
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* CONTENEDOR DE IMAGEN + FORMULARIO */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[var(--border-1)] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden'>
            <div className='block relative w-full h-auto'>
              <img
                src='/images/contact/adrian-loaiza-contacto.webp'
                alt='Adrián Loaiza'
                className='w-full h-auto object-cover'
              />
            </div>

            <div
              className='p-8 md:p-10 flex flex-col justify-center'
              style={{ background: 'var(--gradient-hero)' }}
            >
              <ContactForm lang={lang} dict={dict.form_contact} />
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN REDES SOCIALES */}
      <section
        className='relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] py-24 px-5 overflow-hidden'
      >
        <div className='relative z-10 max-w-[1200px] mx-auto text-center space-y-10'>
          <h2>{t.social_section.title}</h2>

          <div className='flex flex-wrap justify-center gap-6 md:gap-10'>
            {socialIcons.map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                target='_blank'
                rel='noopener noreferrer'
                className='group flex flex-col items-center gap-3 p-6 w-32 bg-[var(--bg-1)] border border-[var(--border-1)] rounded-2xl hover:-translate-y-2 hover:shadow-2xl hover:border-[var(--border-brand)] transition-all duration-300 backdrop-blur-sm'
              >
                <social.icon className='w-8 h-8 text-[var(--text-2)] group-hover:text-[var(--text-brand)] transition-all duration-300 group-hover:scale-110' />
                <span className='text-sm font-semibold text-[var(--text-2)] group-hover:text-[var(--text-1)]'>
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN FAQ CON ANCLA #faq */}
      <div id='faq'>
        <AccordionSection t={t} />
      </div>
    </>
  )
}
