export interface NavItem {
  label: {
    es: string
    en: string
  }
  href?: string
  key: string
  children?: NavItem[]
  isButton?: boolean
  isPriority?: boolean
}

/* =====================================================
   CONFIGURACIÓN DE NAVEGACIÓN (Bilingüe)
   Nota: Los 'href' se definen sin el prefijo /[lang]
   ya que los componentes Nav los inyectan dinámicamente.
   ===================================================== */

export const NAV_ITEMS: NavItem[] = [
  {
    label: { es: 'Sobre mí', en: 'About me' },
    href: '/sobre-mi',
    key: 'sobre-mi'
  },
  {
    label: { es: 'Servicios', en: 'Services' },
    key: 'servicios',
    children: [
      {
        label: {
          es: 'Soporte y Mantenimiento WordPress',
          en: 'WordPress Support & Maintenance'
        },
        href: '/servicios/soporte-mantenimiento-wordpress',
        key: 'soporte'
      },
      {
        label: {
          es: 'Seguridad y Limpieza WordPress',
          en: 'WordPress Security & Malware Removal'
        },
        href: '/servicios/seguridad-limpieza',
        key: 'seguridad'
      },
      {
        label: {
          es: 'Optimización y Rendimiento',
          en: 'Speed & Performance Optimization'
        },
        href: '/servicios/optimizacion-rendimiento',
        key: 'optimizacion'
      },
      {
        label: { es: 'SEO & GEO', en: 'SEO & GEO' },
        href: '/servicios/seo-geo',
        key: 'seo'
      }
    ]
  },
  {
    label: { es: 'Proyectos', en: 'Projects' },
    key: 'proyectos',
    children: [
      {
        label: { es: 'Suite Text', en: 'Suite Text' },
        href: '/proyectos/suite-text',
        key: 'suite'
      },
      {
        label: { es: 'Barber Short', en: 'Barber Short' },
        href: '/proyectos/barber-short',
        key: 'barber'
      },
      {
        label: { es: 'Casos de Éxito', en: 'Success Stories' },
        href: '/proyectos/casos-de-exito',
        key: 'casos'
      },
      {
        label: { es: 'Mis Creaciones', en: 'My Creations' },
        href: '/proyectos/mis-creaciones',
        key: 'creaciones'
      }
    ]
  },
  {
    label: { es: 'Precios', en: 'Pricing' },
    href: '/precios',
    key: 'precios'
  },
  {
    label: { es: 'Blog', en: 'Blog' },
    href: '/blog',
    key: 'blog'
  },
  {
    label: { es: 'Contacto', en: 'Contact' },
    href: '/contacto',
    key: 'contacto'
  },
  {
    label: { es: 'Auditoría', en: 'Audit' },
    href: '/auditoria',
    key: 'auditoria',
    isPriority: true
  },
]