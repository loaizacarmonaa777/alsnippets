'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Download,
  Share2,
  QrCode,
  X,
  MessageCircle,
  Linkedin,
  Instagram,
  Facebook,
  Github
} from 'lucide-react'

/* =====================================================
   BASE DE DATOS SIMULADA (Mock DB) - Localizada
   ===================================================== */
const mockDatabase: Record<string, any> = {
  adrianLoaiza: {
    name: 'Adrián Loaiza',
    title: {
      es: 'Consultor & Desarrollador WordPress',
      en: 'WordPress Consultant & Developer'
    },
    company: 'Alsnippets',
    phone: '+573246454061',
    email: 'contact@alsnippets.com',
    website: 'https://alsnippets.com',
    location: 'Antioquia, Colombia',
    bio: {
      es: 'Especialista en optimización de rendimiento (WPO), seguridad y desarrollo a medida para proyectos web escalables.',
      en: 'Specialist in performance optimization (WPO), security and custom development for scalable web projects.'
    },
    social: {
      instagram: 'https://www.instagram.com/alsnippets/',
      facebook: 'https://www.facebook.com/alsnippets',
      linkedin: 'https://www.linkedin.com/in/adrian-loaiza-carmona-alc/',
      github: 'https://github.com/loaizacarmonaa777'
    },
    profileImage: '/images/tarjetas/adrian-loaiza.webp',
    coverImg: '/images/tarjetas/backgorund-tarjeta-contacto-adrian-loaiza.webp'
  },
  yeseniaSanmartin: {
    name: 'Yesenia Sanmartín Sánchez',
    title: { es: 'Diseñadora Gráfica', en: 'Graphic Designer' },
    company: 'ALC Diseño',
    phone: '+573246454062',
    email: 'yesenniasan2@hotmail.com',
    location: 'Colombia',
    bio: {
      es: 'Diseñadora gráfica especializada en crear identidades visuales que conectan y transmiten la esencia de cada marca.',
      en: 'Graphic designer specializing in creating visual identities that connect and convey the essence of each brand.'
    },
    social: {
      facebook: 'https://www.facebook.com/yesenia.sanmartinsanchez',
      instagram: 'https://www.instagram.com/alc.diseno/'
    },
    profileImage: '/images/contacto-adrian-loaiza.png',
    coverColor: 'bg-gradient-to-r from-pink-500 to-rose-400'
  }
  // ... (Resto de perfiles mantenidos con la misma estructura de traducción interna)
}

