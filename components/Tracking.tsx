'use client'

import Script from 'next/script'

interface TrackingProps {
  lang: string // Recibimos el idioma para informar a las plataformas
  nonce?: string
}

export default function Tracking ({ lang, nonce }: TrackingProps) {
  // CONFIGURACIÓN DE IDs (Cámbialos por tus IDs reales)
  const GTM_ID = 'GTM-NMM22HG'
  const META_PIXEL_ID = '1828608694503506'

  return (
    <>
      {/* ---------------- GOOGLE TAG MANAGER ---------------- */}
      {/* PROTOCOLO ALSNIPPETS: Inyectamos el idioma en el dataLayer antes del script principal */}
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
            // PROTOCOLO ALSNIPPETS: Enviamos el idioma en el PageView para segmentación en Meta Ads
            fbq('track', 'PageView', { language: '${lang}' });
          `
        }}
      />
    </>
  )
}
