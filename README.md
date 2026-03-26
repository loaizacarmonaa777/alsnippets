
```
alsnippets
├─ app
│  ├─ api
│  │  ├─ auditoria
│  │  │  └─ route.ts
│  │  ├─ barber-demo
│  │  │  └─ route.ts
│  │  ├─ contact
│  │  │  └─ route.ts
│  │  ├─ corrector
│  │  │  └─ route.ts
│  │  ├─ cotizador
│  │  │  └─ route.ts
│  │  ├─ newsletter
│  │  │  └─ route.ts
│  │  └─ pagespeed
│  │     └─ route.ts
│  ├─ favicon-old.ico
│  ├─ globals.css
│  ├─ icon.png
│  ├─ layout.tsx
│  ├─ not-found.tsx
│  ├─ robots.ts
│  ├─ sitemap.ts
│  ├─ styles
│  │  ├─ animations.css
│  │  ├─ base.css
│  │  ├─ components.css
│  │  └─ theme.css
│  ├─ [...not_found]
│  │  └─ page.tsx
│  └─ [lang]
│     ├─ (dashboard)
│     │  └─ audit
│     │     ├─ components
│     │     │  ├─ analysis
│     │     │  │  ├─ AnalyticsDetailView.tsx
│     │     │  │  ├─ ConflictViewer.tsx
│     │     │  │  ├─ GeoDetailView.tsx
│     │     │  │  ├─ InfrastructureDetailView.tsx
│     │     │  │  ├─ IssueAccordion.tsx
│     │     │  │  ├─ PerformanceDetailView.tsx
│     │     │  │  ├─ SecurityDetailView.tsx
│     │     │  │  ├─ SeoDetailView.tsx
│     │     │  │  ├─ TechDetailView.tsx
│     │     │  │  └─ TechStackList.tsx
│     │     │  ├─ charts
│     │     │  │  ├─ DistributionBar.tsx
│     │     │  │  ├─ RadarMetrics.tsx
│     │     │  │  └─ ScoreGuage.tsx
│     │     │  ├─ input
│     │     │  │  ├─ AnalysisSelector.tsx
│     │     │  │  ├─ CodeEditor.tsx
│     │     │  │  └─ SourceCodeEditor.tsx
│     │     │  ├─ layout
│     │     │  │  ├─ AuditDashboard.tsx
│     │     │  │  ├─ AuditGrid.tsx
│     │     │  │  └─ AuditSidebar.tsx
│     │     │  └─ output
│     │     │     ├─ AIBusinessImpact.tsx
│     │     │     └─ ExportPanel.tsx
│     │     └─ page.tsx
│     ├─ auditoria
│     │  ├─ layout.tsx
│     │  └─ page.tsx
│     ├─ blog
│     │  ├─ layout.tsx
│     │  ├─ page.tsx
│     │  └─ [slug]
│     │     └─ page.tsx
│     ├─ cafe
│     │  ├─ layout.tsx
│     │  └─ page.tsx
│     ├─ contacto
│     │  ├─ layout.tsx
│     │  └─ page.tsx
│     ├─ devoluciones
│     │  └─ page.tsx
│     ├─ gracias
│     │  ├─ layout.tsx
│     │  └─ page.tsx
│     ├─ layout.tsx
│     ├─ login
│     │  └─ page.tsx
│     ├─ page.tsx
│     ├─ precios
│     │  ├─ layout.tsx
│     │  └─ page.tsx
│     ├─ privacidad
│     │  └─ page.tsx
│     ├─ proyectos
│     │  ├─ barber-short
│     │  │  ├─ layout.tsx
│     │  │  └─ page.tsx
│     │  ├─ casos-de-exito
│     │  │  ├─ layout.tsx
│     │  │  └─ page.tsx
│     │  ├─ mis-creaciones
│     │  │  ├─ layout.tsx
│     │  │  └─ page.tsx
│     │  └─ suite-text
│     │     ├─ layout.tsx
│     │     └─ page.tsx
│     ├─ servicios
│     │  ├─ optimizacion-rendimiento
│     │  │  ├─ layout.tsx
│     │  │  └─ page.tsx
│     │  ├─ seguridad-limpieza
│     │  │  ├─ layout.tsx
│     │  │  └─ page.tsx
│     │  ├─ seo-geo
│     │  │  ├─ layout.tsx
│     │  │  └─ page.tsx
│     │  └─ soporte-mantenimiento-wordpress
│     │     ├─ layout.tsx
│     │     └─ page.tsx
│     ├─ sobre-mi
│     │  ├─ layout.tsx
│     │  └─ page.tsx
│     ├─ tarjetas
│     │  └─ [slug]
│     │     ├─ layout.tsx
│     │     └─ page.tsx
│     └─ terminos
│        ├─ layout.tsx
│        └─ page.tsx
├─ components
│  ├─ blog
│  │  ├─ BlogCard.tsx
│  │  ├─ BlogFilter.tsx
│  │  ├─ PostCTA.tsx
│  │  └─ PostHero.tsx
│  ├─ BugCounter.tsx
│  ├─ contacto
│  │  ├─ AccordionItem.tsx
│  │  └─ ContactForm.tsx
│  ├─ cotizador
│  │  ├─ CotizadorApp.tsx
│  │  ├─ Step1Datos.tsx
│  │  ├─ Step2Servicios.tsx
│  │  ├─ Step3CrearWeb.tsx
│  │  ├─ Step3Horas.tsx
│  │  ├─ Step3SEO.tsx
│  │  ├─ Step3Soporte.tsx
│  │  ├─ Step4Resumen.tsx
│  │  └─ utils
│  │     └─ pricingLogic.ts
│  ├─ forms
│  │  ├─ FakeWordPressLogin.tsx
│  │  ├─ FormAuditoria.tsx
│  │  ├─ FormDemoBarberShort.tsx
│  │  └─ FormNewsletter.tsx
│  ├─ hero
│  │  └─ PageHero.tsx
│  ├─ home
│  │  ├─ Authority.tsx
│  │  ├─ Benefits.tsx
│  │  ├─ BlogPreview.tsx
│  │  ├─ CTA.tsx
│  │  ├─ Hero.tsx
│  │  ├─ ProjectsPreview.tsx
│  │  └─ Solutions.tsx
│  ├─ icons
│  │  ├─ FacebookIcon.tsx
│  │  ├─ GitHubIcon.tsx
│  │  ├─ IconBarber.tsx
│  │  ├─ IconCasosExito.tsx
│  │  ├─ IconCopiaSeguridad.tsx
│  │  ├─ IconMisCreaciones.tsx
│  │  ├─ IconMonitoreoSeguridad.tsx
│  │  ├─ IconRevisionCompatibilidad.tsx
│  │  ├─ IconSoporteTecnico.tsx
│  │  ├─ IconSuiteText.tsx
│  │  ├─ InstagramIcon.tsx
│  │  ├─ LinkedInIcon.tsx
│  │  ├─ MailIcon.tsx
│  │  ├─ MoonIcon.tsx
│  │  ├─ PinIcon.tsx
│  │  ├─ social.config.tsx
│  │  ├─ SocialIcon.tsx
│  │  ├─ SunIcon.tsx
│  │  ├─ WebIcon.tsx
│  │  ├─ WhatsAppIcon.tsx
│  │  └─ YouTubeIcon.tsx
│  ├─ LanguageSwitcher.tsx
│  ├─ layout
│  │  └─ Footer.tsx
│  ├─ navigation
│  │  ├─ MainNav.tsx
│  │  ├─ menu.config.ts
│  │  ├─ MobileMenu.tsx
│  │  ├─ NavDesktop.tsx
│  │  ├─ NavMobile.tsx
│  │  ├─ ThemeSwitcher.tsx
│  │  ├─ TopBar.tsx
│  │  └─ useScrollHeader.ts
│  ├─ ProgressBar.tsx
│  ├─ providers
│  │  ├─ AuthProvider.tsx
│  │  └─ ThemeProvider.tsx
│  ├─ shared
│  │  └─ StackLogos.tsx
│  ├─ Tracking.tsx
│  ├─ Typewriter.tsx
│  └─ ui
│     ├─ ButtonCTA.tsx
│     ├─ ButtonSecondary.tsx
│     ├─ CookieConsent.tsx
│     ├─ GlassCTA.tsx
│     ├─ HorizontalCard.tsx
│     ├─ IconCard.tsx
│     ├─ VerticalCard.tsx
│     └─ WizardBarberShort.tsx
├─ content
│  └─ blog
│     ├─ en
│     │  ├─ analisis-de-intencion-y-estructura.mdx
│     │  ├─ arquitectura-de-rendimiento-web.mdx
│     │  ├─ auditoria-tecnica-de-dependencias.mdx
│     │  ├─ backdoors-wordpress.mdx
│     │  ├─ buenas-practicas-de-actualizacion.mdx
│     │  ├─ configuracion-de-plugins.mdx
│     │  ├─ depuracion-avanzada-de-base-de-datos.mdx
│     │  ├─ eliminacion-de-malware-y-archivos-infectados.mdx
│     │  ├─ endurecimiento-de-wordpress.mdx
│     │  ├─ estabilidad-visual-y-experiencia-interactiva.mdx
│     │  ├─ estrategia-de-contenido-a-largo-plazo.mdx
│     │  ├─ implementacion-estrategica-de-cache-multinivel.mdx
│     │  ├─ inyeccion-texto-japones-wordpress.mdx
│     │  ├─ malware-silencioso-wordpress.mdx
│     │  ├─ malware-wordpress-como-actua.mdx
│     │  ├─ mejora-de-core-web-vitals.mdx
│     │  ├─ menor-tasa-de-rebote.mdx
│     │  ├─ mi-web-es-lenta-y-esta-perdiendo-visitas.mdx
│     │  ├─ mi-web-muestra-comportamientos-extranos.mdx
│     │  ├─ mitos-wordpress-seguridad.mdx
│     │  ├─ monitoreo-basico-de-actividad.mdx
│     │  ├─ navegacion-mas-fluida.mdx
│     │  ├─ optimizacion-del-servidor-y-tiempos-de-respuesta.mdx
│     │  ├─ optimizacion-estructural-de-recursos.mdx
│     │  ├─ optimizacion-para-buscadores-y-llms.mdx
│     │  ├─ optimizacion-wordpress-real.mdx
│     │  ├─ plugins-seguridad-no-suficientes.mdx
│     │  ├─ quiero-mejorar-mi-sitio-pero-como-le-hago.mdx
│     │  ├─ reduccion-de-tiempos-de-respuesta.mdx
│     │  ├─ refuerzo-de-accesos-y-permisos.mdx
│     │  ├─ renderizado-y-carga-critica-optimizada.mdx
│     │  ├─ reorganizacion-semantica-del-sitio.mdx
│     │  ├─ restauracion-segura-si-es-necesario.mdx
│     │  ├─ revision-completa-de-codigo-y-bd.mdx
│     │  ├─ seguimiento-y-ajustes-progresivos.mdx
│     │  ├─ seguridad-wordpress-basica.mdx
│     │  ├─ seo-2026-llms-contexto.mdx
│     │  ├─ tengo-miedo-de-actualizar-mi-sitio-web.mdx
│     │  ├─ wordpress-no-es-el-problema.mdx
│     │  └─ wordpress-se-reinfecta.mdx
│     └─ es
│        ├─ analisis-de-intencion-y-estructura.mdx
│        ├─ arquitectura-de-rendimiento-web.mdx
│        ├─ auditoria-tecnica-de-dependencias.mdx
│        ├─ backdoors-wordpress.mdx
│        ├─ buenas-practicas-de-actualizacion.mdx
│        ├─ configuracion-de-plugins.mdx
│        ├─ depuracion-avanzada-de-base-de-datos.mdx
│        ├─ eliminacion-de-malware-y-archivos-infectados.mdx
│        ├─ endurecimiento-de-wordpress.mdx
│        ├─ estabilidad-visual-y-experiencia-interactiva.mdx
│        ├─ estrategia-de-contenido-a-largo-plazo.mdx
│        ├─ implementacion-estrategica-de-cache-multinivel.mdx
│        ├─ inyeccion-texto-japones-wordpress.mdx
│        ├─ malware-silencioso-wordpress.mdx
│        ├─ malware-wordpress-como-actua.mdx
│        ├─ mejora-de-core-web-vitals.mdx
│        ├─ menor-tasa-de-rebote.mdx
│        ├─ mi-web-es-lenta-y-esta-perdiendo-visitas.mdx
│        ├─ mi-web-muestra-comportamientos-extranos.mdx
│        ├─ mitos-wordpress-seguridad.mdx
│        ├─ monitoreo-basico-de-actividad.mdx
│        ├─ navegacion-mas-fluida.mdx
│        ├─ optimizacion-del-servidor-y-tiempos-de-respuesta.mdx
│        ├─ optimizacion-estructural-de-recursos.mdx
│        ├─ optimizacion-para-buscadores-y-llms.mdx
│        ├─ optimizacion-wordpress-real.mdx
│        ├─ plugins-seguridad-no-suficientes.mdx
│        ├─ quiero-mejorar-mi-sitio-pero-como-le-hago.mdx
│        ├─ reduccion-de-tiempos-de-respuesta.mdx
│        ├─ refuerzo-de-accesos-y-permisos.mdx
│        ├─ renderizado-y-carga-critica-optimizada.mdx
│        ├─ reorganizacion-semantica-del-sitio.mdx
│        ├─ restauracion-segura-si-es-necesario.mdx
│        ├─ revision-completa-de-codigo-y-bd.mdx
│        ├─ seguimiento-y-ajustes-progresivos.mdx
│        ├─ seguridad-wordpress-basica.mdx
│        ├─ seo-2026-llms-contexto.mdx
│        ├─ tengo-miedo-de-actualizar-mi-sitio-web.mdx
│        ├─ wordpress-no-es-el-problema.mdx
│        └─ wordpress-se-reinfecta.mdx
├─ eslint.config.mjs
├─ i18n
│  ├─ dictionaries
│  │  ├─ en
│  │  │  ├─ audit-pro.json
│  │  │  ├─ auditoria.json
│  │  │  ├─ blog.json
│  │  │  ├─ cafe.json
│  │  │  ├─ common.json
│  │  │  ├─ contacto.json
│  │  │  ├─ cotizador.json
│  │  │  ├─ cotizador_step1.json
│  │  │  ├─ cotizador_step2.json
│  │  │  ├─ cotizador_step3_horas.json
│  │  │  ├─ cotizador_step3_seo.json
│  │  │  ├─ cotizador_step3_soporte.json
│  │  │  ├─ cotizador_step3_web.json
│  │  │  ├─ cotizador_step4.json
│  │  │  ├─ devoluciones.json
│  │  │  ├─ footer.json
│  │  │  ├─ form_auditoria.json
│  │  │  ├─ form_barber.json
│  │  │  ├─ form_contact.json
│  │  │  ├─ form_footer.json
│  │  │  ├─ gracias.json
│  │  │  ├─ home.json
│  │  │  ├─ home_authority.json
│  │  │  ├─ home_benefits.json
│  │  │  ├─ home_blog.json
│  │  │  ├─ home_cta.json
│  │  │  ├─ home_projects.json
│  │  │  ├─ home_solutions.json
│  │  │  ├─ login.json
│  │  │  ├─ precios.json
│  │  │  ├─ privacidad.json
│  │  │  ├─ proyecto_barber.json
│  │  │  ├─ proyecto_casos.json
│  │  │  ├─ proyecto_creaciones.json
│  │  │  ├─ proyecto_suite.json
│  │  │  ├─ servicios_optimizacion.json
│  │  │  ├─ servicios_seguridad.json
│  │  │  ├─ servicios_seo.json
│  │  │  ├─ servicios_soporte.json
│  │  │  ├─ sobre-mi.json
│  │  │  ├─ tarjetas.json
│  │  │  ├─ terminos.json
│  │  │  └─ wizard_barber_short.json
│  │  └─ es
│  │     ├─ audit-pro.json
│  │     ├─ auditoria.json
│  │     ├─ blog.json
│  │     ├─ cafe.json
│  │     ├─ common.json
│  │     ├─ contacto.json
│  │     ├─ cotizador.json
│  │     ├─ cotizador_step1.json
│  │     ├─ cotizador_step2.json
│  │     ├─ cotizador_step3_horas.json
│  │     ├─ cotizador_step3_seo.json
│  │     ├─ cotizador_step3_soporte.json
│  │     ├─ cotizador_step3_web.json
│  │     ├─ cotizador_step4.json
│  │     ├─ devoluciones.json
│  │     ├─ footer.json
│  │     ├─ form_auditoria.json
│  │     ├─ form_barber.json
│  │     ├─ form_contact.json
│  │     ├─ form_footer.json
│  │     ├─ gracias.json
│  │     ├─ home.json
│  │     ├─ home_authority.json
│  │     ├─ home_benefits.json
│  │     ├─ home_blog.json
│  │     ├─ home_cta.json
│  │     ├─ home_projects.json
│  │     ├─ home_solutions.json
│  │     ├─ login.json
│  │     ├─ precios.json
│  │     ├─ privacidad.json
│  │     ├─ proyecto_barber.json
│  │     ├─ proyecto_casos.json
│  │     ├─ proyecto_creaciones.json
│  │     ├─ proyecto_suite.json
│  │     ├─ servicios_optimizacion.json
│  │     ├─ servicios_seguridad.json
│  │     ├─ servicios_seo.json
│  │     ├─ servicios_soporte.json
│  │     ├─ sobre-mi.json
│  │     ├─ tarjetas.json
│  │     ├─ terminos.json
│  │     └─ wizard_barber_short.json
│  ├─ get-dictionary.ts
│  └─ messages.ts
├─ lib
│  ├─ audit
│  │  ├─ calculator.ts
│  │  ├─ formatter.ts
│  │  ├─ scanner.ts
│  │  ├─ seo-engine.ts
│  │  └─ types.ts
│  └─ blog
│     ├─ categoryLabels.ts
│     ├─ ctaByCategory.ts
│     ├─ getCategories.ts
│     ├─ getFeaturedPosts.ts
│     ├─ getPosts.ts
│     └─ mdxRenderer.tsx
├─ middleware.ts
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ brand
│  │  ├─ logo-fondo-dark-eslogan-es.svg
│  │  ├─ logo-fondo-dark-menu.svg
│  │  ├─ logo-fondo-light-eslogan-es.svg
│  │  └─ logo-fondo-light-menu.svg
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ icons
│  │  ├─ logo-email.svg
│  │  ├─ logo-facebook.svg
│  │  ├─ logo-github.svg
│  │  ├─ logo-instagram.svg
│  │  ├─ logo-linkedin.svg
│  │  ├─ logo-moon.svg
│  │  ├─ logo-pin.svg
│  │  ├─ logo-sun.svg
│  │  ├─ logo-wathsapp.svg
│  │  ├─ logo-web.svg
│  │  └─ logo-youtube.svg
│  ├─ images
│  │  ├─ auditoria
│  │  │  ├─ horizontal.webp
│  │  │  └─ vertical.webp
│  │  ├─ barber
│  │  │  ├─ barber-1.webp
│  │  │  ├─ barber-2.webp
│  │  │  ├─ barber-3.webp
│  │  │  ├─ barber-4.webp
│  │  │  ├─ barber-5.webp
│  │  │  ├─ barber-6.webp
│  │  │  ├─ barber-short-background.webp
│  │  │  └─ logo-barber-short-blanco.png
│  │  ├─ blog
│  │  │  ├─ analisis-de-intencion-y-estructura.webp
│  │  │  ├─ arquitectura-de-rendimiento-web.webp
│  │  │  ├─ auditoria-tecnica-de-dependencias.webp
│  │  │  ├─ backdoors-wordpress.webp
│  │  │  ├─ buenas-practicas-de-actualizacion.webp
│  │  │  ├─ configuracion-de-plugins.webp
│  │  │  ├─ depuracion-avanzada-de-base-de-datos.webp
│  │  │  ├─ eliminacion-de-malware-y-archivos-infectados.webp
│  │  │  ├─ endurecimiento-de-wordpress.webp
│  │  │  ├─ estabilidad-visual-y-experiencia-interactiva.webp
│  │  │  ├─ estrategia-de-contenido-a-largo-plazo.webp
│  │  │  ├─ implementacion-estrategica-de-cache-multinivel.webp
│  │  │  ├─ inyeccion-texto-japones-wordpress.webp
│  │  │  ├─ malware-silencioso.webp
│  │  │  ├─ malware-wordpress-como-actua.webp
│  │  │  ├─ mejora-de-core-web-vitals-seo.webp
│  │  │  ├─ mejora-de-core-web-vitals.webp
│  │  │  ├─ menor-tasa-de-rebote.webp
│  │  │  ├─ mi-web-es-lenta-y-esta-perdiendo-visitas.webp
│  │  │  ├─ mi-web-muestra-comportamientos-extranos.webp
│  │  │  ├─ mitos-sobre-seguridad-wordpress.webp
│  │  │  ├─ monitoreo-basico-de-actividad.webp
│  │  │  ├─ navegacion-mas-fluida.webp
│  │  │  ├─ optimizacion-del-servidor-y-tiempos-de-respuesta.webp
│  │  │  ├─ optimizacion-estructural-de-recursos-ii.webp
│  │  │  ├─ optimizacion-estructural-de-recursos.webp
│  │  │  ├─ optimizacion-wordpress-real.webp
│  │  │  ├─ plugins-de-seguridad-no-son-suficientes.webp
│  │  │  ├─ quiero-mejorar-mi-sitio-pero-como-le-hago.webp
│  │  │  ├─ reduccion-de-tiempos-de-respuesta.webp
│  │  │  ├─ refuerzo-accesos-permisos.webp
│  │  │  ├─ renderizado-y-carga-critica-optimizada.webp
│  │  │  ├─ reorganizacion-semantica-del-sitio.webp
│  │  │  ├─ restauracion-segura-si-es-necesario.webp
│  │  │  ├─ revision-completa-de-codigo-y-bd.webp
│  │  │  ├─ seguimiento-y-ajustes-progresivos.webp
│  │  │  ├─ seguridad-wordpress-basica.webp
│  │  │  ├─ seo-para-llms-y-contexto.webp
│  │  │  ├─ tengo-miedo-de-actualizar-mi-sitio-web.webp
│  │  │  ├─ wordpress-no-es-el-problema.webp
│  │  │  └─ wordpress-se-reinfecta.webp
│  │  ├─ casos-exito
│  │  │  ├─ 4r-soluciones.webp
│  │  │  ├─ alianza-oriente-sostenible-aos.webp
│  │  │  ├─ ebcards.webp
│  │  │  ├─ edeso.webp
│  │  │  ├─ inneos-evolution.webp
│  │  │  ├─ inner-mastery-europe.webp
│  │  │  ├─ inner-mastery-germany.webp
│  │  │  ├─ inner-mastery-italy.webp
│  │  │  ├─ inner-mastery-spain.webp
│  │  │  ├─ inner-mastery-switzerland.webp
│  │  │  ├─ kintsugi-salud-y-bienestar.webp
│  │  │  ├─ sanaya-ancestal-wellness.webp
│  │  │  ├─ transcendent-psychology.webp
│  │  │  └─ viva-empresa-vivienda-de-antioquia.webp
│  │  ├─ contact
│  │  │  ├─ adrian-loaiza-contacto-adrian-sentado.webp
│  │  │  ├─ adrian-loaiza-contacto.webp
│  │  │  ├─ alsnippets-hero-contact-desktop.webp
│  │  │  ├─ alsnippets-hero-contact-mobile.webp
│  │  │  └─ patternWhatsApp.webp
│  │  ├─ footer
│  │  │  └─ formas-de-pago-para-alsnippets.webp
│  │  ├─ hero
│  │  │  ├─ hero-auditoria.webp
│  │  │  ├─ hero-barber-short.webp
│  │  │  ├─ hero-blog.webp
│  │  │  ├─ hero-casos-exito.webp
│  │  │  ├─ hero-devoluciones.webp
│  │  │  ├─ hero-mis-creaciones.webp
│  │  │  ├─ hero-optimizacion-rendimiento.webp
│  │  │  ├─ hero-politica-privacidad.webp
│  │  │  ├─ hero-precios.webp
│  │  │  ├─ hero-seguridad-limpieza.webp
│  │  │  ├─ hero-seo-geo.webp
│  │  │  ├─ hero-soporte-mantenimiento.webp
│  │  │  ├─ hero-suite-text.webp
│  │  │  └─ hero-terminos-condiciones.webp
│  │  ├─ home
│  │  │  ├─ actualizar-sitio-web-home.webp
│  │  │  ├─ card-acompanamiento-proceso-home.webp
│  │  │  ├─ card-actualizaciones-controladas-home.webp
│  │  │  ├─ card-copias-seguridad-home.webp
│  │  │  ├─ card-errores-proceso-home.webp
│  │  │  ├─ card-optimizacion-velocidad-home.webp
│  │  │  ├─ card-proteccion-contra-ataques-home.webp
│  │  │  ├─ hero-home-desktop-qr.webp
│  │  │  ├─ hero-home-desktop-seo-geo.webp
│  │  │  ├─ hero-home-desktop.webp
│  │  │  ├─ hero-home-mobile-qr.webp
│  │  │  ├─ hero-home-mobile-seo-geo.webp
│  │  │  ├─ hero-home-mobile.webp
│  │  │  ├─ mejorar-sitio-web-home.webp
│  │  │  ├─ sitio-web-hackeado-home.webp
│  │  │  ├─ sitio-web-lento-home.webp
│  │  │  ├─ trabajo-directo-sin-intermediarios-home-desktop.webp
│  │  │  └─ trabajo-directo-sin-intermediarios-home-mobile.webp
│  │  ├─ mis-creaciones
│  │  │  ├─ alsnippets.webp
│  │  │  ├─ barber-short.webp
│  │  │  └─ suite-text.webp
│  │  ├─ og
│  │  │  ├─ openGraph-auditoria.png
│  │  │  ├─ openGraph-barber-short.png
│  │  │  ├─ openGraph-blog.png
│  │  │  ├─ openGraph-casos-exito.png
│  │  │  ├─ openGraph-contacto.png
│  │  │  ├─ openGraph-creaciones.png
│  │  │  ├─ openGraph-home.png
│  │  │  ├─ openGraph-optimizacion-rendimiento.png
│  │  │  ├─ openGraph-precios.png
│  │  │  ├─ openGraph-seguridad-limpieza.png
│  │  │  ├─ openGraph-seo-geo.png
│  │  │  ├─ openGraph-sobre-mi.png
│  │  │  ├─ openGraph-soporte-mantenimiento.png
│  │  │  ├─ openGraph-suite-text.png
│  │  │  └─ openGraph-tarjetas.png
│  │  ├─ open-graph
│  │  ├─ optimizacion
│  │  │  ├─ arquitectura-de-rendimiento.webp
│  │  │  ├─ auditoria-tecnica-dependencias.webp
│  │  │  ├─ base-datos-saturada.webp
│  │  │  ├─ carga-lenta-sitio.webp
│  │  │  ├─ depuracion-avanzada-base-datos.webp
│  │  │  ├─ estabilidad-visual.webp
│  │  │  ├─ exceso-plugins.webp
│  │  │  ├─ falta-sistema-cache-optimizacion.webp
│  │  │  ├─ hosting-mal-configurado.webp
│  │  │  ├─ imagenes-sin-optimizar.webp
│  │  │  ├─ implementacion-estrategica-cache-multinivel.webp
│  │  │  ├─ mejora-core-web-vitals.webp
│  │  │  ├─ menor-tasa-rebote.webp
│  │  │  ├─ navegacion-fluida.webp
│  │  │  ├─ optimizacion-del-servidor.webp
│  │  │  ├─ optimizacion-estructural-recursos.webp
│  │  │  ├─ radmin3298_the_main_page_of_the_e-commerce_store_reberry_market_20fc3fa2-a431-4bc2-8ff7-e4f589127bb2.png
│  │  │  ├─ reduccion-tiempos-respuesta.webp
│  │  │  └─ renderizado-y-carga.webp
│  │  ├─ precios
│  │  │  ├─ auditoria-wordpress.webp
│  │  │  ├─ complejidad-tecnica.webp
│  │  │  ├─ estado-sitio-web.webp
│  │  │  ├─ firma-adrian.png
│  │  │  ├─ implementacion-codigo-personalizado.webp
│  │  │  ├─ nivel-personalizacion.webp
│  │  │  ├─ riesgos-responsabilidad.webp
│  │  │  ├─ servicios-medida.webp
│  │  │  └─ trabajo-manual.webp
│  │  ├─ seguridad
│  │  │  ├─ accesos-no-autorizados.webp
│  │  │  ├─ backdoors-puertas-traseras.webp
│  │  │  ├─ base-datos-comprometida.webp
│  │  │  ├─ buenas-practicas-actualizacion.webp
│  │  │  ├─ configuracion-plugins.webp
│  │  │  ├─ configuraciones-inseguras.webp
│  │  │  ├─ eliminacion-malware.webp
│  │  │  ├─ endurecimiento-wordpress.webp
│  │  │  ├─ malware-codigo-malicioso.webp
│  │  │  ├─ monitoreo-actividad.webp
│  │  │  ├─ plugins-vulnerables.webp
│  │  │  ├─ refuerzo-accesos-permisos.webp
│  │  │  ├─ restauracion-segura.webp
│  │  │  ├─ revision-codigo-bd.webp
│  │  │  └─ sitio-blacklist.webp
│  │  ├─ seo
│  │  │  ├─ analisis-intencion-estructura.webp
│  │  │  ├─ arquitectura-clara-sitio.webp
│  │  │  ├─ contenido-comprensible-jerarquizado.webp
│  │  │  ├─ contexto-completo-seccion.webp
│  │  │  ├─ contexto-real-no-inflado.webp
│  │  │  ├─ estrategia-contenido-largo-plazo.webp
│  │  │  ├─ experiencia-tecnica-solida.webp
│  │  │  ├─ lenguaje-claro-directo.webp
│  │  │  ├─ optimizacion-para-buscadores-llms.webp
│  │  │  ├─ optimizacion-rendimiento.webp
│  │  │  ├─ que-debes-tener-en-cuenta.webp
│  │  │  ├─ reorganizacion-semantica-sitio.webp
│  │  │  ├─ respuestas-delimitadas.webp
│  │  │  ├─ seguimiento-ajustes-proguresivos.webp
│  │  │  └─ senales-autoridad-experiencia.webp
│  │  ├─ sobre-mi
│  │  │  ├─ backend-servidores.webp
│  │  │  ├─ codigo-limpio.webp
│  │  │  ├─ ecommerce-senior.webp
│  │  │  ├─ ecosistema-wordpress.webp
│  │  │  ├─ enfoque-wpo.webp
│  │  │  ├─ hero-sobre-mi.webp
│  │  │  ├─ javascript-moderno.webp
│  │  │  ├─ mi-trayectoria.webp
│  │  │  └─ seguridad-proactiva.webp
│  │  ├─ soporte
│  │  │  ├─ actualizaciones-sin-riesgo.jpg
│  │  │  ├─ bases-datos.jpg
│  │  │  ├─ configuracion-servidor.jpg
│  │  │  ├─ errores-criticos.jpg
│  │  │  ├─ lentitud-rendimiento.jpg
│  │  │  └─ sopoerte-tecnico-real.webp
│  │  ├─ suite
│  │  │  ├─ horizontal.webp
│  │  │  └─ vertical.webp
│  │  └─ tarjetas
│  │     ├─ adrian-loaiza-carmona.webp
│  │     ├─ adrian-loaiza.webp
│  │     ├─ adrian.webp
│  │     ├─ backgorund-tarjeta-contacto-adrian-loaiza.webp
│  │     ├─ backgorund-tarjeta-contacto-yesenia.webp
│  │     ├─ contacto-adrian-loaiza.png
│  │     └─ yesenia.webp
│  ├─ logos
│  │  └─ stack
│  │     ├─ 01-wordpress.svg
│  │     ├─ 02-woocommerce.svg
│  │     ├─ 03-shopify.svg
│  │     ├─ 04-wix.svg
│  │     ├─ 05-squarespace.svg
│  │     ├─ 06-wpml.svg
│  │     ├─ 07-figma.svg
│  │     ├─ 08-photoshop.svg
│  │     ├─ 09-illustrator.svg
│  │     ├─ 10-cloudflare.svg
│  │     ├─ 11-yoast-seo.svg
│  │     ├─ 12-cpanel.svg
│  │     ├─ 13-plesk.svg
│  │     ├─ 14-divi.svg
│  │     ├─ 15-elementor.svg
│  │     ├─ 16-wordfence.svg
│  │     ├─ 17-i-themes-security.svg
│  │     ├─ 18-lite-speed.svg
│  │     ├─ 19-wp-rocket.svg
│  │     ├─ 20-paypal.svg
│  │     ├─ 21-payu.svg
│  │     ├─ 22-html.svg
│  │     ├─ 23-css.svg
│  │     ├─ 24-java-script.svg
│  │     ├─ 25-php.svg
│  │     ├─ 26-tailwind-css.svg
│  │     ├─ 27-next-js.svg
│  │     └─ 28-vercel.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ tailwind.config.js
└─ tsconfig.json

```