import { Metadata } from 'next'

/* =====================================================
   METADATA: PÁGINA DE CANCELACIÓN
===================================================== */
export const metadata: Metadata = {
  title: 'Operación Cancelada',
  description: 'La operación ha sido cancelada. Puedes seguir disfrutando de las herramientas gratuitas.',
  
  // REGLA DE ORO: Bloqueamos a los buscadores
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function CafeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* [PREPARACIÓN PARA GA4 / TAG MANAGER]
        Aquí podremos rastrear si mucha gente abandona el pago.
        Ejemplo futuro:
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; window.dataLayer.push({'event': 'pago_cancelado'});` }} />
      */}
      {children}
    </>
  )
}