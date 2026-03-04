import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/hero/PageHero';
import GlassCTA from '@/components/ui/GlassCTA';
import { ExternalLink, Wrench, Zap, Globe, Shield, Code, Settings } from 'lucide-react';

/* =====================================================
   DATA: Proyectos de Portafolio
===================================================== */
const creations = [
  {
    title: 'Transcendent Psychology',
    url: 'https://transcendentpsychology.com/',
    type: 'Optimización y Creación',
    description: 'Plataforma internacional multilingüe con sistema de reservas avanzado y e-commerce.',
    features: ['WordPress', 'Elementor PRO', 'WPML (5 Idiomas)', 'WooCommerce', 'Modern Events Calendar', 'Seguridad y Caché', 'Diseño UI/UX'],
    image: '/images/casos-exito/transcendent-psychology.webp'
  },
  {
    title: 'Inner Mastery Europa',
    url: 'https://innermastery.eu/',
    type: 'Creación y Desarrollo Custom',
    description: 'Portal europeo con lógica PHP a medida para selectores de precios dinámicos y descuentos por fechas.',
    features: ['WordPress', 'Divi Pro', 'PHP Custom', 'WooCommerce', 'MEC Calendar', 'Backups de Seguridad', 'WPO Optimizado', 'SEO', 'Diseño UI/UX', 'Acceso Panel Administrativo', 'Plesk'],
    image: '/images/casos-exito/inner-mastery-europe.webp'
  },
  {
    title: 'Inner Mastery España',
    url: 'https://innermastery.es/',
    type: 'Creación',
    description: 'Versión española del portal de reservas con integraciones personalizadas de pago.',
    features: ['WordPress', 'Divi Pro', 'PHP Custom', 'WooCommerce', 'MEC Calendar', 'Backups de Seguridad', 'WPO Optimizado', 'SEO', 'Diseño UI/UX', 'Acceso Panel Administrativo', 'Plesk'],
    image: '/images/casos-exito/inner-mastery-spain.webp'
  },
  {
    title: 'Inner Mastery Italia',
    url: 'https://innermastery.it/',
    type: 'Creación',
    description: 'Plataforma oficial para Italia con sistema de reservas y calendario de eventos localizados.',
    features: ['WordPress', 'Divi Pro', 'PHP Custom', 'WooCommerce', 'MEC Calendar', 'Backups de Seguridad', 'WPO Optimizado', 'SEO', 'Diseño UI/UX', 'Acceso Panel Administrativo', 'Plesk'],
    image: '/images/casos-exito/inner-mastery-italy.webp'
  },
  {
    title: 'Inner Mastery Alemania',
    url: 'https://deutsch.innermastery.eu/',
    type: 'Creación',
    description: 'Despliegue de infraestructura y plataforma de reservas para el mercado alemán.',
    features: ['WordPress', 'Divi Pro', 'PHP Custom', 'WooCommerce', 'MEC Calendar', 'Backups de Seguridad', 'WPO Optimizado', 'SEO', 'Diseño UI/UX', 'Acceso Panel Administrativo', 'Plesk'],
    image: '/images/casos-exito/inner-mastery-germany.webp'
  },
  {
    title: 'Inner Mastery Suiza',
    url: 'https://swiss.innermastery.eu/',
    type: 'Creación Multilingüe',
    description: 'Portal suizo con soporte multi-idioma y lógica de precios dinámica.',
    features: ['WordPress', 'Divi Pro', 'PHP Custom', 'WooCommerce', 'MEC Calendar', 'Backups de Seguridad', 'WPO Optimizado', 'SEO', 'Diseño UI/UX', 'Acceso Panel Administrativo', 'Plesk'],
    image: '/images/casos-exito/inner-mastery-switzerland.webp'
  },
  {
    title: 'Inneos Evolution',
    url: 'https://inneosevolution.org/',
    type: 'Creación',
    description: 'Sitio corporativo con integración de e-commerce y gestión de eventos.',
    features: ['WordPress', 'Divi Pro', 'PHP Custom', 'WooCommerce', 'MEC Calendar', 'Backups de Seguridad', 'WPO Optimizado', 'SEO', 'Diseño UI/UX', 'Acceso Panel Administrativo', 'SiteGround'],
    image: '/images/casos-exito/inneos-evolution.webp'
  },
  {
    title: 'Kintsugi Salud y Bienestar',
    url: 'https://kintsuguisaludybienestar.com/',
    type: 'Creación',
    description: 'Plataforma para futura escuela online con blog y tienda integrada.',
    features: ['Iconos', 'Logos', 'Imágenes', 'WordPress', 'WooCommerce', 'Blog', 'Diseño UI/UX', 'Backups de Seguridad', 'Configuración Servidor', 'Acceso Panel Administrativo', 'SiteGround'],
    image: '/images/casos-exito/kintsugi-salud-y-bienestar.webp'
  },
  {
    title: 'Business Ecard',
    url: 'https://eb-cards.com/webEbCards/',
    type: 'Desarrollo Nativo',
    description: 'Desarrollo de tarjetas de presentación digitales de alto rendimiento.',
    features: ['Iconos', 'Logos', 'Imágenes', 'HTML5', 'CSS3', 'JS', 'WPO Extremo', 'WPO Optimizado', 'SEO', 'Diseño UI/UX', 'Servidor nginx'],
    image: '/images/casos-exito/ebcards.webp'
  }
];

