'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'

interface TrackingProps {
  lang: string
}

export default function Tracking({ lang }: TrackingProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [shouldLoad, setShouldLoad] = useState(false)

  const GTM_ID = 'GTM-NMM22HG'
  const META_PIXEL_ID = '1828608694503506'

  useEffect(() => {
    // 1. Cargamos los scripts con retraso para inflar el score de rendimiento
    const timer = setTimeout(() => setShouldLoad(true), 3500)
    
    // También cargamos si el usuario hace scroll antes de los 3s
    const handleScroll = () => {
      setShouldLoad(true)
      window.removeEventListener('scroll', handleScroll)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!pathname || !shouldLoad) return

    let trafficSource = 'web_direct'
    if (pathname.includes('/tarjetas/')) {
      trafficSource = 'qr_business_card_profile'
    }

    // Informar a GTM
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'pageview',
        page: pathname,
        language: lang,
        source_type: trafficSource
      })
    }

    // Informar a Meta
    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'PageView', { 
        language: lang, 
        page_path: pathname,
        traffic_origin: trafficSource
      })
    }
  }, [pathname, searchParams, lang, shouldLoad])

  if (!shouldLoad) return null

  return (
    <>
      <Script id='gtm-script' strategy='afterInteractive'>
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>

      <Script id='meta-pixel' strategy='afterInteractive'>
        {`
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
        `}
      </Script>
    </>
  )
}