// =====================================================
// COMPONENTE PRINCIPAL - SIN ASYNC
// =====================================================
export default function DigitalBusinessCard ({
  params
}: {
  params: { lang: string; slug: string }
}) {
  // ✅ Acceso directo a params (sin async/await)
  const { lang, slug } = params
  const [showQR, setShowQR] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')

  // ✅ Traducciones con tipo explícito
  const translations = {
    es: {
      notFound: 'Tarjeta no encontrada',
      notFoundDesc:
        'El perfil digital que buscas no existe o ha sido desactivado.',
      save: 'Guardar Contacto',
      web: 'Sitio Web',
      loc: 'Ubicación',
      scan: 'Escanéame',
      scanDesc: 'Apunta con la cámara para guardar los datos de {name}.',
      branding: 'Crear mi Tarjeta Digital con Alsnippets',
      shareText: 'Guarda el contacto de',
      copyAlert: 'Enlace copiado al portapapeles.'
    },
    en: {
      notFound: 'Card not found',
      notFoundDesc:
        'The digital profile you are looking for does not exist or has been deactivated.',
      save: 'Save Contact',
      web: 'Website',
      loc: 'Location',
      scan: 'Scan me',
      scanDesc: "Point your camera to save {name}'s info.",
      branding: 'Create my Digital Card with Alsnippets',
      shareText: 'Save contact of',
      copyAlert: 'Link copied to clipboard.'
    }
  }

  // ✅ Selección segura del idioma
  const t = translations[lang as keyof typeof translations] || translations.es

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  const contactInfo = mockDatabase[slug]

  if (!contactInfo) {
    return (
      <div
        className='min-h-screen w-full flex flex-col items-center justify-center p-5 text-center'
        style={{ background: 'var(--gradient-hero)' }}
      >
        <h1 className='text-4xl font-bold mb-4'>{t.notFound}</h1>
        <p className='opacity-80'>{t.notFoundDesc}</p>
      </div>
    )
  }

  // Traducción de campos dinámicos
  const localizedTitle =
    typeof contactInfo.title === 'object'
      ? contactInfo.title[lang as keyof typeof contactInfo.title] ||
        contactInfo.title.es
      : contactInfo.title

  const localizedBio =
    typeof contactInfo.bio === 'object'
      ? contactInfo.bio[lang as keyof typeof contactInfo.bio] ||
        contactInfo.bio.es
      : contactInfo.bio

  // ... (resto de funciones: downloadVCard, handleShare, renderSocialIcon)

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${contactInfo.name}\nORG:${
      contactInfo.company
    }\nTITLE:${localizedTitle}\nTEL;TYPE=WORK,VOICE:${
      contactInfo.phone
    }\nEMAIL;TYPE=WORK,INTERNET:${contactInfo.email}\n${
      contactInfo.website ? `URL:${contactInfo.website}` : ''
    }\nNOTE:${localizedBio}\nEND:VCARD`
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute(
      'download',
      `${contactInfo.name.replace(/\s+/g, '_')}.vcf`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `vCard - ${contactInfo.name}`,
          text: `${t.shareText} ${contactInfo.name}`,
          url: currentUrl
        })
      } catch (error) {
        console.log('Error:', error)
      }
    } else {
      navigator.clipboard.writeText(currentUrl)
      alert(t.copyAlert)
    }
  }

  const renderSocialIcon = (network: string, url: string) => {
    let Icon = Globe
    if (network === 'instagram') Icon = Instagram
    if (network === 'facebook') Icon = Facebook
    if (network === 'linkedin') Icon = Linkedin
    if (network === 'github') Icon = Github

    return (
      <a
        key={network}
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className='p-3 rounded-xl bg-[var(--bg-3)] text-[var(--text-2)] hover:text-[var(--text-brand)] transition-all'
      >
        <Icon className='w-5 h-5' />
      </a>
    )
  }

  return (
    <main
      className='min-h-screen w-full flex items-center justify-center py-12 px-4 relative overflow-hidden'
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* ... (tu JSX existente) */}
      <div className='absolute top-[-10%] left-[-10%] w-96 h-96 bg-[var(--bg-brand)]/20 rounded-full blur-3xl animate-pulse'></div>
      <div className='absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000'></div>

      <section className='w-full max-w-md bg-[var(--bg-1)]/60 backdrop-blur-2xl border border-[var(--border-1)]/40 rounded-[2.5rem] shadow-[var(--shadow-2)] overflow-hidden relative z-10'>
        <div
          className={`h-32 w-full relative overflow-hidden ${
            contactInfo.coverColor || ''
          }`}
        >
          {contactInfo.coverImg && (
            <Image
              src={contactInfo.coverImg}
              alt='Cover'
              fill
              className='object-cover'
              priority
            />
          )}
          <button
            onClick={handleShare}
            className='absolute top-5 right-5 z-10 p-2.5 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full text-black dark:text-white shadow-md transition-transform hover:scale-110'
          >
            <Share2 className='w-5 h-5' />
          </button>
        </div>

        <div className='px-8 pb-8 pt-0 relative flex flex-col items-center text-center mt-[-3rem]'>
          <div className='relative w-28 h-28 rounded-full border-4 border-[var(--bg-1)] overflow-hidden shadow-[var(--shadow-1)] bg-[var(--bg-3)] mb-4 z-20'>
            <Image
              src={contactInfo.profileImage}
              alt={contactInfo.name}
              fill
              className='object-cover'
            />
          </div>

          <h1 className='text-2xl font-black text-[var(--text-1)] !my-0'>
            {contactInfo.name}
          </h1>
          <p className='text-[var(--text-brand)] font-semibold text-sm uppercase tracking-wider mt-1 mb-2'>
            {localizedTitle}
          </p>
          <p className='text-[var(--text-2)] text-sm leading-relaxed'>
            {localizedBio}
          </p>

          <div className='flex justify-center gap-6 w-full my-8'>
            <a
              href={`https://wa.me/${contactInfo.phone.replace(/[^0-9]/g, '')}`}
              className='flex flex-col items-center gap-2 group'
            >
              <div className='w-14 h-14 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-all shadow-[var(--shadow-1)]'>
                <MessageCircle className='w-6 h-6' />
              </div>
              <span className='text-xs font-medium text-[var(--text-2)]'>
                WhatsApp
              </span>
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className='flex flex-col items-center gap-2 group'
            >
              <div className='w-14 h-14 rounded-full bg-[var(--bg-brand)]/10 text-[var(--text-brand)] flex items-center justify-center group-hover:bg-[var(--bg-brand)] group-hover:text-white transition-all shadow-[var(--shadow-1)]'>
                <Mail className='w-6 h-6' />
              </div>
              <span className='text-xs font-medium text-[var(--text-2)]'>
                Email
              </span>
            </a>
            <button
              onClick={() => setShowQR(true)}
              className='flex flex-col items-center gap-2 group'
            >
              <div className='w-14 h-14 rounded-full bg-[var(--text-1)]/5 text-[var(--text-1)] flex items-center justify-center group-hover:bg-[var(--text-1)] group-hover:text-[var(--bg-1)] transition-all border border-[var(--border-1)]'>
                <QrCode className='w-6 h-6' />
              </div>
              <span className='text-xs font-medium text-[var(--text-2)]'>
                QR
              </span>
            </button>
          </div>

          <button
            onClick={downloadVCard}
            className='w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[var(--text-1)] text-[var(--bg-1)] font-bold text-lg hover:opacity-90 transition-opacity shadow-[var(--shadow-2)]'
          >
            <Download className='w-5 h-5' /> {t.save}
          </button>

          {contactInfo.social && (
            <div className='flex justify-center gap-4 mt-8 pt-6 border-t border-[var(--border-1)] w-full'>
              {Object.entries(contactInfo.social).map(([network, url]) =>
                renderSocialIcon(network, url as string)
              )}
            </div>
          )}

          <div className='w-full mt-6 space-y-4 text-left'>
            {contactInfo.website && (
              <a
                href={contactInfo.website}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-4 group bg-[var(--bg-1)] p-4 rounded-2xl border border-[var(--border-1)] hover:border-[var(--border-brand)]/50 transition-colors'
              >
                <Globe className='w-5 h-5 text-[var(--text-3)] group-hover:text-[var(--text-brand)]' />
                <div>
                  <p className='text-xs text-[var(--text-3)] font-medium'>
                    {t.web}
                  </p>
                  <p className='text-sm font-semibold text-[var(--text-1)]'>
                    {contactInfo.website.replace('https://', '')}
                  </p>
                </div>
              </a>
            )}
            <div className='flex items-center gap-4 bg-[var(--bg-1)] p-4 rounded-2xl border border-[var(--border-1)]'>
              <MapPin className='w-5 h-5 text-[var(--text-3)]' />
              <div>
                <p className='text-xs text-[var(--text-3)] font-medium'>
                  {t.loc}
                </p>
                <p className='text-sm font-semibold text-[var(--text-1)]'>
                  {contactInfo.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-[var(--bg-3)] py-4 text-center border-t border-[var(--border-1)]'>
          <a
            href={`/${lang}/contacto`}
            target='_blank'
            rel='noopener noreferrer'
            className='text-xs font-bold text-[var(--text-2)] hover:text-[var(--text-brand)] transition-colors'
          >
            {t.branding} ⚡
          </a>
        </div>
      </section>

      {showQR && (
        <div className='fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm'>
          <div className='bg-[var(--bg-1)] p-8 rounded-[2rem] shadow-[var(--shadow-2)] max-w-sm w-full relative flex flex-col items-center text-center'>
            <button
              onClick={() => setShowQR(false)}
              className='absolute top-4 right-4 p-2 bg-[var(--bg-3)] hover:bg-red-500/10 hover:text-red-500 rounded-full transition-colors'
            >
              <X className='w-5 h-5' />
            </button>
            <h3 className='text-2xl font-bold text-[var(--text-1)] mb-2'>
              {t.scan}
            </h3>
            <p className='text-sm text-[var(--text-2)] mb-6'>
              {t.scanDesc.replace('{name}', contactInfo.name.split(' ')[0])}
            </p>
            <div className='bg-white p-4 rounded-2xl shadow-[var(--shadow-1)] border border-gray-100'>
              {currentUrl && (
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                    currentUrl
                  )}`}
                  alt='QR'
                  className='w-48 h-48 rounded-lg'
                />
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