const optimizations = [
  {
    title: 'EDESO',
    url: 'https://edeso.gov.co/',
    type: 'Seguridad y Rendimiento',
    description: 'Entidad gubernamental. Limpieza profunda de malware (Japanese Keyword Hack), migración de servidor y optimización WPO.',
    features: ['Limpieza Malware', 'Migración Servidor', 'WPO', 'WPBakery', 'Backups de Seguridad', 'Actualización controlada', 'cPanel'],
    image: '/images/casos-exito/edeso.webp'
  },
  {
    title: 'VIVA (Empresa de Vivienda de Antioquia)',
    url: 'https://viva.gov.co/',
    type: 'Auditoría y SEO',
    description: 'Entidad gubernamental. Implementación técnica SEO durante 3 meses, optimización de caché y arquitectura web.',
    features: ['SEO Técnico', 'Optimización Servidor', 'WPO', 'WPBakery', 'Backups de Seguridad', 'Actualización controlada', 'cPanel'],
    image: '/images/casos-exito/viva-empresa-vivienda-de-antioquia.webp'
  },
  {
    title: 'Sanaya Ancestral Wellness',
    url: 'https://sanayawellness.com/',
    type: 'WPO y Rendimiento',
    description: 'Optimización extrema de imágenes, configuración avanzada de caché y mantenimiento de servidor.',
    features: ['Caché de Objetos', 'WP Translate (2 idiomas)', 'Elementor Pro', 'Backups de Seguridad', 'Actualización controlada', 'Backups de Seguridad'],
    image: '/images/casos-exito/sanaya-ancestal-wellness.webp'
  },
  {
    title: '4R Soluciones Ambientales',
    url: 'https://www.4rsoluciones.co/',
    type: 'Mantenimiento Técnico',
    description: 'Intervención técnica para mejora de rendimiento y actualización de infraestructura base.',
    features: ['WPO', 'WPBakery', 'Backups de Seguridad', 'Actualización controlada', 'cPanel'],
    image: '/images/casos-exito/alianza-oriente-sostenible-aos.webp'
  },
  {
    title: 'AOS Alianza Oriente Sostenible',
    url: 'https://proyectoaos.com/',
    type: 'Optimización Servidor',
    description: 'Afinamiento de caché de página y objetos, junto con actualizaciones controladas del core.',
    features: ['WPO', 'Seguridad', 'Backups de Seguridad', 'Actualización controlada', 'cPanel'],
    image: '/images/casos-exito/4r-soluciones.webp'
  }
];

