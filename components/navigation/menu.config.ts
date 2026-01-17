/* =====================================================
   Configuración central del menú
   - Evita duplicación
   - Facilita i18n y animaciones
   ===================================================== */

export const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Sobre mí", href: "/sobre-mi" },

  {
    label: "Servicios",
    key: "servicios",
    children: [
      {
        label: "Soporte y mantenimiento WordPress",
        href: "/servicios/soporte-mantenimiento-wordpress",
      },
      {
        label: "Seguridad y limpieza WordPress",
        href: "/servicios/seguridad-limpieza",
      },
      {
        label: "Optimización y rendimiento",
        href: "/servicios/optimizacion-rendimiento",
      },
      {
        label: "SEO & GEO",
        href: "/servicios/seo-geo",
      },
    ],
  },

  {
    label: "Proyectos",
    key: "proyectos",
    children: [
      { label: "Suite Text", href: "/proyectos/suite-text" },
      { label: "Barber Short", href: "/proyectos/barber-short" },
      { label: "Casos de éxito", href: "/proyectos/casos-de-exito" },
      { label: "Mis creaciones", href: "/proyectos/mis-creaciones" },
    ],
  },

  { label: "Precios", href: "/precios" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];
