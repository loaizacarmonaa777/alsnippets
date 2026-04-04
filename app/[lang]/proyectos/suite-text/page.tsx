'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeCanvas } from 'qrcode.react'
import { TypeAnimation } from 'react-type-animation' // Corregido según tu package.json

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
  PlayCircle,
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
  Sparkles, // <--- Añadido y verificado
  Strikethrough,
  TextCursorInput,
  Trash2,
  Type,
  Underline as UnderlineIcon,
  UploadCloud,
  Wand2,
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
    MÓDULO 2: GENERADOR DE CÓDIGO QR (OPTIMIZADO)
===================================================== */
function QrGeneratorModule ({ lang }: { lang: string }) {
  const t = {
    es: {
      title: 'Generador de Código QR',
      desc: 'Crea códigos QR personalizados, añade tu logo y ajusta las esquinas.',
      label_url: 'URL de destino',
      label_qr_color: 'Color QR',
      label_bg_color: 'Color Fondo (RGBA)',
      label_logo: 'Logo Central',
      label_filename: 'Nombre del archivo',
      btn_logo_upload: 'Subir Logo',
      btn_logo_change: 'Cambiar Logo',
      btn_logo_remove: 'Quitar Logo',
      label_margin: 'Grosor del Margen',
      label_radius: 'Forma de las esquinas',
      btn_download: 'Descargar',
      btn_downloaded: 'Descargado con éxito ✓',
      placeholder_url: 'https://alsnippets.com',
      placeholder_filename: 'mi-codigo-qr'
    },
    en: {
      title: 'QR Code Generator',
      desc: 'Create custom QR codes, add your logo, and adjust the corners.',
      label_url: 'Destination URL',
      label_qr_color: 'QR Color',
      label_bg_color: 'Bg Color (RGBA)',
      label_logo: 'Center Logo',
      label_filename: 'File Name',
      btn_logo_upload: 'Upload Logo',
      btn_logo_change: 'Change Logo',
      btn_logo_remove: 'Remove Logo',
      label_margin: 'Margin Thickness',
      label_radius: 'Corner Shape',
      btn_download: 'Download',
      btn_downloaded: 'Downloaded successfully ✓',
      placeholder_url: 'https://alsnippets.com',
      placeholder_filename: 'my-qr-code'
    }
  }[lang as 'es' | 'en']

  const [url, setUrl] = useState('https://alsnippets.com')
  const [fileName, setFileName] = useState('alsnippets-qr')
  const [qrColor, setQrColor] = useState('#0f172a')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [bgOpacity, setBgOpacity] = useState(100) // Nueva opacidad
  const [size] = useState(500)
  const [margin, setMargin] = useState(16)
  const [containerRadius, setContainerRadius] = useState(16)
  const [format, setFormat] = useState<'png' | 'webp'>('png')
  const [logo, setLogo] = useState<string | null>(null)
  const [logoRatio, setLogoRatio] = useState<number>(1)
  const [isDownloaded, setIsDownloaded] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Corregido: Lógica de carga de logo con validación de estado
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = event => {
        const imgUrl = event.target?.result as string
        const img = new Image()
        img.onload = () => {
          setLogoRatio(img.width / img.height)
          setLogo(imgUrl)
        }
        img.src = imgUrl
      }
      reader.readAsDataURL(file)
    }
  }

  // Convertir HEX a RGBA para el fondo
  const getFullBgColor = () => {
    const r = parseInt(bgColor.slice(1, 3), 16)
    const g = parseInt(bgColor.slice(3, 5), 16)
    const b = parseInt(bgColor.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${bgOpacity / 100})`
  }

  const downloadQR = () => {
    const qrCanvas = qrRef.current?.querySelector('canvas')
    if (!qrCanvas) return
    const visualSize = 220
    const scaleFactor = size / visualSize
    const exportMargin = margin * scaleFactor
    const exportRadius = containerRadius * scaleFactor
    const totalExportSize = size + exportMargin * 2

    const finalCanvas = document.createElement('canvas')
    finalCanvas.width = totalExportSize
    finalCanvas.height = totalExportSize
    const ctx = finalCanvas.getContext('2d')
    if (!ctx) return

    // Fondo con soporte de transparencia
    ctx.clearRect(0, 0, totalExportSize, totalExportSize)
    ctx.fillStyle = getFullBgColor()
    ctx.beginPath()
    ctx.roundRect(0, 0, totalExportSize, totalExportSize, exportRadius)
    ctx.fill()

    ctx.drawImage(qrCanvas, exportMargin, exportMargin, size, size)

    const mimeType = format === 'webp' ? 'image/webp' : 'image/png'
    const finalImgUrl = finalCanvas.toDataURL(mimeType)

    const downloadLink = document.createElement('a')
    downloadLink.href = finalImgUrl
    downloadLink.download = `${fileName || 'alsnippets-qr'}.${format}`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)

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
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-[var(--text-1)]'>
                {t.label_url}
              </label>
              <input
                type='text'
                value={url}
                onChange={e => setUrl(e.target.value)}
                className='w-full rounded-xl px-4 py-3 outline-none bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] focus:border-[var(--border-brand)] font-medium'
              />
            </div>
            {/* TAREA 1: Campo Nombre del archivo */}
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-[var(--text-1)]'>
                {t.label_filename}
              </label>
              <input
                type='text'
                value={fileName}
                onChange={e =>
                  setFileName(e.target.value.replace(/[^a-z0-9-_]/gi, ''))
                }
                placeholder={t.placeholder_filename}
                className='w-full rounded-xl px-4 py-3 outline-none bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] focus:border-[var(--border-brand)] font-medium'
              />
            </div>
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
              <div className='flex gap-2'>
                <input
                  type='color'
                  value={bgColor}
                  onChange={e => setBgColor(e.target.value)}
                  className='flex-grow h-12 cursor-pointer rounded-lg bg-[var(--bg-2)] border border-[var(--border-1)] p-1'
                />
                {/* TAREA 2: Opacidad del fondo */}
                <input
                  type='number'
                  min='0'
                  max='100'
                  value={bgOpacity}
                  onChange={e => setBgOpacity(Number(e.target.value))}
                  className='w-16 h-12 text-center rounded-lg bg-[var(--bg-2)] border border-[var(--border-1)] text-xs font-bold text-[var(--text-1)]'
                />
              </div>
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
        <div className='lg:col-span-5 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[450px] bg-[var(--bg-2)] border-2 border-[var(--border-brand)] shadow-xl'>
          <motion.div
            ref={qrRef}
            layout
            className='mb-8 transition-all duration-500 shadow-2xl overflow-hidden'
            style={{
              padding: `${margin}px`,
              backgroundColor: getFullBgColor(),
              borderRadius: `${containerRadius}px`
            }}
          >
            {/* TAREA 3: Logo central funcional */}
            <QRCodeCanvas
              value={url || 'https://alsnippets.com'}
              size={size}
              bgColor={'rgba(0,0,0,0)'} // Canvas transparente para dejar ver el fondo del div
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
   MÓDULO 3: OPTIMIZADOR MULTIMEDIA (OPTIMIZADO)
===================================================== */
interface ProcessedFile {
  id: string
  originalFile: File
  previewUrl: string
  newName: string
  blob: Blob | null
  isConverting: boolean
  originalSize: number
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
      btn_download_single: 'Descargar',
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
      btn_download_single: 'Download',
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

  const processSingleImage = async (
    file: File,
    fmt: string,
    qual: number
  ): Promise<Blob | null> => {
    let currentFile = file
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
        if (!f.isConverting && f.blob) return
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
    }, 400)
    return () => clearTimeout(timeout)
  }, [quality, format, files.length])

  const handleAddFiles = (newFiles: FileList | File[]) => {
    const validArray = Array.from(newFiles)
    const spaceLeft = 20 - files.length
    const filesToAdd = validArray.slice(0, spaceLeft)
    if (validArray.length > spaceLeft) alert(t.error_limit)

    filesToAdd.forEach(f => {
      const reader = new FileReader()
      const id = Math.random().toString(36).substring(7)

      // TAREA 1: Generar Preview Robusto (Base64)
      reader.onload = e => {
        const base64Preview = e.target?.result as string

        const newFile: ProcessedFile = {
          id,
          originalFile: f,
          originalSize: f.size,
          previewUrl: f.name.toLowerCase().endsWith('.heic')
            ? ''
            : base64Preview,
          newName: f.name.split('.').slice(0, -1).join('.'),
          blob: null,
          isConverting: true
        }
        setFiles(prev => [...prev, newFile])
      }

      // Leemos como DataURL para que el preview sea persistente
      reader.readAsDataURL(f)
    })
  }

  // TAREA 5: Descarga individual
  const downloadSingle = (file: ProcessedFile) => {
    if (!file.blob) return
    const url = URL.createObjectURL(file.blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${file.newName}.${format}`
    link.click()
    URL.revokeObjectURL(url)
  }

  const downloadAll = () => {
    files.forEach((f, index) => {
      if (!f.blob) return
      setTimeout(() => downloadSingle(f), index * 250)
    })
    setIsDownloaded(true)
    setTimeout(() => setIsDownloaded(false), 3000)
  }

  const formatSize = (bytes: number) => (bytes / 1024).toFixed(1) + ' KB'

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
                {/* CONTENEDOR DE IMAGEN CORREGIDO */}
                <div className='w-20 h-20 rounded-xl overflow-hidden bg-[var(--bg-3)] border border-[var(--border-1)] flex-shrink-0 relative flex items-center justify-center'>
                  {file.previewUrl ? (
                    <img
                      src={file.previewUrl}
                      className='w-full h-full object-cover animate-fade-in'
                      alt='preview'
                      onError={e => {
                        // Fallback si la imagen falla
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className='text-[10px] font-black opacity-40 text-[var(--text-1)]'>
                      {file.originalFile.name.toLowerCase().endsWith('.heic')
                        ? 'HEIC'
                        : 'IMG'}
                    </div>
                  )}

                  {file.isConverting && (
                    <div className='absolute inset-0 bg-[var(--bg-inverse)]/20 backdrop-blur-[2px] flex items-center justify-center'>
                      <RefreshCw className='w-5 h-5 text-white animate-spin' />
                    </div>
                  )}
                </div>

                <div className='flex-grow min-w-0 space-y-1'>
                  <div className='flex items-center gap-2'>
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
                    <span className='text-[10px] font-bold opacity-40'>
                      .{format}
                    </span>
                  </div>

                  <div className='flex items-center gap-3'>
                    <span className='text-[10px] font-bold text-[var(--text-3)] line-through'>
                      {(file.originalSize / 1024).toFixed(1)} KB
                    </span>
                    <span className='text-[10px] font-black text-[var(--text-brand)] bg-[var(--bg-brand-hover)] px-1.5 py-0.5 rounded'>
                      {file.blob
                        ? (file.blob.size / 1024).toFixed(1) + ' KB'
                        : '...'}
                    </span>
                  </div>
                </div>

                {/* BOTONES DE ACCIÓN */}
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => downloadSingle(file)}
                    disabled={!file.blob}
                    className='p-2.5 bg-[var(--bg-1)] text-[var(--text-brand)] hover:bg-[var(--bg-brand)] hover:text-white rounded-xl border border-[var(--border-1)] transition-all disabled:opacity-20'
                  >
                    <Download className='w-4 h-4' />
                  </button>
                  <button
                    onClick={() =>
                      setFiles(prev => prev.filter(f => f.id !== file.id))
                    }
                    className='p-2.5 text-red-500 hover:bg-red-50 transition-colors rounded-xl'
                  >
                    <X className='w-5 h-5' />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className='lg:col-span-4 space-y-6'>
            <div className='rounded-3xl p-6 bg-[var(--bg-2)] border-2 border-[var(--border-brand)] shadow-lg space-y-6'>
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
                  onChange={e => {
                    setFormat(e.target.value as any)
                    setFiles(prev =>
                      prev.map(f => ({ ...f, isConverting: true }))
                    ) // Forzar re-procesamiento
                  }}
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
                  onChange={e => {
                    setQuality(Number(e.target.value))
                    setFiles(prev =>
                      prev.map(f => ({ ...f, isConverting: true }))
                    ) // Forzar re-procesamiento
                  }}
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
   MÓDULO 4: PINTURA Y SOMBRAS (POTENTE & SÓLIDO)
===================================================== */

function PaintAndShadowsModule ({ lang }: { lang: string }) {
  const [activeSubTab, setActiveSubTab] = useState<
    'shadows' | 'contrast' | 'palettes' | 'mesh' | 'animated'
  >('shadows')
  const [isCopied, setIsCopied] = useState(false)

  const t = {
    es: {
      tabs: {
        shadows: 'Sombras CSS',
        contrast: 'Contraste WCAG',
        palettes: 'Paletas Pro',
        mesh: 'Degradado Malla',
        animated: 'Fondo Animado'
      },
      common: {
        copy: 'Copiar CSS',
        copied: 'Copiado ✓'
      },
      contrast: {
        title: 'Configuración de Color',
        bg_label: 'Color de Fondo',
        fg_label: 'Color de Texto',
        btn_invert: 'Invertir Colores',
        sample_normal:
          'Texto Normal (16px) - Accesibilidad garantizada con la Suite.',
        sample_large: 'Diseño Inclusivo y Potente.',
        ratio_label: 'Ratio Contraste',
        ai_title: 'Recomencaciión',
        ai_desc: 'Usa este color en el texto:',
        status_aaa: 'Excelente contraste (Web Pro)',
        status_aa: 'Contraste óptimo',
        status_large: 'Solo para textos grandes',
        status_fail: 'Contraste insuficiente'
      },
      shadows: {
        config_title: 'Configuración Pro',
        mode_standard: 'Estándar / Neón',
        mode_neumorph: 'Neumorfismo',
        label_inset: 'Interna (Inset)',
        label_neon: 'Efecto Neón',
        label_x: 'Eje X',
        label_y: 'Eje Y',
        label_blur: 'Desenfoque',
        label_spread: 'Extensión',
        label_radius: 'Bordes',
        label_opacity: 'Opacidad',
        label_light: 'Pico de Luz',
        label_dark: 'Profundidad',
        color_shadow: 'Sombra',
        color_object: 'Objeto',
        color_bg: 'Fondo',
        preview: 'Previsualización'
      },
      palettes: {
        title: 'Generador de Paletas',
        input_hex: 'Color primario',
        input_prompt: '¿De qué trata tu sitio web?',
        placeholder_prompt:
          'Ej: Clínica dental, tienda de mascotas, blog de viajes...',
        btn_generate: 'Generar paletas pro',
        suggestions_title: 'Otras propuestas',
        preview_title: 'Análisis de contraste y aplicación',
        label_bg: 'Fondo',
        label_text: 'Texto',
        label_accent: 'Acento',
        label_light: 'Suave / Claro',
        label_harmony: 'Regla de armonía',
        export_title: 'Exportar recursos',
        export_desc: 'Copia el código para tu proyecto',
        copy_css: 'Variables CSS',
        copy_tailwind: 'Configuración Tailwind',
        copy_json: 'Datos JSON',
        rule_60_30_10: 'Distribución 60-30-10 (diseño)',
        harmonies: {
          analogous: 'Análoga',
          monochromatic: 'Monocromática',
          triad: 'Tríada',
          complementary: 'Complementaria',
          split: 'Complementaria dividida'
        }
      },
      mesh: {
        // <--- AHORA ESTÁ FUERA DE PALETTES
        title: 'Motor de Degradados Pro',
        type_linear: 'Lineal',
        type_radial: 'Radial',
        label_bg: 'Fondo Base',
        label_opacity: 'Opacidad del Degradado',
        label_direction: 'Dirección / Posición',
        label_colors_count: 'Cantidad de Colores',
        btn_add: 'Añadir Color',
        btn_remove: 'Quitar'
      },
      animated_bg: {
        title: 'Generador de Fondos Animados',
        label_type: 'Tipo de Animación',
        label_speed: 'Velocidad',
        label_amount: 'Cantidad',
        label_size: 'Tamaño',
        label_color: 'Color Partículas',
        types: {
          snow: 'Nieve (Navidad)',
          hearts: 'Corazones (San Valentín)',
          bubbles: 'Burbujas Flotantes'
        },
        export_desc: 'Copia este código y pégalo donde quieras un fondo top'
      }
    },
    en: {
      tabs: {
        shadows: 'CSS Shadows',
        contrast: 'WCAG Contrast',
        palettes: 'Pro Palettes',
        mesh: 'Mesh Gradient',
        animated: 'Animated BG'
      },
      common: {
        copy: 'Copy CSS',
        copied: 'Copied ✓'
      },
      contrast: {
        title: 'Color Configuration',
        bg_label: 'Background Color',
        fg_label: 'Text Color',
        btn_invert: 'Invert Colors',
        sample_normal:
          'Normal Text (16px) - Accessibility guaranteed with the Suite.',
        sample_large: 'Inclusive and Powerful Design.',
        ratio_label: 'Contrast Ratio',
        ai_title: 'Recommendation',
        ai_desc: 'Use this color in the text:',
        status_aaa: 'Excellent contrast (Web Pro)',
        status_aa: 'Optimal contrast',
        status_large: 'Large text only',
        status_fail: 'Insufficient contrast'
      },
      shadows: {
        config_title: 'Pro Configuration',
        mode_standard: 'Standard / Neon',
        mode_neumorph: 'Neumorphism',
        label_inset: 'Inner (Inset)',
        label_neon: 'Neon Effect',
        label_x: 'X Axis',
        label_y: 'Y Axis',
        label_blur: 'Blur',
        label_spread: 'Spread',
        label_radius: 'Radius',
        label_opacity: 'Opacity',
        label_light: 'Light Peak',
        label_dark: 'Depth',
        color_shadow: 'Shadow',
        color_object: 'Object',
        color_bg: 'Background',
        preview: 'Preview'
      },
      palettes: {
        title: 'Palette Generator',
        input_hex: 'Primary Color',
        input_prompt: 'What is your website about?',
        placeholder_prompt: 'e.g. Dental clinic, pet store, travel blog...',
        btn_generate: 'Generate Pro Palettes',
        suggestions_title: 'Other Suggestions',
        preview_title: 'Contrast Analysis & Application',
        label_bg: 'Background',
        label_text: 'Text',
        label_accent: 'Accent',
        label_light: 'Soft / Light',
        label_harmony: 'Harmony Rule',
        export_title: 'Export Assets',
        export_desc: 'Copy the code for your project',
        copy_css: 'CSS Variables',
        copy_tailwind: 'Tailwind Config',
        copy_json: 'JSON Data',
        rule_60_30_10: '60-30-10 Distribution (Design)',
        harmonies: {
          analogous: 'Analogous',
          monochromatic: 'Monochromatic',
          triad: 'Triad',
          complementary: 'Complementary',
          split: 'Split Complementary'
        }
      },
      mesh: {
        // <--- AHORA ESTÁ FUERA DE PALETTES
        title: 'Pro Gradient Engine',
        type_linear: 'Linear',
        type_radial: 'Radial',
        label_bg: 'Base Background',
        label_opacity: 'Gradient Opacity',
        label_direction: 'Direction / Position',
        label_colors_count: 'Number of Colors',
        btn_add: 'Add Color',
        btn_remove: 'Remove'
      },
      animated_bg: {
        title: 'Animated Background Generator',
        label_type: 'Animation Type',
        label_speed: 'Speed',
        label_amount: 'Amount',
        label_size: 'Size',
        label_color: 'Particle Color',
        types: {
          snow: 'Snow (Christmas)',
          hearts: 'Hearts (Valentine’s Day)',
          bubbles: 'Floating Bubbles'
        },
        export_desc:
          'Copy this code and paste it wherever you want a top background'
      }
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
            t={t}
            onCopy={handleCopy}
            isCopied={isCopied}
          />
        )}

        {activeSubTab === 'contrast' && (
          <ContrastChecker
            key='ct'
            lang={lang}
            t={t} // <--- Corregido: Ahora se pasa la prop 't' para evitar el error de undefined
          />
        )}

        {activeSubTab === 'palettes' && (
          <PaletteGenerator
            key='pl'
            lang={lang}
            t={t}
            onCopy={handleCopy}
            isCopied={isCopied}
          />
        )}

        {activeSubTab === 'mesh' && (
          <MeshGradientGenerator
            key='mg'
            lang={lang}
            t={t}
            onCopy={handleCopy}
            isCopied={isCopied}
          />
        )}

        {activeSubTab === 'animated' && (
          <AnimatedBgGenerator
            key='abg'
            lang={lang}
            t={t}
            onCopy={handleCopy}
            isCopied={isCopied}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

/* =====================================================
   COMPONENTES AUXILIARES (DEFINIR SOLO UNA VEZ AL FINAL DEL ARCHIVO)
   ===================================================== */

// 1. Selector de Color Único
function ColorField ({
  label,
  val,
  set
}: {
  label: string
  val: string
  set: (v: string) => void
}) {
  return (
    <div className='space-y-1.5 flex-1'>
      <label className='text-[9px] font-black uppercase text-[var(--text-3)] ml-1'>
        {label}
      </label>
      <input
        type='color'
        value={val}
        onChange={e => set(e.target.value)}
        className='w-full h-10 rounded-xl cursor-pointer bg-[var(--bg-2)] border border-[var(--border-1)] p-1 transition-transform active:scale-95'
      />
    </div>
  )
}

// 2. Control de Rangos (Sliders)
interface ControlRangeProps {
  label: string
  val: number
  min: number
  max: number
  step?: number
  set: (v: number) => void
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
    <div className='space-y-1.5'>
      <div className='flex justify-between items-center px-1'>
        <label className='text-[9px] font-black uppercase tracking-widest text-[var(--text-3)]'>
          {label}
        </label>
        <span className='text-[10px] font-mono font-bold text-[var(--text-brand)]'>
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
        className='w-full accent-[var(--bg-brand)] h-1.5 bg-[var(--bg-3)] rounded-lg appearance-none cursor-pointer hover:opacity-80 transition-opacity'
      />
    </div>
  )
}

// 3. Caja de Código para Copiar
function CodeBox ({
  code,
  onCopy,
  isCopied
}: {
  code: string
  onCopy: (t: string) => void
  isCopied: boolean
}) {
  return (
    <div className='relative group'>
      <pre className='p-6 bg-[var(--bg-inverse)] text-blue-300 rounded-[2rem] text-[11px] font-mono overflow-x-auto border border-white/10 leading-relaxed shadow-2xl'>
        {code}
      </pre>
      <button
        onClick={() => onCopy(code)}
        className={`absolute top-4 right-4 p-3 rounded-xl transition-all shadow-lg ${
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
   1 GENERADOR DE SOMBRAS
   ===================================================== */
function ShadowGenerator ({ lang, onCopy, isCopied, t }: any) {
  const sh = t.shadows
  const [mode, setMode] = useState<'standard' | 'neumorph'>('standard')
  const [config, setConfig] = useState({
    x: 12,
    y: 12,
    blur: 35,
    spread: -5,
    opacity: 0.25,
    color: '#c9a34e', // Usado en Standard
    targetColor: '#ffffff',
    bgColor: '#f7f8fa',
    radius: 32,
    inset: false,
    isNeon: false,
    // Nuevos estados para Neumorph Independiente
    neuLightColor: '#ffffff',
    neuLightOpacity: 0.8,
    neuDarkColor: '#000000',
    neuDarkOpacity: 0.15
  })

  const cssCode = useMemo(() => {
    const type = config.inset ? 'inset ' : ''

    if (mode === 'standard') {
      const hex = config.color
      const r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16)

      if (config.isNeon) {
        const neonValue = `${type}0 0 10px rgba(${r}, ${g}, ${b}, ${
          config.opacity
        }), ${type}0 0 25px rgba(${r}, ${g}, ${b}, ${
          config.opacity * 0.6
        }), ${type}0 0 50px rgba(${r}, ${g}, ${b}, ${config.opacity * 0.3})`
        return `border-radius: ${config.radius}px;\nbackground: ${config.targetColor};\nbox-shadow: ${neonValue};`
      }

      const shadowValue = `${type}${config.x}px ${config.y}px ${config.blur}px ${config.spread}px rgba(${r}, ${g}, ${b}, ${config.opacity})`
      return `border-radius: ${config.radius}px;\nbackground: ${config.targetColor};\nbox-shadow: ${shadowValue};`
    } else {
      // LÓGICA NEUMORPH INDEPENDIENTE
      const hexL = config.neuLightColor
      const rL = parseInt(hexL.slice(1, 3), 16),
        gL = parseInt(hexL.slice(3, 5), 16),
        bL = parseInt(hexL.slice(5, 7), 16)

      const hexD = config.neuDarkColor
      const rD = parseInt(hexD.slice(1, 3), 16),
        gD = parseInt(hexD.slice(3, 5), 16),
        bD = parseInt(hexD.slice(5, 7), 16)

      const lightShadow = `-${config.x}px -${config.y}px ${config.blur}px rgba(${rL}, ${gL}, ${bL}, ${config.neuLightOpacity})`
      const darkShadow = `${config.x}px ${config.y}px ${config.blur}px rgba(${rD}, ${gD}, ${bD}, ${config.neuDarkOpacity})`

      return `border-radius: ${config.radius}px;\nbackground: ${config.targetColor};\nbox-shadow: ${type}${lightShadow}, ${type}${darkShadow};`
    }
  }, [config, mode])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className='grid grid-cols-1 lg:grid-cols-12 gap-8'
    >
      {/* PANEL DE CONTROLES */}
      <div className='lg:col-span-5 p-8 bg-[var(--bg-1)] rounded-[2.5rem] border border-[var(--border-1)] space-y-6 shadow-sm'>
        <div className='flex p-1.5 bg-[var(--bg-2)] rounded-2xl border border-[var(--border-1)]'>
          {(['standard', 'neumorph'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                mode === m
                  ? 'bg-[var(--bg-1)] text-[var(--text-brand)] shadow-sm'
                  : 'text-[var(--text-3)]'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className='space-y-5'>
          {/* SWITCHES */}
          <div className='flex flex-wrap gap-4 pt-2'>
            <label className='flex items-center gap-3 cursor-pointer group'>
              <div className='relative'>
                <input
                  type='checkbox'
                  className='sr-only'
                  checked={config.inset}
                  onChange={e =>
                    setConfig({ ...config, inset: e.target.checked })
                  }
                />
                <div
                  className={`w-10 h-6 rounded-full transition-colors ${
                    config.inset ? 'bg-[var(--bg-brand)]' : 'bg-[var(--bg-3)]'
                  }`}
                />
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    config.inset ? 'translate-x-4' : ''
                  }`}
                />
              </div>
              <span className='text-[11px] font-black uppercase text-[var(--text-2)]'>
                Interna (Inset)
              </span>
            </label>

            {mode === 'standard' && (
              <label className='flex items-center gap-3 cursor-pointer group'>
                <div className='relative'>
                  <input
                    type='checkbox'
                    className='sr-only'
                    checked={config.isNeon}
                    onChange={e =>
                      setConfig({ ...config, isNeon: e.target.checked })
                    }
                  />
                  <div
                    className={`w-10 h-6 rounded-full transition-colors ${
                      config.isNeon
                        ? 'bg-[var(--bg-brand)]'
                        : 'bg-[var(--bg-3)]'
                    }`}
                  />
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      config.isNeon ? 'translate-x-4' : ''
                    }`}
                  />
                </div>
                <span className='text-[11px] font-black uppercase text-[var(--text-2)]'>
                  Efecto Neón
                </span>
              </label>
            )}
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <ControlRange
              label='Eje X'
              val={config.x}
              min={-100}
              max={100}
              set={v => setConfig({ ...config, x: v })}
            />
            <ControlRange
              label='Eje Y'
              val={config.y}
              min={-100}
              max={100}
              set={v => setConfig({ ...config, y: v })}
            />
          </div>

          <ControlRange
            label='Desenfoque'
            val={config.blur}
            min={0}
            max={200}
            set={v => setConfig({ ...config, blur: v })}
          />
          <ControlRange
            label='Bordes'
            val={config.radius}
            min={0}
            max={100}
            set={v => setConfig({ ...config, radius: v })}
          />

          {/* CONTROLES DINÁMICOS SEGÚN MODO */}
          {mode === 'standard' ? (
            <div className='space-y-4 pt-2'>
              <ControlRange
                label='Opacidad'
                val={config.opacity}
                min={0}
                max={1}
                step={0.01}
                set={v => setConfig({ ...config, opacity: v })}
              />
              <div className='grid grid-cols-3 gap-3'>
                <ColorField
                  label='Sombra'
                  val={config.color}
                  set={v => setConfig({ ...config, color: v })}
                />
                <ColorField
                  label='Objeto'
                  val={config.targetColor}
                  set={v => setConfig({ ...config, targetColor: v })}
                />
                <ColorField
                  label='Fondo'
                  val={config.bgColor}
                  set={v => setConfig({ ...config, bgColor: v })}
                />
              </div>
            </div>
          ) : (
            <div className='space-y-4 pt-4 border-t border-[var(--border-1)]'>
              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-3'>
                  <p className='text-[10px] font-black text-[var(--text-brand)] uppercase'>
                    Pico de Luz
                  </p>
                  <ControlRange
                    label='Opacidad Luz'
                    val={config.neuLightOpacity}
                    min={0}
                    max={1}
                    step={0.01}
                    set={v => setConfig({ ...config, neuLightOpacity: v })}
                  />
                  <ColorField
                    label='Color Luz'
                    val={config.neuLightColor}
                    set={v => setConfig({ ...config, neuLightColor: v })}
                  />
                </div>
                <div className='space-y-3'>
                  <p className='text-[10px] font-black text-[var(--text-brand)] uppercase'>
                    Profundidad
                  </p>
                  <ControlRange
                    label='Opacidad Sombra'
                    val={config.neuDarkOpacity}
                    min={0}
                    max={1}
                    step={0.01}
                    set={v => setConfig({ ...config, neuDarkOpacity: v })}
                  />
                  <ColorField
                    label='Color Sombra'
                    val={config.neuDarkColor}
                    set={v => setConfig({ ...config, neuDarkColor: v })}
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <ColorField
                  label='Color Objeto'
                  val={config.targetColor}
                  set={v => setConfig({ ...config, targetColor: v })}
                />
                <ColorField
                  label='Color Fondo'
                  val={config.bgColor}
                  set={v => setConfig({ ...config, bgColor: v })}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PREVISUALIZACIÓN */}
      <div className='lg:col-span-7 flex flex-col gap-6'>
        <div
          className='flex-1 min-h-[400px] rounded-[3rem] flex items-center justify-center border border-[var(--border-1)] transition-all duration-500 relative overflow-hidden'
          style={{ backgroundColor: config.bgColor }}
        >
          <div
            className='absolute inset-0 opacity-[0.03]'
            style={{
              backgroundImage: `radial-gradient(var(--text-1) 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />
          <motion.div
            layout
            style={{
              width: '210px',
              height: '210px',
              backgroundColor: config.targetColor,
              borderRadius: `${config.radius}px`,
              boxShadow: cssCode.split('box-shadow: ')[1].replace(';', '')
            }}
            className='z-10 relative flex items-center justify-center transition-all duration-300'
          >
            <span className='text-[var(--text-3)] text-[10px] font-black uppercase opacity-20'>
              Preview
            </span>
          </motion.div>
        </div>
        <CodeBox code={cssCode} onCopy={onCopy} isCopied={isCopied} />
      </div>
    </motion.div>
  )
}

/* =====================================================
   2. COMPROBADOR DE CONTRASTE WCAG CON IA (PRO + I18N)
   ===================================================== */
function ContrastChecker ({ lang, t }: any) {
  // Aquí llamamos a las traducciones específicas definidas arriba
  // (Asumiendo que pasas 't' o lo reconstruyes aquí)
  const ct = t.contrast

  const [bg, setBg] = useState('#f7f8fa')
  const [fg, setFg] = useState('#0f172a')
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const getLuminance = (hex: string) => {
    const rgb = hex.startsWith('#')
      ? [
          parseInt(hex.slice(1, 3), 16),
          parseInt(hex.slice(3, 5), 16),
          parseInt(hex.slice(5, 7), 16)
        ]
      : [0, 0, 0]
    const a = rgb.map(v => {
      v /= 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
  }

  const calculateRatio = (f: string, b: string) => {
    const l1 = getLuminance(f)
    const l2 = getLuminance(b)
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
  }

  const ratio = useMemo(() => calculateRatio(fg, bg), [fg, bg])

  const suggestedFg = useMemo(() => {
    // 1. Extraemos los canales RGB del fondo actual
    const r = parseInt(bg.slice(1, 3), 16)
    const g = parseInt(bg.slice(3, 5), 16)
    const b = parseInt(bg.slice(5, 7), 16)
    const bgLum = getLuminance(bg)

    // 2. Lógica de Optimización Cromática
    if (bgLum > 0.5) {
      /* FONDO CLARO: Buscamos el "Ancla Oscura". 
         Reducimos los canales al 10-15% para crear un color profundo (como el #00123d que pediste) 
         que mantenga una relación sutil con el matiz del fondo pero maximice el ratio.
      */
      const newR = Math.max(0, Math.floor(r * 0.05))
        .toString(16)
        .padStart(2, '0')
      const newG = Math.max(0, Math.floor(g * 0.08))
        .toString(16)
        .padStart(2, '0')
      const newB = Math.max(0, Math.floor(b * 0.22))
        .toString(16)
        .padStart(2, '0') // Favorecemos azul para contraste frío
      return `#${newR}${newG}${newB}`
    } else {
      /* FONDO OSCURO: Buscamos el "Punto de Luz".
         Si el fondo es muy oscuro, el contraste más limpio y profesional siempre será 
         un blanco puro o el dorado vibrante de la Suite si el ratio lo permite (>7).
      */
      const brandRatio = calculateRatio('#f5d27a', bg) // Usamos el dorado brillante de modo oscuro
      return brandRatio >= 7 ? '#f5d27a' : '#ffffff'
    }
  }, [bg])

  const suggestedRatio = useMemo(
    () => calculateRatio(suggestedFg, bg),
    [suggestedFg, bg]
  )

  const getStatus = (r: number) => {
    if (r >= 7)
      return { label: 'AAA', color: 'var(--bg-success)', desc: ct.status_aaa }
    if (r >= 4.5)
      return { label: 'AA', color: 'var(--bg-brand)', desc: ct.status_aa }
    if (r >= 3) return { label: 'Lrg', color: '#eab308', desc: ct.status_large }
    return { label: 'FAIL', color: '#ef4444', desc: ct.status_fail }
  }

  const status = getStatus(ratio)
  const suggestedStatus = getStatus(suggestedRatio)

  const handleCopyHex = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className='space-y-8'
    >
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
        {/* PANEL DE CONTROL */}
        <div className='lg:col-span-5 p-8 bg-[var(--bg-1)] rounded-[2.5rem] border border-[var(--border-1)] space-y-8 shadow-sm'>
          <div className='flex items-center gap-3'>
            <Zap className='w-6 h-6 text-[var(--text-brand)]' />
            <h3 className='text-lg font-black uppercase tracking-tighter text-[var(--text-1)]'>
              {ct.title}
            </h3>
          </div>

          <div className='space-y-6'>
            <div className='space-y-3'>
              <label className='text-[11px] font-black uppercase text-[var(--text-3)] tracking-widest pl-1'>
                {ct.bg_label}
              </label>
              <div className='flex gap-3'>
                <input
                  type='color'
                  value={bg}
                  onChange={e => setBg(e.target.value)}
                  className='w-16 h-16 rounded-2xl cursor-pointer bg-[var(--bg-2)] border-2 border-[var(--border-1)] p-1'
                />
                <input
                  type='text'
                  value={bg}
                  onChange={e => setBg(e.target.value)}
                  className='flex-1 bg-[var(--bg-2)] border border-[var(--border-1)] px-4 rounded-2xl font-mono font-bold text-[var(--text-1)] uppercase outline-none'
                />
              </div>
            </div>

            <div className='space-y-3'>
              <label className='text-[11px] font-black uppercase text-[var(--text-3)] tracking-widest pl-1'>
                {ct.fg_label}
              </label>
              <div className='flex gap-3'>
                <input
                  type='color'
                  value={fg}
                  onChange={e => setFg(e.target.value)}
                  className='w-16 h-16 rounded-2xl cursor-pointer bg-[var(--bg-2)] border-2 border-[var(--border-1)] p-1'
                />
                <input
                  type='text'
                  value={fg}
                  onChange={e => setFg(e.target.value)}
                  className='flex-1 bg-[var(--bg-2)] border border-[var(--border-1)] px-4 rounded-2xl font-mono font-bold text-[var(--text-1)] uppercase outline-none'
                />
              </div>
            </div>

            <button
              onClick={() => {
                const temp = bg
                setBg(fg)
                setFg(temp)
              }}
              className='w-full py-4 rounded-2xl border border-[var(--border-1)] bg-[var(--bg-2)] text-[var(--text-1)] text-[10px] font-black uppercase hover:bg-[var(--bg-brand)] hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95'
            >
              <ArrowRightLeft className='w-4 h-4' /> {ct.btn_invert}
            </button>
          </div>
        </div>

        {/* ÁREA DE PREVISUALIZACIÓN E IA */}
        <div className='lg:col-span-7 flex flex-col gap-6'>
          <div
            className='flex-1 rounded-[3rem] p-10 flex flex-col justify-center gap-8 border border-[var(--border-1)] transition-colors duration-500 shadow-xl'
            style={{ backgroundColor: bg }}
          >
            <div className='space-y-1.5'>
              <p style={{ color: fg }} className='text-sm font-medium'>
                {ct.sample_normal}
              </p>
            </div>
            <div className='space-y-1.5'>
              <p
                style={{ color: fg }}
                className='text-3xl font-black tracking-tighter'
              >
                {ct.sample_large}
              </p>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* RATIO LIMPIO */}
            <div className='p-6 rounded-[2rem] bg-[var(--bg-1)] border border-[var(--border-1)] flex items-center justify-between shadow-sm'>
              <div className='space-y-1'>
                <p className='text-[10px] font-black uppercase text-[var(--text-3)]'>
                  {ct.ratio_label}
                </p>
                <p className='text-3xl font-black text-[var(--text-1)]'>
                  {ratio.toFixed(2)}
                </p>
              </div>
              <div
                className='p-4 rounded-2xl text-white font-black text-lg flex items-center justify-center min-w-[70px]'
                style={{ backgroundColor: status.color }}
              >
                {status.label}
              </div>
            </div>

            {/* SUGERENCIA IA CON TRADUCCIÓN */}
            <div className='p-6 rounded-[2rem] bg-[var(--bg-inverse)] border border-[var(--border-inverse)] flex flex-col justify-center relative shadow-2xl overflow-hidden'>
              <div
                className='absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-6 translate-x-6 border-4 border-white/10 flex items-center justify-center'
                style={{ backgroundColor: bg }}
              >
                <div
                  className='text-2xl font-black'
                  style={{ color: suggestedFg }}
                >
                  Aa
                </div>
              </div>

              <div className='flex items-center gap-2 mb-1'>
                <Wand2 className='w-4 h-4 text-[var(--text-brand)]' />
                <p className='text-[10px] font-black uppercase text-[var(--text-white-3)] tracking-widest'>
                  {ct.ai_title}
                </p>
              </div>
              <p className='text-[11px] font-medium text-[var(--text-white-2)] mb-3'>
                {ct.ai_desc}
              </p>

              <div className='flex gap-2 items-center'>
                <span className='font-mono font-bold text-sm text-[var(--text-brand)] uppercase p-2 px-3 rounded-lg bg-white/5'>
                  {suggestedFg}
                </span>
                <button
                  onClick={() => handleCopyHex(suggestedFg, 'suggested_fg')}
                  className={`p-2 rounded-lg ${
                    copiedField === 'suggested_fg'
                      ? 'bg-[var(--bg-success)] text-white'
                      : 'bg-[var(--bg-inverse)] text-[var(--text-white-3)] border border-white/10 hover:border-white/30'
                  }`}
                >
                  {copiedField === 'suggested_fg' ? (
                    <Check className='w-4 h-4' />
                  ) : (
                    <Copy className='w-4 h-4' />
                  )}
                </button>
                <div
                  className='px-3 py-1.5 rounded-full font-black text-[10px] text-white flex items-center justify-center gap-2'
                  style={{ backgroundColor: suggestedStatus.color }}
                >
                  <Heart className='w-3 h-3 fill-white' />{' '}
                  {suggestedStatus.label}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* =====================================================
   3. GENERADOR DE PALETAS PRO (UNIFICADO: ADOBE + COOLORS + IA)
   ===================================================== */
function PaletteGenerator ({ lang, t, onCopy, isCopied }: any) {
  const pt = t.palettes
  const [primary, setPrimary] = useState('#c9a34e')
  const [harmony, setHarmony] = useState('analogous')
  const [prompt, setPrompt] = useState('')
  const [proposals, setProposals] = useState<string[][]>([])
  const [selectedPalette, setSelectedPalette] = useState<string[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  function ExportPanel ({ palette, onCopy, isCopied, t }: any) {
    const [format, setFormat] = useState<'css' | 'tailwind' | 'json'>('css')

    const generatedCode = useMemo(() => {
      if (format === 'css') {
        return `
:root {
  --color-primary: ${palette[0]};
  --color-secondary: ${palette[1]};
  --color-accent: ${palette[2]};
  --color-bg-soft: ${palette[3]};
  --color-text-main: ${palette[4]};
}`.trim()
      } else if (format === 'tailwind') {
        return `
colors: {
  brand: {
    primary: '${palette[0]}',
    secondary: '${palette[1]}',
    accent: '${palette[2]}',
    surface: '${palette[3]}',
    content: '${palette[4]}',
  }
}`.trim()
      }
      return JSON.stringify(
        {
          primary: palette[0],
          secondary: palette[1],
          accent: palette[2],
          bg: palette[3],
          text: palette[4]
        },
        null,
        2
      )
    }, [palette, format])

    return (
      <div className='mt-8 p-8 bg-[var(--bg-inverse)] rounded-[2.5rem] border border-[var(--border-inverse)] shadow-2xl relative overflow-hidden'>
        {/* Background Decor */}
        <div className='absolute top-0 right-0 w-32 h-32 bg-[var(--bg-brand)] opacity-5 blur-[60px] rounded-full' />

        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 relative z-10'>
          <div className='flex items-center gap-3'>
            <Code className='w-5 h-5 text-[var(--text-brand)]' />
            <h4 className='text-[11px] font-black uppercase text-[var(--text-white-1)] tracking-[0.2em]'>
              Export Assets
            </h4>
          </div>

          <div className='flex p-1 bg-white/5 rounded-xl border border-white/10'>
            {(['css', 'tailwind', 'json'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${
                  format === f
                    ? 'bg-[var(--bg-brand)] text-white'
                    : 'text-[var(--text-white-3)] hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className='relative group'>
          <pre className='p-6 bg-black/40 rounded-2xl border border-white/5 font-mono text-[11px] text-[var(--text-white-2)] leading-relaxed overflow-x-auto max-h-[200px]'>
            {generatedCode}
          </pre>
          <button
            onClick={() => onCopy(generatedCode)}
            className='absolute top-4 right-4 p-3 bg-[var(--bg-brand)] text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all'
          >
            {isCopied ? (
              <Check className='w-4 h-4' />
            ) : (
              <Copy className='w-4 h-4' />
            )}
          </button>
        </div>
      </div>
    )
  }

  // --- UTILIDADES MATEMÁTICAS DE COLOR ---
  const hexToHsl = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255
    let g = parseInt(hex.slice(3, 5), 16) / 255
    let b = parseInt(hex.slice(5, 7), 16) / 255
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b)
    let h = 0,
      s,
      l = (max + min) / 2
    if (max === min) h = s = 0
    else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
      else if (max === g) h = (b - r) / d + 2
      else if (max === b) h = (r - g) / d + 4
      h /= 6
    }
    return { h: h * 360, s: s * 100, l: l * 100 }
  }

  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100
    const a = (s * Math.min(l, 1 - l)) / 100
    const f = (n: number) => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }

  // --- GENERADOR DE ECOSISTEMA PSICOLÓGICO REAL ---
  const generateEcosystem = () => {
    setIsLoading(true)
    const base = hexToHsl(primary)
    const input = prompt.toLowerCase()

    setTimeout(() => {
      // 1. DEFINIMOS "PERSONALIDADES" DE COLOR SEGÚN EL PROMPT
      let saturationBase = base.s
      let lightnessBase = base.l
      let hueShift = 0

      const isZen =
        input.includes('retiro') ||
        input.includes('paz') ||
        input.includes('yoga') ||
        input.includes('meditacion')
      const isTech =
        input.includes('software') ||
        input.includes('tech') ||
        input.includes('app') ||
        input.includes('ia')
      const isPet =
        input.includes('mascota') ||
        input.includes('perro') ||
        input.includes('animal')
      const isMedical =
        input.includes('medico') ||
        input.includes('salud') ||
        input.includes('clinica')

      const newProposals = Array.from({ length: 6 }, (_, i) => {
        let colors = []

        // 2. VARIACIÓN RADICAL POR PROPUESTA
        // Cada propuesta (i) ahora cambia el ángulo del color de forma agresiva
        let h = (base.h + hueShift) % 360
        let s = saturationBase
        let l = lightnessBase

        // Ajustes por psicología
        if (isZen) {
          s = 20 + i * 5 // Muy desaturado (Tierra/Paz)
          l = 30 + i * 10 // Variaciones de profundidad
          h = (base.h + i * 15) % 360 // Cambios de tono sutiles pero reales
        } else if (isTech) {
          s = 80 // Muy saturado (Energía digital)
          l = 10 + i * 12 // De negro total a azul brillante
          h = (base.h + i * 40) % 360 // Saltos grandes en el círculo cromático
        } else if (isPet) {
          s = 60 + i * 5
          l = 40 + i * 5
          h = (base.h + i * 25) % 360 // Colores vivos y diversos
        } else {
          // Estilo Adobe Color estándar: Saltos de 30 grados
          h = (base.h + i * 60) % 360
          s = Math.max(30, base.s - i * 5)
          l = Math.max(20, base.l + i * 5)
        }

        // Color 1: El color base de la propuesta
        colors.push(hslToHex(h, s, l))

        // Color 2 y 3: Armonía real (Depende del selector de armonía)
        if (harmony === 'analogous') {
          colors.push(hslToHex((h + 30) % 360, s, l + 10))
          colors.push(hslToHex((h + 60) % 360, s - 10, l - 10))
        } else if (harmony === 'triad') {
          colors.push(hslToHex((h + 120) % 360, s, l))
          colors.push(hslToHex((h + 240) % 360, s, l))
        } else {
          // Complementario directo para máximo contraste visual
          colors.push(hslToHex((h + 180) % 360, s + 10, l))
          colors.push(hslToHex((h + 180) % 360, s - 20, l + 20))
        }

        // 3. COLORES DE SOPORTE (UI KIT)
        // Fondo: Alternamos entre "Crema/Papel" y "Gris Pro" para ver versatilidad
        const bgH = isZen ? 40 : base.h // Fondos cálidos para Zen
        colors.push(hslToHex(bgH, 10, i % 2 === 0 ? 98 : 94))

        // Texto: Siempre ultra-contrastado
        colors.push(hslToHex(h, 20, 12))

        return colors
      })

      setProposals(newProposals)
      setSelectedPalette(newProposals[0])
      setIsLoading(false)
    }, 800)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='grid grid-cols-1 lg:grid-cols-12 gap-8'
    >
      {/* COLUMNA 1: CONTROL (Izquierda) */}
      <div className='lg:col-span-4'>
        <div className='p-8 bg-[var(--bg-1)] rounded-[2.5rem] border border-[var(--border-1)] space-y-6 shadow-sm'>
          <div className='flex items-center gap-3 mb-2'>
            <Wand2 className='w-5 h-5 text-[var(--text-brand)]' />
            <h3 className='text-lg font-black uppercase tracking-tighter text-[var(--text-1)]'>
              {pt.title}
            </h3>
          </div>

          <div className='space-y-4'>
            <div className='space-y-2'>
              <label className='text-[10px] font-black uppercase text-[var(--text-3)]'>
                {pt.input_hex}
              </label>
              <div className='flex gap-2'>
                <input
                  type='color'
                  value={primary}
                  onChange={e => setPrimary(e.target.value)}
                  className='w-12 h-12 rounded-xl cursor-pointer bg-[var(--bg-2)] p-1 border border-[var(--border-1)]'
                />
                <input
                  type='text'
                  value={primary}
                  onChange={e => setPrimary(e.target.value)}
                  className='flex-1 bg-[var(--bg-2)] border border-[var(--border-1)] px-4 rounded-xl font-mono font-bold uppercase text-xs'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-[10px] font-black uppercase text-[var(--text-3)]'>
                {pt.label_harmony}
              </label>
              <select
                value={harmony}
                onChange={e => setHarmony(e.target.value)}
                className='w-full p-3 bg-[var(--bg-2)] border border-[var(--border-1)] rounded-xl text-xs font-bold outline-none cursor-pointer'
              >
                <option value='analogous'>{pt.harmonies.analogous}</option>
                <option value='triad'>{pt.harmonies.triad}</option>
                <option value='complementary'>
                  {pt.harmonies.complementary}
                </option>
              </select>
            </div>

            <div className='space-y-2'>
              <label className='text-[10px] font-black uppercase text-[var(--text-3)]'>
                {pt.input_prompt}
              </label>
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder={pt.placeholder_prompt}
                className='w-full p-4 bg-[var(--bg-2)] border border-[var(--border-1)] rounded-2xl text-xs font-medium min-h-[100px] resize-none focus:border-[var(--border-brand)] outline-none'
              />
            </div>

            <button
              onClick={generateEcosystem}
              disabled={isLoading || !prompt}
              className='w-full py-4 rounded-2xl bg-[var(--bg-brand)] text-white text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2'
            >
              {isLoading ? (
                <RefreshCw className='w-4 h-4 animate-spin' />
              ) : (
                <Sparkles className='w-4 h-4' />
              )}
              {pt.btn_generate}
            </button>
          </div>
        </div>
      </div>

      {/* COLUMNA 2 Y 3: PROPUESTAS Y APLICACIÓN (Derecha) */}
      <div className='lg:col-span-8 space-y-8'>
        {/* 6 PROPUESTAS (TIPO ADOBE) */}
        <div className='p-8 bg-[var(--bg-1)] rounded-[2.5rem] border border-[var(--border-1)] shadow-sm'>
          <p className='text-[10px] font-black uppercase text-[var(--text-3)] mb-6 tracking-widest'>
            {pt.suggestions_title}
          </p>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
            {proposals.map((p, i) => (
              <button
                key={i}
                onClick={() => setSelectedPalette(p)}
                className={`p-1.5 rounded-2xl border-2 transition-all flex gap-0.5 hover:scale-105 ${
                  selectedPalette === p
                    ? 'border-[var(--text-brand)] bg-[var(--bg-2)]'
                    : 'border-transparent'
                }`}
              >
                {p.map((c, ic) => (
                  <div
                    key={ic}
                    style={{ backgroundColor: c }}
                    className='flex-1 h-10 first:rounded-l-lg last:rounded-r-lg shadow-inner'
                  />
                ))}
              </button>
            ))}
          </div>
        </div>

        {/* ESTUDIO DE APLICACIÓN Y CÓDIGO */}
        {selectedPalette && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='space-y-8'
          >
            {/* Barras de Color Coolors Style (Interactivas) */}
            <div className='flex h-40 rounded-[3rem] overflow-hidden border border-[var(--border-1)] shadow-2xl bg-[var(--bg-1)]'>
              {selectedPalette.map((c, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: c }}
                  className='flex-1 group relative flex items-center justify-center cursor-pointer transition-all hover:flex-[1.5]'
                  onClick={() => onCopy(c)}
                >
                  <div className='opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center gap-2'>
                    <span className='text-[10px] font-black text-white mix-blend-difference uppercase tracking-tighter bg-black/20 p-2 rounded-lg backdrop-blur-md border border-white/10'>
                      {c}
                    </span>
                    <Copy className='w-4 h-4 text-white mix-blend-difference' />
                  </div>
                </div>
              ))}
            </div>

            {/* Regla 60-30-10 (Visualización de Proporciones) */}
            <div className='space-y-3 px-2'>
              <p className='text-[9px] font-black uppercase text-[var(--text-3)] tracking-widest'>
                {pt.rule_60_30_10}
              </p>
              <div className='h-4 w-full flex rounded-full overflow-hidden border border-[var(--border-1)] shadow-sm'>
                <div
                  style={{
                    backgroundColor:
                      selectedPalette[selectedPalette.length - 2],
                    width: '60%'
                  }}
                />
                <div
                  style={{ backgroundColor: selectedPalette[0], width: '30%' }}
                />
                <div
                  style={{
                    backgroundColor: selectedPalette[2] || selectedPalette[1],
                    width: '10%'
                  }}
                />
              </div>
            </div>

            {/* Preview Tipográfico Real (Layout de Página) */}
            <div
              className='p-12 rounded-[4rem] border border-[var(--border-1)] relative overflow-hidden transition-colors duration-700'
              style={{
                backgroundColor: selectedPalette[selectedPalette.length - 2]
              }}
            >
              {/* Decoración sutil de fondo para realismo UI */}
              <div
                className='absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-[0.07]'
                style={{ backgroundColor: selectedPalette[0] }}
              />

              <div className='max-w-3xl space-y-6 relative z-10'>
                <div
                  className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full'
                  style={{ backgroundColor: selectedPalette[0] }}
                >
                  <div className='w-1.5 h-1.5 rounded-full bg-white animate-pulse' />
                  <span className='text-[10px] font-black uppercase tracking-widest text-white'>
                    Live Preview
                  </span>
                </div>

                <h1
                  className='text-6xl font-normal tracking-tighter leading-[1.1]'
                  style={{ color: selectedPalette[selectedPalette.length - 1] }}
                >
                  H1 Texto Titulo
                </h1>
                <h2
                  className='text-3xl font-normal opacity-90'
                  style={{ color: selectedPalette[0] }}
                >
                  H2 Texto Subtitulo
                </h2>
                <h3
                  className='text-xl font-normal opacity-75'
                  style={{ color: selectedPalette[1] || selectedPalette[0] }}
                >
                  H3 Texto Subtitulo
                </h3>

                <div
                  className='w-24 h-1 rounded-full'
                  style={{
                    backgroundColor: selectedPalette[2] || selectedPalette[0]
                  }}
                />

                <p
                  className='text-lg font-normal leading-relaxed opacity-85 max-w-xl'
                  style={{ color: selectedPalette[selectedPalette.length - 1] }}
                >
                  Este es un texto de párrafo normal. La paleta generada por la
                  IA para <b>"{prompt || '...'}"</b> asegura que la jerarquía
                  visual sea clara y el contraste sea óptimo para la lectura
                  profesional.
                </p>
              </div>
            </div>

            {/* Panel de Exportación de Activos (CSS, Tailwind, JSON) */}
            <ExportPanel
              palette={selectedPalette}
              onCopy={onCopy}
              isCopied={isCopied}
              t={pt}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

/* =====================================================
   4. GENERADOR DE DEGRADADOS MULTIDIMENSIONAL (COMPLETO)
   ===================================================== */
function MeshGradientGenerator ({ lang, t, onCopy, isCopied }: any) {
  const mt = t.mesh
  const [type, setType] = useState<'linear' | 'radial'>('linear')
  const [direction, setDirection] = useState('to right')
  const [bgBase, setBgBase] = useState('#ffffff')
  const [opacity, setOpacity] = useState(1)
  const [colors, setColors] = useState(['#c9a34e', '#0f172a'])

  const directions = [
    { id: 'to top left', icon: '↖' },
    { id: 'to top', icon: '↑' },
    { id: 'to top right', icon: '↗' },
    { id: 'to left', icon: '←' },
    { id: 'center', icon: '•' },
    { id: 'to right', icon: '→' },
    { id: 'to bottom left', icon: '↙' },
    { id: 'to bottom', icon: '↓' },
    { id: 'to bottom right', icon: '↘' }
  ]

  // 1. Generamos los colores con opacidad (Alpha Channel)
  const colorsCss = useMemo(() => {
    const alpha = Math.round(opacity * 255)
      .toString(16)
      .padStart(2, '0')
    return colors
      .map(c => {
        const clean = c.trim()
        return opacity < 1 && clean.length === 7 ? `${clean}${alpha}` : clean
      })
      .join(', ')
  }, [colors, opacity])

  // 2. Construimos el gradiente puro para el Style Inline
  const gradientValue = useMemo(() => {
    let finalDir = direction
    let gType = type === 'linear' ? 'linear-gradient' : 'radial-gradient'
    if (type === 'radial') {
      finalDir =
        direction === 'center'
          ? 'circle at center'
          : direction.replace('to ', 'at ')
    }
    return `${gType}(${finalDir}, ${colorsCss})`
  }, [type, direction, colorsCss])

  // 3. String final para el CodeBox
  const generatedCss = `background-color: ${bgBase};\nbackground-image: ${gradientValue};`

  const addColor = () => {
    if (colors.length < 4) setColors([...colors, '#22c55e'])
  }
  const removeColor = () => {
    if (colors.length > 2) setColors(colors.slice(0, -1))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className='grid grid-cols-1 lg:grid-cols-12 gap-8'
    >
      {/* PANEL DE CONTROL (Izquierda) */}
      <div className='lg:col-span-5 p-8 bg-[var(--bg-1)] rounded-[2.5rem] border border-[var(--border-1)] space-y-6 shadow-sm'>
        <div className='flex items-center gap-3'>
          <Layers className='w-6 h-6 text-[var(--text-brand)]' />
          <h3 className='text-lg font-black uppercase tracking-tighter text-[var(--text-1)]'>
            {mt.title}
          </h3>
        </div>

        {/* TIPO: LINEAL / RADIAL */}
        <div className='flex p-1.5 bg-[var(--bg-2)] rounded-2xl border border-[var(--border-1)]'>
          {['linear', 'radial'].map(m => (
            <button
              key={m}
              onClick={() => setType(m as any)}
              className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                type === m
                  ? 'bg-[var(--bg-1)] text-[var(--text-brand)] shadow-sm'
                  : 'text-[var(--text-3)]'
              }`}
            >
              {m === 'linear' ? mt.type_linear : mt.type_radial}
            </button>
          ))}
        </div>

        {/* DIRECCIONES */}
        <div className='space-y-3'>
          <label className='text-[10px] font-black uppercase text-[var(--text-3)] ml-1'>
            {mt.label_direction}
          </label>
          <div className='grid grid-cols-3 gap-2 w-40 mx-auto'>
            {directions.map(d => (
              <button
                key={d.id}
                onClick={() => setDirection(d.id)}
                className={`h-10 rounded-xl border transition-all flex items-center justify-center font-bold ${
                  direction === d.id
                    ? 'bg-[var(--bg-brand)] text-white border-[var(--bg-brand)]'
                    : 'bg-[var(--bg-2)] text-[var(--text-2)] border-[var(--border-1)] hover:border-[var(--border-brand)]'
                }`}
              >
                {d.icon}
              </button>
            ))}
          </div>
        </div>

        {/* COLORES INDIVIDUALES */}
        <div className='space-y-4 pt-4 border-t border-[var(--border-1)]'>
          <div className='flex justify-between items-center'>
            <label className='text-[10px] font-black uppercase text-[var(--text-3)]'>
              {mt.label_colors_count}
            </label>
            <div className='flex gap-2'>
              <button
                onClick={removeColor}
                className='p-2 bg-[var(--bg-3)] rounded-lg text-xs hover:bg-red-100 hover:text-red-600 transition-colors'
              >
                <Eraser className='w-4 h-4' />
              </button>
              <button
                onClick={addColor}
                className='p-2 bg-[var(--bg-brand)] rounded-lg text-white text-xs hover:opacity-80'
              >
                <Sparkles className='w-4 h-4' />
              </button>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            {colors.map((colorValue, index) => (
              <div key={`color-slot-${index}`} className='space-y-2'>
                <p className='text-[8px] font-black uppercase text-[var(--text-3)] opacity-50 ml-1'>
                  Color {index + 1}
                </p>
                <div className='flex items-center gap-2 p-2 bg-[var(--bg-2)] rounded-2xl border border-[var(--border-1)]'>
                  <div className='relative w-8 h-8 shrink-0'>
                    <input
                      type='color'
                      value={colorValue}
                      onChange={e => {
                        const newColors = [...colors]
                        newColors[index] = e.target.value
                        setColors(newColors)
                      }}
                      className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10'
                    />
                    <div
                      className='w-full h-full rounded-lg border border-black/10'
                      style={{ backgroundColor: colorValue }}
                    />
                  </div>
                  <input
                    type='text'
                    value={colorValue}
                    onChange={e => {
                      const newColors = [...colors]
                      newColors[index] = e.target.value
                      setColors(newColors)
                    }}
                    className='flex-1 bg-transparent border-none outline-none font-mono font-bold text-[10px] uppercase text-[var(--text-1)]'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FONDO Y OPACIDAD */}
        <div className='space-y-4 pt-4 border-t border-[var(--border-1)]'>
          <div className='flex items-center gap-4'>
            <div className='flex-1 space-y-2'>
              <label className='text-[10px] font-black uppercase text-[var(--text-3)]'>
                {mt.label_bg}
              </label>
              <input
                type='color'
                value={bgBase}
                onChange={e => setBgBase(e.target.value)}
                className='w-full h-10 rounded-xl cursor-pointer bg-[var(--bg-2)] p-1'
              />
            </div>
            <div className='flex-[2]'>
              <ControlRange
                label={mt.label_opacity}
                val={opacity}
                min={0}
                max={1}
                step={0.01}
                set={setOpacity}
              />
            </div>
          </div>
        </div>
      </div>

      {/* PREVISUALIZACIÓN (DERECHA) */}
      <div className='lg:col-span-7 space-y-6'>
        <div
          className='h-[450px] rounded-[3rem] shadow-2xl border-[12px] border-[var(--bg-1)] relative transition-all duration-300'
          style={{
            backgroundColor: bgBase,
            backgroundImage: gradientValue
          }}
        >
          {/* Vacío: Solo muestra el fondo generado */}
        </div>

        <CodeBox code={generatedCss} onCopy={onCopy} isCopied={isCopied} />
      </div>
    </motion.div>
  )
}

/* =====================================================
   5. GENERADOR DE FONDOS ANIMADOS (CANVAS ENGINE)
   ===================================================== */
function AnimatedBgGenerator ({ lang, t, onCopy, isCopied }: any) {
  const at = t.animated_bg
  const [type, setType] = useState('snow')
  const [speed, setSpeed] = useState(2)
  const [amount, setAmount] = useState(50)
  const [size, setSize] = useState(3)
  const [color, setColor] = useState('#ffffff')
  const [bgColor, setBgColor] = useState('#0f172a')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particleOpacity, setParticleOpacity] = useState(0.8)
  const [drawMode, setDrawMode] = useState<'fill' | 'stroke'>('fill')
  const [strokeWidth, setStrokeWidth] = useState(2)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: any[] = []

    const createParticles = () => {
      particles = []
      const w = (canvas.width = canvas.offsetWidth)
      const h = (canvas.height = canvas.offsetHeight)
      for (let i = 0; i < amount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          // Ajuste de velocidad: ahora el valor 1 es muy sutil
          vx: (Math.random() - 0.5) * (speed * 0.5),
          vy:
            type === 'snow'
              ? Math.random() * (speed * 0.3) + 0.2
              : (Math.random() - 0.5) * (speed * 0.5),
          s: Math.random() * size + 1
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Configuración de color con opacidad
      // Convertimos HEX a RGBA para la transparencia
      const r = parseInt(color.slice(1, 3), 16)
      const g = parseInt(color.slice(3, 5), 16)
      const b = parseInt(color.slice(5, 7), 16)
      const colorFinal = `rgba(${r}, ${g}, ${b}, ${particleOpacity})`

      ctx.fillStyle = colorFinal
      ctx.strokeStyle = colorFinal
      ctx.lineWidth = strokeWidth

      particles.forEach(p => {
        ctx.beginPath()
        if (type === 'hearts') {
          const d = p.s * 1.5
          ctx.moveTo(p.x, p.y)
          ctx.bezierCurveTo(
            p.x - d,
            p.y - d,
            p.x - d * 1.5,
            p.y + d / 1.5,
            p.x,
            p.y + d * 1.5
          )
          ctx.bezierCurveTo(
            p.x + d * 1.5,
            p.y + d / 1.5,
            p.x + d,
            p.y - d,
            p.x,
            p.y
          )
        } else {
          ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2)
        }

        // OPCIÓN DE RELLENO O BORDE
        if (drawMode === 'fill') ctx.fill()
        else ctx.stroke()

        p.x += p.vx
        p.y += p.vy

        if (p.y > canvas.height) p.y = -10
        if (p.y < -10) p.y = canvas.height
        if (p.x > canvas.width) p.x = 0
        if (p.x < 0) p.x = canvas.width
      })
      animationFrameId = requestAnimationFrame(draw)
    }

    createParticles()
    draw()
    return () => cancelAnimationFrame(animationFrameId)
  }, [type, speed, amount, size, color, particleOpacity, drawMode, strokeWidth])
  // Nota: 'bgColor' no va aquí porque el fondo se controla por CSS en el div padre

  const generatedHtml = useMemo(() => {
    // Convertimos el color de la partícula a RGBA para el código exportado
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    const rgba = `rgba(${r},${g},${b},${particleOpacity})`

    return `
<div style="position:relative; width:100%; min-height:400px; background:${bgColor}; overflow:hidden; border-radius:2rem;">
  <canvas id="bgAnimCanvas" style="display:block; width:100%; height:100%;"></canvas>
  <script>
    (function(){
      const c=document.getElementById('bgAnimCanvas'), x=c.getContext('2d');
      let ps=[];
      function init(){
        c.width=c.parentNode.offsetWidth; c.height=c.parentNode.offsetHeight;
        ps=[];
        for(let i=0;i<${amount};i++) ps.push({
          x:Math.random()*c.width, 
          y:Math.random()*c.height, 
          vx:(Math.random()-0.5)*${speed * 0.5},
          vy:${
            type === 'snow'
              ? `Math.random()*${speed * 0.3}+0.2`
              : `(Math.random()-0.5)*${speed * 0.5}`
          }, 
          s:Math.random()*${size}+1
        });
      }
      function loop(){
        x.clearRect(0,0,c.width,c.height); 
        x.fillStyle='${rgba}'; x.strokeStyle='${rgba}'; x.lineWidth=${strokeWidth};
        ps.forEach(p=>{
          x.beginPath();
          ${
            type === 'hearts'
              ? `const d=p.s*1.5; x.moveTo(p.x,p.y); x.bezierCurveTo(p.x-d,p.y-d,p.x-d*1.5,p.y+d/1.5,p.x,p.y+d*1.5); x.bezierCurveTo(p.x+d*1.5,p.y+d/1.5,p.x+d,p.y-d,p.x,p.y);`
              : `x.arc(p.x,p.y,p.s,0,7);`
          }
          ${drawMode === 'fill' ? 'x.fill();' : 'x.stroke();'}
          p.x+=p.vx; p.y+=p.vy;
          if(p.y>c.height) p.y=-10; if(p.x>c.width) p.x=0; if(p.x<0) p.x=c.width;
        });
        requestAnimationFrame(loop);
      }
      window.addEventListener('resize', init); init(); loop();
    })();
  </script>
</div>`.trim()
  }, [
    type,
    speed,
    amount,
    size,
    color,
    bgColor,
    particleOpacity,
    drawMode,
    strokeWidth
  ])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='grid grid-cols-1 lg:grid-cols-12 gap-8'
    >
      {/* PANEL IZQUIERDO */}
      <div className='lg:col-span-5 p-8 bg-[var(--bg-1)] rounded-[2.5rem] border border-[var(--border-1)] space-y-6 shadow-sm'>
        <div className='flex items-center gap-3'>
          <PlayCircle className='w-6 h-6 text-[var(--text-brand)]' />
          <h3 className='text-lg font-black uppercase tracking-tighter text-[var(--text-1)]'>
            {at.title}
          </h3>
        </div>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <label className='text-[10px] font-black uppercase text-[var(--text-3)]'>
              {at.label_type}
            </label>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className='w-full p-3 bg-[var(--bg-2)] border rounded-xl text-xs font-bold text-[var(--text-1)]'
            >
              <option value='snow'>{at.types.snow}</option>
              <option value='hearts'>{at.types.hearts}</option>
              <option value='bubbles'>{at.types.bubbles}</option>
            </select>
          </div>
          <ControlRange
            label={at.label_speed}
            val={speed}
            min={1}
            max={10}
            set={setSpeed}
          />
          <ControlRange
            label={at.label_amount}
            val={amount}
            min={10}
            max={200}
            set={setAmount}
          />
          <ControlRange
            label={at.label_size}
            val={size}
            min={1}
            max={15}
            set={setSize}
          />
          <div className='grid grid-cols-2 gap-4'>
            <ColorField label={at.label_color} val={color} set={setColor} />
            <ColorField label='Fondo' val={bgColor} set={setBgColor} />
          </div>
          <div className='pt-4 border-t border-[var(--border-1)] space-y-4'>
            <ControlRange
              label='Opacidad Partículas'
              val={particleOpacity}
              min={0.1}
              max={1}
              step={0.1}
              set={setParticleOpacity}
            />

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label className='text-[10px] font-black uppercase text-[var(--text-3)]'>
                  Estilo
                </label>
                <select
                  value={drawMode}
                  onChange={e => setDrawMode(e.target.value as any)}
                  className='w-full p-2.5 bg-[var(--bg-2)] border border-[var(--border-1)] rounded-xl text-[10px] font-bold text-[var(--text-1)] outline-none'
                >
                  <option value='fill'>Relleno</option>
                  <option value='stroke'>Solo Borde</option>
                </select>
              </div>
              {drawMode === 'stroke' && (
                <ControlRange
                  label='Grosor Borde'
                  val={strokeWidth}
                  min={1}
                  max={10}
                  set={setStrokeWidth}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PREVISUALIZACIÓN DERECHA */}
      <div className='lg:col-span-7 space-y-6'>
        <div
          className='h-[450px] rounded-[3rem] shadow-2xl border-[12px] border-[var(--bg-1)] relative overflow-hidden transition-all duration-500'
          style={{ backgroundColor: bgColor }}
        >
          <canvas ref={canvasRef} className='w-full h-full' />
        </div>

        <div className='space-y-2'>
          <p className='text-[10px] font-black uppercase text-[var(--text-3)] ml-4'>
            {at.export_desc}
          </p>
          <CodeBox code={generatedHtml} onCopy={onCopy} isCopied={isCopied} />
        </div>
      </div>
    </motion.div>
  )
}

/* =====================================================
   MÓDULO 8: TRANSFORMADOR DE TEXTO (CON PROTOCOLO i18n)
===================================================== */
function SuiteTextModule ({ lang }: { lang: string }) {
  // Traducciones integradas (Protocolo i18n listo)
  const t = {
    es: {
      title: 'Inteligencia SuiteText',
      desc: 'El cerebro universal para tu texto. Busca, reemplaza, convierte y genera con comandos naturales.',
      placeholder_input: 'Pega tu texto aquí...',
      placeholder_ai:
        'Ej: Reemplaza "perro" por "gato", quita los puntos y ponlo en snake_case...',
      placeholder_fix: 'El resultado aparecerá aquí...',
      result_label: 'Resultado SuiteText',
      btn_ai: 'Ejecutar Comando',
      metrics: {
        words: 'Palabras',
        chars: 'Letras',
        special: 'Letras sin E'
      },
      quick_actions: {
        upper: 'MAYÚSCULAS',
        lower: 'minúsculas',
        slug: 'tipo-slug-seo'
      },
      helper_text:
        'Recuerda: texto-tipo-slug / snake_case / camelCase / PascalCase',
      btn_copy: 'Copiar',
      btn_copied: 'Copiado ✓',
      btn_clean: 'Limpiar Todo',
      error_ai: 'Error al conectar con SuiteText AI',
      action_completed: 'completado.'
    },
    en: {
      title: 'SuiteText Intelligence',
      desc: 'The universal brain for your text. Find, replace, convert, and generate with natural commands.',
      placeholder_input: 'Paste your text here...',
      placeholder_ai:
        'Ex: Replace "dog" with "cat", remove periods, and use snake_case...',
      placeholder_fix: 'Result will appear here...',
      result_label: 'SuiteText Result',
      btn_ai: 'Execute Command',
      metrics: {
        words: 'Words',
        chars: 'Letters',
        special: 'Letters without E'
      },
      quick_actions: {
        upper: 'UPPERCASE',
        lower: 'lowercase',
        slug: 'seo-slug-type'
      },
      helper_text:
        'Remember: text-type-slug / snake_case / camelCase / PascalCase',
      btn_copy: 'Copy',
      btn_copied: 'Copied ✓',
      btn_clean: 'Clear All',
      error_ai: 'Error connecting to SuiteText AI',
      action_completed: 'completed.'
    }
  }[lang as 'es' | 'en']

  const [input, setInput] = useState('')
  const [comando, setComando] = useState('')
  const [output, setOutput] = useState('')
  const [infoIA, setInfoIA] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  // MÉTRICAS EN TIEMPO REAL
  const metrics = useMemo(() => {
    const textToAnalyze = output || input
    return {
      words: textToAnalyze.trim()
        ? textToAnalyze.trim().split(/\s+/).length
        : 0,
      chars: textToAnalyze.length,
      noE: textToAnalyze.replace(/e/gi, '').length
    }
  }, [input, output])

  const handleAIAction = async () => {
    if (!comando || !input) return
    setIsLoading(true)
    setInfoIA('SuiteText AI está procesando...')

    try {
      const res = await fetch('/api/corrector', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // ✅ MEJORA: Enviamos un contexto más claro a la IA
          texto: input,
          comando: `Actúa como un editor de texto experto. Instrucción: ${comando}`,
          lang
        })
      })

      // Validación de respuesta de red
      if (!res.ok) throw new Error('Error en el servidor')

      const data = await res.json()

      if (data.success && data.resultado) {
        setOutput(data.resultado)
        setInfoIA(data.info || 'Acción completada con éxito')
      } else {
        setInfoIA(
          data.error || 'La IA no pudo procesar este comando específico'
        )
      }
    } catch (err) {
      setInfoIA('Error: SuiteText AI tuvo un problema de conexión')
      console.error('Error en SuiteText:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // ✅ Mantenemos solo UNA versión (la más robusta)
  const handleCopy = () => {
    const textToCopy = output || input
    if (!textToCopy) return

    navigator.clipboard.writeText(textToCopy)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className='space-y-6 animate-fade-in'>
      {/* HEADER UNIFICADO */}
      <div className='text-left'>
        <h2 className='text-2xl md:text-3xl font-bold mb-2 text-[var(--text-1)] flex items-center gap-3 justify-start'>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          >
            <RefreshCw className='w-8 h-8 text-[var(--text-brand)]' />
          </motion.div>
          {t.title}
        </h2>
        <p className='text-[var(--text-2)]'>{t.desc}</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
        {/* COLUMNA IZQUIERDA: FLUJO DE TEXTO (8 de 12 columnas) */}
        <div className='lg:col-span-8 space-y-6'>
          {/* 1. INPUT ORIGINAL */}
          <div className='rounded-[2rem] border bg-[var(--bg-1)] border-[var(--border-1)] overflow-hidden shadow-[var(--shadow-1)]'>
            <div className='p-4 bg-[var(--bg-2)] border-b border-[var(--border-1)] flex justify-between items-center'>
              <span className='text-[10px] font-black uppercase tracking-widest text-[var(--text-3)] flex items-center gap-2'>
                <TextCursorInput className='w-4 h-4' /> Input
              </span>
              <button
                onClick={() => {
                  setInput('')
                  setOutput('')
                  setInfoIA('')
                  setComando('')
                }}
                className='text-[10px] font-black uppercase text-red-500 hover:opacity-70 transition-all'
              >
                {t.btn_clean}
              </button>
            </div>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={t.placeholder_input}
              className='w-full p-6 min-h-[220px] bg-transparent outline-none text-[var(--text-1)] font-medium resize-none leading-relaxed'
            />
          </div>

          {/* 2. RESULTADO (MODIFICADO PARA SELECCIÓN LIBRE) */}
          <div className='rounded-[2rem] border bg-[var(--bg-inverse)] border-[var(--border-inverse)] overflow-hidden shadow-2xl relative flex flex-col'>
            <div className='p-4 flex justify-between items-center border-b border-[var(--border-inverse)] bg-[var(--bg-2)]/20 shrink-0'>
              <span className='text-[10px] uppercase tracking-widest text-[var(--text-inverse)] opacity-50 font-black'>
                {t.result_label}
              </span>
              <button
                onClick={handleCopy}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all 
                  ${
                    isCopied
                      ? 'bg-[var(--bg-success)] text-[var(--text-inverse)]'
                      : 'bg-[var(--bg-1)] text-[var(--text-1)] hover:scale-105'
                  }`}
              >
                {isCopied ? t.btn_copied : t.btn_copy}
              </button>
            </div>

            {/* ✅ Cambio de div por textarea para permitir copiar fragmentos específicos */}
            <textarea
              readOnly
              value={output || ''}
              placeholder={t.placeholder_fix}
              className='p-8 h-[450px] w-full bg-transparent outline-none text-[var(--text-inverse)] font-mono text-sm leading-relaxed resize-none custom-scrollbar placeholder:italic placeholder:opacity-20'
            />

            <AnimatePresence>
              {infoIA && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[var(--bg-brand)] text-[var(--text-inverse)] text-[10px] font-black uppercase flex items-center gap-2 shadow-lg z-10'
                >
                  <Info className='w-3 h-3 text-[var(--text-inverse)]' />{' '}
                  {infoIA}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* COLUMNA DERECHA: CENTRO DE CONTROL (4 de 12 columnas) */}
        <div className='lg:col-span-4 space-y-6'>
          {/* 3. MÉTRICAS (ARRIBA) */}
          <div className='grid grid-cols-1 gap-3'>
            {[
              { label: t.metrics.words, val: metrics.words, icon: FileText },
              { label: t.metrics.chars, val: metrics.chars, icon: Type },
              { label: t.metrics.special, val: metrics.noE, icon: Hash }
            ].map((m, i) => (
              <div
                key={i}
                className='p-5 rounded-3xl border bg-[var(--bg-1)] border-[var(--border-1)] flex items-center justify-between shadow-sm hover:border-[var(--border-brand)] transition-colors'
              >
                <div className='flex items-center gap-3'>
                  <m.icon className='w-5 h-5 text-[var(--text-brand)] opacity-70' />
                  <p className='text-[10px] font-black text-[var(--text-3)] uppercase tracking-tight'>
                    {m.label}
                  </p>
                </div>
                <p className='text-xl font-black text-[var(--text-1)]'>
                  {m.val}
                </p>
              </div>
            ))}
          </div>

          {/* 4. BOTONES ACCIÓN RÁPIDA (ENCIMA DEL INPUT IA) */}
          <div className='space-y-3'>
            <div className='flex flex-col gap-2'>
              {[
                {
                  id: 'upper',
                  label: 'MAYÚSCULAS',
                  prompt: 'pasa todo el texto a MAYÚSCULAS'
                },
                {
                  id: 'lower',
                  label: 'minúsculas',
                  prompt: 'pasa todo el texto a minúsculas'
                },
                {
                  id: 'slug',
                  label: 'tipo-slug-seo',
                  prompt:
                    'convierte el texto en un slug optimizado para SEO (letras minúsculas, sin acentos y separados por guiones)'
                }
              ].map(btn => (
                <button
                  key={btn.id}
                  disabled={isLoading || !input}
                  onClick={() => executeQuickAction(btn.prompt, btn.label)} // Función auxiliar para no repetir código
                  className='w-full px-4 py-3 rounded-xl border border-[var(--border-1)] bg-[var(--bg-1)] text-[var(--text-1)] text-[10px] font-black uppercase tracking-widest hover:border-[var(--text-brand)] hover:text-[var(--text-brand)] transition-all disabled:opacity-30 flex justify-between items-center'
                >
                  {btn.label}
                  <Zap className='w-3 h-3 opacity-30' />
                </button>
              ))}
            </div>

            {/* 5. INPUT IA (DEBAJO DE LOS BOTONES) */}
            <div className='rounded-3xl p-1.5 border-2 border-[var(--border-brand)] bg-[var(--bg-1)] shadow-[var(--shadow-brand-glow)] overflow-hidden'>
              <div className='flex flex-col gap-1'>
                <input
                  value={comando}
                  onChange={e => setComando(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAIAction()}
                  placeholder={t.placeholder_ai}
                  className='w-full py-3 px-4 bg-transparent outline-none text-[var(--text-1)] font-bold text-xs'
                />
                <button
                  onClick={handleAIAction}
                  disabled={isLoading || !comando}
                  className='w-full bg-[var(--bg-brand)] text-white py-3 rounded-2xl font-black text-[10px] uppercase tracking-tight hover:opacity-90 disabled:opacity-30 transition-all flex items-center justify-center gap-2'
                >
                  {isLoading ? (
                    <RefreshCw className='w-4 h-4 animate-spin' />
                  ) : (
                    <Wand2 className='w-4 h-4' />
                  )}
                  {t.btn_ai}
                </button>
              </div>
            </div>

            <p className='text-[9px] font-black text-[var(--text-brand)] uppercase tracking-widest px-2 italic text-center opacity-70'>
              {t.helper_text}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  // Función auxiliar para las acciones rápidas
  async function executeQuickAction (prompt: string, label: string) {
    setIsLoading(true)
    try {
      const res = await fetch('/api/corrector', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: input, comando: prompt, lang })
      })
      const data = await res.json()
      if (data.success) {
        setOutput(data.resultado)
        setInfoIA(`${label} completado.`)
      }
    } catch (err) {
      setInfoIA('Error en acción rápida')
    } finally {
      setIsLoading(false)
    }
  }
}

/* =====================================================
   CASCARÓN DEL ERP (REFACTORIZADO & PREMIUM)
===================================================== */
export default function SuiteTextPage ({
  params
}: {
  params: { lang: string }
}) {
  // 1. Extraemos lang de params (solo una vez)
  const lang = params.lang

  const t = {
    es: {
      sidebar: {
        title: 'Suite Text',
        subtitle: 'SEO & Performance',
        donate_title: 'Invítame a un café',
        donate_methods: { paypal: 'PayPal', payo: 'Payo', payu: 'PayU' }
      },
      modal: {
        title: 'Donar con Payoneer',
        desc: 'Utiliza el siguiente correo asociado para realizar tu transferencia.',
        label_email: 'Correo Payoneer',
        copied: 'Copiado'
      },
      menu: [
        { id: 'transform', label: 'Inteligencia SuiteText' },
        { id: 'whatsapp', label: 'Link WhatsApp' },
        { id: 'qr', label: 'Código QR' },
        { id: 'images', label: 'Optimizador WebP' },
        { id: 'paint', label: 'Pintura y Sombras' }
      ]
    },
    en: {
      sidebar: {
        title: 'Suite Text',
        subtitle: 'SEO & Performance',
        donate_title: 'Buy me a coffee',
        donate_methods: { paypal: 'PayPal', payo: 'Payo', payu: 'PayU' }
      },
      modal: {
        title: 'Donate with Payoneer',
        desc: 'Use the following associated email to make your transfer.',
        label_email: 'Payoneer Email',
        copied: 'Copied'
      },
      menu: [
        { id: 'transform', label: 'SuiteText Intelligence' },
        { id: 'whatsapp', label: 'WhatsApp Link' },
        { id: 'qr', label: 'QR Code' },
        { id: 'images', label: 'WebP Optimizer' },
        { id: 'paint', label: 'Paint & Shadows' }
      ]
    }
  }[lang as 'es' | 'en']

  // ESTADO INICIAL: SuiteText Intelligence (Módulo 8)
  const [activeTab, setActiveTab] = useState('transform')
  const [donationModal, setDonationModal] = useState<null | 'payoneer'>(null)
  const [copiedData, setCopiedData] = useState<string>('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuIcons: Record<string, React.ReactNode> = {
    transform: <Wand2 className='w-5 h-5' />,
    counter: <BarChart2 className='w-5 h-5' />,
    whatsapp: <MessageCircle className='w-5 h-5' />,
    qr: <QrCode className='w-5 h-5' />,
    images: <ImageIcon className='w-5 h-5' />,
    paint: <Palette className='w-5 h-5' />
  }

  const handleCopyData = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedData(id)
    setTimeout(() => setCopiedData(''), 2000)
  }

  // ✅ PROTOCOLO ALSNIPPETS: Tracking de intenciones de donación
  const trackDonationClick = (method: string) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      ;(window as any).dataLayer.push({
        event: 'donation_intent',
        donation_method: method, // 'paypal', 'payu', 'payoneer'
        page_location: 'suite_text_sidebar'
      })
    }
  }

  return (
    <div className='min-h-screen bg-[var(--bg-body)] flex flex-col relative'>
      {/* MODAL DE DONACIONES (Z-INDEX SUPERIOR) */}
      <AnimatePresence>
        {donationModal && (
          <div className='fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border bg-[var(--bg-1)] border-[var(--border-1)]'
            >
              <div className='p-5 border-b flex justify-between items-center bg-[var(--bg-2)] border-[var(--border-1)]'>
                <h3 className='font-black text-sm uppercase tracking-widest text-[var(--text-1)] flex items-center gap-2'>
                  <Heart className='w-4 h-4 text-[var(--text-brand)]' />{' '}
                  {t.modal.title}
                </h3>
                <button
                  onClick={() => setDonationModal(null)}
                  className='text-[var(--text-3)] hover:text-red-500 transition-colors'
                >
                  <XCircle className='w-6 h-6' />
                </button>
              </div>
              <div className='p-8 space-y-6'>
                <p className='text-sm font-medium text-[var(--text-2)]'>
                  {t.modal.desc}
                </p>
                <div className='space-y-2'>
                  <label className='text-[10px] font-black uppercase text-[var(--text-3)]'>
                    {t.modal.label_email}
                  </label>
                  <div className='flex gap-2'>
                    <input
                      readOnly
                      value='loaizacarmonaa@gmail.com'
                      className='w-full rounded-xl px-4 py-3 text-xs outline-none font-mono font-bold bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)]'
                    />
                    <button
                      onClick={() =>
                        handleCopyData(
                          'loaizacarmonaa@gmail.com',
                          'payoneer_email'
                        )
                      }
                      className={`relative px-4 rounded-xl transition-all flex items-center justify-center text-white ${
                        copiedData === 'payoneer_email'
                          ? 'bg-[var(--bg-success)]'
                          : 'bg-[var(--bg-brand)] hover:opacity-90'
                      }`}
                    >
                      <AnimatePresence mode='wait'>
                        {copiedData === 'payoneer_email' ? (
                          <motion.span
                            key='c'
                            initial={{ y: 5, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className='text-[9px] font-black uppercase'
                          >
                            {t.modal.copied}
                          </motion.span>
                        ) : (
                          <motion.div
                            key='i'
                            initial={{ y: 5, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                          >
                            <Copy className='w-4 h-4' />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* NAVEGACIÓN MÓVIL (TOP BAR) */}
      <div className='relative md:hidden px-4 pt-40 pb-4 bg-[var(--bg-1)] border-b border-[var(--border-1)] flex items-center justify-between shadow-sm'>
        <div className='flex items-center gap-2'>
          <Zap className='w-5 h-5 text-[var(--text-brand)]' />
          <span className='font-black text-sm uppercase tracking-tighter text-[var(--text-1)]'>
            {t.sidebar.title}
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className='p-2 rounded-lg bg-[var(--bg-2)] border border-[var(--border-1)] text-[var(--text-1)] active:scale-95 transition-transform'
        >
          {mobileMenuOpen ? (
            <X className='w-5 h-5' />
          ) : (
            <Menu className='w-5 h-5' />
          )}
        </button>
      </div>

      <div className='w-full max-w-[1400px] mx-auto px-4 md:px-6 flex-grow flex flex-col md:flex-row gap-6 pt-6 md:pt-40 pb-12'>
        {/* SIDEBAR (Escritorio y Drawer Móvil) */}
        <aside
          className={`
          ${
            mobileMenuOpen
              ? 'flex fixed inset-x-4 top-50 z-[150] h-auto shadow-2xl'
              : 'hidden'
          } 
          md:flex md:sticky md:top-32 md:h-[calc(100vh-12rem)] md:w-72 flex-shrink-0 
          flex-col border bg-[var(--bg-1)] border-[var(--border-1)] overflow-hidden shadow-[var(--shadow-1)]
        `}
        >
          <div className='p-6 border-b border-[var(--border-1)] bg-[var(--bg-2)]/50'>
            <h1 className='text-xl font-black flex items-center gap-2 text-[var(--text-1)] tracking-tighter'>
              <Zap className='w-6 h-6 text-[var(--text-brand)]' />{' '}
              {t.sidebar.title}
            </h1>
            <p className='text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-3)] mt-1 opacity-70'>
              {t.sidebar.subtitle}
            </p>
          </div>

          <nav className='flex-grow overflow-y-auto p-3 flex flex-col gap-1 custom-scrollbar'>
            {t.menu.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setMobileMenuOpen(false)
                }}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-black uppercase tracking-tight transition-all
                  ${
                    activeTab === item.id
                      ? 'bg-[var(--bg-brand-hover)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-sm'
                      : 'text-[var(--text-2)] hover:bg-[var(--bg-2)] border border-transparent'
                  }`}
              >
                <span
                  className={
                    activeTab === item.id
                      ? 'scale-110 transition-transform'
                      : ''
                  }
                >
                  {menuIcons[item.id]}
                </span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* SECCIÓN DONACIONES REDISEÑADA */}
          <div className='p-5 mt-auto border-t border-[var(--border-1)] bg-[var(--bg-2)]/30'>
            <div className='relative group rounded-[2rem] p-5 border bg-[var(--bg-1)] border-[var(--border-1)] shadow-sm overflow-hidden transition-all duration-500 hover:shadow-[var(--shadow-brand-glow)] hover:border-[var(--text-brand)]/30'>
              {/* Decoración de fondo sutil */}
              <div className='absolute -top-10 -right-10 w-24 h-24 bg-[var(--text-brand)] opacity-[0.03] blur-2xl rounded-full group-hover:opacity-[0.08] transition-opacity' />

              <div className='relative z-10 space-y-4'>
                <div className='flex flex-col items-center text-center space-y-1'>
                  <motion.div
                    animate={{
                      rotate: [0, -10, 10, -10, 0],
                      y: [0, -2, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: 'easeInOut'
                    }}
                    className='mb-1'
                  >
                    <Heart className='w-5 h-5 text-[var(--text-heart)] fill-[var(--text-heart)]' />
                  </motion.div>
                  <h4 className='text-[11px] font-black uppercase tracking-[0.15em] text-[var(--text-1)]'>
                    {t.sidebar.donate_title}
                  </h4>
                </div>

                <div className='grid grid-cols-1 gap-2'>
                  {/* PAYPAL - Botón Principal */}
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href='https://www.paypal.com/donate/?hosted_button_id=CB37A97E6SSPN'
                    target='_blank'
                    rel='noopener'
                    onClick={() => trackDonationClick('paypal')} // onClick para el tracking
                    className='flex items-center justify-between px-4 py-3 ...'
                  >
                    <span className='text-[10px] font-black uppercase tracking-wider text-[var(--text-2)] group-hover/btn:text-[var(--text-brand)]'>
                      {t.sidebar.donate_methods.paypal}
                    </span>
                    <Zap className='w-3.5 h-3.5 text-[var(--text-brand)] opacity-40 group-hover/btn:opacity-100 group-hover/btn:scale-110 transition-all' />
                  </motion.a>

                  <div className='grid grid-cols-2 gap-2'>
                    {/* PAYONEER */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setDonationModal('payoneer')
                        trackDonationClick('payoneer') // onClick para el tracking
                      }}
                      className='flex items-center justify-center gap-2 ...'
                    >
                      <span className='text-[9px] font-black uppercase tracking-wider text-[var(--text-2)] group-hover/btn:text-[var(--text-brand)]'>
                        {t.sidebar.donate_methods.payo}
                      </span>
                    </motion.button>

                    {/* PAYU */}
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href='https://biz.payulatam.com/L0f83572D8D5B13'
                      target='_blank'
                      rel='noopener'
                      onClick={() => trackDonationClick('payu')} // onClick para el tracking
                      className='flex items-center justify-center gap-2 ...'
                    >
                      <span className='text-[9px] font-black uppercase tracking-wider text-[var(--text-2)] group-hover/btn:text-[var(--text-brand)]'>
                        {t.sidebar.donate_methods.payu}
                      </span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className='flex-grow min-w-0'>
          <div className='bg-[var(--bg-1)] border border-[var(--border-1)] rounded-[2.5rem] p-5 md:p-10 shadow-[var(--shadow-2)] min-h-[600px]'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'transform' && <SuiteTextModule lang={lang} />}
                {activeTab === 'whatsapp' && <WhatsAppModule lang={lang} />}
                {activeTab === 'qr' && <QrGeneratorModule lang={lang} />}
                {activeTab === 'images' && <ImageOptimizerModule lang={lang} />}
                {activeTab === 'paint' && <PaintAndShadowsModule lang={lang} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CRÉDITOS DISCRETOS (FUERA DE FOOTER) */}
          <div className='mt-6 px-4 flex justify-between items-center opacity-40 hover:opacity-100 transition-opacity'>
            <span className='text-[10px] font-bold text-[var(--text-3)] uppercase tracking-widest'>
              © 2026 Suite Text
            </span>
          </div>
        </main>
      </div>
    </div>
  )
}
