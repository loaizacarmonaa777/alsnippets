/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],

  // =====================================================
  // 1. SEGURIDAD: Deshabilitar powered-by header
  // =====================================================
  poweredByHeader: false,

  // =====================================================
  // 2. SEGURIDAD: Headers HTTP globales
  // =====================================================
  async headers() {
    return [
      {
        source: '/(.*)', // Aplica a todas las rutas
        headers: [
          // 🚀 RENDIMIENTO: Preconnect a dominios críticos (Mejora árbol de dependencias)
          // Esto establece una conexión con Facebook y Google antes de que los scripts se carguen.
          {
            key: 'Link',
            value: '<https://connect.facebook.net>; rel=preconnect, <https://www.googletagmanager.com>; rel=preconnect'
          },
          // HSTS - Forzar HTTPS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          // Prevenir MIME sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Anti clickjacking
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          // Control de referencias
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Desactivar APIs del navegador no utilizadas
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },          
        ]
      }
    ];
  },

  // =====================================================
  // 3. SEGURIDAD: Compresión y optimización
  // =====================================================
  compress: true,

  // =====================================================
  // 4. SEGURIDAD Y RENDIMIENTO: Experimental
  // =====================================================
  experimental: {
    taint: true, // Evita que datos sensibles lleguen al cliente
    
    // 🚀 RENDIMIENTO: Optimiza la importación de iconos y animaciones
    // Ayuda a reducir el JavaScript innecesario en el bundle final.
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

module.exports = nextConfig;