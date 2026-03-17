'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeCanvas } from 'qrcode.react'
import {
  AlertCircle,
  AlertTriangle,
  AlignLeft,
  ArrowRightLeft,
  BarChart2,
  Bold,
  BoxSelect,
  Check,
  CheckCircle,
  Code,
  Contrast,
  Copy,
  Download,
  Eraser,
  FileText,
  Hash,
  Heart,
  Image as ImageIcon,
  Info,
  Italic,
  Key,
  Languages,
  Layers,
  Maximize,
  Menu,
  MessageCircle,
  Move,
  Palette,
  QrCode,
  RefreshCw,
  Search,
  Settings,
  Strikethrough,
  Type,
  Underline as UnderlineIcon,
  UploadCloud,
  X,
  XCircle,
  Zap
} from 'lucide-react'

/* =====================================================
   MÓDULO 1: GENERADOR DE WHATSAPP (SÓLIDO & PROFESIONAL)
===================================================== */
import { getCountries, getCountryCallingCode } from 'libphonenumber-js'

function WhatsAppModule ({ lang }: { lang: string }) {
  const t = {
    es: {
      title: 'Generador de Enlaces para WhatsApp',
      desc: 'Crea enlaces directos con mensajes predefinidos listos para compartir.',
      label_phone: 'Teléfono',
      label_msg: 'Mensaje Predefinido',
      placeholder_phone: 'Número de teléfono',
      placeholder_msg: 'Ej: ¡Hola! Vengo desde tu web...',
      error_phone: 'Número inválido para la región seleccionada.',
      result_title: 'Tu Enlace Generado ↓',
      result_empty: 'Configura un número para generar el enlace...',
      btn_copy: 'Copiar Enlace',
      btn_copied: 'Copiado con éxito ✓',
      btn_test: 'Probar Link',
      search_placeholder: 'Buscar país...'
    },
    en: {
      title: 'WhatsApp Link Generator',
      desc: 'Create direct links with predefined messages ready to share.',
      label_phone: 'Phone',
      label_msg: 'Predefined Message',
      placeholder_phone: 'Phone number',
      placeholder_msg: "Ex: Hi! I'm coming from your website...",
      error_phone: 'Invalid number for the selected region.',
      result_title: 'Your Generated Link ↓',
      result_empty: 'Enter a number to generate the link...',
      btn_copy: 'Copy Link',
      btn_copied: 'Copied successfully ✓',
      btn_test: 'Test Link',
      search_placeholder: 'Search country...'
    }
  }[lang as 'es' | 'en']

  // ESTADOS
  const [telefono, setTelefono] = useState('')
  const [message, setMessage] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedCountry, setSelectedCountry] = useState({
    n: 'Colombia',
    v: '+57',
    iso: 'CO'
  })

  // LISTA DE PAÍSES DINÁMICA (libphonenumber-js)
  const allCountries = useMemo(() => {
    return getCountries()
      .map(iso => ({
        iso,
        n: new Intl.DisplayNames([lang], { type: 'region' }).of(iso) || iso,
        v: `+${getCountryCallingCode(iso)}`
      }))
      .sort((a, b) => a.n.localeCompare(b.n))
  }, [lang])

  const filteredCountries = useMemo(() => {
    return allCountries.filter(
      c =>
        c.n.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.v.includes(searchTerm)
    )
  }, [searchTerm, allCountries])

  // LÓGICA DE TECLADO PARA EL BUSCADOR
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isSearchOpen) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(prev =>
        prev < filteredCountries.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(prev => (prev > 0 ? prev - 1 : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredCountries[activeIndex]) {
        setSelectedCountry(filteredCountries[activeIndex])
        setIsSearchOpen(false)
        setSearchTerm('')
      }
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false)
    }
  }

  const generateLink = () => {
    if (!telefono) return ''
    const cleanPrefix = selectedCountry.v.replace(/\D/g, '')
    const cleanPhone = telefono.replace(/\D/g, '')
    return `https://wa.me/${cleanPrefix}${cleanPhone}${
      message ? `?text=${encodeURIComponent(message)}` : ''
    }`
  }

  const handleCopy = async () => {
    const link = generateLink()
    if (!link) return
    try {
      await navigator.clipboard.writeText(link)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='animate-fade-in space-y-6'>
      <div className='text-center md:text-left'>
        <h2 className='text-2xl md:text-3xl font-bold mb-2 text-[var(--text-1)] flex items-center gap-3 justify-center md:justify-start'>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <MessageCircle className='w-8 h-8 text-[var(--text-brand)]' />
          </motion.div>
          {t.title}
        </h2>
        <p className='text-[var(--text-2)]'>{t.desc}</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8'>
        {/* CONFIGURACIÓN */}
        <div className='rounded-2xl p-6 space-y-6 shadow-[var(--shadow-2)] bg-[var(--bg-1)] border border-[var(--border-1)] relative'>
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-[var(--text-1)]'>
              {t.label_phone}
            </label>
            <div className='flex flex-col sm:flex-row gap-3 relative'>
              {/* BUSCADOR DE PAÍSES */}
              <div className='w-full sm:w-2/5 relative'>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className='w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] focus:border-[var(--text-brand)] transition-all'
                >
                  <span className='truncate'>
                    {selectedCountry.n} ({selectedCountry.v})
                  </span>
                  <Search className='w-4 h-4 opacity-50' />
                </button>

                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className='absolute z-50 w-full mt-2 bg-[var(--bg-1)] border border-[var(--border-1)] rounded-xl shadow-2xl overflow-hidden'
                    >
                      <div className='p-2 border-b border-[var(--border-1)] bg-[var(--bg-2)]'>
                        <input
                          autoFocus
                          placeholder={t.search_placeholder}
                          value={searchTerm}
                          onChange={e => {
                            setSearchTerm(e.target.value)
                            setActiveIndex(0)
                          }}
                          onKeyDown={handleKeyDown}
                          className='w-full bg-transparent border-none outline-none text-xs p-1 text-[var(--text-1)]'
                        />
                      </div>
                      <div className='max-h-48 overflow-y-auto overscroll-contain'>
                        {filteredCountries.map((c, index) => (
                          <button
                            key={c.iso}
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => {
                              setSelectedCountry(c)
                              setIsSearchOpen(false)
                              setSearchTerm('')
                            }}
                            className={`w-full text-left p-3 text-xs flex justify-between items-center border-b border-[var(--border-1)] last:border-0 transition-colors
                              ${
                                activeIndex === index
                                  ? 'bg-[var(--bg-brand)] text-white'
                                  : 'text-[var(--text-1)] bg-[var(--bg-1)]'
                              }`}
                          >
                            <span className='font-bold'>{c.n}</span>
                            <span className='opacity-70'>{c.v}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <input
                type='text'
                inputMode='numeric'
                value={telefono}
                placeholder={t.placeholder_phone}
                onChange={e => setTelefono(e.target.value.replace(/\D/g, ''))}
                className='w-full sm:w-3/5 rounded-xl px-4 py-3 outline-none transition-colors bg-[var(--bg-2)] text-[var(--text-1)] focus:border-[var(--text-brand)] border border-[var(--border-1)]'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-semibold text-[var(--text-1)]'>
              {t.label_msg}
            </label>
            <textarea
              rows={4}
              placeholder={t.placeholder_msg}
              value={message}
              onChange={e => setMessage(e.target.value)}
              className='w-full rounded-xl px-4 py-3 outline-none transition-colors resize-none bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] focus:border-[var(--text-brand)]'
            />
          </div>
        </div>

        {/* RESULTADO (COLORES SÓLIDOS) */}
        <div className='rounded-2xl p-6 shadow-[var(--shadow-1)] flex flex-col bg-[var(--bg-2)] border-2 border-[var(--bg-brand)]'>
          <h3 className='text-lg font-bold mb-4 text-[var(--text-1)] flex items-center gap-2'>
            <Zap className='w-5 h-5 text-[var(--text-brand)]' />{' '}
            {t.result_title}
          </h3>
          <div className='flex-grow flex flex-col justify-center space-y-4'>
            <div className='p-4 rounded-xl break-all text-sm font-mono min-h-[100px] flex items-center bg-[var(--bg-1)] border border-[var(--border-1)] text-[var(--text-brand)] font-bold'>
              {generateLink() ? generateLink() : t.result_empty}
            </div>

            <div className='flex flex-col sm:flex-row gap-3 mt-auto pt-4'>
              <button
                onClick={handleCopy}
                disabled={!telefono}
                className={`relative flex-1 flex items-center justify-center gap-2 font-bold py-4 rounded-xl transition-all border-2 overflow-hidden
                  ${
                    isCopied
                      ? 'bg-[var(--bg-success)] border-[var(--bg-success)] text-white'
                      : 'bg-[var(--bg-brand)] border-[var(--bg-brand)] text-white hover:bg-[var(--text-1)] hover:border-[var(--text-1)]'
                  }`}
              >
                <AnimatePresence mode='wait'>
                  {isCopied ? (
                    <motion.div
                      key='cp'
                      initial={{ y: 15 }}
                      animate={{ y: 0 }}
                      className='flex items-center gap-2'
                    >
                      <Check className='w-5 h-5' /> {t.btn_copied}
                    </motion.div>
                  ) : (
                    <motion.div
                      key='nc'
                      initial={{ y: 15 }}
                      animate={{ y: 0 }}
                      className='flex items-center gap-2'
                    >
                      <Copy className='w-5 h-5' /> {t.btn_copy}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              <a
                href={generateLink() || '#'}
                target='_blank'
                className={`flex-1 flex items-center justify-center gap-2 font-bold py-4 rounded-xl transition-all border-2
                  ${
                    telefono
                      ? 'bg-transparent border-[var(--bg-success)] text-[var(--bg-success)] hover:bg-[var(--bg-success)] hover:text-white'
                      : 'opacity-50 cursor-not-allowed border-[var(--border-1)] text-[var(--text-3)]'
                  }`}
              >
                <RefreshCw className='w-5 h-5' /> {t.btn_test}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =====================================================
   MÓDULO 2: GENERADOR DE CÓDIGO QR (SÓLIDO & DINÁMICO)
===================================================== */
function QrGeneratorModule ({ lang }: { lang: string }) {
  const t = {
    es: {
      title: 'Generador de Código QR',
      desc: 'Crea códigos QR personalizados, añade tu logo y ajusta las esquinas.',
      label_url: 'URL de destino',
      label_qr_color: 'Color del QR',
      label_bg_color: 'Color de Fondo',
      label_logo: 'Logo Central',
      btn_logo_upload: 'Subir Logo',
      btn_logo_change: 'Cambiar Logo',
      btn_logo_remove: 'Quitar Logo',
      label_margin: 'Grosor del Margen',
      label_radius: 'Forma de las esquinas',
      btn_download: 'Descargar',
      btn_downloaded: 'Descargado con éxito ✓',
      placeholder_url: 'https://alsnippets.com'
    },
    en: {
      title: 'QR Code Generator',
      desc: 'Create custom QR codes, add your logo, and adjust the corners.',
      label_url: 'Destination URL',
      label_qr_color: 'QR Color',
      label_bg_color: 'Background Color',
      label_logo: 'Center Logo',
      btn_logo_upload: 'Upload Logo',
      btn_logo_change: 'Change Logo',
      btn_logo_remove: 'Remove Logo',
      label_margin: 'Margin Thickness',
      label_radius: 'Corner Shape',
      btn_download: 'Download',
      btn_downloaded: 'Downloaded successfully ✓',
      placeholder_url: 'https://alsnippets.com'
    }
  }[lang as 'es' | 'en']

  const [url, setUrl] = useState('https://alsnippets.com')
  const [qrColor, setQrColor] = useState('#0f172a')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [size, setSize] = useState(500)
  const [margin, setMargin] = useState(16)
  const [containerRadius, setContainerRadius] = useState(16)
  const [format, setFormat] = useState<'png' | 'webp'>('png')
  const [logo, setLogo] = useState<string | null>(null)
  const [logoRatio, setLogoRatio] = useState<number>(1)
  const [isDownloaded, setIsDownloaded] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imgUrl = URL.createObjectURL(file)
      const img = new Image()
      img.onload = () => {
        setLogoRatio(img.width / img.height)
        setLogo(imgUrl)
      }
      img.src = imgUrl
    }
  }

  const downloadQR = () => {
    const qrCanvas = qrRef.current?.querySelector('canvas')
    if (!qrCanvas) return
    const visualSize = 200
    const scaleFactor = size / visualSize
    const exportMargin = margin * scaleFactor
    const exportRadius = containerRadius * scaleFactor
    const totalExportSize = size + exportMargin * 2

    const finalCanvas = document.createElement('canvas')
    finalCanvas.width = totalExportSize
    finalCanvas.height = totalExportSize
    const ctx = finalCanvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = bgColor
    ctx.beginPath()
    ctx.moveTo(exportRadius, 0)
    ctx.lineTo(totalExportSize - exportRadius, 0)
    ctx.quadraticCurveTo(totalExportSize, 0, totalExportSize, exportRadius)
    ctx.lineTo(totalExportSize, totalExportSize - exportRadius)
    ctx.quadraticCurveTo(
      totalExportSize,
      totalExportSize,
      totalExportSize - exportRadius,
      totalExportSize
    )
    ctx.lineTo(exportRadius, totalExportSize)
    ctx.quadraticCurveTo(0, totalExportSize, 0, totalExportSize - exportRadius)
    ctx.lineTo(0, exportRadius)
    ctx.quadraticCurveTo(0, 0, exportRadius, 0)
    ctx.closePath()
    ctx.fill()

    ctx.drawImage(qrCanvas, exportMargin, exportMargin, size, size)

    const mimeType = format === 'webp' ? 'image/webp' : 'image/png'
    const finalImgUrl = finalCanvas
      .toDataURL(mimeType)
      .replace(mimeType, 'image/octet-stream')

    const downloadLink = document.createElement('a')
    downloadLink.href = finalImgUrl
    downloadLink.download = `alsnippets-qr.${format}`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)

    // Feedback visual de descarga
    setIsDownloaded(true)
    setTimeout(() => setIsDownloaded(false), 2500)
  }

  const logoMaxSize = size * 0.25
  const logoW = logoRatio > 1 ? logoMaxSize : logoMaxSize * logoRatio
  const logoH = logoRatio > 1 ? logoMaxSize / logoRatio : logoMaxSize

  return (
    <div className='animate-fade-in space-y-6'>
      <div className='text-center md:text-left'>
        <h2 className='text-2xl md:text-3xl font-bold mb-2 text-[var(--text-1)] flex items-center gap-3 justify-center md:justify-start'>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <QrCode className='w-8 h-8 text-[var(--text-brand)]' />
          </motion.div>
          {t.title}
        </h2>
        <p className='text-[var(--text-2)]'>{t.desc}</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8'>
        {/* PANEL DE CONFIGURACIÓN */}
        <div className='lg:col-span-7 rounded-2xl p-6 space-y-6 shadow-[var(--shadow-2)] bg-[var(--bg-1)] border border-[var(--border-1)]'>
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-[var(--text-1)]'>
              {t.label_url}
            </label>
            <input
              type='text'
              value={url}
              onChange={e => setUrl(e.target.value)}
              className='w-full rounded-xl px-4 py-3 outline-none transition-colors bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] focus:border-[var(--border-brand)] font-medium'
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-1)]'>
            <div className='space-y-2 flex flex-col'>
              <label className='text-sm font-semibold text-[var(--text-1)]'>
                {t.label_qr_color}
              </label>
              <input
                type='color'
                value={qrColor}
                onChange={e => setQrColor(e.target.value)}
                className='w-full h-12 cursor-pointer rounded-lg bg-[var(--bg-2)] border border-[var(--border-1)] p-1'
              />
            </div>
            <div className='space-y-2 flex flex-col'>
              <label className='text-sm font-semibold text-[var(--text-1)]'>
                {t.label_bg_color}
              </label>
              <input
                type='color'
                value={bgColor}
                onChange={e => setBgColor(e.target.value)}
                className='w-full h-12 cursor-pointer rounded-lg bg-[var(--bg-2)] border border-[var(--border-1)] p-1'
              />
            </div>
            <div className='space-y-2 flex flex-col'>
              <label className='text-sm font-semibold text-[var(--text-1)]'>
                {t.label_logo}
              </label>
              <input
                type='file'
                accept='image/png, image/jpeg, image/webp'
                ref={fileInputRef}
                onChange={handleLogoUpload}
                className='hidden'
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className='w-full h-12 text-xs font-bold rounded-lg transition-all bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] hover:bg-[var(--bg-brand)] hover:text-white hover:border-[var(--bg-brand)]'
              >
                {logo ? t.btn_logo_change : t.btn_logo_upload}
              </button>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--border-1)]'>
            <div className='space-y-3'>
              <div className='flex justify-between items-center'>
                <label className='text-xs font-bold uppercase tracking-widest text-[var(--text-2)]'>
                  {t.label_margin}
                </label>
                <span className='px-2 py-1 rounded bg-[var(--bg-brand)] text-white text-[10px] font-bold'>
                  {margin}px
                </span>
              </div>
              <input
                type='range'
                min='0'
                max='50'
                step='2'
                value={margin}
                onChange={e => setMargin(Number(e.target.value))}
                className='w-full cursor-pointer accent-[var(--bg-brand)]'
              />
            </div>
            <div className='space-y-3'>
              <div className='flex justify-between items-center'>
                <label className='text-xs font-bold uppercase tracking-widest text-[var(--text-2)]'>
                  {t.label_radius}
                </label>
                <span className='px-2 py-1 rounded bg-[var(--bg-brand)] text-white text-[10px] font-bold'>
                  {containerRadius}px
                </span>
              </div>
              <input
                type='range'
                min='0'
                max='100'
                step='4'
                value={containerRadius}
                onChange={e => setContainerRadius(Number(e.target.value))}
                className='w-full cursor-pointer accent-[var(--bg-brand)]'
              />
            </div>
          </div>
        </div>

        {/* VISTA PREVIA Y DESCARGA */}
        <div className='lg:col-span-5 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[450px] bg-[var(--bg-2)] border-2 border-[var(--bg-brand)] shadow-xl'>
          <motion.div
            ref={qrRef}
            layout
            className='mb-8 transition-all duration-500 shadow-2xl overflow-hidden'
            style={{
              padding: `${margin}px`,
              backgroundColor: bgColor,
              borderRadius: `${containerRadius}px`
            }}
          >
            <QRCodeCanvas
              value={url || 'https://alsnippets.com'}
              size={size}
              bgColor={bgColor}
              fgColor={qrColor}
              level='H'
              includeMargin={false}
              style={{ width: '220px', height: '220px', display: 'block' }}
              imageSettings={
                logo
                  ? { src: logo, height: logoH, width: logoW, excavate: true }
                  : undefined
              }
            />
          </motion.div>

          <div className='w-full mb-4 flex rounded-xl p-1 bg-[var(--bg-3)] border border-[var(--border-1)]'>
            {(['png', 'webp'] as const).map(fmt => (
              <button
                key={fmt}
                onClick={() => setFormat(fmt)}
                className={`flex-1 py-2 text-xs font-black rounded-lg transition-all ${
                  format === fmt
                    ? 'bg-[var(--bg-1)] text-[var(--text-brand)] shadow-md'
                    : 'text-[var(--text-2)] hover:text-[var(--text-1)]'
                }`}
              >
                .{fmt.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={downloadQR}
            className={`w-full flex items-center justify-center gap-2 text-white font-black py-4 rounded-xl shadow-lg transition-all border-2
              ${
                isDownloaded
                  ? 'bg-[var(--bg-success)] border-[var(--bg-success)]'
                  : 'bg-[var(--bg-brand)] border-[var(--bg-brand)] hover:bg-[var(--text-1)] hover:border-[var(--text-1)] hover:-translate-y-1'
              }`}
          >
            <AnimatePresence mode='wait'>
              {isDownloaded ? (
                <motion.div
                  key='d-ok'
                  initial={{ y: 15 }}
                  animate={{ y: 0 }}
                  className='flex items-center gap-2'
                >
                  <CheckCircle className='w-5 h-5' /> {t.btn_downloaded}
                </motion.div>
              ) : (
                <motion.div
                  key='d-no'
                  initial={{ y: 15 }}
                  animate={{ y: 0 }}
                  className='flex items-center gap-2'
                >
                  <Download className='w-5 h-5' /> {t.btn_download}{' '}
                  {format.toUpperCase()}
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {logo && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => {
                setLogo(null)
                setLogoRatio(1)
              }}
              className='mt-4 text-[10px] uppercase tracking-widest font-black text-red-500 hover:underline'
            >
              {t.btn_logo_remove}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}

/* =====================================================
   MÓDULO 3: OPTIMIZADOR MULTIMEDIA (SÓLIDO & POTENTE)
===================================================== */
interface ProcessedFile {
  id: string
  originalFile: File
  previewUrl: string
  newName: string
  blob: Blob | null
  isConverting: boolean
}

function ImageOptimizerModule ({ lang }: { lang: string }) {
  const t = {
    es: {
      title: 'Optimizador Multimedia',
      desc: 'Procesa hasta 20 imágenes. Soporte nativo para iPhone (.HEIC). Reduce peso y cambia formatos 100% en tu navegador.',
      btn_reset: 'Limpiar Todo',
      drop_title: 'Arrastra hasta 20 imágenes o haz clic',
      drop_desc: 'Soporta HEIC, JPG, WEBP, PNG, GIF, AVIF',
      label_images: 'Cola de Procesamiento',
      btn_add_more: '+ Añadir más',
      label_calculating: 'Procesando...',
      label_saving: 'Ahorro',
      btn_download_all: 'Descargar Lote',
      btn_downloaded: 'Descargado con éxito ✓',
      settings_title: 'Ajustes de Salida',
      label_format: 'Formato de destino',
      label_quality: 'Nivel de Compresión',
      quality_disclaimer: '*Los formatos sin pérdida ignoran la calidad.',
      error_limit: 'Límite alcanzado. Máximo 20 imágenes por lote.',
      formats: {
        webp: 'WebP (Ultra optimizado)',
        jpg: 'JPEG (Alta compatibilidad)',
        png: 'PNG (Transparencias)',
        ico: 'ICO (Favicons)'
      }
    },
    en: {
      title: 'Multimedia Optimizer',
      desc: 'Process up to 20 images. Native iPhone support (.HEIC). Reduce size and change formats 100% in your browser.',
      btn_reset: 'Clear All',
      drop_title: 'Drag up to 20 images or click',
      drop_desc: 'Supports HEIC, JPG, WEBP, PNG, GIF, AVIF',
      label_images: 'Processing Queue',
      btn_add_more: '+ Add more',
      label_calculating: 'Processing...',
      label_saving: 'Saved',
      btn_download_all: 'Download Batch',
      btn_downloaded: 'Downloaded successfully ✓',
      settings_title: 'Output Settings',
      label_format: 'Target Format',
      label_quality: 'Compression Level',
      quality_disclaimer: '*Lossless formats ignore quality settings.',
      error_limit: 'Limit reached. Maximum 20 images per batch.',
      formats: {
        webp: 'WebP (Ultra optimized)',
        jpg: 'JPEG (High compatibility)',
        png: 'PNG (Transparency)',
        ico: 'ICO (Favicons)'
      }
    }
  }[lang as 'es' | 'en']

  const [files, setFiles] = useState<ProcessedFile[]>([])
  const [quality, setQuality] = useState<number>(80)
  const [format, setFormat] = useState<'webp' | 'png' | 'jpg' | 'ico'>('webp')
  const [isDragging, setIsDragging] = useState(false)
  const [isDownloaded, setIsDownloaded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Lógica de conversión compatible con HEIC
  const processSingleImage = async (
    file: File,
    fmt: string,
    qual: number
  ): Promise<Blob | null> => {
    let currentFile = file

    // Soporte para HEIC (iPhone)
    if (file.name.toLowerCase().endsWith('.heic')) {
      try {
        const heic2any = (await import('heic2any')).default
        const converted = await heic2any({ blob: file, toType: 'image/jpeg' })
        currentFile = new File(
          [Array.isArray(converted) ? converted[0] : converted],
          file.name.replace(/\.heic/i, '.jpg'),
          { type: 'image/jpeg' }
        )
      } catch (e) {
        return null
      }
    }

    return new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = e => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext('2d')
          if (!ctx) return resolve(null)
          ctx.drawImage(img, 0, 0)
          let mimeType = 'image/webp'
          if (fmt === 'jpg') mimeType = 'image/jpeg'
          if (fmt === 'png' || fmt === 'ico') mimeType = 'image/png'
          canvas.toBlob(blob => resolve(blob), mimeType, qual / 100)
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(currentFile)
    })
  }

  useEffect(() => {
    if (files.length === 0) return
    const timeout = setTimeout(() => {
      files.forEach(async f => {
        if (f.blob && !f.isConverting) return // Evitar re-procesar lo ya listo
        const newBlob = await processSingleImage(
          f.originalFile,
          format,
          quality
        )
        setFiles(curr =>
          curr.map(item =>
            item.id === f.id
              ? { ...item, blob: newBlob, isConverting: false }
              : item
          )
        )
      })
    }, 500)
    return () => clearTimeout(timeout)
  }, [quality, format, files.length])

  const handleAddFiles = (newFiles: FileList | File[]) => {
    const validArray = Array.from(newFiles)
    const spaceLeft = 20 - files.length
    const filesToAdd = validArray.slice(0, spaceLeft)
    if (validArray.length > spaceLeft) alert(t.error_limit)

    const newProcessedFiles: ProcessedFile[] = filesToAdd.map(f => ({
      id: Math.random().toString(36).substring(7),
      originalFile: f,
      previewUrl: f.name.toLowerCase().endsWith('.heic')
        ? ''
        : URL.createObjectURL(f),
      newName: f.name.split('.').slice(0, -1).join('.'),
      blob: null,
      isConverting: true
    }))
    setFiles(prev => [...prev, ...newProcessedFiles])
  }

  const downloadAll = () => {
    files.forEach((f, index) => {
      if (!f.blob) return
      setTimeout(() => {
        const url = URL.createObjectURL(f.blob!)
        const link = document.createElement('a')
        link.href = url
        link.download = `${f.newName || 'alsnippets-img'}.${format}`
        link.click()
        URL.revokeObjectURL(url)
      }, index * 250)
    })
    setIsDownloaded(true)
    setTimeout(() => setIsDownloaded(false), 3000)
  }

  return (
    <div className='animate-fade-in space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
        <div className='text-center md:text-left'>
          <h2 className='text-2xl md:text-3xl font-bold mb-2 text-[var(--text-1)] flex items-center gap-3 justify-center md:justify-start'>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <UploadCloud className='w-8 h-8 text-[var(--text-brand)]' />
            </motion.div>
            {t.title}
          </h2>
          <p className='text-[var(--text-2)]'>{t.desc}</p>
        </div>
        {files.length > 0 && (
          <button
            onClick={() => setFiles([])}
            className='flex items-center gap-2 text-sm font-bold text-red-500 hover:scale-105 transition-transform'
          >
            <XCircle className='w-5 h-5' /> {t.btn_reset}
          </button>
        )}
      </div>

      {files.length === 0 ? (
        <div
          onDragOver={e => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={e => {
            e.preventDefault()
            setIsDragging(false)
            handleAddFiles(e.dataTransfer.files)
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full h-80 border-4 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all bg-[var(--bg-2)] ${
            isDragging
              ? 'border-[var(--bg-brand)] bg-[var(--bg-3)]'
              : 'border-[var(--border-1)] hover:border-[var(--bg-brand)]'
          }`}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className='w-24 h-24 rounded-2xl bg-[var(--bg-1)] flex items-center justify-center shadow-lg mb-4'
          >
            <ImageIcon className='w-12 h-12 text-[var(--text-brand)]' />
          </motion.div>
          <h3 className='text-xl font-bold text-[var(--text-1)]'>
            {t.drop_title}
          </h3>
          <p className='text-[var(--text-2)]'>{t.drop_desc}</p>
          <input
            type='file'
            ref={fileInputRef}
            onChange={e => handleAddFiles(e.target.files!)}
            multiple
            accept='image/*,.heic'
            className='hidden'
          />
        </div>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
          <div className='lg:col-span-8 rounded-3xl p-6 bg-[var(--bg-1)] border border-[var(--border-1)] shadow-xl space-y-4 max-h-[600px] overflow-y-auto overscroll-contain custom-scrollbar'>
            <div className='flex justify-between items-center mb-2'>
              <h3 className='font-black uppercase tracking-widest text-xs text-[var(--text-2)]'>
                {t.label_images}
              </h3>
              <span className='px-3 py-1 bg-[var(--bg-inverse)] text-[var(--bg-1)] text-[10px] font-bold rounded-full'>
                {files.length} / 20
              </span>
            </div>

            {files.map(file => (
              <div
                key={file.id}
                className='flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-2)] border border-[var(--border-1)] group hover:border-[var(--bg-brand)] transition-all'
              >
                <div className='w-16 h-16 rounded-xl overflow-hidden bg-[var(--bg-3)] border border-[var(--border-1)] flex-shrink-0 relative'>
                  {file.previewUrl ? (
                    <img
                      src={file.previewUrl}
                      className='w-full h-full object-cover'
                      alt='preview'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center text-[var(--text-3)] text-[10px] font-bold'>
                      HEIC
                    </div>
                  )}
                  {file.isConverting && (
                    <div className='absolute inset-0 bg-[var(--bg-inverse)] flex items-center justify-center'>
                      <RefreshCw className='w-5 h-5 text-white animate-spin' />
                    </div>
                  )}
                </div>
                <div className='flex-grow min-w-0'>
                  <input
                    type='text'
                    value={file.newName}
                    onChange={e =>
                      setFiles(prev =>
                        prev.map(f =>
                          f.id === file.id
                            ? { ...f, newName: e.target.value }
                            : f
                        )
                      )
                    }
                    className='w-full bg-transparent font-bold text-sm text-[var(--text-1)] border-b border-transparent focus:border-[var(--bg-brand)] outline-none truncate'
                  />
                  <div className='flex items-center gap-2 mt-1'>
                    <span className='text-[10px] font-bold text-[var(--text-3)] uppercase'>
                      {file.blob
                        ? (file.blob.size / 1024).toFixed(0) + ' KB'
                        : t.label_calculating}
                    </span>
                    {file.blob && (
                      <span className='text-[10px] font-black text-[var(--bg-success)] uppercase'>
                        Ready
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() =>
                    setFiles(prev => prev.filter(f => f.id !== file.id))
                  }
                  className='p-2 text-red-500 hover:bg-red-50 transition-colors rounded-lg'
                >
                  <X className='w-5 h-5' />
                </button>
              </div>
            ))}
          </div>

          <div className='lg:col-span-4 space-y-6'>
            <div className='rounded-3xl p-6 bg-[var(--bg-2)] border-2 border-[var(--bg-brand)] shadow-lg space-y-6'>
              <h3 className='font-bold text-[var(--text-1)] flex items-center gap-2'>
                <Settings className='w-5 h-5 text-[var(--text-brand)]' />{' '}
                {t.settings_title}
              </h3>

              <div className='space-y-2'>
                <label className='text-xs font-black uppercase text-[var(--text-2)]'>
                  {t.label_format}
                </label>
                <select
                  value={format}
                  onChange={e => setFormat(e.target.value as any)}
                  className='w-full p-3 rounded-xl bg-[var(--bg-1)] border border-[var(--border-1)] text-sm font-bold text-[var(--text-1)] outline-none focus:ring-2 ring-[var(--bg-brand)]'
                >
                  <option value='webp'>{t.formats.webp}</option>
                  <option value='jpg'>{t.formats.jpg}</option>
                  <option value='png'>{t.formats.png}</option>
                  <option value='ico'>{t.formats.ico}</option>
                </select>
              </div>

              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <label className='text-xs font-black uppercase text-[var(--text-2)]'>
                    {t.label_quality}
                  </label>
                  <span className='text-xs font-bold text-[var(--bg-brand)]'>
                    {quality}%
                  </span>
                </div>
                <input
                  type='range'
                  min='10'
                  max='100'
                  value={quality}
                  onChange={e => setQuality(Number(e.target.value))}
                  disabled={format === 'png' || format === 'ico'}
                  className='w-full accent-[var(--bg-brand)] disabled:opacity-20'
                />
              </div>
            </div>

            <button
              onClick={downloadAll}
              disabled={files.some(f => f.isConverting) || files.length === 0}
              className={`w-full py-5 rounded-3xl font-black text-white shadow-xl transition-all border-b-4 active:border-b-0 flex items-center justify-center gap-3
                ${
                  isDownloaded
                    ? 'bg-[var(--bg-success)] border-green-700'
                    : 'bg-[var(--bg-inverse)] border-slate-900 hover:-translate-y-1'
                }`}
            >
              <AnimatePresence mode='wait'>
                {isDownloaded ? (
                  <motion.div
                    key='ok'
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className='flex items-center gap-2'
                  >
                    <CheckCircle /> {t.btn_downloaded}
                  </motion.div>
                ) : (
                  <motion.div
                    key='go'
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className='flex items-center gap-2'
                  >
                    <Download /> {t.btn_download_all}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* =====================================================
   MÓDULO 4: PINTURA Y SOMBRAS
===================================================== */
/* =====================================================
   MÓDULO 4: PINTURA Y SOMBRAS (POTENTE & SÓLIDO)
===================================================== */

function PaintAndShadowsModule ({ lang }: { lang: string }) {
  const [activeSubTab, setActiveSubTab] = useState<
    'shadows' | 'contrast' | 'palettes' | 'mesh'
  >('shadows')
  const [isCopied, setIsCopied] = useState(false)

  const t = {
    es: {
      tabs: {
        shadows: 'Sombras CSS',
        contrast: 'Contraste WCAG',
        palettes: 'Paletas Pro',
        mesh: 'Degradado Malla'
      },
      common: { copy: 'Copiar CSS', copied: 'Copiado ✓' }
    },
    en: {
      tabs: {
        shadows: 'CSS Shadows',
        contrast: 'WCAG Contrast',
        palettes: 'Pro Palettes',
        mesh: 'Mesh Gradient'
      },
      common: { copy: 'Copy CSS', copied: 'Copied ✓' }
    }
  }[lang as 'es' | 'en']

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className='animate-fade-in space-y-6'>
      {/* SUB-NAVEGACIÓN INTERNA */}
      <div className='flex overflow-x-auto gap-2 p-1 bg-[var(--bg-3)] rounded-2xl border border-[var(--border-1)]'>
        {Object.entries(t.tabs).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setActiveSubTab(id as any)}
            className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-xs font-black uppercase tracking-tighter transition-all ${
              activeSubTab === id
                ? 'bg-[var(--bg-1)] text-[var(--text-brand)] shadow-sm border border-[var(--border-brand)]'
                : 'text-[var(--text-2)] hover:bg-[var(--bg-2)] border border-transparent'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode='wait'>
        {activeSubTab === 'shadows' && (
          <ShadowGenerator
            key='sh'
            lang={lang}
            onCopy={handleCopy}
            isCopied={isCopied}
          />
        )}
        {activeSubTab === 'contrast' && (
          <ContrastChecker key='ct' lang={lang} />
        )}
        {activeSubTab === 'palettes' && (
          <PaletteGenerator
            key='pl'
            lang={lang}
            onCopy={handleCopy}
            isCopied={isCopied}
          />
        )}
        {activeSubTab === 'mesh' && (
          <MeshGradientGenerator
            key='mg'
            lang={lang}
            onCopy={handleCopy}
            isCopied={isCopied}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

/* 1. GENERADOR DE SOMBRAS (ESTÁNDAR + NEUMORPHISM) */
function ShadowGenerator ({ lang, onCopy, isCopied }: any) {
  const [type, setType] = useState<'box' | 'neumorph'>('box')
  const [config, setConfig] = useState({
    x: 10,
    y: 10,
    blur: 20,
    spread: 0,
    opacity: 0.2,
    color: '#0f172a',
    inset: false,
    distance: 20,
    intensity: 0.15,
    shape: '145deg'
  })

  const cssCode = useMemo(() => {
    if (type === 'box') {
      const hex = config.color
      const r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16)
      return `box-shadow: ${config.inset ? 'inset ' : ''}${config.x}px ${
        config.y
      }px ${config.blur}px ${config.spread}px rgba(${r}, ${g}, ${b}, ${
        config.opacity
      });`
    } else {
      // Lógica Neumorphism Simplificada
      return `border-radius: 50px;\nbackground: #e0e0e0;\nbox-shadow: ${config.distance}px ${config.distance}px ${config.blur}px #bebebe, \n            -${config.distance}px -${config.distance}px ${config.blur}px #ffffff;`
    }
  }, [config, type])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className='grid grid-cols-1 lg:grid-cols-2 gap-6'
    >
      <div className='p-6 bg-[var(--bg-1)] rounded-3xl border border-[var(--border-1)] space-y-4'>
        <div className='flex gap-2 mb-4'>
          <button
            onClick={() => setType('box')}
            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase border ${
              type === 'box'
                ? 'bg-[var(--bg-inverse)] text-white border-[var(--bg-inverse)]'
                : 'border-[var(--border-1)]'
            }`}
          >
            Standard
          </button>
          <button
            onClick={() => setType('neumorph')}
            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase border ${
              type === 'neumorph'
                ? 'bg-[var(--bg-inverse)] text-white border-[var(--bg-inverse)]'
                : 'border-[var(--border-1)]'
            }`}
          >
            Neumorphism
          </button>
        </div>

        {type === 'box' ? (
          <div className='space-y-3'>
            <ControlRange
              label='X Offset'
              val={config.x}
              min={-50}
              max={50}
              set={v => setConfig({ ...config, x: v })}
            />
            <ControlRange
              label='Y Offset'
              val={config.y}
              min={-50}
              max={50}
              set={v => setConfig({ ...config, y: v })}
            />
            <ControlRange
              label='Blur'
              val={config.blur}
              min={0}
              max={100}
              set={v => setConfig({ ...config, blur: v })}
            />
            <ControlRange
              label='Opacity'
              val={config.opacity}
              min={0}
              max={1}
              step={0.01}
              set={v => setConfig({ ...config, opacity: v })}
            />
            <input
              type='color'
              value={config.color}
              onChange={e => setConfig({ ...config, color: e.target.value })}
              className='w-full h-10 rounded-lg cursor-pointer bg-[var(--bg-2)] border-none'
            />
          </div>
        ) : (
          <div className='space-y-3'>
            <ControlRange
              label='Distance'
              val={config.distance}
              min={5}
              max={50}
              set={v => setConfig({ ...config, distance: v })}
            />
            <ControlRange
              label='Intensity'
              val={config.intensity}
              min={0.01}
              max={0.6}
              step={0.01}
              set={v => setConfig({ ...config, intensity: v })}
            />
            <ControlRange
              label='Blur'
              val={config.blur}
              min={0}
              max={100}
              set={v => setConfig({ ...config, blur: v })}
            />
          </div>
        )}
      </div>

      <div className='flex flex-col gap-6'>
        <div className='h-64 rounded-3xl bg-[var(--bg-2)] flex items-center justify-center border border-[var(--border-1)]'>
          <div
            style={{
              width: '120px',
              height: '120px',
              backgroundColor: type === 'neumorph' ? '#e0e0e0' : 'white',
              borderRadius: type === 'neumorph' ? '30px' : '16px',
              boxShadow:
                type === 'box'
                  ? cssCode.replace('box-shadow: ', '').replace(';', '')
                  : `${config.distance}px ${config.distance}px ${config.blur}px #bebebe, -${config.distance}px -${config.distance}px ${config.blur}px #ffffff`
            }}
          />
        </div>
        <CodeBox code={cssCode} onCopy={onCopy} isCopied={isCopied} />
      </div>
    </motion.div>
  )
}

/* 2. COMPROBADOR DE CONTRASTE Y CONVERSOR */
function ContrastChecker ({ lang }: any) {
  const [bg, setBg] = useState('#ffffff')
  const [fg, setFg] = useState('#0f172a')

  const getContrast = (f: string, b: string) => {
    const getL = (c: string) => {
      let rgb = c.startsWith('#')
        ? [
            parseInt(c.slice(1, 3), 16),
            parseInt(c.slice(3, 5), 16),
            parseInt(c.slice(5, 7), 16)
          ]
        : [0, 0, 0]
      let a = rgb.map(v => {
        v /= 255
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
      })
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
    }
    const l1 = getL(f),
      l2 = getL(b)
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
  }

  const ratio = getContrast(fg, bg).toFixed(2)
  const status =
    Number(ratio) >= 7 ? 'AAA' : Number(ratio) >= 4.5 ? 'AA' : 'FAIL'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='space-y-6'
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='p-6 bg-[var(--bg-1)] rounded-3xl border border-[var(--border-1)] space-y-4'>
          <label className='text-[10px] font-black uppercase tracking-widest text-[var(--text-3)]'>
            Color de Fondo
          </label>
          <div className='flex gap-4 items-center'>
            <input
              type='color'
              value={bg}
              onChange={e => setBg(e.target.value)}
              className='w-20 h-20 rounded-2xl cursor-pointer bg-[var(--bg-2)] p-1'
            />
            <input
              type='text'
              value={bg}
              onChange={e => setBg(e.target.value)}
              className='flex-1 bg-[var(--bg-2)] border border-[var(--border-1)] p-4 rounded-xl font-mono font-bold'
            />
          </div>
          <label className='text-[10px] font-black uppercase tracking-widest text-[var(--text-3)]'>
            Color de Texto
          </label>
          <div className='flex gap-4 items-center'>
            <input
              type='color'
              value={fg}
              onChange={e => setFg(e.target.value)}
              className='w-20 h-20 rounded-2xl cursor-pointer bg-[var(--bg-2)] p-1'
            />
            <input
              type='text'
              value={fg}
              onChange={e => setFg(e.target.value)}
              className='flex-1 bg-[var(--bg-2)] border border-[var(--border-1)] p-4 rounded-xl font-mono font-bold'
            />
          </div>
        </div>

        <div
          className='flex flex-col justify-center items-center p-10 rounded-3xl border-4 border-dashed border-[var(--border-1)]'
          style={{ backgroundColor: bg }}
        >
          <p
            style={{ color: fg }}
            className='text-3xl font-black text-center mb-4'
          >
            Muestra de Lectura
          </p>
          <div
            className={`px-6 py-2 rounded-full font-black text-white ${
              status === 'FAIL' ? 'bg-red-500' : 'bg-green-600'
            }`}
          >
            Contrast Ratio: {ratio} ({status})
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* 3. GENERADOR DE PALETAS PSICOLÓGICAS */
function PaletteGenerator ({ lang, onCopy, isCopied }: any) {
  const [main, setMain] = useState('#c9a34e')
  const [category, setCategory] = useState('salud')

  const psychology = {
    salud: { name: 'Salud', colors: ['#e0f2f1', '#4db6ac', '#00796b'] },
    deporte: { name: 'Deporte', colors: ['#fff3e0', '#ff9800', '#e65100'] },
    misterio: { name: 'Misterio', colors: ['#f3e5f5', '#9c27b0', '#4a148c'] },
    paz: { name: 'Paz', colors: ['#e3f2fd', '#42a5f5', '#1565c0'] }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='space-y-6'
    >
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        {Object.entries(psychology).map(([id, info]) => (
          <button
            key={id}
            onClick={() => setCategory(id)}
            className={`p-4 rounded-2xl border transition-all ${
              category === id
                ? 'bg-[var(--bg-inverse)] text-white border-[var(--bg-inverse)]'
                : 'bg-[var(--bg-1)] border-[var(--border-1)]'
            }`}
          >
            <span className='text-[10px] font-black uppercase tracking-widest'>
              {info.name}
            </span>
          </button>
        ))}
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4'>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className='space-y-2 group'>
            <div
              className='h-32 rounded-2xl shadow-sm border border-[var(--border-1)] bg-[var(--bg-brand)]'
              style={{
                filter: `hue-rotate(${i * 15}deg) brightness(${1.2 - i * 0.1})`
              }}
            ></div>
            <p className='text-[8px] font-black uppercase text-center text-[var(--text-3)]'>
              Color {i}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* 4. GENERADOR DE DEGRADADOS MALLA */
function MeshGradientGenerator ({ lang, onCopy, isCopied }: any) {
  const [colors, setColors] = useState([
    '#c9a34e',
    '#0f172a',
    '#22c55e',
    '#ed1c24'
  ])

  const css = `background-color: ${colors[0]};\nbackground-image:\n  radial-gradient(at 0% 0%, ${colors[1]} 0px, transparent 50%),\n  radial-gradient(at 100% 0%, ${colors[2]} 0px, transparent 50%),\n  radial-gradient(at 100% 100%, ${colors[3]} 0px, transparent 50%);`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='grid grid-cols-1 lg:grid-cols-2 gap-8'
    >
      <div className='space-y-6'>
        <div
          className='h-80 rounded-[40px] shadow-2xl border-8 border-white overflow-hidden relative'
          style={{ backgroundColor: colors[0] }}
        >
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: `radial-gradient(at 0% 0%, ${colors[1]} 0px, transparent 50%), radial-gradient(at 100% 0%, ${colors[2]} 0px, transparent 50%), radial-gradient(at 100% 100%, ${colors[3]} 0px, transparent 50%)`
            }}
          />
        </div>
      </div>
      <div className='space-y-6'>
        <div className='grid grid-cols-2 gap-4'>
          {colors.map((c, i) => (
            <div key={i} className='space-y-1'>
              <label className='text-[9px] font-black uppercase text-[var(--text-3)] pl-1'>
                Punto {i + 1}
              </label>
              <input
                type='color'
                value={c}
                onChange={e => {
                  const newColors = [...colors]
                  newColors[i] = e.target.value
                  setColors(newColors)
                }}
                className='w-full h-12 rounded-xl cursor-pointer bg-[var(--bg-2)] p-1 border border-[var(--border-1)]'
              />
            </div>
          ))}
        </div>
        <CodeBox code={css} onCopy={onCopy} isCopied={isCopied} />
      </div>
    </motion.div>
  )
}

/* COMPONENTES REUTILIZABLES AUXILIARES */
interface ControlRangeProps {
  label: string
  val: number
  min: number
  max: number
  step?: number
  set: (v: number) => void // Esto quita el error de la 'v'
}

function ControlRange ({
  label,
  val,
  min,
  max,
  step = 1,
  set
}: ControlRangeProps) {
  return (
    <div className='space-y-1'>
      <div className='flex justify-between items-center px-1'>
        <label className='text-[9px] font-black uppercase tracking-widest text-[var(--text-2)]'>
          {label}
        </label>
        <span className='text-[10px] font-bold text-[var(--text-brand)]'>
          {val}
        </span>
      </div>
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={val}
        onChange={e => set(Number(e.target.value))}
        className='w-full accent-[var(--bg-brand)] h-1.5 bg-[var(--bg-3)] rounded-lg appearance-none cursor-pointer'
      />
    </div>
  )
}

// Definimos qué datos recibe CodeBox
interface CodeBoxProps {
  code: string
  onCopy: (text: string) => void
  isCopied: boolean
}

function CodeBox ({ code, onCopy, isCopied }: CodeBoxProps) {
  return (
    <div className='relative group'>
      <pre className='p-5 bg-[var(--bg-inverse)] text-blue-300 rounded-2xl text-[11px] font-mono overflow-x-auto border border-white/10 leading-relaxed shadow-2xl'>
        {code}
      </pre>
      <button
        onClick={() => onCopy(code)}
        className={`absolute top-3 right-3 p-3 rounded-xl transition-all ${
          isCopied
            ? 'bg-green-500 text-white'
            : 'bg-white/10 text-white hover:bg-[var(--bg-brand)]'
        }`}
      >
        {isCopied ? (
          <Check className='w-4 h-4' />
        ) : (
          <Copy className='w-4 h-4' />
        )}
      </button>
    </div>
  )
}
/* =====================================================
   MÓDULO 5: CONTADOR Y CORRECTOR (CON PROTOCOLO i18n)
===================================================== */
function WordCounterModule ({ lang }: { lang: string }) {
  // TRADUCCIONES LOCALES DEL MÓDULO
  const t = {
    es: {
      title: 'Contador & Corrector',
      desc: 'Pega tu texto para analizar sus métricas y obtener una versión con limpieza ortográfica y gramatical básica.',
      label_textarea: 'Texto a analizar',
      placeholder: 'Pega tu texto aquí para comenzar a contar...',
      btn_clean: 'Limpiar',
      metrics: {
        words: 'Palabras',
        chars: 'Caracteres / Letras',
        spaces: 'Contar con espacios',
        sentences: 'Frases',
        paragraphs: 'Párrafos'
      },
      beta_title: 'Corrector Ortográfico (BETA)',
      btn_copy: 'Copiar Corrección',
      btn_copied: 'Copiado ✓',
      placeholder_fix: 'El texto limpio y corregido aparecerá aquí...',
      disclaimer:
        '*Nota: Este corrector repara espacios dobles, puntuación y mayúsculas. Para análisis gramatical profundo mediante IA, se requiere conexión a una API externa.'
    },
    en: {
      title: 'Counter & Fixer',
      desc: 'Paste your text to analyze its metrics and get a version with basic spelling and grammatical cleaning.',
      label_textarea: 'Text to analyze',
      placeholder: 'Paste your text here to start counting...',
      btn_clean: 'Clear',
      metrics: {
        words: 'Words',
        chars: 'Characters / Letters',
        spaces: 'Count with spaces',
        sentences: 'Sentences',
        paragraphs: 'Paragraphs'
      },
      beta_title: 'Spell Checker (BETA)',
      btn_copy: 'Copy Correction',
      btn_copied: 'Copied ✓',
      placeholder_fix: 'The clean and corrected text will appear here...',
      disclaimer:
        '*Note: This checker fixes double spaces, punctuation, and capitalization. For deep grammatical analysis via AI, an external API connection is required.'
    }
  }[lang as 'es' | 'en']

  const [text, setText] = useState('')
  const [countSpaces, setCountSpaces] = useState(true)
  const [language, setLanguage] = useState<'es' | 'en'>(lang as 'es' | 'en')
  const [isCopied, setIsCopied] = useState(false)

  const wordsCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const charsCount = countSpaces ? text.length : text.replace(/\s/g, '').length
  const sentencesCount = text.trim()
    ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    : 0
  const paragraphsCount = text.trim()
    ? text.split(/\n+/).filter(p => p.trim().length > 0).length
    : 0

  const correctedText = React.useMemo(() => {
    if (!text) return ''
    let fixed = text
    fixed = fixed.replace(/ {2,}/g, ' ')
    fixed = fixed.replace(/\s+([.,!?:;])/g, '$1')
    fixed = fixed.replace(/([.,!?:;])([a-zA-Zñáéíóúü])/gi, '$1 $2')
    fixed = fixed.replace(
      /(^\s*|[.!?]\s+)([a-zñáéíóúü])/gi,
      (match, p1, p2) => p1 + p2.toUpperCase()
    )
    return fixed.trim()
  }, [text])

  const handleCopy = async () => {
    if (!correctedText) return
    try {
      await navigator.clipboard.writeText(correctedText)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Fallo al copiar', err)
    }
  }

  return (
    <div className='animate-fade-in space-y-6'>
      <div className='text-center md:text-left'>
        <h2 className='text-2xl md:text-3xl font-bold mb-2 text-[var(--text-1)]'>
          {t.title}
        </h2>
        <p className='text-[var(--text-2)]'>{t.desc}</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6'>
        <div className='lg:col-span-8 flex flex-col rounded-2xl shadow-[var(--shadow-1)] overflow-hidden min-h-[300px] border bg-[var(--bg-1)] border-[var(--border-1)]'>
          <div className='p-3 border-b flex justify-between items-center bg-[var(--bg-2)] border-[var(--border-1)]'>
            <span className='text-sm font-semibold text-[var(--text-1)]'>
              {t.label_textarea}
            </span>
            <button
              onClick={() => setText('')}
              className='text-xs transition-colors text-[var(--text-2)] hover:text-red-500'
            >
              {t.btn_clean}
            </button>
          </div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={t.placeholder}
            className='w-full h-full flex-grow p-6 outline-none resize-none leading-relaxed bg-transparent text-[var(--text-1)]'
            style={{ minHeight: '250px' }}
          />
        </div>

        <div className='lg:col-span-4 flex flex-col gap-4'>
          <div className='rounded-2xl p-4 md:p-5 shadow-[var(--shadow-1)] flex items-center justify-between border bg-[var(--bg-1)] border-[var(--border-1)]'>
            <div>
              <p className='text-xs font-bold uppercase tracking-wider text-[var(--text-2)]'>
                {t.metrics.words}
              </p>
              <p className='text-3xl font-black text-[var(--text-1)]'>
                {wordsCount}
              </p>
            </div>
            <Type className='w-8 h-8 text-[var(--text-brand)] opacity-50' />
          </div>

          <div className='rounded-2xl p-4 md:p-5 shadow-[var(--shadow-1)] flex flex-col gap-2 border bg-[var(--bg-1)] border-[var(--border-1)]'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-xs font-bold uppercase tracking-wider text-[var(--text-2)]'>
                  {t.metrics.chars}
                </p>
                <p className='text-3xl font-black text-[var(--text-1)]'>
                  {charsCount}
                </p>
              </div>
              <Hash className='w-8 h-8 text-[var(--text-brand)] opacity-50' />
            </div>
            <label className='flex items-center gap-2 cursor-pointer mt-2 w-fit group'>
              <input
                type='checkbox'
                checked={countSpaces}
                onChange={e => setCountSpaces(e.target.checked)}
                className='sr-only'
              />
              <div
                className={`w-10 h-5 rounded-full relative transition-colors ${
                  countSpaces ? 'bg-[var(--bg-brand)]' : 'bg-[var(--border-2)]'
                }`}
              >
                <div
                  className={`absolute left-1 top-1 w-3 h-3 rounded-full transition-transform duration-300 bg-white ${
                    countSpaces ? 'translate-x-5' : ''
                  }`}
                ></div>
              </div>
              <span className='text-xs group-hover:opacity-80 text-[var(--text-2)]'>
                {t.metrics.spaces}
              </span>
            </label>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='rounded-2xl p-4 md:p-5 shadow-[var(--shadow-1)] flex flex-col items-center justify-center text-center border bg-[var(--bg-1)] border-[var(--border-1)]'>
              <p className='text-xs font-bold uppercase tracking-wider text-[var(--text-2)]'>
                {t.metrics.sentences}
              </p>
              <p className='text-2xl font-black text-[var(--text-1)]'>
                {sentencesCount}
              </p>
            </div>
            <div className='rounded-2xl p-4 md:p-5 shadow-[var(--shadow-1)] flex flex-col items-center justify-center text-center border bg-[var(--bg-1)] border-[var(--border-1)]'>
              <p className='text-xs font-bold uppercase tracking-wider text-[var(--text-2)]'>
                {t.metrics.paragraphs}
              </p>
              <p className='text-2xl font-black text-[var(--text-1)]'>
                {paragraphsCount}
              </p>
            </div>
          </div>
        </div>

        <div className='lg:col-span-12 flex flex-col rounded-2xl shadow-[var(--shadow-1)] overflow-hidden border bg-[var(--bg-1)] border-[var(--border-brand)]'>
          <div className='p-3 border-b flex flex-wrap gap-4 justify-between items-center bg-[var(--bg-brand-hover)] border-[var(--border-brand)]'>
            <div className='flex items-center gap-3 flex-wrap'>
              <span className='text-sm font-bold flex items-center gap-2 text-[var(--text-brand)]'>
                <CheckCircle className='w-4 h-4' /> {t.beta_title}
              </span>

              <div className='flex rounded-lg p-1 border bg-[var(--bg-1)] border-[var(--border-1)]'>
                <button
                  onClick={() => setLanguage('es')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1 ${
                    language === 'es'
                      ? 'shadow-sm bg-[var(--bg-brand-hover)] text-[var(--text-brand)]'
                      : 'hover:opacity-80 text-[var(--text-2)] bg-transparent'
                  }`}
                >
                  <Languages className='w-3 h-3' /> Español
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1 ${
                    language === 'en'
                      ? 'shadow-sm bg-[var(--bg-brand-hover)] text-[var(--text-brand)]'
                      : 'hover:opacity-80 text-[var(--text-2)] bg-transparent'
                  }`}
                >
                  <Languages className='w-3 h-3' /> English
                </button>
              </div>
            </div>

            <button
              onClick={handleCopy}
              disabled={!correctedText}
              className={`relative flex items-center justify-center overflow-hidden px-4 py-2 text-xs font-bold rounded-lg transition-all disabled:opacity-50 ${
                isCopied
                  ? 'text-white shadow-[0_0_15px_var(--text-success)] bg-[var(--text-success)]'
                  : 'text-white hover:opacity-90 bg-[var(--bg-brand)]'
              }`}
            >
              <AnimatePresence mode='wait'>
                {isCopied ? (
                  <motion.div
                    key='copied'
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className='flex items-center gap-2 absolute'
                  >
                    {t.btn_copied}
                  </motion.div>
                ) : (
                  <motion.div
                    key='normal'
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className='flex items-center gap-2 absolute'
                  >
                    <Copy className='w-4 h-4' /> {t.btn_copy}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className='invisible flex items-center gap-2'>
                <Copy className='w-4 h-4' /> {t.btn_copy}
              </div>
            </button>
          </div>

          <textarea
            readOnly
            value={correctedText}
            placeholder={t.placeholder_fix}
            className='w-full p-6 outline-none resize-none leading-relaxed bg-transparent text-[var(--text-1)]'
            style={{ minHeight: '150px' }}
          />
          <div className='p-3 text-[10px] text-center border-t bg-[var(--bg-2)] border-[var(--border-1)] text-[var(--text-2)]'>
            {t.disclaimer}
          </div>
        </div>
      </div>
    </div>
  )
}

/* =====================================================
   MÓDULO 6: CONVERSORES DE TEXTO (CON PROTOCOLO i18n)
===================================================== */
const ResultBox = ({
  label,
  value,
  t_common
}: {
  label: string
  value: string
  t_common: any
}) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className='space-y-1'>
      <label className='text-xs font-bold uppercase tracking-wider pl-1 text-[var(--text-2)]'>
        {label}
      </label>
      <div className='flex gap-2'>
        <input
          readOnly
          value={value}
          className='flex-grow rounded-xl px-4 py-3 text-sm outline-none font-mono bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)]'
        />
        <button
          onClick={handleCopy}
          title={t_common.copy_title}
          className={`relative p-3 rounded-xl transition-all flex-shrink-0 flex items-center justify-center overflow-hidden w-12 border ${
            copied
              ? 'text-white shadow-md bg-[var(--text-success)] border-[var(--text-success)]'
              : 'hover:opacity-80 bg-[var(--bg-2)] border-[var(--border-1)] text-[var(--text-2)] hover:text-[var(--text-brand)] hover:border-[var(--border-brand)]'
          }`}
        >
          <AnimatePresence mode='wait'>
            {copied ? (
              <motion.div
                key='copied'
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className='absolute text-[10px] font-bold'
              >
                {t_common.btn_copied}
              </motion.div>
            ) : (
              <motion.div
                key='normal'
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className='absolute'
              >
                <Copy className='w-5 h-5' />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  )
}

function TextConvertersModule ({ lang }: { lang: string }) {
  // TRADUCCIONES LOCALES DEL MÓDULO
  const t = {
    es: {
      title: 'Conversores de Texto',
      desc: 'Escribe un texto y obtén automáticamente variables y codificaciones.',
      label_source: 'Texto de Origen',
      placeholder: 'Pega aquí tu título, variable o código...',
      common: { copy_title: 'Copiar al portapapeles', btn_copied: 'Copiado ✓' },
      sections: {
        variables: 'Formatos de Variables',
        security: 'Codificación y Seguridad'
      },
      labels: {
        slug: 'WordPress Slug',
        snake: 'snake_case',
        camel: 'camelCase',
        pascal: 'PascalCase',
        screaming: 'SCREAMING_SNAKE_CASE',
        url_enc: 'URL Encode',
        url_dec: 'URL Decode',
        b64_enc: 'Base64 Encode',
        b64_dec: 'Base64 Decode'
      },
      errors: { b64: 'Error al codificar', format: 'Formato inválido' }
    },
    en: {
      title: 'Text Converters',
      desc: 'Write text and automatically get variables and encodings.',
      label_source: 'Source Text',
      placeholder: 'Paste your title, variable, or code here...',
      common: { copy_title: 'Copy to clipboard', btn_copied: 'Copied ✓' },
      sections: {
        variables: 'Variable Formats',
        security: 'Encoding & Security'
      },
      labels: {
        slug: 'WordPress Slug',
        snake: 'snake_case',
        camel: 'camelCase',
        pascal: 'PascalCase',
        screaming: 'SCREAMING_SNAKE_CASE',
        url_enc: 'URL Encode',
        url_dec: 'URL Decode',
        b64_enc: 'Base64 Encode',
        b64_dec: 'Base64 Decode'
      },
      errors: { b64: 'Encoding error', format: 'Invalid format' }
    }
  }[lang as 'es' | 'en']

  const [inputText, setInputText] = useState(
    'Mi título de post súper optimizado para SEO 2026'
  )

  // LÓGICA DE TRANSFORMACIÓN (BLINDADA)
  const toSlug = (str: string) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  const toSnake = (str: string) => toSlug(str).replace(/-/g, '_')
  const toScreamingSnake = (str: string) => toSnake(str).toUpperCase()
  const toCamel = (str: string) => {
    const words = str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .trim()
      .split(' ')
    if (words.length === 0 || words[0] === '') return ''
    return (
      words[0].toLowerCase() +
      words
        .slice(1)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join('')
    )
  }
  const toPascal = (str: string) => {
    const words = str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .trim()
      .split(' ')
    if (words.length === 0 || words[0] === '') return ''
    return words
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join('')
  }
  const safeBase64Encode = (str: string) => {
    try {
      return btoa(str)
    } catch {
      return t.errors.b64
    }
  }
  const safeBase64Decode = (str: string) => {
    try {
      return atob(str)
    } catch {
      return t.errors.format
    }
  }
  const safeUrlEncode = (str: string) => {
    try {
      return encodeURIComponent(str)
    } catch {
      return 'Error'
    }
  }
  const safeUrlDecode = (str: string) => {
    try {
      return decodeURIComponent(str)
    } catch {
      return t.errors.format
    }
  }

  return (
    <div className='animate-fade-in space-y-6'>
      <div className='text-center md:text-left'>
        <h2 className='text-2xl md:text-3xl font-bold mb-2 text-[var(--text-1)]'>
          {t.title}
        </h2>
        <p className='text-[var(--text-2)]'>{t.desc}</p>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8'>
        <div className='lg:col-span-5 rounded-2xl p-4 md:p-6 shadow-[var(--shadow-1)] flex flex-col gap-3 border bg-[var(--bg-1)] border-[var(--border-1)]'>
          <label className='text-sm font-semibold text-[var(--text-1)]'>
            {t.label_source}
          </label>
          <textarea
            rows={6}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={t.placeholder}
            className='w-full rounded-xl p-4 outline-none transition-colors resize-none bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] focus:border-[var(--border-brand)]'
          />
        </div>
        <div className='lg:col-span-7 rounded-2xl p-4 md:p-6 shadow-inner space-y-8 overflow-y-auto max-h-[600px] border bg-[var(--bg-2)] border-[var(--border-1)]'>
          <div className='space-y-4'>
            <h3 className='font-bold flex items-center gap-2 pb-2 border-b text-[var(--text-brand)] border-[var(--border-1)]'>
              <Code className='w-4 h-4' /> {t.sections.variables}
            </h3>
            <ResultBox
              label={t.labels.slug}
              value={toSlug(inputText)}
              t_common={t.common}
            />
            <ResultBox
              label={t.labels.snake}
              value={toSnake(inputText)}
              t_common={t.common}
            />
            <ResultBox
              label={t.labels.camel}
              value={toCamel(inputText)}
              t_common={t.common}
            />
            <ResultBox
              label={t.labels.pascal}
              value={toPascal(inputText)}
              t_common={t.common}
            />
            <ResultBox
              label={t.labels.screaming}
              value={toScreamingSnake(inputText)}
              t_common={t.common}
            />
          </div>
          <div className='space-y-4'>
            <h3 className='font-bold flex items-center gap-2 pb-2 border-b text-[var(--text-brand)] border-[var(--border-1)]'>
              <Zap className='w-4 h-4' /> {t.sections.security}
            </h3>
            <ResultBox
              label={t.labels.url_enc}
              value={safeUrlEncode(inputText)}
              t_common={t.common}
            />
            <ResultBox
              label={t.labels.url_dec}
              value={safeUrlDecode(inputText)}
              t_common={t.common}
            />
            <ResultBox
              label={t.labels.b64_enc}
              value={safeBase64Encode(inputText)}
              t_common={t.common}
            />
            <ResultBox
              label={t.labels.b64_dec}
              value={safeBase64Decode(inputText)}
              t_common={t.common}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* =====================================================
   MÓDULO 7: GENERADOR DE LOREM IPSUM (CON PROTOCOLO i18n)
===================================================== */
function LoremIpsumModule ({ lang }: { lang: string }) {
  // TRADUCCIONES LOCALES DEL MÓDULO
  const t = {
    es: {
      title: 'Generador de Lorem Ipsum',
      desc: 'Crea textos de relleno estructurados al instante.',
      label_paragraphs: 'Cantidad de Párrafos',
      label_words: 'Palabras por Párrafo',
      label_html: 'Estructura HTML (H2)',
      btn_vary: 'Variar texto actual',
      label_result: 'Texto Generado',
      btn_copy: 'Copiar todo',
      btn_copied: 'Copiado ✓',
      h2_prefix: 'Subtítulo de la sección'
    },
    en: {
      title: 'Lorem Ipsum Generator',
      desc: 'Create structured filler text instantly.',
      label_paragraphs: 'Number of Paragraphs',
      label_words: 'Words per Paragraph',
      label_html: 'HTML Structure (H2)',
      btn_vary: 'Vary current text',
      label_result: 'Generated Text',
      btn_copy: 'Copy all',
      btn_copied: 'Copied ✓',
      h2_prefix: 'Section Subtitle'
    }
  }[lang as 'es' | 'en']

  const [paragraphsCount, setParagraphsCount] = useState<number | ''>(3)
  const [wordsPerParagraph, setWordsPerParagraph] = useState<number | ''>(50)
  const [includeH2, setIncludeH2] = useState(true)
  const [generatedText, setGeneratedText] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  const baseWords =
    'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(
      ' '
    )

  const generateLorem = () => {
    let result = []
    const pCount = Math.max(1, Math.min(10, Number(paragraphsCount) || 1))
    const wCount = Math.max(1, Number(wordsPerParagraph) || 1)
    for (let i = 0; i < pCount; i++) {
      let paraWords = []
      for (let j = 0; j < wCount; j++) {
        paraWords.push(baseWords[Math.floor(Math.random() * baseWords.length)])
      }
      paraWords[0] =
        paraWords[0].charAt(0).toUpperCase() + paraWords[0].slice(1)
      let paraText = paraWords.join(' ') + '.'
      if (includeH2)
        result.push(`<h2>${t.h2_prefix} ${i + 1}</h2>\n<p>${paraText}</p>`)
      else result.push(paraText)
    }
    setGeneratedText(result.join('\n\n'))
  }

  useEffect(() => {
    generateLorem()
  }, [paragraphsCount, wordsPerParagraph, includeH2])

  const handleCopy = async () => {
    if (!generatedText) return
    try {
      await navigator.clipboard.writeText(generatedText)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {}
  }

  return (
    <div className='animate-fade-in space-y-6'>
      <div className='text-center md:text-left'>
        <h2 className='text-2xl md:text-3xl font-bold mb-2 text-[var(--text-1)]'>
          {t.title}
        </h2>
        <p className='text-[var(--text-2)]'>{t.desc}</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8'>
        <div className='lg:col-span-4 rounded-2xl p-4 md:p-6 shadow-[var(--shadow-1)] flex flex-col gap-6 h-fit border bg-[var(--bg-1)] border-[var(--border-1)]'>
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-[var(--text-1)]'>
              {t.label_paragraphs}
            </label>
            <input
              type='number'
              min='1'
              max='10'
              value={paragraphsCount}
              onChange={e =>
                setParagraphsCount(
                  e.target.value === '' ? '' : parseInt(e.target.value)
                )
              }
              className='w-full rounded-xl px-4 py-3 outline-none transition-colors bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] focus:border-[var(--border-brand)]'
            />
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-[var(--text-1)]'>
              {t.label_words}
            </label>
            <input
              type='number'
              min='1'
              value={wordsPerParagraph}
              onChange={e =>
                setWordsPerParagraph(
                  e.target.value === '' ? '' : parseInt(e.target.value)
                )
              }
              className='w-full rounded-xl px-4 py-3 outline-none transition-colors bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] focus:border-[var(--border-brand)]'
            />
          </div>
          <div className='pt-4 border-t border-[var(--border-1)]'>
            <label className='flex items-center gap-3 cursor-pointer group'>
              <div className='relative'>
                <input
                  type='checkbox'
                  checked={includeH2}
                  onChange={e => setIncludeH2(e.target.checked)}
                  className='sr-only'
                />
                <div
                  className={`block w-14 h-8 rounded-full transition-colors ${
                    includeH2 ? 'bg-[var(--bg-brand)]' : 'bg-[var(--border-2)]'
                  }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 w-6 h-6 rounded-full transition-transform duration-300 bg-white ${
                    includeH2 ? 'translate-x-6' : ''
                  }`}
                ></div>
              </div>
              <span className='text-sm font-bold group-hover:opacity-80 transition-colors text-[var(--text-1)]'>
                {t.label_html}
              </span>
            </label>
          </div>
          <button
            onClick={generateLorem}
            className='w-full mt-2 flex items-center justify-center gap-2 border font-bold py-3 rounded-xl transition-all bg-[var(--bg-2)] border-[var(--border-1)] text-[var(--text-1)] hover:bg-[var(--bg-1)]'
          >
            <RefreshCw className='w-4 h-4' /> {t.btn_vary}
          </button>
        </div>

        <div className='lg:col-span-8 flex flex-col rounded-2xl shadow-[var(--shadow-1)] overflow-hidden min-h-[500px] border bg-[var(--bg-1)] border-[var(--border-1)]'>
          <div className='p-3 border-b flex justify-between items-center bg-[var(--bg-2)] border-[var(--border-1)]'>
            <span className='text-sm font-semibold flex items-center gap-2 text-[var(--text-1)]'>
              {t.label_result}
            </span>
            <button
              onClick={handleCopy}
              disabled={!generatedText}
              className={`relative flex items-center justify-center overflow-hidden px-4 py-2 text-xs font-bold rounded-lg transition-all disabled:opacity-50 text-white ${
                isCopied
                  ? 'shadow-[0_0_15px_var(--text-success)] bg-[var(--text-success)]'
                  : 'hover:opacity-90 bg-[var(--bg-brand)]'
              }`}
            >
              <AnimatePresence mode='wait'>
                {isCopied ? (
                  <motion.div
                    key='copied'
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className='flex items-center gap-2 absolute'
                  >
                    {t.btn_copied}
                  </motion.div>
                ) : (
                  <motion.div
                    key='normal'
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className='flex items-center gap-2 absolute'
                  >
                    <Copy className='w-4 h-4' /> {t.btn_copy}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className='invisible flex items-center gap-2'>
                <Copy className='w-4 h-4' /> {t.btn_copy}
              </div>
            </button>
          </div>
          <textarea
            readOnly
            value={generatedText}
            className='w-full h-full p-6 font-mono text-sm outline-none resize-none leading-relaxed bg-transparent text-[var(--text-2)]'
          />
        </div>
      </div>
    </div>
  )
}

/* =====================================================
   MÓDULO 8: TRANSFORMADOR DE TEXTO (CON PROTOCOLO i18n)
===================================================== */
function TextTransformerModule ({ lang }: { lang: string }) {
  // TRADUCCIONES LOCALES DEL MÓDULO
  const t = {
    es: {
      title: 'Transformador de Texto',
      desc: 'Pega tu texto, aplica filtros que <strong>se acumulan</strong>, dale formato y visualiza el resultado respetando tus ediciones.',
      label_original: '1. Texto Original',
      btn_sync: 'Enviar a edición ↓',
      btn_clean_all: 'Limpiar todo',
      placeholder_input: 'Pega aquí el texto base...',
      btn_copy: 'Copiar Resultado',
      btn_copied: 'Copiado ✓',
      search: {
        title: 'Buscar y Reemplazar',
        placeholder_find: 'Buscar palabra...',
        btn_find: 'Buscar',
        placeholder_replace: 'Reemplazar con...',
        btn_replace: 'Reemplazar',
        no_matches: 'No hay coincidencias.',
        matches: 'coincidencias.'
      },
      filters: {
        title: 'Filtro de Mayúsculas',
        upper: 'MAYÚSCULAS',
        lower: 'minúsculas',
        title_case: 'Tipo Título',
        sentence: '1ra Mayúscula',
        invert: 'iNVERTIR mAY/mIN',
        after_dot: 'Mayúscula después del punto.',
        alternate: 'aLtErNaDaS (iNtErCaMbIaDaS)'
      },
      cleanup: {
        title: 'Limpieza de Símbolos',
        desc: 'Haz clic para borrar el símbolo del texto:',
        no_spaces: 'Eliminar TODOS los espacios',
        double_spaces: 'Quitar espacios dobles/extra',
        strip_html: 'Eliminar etiquetas HTML',
        reverse: 'Invertir texto (otxet)'
      }
    },
    en: {
      title: 'Text Transformer',
      desc: 'Paste your text, apply <strong>cumulative</strong> filters, format it, and preview results respecting your edits.',
      label_original: '1. Original Text',
      btn_sync: 'Send to editor ↓',
      btn_clean_all: 'Clear all',
      placeholder_input: 'Paste base text here...',
      btn_copy: 'Copy Result',
      btn_copied: 'Copied ✓',
      search: {
        title: 'Find & Replace',
        placeholder_find: 'Find word...',
        btn_find: 'Find',
        placeholder_replace: 'Replace with...',
        btn_replace: 'Replace',
        no_matches: 'No matches.',
        matches: 'matches.'
      },
      filters: {
        title: 'Case Filters',
        upper: 'UPPERCASE',
        lower: 'lowercase',
        title_case: 'Title Case',
        sentence: 'Sentence case',
        invert: 'iNVERT cASE',
        after_dot: 'Capitalize after period.',
        alternate: 'aLtErNaTiNg cAsE'
      },
      cleanup: {
        title: 'Symbol Cleanup',
        desc: 'Click to remove the symbol from the text:',
        no_spaces: 'Remove ALL spaces',
        double_spaces: 'Remove double/extra spaces',
        strip_html: 'Remove HTML tags',
        reverse: 'Reverse text (txet)'
      }
    }
  }[lang as 'es' | 'en']

  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [findText, setFindText] = useState('')
  const [replaceText, setReplaceText] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  const inputRef = useRef<HTMLDivElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  const symbolsToClean = [
    '-',
    '_',
    '/',
    '\\',
    "'",
    '"',
    '?',
    '¿',
    '¡',
    '!',
    ':',
    ';',
    '='
  ]

  const escapeRegExp = (string: string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  const plainTextForCount = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return (
      new DOMParser().parseFromString(outputText, 'text/html').body
        .textContent || ''
    )
  }, [outputText])

  const matchCount = findText
    ? (plainTextForCount.match(new RegExp(escapeRegExp(findText), 'gi')) || [])
        .length
    : 0

  const processHtml = (html: string, mode: string, payload?: any) => {
    if (!html) return ''
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const walk = document.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null)
    let node
    while ((node = walk.nextNode())) {
      let val = node.nodeValue || ''
      switch (mode) {
        case 'upper':
          val = val.toUpperCase()
          break
        case 'lower':
          val = val.toLowerCase()
          break
        case 'title':
          val = val.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
          break
        case 'sentence':
          val = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
          break
        case 'afterDot':
          val = val.replace(/(^\w|\.\s+\w)/gm, c => c.toUpperCase())
          break
        case 'alternate':
          val = val
            .split('')
            .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
            .join('')
          break
        case 'invert':
          val = val
            .split('')
            .map(c =>
              c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()
            )
            .join('')
          break
        case 'reverse':
          val = val.split('').reverse().join('')
          break
        case 'spaces':
          val = val.replace(/\s+/g, ' ').trim()
          break
        case 'no_spaces':
          val = val.replace(/\s+/g, '')
          break
        case 'replace':
          if (payload?.find)
            val = val.replace(
              new RegExp(escapeRegExp(payload.find), 'gi'),
              payload.replace
            )
          break
        case 'remove_symbol':
          if (payload?.symbol)
            val = val.replace(new RegExp(escapeRegExp(payload.symbol), 'g'), '')
          break
      }
      node.nodeValue = val
    }
    return mode === 'stripHtml'
      ? doc.body.textContent || ''
      : doc.body.innerHTML
  }

  const handleQuickAction = (action: string, payload?: any) => {
    const currentHtml = outputRef.current?.innerHTML || outputText || inputText
    const newHtml = processHtml(currentHtml, action, payload)
    setOutputText(newHtml)
    if (outputRef.current) outputRef.current.innerHTML = newHtml
  }

  const handleInputOriginal = (e: React.FormEvent<HTMLDivElement>) => {
    let val = e.currentTarget.innerHTML
    val = val.replace(/<mark[^>]*>([\s\S]*?)<\/mark>/gi, '$1')
    setInputText(val)
    if (!outputText && outputRef.current) {
      setOutputText(val)
      outputRef.current.innerHTML = val
    }
  }

  const forceSync = () => {
    setOutputText(inputText)
    if (outputRef.current) outputRef.current.innerHTML = inputText
  }

  const handleInputModified = (e: React.FormEvent<HTMLDivElement>) => {
    setOutputText(e.currentTarget.innerHTML)
  }

  const handleSearchHighlight = () => {
    if (!findText || !outputRef.current) return
    let html = outputText
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const walk = document.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null)
    const nodes = []
    const regex = new RegExp(`(${escapeRegExp(findText)})`, 'gi')
    let node
    while ((node = walk.nextNode())) {
      if (regex.test(node.nodeValue || '')) nodes.push(node)
    }
    nodes.forEach(n => {
      const span = document.createElement('span')
      span.innerHTML = (n.nodeValue || '').replace(
        regex,
        '<mark style="background-color: #d946ef; color: white; font-weight: bold; border-radius: 0.125rem; padding: 0 0.125rem;">$1</mark>'
      )
      n.parentNode?.replaceChild(span, n)
    })
    outputRef.current.innerHTML = doc.body.innerHTML
  }

  const applyFormat = (command: string) => {
    if (outputRef.current) {
      outputRef.current.focus()
      document.execCommand(command, false, undefined)
      setOutputText(outputRef.current.innerHTML)
    }
  }

  const handleClearFormat = () => {
    if (outputRef.current) {
      const plain = outputRef.current.textContent || ''
      setOutputText(plain)
      outputRef.current.innerHTML = plain
    }
  }

  const handleCopy = async () => {
    if (!outputText) return
    try {
      await navigator.clipboard.writeText(outputText)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {}
  }

  return (
    <div className='animate-fade-in space-y-6'>
      <div className='text-center md:text-left'>
        <h2 className='text-2xl md:text-3xl font-bold mb-2 text-[var(--text-1)]'>
          {t.title}
        </h2>
        <p
          className='text-[var(--text-2)]'
          dangerouslySetInnerHTML={{ __html: t.desc }}
        ></p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6'>
        <div className='lg:col-span-8 flex flex-col gap-6'>
          <div className='flex flex-col rounded-2xl shadow-[var(--shadow-1)] overflow-hidden min-h-[220px] border bg-[var(--bg-1)] border-[var(--border-1)]'>
            <div className='p-3 border-b flex justify-between items-center bg-[var(--bg-2)] border-[var(--border-1)]'>
              <span className='text-sm font-semibold text-[var(--text-1)]'>
                {t.label_original}
              </span>
              <div className='flex gap-3'>
                <button
                  onClick={forceSync}
                  className='text-xs font-bold transition-colors flex items-center gap-1 text-[var(--text-brand)] hover:underline'
                >
                  <ArrowRightLeft className='w-3 h-3' /> {t.btn_sync}
                </button>
                <button
                  onClick={() => {
                    setInputText('')
                    setOutputText('')
                    setFindText('')
                    if (inputRef.current) inputRef.current.innerHTML = ''
                    if (outputRef.current) outputRef.current.innerHTML = ''
                  }}
                  className='text-xs transition-colors text-[var(--text-2)] hover:text-red-500'
                >
                  {t.btn_clean_all}
                </button>
              </div>
            </div>
            <div
              ref={inputRef}
              contentEditable
              onInput={handleInputOriginal}
              className='w-full h-full flex-grow p-6 outline-none leading-relaxed overflow-y-auto max-h-[250px] bg-transparent text-[var(--text-1)]'
              style={{ minHeight: '150px' }}
            />
          </div>

          <div className='flex flex-col rounded-2xl shadow-[var(--shadow-1)] overflow-hidden min-h-[300px] border bg-[var(--bg-brand-hover)] border-[var(--border-brand)]'>
            <div className='p-2 border-b flex justify-between items-center flex-wrap gap-2 bg-[var(--bg-1)] border-[var(--border-1)]'>
              <div className='flex items-center gap-1 p-1 rounded-lg border bg-[var(--bg-2)] border-[var(--border-1)]'>
                <button
                  onClick={() => applyFormat('bold')}
                  className='p-2 rounded hover:bg-[var(--bg-brand-hover)] hover:text-[var(--text-brand)]'
                >
                  <Bold className='w-4 h-4 text-[var(--text-2)]' />
                </button>
                <button
                  onClick={() => applyFormat('italic')}
                  className='p-2 rounded hover:bg-[var(--bg-brand-hover)] hover:text-[var(--text-brand)]'
                >
                  <Italic className='w-4 h-4 text-[var(--text-2)]' />
                </button>
                <button
                  onClick={() => applyFormat('underline')}
                  className='p-2 rounded hover:bg-[var(--bg-brand-hover)] hover:text-[var(--text-brand)]'
                >
                  <UnderlineIcon className='w-4 h-4 text-[var(--text-2)]' />
                </button>
                <button
                  onClick={() => applyFormat('strikeThrough')}
                  className='p-2 rounded hover:bg-[var(--bg-brand-hover)] hover:text-[var(--text-brand)]'
                >
                  <Strikethrough className='w-4 h-4 text-[var(--text-2)]' />
                </button>
                <div className='w-px h-6 mx-1 bg-[var(--border-1)]'></div>
                <button
                  onClick={handleClearFormat}
                  className='p-2 rounded text-red-500 hover:bg-red-500/10'
                >
                  <Eraser className='w-4 h-4' />
                </button>
              </div>
              <button
                onClick={handleCopy}
                className={`relative flex items-center justify-center overflow-hidden px-4 py-2 text-xs font-bold rounded-lg transition-all text-white ${
                  isCopied ? 'bg-[var(--text-success)]' : 'bg-[var(--bg-brand)]'
                }`}
              >
                <AnimatePresence mode='wait'>
                  {isCopied ? (
                    <motion.div
                      key='copied'
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className='flex items-center gap-2 absolute'
                    >
                      {t.btn_copied}
                    </motion.div>
                  ) : (
                    <motion.div
                      key='normal'
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className='flex items-center gap-2 absolute'
                    >
                      <Copy className='w-4 h-4' /> {t.btn_copy}
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className='invisible flex items-center gap-2'>
                  <Copy className='w-4 h-4' /> {t.btn_copy}
                </div>
              </button>
            </div>
            <div
              ref={outputRef}
              contentEditable
              onInput={handleInputModified}
              className='w-full h-full flex-grow p-6 outline-none leading-relaxed overflow-y-auto max-h-[350px] bg-transparent text-[var(--text-1)]'
              style={{ minHeight: '250px' }}
            />
          </div>
        </div>

        <div className='lg:col-span-4 flex flex-col gap-4 md:gap-6'>
          <div className='rounded-2xl p-4 md:p-5 shadow-[var(--shadow-1)] space-y-3 border bg-[var(--bg-1)] border-[var(--border-1)]'>
            <h3 className='font-bold text-sm uppercase tracking-wider text-[var(--text-1)]'>
              {t.search.title}
            </h3>
            <div className='flex flex-col gap-3'>
              <div className='flex gap-2'>
                <input
                  type='text'
                  placeholder={t.search.placeholder_find}
                  value={findText}
                  onChange={e => setFindText(e.target.value)}
                  className='flex-grow rounded-lg px-3 py-2 text-sm bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)]'
                />
                <button
                  onClick={handleSearchHighlight}
                  disabled={!findText}
                  className='px-4 py-2 font-bold rounded-lg text-sm bg-[var(--bg-2)] border border-[var(--border-1)] text-[#d946ef] hover:bg-[#d946ef]/10'
                >
                  {t.search.btn_find}
                </button>
              </div>
              {findText && (
                <span className='text-[10px] font-semibold text-[#d946ef]'>
                  {matchCount === 0
                    ? t.search.no_matches
                    : `${matchCount} ${t.search.matches}`}
                </span>
              )}
              <input
                type='text'
                placeholder={t.search.placeholder_replace}
                value={replaceText}
                onChange={e => setReplaceText(e.target.value)}
                className='w-full rounded-lg px-3 py-2 text-sm bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)]'
              />
              <button
                onClick={() =>
                  handleQuickAction('replace', {
                    find: findText,
                    replace: replaceText
                  })
                }
                disabled={!findText || !outputText || matchCount === 0}
                className='w-full py-2 text-white font-bold rounded-lg bg-[var(--bg-brand)]'
              >
                {t.search.btn_replace} {matchCount > 0 ? `(${matchCount})` : ''}
              </button>
            </div>
          </div>

          <div className='rounded-2xl p-4 md:p-5 shadow-[var(--shadow-1)] space-y-3 border bg-[var(--bg-1)] border-[var(--border-1)]'>
            <h3 className='font-bold text-sm uppercase tracking-wider text-[var(--text-1)]'>
              {t.filters.title}
            </h3>
            <div className='grid grid-cols-2 gap-2'>
              <button
                onClick={() => handleQuickAction('upper')}
                className='py-2 px-3 rounded-lg text-sm bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] hover:border-[var(--border-brand)]'
              >
                {t.filters.upper}
              </button>
              <button
                onClick={() => handleQuickAction('lower')}
                className='py-2 px-3 rounded-lg text-sm bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] hover:border-[var(--border-brand)]'
              >
                {t.filters.lower}
              </button>
              <button
                onClick={() => handleQuickAction('title')}
                className='py-2 px-3 rounded-lg text-sm bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] hover:border-[var(--border-brand)]'
              >
                {t.filters.title_case}
              </button>
              <button
                onClick={() => handleQuickAction('sentence')}
                className='py-2 px-3 rounded-lg text-sm bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] hover:border-[var(--border-brand)]'
              >
                {t.filters.sentence}
              </button>
              <button
                onClick={() => handleQuickAction('invert')}
                className='py-2 px-3 rounded-lg text-sm bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] hover:border-[var(--border-brand)]'
              >
                {t.filters.invert}
              </button>
              <button
                onClick={() => handleQuickAction('afterDot')}
                className='col-span-2 py-2 px-3 rounded-lg text-sm bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] hover:border-[var(--border-brand)]'
              >
                {t.filters.after_dot}
              </button>
              <button
                onClick={() => handleQuickAction('alternate')}
                className='col-span-2 py-2 px-3 rounded-lg text-sm bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] hover:border-[var(--border-brand)]'
              >
                {t.filters.alternate}
              </button>
            </div>
          </div>

          <div className='rounded-2xl p-4 md:p-5 shadow-[var(--shadow-1)] space-y-4 border bg-[var(--bg-1)] border-[var(--border-1)]'>
            <h3 className='font-bold text-sm uppercase tracking-wider text-[var(--text-1)]'>
              {t.cleanup.title}
            </h3>
            <div className='space-y-2'>
              <p className='text-xs text-[var(--text-2)]'>{t.cleanup.desc}</p>
              <div className='flex flex-wrap gap-2'>
                {symbolsToClean.map(sym => (
                  <button
                    key={sym}
                    onClick={() =>
                      handleQuickAction('remove_symbol', { symbol: sym })
                    }
                    className='w-10 h-10 flex items-center justify-center rounded-lg font-mono font-bold border bg-[var(--bg-2)] border-[var(--border-1)] text-[var(--text-1)] hover:bg-red-500 hover:text-white'
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>
            <div className='grid grid-cols-1 gap-2 pt-4 border-t border-[var(--border-1)]'>
              <button
                onClick={() => handleQuickAction('no_spaces')}
                className='py-2 px-3 flex items-center gap-2 font-bold rounded-lg text-sm border bg-[var(--bg-2)] border-[var(--border-1)] text-red-500 hover:bg-red-500/10'
              >
                {t.cleanup.no_spaces}
              </button>
              <button
                onClick={() => handleQuickAction('spaces')}
                className='py-2 px-3 rounded-lg text-sm border bg-[var(--bg-2)] border-[var(--border-1)] text-[var(--text-1)] hover:border-[var(--border-brand)]'
              >
                {t.cleanup.double_spaces}
              </button>
              <button
                onClick={() => handleQuickAction('stripHtml')}
                className='py-2 px-3 rounded-lg text-sm border bg-[var(--bg-2)] border-[var(--border-1)] text-[var(--text-1)] hover:border-[var(--border-brand)]'
              >
                {t.cleanup.strip_html}
              </button>
              <button
                onClick={() => handleQuickAction('reverse')}
                className='py-2 px-3 rounded-lg text-sm border bg-[var(--bg-2)] border-[var(--border-1)] text-[var(--text-1)] hover:border-[var(--border-brand)]'
              >
                {t.cleanup.reverse}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =====================================================
   MÓDULO 9: GENERADOR DE HASHTAGS (CON PROTOCOLO i18n)
===================================================== */
function HashtagModule ({ lang }: { lang: string }) {
  // TRADUCCIONES LOCALES DEL MÓDULO
  const t = {
    es: {
      title: 'Generador de Hashtags',
      desc: 'Escribe palabras separadas por comas o espacios y conviértelas en hashtags listos.',
      label_input: 'Tus Palabras o Frase',
      placeholder: 'Ej: seo, wordpress, rendimiento web...',
      btn_clean: 'Limpiar área',
      result_title: 'Hashtags Generados',
      result_empty: '#tus #hashtags #apareceran #aqui',
      btn_copy: 'Copiar Hashtags',
      btn_copied: 'Copiado ✓'
    },
    en: {
      title: 'Hashtag Generator',
      desc: 'Type words separated by commas or spaces and convert them into ready-to-use hashtags.',
      label_input: 'Your Words or Phrase',
      placeholder: 'Ex: seo, wordpress, web performance...',
      btn_clean: 'Clear area',
      result_title: 'Generated Hashtags',
      result_empty: '#your #hashtags #will #appear #here',
      btn_copy: 'Copy Hashtags',
      btn_copied: 'Copied ✓'
    }
  }[lang as 'es' | 'en']

  const [text, setText] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  const generateHashtags = () => {
    if (!text.trim()) return ''
    return text
      .split(/[\s,]+/)
      .filter(w => w.trim().length > 0)
      .map(w => '#' + w.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]/g, ''))
      .join(' ')
  }
  const result = generateHashtags()

  const handleCopy = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Fallo al copiar', err)
    }
  }

  return (
    <div className='animate-fade-in space-y-6'>
      <div className='text-center md:text-left'>
        <h2 className='text-2xl md:text-3xl font-bold mb-2 text-[var(--text-1)]'>
          {t.title}
        </h2>
        <p className='text-[var(--text-2)]'>{t.desc}</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8'>
        <div className='rounded-2xl p-4 md:p-6 shadow-[var(--shadow-1)] flex flex-col gap-3 border bg-[var(--bg-1)] border-[var(--border-1)]'>
          <label className='text-sm font-semibold text-[var(--text-1)]'>
            {t.label_input}
          </label>
          <textarea
            rows={5}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={t.placeholder}
            className='w-full rounded-xl p-4 outline-none transition-colors resize-none bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] focus:border-[var(--border-brand)]'
          />
          <button
            onClick={() => setText('')}
            className='text-xs transition-colors self-start text-[var(--text-2)] hover:text-[var(--text-brand)]'
          >
            {t.btn_clean}
          </button>
        </div>

        <div className='rounded-2xl p-4 md:p-6 shadow-inner flex flex-col min-h-[200px] border bg-[var(--bg-2)] border-[var(--border-1)]'>
          <h3 className='font-bold mb-4 text-[var(--text-brand)]'>
            {t.result_title}
          </h3>
          <div className='flex-grow p-4 rounded-xl text-sm break-all border bg-[var(--bg-2)] border-[var(--border-1)] text-[var(--text-1)] font-mono'>
            {result || (
              <span className='opacity-50 text-[var(--text-2)]'>
                {t.result_empty}
              </span>
            )}
          </div>
          <button
            onClick={handleCopy}
            disabled={!result}
            className={`relative mt-4 w-full flex items-center justify-center overflow-hidden gap-2 font-bold py-3 rounded-xl transition-all disabled:opacity-50 text-white ${
              isCopied
                ? 'shadow-[0_0_15px_var(--text-success)] bg-[var(--text-success)]'
                : 'hover:opacity-90 bg-[var(--bg-brand)]'
            }`}
          >
            <AnimatePresence mode='wait'>
              {isCopied ? (
                <motion.div
                  key='copied'
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className='flex items-center gap-2 absolute'
                >
                  {t.btn_copied}
                </motion.div>
              ) : (
                <motion.div
                  key='normal'
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className='flex items-center gap-2 absolute'
                >
                  <Copy className='w-5 h-5' /> {t.btn_copy}
                </motion.div>
              )}
            </AnimatePresence>
            <div className='invisible flex items-center gap-2'>
              <Copy className='w-5 h-5' /> {t.btn_copy}
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

/* =====================================================
   MÓDULO 10: GENERADOR DE CONTRASEÑAS (CON PROTOCOLO i18n)
===================================================== */
function PasswordModule ({ lang }: { lang: string }) {
  // TRADUCCIONES LOCALES DEL MÓDULO
  const t = {
    es: {
      title: 'Generador de Contraseñas',
      desc: 'Crea contraseñas seguras y aleatorias para tus sitios o bases de datos.',
      placeholder: 'Haz_clic_para_generar_***',
      btn_copied: 'Copiado ✓',
      security_level: 'Nivel de Seguridad',
      levels: {
        normal: { title: 'Normal', desc: '8 Caracteres' },
        medium: { title: 'Medio', desc: '12 Caracteres' },
        high: { title: 'Alto (Seguro)', desc: '20 Caracteres' }
      }
    },
    en: {
      title: 'Password Generator',
      desc: 'Create secure and random passwords for your sites or databases.',
      placeholder: 'Click_to_generate_***',
      btn_copied: 'Copied ✓',
      security_level: 'Security Level',
      levels: {
        normal: { title: 'Normal', desc: '8 Characters' },
        medium: { title: 'Medium', desc: '12 Characters' },
        high: { title: 'High (Secure)', desc: '20 Characters' }
      }
    }
  }[lang as 'es' | 'en']

  const [password, setPassword] = useState(t.placeholder)
  const [isCopied, setIsCopied] = useState(false)

  const generatePassword = (level: 'normal' | 'medio' | 'alto') => {
    const chars =
      level === 'normal'
        ? 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        : 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~|}{[]:;?><,./-='
    const len = level === 'normal' ? 8 : level === 'medio' ? 12 : 20
    let result = ''
    for (let i = 0; i < len; i++)
      result += chars[Math.floor(Math.random() * chars.length)]
    setPassword(result)
  }

  const handleCopy = async () => {
    if (password === t.placeholder) return
    try {
      await navigator.clipboard.writeText(password)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Fallo al copiar', err)
    }
  }

  return (
    <div className='animate-fade-in space-y-6'>
      <div className='text-center md:text-left'>
        <h2 className='text-2xl md:text-3xl font-bold mb-2 text-[var(--text-1)]'>
          {t.title}
        </h2>
        <p className='text-[var(--text-2)]'>{t.desc}</p>
      </div>

      <div className='rounded-2xl p-6 md:p-8 shadow-[var(--shadow-1)] flex flex-col items-center justify-center max-w-2xl mx-auto mt-6 md:mt-10 border bg-[var(--bg-1)] border-[var(--border-1)]'>
        <div className='w-full rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border bg-[var(--bg-2)] border-[var(--border-1)]'>
          <span className='text-xl md:text-3xl font-mono break-all text-center sm:text-left tracking-wider text-[var(--text-1)]'>
            {password}
          </span>
          <button
            onClick={handleCopy}
            className={`relative p-4 rounded-xl transition-all flex-shrink-0 flex items-center justify-center overflow-hidden w-16 h-16 ${
              isCopied
                ? 'shadow-[0_0_15px_var(--text-success)] text-white bg-[var(--text-success)]'
                : 'hover:opacity-90 bg-[var(--bg-brand-hover)] text-[var(--text-brand)] hover:bg-[var(--bg-brand)] hover:text-white'
            }`}
          >
            <AnimatePresence mode='wait'>
              {isCopied ? (
                <motion.div
                  key='copied'
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className='absolute text-[10px] font-bold'
                >
                  {t.btn_copied}
                </motion.div>
              ) : (
                <motion.div
                  key='normal'
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className='absolute'
                >
                  <Copy className='w-6 h-6' />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        <h3 className='text-sm font-bold uppercase tracking-wider mb-4 text-[var(--text-2)]'>
          {t.security_level}
        </h3>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 w-full'>
          <button
            onClick={() => generatePassword('normal')}
            className='py-4 px-4 rounded-xl flex flex-col items-center gap-1 transition-all border bg-[var(--bg-2)] border-[var(--border-1)] hover:border-green-500'
          >
            <span className='font-bold text-[var(--text-1)]'>
              {t.levels.normal.title}
            </span>
            <span className='text-xs text-[var(--text-2)]'>
              {t.levels.normal.desc}
            </span>
          </button>
          <button
            onClick={() => generatePassword('medio')}
            className='py-4 px-4 rounded-xl flex flex-col items-center gap-1 transition-all border bg-[var(--bg-2)] border-[var(--border-1)] hover:border-yellow-500'
          >
            <span className='font-bold text-[var(--text-1)]'>
              {t.levels.medium.title}
            </span>
            <span className='text-xs text-[var(--text-2)]'>
              {t.levels.medium.desc}
            </span>
          </button>
          <button
            onClick={() => generatePassword('alto')}
            className='py-4 px-4 rounded-xl flex flex-col items-center gap-1 transition-all border bg-[var(--bg-2)] border-[var(--border-1)] hover:border-red-500'
          >
            <span className='font-bold text-[var(--text-1)]'>
              {t.levels.high.title}
            </span>
            <span className='text-xs text-[var(--text-2)]'>
              {t.levels.high.desc}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

/* =====================================================
   CASCARÓN DEL ERP (CON PROTOCOLO i18n)
===================================================== */
export default function SuiteTextPage ({
  params: { lang }
}: {
  params: { lang: string }
}) {
  // TRADUCCIONES PARA EL LAYOUT GLOBAL
  const t = {
    es: {
      sidebar: {
        title: 'Suite Text',
        subtitle: 'SEO & Performance',
        donate_title: '¿Te es útil la Suite?',
        donate_methods: { paypal: 'PayPal', payo: 'Payo', payu: 'PayU' }
      },
      modal: {
        title: 'Donar con Payoneer',
        desc: 'Para apoyarme a través de Payoneer, por favor envía tu donación utilizando mi correo electrónico asociado. ¡Mil gracias! ☕',
        label_email: 'Correo Payoneer',
        copied: 'Copiado ✓'
      },
      footer: {
        rights: '© 2026 Suite Text - Todos los derechos reservados.',
        heart: 'Desarrollado con ❤️ para la comunidad'
      },
      menu: [
        { id: 'paint', label: 'Pintura y Sombras' },
        { id: 'counter', label: 'Contador & Corrector' },
        { id: 'transform', label: 'Transformador' },
        { id: 'converters', label: 'Conversores URL' },
        { id: 'hashtags', label: 'Hashtags' },
        { id: 'passwords', label: 'Contraseñas' },
        { id: 'lorem', label: 'Generador Lorem' },
        { id: 'whatsapp', label: 'Link WhatsApp' },
        { id: 'qr', label: 'Código QR' },
        { id: 'images', label: 'Optimizador WebP' }
      ]
    },
    en: {
      sidebar: {
        title: 'Suite Text',
        subtitle: 'SEO & Performance',
        donate_title: 'Is this Suite useful?',
        donate_methods: { paypal: 'PayPal', payo: 'Payo', payu: 'PayU' }
      },
      modal: {
        title: 'Donate with Payoneer',
        desc: 'To support me via Payoneer, please send your donation using my associated email. Thank you so much! ☕',
        label_email: 'Payoneer Email',
        copied: 'Copied ✓'
      },
      footer: {
        rights: '© 2026 Suite Text - All rights reserved.',
        heart: 'Developed with ❤️ for the community'
      },
      menu: [
        { id: 'paint', label: 'Painting and Shadows' },
        { id: 'counter', label: 'Word Counter & Fixer' },
        { id: 'transform', label: 'Transformer' },
        { id: 'converters', label: 'URL Converters' },
        { id: 'hashtags', label: 'Hashtags' },
        { id: 'passwords', label: 'Passwords' },
        { id: 'lorem', label: 'Lorem Generator' },
        { id: 'whatsapp', label: 'WhatsApp Link' },
        { id: 'qr', label: 'QR Code' },
        { id: 'images', label: 'WebP Optimizer' }
      ]
    }
  }[lang as 'es' | 'en']

  const [activeTab, setActiveTab] = useState('paint')
  const [donationModal, setDonationModal] = useState<null | 'payoneer'>(null)
  const [copiedData, setCopiedData] = useState<string>('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Mapeo de iconos (Blindaje Visual - No se traduce)
  const menuIcons: Record<string, React.ReactNode> = {
    paint: <Palette className='w-5 h-5' />,
    analyzer: <Search className='w-5 h-5' />,
    counter: <BarChart2 className='w-5 h-5' />,
    transform: <Type className='w-5 h-5' />,
    converters: <ArrowRightLeft className='w-5 h-5' />,
    hashtags: <Hash className='w-5 h-5' />,
    passwords: <Key className='w-5 h-5' />,
    lorem: <AlignLeft className='w-5 h-5' />,
    whatsapp: <MessageCircle className='w-5 h-5' />,
    qr: <QrCode className='w-5 h-5' />,
    images: <ImageIcon className='w-5 h-5' />
  }

  const handleCopyData = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedData(id)
    setTimeout(() => setCopiedData(''), 2000)
  }

  return (
    <div className='min-h-screen pt-40 md:pt-50 pb-8 md:pb-12 flex flex-col relative bg-[var(--bg-body)]'>
      {/* MODAL DE DONACIONES */}
      {donationModal && (
        <div className='fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fade-in bg-black/80 backdrop-blur-sm'>
          <div className='rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden border bg-[var(--bg-1)] border-[var(--border-1)]'>
            <div className='p-4 border-b flex justify-between items-center bg-[var(--bg-2)] border-[var(--border-1)]'>
              <h3 className='font-bold flex items-center gap-2 text-[var(--text-1)]'>
                <Heart className='w-5 h-5 text-red-500 fill-red-500' />{' '}
                {t.modal.title}
              </h3>
              <button
                onClick={() => setDonationModal(null)}
                className='transition-colors text-[var(--text-2)] hover:text-red-500'
              >
                <XCircle className='w-6 h-6' />
              </button>
            </div>
            <div className='p-6 space-y-6'>
              <p className='text-sm leading-relaxed text-[var(--text-2)]'>
                {t.modal.desc}
              </p>
              <div className='space-y-2'>
                <label className='text-xs font-bold uppercase text-[var(--text-2)]'>
                  {t.modal.label_email}
                </label>
                <div className='flex gap-2'>
                  <input
                    readOnly
                    value='loaizacarmonaa@gmail.com'
                    className='w-full rounded-lg px-4 py-3 text-sm outline-none font-mono bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)]'
                  />
                  <button
                    onClick={() =>
                      handleCopyData(
                        'loaizacarmonaa@gmail.com',
                        'payoneer_email'
                      )
                    }
                    className={`relative p-3 rounded-lg transition-all flex-shrink-0 flex items-center justify-center w-12 text-white ${
                      copiedData === 'payoneer_email'
                        ? 'bg-[var(--text-success)]'
                        : 'bg-[var(--bg-brand)]'
                    }`}
                  >
                    <AnimatePresence mode='wait'>
                      {copiedData === 'payoneer_email' ? (
                        <motion.div
                          key='copied'
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          className='absolute text-[9px] font-bold'
                        >
                          {t.modal.copied}
                        </motion.div>
                      ) : (
                        <motion.div
                          key='normal'
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          className='absolute'
                        >
                          <Copy className='w-5 h-5' />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER MÓVIL */}
      <div className='top-36 left-0 right-0 z-50 md:hidden p-4 border-b bg-[var(--bg-1)] border-[var(--border-1)] backdrop-blur-md'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-bold flex items-center gap-2 text-[var(--text-1)]'>
            <Zap className='w-6 h-6 text-[var(--text-brand)]' />{' '}
            {t.sidebar.title}
          </h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='p-2 rounded-lg bg-[var(--bg-2)] text-[var(--text-1)]'
          >
            {mobileMenuOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-40 md:hidden bg-black/50 backdrop-blur-sm'
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className='absolute left-0 top-[250px] bottom-0 w-72 overflow-y-auto p-4 border-r bg-[var(--bg-1)] border-[var(--border-1)] shadow-2xl'
              onClick={e => e.stopPropagation()}
            >
              <nav className='flex flex-col gap-1'>
                {t.menu.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === item.id
                        ? 'bg-[var(--bg-brand-hover)] border-[var(--border-brand)] text-[var(--text-brand)]'
                        : 'text-[var(--text-2)] hover:bg-[var(--bg-2)]'
                    }`}
                  >
                    {menuIcons[item.id]} {item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className='w-full max-w-[1400px] mx-auto px-4 md:px-5 flex-grow flex flex-col md:flex-row gap-4 md:gap-6'>
        {/* SIDEBAR ESCRITORIO */}
        <aside className='hidden md:flex w-72 flex-shrink-0 rounded-2xl flex-col shadow-[var(--shadow-1)] h-[calc(100vh-8rem)] sticky top-24 border bg-[var(--bg-1)] border-[var(--border-1)] overflow-hidden'>
          <div className='p-6 pb-4 border-b border-[var(--border-1)]'>
            <h1 className='text-xl font-bold flex items-center gap-2 text-[var(--text-1)]'>
              <Zap className='w-6 h-6 text-[var(--text-brand)]' />{' '}
              {t.sidebar.title}
            </h1>
            <p className='text-xs mt-1 tracking-wider uppercase text-[var(--text-2)]'>
              {t.sidebar.subtitle}
            </p>
          </div>
          <nav className='flex-grow overflow-y-auto p-4 flex flex-col gap-1'>
            {t.menu.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? 'bg-[var(--bg-brand-hover)] border-[var(--border-brand)] text-[var(--text-brand)] border'
                    : 'text-[var(--text-2)] hover:bg-[var(--bg-2)]'
                }`}
              >
                {menuIcons[item.id]} {item.label}
              </button>
            ))}
          </nav>

          <div className='p-4 border-t border-[var(--border-1)] bg-[var(--bg-2)]'>
            <div className='rounded-xl p-4 text-center space-y-3 border bg-[var(--bg-1)] border-[var(--border-brand)]'>
              <Heart className='w-6 h-6 mx-auto animate-pulse text-red-500 fill-red-500' />
              <h4 className='text-sm font-bold text-[var(--text-1)]'>
                {t.sidebar.donate_title}
              </h4>
              <div className='grid grid-cols-3 gap-2 pt-1'>
                <a
                  href='https://www.paypal.com/donate/?hosted_button_id=CB37A97E6SSPN'
                  target='_blank'
                  rel='noopener'
                  className='py-2 rounded-lg bg-[var(--bg-2)] text-[10px] font-bold border border-[var(--border-1)] hover:border-[#00457C]'
                >
                  {t.sidebar.donate_methods.paypal}
                </a>
                <button
                  onClick={() => setDonationModal('payoneer')}
                  className='py-2 rounded-lg bg-[var(--bg-2)] text-[10px] font-bold border border-[var(--border-1)] hover:border-[#FF4800]'
                >
                  {t.sidebar.donate_methods.payo}
                </button>
                <a
                  href='https://biz.payulatam.com/L0f83572D8D5B13'
                  target='_blank'
                  rel='noopener'
                  className='py-2 rounded-lg bg-[var(--bg-2)] text-[10px] font-bold border border-[var(--border-1)] hover:border-[#A5C313]'
                >
                  {t.sidebar.donate_methods.payu}
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* ÁREA DE CONTENIDO DINÁMICO */}
        <main className='flex-grow rounded-2xl p-4 md:p-6 lg:p-10 shadow-[var(--shadow-1)] border bg-[var(--bg-1)] border-[var(--border-1)] overflow-hidden mt-16 md:mt-0'>
          <div className='animate-fade-in h-full'>
            {activeTab === 'paint' && <PaintAndShadowsModule lang={lang} />}
            {activeTab === 'counter' && <WordCounterModule lang={lang} />}
            {activeTab === 'transform' && <TextTransformerModule lang={lang} />}
            {activeTab === 'converters' && <TextConvertersModule lang={lang} />}
            {activeTab === 'hashtags' && <HashtagModule lang={lang} />}
            {activeTab === 'passwords' && <PasswordModule lang={lang} />}
            {activeTab === 'lorem' && <LoremIpsumModule lang={lang} />}
            {activeTab === 'whatsapp' && <WhatsAppModule lang={lang} />}
            {activeTab === 'qr' && <QrGeneratorModule lang={lang} />}
            {activeTab === 'images' && <ImageOptimizerModule lang={lang} />}
          </div>
        </main>
      </div>

      <footer className='mt-8 md:mt-12 py-8 md:py-12 bg-[var(--gradient-footer)]'>
        <div className='w-full max-w-[1400px] mx-auto px-4 md:px-5 text-center'>
          <p className='text-sm text-[var(--text-1)]'>{t.footer.rights}</p>
          <p className='text-xs mt-2 opacity-75 text-[var(--text-1)]'>
            {t.footer.heart}
          </p>
        </div>
      </footer>
    </div>
  )
}
