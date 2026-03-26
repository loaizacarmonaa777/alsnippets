'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'

interface TrackingProps {
  lang: string
  nonce?: string
}

export default function Tracking({ lang, nonce }: TrackingProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const GTM_ID = 'GTM-NMM22HG'
  const META_PIXEL_ID = '1828608694503506'

  // ✅ EFECTO PARA RASTREAR NAVEGACIÓN VIRTUAL Y QR
  useEffect(() => {
    if (!pathname) return

    // 1. Lógica de atribución para tus tarjetas físicas (QR)
    let trafficSource = 'web_direct'
    if (pathname.includes('/tarjetas/')) {
      trafficSource = 'qr_business_card_profile'
    }

    // 2. Informar a GTM / GA4
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'pageview',
        page: pathname,
        language: lang,
        source_type: trafficSource
      })

      // Evento específico si escanean tu tarjeta personal
      if (trafficSource === 'qr_business_card_profile') {
        (window as any).dataLayer.push({
          event: 'qr_scan_success',
          owner: 'Adrian Loaiza',
          location: 'printed_card_v1'
        })
      }
    }

    // 3. Informar a Meta Pixel
    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'PageView', { 
        language: lang, 
        page_path: pathname,
        traffic_origin: trafficSource
      })
    }
  }, [pathname, searchParams, lang])

  return (
    <>
      {/* ---------------- GOOGLE TAG MANAGER ---------------- */}
      <Script id='gtm-datalayer' nonce={nonce} strategy='beforeInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'language': '${lang}',
            'event': 'language_set'
          });
        `}
      </Script>

      <Script
        id='gtm-script'
        nonce={nonce}
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `
        }}
      />

      {/* ---------------- META PIXEL ---------------- */}
      <Script
        id='meta-pixel'
        nonce={nonce}
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView', { language: '${lang}' });
          `
        }}
      />
    </>
  )
}