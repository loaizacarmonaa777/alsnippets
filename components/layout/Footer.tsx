import Link from 'next/link'
import SocialIcon from '@/components/icons/SocialIcon'
import { SOCIAL_LINKS } from '@/components/icons/social.config'
import MailIcon from '@/components/icons/MailIcon'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon'
import WebIcon from '@/components/icons/WebIcon'
import PinIcon from '@/components/icons/PinIcon'
import SunIcon from '@/components/icons/SunIcon'
import MoonIcon from '@/components/icons/MoonIcon'

/* =====================================================
   Footer — Alsnippets
   ===================================================== */

export default function Footer () {
  return (
    <footer
      className='relative w-full mt-0 pt-16 pb-8'
      style={{
        background: 'var(--bg-footer)',
        // CAMBIO GLOBAL: Aplicamos el color aquí para que se herede en todo el footer
        color: 'var(--text-white2)'
      }}
    >
      {/* =====================================================
          Contenedor principal
          ===================================================== */}
      <div className='container mx-auto px-6 max-w-[1200px]'>
        {/* =====================================================
            Grid principal (3 Columnas)
            ===================================================== */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16'>
          {/* COLUMNA 1 — Branding & contacto */}
          <div className='flex flex-col items-center md:items-start space-y-6 text-base md:text-sm'>
            {/* Logo */}
            <img
              src='/brand/logo-dark-eslogan-es.svg'
              alt='Alsnippets'
              className='h-16 w-auto'
            />

            {/* Datos de contacto */}
            {/* Nota: Al quitar clases de color específicas, heredan --text-white2 del padre */}
            <ul className='space-y-4 w-full'>
              <li>
                <a
                  href='mailto:contact@alsnippets.com'
                  className='flex items-center justify-center md:justify-start gap-3 group hover:text-[var(--brand-primary)] transition-colors'
                >
                  <MailIcon className='w-5 h-5' />
                  <span className='group-hover:translate-x-1 transition-transform'>
                    contact@alsnippets.com
                  </span>
                </a>
              </li>

              <li>
                <a
                  href={`https://wa.me/573246454061?text=${encodeURIComponent(
                    'Hola, gracias por dar clic en el número de teléfono...'
                  )}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center justify-center md:justify-start gap-3 group hover:text-[var(--brand-primary)] transition-colors'
                >
                  <WhatsAppIcon className='w-5 h-5' />
                  <span className='group-hover:translate-x-1 transition-transform'>
                    (+57 324 645 4061)
                  </span>
                </a>
              </li>

              <li>
                <a
                  href='https://alsnippets.com'
                  className='flex items-center justify-center md:justify-start gap-3 group hover:text-[var(--brand-primary)] transition-colors'
                >
                  <WebIcon className='w-5 h-5' />
                  <span className='group-hover:translate-x-1 transition-transform'>
                    alsnippets.com
                  </span>
                </a>
              </li>

              <li className='flex items-start justify-center md:justify-start gap-3'>
                <PinIcon className='w-5 h-5 mt-1 text-[var(--brand-primary)]' />
                <span className='leading-tight'>
                  Carrera 50A Santander, Santa Bárbara
                  <br />
                  <span className='opacity-70 text-xs'>
                    Antioquia - Colombia
                  </span>
                </span>
              </li>
            </ul>

            {/* Theme Switcher & Social */}
            <div className='pt-4 flex flex-col items-center md:items-start gap-4 w-full'>
              {/* Theme Buttons */}
              <div className='flex gap-3'>
                <button
                  type='button'
                  data-theme='light'
                  aria-label='Activar modo claro'
                  className='p-2 rounded-full hover:bg-white/10 hover:text-[var(--brand-primary)] transition-all'
                >
                  <SunIcon className='w-6 h-6' />
                </button>
                <button
                  type='button'
                  data-theme='dark'
                  aria-label='Activar modo oscuro'
                  className='p-2 rounded-full hover:bg-white/10 hover:text-[var(--brand-primary)] transition-all'
                >
                  <MoonIcon className='w-6 h-6' />
                </button>
              </div>

              {/* Redes Sociales */}
              <div className='flex gap-4'>
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <SocialIcon key={label} href={href} label={label}>
                    <Icon />
                  </SocialIcon>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMNA 2 — Enlaces (Card style) */}
          <div
            className='
            bg-white/5 backdrop-blur-md 
            border border-white/10 rounded-2xl 
            p-8 shadow-lg
          '
          >
            <h4 className='text-lg font-bold mb-6 text-center md:text-left text-[var(--brand-primary)]'>
              Enlaces de interés
            </h4>

            <div className='grid grid-cols-2 gap-4 text-sm'>
              {/* Usamos text-[var(--text-white2)] explícitamente o herencia */}
              <ul className='space-y-3'>
                <li>
                  <Link
                    href='/sobre-mi'
                    className='hover:text-[var(--brand-primary)] transition-colors'
                  >
                    Sobre mí
                  </Link>
                </li>
                <li>
                  <Link
                    href='/precios'
                    className='hover:text-[var(--brand-primary)] transition-colors'
                  >
                    Precios
                  </Link>
                </li>
                <li>
                  <Link
                    href='/blog'
                    className='hover:text-[var(--brand-primary)] transition-colors'
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href='/servicios/soporte-mantenimiento-wordpress'
                    className='hover:text-[var(--brand-primary)] transition-colors'
                  >
                    Soporte
                  </Link>
                </li>
                <li>
                  <Link
                    href='/servicios/seguridad-limpieza'
                    className='hover:text-[var(--brand-primary)] transition-colors'
                  >
                    Seguridad
                  </Link>
                </li>
              </ul>

              <ul className='space-y-3'>
                <li>
                  <Link
                    href='/servicios/optimizacion-rendimiento'
                    className='hover:text-[var(--brand-primary)] transition-colors'
                  >
                    Optimización
                  </Link>
                </li>
                <li>
                  <Link
                    href='/servicios/seo-geo'
                    className='hover:text-[var(--brand-primary)] transition-colors'
                  >
                    SEO & GEO
                  </Link>
                </li>
                <li>
                  <Link
                    href='/proyectos/mis-creaciones'
                    className='hover:text-[var(--brand-primary)] transition-colors'
                  >
                    Creaciones
                  </Link>
                </li>
                <li>
                  <Link
                    href='/qr'
                    className='hover:text-[var(--brand-primary)] transition-colors'
                  >
                    QR personal
                  </Link>
                </li>
                <li>
                  <Link
                    href='/contacto#faq'
                    className='hover:text-[var(--brand-primary)] transition-colors'
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* BOTONES CON HOVER ELEGANTE */}
            <div className='mt-8 flex flex-col items-center gap-4 w-full'>
              {/* 1. Botón Auditoría */}
              <Link href='/auditoria' className='w-full group'>
                <button
                  className='
                    relative w-full py-3 rounded-full 
                    bg-[var(--brand-primary)] 
                    text-[var(--text-white2)] font-bold 
                    shadow-md
                    overflow-hidden
                    transition-all duration-300 ease-out
                    
                    /* HOVER */
                    group-hover:-translate-y-1 
                    group-hover:shadow-[0_10px_20px_-5px_rgba(255,255,255,0.4)]
                    group-hover:brightness-110
                    
                    /* ACTIVE */
                    active:scale-95
                  '
                >
                  <span className='relative z-10 flex items-center justify-center gap-2'>
                    Auditoría
                    <svg
                      className='w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M14 5l7 7m0 0l-7 7m7-7H3'
                      />
                    </svg>
                  </span>
                </button>
              </Link>

              {/* 2. Botón Contacto */}
              <Link href='/contacto' className='w-full group'>
                <button
                  className='
                    w-full py-3 rounded-full 
                    border border-white/20 
                    text-[var(--text-white2)] font-medium
                    bg-transparent
                    
                    transition-all duration-300 ease-out
                    
                    /* HOVER */
                    group-hover:border-[var(--text-white2)]/60
                    group-hover:bg-white/5 
                    group-hover:tracking-wider
                    group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]
                  '
                >
                  Contacto
                </button>
              </Link>
            </div>
          </div>

          {/* COLUMNA 3 — Newsletter (Card style) */}
          <div
            className='
            bg-white/5 backdrop-blur-md 
            border border-white/10 rounded-2xl 
            p-8 shadow-lg
            flex flex-col
          '
          >
            <h4 className='text-lg font-bold mb-6 text-center md:text-left text-[var(--brand-primary)]'>
              Suscríbete al boletín
            </h4>

            {/* Newsletter Input (RESTAURADO) */}
            <div className='flex mb-6 shadow-[0_12px_32px_rgba(0,0,0,0.25)]'>
              <input
                type='email'
                placeholder='Ingresa tu correo@'
                className='
                  w-[70%]
                  px-5 py-3
                  border
                  border-r-0
                  border-[var(--brand-primary)]
                  bg-transparent
                  outline-none
                  flex items-center
                  text-[var(--text-white2)] placeholder-[var(--text-white2)]/50
                '
              />

              <button
                type='submit'
                className='button-send text-[var(--text-white2)]'
              >
                <div className='svg-wrapper-1'>
                  <div className='svg-wrapper'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      width='20'
                      height='20'
                      aria-hidden='true'
                    >
                      <path fill='none' d='M0 0h24v24H0z' />
                      <path
                        fill='currentColor'
                        d='M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z'
                      />
                    </svg>
                  </div>
                </div>
                <span>Enviar</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className='text-base space-y-3 opacity-90 text-center md:text-left flex-grow'>
              <p className='font-medium'>Trabajo WordPress profesional.</p>
              <ul className='space-y-1.5 text-base opacity-80'>
                <li>✔️ +6 años de experiencia</li>
                <li>✔️ Optimización real</li>
                <li>✔️ Soporte humano directo</li>
              </ul>
            </div>

            {/* Pagos */}
            <div
              className='
                mt-6 
                flex justify-center md:justify-start 
                p-4 
                rounded-xl 
                bg-[var(--bg-secondary)]
              '
            >
              <img
                src='/images/footer/formas-de-pago-para-alsnippets.webp'
                alt='Formas de pago'
                className='h-22 w-auto opacity-90 hover:opacity-100 transition-opacity'
              />
            </div>
          </div>
        </div>

        {/* =====================================================
            Copyright & Legal
            ===================================================== */}
        <div className='mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs opacity-70'>
          <p className='text-sm'>
            © 2023 - {new Date().getFullYear()} Alsnippets. Todos los derechos
            reservados | Un corazón, una mente, Alsnippets.
          </p>

          <div className='flex gap-6'>
            <Link
              href='/privacidad'
              className='hover:text-[var(--brand-primary)] hover:underline'
            >
              Privacidad 
            </Link>
            <Link
              href='/terminos'
              className='hover:text-[var(--brand-primary)] hover:underline'
            >
              Términos
            </Link>
            <Link
              href='/devoluciones'
              className='hover:text-[var(--brand-primary)] hover:underline'
            >
              Devoluciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
