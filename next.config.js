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
  // 4. SEGURIDAD: Experimental (opcional pero recomendado)
  // =====================================================
  experimental: {
    taint: true, // Evita que datos sensibles lleguen al cliente
  },
};

module.exports = nextConfig;