'use client'
import React from 'react'
import ContactForm from '@/components/contacto/ContactForm'
import {
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Github,
  ChevronDown
} from 'lucide-react'
import { getDictionary } from '@/i18n/get-dictionary'
import LocationPopup from '@/components/contacto/LocationPopup'

/* =====================================================
   COMPONENTE AUXILIAR: Accordion Suave (Blindado)
   Este componente puede ser 'use client' porque tiene interactividad
===================================================== */
const AccordionItem = ({
  question,
  answer
}: {
  question: string
  answer: string
}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className='border border-[var(--border-1)] bg-[var(--bg-1)] rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:border-[var(--border-brand)]/50'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full flex justify-between items-center p-5 text-left font-semibold text-[var(--text-1)] hover:text-[var(--text-brand)] transition-colors'
      >
        <span>{question}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen
              ? 'rotate-180 text-[var(--text-brand)]'
              : 'text-[var(--text-2)]'
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
   Página de Contacto - LIMPIA (Server Component)
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
        {/* Fondo oscuro con imagen */}
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
          {/* TÍTULO Y CONTACTOS (FUERA DEL RECUADRO) */}
          <div className='pt-30 mb-12 text-center max-w-3xl mx-auto'>
            <h2 className='text-[var(--h1)] font-black tracking-tighter leading-[var(--leading-tight)] text-[var(--text-1)]'>
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
              {/* email */}
              <a
                href='mailto:contact@alsnippets.com'
                className='group flex items-center gap-3 px-5 py-3 rounded-full bg-[var(--bg-brand)] border border-[var(--bg-brand)] hover:bg-[var(--bg-brand)]/10 hover:border-[var(--border-brand)] transition-all duration-300 hover:scale-105 text-[var(--text-inverse)] hover:text-[var(--text-1)] dark:text-[var(--text-inverse)]'
              >
                <div className='p-2 rounded-full bg-white group-hover:bg-[var(--bg-brand)]/20 transition-colors'>
                  <Mail className='w-4 h-4 text-[var(--bg-brand)] group-hover:text-[var(--bg-1)]' />
                </div>
                <div className='flex flex-col items-start'>
                  <span className='text-xs opacity-70 text-[var(--text-inverse)] group-hover:text-[var(--text-2)]'>
                    {t.info.email_label}
                  </span>
                  <span className='text-sm font-semibold text-[var(--text-inverse)] group-hover:text-[var(--text-1)]'>
                    contact@alsnippets.com
                  </span>
                </div>
              </a>

              {/* whatsapp */}
              <a
                href='https://wa.me/573246454061'
                target='_blank'
                rel='noopener noreferrer'
                className='group flex items-center gap-3 px-5 py-3 rounded-full bg-[#25D366] border border-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]/30 transition-all duration-300 hover:scale-105 text-white hover:text-[var(--text-1)] dark:text-white'
              >
                <div className='p-2 rounded-full bg-white group-hover:bg-[#25D366]/20 transition-colors'>
                  <MessageCircle className='w-4 h-4 text-[#25D366] group-hover:text-[#25D366]' />
                </div>
                <div className='flex flex-col items-start'>
                  <span className='text-xs opacity-70 text-white group-hover:text-[var(--text-2)]'>
                    {t.info.whatsapp_label}
                  </span>
                  <span className='text-sm font-semibold text-white group-hover:text-[var(--text-1)]'>
                    +57 324 645 4061
                  </span>
                </div>
              </a>

              {/* ubicación */}
              <LocationPopup
                label={t.info.location_label}
                viewText={t.info.view_location}
                locationValue={t.info.location_value} // 👈 NUEVO
                mapButtonText={t.info.map_button_text} // 👈 NUEVO
              />
            </div>
          </div>

          {/* CONTENEDOR DE IMAGEN + FORMULARIO */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[var(--border-1)] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden'>
            {/* IMAGEN DE ADRIÁN (LADO IZQUIERDO) */}
            <div className='block relative w-full h-auto'>
              <img
                src='/images/contact/adrian-loaiza-contacto.webp'
                alt='Adrián Loaiza'
                className='w-full h-auto object-cover'
              />
            </div>

            {/* FORMULARIO (LADO DERECHO) */}
            <div
              className='p-8 md:p-10 flex flex-col justify-center'
              style={{ background: 'var(--gradient-hero)' }}
            >
              {/* Se inyecta la sección específica del diccionario para el formulario */}
              <ContactForm lang={lang} dict={dict.form_contact} />
            </div>
          </div>
        </div>
      </section>

      <section className='max-w-[1200px] mx-auto px-5 py-24'>
        <div className='text-center space-y-10'>
          <h2>{t.social_section.title}</h2>
          <div className='flex flex-wrap justify-center gap-6 md:gap-10'>
            {socialIcons.map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                target='_blank'
                rel='noopener noreferrer'
                className='group flex flex-col items-center gap-3 p-6 w-32 bg-[var(--bg-1)] border border-[var(--border-1)] rounded-2xl hover:-translate-y-2 hover:shadow-xl hover:border-[var(--border-brand)]/50 transition-all duration-300'
              >
                <social.icon className='w-8 h-8 text-[var(--text-2)] group-hover:text-[var(--text-brand)] transition-colors duration-300 group-hover:scale-110' />
                <span className='text-sm font-semibold text-[var(--text-2)] group-hover:text-[var(--text-1)]'>
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        id='faq'
        className='relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] py-24 px-5 border-t border-[var(--border-1)] !my-0'
        style={{ background: 'var(--gradient-hero)' }}
      >
        <div className='max-w-3xl mx-auto space-y-10'>
          <div className='text-center space-y-4'>
            <h2>{t.faq_section.title}</h2>
            <p className='opacity-80'>{t.faq_section.description}</p>
          </div>

          <div className='space-y-4'>
            {t.faq_section.items.map((faq: any, index: number) => (
              <AccordionItem key={index} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