/* =====================================================
   COMPONENTE AUXILIAR: Tarjeta de Proyecto
===================================================== */
const ProjectCard = ({ project }: { project: any }) => (
  <div className="group flex flex-col bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[var(--brand-primary)]/40 transition-all duration-300">
    
    {/* Imagen y Overlay */}
    <div className="relative h-56 w-full overflow-hidden bg-[var(--bg-tertiary)]">
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
      <Image
        src={project.image}
        alt={`Mockup del proyecto ${project.title}`}
        fill
        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute top-4 left-4 z-20">
        <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/10 uppercase tracking-wider">
          {project.type}
        </span>
      </div>
    </div>

    {/* Contenido */}
    <div className="flex flex-col flex-grow p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="!my-0 text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2">
          {project.title}
        </h3>
        <a 
          href={project.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 bg-[var(--bg-tertiary)] hover:bg-[var(--brand-primary)] hover:text-white rounded-full transition-colors shrink-0 ml-3 text-[var(--text-secondary)]"
          aria-label={`Visitar ${project.title}`}
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      
      <p className="text-[var(--text-secondary)] text-sm mb-6 flex-grow">
        {project.description}
      </p>

      {/* Badges Técnicos */}
      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[var(--border-subtle)]">
        {project.features.map((feature: string, idx: number) => (
          <span key={idx} className="flex items-center text-xs px-2.5 py-1 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-subtle)]">
            {feature}
          </span>
        ))}
      </div>
    </div>
  </div>
);


/* =====================================================
   PÁGINA PRINCIPAL
===================================================== */
export default function CasosDeExitoPage() {
  return (
    <>
      <PageHero
        title="Casos de éxito"
        subtitle="Sitios web y proyectos reales en los que he trabajado, optimizado o acompañado técnicamente a nivel internacional."
        image="/images/hero/hero-casos-exito.webp"
      />

      <main className="w-full max-w-[1200px] mx-auto px-5 pt-20 pb-0 space-y-32">
        
        {/* INTRODUCCIÓN */}
        <section className="max-w-3xl mx-auto">
          <p className="text-center text-lg opacity-90">
            Mi experiencia abarca desde el desarrollo completo de plataformas multilingües con integraciones complejas (PHP, WooCommerce), hasta intervenciones quirúrgicas de seguridad (malware) y optimización de rendimiento (WPO) para entidades gubernamentales.
          </p>
        </section>

        {/* SECCIÓN 1: CREACIONES Y DESARROLLOS */}
        <section className="space-y-12 border-t border-[var(--border-subtle)] pt-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <Code className="w-12 h-12 mx-auto text-[var(--brand-primary)] opacity-80" />
            <h2>Creación y Desarrollo a Medida</h2>
            <p className="opacity-80">
              Plataformas construidas desde cero o reestructuradas profundamente. Integraciones de pago personalizadas, sistemas de reservas y despliegues multi-idioma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {creations.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        </section>

        {/* SECCIÓN 2: OPTIMIZACIÓN Y RENDIMIENTO */}
        <section className="space-y-12 border-t border-[var(--border-subtle)] pt-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <Zap className="w-12 h-12 mx-auto text-yellow-500 opacity-80" />
            <h2>Optimización WPO, Seguridad y SEO</h2>
            <p className="opacity-80">
              Intervenciones técnicas en sitios de alto tráfico. Limpieza de hacks, migración de servidores, afinamiento de bases de datos y estrategias de posicionamiento técnico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {optimizations.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        </section>

        {/* SECCIÓN CTA - FULL WIDTH */}
        <div className="relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] my-0">
          <GlassCTA
            title="¿Necesitas resultados similares en tu proyecto?"
            description="Ya sea que necesites desarrollar una plataforma compleja o rescatar un sitio web comprometido, puedo ayudarte a escalarlo técnicamente."
            buttonText="Solicitar auditoría técnica"
            buttonHref="/auditoria"
            disclaimer="Soporte y consultoría disponible para Colombia, España, USA y Latinoamérica."
            className="!my-0"
          />
        </div>

      </main>
    </>
  );
}