import { Metadata } from 'next'

/* =====================================================
   METADATA: PÁGINA DE GRACIAS (CONVERSIÓN)
===================================================== */
export const metadata: Metadata = {
  title: '¡Operación Exitosa!',
  description: 'Gracias por tu apoyo. Operación completada correctamente.',
  
  // REGLA DE ORO: Bloqueamos a los buscadores para no ensuciar las métricas de GA4
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function GraciasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* [PREPARACIÓN PARA GA4 / TAG MANAGER]
        Cuando instales GTM, aquí pondremos el script que empuja el evento de conversión.
        Ejemplo futuro:
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'conversion_donacion'});` }} />
      */}
      {children}
    </>
  )
}