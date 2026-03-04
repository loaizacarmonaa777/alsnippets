'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import {
  FileText,
  MessageCircle,
  QrCode,
  Image as ImageIcon,
  Zap,
  Download,
  UploadCloud,
  RefreshCw,
  Settings,
  BarChart2,
  Search,
  Code,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowRightLeft,
  Copy,
  AlignLeft,
  Type,
  Hash,
  Key,
  Heart,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Eraser,
  Languages
} from 'lucide-react'

/* =====================================================
   MÓDULO 1: GENERADOR DE WHATSAPP
===================================================== */
function WhatsAppModule () {
  const [codigoPais, setCodigoPais] = useState('+57')
  const [telefono, setTelefono] = useState('')
  const [telefonoError, setTelefonoError] = useState('')
  const [message, setMessage] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  const generateLink = () => {
    if (!telefono) return ''
    const cleanPrefix = codigoPais.replace(/\D/g, '')
    const cleanPhone = telefono.replace(/\D/g, '')
    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/${cleanPrefix}${cleanPhone}${
      encodedMessage ? `?text=${encodedMessage}` : ''
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
      console.error('Fallo al copiar', err)
    }
  }

  return (
    <div className='animate-fade-in space-y-6'>
      <div>
        <h2 className='text-3xl font-bold text-[var(--text-primary)] mb-2'>
          Generador de Enlaces para WhatsApp
        </h2>
        <p className='text-[var(--text-secondary)]'>
          Crea enlaces directos con mensajes predefinidos listos para compartir
          o usar en donde quieras.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* CONFIGURACIÓN */}
        <div className='bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-sm space-y-6'>
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-[var(--text-primary)]'>
              Teléfono <span className='text-red-500'>*</span>
            </label>
            <div className='flex gap-3'>
              <select
                value={codigoPais}
                onChange={e => setCodigoPais(e.target.value)}
                className='w-1/3 bg-[var(--bg-body)] border border-[var(--border-subtle)] rounded-xl px-3 py-3 text-[var(--text-primary)] focus:border-[var(--brand-primary)] outline-none transition-colors cursor-pointer text-sm'
              >
                <option value=''>Código</option>
                <optgroup label='Norteamérica'>
                  <option value='+1'>+1 Canadá / USA</option>
                  <option value='+52'>+52 México</option>
                </optgroup>
                <optgroup label='Sudamérica'>
                  <option value='+54'>+54 Argentina</option>
                  <option value='+56'>+56 Chile</option>
                  <option value='+57'>+57 Colombia</option>
                  <option value='+51'>+51 Perú</option>
                  <option value='+58'>+58 Venezuela</option>
                </optgroup>
                <optgroup label='Europa'>
                  <option value='+34'>+34 España</option>
                </optgroup>
              </select>

              <input
                type='text'
                inputMode='numeric'
                value={telefono}
                placeholder='Número de teléfono'
                onChange={e => {
                  const valor = e.target.value
                  if (/^[\d\s]*$/.test(valor)) {
                    setTelefono(valor)
                    setTelefonoError('')
                  } else {
                    setTelefonoError(
                      'Escribe sólo números sin símbolos ni letras.'
                    )
                  }
                }}
                className={`w-2/3 bg-[var(--bg-body)] border rounded-xl px-4 py-3 text-[var(--text-primary)] focus:border-[var(--brand-primary)] outline-none transition-colors ${
                  telefonoError
                    ? 'border-red-500'
                    : 'border-[var(--border-subtle)]'
                }`}
              />
            </div>
            {telefonoError && (
              <p className='text-red-500 text-xs mt-1'>{telefonoError}</p>
            )}
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-semibold text-[var(--text-primary)]'>
              Mensaje Predefinido
            </label>
            <textarea
              rows={4}
              placeholder='Ej: ¡Hola! Vengo desde tu web...'
              value={message}
              onChange={e => setMessage(e.target.value)}
              className='w-full bg-[var(--bg-body)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:border-[var(--brand-primary)] outline-none transition-colors resize-none'
            />
          </div>
        </div>

        {/* RESULTADO */}
        <div className='bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/20 rounded-2xl p-6 shadow-sm flex flex-col'>
          <h3 className='text-lg font-bold text-[var(--text-primary)] mb-4'>
            Tu Enlace Generado ↓
          </h3>
          <div className='flex-grow flex flex-col justify-center space-y-4'>
            <div className='p-4 bg-[var(--bg-body)] border border-[var(--border-subtle)] rounded-xl break-all text-sm text-[var(--text-secondary)] font-mono min-h-[80px] flex items-center'>
              {generateLink()
                ? generateLink()
                : 'Ingresa un número para generar el enlace...'}
            </div>

            <div className='flex flex-col sm:flex-row gap-3 mt-auto pt-4'>
              <button
                onClick={handleCopy}
                disabled={!telefono}
                className={`relative flex-1 flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed border overflow-hidden ${
                  isCopied
                    ? ' bg-[var(--text-yellow2)] border-[var(--text-yellow2)] text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                    : 'bg-[var(--bg-card)] hover:bg-[var(--bg-tertiary)] border-[var(--border-subtle)] hover:border-[var(--brand-primary)] text-[var(--text-primary)]'
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
                      Copiado ✓
                    </motion.div>
                  ) : (
                    <motion.div
                      key='normal'
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className='flex items-center gap-2 absolute'
                    >
                      <Copy className='w-5 h-5' /> Copiar Enlace
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Placeholder para mantener la altura */}
                <div className='invisible flex items-center gap-2'>
                  <Copy className='w-5 h-5' /> Copiar Enlace
                </div>
              </button>

              <a
                href={generateLink() ? generateLink() : '#'}
                target='_blank'
                rel='noopener noreferrer'
                className={`flex-1 flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-all ${
                  telefono
                    ? 'bg-[#25D366] hover:bg-[#1DA851] text-white shadow-lg hover:-translate-y-1'
                    : 'bg-[#25D366]/50 text-white/50 cursor-not-allowed'
                }`}
              >
                <MessageCircle className='w-5 h-5' /> Probar Link
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =====================================================
   MÓDULO 2: GENERADOR DE CÓDIGO QR
===================================================== */
function QrGeneratorModule () {
  // ... (El código de tu QrGeneratorModule original se mantiene exactamente igual)
  const [url, setUrl] = useState('https://alsnippets.com')
  const [qrColor, setQrColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [size, setSize] = useState(500)
  const [margin, setMargin] = useState(16)
  const [containerRadius, setContainerRadius] = useState(16)
  const [format, setFormat] = useState<'png' | 'webp'>('png')
  const [logo, setLogo] = useState<string | null>(null)
  const [logoRatio, setLogoRatio] = useState<number>(1)
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
  }

  const logoMaxSize = size * 0.25
  const logoW = logoRatio > 1 ? logoMaxSize : logoMaxSize * logoRatio
  const logoH = logoRatio > 1 ? logoMaxSize / logoRatio : logoMaxSize

  return (
    <div className='animate-fade-in space-y-6'>
      <div>
        <h2 className='text-3xl font-bold text-[var(--text-primary)] mb-2'>
          Generador de Código QR
        </h2>
        <p className='text-[var(--text-secondary)]'>
          Crea códigos QR personalizados, añade tu logo y ajusta las esquinas.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
        <div className='lg:col-span-7 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-sm space-y-6'>
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-[var(--text-primary)]'>
              URL de destino
            </label>
            <input
              type='text'
              value={url}
              onChange={e => setUrl(e.target.value)}
              className='w-full bg-[var(--bg-body)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:border-[var(--brand-primary)] outline-none transition-colors'
            />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-subtle)]'>
            <div className='space-y-2 flex flex-col'>
              <label className='text-sm font-semibold text-[var(--text-primary)]'>
                Color del QR
              </label>
              <input
                type='color'
                value={qrColor}
                onChange={e => setQrColor(e.target.value)}
                className='w-full h-12 cursor-pointer rounded-lg bg-transparent border-0'
              />
            </div>
            <div className='space-y-2 flex flex-col'>
              <label className='text-sm font-semibold text-[var(--text-primary)]'>
                Color de Fondo
              </label>
              <input
                type='color'
                value={bgColor}
                onChange={e => setBgColor(e.target.value)}
                className='w-full h-12 cursor-pointer rounded-lg bg-transparent border-0'
              />
            </div>
            <div className='space-y-2 flex flex-col'>
              <label className='text-sm font-semibold text-[var(--text-primary)]'>
                Logo Central
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
                className='w-full h-12 bg-[var(--bg-tertiary)] hover:border-[var(--brand-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm font-medium rounded-lg transition-all'
              >
                {logo ? 'Cambiar Logo' : 'Subir Logo'}
              </button>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--border-subtle)]'>
            <div className='space-y-2'>
              <div className='flex justify-between items-center'>
                <label className='text-sm font-semibold text-[var(--text-primary)]'>
                  Grosor del Margen
                </label>
                <span className='text-xs text-[var(--text-secondary)]'>
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
                className='w-full cursor-pointer accent-[var(--brand-primary)]'
              />
            </div>
            <div className='space-y-2'>
              <div className='flex justify-between items-center'>
                <label className='text-sm font-semibold text-[var(--text-primary)]'>
                  Forma de las esquinas
                </label>
                <span className='text-xs text-[var(--text-secondary)]'>
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
                className='w-full cursor-pointer accent-[var(--brand-primary)]'
              />
            </div>
          </div>
        </div>

        <div className='lg:col-span-5 bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-inner flex flex-col items-center justify-center min-h-[400px]'>
          <div
            ref={qrRef}
            className='shadow-2xl mb-8 transition-all duration-300'
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
              style={{ width: '200px', height: '200px', display: 'block' }}
              imageSettings={
                logo
                  ? {
                      src: logo,
                      x: undefined,
                      y: undefined,
                      height: logoH,
                      width: logoW,
                      excavate: true
                    }
                  : undefined
              }
            />
          </div>
          <div className='w-full mb-4 flex bg-[var(--bg-body)] rounded-lg p-1 border border-[var(--border-subtle)]'>
            <button
              onClick={() => setFormat('png')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                format === 'png'
                  ? 'bg-[var(--bg-card)] text-[var(--brand-primary)] shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              .PNG
            </button>
            <button
              onClick={() => setFormat('webp')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                format === 'webp'
                  ? 'bg-[var(--bg-card)] text-[var(--brand-primary)] shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              .WEBP
            </button>
          </div>
          <button
            onClick={downloadQR}
            className='w-full flex items-center justify-center gap-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white font-bold py-4 rounded-xl shadow-lg hover:-translate-y-1 transition-all'
          >
            <Download className='w-5 h-5' /> Descargar {format.toUpperCase()}
          </button>
          {logo && (
            <button
              onClick={() => {
                setLogo(null)
                setLogoRatio(1)
              }}
              className='mt-3 text-xs text-red-500 hover:underline transition-all font-semibold'
            >
              Quitar Logo
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* =====================================================
   MÓDULO 3: OPTIMIZADOR DE IMÁGENES
===================================================== */
interface ProcessedFile {
  id: string

  originalFile: File

  previewUrl: string

  newName: string

  blob: Blob | null

  isConverting: boolean
}

function ImageOptimizerModule () {
  const [files, setFiles] = useState<ProcessedFile[]>([])

  const [quality, setQuality] = useState<number>(80)

  const [format, setFormat] = useState<'webp' | 'png' | 'jpg' | 'ico'>('webp')

  const [isDragging, setIsDragging] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Función de transformación de la imagen vía Canvas

  const processSingleImage = (
    url: string,

    fmt: string,

    qual: number
  ): Promise<Blob | null> => {
    return new Promise(resolve => {
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

        // ICO no es nativo de canvas, así que lo exportamos como PNG y le forzamos la extensión al descargar

        if (fmt === 'png' || fmt === 'ico') mimeType = 'image/png'

        canvas.toBlob(blob => resolve(blob), mimeType, qual / 100)
      }

      img.onerror = () => resolve(null)

      img.src = url
    })
  }

  // Detecta si cambia la calidad o el formato para reprocesar TODAS las imágenes de la lista

  useEffect(() => {
    if (files.length === 0) return

    const timeout = setTimeout(() => {
      setFiles(prev => prev.map(f => ({ ...f, isConverting: true })))

      files.forEach(async f => {
        const newBlob = await processSingleImage(f.previewUrl, format, quality)

        setFiles(curr =>
          curr.map(item =>
            item.id === f.id
              ? { ...item, blob: newBlob, isConverting: false }
              : item
          )
        )
      })
    }, 400) // Un pequeño retraso para no bloquear el navegador mientras mueves el deslizador

    return () => clearTimeout(timeout)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quality, format])

  // Lógica de carga masiva de archivos

  const handleAddFiles = (newFiles: FileList | File[]) => {
    const validArray = Array.from(newFiles)

    const spaceLeft = 10 - files.length

    const filesToAdd = validArray.slice(0, spaceLeft)

    if (validArray.length > spaceLeft) {
      alert(`Límite alcanzado. Solo se permiten hasta 10 imágenes a la vez.`)
    }

    const newProcessedFiles: ProcessedFile[] = filesToAdd.map(f => ({
      id: Math.random().toString(36).substring(7),

      originalFile: f,

      previewUrl: URL.createObjectURL(f),

      newName: f.name.split('.').slice(0, -1).join('.'), // Quitamos la extensión vieja

      blob: null,

      isConverting: true
    }))

    // Inyectamos en la interfaz inmediatamente

    setFiles(prev => [...prev, ...newProcessedFiles])

    // Comenzamos conversión en background

    newProcessedFiles.forEach(async f => {
      const newBlob = await processSingleImage(f.previewUrl, format, quality)

      setFiles(curr =>
        curr.map(item =>
          item.id === f.id
            ? { ...item, blob: newBlob, isConverting: false }
            : item
        )
      )
    })
  }

  // Eventos de arrastrar y soltar

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()

    setIsDragging(true)
  }

  const onDragLeave = () => setIsDragging(false)

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()

    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleAddFiles(e.dataTransfer.files)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleAddFiles(e.target.files)

    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Helpers UI

  const updateFileName = (id: string, newName: string) => {
    setFiles(prev => prev.map(f => (f.id === id ? { ...f, newName } : f)))
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const resetTool = () => setFiles([])

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'

    const k = 1024

    const sizes = ['B', 'KB', 'MB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Descargas

  const downloadSingle = (file: ProcessedFile) => {
    if (!file.blob) return

    const url = URL.createObjectURL(file.blob)

    const link = document.createElement('a')

    link.href = url

    link.download = `${file.newName || 'imagen_optimizada'}.${format}`

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  const downloadAll = () => {
    files.forEach((f, index) => {
      // Timeout escalonado para no colapsar el navegador con 10 descargas simultáneas

      setTimeout(() => downloadSingle(f), index * 300)
    })
  }

  return (
    <div className='animate-fade-in space-y-6'>
      <div className='flex justify-between items-start'>
        <div>
          <h2 className='text-3xl font-bold text-[var(--text-primary)] mb-2'>
            Optimizador Multimedia
          </h2>

          <p className='text-[var(--text-secondary)]'>
            Procesa hasta 10 imágenes a la vez. Reduce peso, cambia el formato a
            WebP/ICO y renombra en lote. 100% Privado en tu navegador.
          </p>
        </div>

        {files.length > 0 && (
          <button
            onClick={resetTool}
            className='flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-red-500 transition-colors'
          >
            <XCircle className='w-4 h-4' /> Limpiar Todo
          </button>
        )}
      </div>

      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileInputChange}
        multiple
        accept='.jpg,.jpeg,.png,.gif,.bmp,.webp,.svg,.avif'
        className='hidden'
      />

      {files.length === 0 ? (
        // ZONA DE SUBIDA MASIVA (Vacía)

        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full h-80 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all group ${
            isDragging
              ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 scale-[1.02]'
              : 'border-[var(--border-subtle)] hover:border-[var(--brand-primary)] bg-[var(--bg-tertiary)] hover:bg-[var(--brand-primary)]/5'
          }`}
        >
          <div
            className={`w-20 h-20 bg-[var(--bg-card)] rounded-full flex items-center justify-center mb-4 shadow-sm transition-transform duration-300 ${
              isDragging ? 'scale-125' : 'group-hover:scale-110'
            }`}
          >
            <UploadCloud className='w-10 h-10 text-[var(--brand-primary)]' />
          </div>

          <h3 className='text-xl font-bold text-[var(--text-primary)] mb-2'>
            Arrastra hasta 10 imágenes o haz clic
          </h3>

          <p className='text-[var(--text-secondary)]'>
            Soporta JPG, JPEG, WEBP, GIF, PNG, SVG, AVIF
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          {/* LISTA DE ARCHIVOS (Izquierda) */}

          <div className='lg:col-span-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-sm flex flex-col gap-4 max-h-[600px] overflow-y-auto'>
            <h3 className='font-bold text-[var(--text-primary)] mb-2 flex items-center justify-between'>
              Imágenes ({files.length}/10)
              {files.length < 10 && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className='text-xs text-[var(--brand-primary)] hover:underline'
                >
                  + Añadir más
                </button>
              )}
            </h3>

            {files.map(file => {
              const savedPercent = file.blob
                ? (
                    ((file.originalFile.size - file.blob.size) /
                      file.originalFile.size) *
                    100
                  ).toFixed(1)
                : 0

              return (
                <div
                  key={file.id}
                  className='flex items-center gap-4 bg-[var(--bg-body)] border border-[var(--border-subtle)] p-3 rounded-xl relative group hover:border-[var(--brand-primary)] transition-all'
                >
                  {/* Thumbnail */}

                  <div className='w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--bg-tertiary)] relative border border-[var(--border-subtle)]'>
                    {file.isConverting && (
                      <div className='absolute inset-0 bg-black/50 flex items-center justify-center z-10'>
                        <RefreshCw className='w-4 h-4 text-white animate-spin' />
                      </div>
                    )}

                    {/* Object-fit: cover evita que el logo/imagen se estire en la vista previa */}

                    <img
                      src={file.previewUrl}
                      className='w-full h-full object-cover'
                      alt='preview'
                    />
                  </div>

                  {/* Controles de nombre y peso */}

                  <div className='flex-grow flex flex-col gap-1 overflow-hidden'>
                    <input
                      type='text'
                      value={file.newName}
                      onChange={e => updateFileName(file.id, e.target.value)}
                      title='Editar nombre del archivo'
                      className='bg-transparent border-b border-transparent focus:border-[var(--brand-primary)] outline-none text-sm font-bold text-[var(--text-primary)] w-full transition-colors truncate'
                    />

                    <div className='flex items-center gap-2 text-xs'>
                      <span className='text-[var(--text-secondary)] line-through'>
                        {formatBytes(file.originalFile.size)}
                      </span>

                      <span className='text-[var(--text-secondary)]'>→</span>

                      <span className='text-[#25D366] font-bold'>
                        {file.blob
                          ? formatBytes(file.blob.size)
                          : 'Calculando...'}
                      </span>

                      {file.blob && Number(savedPercent) > 0 && (
                        <span className='ml-auto bg-[#25D366]/20 text-[#25D366] px-2 py-0.5 rounded-full font-bold'>
                          -{savedPercent}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Botón Descargar Individual */}

                  <button
                    onClick={() => downloadSingle(file)}
                    disabled={!file.blob || file.isConverting}
                    className='p-3 bg-[var(--bg-tertiary)] hover:bg-[var(--brand-primary)] text-[var(--text-primary)] hover:text-white border border-[var(--border-subtle)] hover:border-[var(--brand-primary)] rounded-lg transition-all disabled:opacity-50'
                  >
                    <Download className='w-4 h-4' />
                  </button>

                  {/* Botón Eliminar Individual (Solo aparece al pasar el mouse en Desktop) */}

                  <button
                    onClick={() => removeFile(file.id)}
                    className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm'
                  >
                    <XCircle className='w-4 h-4' />
                  </button>
                </div>
              )
            })}
          </div>

          {/* AJUSTES GLOBALES (Derecha) */}

          <div className='lg:col-span-4 flex flex-col gap-6'>
            <div className='bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-sm space-y-6'>
              <div className='flex items-center gap-2 mb-2'>
                <Settings className='w-5 h-5 text-[var(--brand-primary)]' />

                <h3 className='text-lg font-bold text-[var(--text-primary)]'>
                  Ajustes Globales
                </h3>
              </div>

              {/* Selector de Formato */}

              <div className='space-y-2'>
                <label className='text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider'>
                  Formato de salida
                </label>

                <select
                  value={format}
                  onChange={e => setFormat(e.target.value as any)}
                  className='w-full bg-[var(--bg-body)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:border-[var(--brand-primary)] outline-none font-bold'
                >
                  <option value='webp'>WebP (Recomendado SEO)</option>

                  <option value='jpg'>JPEG (Estándar)</option>

                  <option value='png'>
                    PNG (Sin pérdida / Transparencias)
                  </option>

                  <option value='ico'>ICO (Para Favicons)</option>
                </select>
              </div>

              {/* Slider de Calidad */}

              <div className='space-y-2 pt-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider'>
                    Calidad / Compresión
                  </span>

                  <span className='font-bold text-[var(--brand-primary)]'>
                    {quality}%
                  </span>
                </div>

                <input
                  type='range'
                  min='10'
                  max='100'
                  step='5'
                  value={quality}
                  onChange={e => setQuality(Number(e.target.value))}
                  disabled={format === 'png' || format === 'ico'} // PNG y ICO no usan compresión de calidad en este contexto
                  className='w-full cursor-pointer accent-[var(--brand-primary)] disabled:opacity-30'
                />

                {(format === 'png' || format === 'ico') && (
                  <p className='text-[10px] text-[var(--text-secondary)] italic'>
                    *La calidad no aplica para formatos sin pérdida.
                  </p>
                )}
              </div>
            </div>

            {/* Descargar Todo */}

            <button
              onClick={downloadAll}
              className='w-full flex items-center justify-center gap-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white font-bold py-4 rounded-xl shadow-lg hover:-translate-y-1 transition-all'
            >
              <Download className='w-5 h-5' /> Descargar Todo ({files.length})
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* =====================================================
   MÓDULO 4: INSPECTOR SEO
===================================================== */
function TextAnalyzerModule () {
  const [htmlCode, setHtmlCode] = useState('')

  const [keyword, setKeyword] = useState('')

  // Lista de todas las pestañas

  type TabType =
    | 'seo'
    | 'readability'
    | 'geo'
    | 'technical'
    | 'performance'
    | 'vitals'
    | 'wordpress'
    | 'security'
    | 'dns'

  const [activeTab, setActiveTab] = useState<TabType>('seo')

  const [metrics, setMetrics] = useState<any>(null)

  useEffect(() => {
    if (!htmlCode.trim()) {
      setMetrics(null)

      return
    }

    try {
      const parser = new DOMParser()

      const doc = parser.parseFromString(htmlCode, 'text/html')

      const body = doc.body

      // 1. Extracción de Nodos Básicos

      const title = doc.querySelector('title')?.textContent || ''

      const metaDesc =
        doc

          .querySelector('meta[name="description"]')

          ?.getAttribute('content') || ''

      const paragraphs = Array.from(body.querySelectorAll('p'))

      const headings = Array.from(
        body.querySelectorAll('h1, h2, h3, h4, h5, h6')
      )

      const images = Array.from(body.querySelectorAll('img'))

      const links = Array.from(body.querySelectorAll('a'))

      const lists = Array.from(body.querySelectorAll('ul, ol'))

      // 2. Extracción y limpieza de texto

      const rawText = body.textContent || ''

      const words = rawText.split(/\s+/).filter(Boolean)

      const wordCount = words.length

      const sentences = rawText.split(/[.!?]+/).filter(s => s.trim().length > 0)

      const sentenceCount = sentences.length || 1

      // 3. Cálculos de Palabra Clave

      const targetKw = keyword.trim().toLowerCase()

      let kwCount = 0

      let kwDensity = 0

      let kwInTitle = false

      let kwInMeta = false

      let kwInFirstP = false

      let kwInSubheadings = 0

      let imgsWithKwAlt = 0

      if (targetKw) {
        const regex = new RegExp(targetKw, 'gi')

        kwCount = (rawText.match(regex) || []).length

        kwDensity = wordCount > 0 ? (kwCount / wordCount) * 100 : 0

        kwInTitle = title.toLowerCase().includes(targetKw)

        kwInMeta = metaDesc.toLowerCase().includes(targetKw)

        const firstPText =
          paragraphs.length > 0 ? paragraphs[0].textContent || '' : ''

        kwInFirstP = firstPText.toLowerCase().includes(targetKw)

        kwInSubheadings = headings.filter(h =>
          h.textContent?.toLowerCase().includes(targetKw)
        ).length

        imgsWithKwAlt = images.filter(img =>
          img.getAttribute('alt')?.toLowerCase().includes(targetKw)
        ).length
      }

      // 4. Enlaces

      let internalLinks = 0

      let externalLinks = 0

      let authorityLinks = 0

      const authorityDomains = [
        'wikipedia.org',

        '.edu',

        '.gov',

        'github.com',

        'google.com'
      ]

      links.forEach(link => {
        const href = link.getAttribute('href') || ''

        if (href.startsWith('http')) {
          externalLinks++

          if (authorityDomains.some(domain => href.includes(domain)))
            authorityLinks++
        } else if (href.startsWith('/') || href.startsWith('#')) {
          internalLinks++
        }
      })

      // 5. Legibilidad (Flesch & Yoast)

      const longParagraphs = paragraphs.filter(
        p => (p.textContent?.split(/\s+/).length || 0) > 150
      ).length

      const longSentences = sentences.filter(
        s => s.split(/\s+/).length > 20
      ).length

      const longSentencePercentage = (longSentences / sentenceCount) * 100

      const syllables = (rawText.match(/[aeiouáéíóúü]/gi) || []).length

      const fleschScore =
        206.84 -
        60 * (syllables / (wordCount || 1)) -
        1.02 * (wordCount / sentenceCount)

      // 6. GEO

      const hasLists = lists.length > 0

      const questionHeadings = headings.filter(
        h => h.textContent?.includes('¿') || h.textContent?.includes('?')
      ).length

      // 7. Técnico y Rendimiento (Ex Lighthouse)

      const hasViewport = /<meta[^>]*name=["']viewport["']/i.test(htmlCode)

      const hasCanonical = /<link[^>]*rel=["']canonical["']/i.test(htmlCode)

      const ogCount = (htmlCode.match(/<meta[^>]*property=["']og:/gi) || [])
        .length

      const imgsWithoutAlt = images.filter(
        img => !img.getAttribute('alt')
      ).length

      const imgsWithoutLazy = images.filter(
        img => img.getAttribute('loading') !== 'lazy'
      ).length

      // Detectar si usan webp o svg

      const nonWebpImgs = images.filter(img => {
        const src = img.getAttribute('src') || ''

        return !src.includes('.webp') && !src.includes('.svg') && src.length > 0
      }).length

      // 8. ESCÁNER DE WORDPRESS

      const isWordPress =
        htmlCode.includes('wp-content') || htmlCode.includes('wp-includes')

      const themeMatch = htmlCode.match(/wp-content\/themes\/([^/]+)\//)

      const wpTheme = themeMatch ? themeMatch[1] : 'No detectado'

      // Extraer plugins buscando en las rutas de scripts/estilos

      const pluginMatches =
        htmlCode.match(/wp-content\/plugins\/([^/]+)\//g) || []

      const uniquePlugins = Array.from(
        new Set(pluginMatches.map(p => p.split('/')[2]))
      )

      setMetrics({
        wordCount,

        title,

        metaDesc,

        imagesTotal: images.length,

        seo: {
          targetKw,

          kwCount,

          kwDensity,

          kwInTitle,

          kwInMeta,

          kwInFirstP,

          kwInSubheadings,

          imgsWithKwAlt,

          internalLinks,

          externalLinks
        },

        readability: {
          longParagraphs,

          longSentencePercentage,

          fleschScore: Math.max(0, Math.min(100, Math.round(fleschScore)))
        },

        geo: { hasLists, questionHeadings, authorityLinks },

        technical: {
          hasViewport,

          hasCanonical,

          ogCount,

          titleLen: title.length,

          descLen: metaDesc.length
        },

        performance: { imgsWithoutAlt, imgsWithoutLazy, nonWebpImgs },

        wordpress: { isWordPress, wpTheme, uniquePlugins }
      })
    } catch (e) {
      console.error('Error parseando HTML', e)

      setMetrics(null)
    }
  }, [htmlCode, keyword])

  const CheckItem = ({
    label,

    passed,

    msg
  }: {
    label: string

    passed: boolean

    msg: string
  }) => (
    <div className='flex items-start gap-3 p-3 bg-[var(--bg-body)] rounded-xl border border-[var(--border-subtle)]'>
      {passed ? (
        <CheckCircle className='w-5 h-5 text-green-500 flex-shrink-0 mt-0.5' />
      ) : (
        <XCircle className='w-5 h-5 text-red-500 flex-shrink-0 mt-0.5' />
      )}

      <div>
        <p className='text-sm font-bold text-[var(--text-primary)]'>{label}</p>

        <p
          className='text-xs text-[var(--text-secondary)]'
          dangerouslySetInnerHTML={{ __html: msg }}
        ></p>
      </div>
    </div>
  )

  const WarningItem = ({
    label,

    isWarning,

    count = undefined,

    msg
  }: {
    label: string

    isWarning: boolean

    count?: number

    msg: string
  }) => (
    <div className='flex items-start gap-3 p-3 bg-[var(--bg-body)] rounded-xl border border-[var(--border-subtle)]'>
      {!isWarning ? (
        <CheckCircle className='w-5 h-5 text-green-500 flex-shrink-0 mt-0.5' />
      ) : (
        <AlertTriangle className='w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5' />
      )}

      <div>
        <p className='text-sm font-bold text-[var(--text-primary)]'>
          {label}{' '}
          {count !== undefined && (
            <span className='bg-[var(--bg-tertiary)] px-2 py-0.5 rounded text-xs ml-1'>
              {count}
            </span>
          )}
        </p>

        <p
          className='text-xs text-[var(--text-secondary)]'
          dangerouslySetInnerHTML={{ __html: msg }}
        ></p>
      </div>
    </div>
  )

  return (
    <div className='animate-fade-in flex flex-col h-full gap-6'>
      <div>
        <h2 className='text-3xl font-bold text-[var(--text-primary)] mb-2'>
          Auditoría SEO On-Page & Técnica
        </h2>

        <p className='text-[var(--text-secondary)]'>
          Inspecciona el código fuente. Analiza métricas SEO, rendimiento,
          legibilidad y detecta tecnologías como WordPress.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow'>
        {/* PANEL IZQUIERDO: INPUTS */}

        <div className='lg:col-span-5 flex flex-col gap-4'>
          <div className='bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-5 shadow-sm space-y-3'>
            <label className='text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2'>
              <Search className='w-4 h-4 text-[var(--brand-primary)]' />
              Frase clave objetivo
            </label>

            <input
              type='text'
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder='Ej: optimización seo wordpress'
              className='w-full bg-[var(--bg-body)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:border-[var(--brand-primary)] outline-none'
            />
          </div>

          <div className='flex flex-col bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-sm overflow-hidden flex-grow min-h-[400px]'>
            <div className='bg-[var(--bg-tertiary)] p-3 border-b border-[var(--border-subtle)] flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Code className='w-4 h-4 text-[var(--text-secondary)]' />

                <span className='text-sm font-semibold text-[var(--text-primary)]'>
                  Código Fuente HTML
                </span>
              </div>

              <button
                onClick={() => setHtmlCode('')}
                className='text-xs text-[var(--text-secondary)] hover:text-red-500'
              >
                Limpiar
              </button>
            </div>

            <textarea
              value={htmlCode}
              onChange={e => setHtmlCode(e.target.value)}
              placeholder='Presiona Ctrl+U en la web a analizar, copia todo el código y pégalo aquí...'
              className='w-full h-full p-6 bg-[#0d1117] text-[#c9d1d9] font-mono text-sm outline-none resize-none whitespace-pre'
              spellCheck='false'
            />
          </div>
        </div>

        {/* PANEL DERECHO: RESULTADOS CON TABS HORIZONTALES */}

        <div className='lg:col-span-7 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-sm flex flex-col overflow-hidden'>
          {/* NAVEGACIÓN DE PESTAÑAS (Scroll Horizontal) */}

          <div className='w-full border-b border-[var(--border-subtle)] bg-[var(--bg-tertiary)]/50'>
            <div className='flex overflow-x-auto scrollbar-hide snap-x'>
              {[
                { id: 'seo', label: 'Análisis SEO' },

                { id: 'readability', label: 'Legibilidad' },

                { id: 'geo', label: 'Optimización IA' },

                { id: 'technical', label: 'SEO Técnico' },

                { id: 'performance', label: 'Rendimiento' },

                { id: 'wordpress', label: 'WordPress' },

                { id: 'vitals', label: 'Web Vitals' },

                { id: 'security', label: 'Seguridad' },

                { id: 'dns', label: 'DNS' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex-shrink-0 snap-start px-6 py-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-[var(--brand-primary)] text-[var(--brand-primary)] bg-[var(--bg-card)]'
                      : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className='p-6 flex-grow bg-[var(--bg-tertiary)]/10 overflow-y-auto max-h-[600px] scrollbar-hide relative'>
            {!metrics ? (
              <div className='absolute inset-0 flex flex-col items-center justify-center opacity-50 space-y-3 p-6 text-center'>
                <FileText className='w-12 h-12' />

                <p>
                  Pega el código HTML e ingresa una frase clave para iniciar la
                  auditoría avanzada.
                </p>
              </div>
            ) : (
              <div className='animate-fade-in'>
                {/* 1. SEO (YOAST PRO) */}

                {activeTab === 'seo' && (
                  <div className='space-y-4'>
                    {!metrics.seo.targetKw && (
                      <div className='p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-600 text-sm mb-4'>
                        ⚠️ Define una "Frase clave objetivo" a la izquierda para
                        habilitar el análisis de densidad y ubicación.
                      </div>
                    )}

                    <CheckItem
                      label='Aparición en el primer párrafo'
                      passed={metrics.seo.kwInFirstP}
                      msg={
                        metrics.seo.kwInFirstP
                          ? 'La frase clave aparece en el primer párrafo.'
                          : 'Añade la frase clave al principio del texto.'
                      }
                    />

                    <CheckItem
                      label='Densidad de la frase clave'
                      passed={
                        metrics.seo.kwDensity >= 0.5 &&
                        metrics.seo.kwDensity <= 2.5
                      }
                      msg={`Aparece <strong>${
                        metrics.seo.kwCount
                      }</strong> veces (Densidad: <strong>${metrics.seo.kwDensity.toFixed(
                        2
                      )}%</strong>).`}
                    />

                    <CheckItem
                      label='Títulos y Subtítulos (H1, H2, H3)'
                      passed={metrics.seo.kwInSubheadings > 0}
                      msg={`Aparece en <strong>${metrics.seo.kwInSubheadings}</strong> subtítulo(s).`}
                    />

                    <CheckItem
                      label='Enlaces salientes (Externos)'
                      passed={metrics.seo.externalLinks > 0}
                      msg={`Se detectaron <strong>${metrics.seo.externalLinks}</strong> enlace(s) a sitios externos.`}
                    />

                    <CheckItem
                      label='Enlaces internos'
                      passed={metrics.seo.internalLinks > 0}
                      msg={`Tienes <strong>${metrics.seo.internalLinks}</strong> enlace(s) interno(s).`}
                    />
                  </div>
                )}

                {/* 2. LEGIBILIDAD */}

                {activeTab === 'readability' && (
                  <div className='space-y-4'>
                    <div className='flex items-center gap-4 bg-[var(--bg-body)] border border-[var(--border-subtle)] p-4 rounded-xl'>
                      <div className='w-16 h-16 flex items-center justify-center rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-2xl font-bold border border-[var(--brand-primary)]/30'>
                        {metrics.readability.fleschScore}
                      </div>

                      <div>
                        <p className='font-bold text-[var(--text-primary)]'>
                          Prueba de Lectura (Flesch)
                        </p>

                        <p className='text-xs text-[var(--text-secondary)]'>
                          Puntuación mayor que 60 es fácil de leer.
                        </p>
                      </div>
                    </div>

                    <WarningItem
                      label='Longitud de los párrafos'
                      isWarning={metrics.readability.longParagraphs > 0}
                      msg={`<strong>${metrics.readability.longParagraphs}</strong> párrafo(s) superan las 150 palabras.`}
                    />

                    <WarningItem
                      label='Longitud de las frases'
                      isWarning={
                        metrics.readability.longSentencePercentage > 25
                      }
                      msg={`El <strong>${metrics.readability.longSentencePercentage.toFixed(
                        1
                      )}%</strong> de tus frases superan las 20 palabras (Máx: 25%).`}
                    />

                    <WarningItem
                      label='Conteo de palabras'
                      isWarning={metrics.wordCount < 300}
                      msg={`El texto tiene <strong>${metrics.wordCount}</strong> palabras (Mínimo recomendado: 300).`}
                    />
                  </div>
                )}

                {/* 3. OPTIMIZACIÓN IA (GEO) */}

                {activeTab === 'geo' && (
                  <div className='space-y-4'>
                    <CheckItem
                      label='Intención de Búsqueda (Preguntas)'
                      passed={metrics.geo.questionHeadings > 0}
                      msg={`Detectamos <strong>${metrics.geo.questionHeadings}</strong> título(s) en formato pregunta.`}
                    />

                    <CheckItem
                      label='Formatos Escaneables (Listas)'
                      passed={metrics.geo.hasLists}
                      msg={
                        metrics.geo.hasLists
                          ? 'El código contiene listas (&lt;ul&gt;, &lt;ol&gt;).'
                          : 'No detectamos listas. Utiliza viñetas.'
                      }
                    />

                    <WarningItem
                      label='Enlaces de Autoridad (E-E-A-T)'
                      isWarning={metrics.geo.authorityLinks === 0}
                      msg={
                        metrics.geo.authorityLinks > 0
                          ? `Enlazaste a <strong>${metrics.geo.authorityLinks}</strong> dominio(s) de alta autoridad (wikipedia, .edu, .gov).`
                          : 'No hay enlaces a fuentes oficiales para respaldar datos.'
                      }
                    />
                  </div>
                )}

                {/* 4. SEO TÉCNICO */}

                {activeTab === 'technical' && (
                  <div className='space-y-3'>
                    <CheckItem
                      label='Meta Title'
                      passed={
                        metrics.technical.titleLen > 0 &&
                        metrics.technical.titleLen <= 60
                      }
                      msg={`Longitud: ${metrics.technical.titleLen} caracteres (Ideal: 50-60).`}
                    />

                    <CheckItem
                      label='Meta Description'
                      passed={
                        metrics.technical.descLen > 0 &&
                        metrics.technical.descLen <= 160
                      }
                      msg={`Longitud: ${metrics.technical.descLen} caracteres (Ideal: 120-160).`}
                    />

                    <CheckItem
                      label='Etiqueta Viewport'
                      passed={metrics.technical.hasViewport}
                      msg={
                        metrics.technical.hasViewport
                          ? 'Presente. Optimizado para móviles.'
                          : 'Ausente.'
                      }
                    />

                    <CheckItem
                      label='Etiqueta Canonical'
                      passed={metrics.technical.hasCanonical}
                      msg={
                        metrics.technical.hasCanonical
                          ? 'Presente. Previene contenido duplicado.'
                          : 'Ausente.'
                      }
                    />

                    <CheckItem
                      label='Open Graph (Redes Sociales)'
                      passed={metrics.technical.ogCount > 0}
                      msg={`Se detectaron ${metrics.technical.ogCount} etiquetas OG.`}
                    />
                  </div>
                )}

                {/* 5. RENDIMIENTO */}

                {activeTab === 'performance' && (
                  <div className='space-y-3'>
                    <WarningItem
                      label='Imágenes sin atributo ALT'
                      isWarning={metrics.performance.imgsWithoutAlt > 0}
                      count={metrics.performance.imgsWithoutAlt}
                      msg='Afecta severamente la accesibilidad y el SEO.'
                    />

                    <WarningItem
                      label='Imágenes sin Lazy Loading'
                      isWarning={metrics.performance.imgsWithoutLazy > 0}
                      count={metrics.performance.imgsWithoutLazy}
                      msg="Añadir loading='lazy' acelera la carga inicial."
                    />

                    <WarningItem
                      label='Imágenes No-WebP'
                      isWarning={metrics.performance.nonWebpImgs > 0}
                      count={metrics.performance.nonWebpImgs}
                      msg='Se encontraron JPGs/PNGs.'
                    />
                  </div>
                )}

                {/* 6. WORDPRESS CHECKER */}

                {activeTab === 'wordpress' && (
                  <div className='space-y-4'>
                    <CheckItem
                      label='CMS Detectado'
                      passed={metrics.wordpress.isWordPress}
                      msg={
                        metrics.wordpress.isWordPress
                          ? 'El sitio está construido con WordPress.'
                          : 'No se detectaron huellas de WordPress en el código.'
                      }
                    />

                    {metrics.wordpress.isWordPress && (
                      <>
                        <div className='p-4 bg-[var(--bg-body)] rounded-xl border border-[var(--border-subtle)]'>
                          <p className='text-sm font-bold text-[var(--text-primary)]'>
                            Tema Activo
                          </p>

                          <p className='text-lg text-[var(--brand-primary)] font-mono capitalize'>
                            {metrics.wordpress.wpTheme.replace(/-/g, ' ')}
                          </p>
                        </div>

                        <div className='p-4 bg-[var(--bg-body)] rounded-xl border border-[var(--border-subtle)]'>
                          <p className='text-sm font-bold text-[var(--text-primary)] mb-2'>
                            Plugins Detectados en el Frontend (
                            {metrics.wordpress.uniquePlugins.length})
                          </p>

                          {metrics.wordpress.uniquePlugins.length > 0 ? (
                            <div className='flex flex-wrap gap-2'>
                              {metrics.wordpress.uniquePlugins.map(
                                (plugin: string) => (
                                  <span
                                    key={plugin}
                                    className='bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--text-secondary)] text-xs px-2 py-1 rounded-md'
                                  >
                                    {plugin}
                                  </span>
                                )
                              )}
                            </div>
                          ) : (
                            <p className='text-xs text-[var(--text-secondary)]'>
                              No se detectaron plugins inyectando scripts en el
                              HTML.
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* 7. WEB VITALS (Informativo por ahora) */}

                {activeTab === 'vitals' && (
                  <div className='space-y-4'>
                    <div className='p-4 bg-[var(--brand-primary)]/10 rounded-xl border border-[var(--brand-primary)]/30 mb-2'>
                      <p className='text-xs text-[var(--text-secondary)]'>
                        Las Core Web Vitals requieren ejecución en navegador
                        real. Aquí tienes los estándares a cumplir:
                      </p>
                    </div>

                    <div className='p-4 bg-[var(--bg-body)] rounded-xl border border-[var(--border-subtle)]'>
                      <h4 className='font-bold text-lg text-green-500 mb-1'>
                        LCP (Largest Contentful Paint)
                      </h4>

                      <p className='text-sm text-[var(--text-secondary)]'>
                        El elemento más grande (foto/texto) debe cargar en menos
                        de <strong>2.5 segundos</strong>.
                      </p>
                    </div>

                    <div className='p-4 bg-[var(--bg-body)] rounded-xl border border-[var(--border-subtle)]'>
                      <h4 className='font-bold text-lg text-yellow-500 mb-1'>
                        CLS (Cumulative Layout Shift)
                      </h4>

                      <p className='text-sm text-[var(--text-secondary)]'>
                        Evita que la web "salte" mientras carga asignando{' '}
                        <code>width</code> y <code>height</code> a tus imágenes.
                      </p>
                    </div>
                  </div>
                )}

                {/* 8. PESTAÑAS FUTURAS (API Requerida) */}

                {['security', 'dns'].includes(activeTab) && (
                  <div className='flex flex-col items-center justify-center py-12 text-center'>
                    <div className='w-16 h-16 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center mb-4'>
                      <Settings className='w-8 h-8 text-[var(--text-secondary)] opacity-50' />
                    </div>

                    <h3 className='text-lg font-bold text-[var(--text-primary)]'>
                      Próximamente
                    </h3>

                    <p className='text-sm text-[var(--text-secondary)] max-w-md mt-2'>
                      {activeTab === 'security' &&
                        'La verificación de Lista Negra (Malware) y cabeceras de seguridad requerirá conexión con nuestra API externa en futuras versiones.'}

                      {activeTab === 'dns' &&
                        'La resolución de registros DNS y detección de servidor web se habilitará en la versión PRO.'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* =====================================================
   MÓDULO 5 CONTADOR Y CORRECTOR GRAMATICAL
===================================================== */
function WordCounterModule () {
  const [text, setText] = useState('')
  const [countSpaces, setCountSpaces] = useState(true)
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const [isCopied, setIsCopied] = useState(false)

  // Cálculos en tiempo real
  const wordsCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const charsCount = countSpaces ? text.length : text.replace(/\s/g, '').length
  const sentencesCount = text.trim()
    ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    : 0
  const paragraphsCount = text.trim()
    ? text.split(/\n+/).filter(p => p.trim().length > 0).length
    : 0

  // Corrector Ortográfico/Gramatical Básico (Regex local)
  const correctedText = React.useMemo(() => {
    if (!text) return ''
    let fixed = text

    // 1. Eliminar múltiples espacios
    fixed = fixed.replace(/ {2,}/g, ' ')
    // 2. Corregir espacio antes de puntuación (ej: "hola ," -> "hola,")
    fixed = fixed.replace(/\s+([.,!?:;])/g, '$1')
    // 3. Asegurar espacio después de puntuación (si sigue una letra)
    fixed = fixed.replace(/([.,!?:;])([a-zA-Zñáéíóúü])/gi, '$1 $2')
    // 4. Capitalizar la primera letra del texto y después de cada punto
    fixed = fixed.replace(
      /(^\s*|[.!?]\s+)([a-zñáéíóúü])/gi,
      (match, p1, p2) => p1 + p2.toUpperCase()
    )

    return fixed.trim()
  }, [text, language]) // language está listo para futuras reglas API

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
      <div>
        <h2 className='text-3xl font-bold text-[var(--text-primary)] mb-2'>
          Contador & Corrector
        </h2>
        <p className='text-[var(--text-secondary)]'>
          Pega tu texto para analizar sus métricas y obtener una versión con
          limpieza ortográfica y gramatical básica.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
        {/* PANEL IZQUIERDO: INPUT */}
        <div className='lg:col-span-8 flex flex-col bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-sm overflow-hidden min-h-[300px]'>
          <div className='bg-[var(--bg-tertiary)] p-3 border-b border-[var(--border-subtle)] flex justify-between items-center'>
            <span className='text-sm font-semibold text-[var(--text-primary)]'>
              Texto a analizar
            </span>
            <button
              onClick={() => setText('')}
              className='text-xs text-[var(--text-secondary)] hover:text-red-500 transition-colors'
            >
              Limpiar
            </button>
          </div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder='Pega tu texto aquí para comenzar a contar...'
            className='w-full h-full flex-grow p-6 bg-transparent text-[var(--text-primary)] outline-none resize-none leading-relaxed'
            style={{ minHeight: '250px' }}
          />
        </div>

        {/* PANEL DERECHO: MÉTRICAS */}
        <div className='lg:col-span-4 flex flex-col gap-4'>
          <div className='bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-5 shadow-sm flex items-center justify-between'>
            <div>
              <p className='text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider'>
                Palabras
              </p>
              <p className='text-3xl font-black text-[var(--text-primary)]'>
                {wordsCount}
              </p>
            </div>
            <Type className='w-8 h-8 text-[var(--brand-primary)]/30' />
          </div>

          <div className='bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-5 shadow-sm flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider'>
                  Caracteres / Letras
                </p>
                <p className='text-3xl font-black text-[var(--text-primary)]'>
                  {charsCount}
                </p>
              </div>
              <Hash className='w-8 h-8 text-[var(--brand-primary)]/30' />
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
                  countSpaces
                    ? 'bg-[var(--brand-primary)]'
                    : 'bg-[var(--border-subtle)]'
                }`}
              >
                <div
                  className={`absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform duration-300 ${
                    countSpaces ? 'translate-x-5' : ''
                  }`}
                ></div>
              </div>
              <span className='text-xs text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'>
                Contar con espacios
              </span>
            </label>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center text-center'>
              <p className='text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider'>
                Frases
              </p>
              <p className='text-2xl font-black text-[var(--text-primary)]'>
                {sentencesCount}
              </p>
            </div>
            <div className='bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center text-center'>
              <p className='text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider'>
                Párrafos
              </p>
              <p className='text-2xl font-black text-[var(--text-primary)]'>
                {paragraphsCount}
              </p>
            </div>
          </div>
        </div>

        {/* ÁREA INFERIOR: CORRECTOR (BETA) */}
        <div className='lg:col-span-12 flex flex-col bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/30 rounded-2xl shadow-sm overflow-hidden'>
          <div className='bg-[var(--bg-tertiary)]/80 p-3 border-b border-[var(--border-subtle)] flex flex-wrap gap-4 justify-between items-center'>
            <div className='flex items-center gap-3'>
              <span className='text-sm font-bold text-[var(--brand-primary)] flex items-center gap-2'>
                <CheckCircle className='w-4 h-4' /> Corrector Ortográfico (BETA)
              </span>

              <div className='flex bg-[var(--bg-body)] rounded-lg p-1 border border-[var(--border-subtle)]'>
                <button
                  onClick={() => setLanguage('es')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1 ${
                    language === 'es'
                      ? 'bg-[var(--bg-card)] text-[var(--brand-primary)] shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Languages className='w-3 h-3' /> Español
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1 ${
                    language === 'en'
                      ? 'bg-[var(--bg-card)] text-[var(--brand-primary)] shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
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
                  ? 'bg-[var(--brand-primary)] text-white shadow-[0_0_10px_var(--brand-primary)]'
                  : 'bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white'
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
                    Copiado ✓
                  </motion.div>
                ) : (
                  <motion.div
                    key='normal'
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className='flex items-center gap-2 absolute'
                  >
                    <Copy className='w-4 h-4' /> Copiar Corrección
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Espacio invisible para mantener el tamaño del botón intacto */}
              <div className='invisible flex items-center gap-2'>
                <Copy className='w-4 h-4' /> Copiar Corrección
              </div>
            </button>
          </div>

          <textarea
            readOnly
            value={correctedText}
            placeholder='El texto limpio y corregido aparecerá aquí...'
            className='w-full p-6 bg-transparent text-[var(--text-primary)] outline-none resize-none leading-relaxed'
            style={{ minHeight: '150px' }}
          />
          <div className='p-3 bg-[var(--bg-body)] text-[10px] text-[var(--text-secondary)] text-center border-t border-[var(--border-subtle)]'>
            *Nota: Este corrector repara espacios dobles, puntuación y
            mayúsculas. Para análisis gramatical profundo mediante IA, se
            requiere conexión a una API externa.
          </div>
        </div>
      </div>
    </div>
  )
}

/* =====================================================
   MÓDULO 6: CONVERSORES DE TEXTO
===================================================== */
// Sub-componente para el ResultBox animado independiente
const ResultBox = ({ label, value }: { label: string; value: string }) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className='space-y-1'>
      <label className='text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider pl-1'>
        {label}
      </label>
      <div className='flex gap-2'>
        <input
          readOnly
          value={value}
          className='flex-grow bg-[var(--bg-body)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] outline-none font-mono'
        />
        <button
          onClick={handleCopy}
          title='Copiar al portapapeles'
          className={`relative p-3 rounded-xl transition-all flex-shrink-0 flex items-center justify-center overflow-hidden w-12 ${
            copied
              ? 'bg-green-500 text-white shadow-md border-green-500'
              : 'bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]'
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
                Copiado ✓
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

function TextConvertersModule () {
  const [inputText, setInputText] = useState(
    'Mi título de post súper optimizado para SEO 2026'
  )

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
      return 'Error al codificar'
    }
  }
  const safeBase64Decode = (str: string) => {
    try {
      return atob(str)
    } catch {
      return 'Formato inválido'
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
      return 'Formato inválido'
    }
  }

  return (
    <div className='animate-fade-in space-y-6'>
      <div>
        <h2 className='text-3xl font-bold text-[var(--text-primary)] mb-2'>
          Conversores de Texto
        </h2>
        <p className='text-[var(--text-secondary)]'>
          Escribe un texto y obtén automáticamente variables y codificaciones.
        </p>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
        <div className='lg:col-span-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-sm flex flex-col gap-3'>
          <label className='text-sm font-semibold text-[var(--text-primary)]'>
            Texto de Origen
          </label>
          <textarea
            rows={6}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder='Pega aquí tu título, variable o código...'
            className='w-full bg-[var(--bg-body)] border border-[var(--border-subtle)] rounded-xl p-4 text-[var(--text-primary)] focus:border-[var(--brand-primary)] outline-none transition-colors resize-none'
          />
        </div>
        <div className='lg:col-span-7 bg-[var(--bg-tertiary)]/50 border border-[var(--border-subtle)] rounded-2xl p-6 shadow-inner space-y-8 overflow-y-auto max-h-[600px]'>
          <div className='space-y-4'>
            <h3 className='font-bold text-[var(--brand-primary)] flex items-center gap-2 border-b border-[var(--border-subtle)] pb-2'>
              <Code className='w-4 h-4' /> Formatos de Variables
            </h3>
            <ResultBox label='WordPress Slug' value={toSlug(inputText)} />
            <ResultBox label='snake_case' value={toSnake(inputText)} />
            <ResultBox label='camelCase' value={toCamel(inputText)} />
            <ResultBox label='PascalCase' value={toPascal(inputText)} />
            <ResultBox
              label='SCREAMING_SNAKE_CASE'
              value={toScreamingSnake(inputText)}
            />
          </div>
          <div className='space-y-4'>
            <h3 className='font-bold text-[var(--brand-primary)] flex items-center gap-2 border-b border-[var(--border-subtle)] pb-2'>
              <Zap className='w-4 h-4' /> Codificación y Seguridad
            </h3>
            <ResultBox label='URL Encode' value={safeUrlEncode(inputText)} />
            <ResultBox label='URL Decode' value={safeUrlDecode(inputText)} />
            <ResultBox
              label='Base64 Encode'
              value={safeBase64Encode(inputText)}
            />
            <ResultBox
              label='Base64 Decode'
              value={safeBase64Decode(inputText)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* =====================================================
   MÓDULO 7: GENERADOR DE LOREM IPSUM
===================================================== */
function LoremIpsumModule () {
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
        result.push(
          `<h2>Subtítulo de la sección ${i + 1}</h2>\n<p>${paraText}</p>`
        )
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
      <div>
        <h2 className='text-3xl font-bold text-[var(--text-primary)] mb-2'>
          Generador de Lorem Ipsum
        </h2>
        <p className='text-[var(--text-secondary)]'>
          Crea textos de relleno estructurados al instante.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
        <div className='lg:col-span-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-sm flex flex-col gap-6 h-fit'>
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-[var(--text-primary)]'>
              Cantidad de Párrafos
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
              className='w-full bg-[var(--bg-body)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:border-[var(--brand-primary)] outline-none transition-colors'
            />
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-[var(--text-primary)]'>
              Palabras por Párrafo
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
              className='w-full bg-[var(--bg-body)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:border-[var(--brand-primary)] outline-none transition-colors'
            />
          </div>
          <div className='pt-4 border-t border-[var(--border-subtle)]'>
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
                    includeH2
                      ? 'bg-[var(--brand-primary)]'
                      : 'bg-[var(--border-subtle)]'
                  }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${
                    includeH2 ? 'translate-x-6' : ''
                  }`}
                ></div>
              </div>
              <div className='flex flex-col'>
                <span className='text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors'>
                  Estructura HTML (H2)
                </span>
              </div>
            </label>
          </div>
          <button
            onClick={generateLorem}
            className='w-full mt-2 flex items-center justify-center gap-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-body)] border border-[var(--border-subtle)] font-bold py-3 rounded-xl transition-all'
          >
            <RefreshCw className='w-4 h-4' /> Variar texto actual
          </button>
        </div>

        <div className='lg:col-span-8 flex flex-col bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-sm overflow-hidden min-h-[500px]'>
          <div className='bg-[var(--bg-tertiary)] p-3 border-b border-[var(--border-subtle)] flex justify-between items-center'>
            <span className='text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2'>
              Texto Generado
            </span>

            <button
              onClick={handleCopy}
              disabled={!generatedText}
              className={`relative flex items-center justify-center overflow-hidden px-4 py-2 text-xs font-bold rounded-lg transition-all disabled:opacity-50 ${
                isCopied
                  ? 'bg-[var(--text-yellow2)] text-white shadow-[0_0_10px_rgba(34,197,94,0.4)]'
                  : 'bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white'
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
                    Copiado ✓
                  </motion.div>
                ) : (
                  <motion.div
                    key='normal'
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className='flex items-center gap-2 absolute'
                  >
                    <Copy className='w-4 h-4' /> Copiar todo
                  </motion.div>
                )}
              </AnimatePresence>
              <div className='invisible flex items-center gap-2'>
                <Copy className='w-4 h-4' /> Copiar todo
              </div>
            </button>
          </div>
          <textarea
            readOnly
            value={generatedText}
            className='w-full h-full p-6 bg-transparent text-[var(--text-secondary)] font-mono text-sm outline-none resize-none leading-relaxed'
          />
        </div>
      </div>
    </div>
  )
}

/* =====================================================
   MÓDULO 8: TRANSFORMADOR DE TEXTO (MEMORIA CORREGIDA)
===================================================== */
function TextTransformerModule () {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')

  const [findText, setFindText] = useState('')
  const [replaceText, setReplaceText] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  const inputRef = useRef<HTMLDivElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  // Símbolos actualizados con ¿, ¡, !
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

  // Contador de coincidencias en el texto MODIFICADO para precisión real
  const plainTextForCount =
    new DOMParser().parseFromString(outputText, 'text/html').body.textContent ||
    ''
  const matchCount = findText
    ? (plainTextForCount.match(new RegExp(escapeRegExp(findText), 'gi')) || [])
        .length
    : 0

  // Procesador seguro de HTML
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
          break // NUEVA OPCIÓN
        case 'reverse':
          val = val.split('').reverse().join('')
          break
        case 'spaces':
          val = val.replace(/\s+/g, ' ').trim()
          break
        case 'no_spaces':
          val = val.replace(/\s+/g, '')
          break // NUEVO CHECKPOINT ESPACIOS
        case 'replace':
          if (payload?.find)
            val = val.replace(
              new RegExp(escapeRegExp(payload.find), 'gi'),
              payload.replace
            )
          break
        case 'remove_symbol':
          if (payload?.symbol) {
            val = val.replace(new RegExp(escapeRegExp(payload.symbol), 'g'), '')
          }
          break
      }
      node.nodeValue = val
    }
    return mode === 'stripHtml'
      ? doc.body.textContent || ''
      : doc.body.innerHTML
  }

  // LA SOLUCIÓN A LA MEMORIA: Funciones de acción directa (Stackeables)
  const handleQuickAction = (action: string, payload?: any) => {
    // Leemos siempre del Texto Modificado actual para ACUMULAR los cambios
    const currentHtml = outputRef.current?.innerHTML || outputText || inputText
    const newHtml = processHtml(currentHtml, action, payload)

    setOutputText(newHtml)
    if (outputRef.current) outputRef.current.innerHTML = newHtml
  }

  // Manejo de pegado en Texto Original
  const handleInputOriginal = (e: React.FormEvent<HTMLDivElement>) => {
    let val = e.currentTarget.innerHTML
    val = val.replace(/<mark[^>]*>([\s\S]*?)<\/mark>/gi, '$1')
    setInputText(val)

    // Auto-rellena el modificado solo si el modificado está completamente vacío
    if (!outputText && outputRef.current) {
      setOutputText(val)
      outputRef.current.innerHTML = val
    }
  }

  const forceSync = () => {
    setOutputText(inputText)
    if (outputRef.current) outputRef.current.innerHTML = inputText
  }

  // Manejo de edición en Texto Modificado
  const handleInputModified = (e: React.FormEvent<HTMLDivElement>) => {
    setOutputText(e.currentTarget.innerHTML)
  }

  // Función BUSCAR (Resalta en el texto modificado)
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
        '<mark class="bg-fuchsia-500/40 text-inherit rounded-sm px-1">$1</mark>'
      )
      n.parentNode?.replaceChild(span, n)
    })

    outputRef.current.innerHTML = doc.body.innerHTML
  }

  // Función REEMPLAZAR
  const handleReplace = () => {
    if (!findText) return
    handleQuickAction('replace', { find: findText, replace: replaceText })
  }

  // Funciones de formato de texto (B, I, U, etc.)
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
    } catch (err) {
      console.error('Fallo al copiar', err)
    }
  }

  return (
    <div className='animate-fade-in space-y-6'>
      <div>
        <h2 className='text-3xl font-bold text-[var(--text-primary)] mb-2'>
          Transformador de Texto
        </h2>
        <p className='text-[var(--text-secondary)]'>
          Pega tu texto, aplica filtros que <strong>se acumulan</strong>, dale
          formato y visualiza el resultado respetando tus ediciones.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
        {/* PANEL PRINCIPAL */}
        <div className='lg:col-span-8 flex flex-col gap-6'>
          {/* CAJA 1: TEXTO ORIGINAL */}
          <div className='flex flex-col bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-sm overflow-hidden min-h-[220px]'>
            <div className='bg-[var(--bg-tertiary)] p-3 border-b border-[var(--border-subtle)] flex justify-between items-center'>
              <span className='text-sm font-semibold text-[var(--text-primary)]'>
                1. Texto Original
              </span>
              <div className='flex gap-3'>
                <button
                  onClick={forceSync}
                  className='text-xs font-bold text-[var(--brand-primary)] hover:underline transition-colors flex items-center gap-1'
                >
                  <ArrowRightLeft className='w-3 h-3' /> Enviar a edición ↓
                </button>
                <button
                  onClick={() => {
                    setInputText('')
                    setOutputText('')
                    setFindText('')
                    if (inputRef.current) inputRef.current.innerHTML = ''
                    if (outputRef.current) outputRef.current.innerHTML = ''
                  }}
                  className='text-xs text-[var(--text-secondary)] hover:text-red-500 transition-colors'
                >
                  Limpiar todo
                </button>
              </div>
            </div>

            <div
              ref={inputRef}
              contentEditable
              onInput={handleInputOriginal}
              className='w-full h-full flex-grow p-6 bg-transparent text-[var(--text-primary)] outline-none leading-relaxed overflow-y-auto max-h-[250px]'
              data-placeholder='Pega aquí el texto base...'
              style={{ minHeight: '150px' }}
            />
          </div>

          {/* CAJA 2: TEXTO MODIFICADO (EL EDITOR REAL) */}
          <div className='flex flex-col bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/30 rounded-2xl shadow-sm overflow-hidden min-h-[300px]'>
            <div className='bg-[var(--bg-tertiary)]/80 p-2 border-b border-[var(--border-subtle)] flex justify-between items-center flex-wrap gap-2'>
              <div className='flex items-center gap-1 bg-[var(--bg-body)] p-1 rounded-lg border border-[var(--border-subtle)]'>
                <button
                  onClick={() => applyFormat('bold')}
                  className='p-2 hover:bg-[var(--brand-primary)]/10 hover:text-[var(--brand-primary)] rounded transition-colors'
                  title='Negrita (Ctrl+B)'
                >
                  <Bold className='w-4 h-4' />
                </button>
                <button
                  onClick={() => applyFormat('italic')}
                  className='p-2 hover:bg-[var(--brand-primary)]/10 hover:text-[var(--brand-primary)] rounded transition-colors'
                  title='Itálica (Ctrl+I)'
                >
                  <Italic className='w-4 h-4' />
                </button>
                <button
                  onClick={() => applyFormat('underline')}
                  className='p-2 hover:bg-[var(--brand-primary)]/10 hover:text-[var(--brand-primary)] rounded transition-colors'
                  title='Subrayado (Ctrl+U)'
                >
                  <UnderlineIcon className='w-4 h-4' />
                </button>
                <button
                  onClick={() => applyFormat('strikeThrough')}
                  className='p-2 hover:bg-[var(--brand-primary)]/10 hover:text-[var(--brand-primary)] rounded transition-colors'
                  title='Tachado'
                >
                  <Strikethrough className='w-4 h-4' />
                </button>
                <div className='w-px h-6 bg-[var(--border-subtle)] mx-1'></div>
                <button
                  onClick={handleClearFormat}
                  className='p-2 hover:bg-red-500/10 text-red-500 rounded transition-colors flex items-center gap-1 text-xs font-bold'
                  title='Borrar todo el formato'
                >
                  <Eraser className='w-4 h-4' />
                </button>
              </div>

              <button
                onClick={handleCopy}
                className={`relative flex items-center justify-center overflow-hidden px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  isCopied
                    ? 'bg-[var(--brand-primary)] text-white shadow-[0_0_10px_var(--brand-primary)] opacity-90'
                    : 'bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white'
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
                      <Check className='w-4 h-4' /> Copiado ✓
                    </motion.div>
                  ) : (
                    <motion.div
                      key='normal'
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className='flex items-center gap-2 absolute'
                    >
                      <Copy className='w-4 h-4' /> Copiar Resultado
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className='invisible flex items-center gap-2'>
                  <Copy className='w-4 h-4' /> Copiar Resultado
                </div>
              </button>
            </div>

            <div
              ref={outputRef}
              contentEditable
              onInput={handleInputModified}
              className='w-full h-full flex-grow p-6 bg-transparent text-[var(--text-primary)] outline-none leading-relaxed overflow-y-auto max-h-[350px]'
              style={{ minHeight: '250px' }}
            />
          </div>
        </div>

        {/* PANEL DE BOTONES (Acciones Acumulativas) */}
        <div className='lg:col-span-4 flex flex-col gap-6'>
          <div className='bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-5 shadow-sm space-y-3'>
            <h3 className='font-bold text-[var(--text-primary)] text-sm uppercase tracking-wider mb-2'>
              Buscar y Reemplazar
            </h3>

            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-1'>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    placeholder='Buscar palabra...'
                    value={findText}
                    onChange={e => setFindText(e.target.value)}
                    className='flex-grow w-full bg-[var(--bg-body)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-sm focus:border-fuchsia-500 outline-none transition-all'
                  />
                  <button
                    onClick={handleSearchHighlight}
                    disabled={!findText}
                    className='px-4 py-2 bg-[var(--bg-tertiary)] hover:bg-fuchsia-500/10 border border-[var(--border-subtle)] hover:border-fuchsia-500 text-fuchsia-500 font-bold rounded-lg transition-all text-sm disabled:opacity-50'
                  >
                    Buscar
                  </button>
                </div>
                {findText && (
                  <span className='text-[10px] font-semibold text-fuchsia-500 pl-1 animate-fade-in'>
                    {matchCount === 0
                      ? 'No hay coincidencias.'
                      : `${matchCount} coincidencias.`}
                  </span>
                )}
              </div>

              <input
                type='text'
                placeholder='Reemplazar con...'
                value={replaceText}
                onChange={e => setReplaceText(e.target.value)}
                className='w-full bg-[var(--bg-body)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-sm focus:border-[var(--brand-primary)] outline-none transition-all'
              />
              <button
                onClick={handleReplace}
                disabled={!findText || !outputText || matchCount === 0}
                className='w-full py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white font-bold rounded-lg transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Reemplazar {matchCount > 0 ? `(${matchCount})` : ''}
              </button>
            </div>
          </div>

          {/* MAYÚSCULAS & MINÚSCULAS */}
          <div className='bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-5 shadow-sm space-y-3'>
            <h3 className='font-bold text-[var(--text-primary)] text-sm uppercase tracking-wider mb-2'>
              Filtro de Mayúsculas
            </h3>
            <div className='grid grid-cols-2 gap-2'>
              {[
                { id: 'upper', label: 'MAYÚSCULAS' },
                { id: 'lower', label: 'minúsculas' },
                { id: 'title', label: 'Tipo Título' },
                { id: 'sentence', label: '1ra Mayúscula' },
                { id: 'invert', label: 'iNVERTIR mAY/mIN' }
              ].map(btn => (
                <button
                  key={btn.id}
                  onClick={() => handleQuickAction(btn.id)}
                  className='py-2 px-3 bg-[var(--bg-tertiary)] hover:bg-[var(--brand-primary)]/10 text-[var(--text-primary)] hover:text-[var(--brand-primary)] border border-[var(--border-subtle)] hover:border-[var(--brand-primary)] rounded-lg text-sm transition-all'
                >
                  {btn.label}
                </button>
              ))}
              <button
                onClick={() => handleQuickAction('afterDot')}
                className='col-span-2 py-2 px-3 bg-[var(--bg-tertiary)] hover:bg-[var(--brand-primary)]/10 text-[var(--text-primary)] hover:text-[var(--brand-primary)] border border-[var(--border-subtle)] hover:border-[var(--brand-primary)] rounded-lg text-sm transition-all'
              >
                Mayúscula después del punto.
              </button>
              <button
                onClick={() => handleQuickAction('alternate')}
                className='col-span-2 py-2 px-3 bg-[var(--bg-tertiary)] hover:bg-[var(--brand-primary)]/10 text-[var(--text-primary)] hover:text-[var(--brand-primary)] border border-[var(--border-subtle)] hover:border-[var(--brand-primary)] rounded-lg text-sm transition-all'
              >
                aLtErNaDaS (iNtErCaMbIaDaS)
              </button>
            </div>
          </div>

          {/* LIMPIEZA Y FORMATO */}
          <div className='bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-5 shadow-sm space-y-4'>
            <h3 className='font-bold text-[var(--text-primary)] text-sm uppercase tracking-wider mb-1'>
              Limpieza de Símbolos
            </h3>
            <div className='space-y-2'>
              <p className='text-xs text-[var(--text-secondary)]'>
                Haz clic para borrar el símbolo del texto:
              </p>
              <div className='flex flex-wrap gap-2'>
                {symbolsToClean.map(sym => (
                  <button
                    key={sym}
                    onClick={() =>
                      handleQuickAction('remove_symbol', { symbol: sym })
                    }
                    className='w-10 h-10 flex items-center justify-center bg-[var(--bg-tertiary)] hover:bg-red-500 hover:text-white hover:border-red-500 border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-lg font-mono font-bold transition-all shadow-sm'
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>

            <div className='grid grid-cols-1 gap-2 pt-4 border-t border-[var(--border-subtle)]'>
              {/* CHECKPOINT: Eliminar todos los espacios */}
              <button
                onClick={() => handleQuickAction('no_spaces')}
                className='py-2 px-3 flex items-center gap-2 bg-[var(--bg-body)] hover:bg-red-500/10 hover:border-red-500 border border-[var(--border-subtle)] text-red-500 font-bold rounded-lg text-sm transition-all text-left shadow-sm'
              >
                <div className='w-4 h-4 rounded border border-red-500 flex items-center justify-center'>
                  <Check className='w-3 h-3' />
                </div>
                Eliminar TODOS los espacios
              </button>

              <button
                onClick={() => handleQuickAction('spaces')}
                className='py-2 px-3 bg-[var(--bg-tertiary)] hover:bg-[var(--brand-primary)]/10 hover:border-[var(--brand-primary)] border border-[var(--border-subtle)] hover:text-[var(--brand-primary)] rounded-lg text-sm transition-all text-left'
              >
                Quitar espacios dobles/extra
              </button>
              <button
                onClick={() => handleQuickAction('stripHtml')}
                className='py-2 px-3 bg-[var(--bg-tertiary)] hover:bg-[var(--brand-primary)]/10 hover:border-[var(--brand-primary)] border border-[var(--border-subtle)] hover:text-[var(--brand-primary)] rounded-lg text-sm transition-all text-left'
              >
                Eliminar etiquetas HTML
              </button>
              <button
                onClick={() => handleQuickAction('reverse')}
                className='py-2 px-3 bg-[var(--bg-tertiary)] hover:bg-[var(--brand-primary)]/10 hover:border-[var(--brand-primary)] border border-[var(--border-subtle)] hover:text-[var(--brand-primary)] rounded-lg text-sm transition-all text-left'
              >
                Invertir texto (otxet)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =====================================================
   MÓDULO 9: GENERADOR DE HASHTAGS
===================================================== */
function HashtagModule () {
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
    await navigator.clipboard.writeText(result)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className='animate-fade-in space-y-6'>
      <div>
        <h2 className='text-3xl font-bold text-[var(--text-primary)] mb-2'>
          Generador de Hashtags
        </h2>
        <p className='text-[var(--text-secondary)]'>
          Escribe palabras separadas por comas o espacios y conviértelas en
          hashtags listos.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-sm flex flex-col gap-3'>
          <label className='text-sm font-semibold text-[var(--text-primary)]'>
            Tus Palabras o Frase
          </label>
          <textarea
            rows={5}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder='Ej: seo, wordpress, rendimiento web...'
            className='w-full bg-[var(--bg-body)] border border-[var(--border-subtle)] rounded-xl p-4 text-[var(--text-primary)] focus:border-[var(--brand-primary)] outline-none transition-colors resize-none'
          />
          <button
            onClick={() => setText('')}
            className='text-xs text-[var(--text-secondary)] hover:text-[var(--brand-primary)] self-start'
          >
            Limpiar área
          </button>
        </div>

        <div className='bg-[var(--bg-tertiary)]/50 border border-[var(--border-subtle)] rounded-2xl p-6 shadow-inner flex flex-col min-h-[200px]'>
          <h3 className='font-bold text-[var(--brand-primary)] mb-4'>
            Hashtags Generados
          </h3>
          <div className='flex-grow p-4 bg-[var(--bg-body)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-mono text-sm break-all'>
            {result || (
              <span className='text-[var(--text-secondary)] opacity-50'>
                #tus #hashtags #apareceran #aqui
              </span>
            )}
          </div>
          <button
            onClick={handleCopy}
            disabled={!result}
            className={`relative mt-4 w-full flex items-center justify-center overflow-hidden gap-2 font-bold py-3 rounded-xl transition-all disabled:opacity-50 ${
              isCopied
                ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                : 'bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white'
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
                  Copiado ✓
                </motion.div>
              ) : (
                <motion.div
                  key='normal'
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className='flex items-center gap-2 absolute'
                >
                  <Copy className='w-4 h-4' /> Copiar Hashtags
                </motion.div>
              )}
            </AnimatePresence>
            <div className='invisible flex items-center gap-2'>
              <Copy className='w-4 h-4' /> Copiar Hashtags
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

/* =====================================================
   MÓDULO 10: GENERADOR DE CONTRASEÑAS
===================================================== */
function PasswordModule () {
  const [password, setPassword] = useState('Haz_clic_para_generar_***')
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
    if (password === 'Haz_clic_para_generar_***') return
    await navigator.clipboard.writeText(password)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className='animate-fade-in space-y-6'>
      <div>
        <h2 className='text-3xl font-bold text-[var(--text-primary)] mb-2'>
          Generador de Contraseñas
        </h2>
        <p className='text-[var(--text-secondary)]'>
          Crea contraseñas seguras y aleatorias para tus sitios o bases de
          datos.
        </p>
      </div>

      <div className='bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center max-w-2xl mx-auto mt-10'>
        <div className='w-full bg-[var(--bg-body)] border border-[var(--border-subtle)] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8'>
          <span className='text-2xl md:text-3xl font-mono text-[var(--text-primary)] break-all text-center sm:text-left tracking-wider'>
            {password}
          </span>
          <button
            onClick={handleCopy}
            className={`relative p-4 rounded-xl transition-all flex-shrink-0 flex items-center justify-center overflow-hidden w-16 h-16 ${
              isCopied
                ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                : 'bg-[var(--brand-primary)]/10 hover:bg-[var(--brand-primary)] text-[var(--brand-primary)] hover:text-white'
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
                  Copiado ✓
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

        <h3 className='text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-4'>
          Nivel de Seguridad
        </h3>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 w-full'>
          <button
            onClick={() => generatePassword('normal')}
            className='py-4 px-4 bg-[var(--bg-tertiary)] hover:border-green-500 border border-[var(--border-subtle)] rounded-xl flex flex-col items-center gap-1 transition-all'
          >
            <span className='font-bold text-[var(--text-primary)]'>Normal</span>
            <span className='text-xs text-[var(--text-secondary)]'>
              8 Caracteres
            </span>
          </button>
          <button
            onClick={() => generatePassword('medio')}
            className='py-4 px-4 bg-[var(--bg-tertiary)] hover:border-yellow-500 border border-[var(--border-subtle)] rounded-xl flex flex-col items-center gap-1 transition-all'
          >
            <span className='font-bold text-[var(--text-primary)]'>Medio</span>
            <span className='text-xs text-[var(--text-secondary)]'>
              12 Caracteres
            </span>
          </button>
          <button
            onClick={() => generatePassword('alto')}
            className='py-4 px-4 bg-[var(--bg-tertiary)] hover:border-red-500 border border-[var(--border-subtle)] rounded-xl flex flex-col items-center gap-1 transition-all'
          >
            <span className='font-bold text-[var(--text-primary)]'>
              Alto (Seguro)
            </span>
            <span className='text-xs text-[var(--text-secondary)]'>
              20 Caracteres
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

/* =====================================================
   CASCARÓN DEL ERP (LAYOUT PRINCIPAL)
===================================================== */
export default function SuiteTextPage () {
  // Ajusté la pestaña inicial para que puedas ver el nuevo módulo directamente, luego cámbialo a 'analyzer' si deseas
  const [activeTab, setActiveTab] = useState('counter')

  const [donationModal, setDonationModal] = useState<null | 'payoneer'>(null)
  const [copiedData, setCopiedData] = useState<string>('')

  const menuItems = [
    {
      id: 'analyzer',
      label: 'Inspector SEO & Web',
      icon: <Search className='w-5 h-5' />
    },
    {
      id: 'counter',
      label: 'Contador & Corrector',
      icon: <BarChart2 className='w-5 h-5' />
    }, // NUEVO MÓDULO AÑADIDO AL MENÚ
    {
      id: 'transform',
      label: 'Transformador',
      icon: <Type className='w-5 h-5' />
    },
    {
      id: 'converters',
      label: 'Conversores URL',
      icon: <ArrowRightLeft className='w-5 h-5' />
    },
    { id: 'hashtags', label: 'Hashtags', icon: <Hash className='w-5 h-5' /> },
    {
      id: 'passwords',
      label: 'Contraseñas',
      icon: <Key className='w-5 h-5' />
    },
    {
      id: 'lorem',
      label: 'Generador Lorem',
      icon: <AlignLeft className='w-5 h-5' />
    },
    {
      id: 'whatsapp',
      label: 'Link WhatsApp',
      icon: <MessageCircle className='w-5 h-5' />
    },
    { id: 'qr', label: 'Código QR', icon: <QrCode className='w-5 h-5' /> },
    {
      id: 'images',
      label: 'Optimizador WebP',
      icon: <ImageIcon className='w-5 h-5' />
    }
  ]

  const handleCopyData = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedData(id)
    setTimeout(() => setCopiedData(''), 2000)
  }

  return (
    <div className='min-h-screen bg-[var(--bg-body)] pt-24 pb-12 flex flex-col relative'>
      {/* MODAL DE DONACIONES */}
      {donationModal && (
        <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in'>
          <div className='bg-white/95 dark:bg-[#121212]/95 backdrop-blur-xl border border-[var(--border-subtle)] rounded-2xl w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden'>
            <div className='bg-black/5 dark:bg-white/5 p-4 border-b border-[var(--border-subtle)] flex justify-between items-center'>
              <h3 className='font-bold text-[var(--text-primary)] flex items-center gap-2'>
                <Heart className='w-5 h-5 text-red-500 fill-red-500' /> Donar
                con Payoneer
              </h3>
              <button
                onClick={() => setDonationModal(null)}
                className='text-[var(--text-secondary)] hover:text-red-500 transition-colors'
              >
                <XCircle className='w-6 h-6' />
              </button>
            </div>
            <div className='p-6 space-y-6'>
              <p className='text-sm text-[var(--text-secondary)] leading-relaxed'>
                Para apoyarme a través de Payoneer, por favor envía tu donación
                utilizando mi correo electrónico asociado. ¡Muchísimas gracias
                por tu apoyo! ☕
              </p>
              <div className='space-y-2'>
                <label className='text-xs font-bold text-[var(--text-secondary)] uppercase'>
                  Correo Payoneer
                </label>
                <div className='flex gap-2'>
                  <input
                    readOnly
                    value='loaizacarmonaa@gmail.com'
                    className='w-full bg-[var(--bg-body)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] outline-none font-mono'
                  />
                  <button
                    onClick={() =>
                      handleCopyData(
                        'loaizacarmonaa@gmail.com',
                        'payoneer_email'
                      )
                    }
                    className={`relative p-3 rounded-lg transition-all flex-shrink-0 flex items-center justify-center overflow-hidden w-12 text-white ${
                      copiedData === 'payoneer_email'
                        ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]'
                        : 'bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)]'
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
                          Copiado ✓
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

      <div className='w-full max-w-[1400px] mx-auto px-5 flex-grow flex flex-col md:flex-row gap-6'>
        {/* SIDEBAR */}
        <aside className='w-full md:w-72 flex-shrink-0 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl flex flex-col shadow-sm h-[calc(100vh-8rem)] sticky top-24 overflow-hidden'>
          <div className='p-6 pb-4 border-b border-[var(--border-subtle)]'>
            <h1 className='text-xl font-bold text-[var(--text-primary)] flex items-center gap-2'>
              <Zap className='w-6 h-6 text-[var(--brand-primary)]' /> Suite Text
            </h1>
            <p className='text-xs text-[var(--text-secondary)] mt-1 tracking-wider uppercase'>
              SEO & Performance
            </p>
          </div>
          <nav className='flex-grow overflow-y-auto p-4 flex flex-col gap-1 scrollbar-hide'>
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                  activeTab === item.id
                    ? 'bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/20 shadow-sm'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] border border-transparent'
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
          {/* TARJETA DE DONACIONES */}
          <div className='p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-tertiary)]/50'>
            <div className='bg-[var(--bg-body)] border border-[var(--brand-primary)]/30 rounded-xl p-4 text-center space-y-3 shadow-inner'>
              <div className='flex justify-center'>
                <Heart className='w-6 h-6 text-red-500 fill-red-500 animate-pulse' />
              </div>
              <h4 className='text-sm font-bold text-[var(--text-primary)]'>
                ¿Te es útil esta Suite?
              </h4>
              <p className='text-[11px] text-[var(--text-secondary)] leading-relaxed'>
                Esta herramienta es 100% gratuita. Si deseas apoyar mi trabajo,
                ¡invítame un café! ☕
              </p>
              {/* Ahora hay 3 botones: PayPal, Payoneer y PayU */}
              <div className='grid grid-cols-3 gap-2 pt-2'>
                {/* BOTÓN PAYPAL (Link oficial) */}
                <a
                  href='https://www.paypal.com/donate/?hosted_button_id=CB37A97E6SSPN'
                  target='_blank'
                  rel='noopener noreferrer'
                  title='Donar vía PayPal'
                  className='flex justify-center items-center py-2 bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[#00457C] hover:text-[#00457C] rounded-lg transition-colors shadow-sm hover:shadow-md'
                >
                  <span className='font-bold text-[10px] md:text-[11px]'>
                    PayPal
                  </span>
                </a>

                {/* BOTÓN PAYONEER (Abre Modal) */}
                <button
                  onClick={() => setDonationModal('payoneer')}
                  title='Donar vía Payoneer'
                  className='flex justify-center items-center py-2 bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[#FF4800] hover:text-[#FF4800] rounded-lg transition-colors shadow-sm hover:shadow-md'
                >
                  <span className='font-bold text-[10px] md:text-[11px]'>
                    Payoneer
                  </span>
                </button>

                {/* BOTÓN PAYU (Link oficial) */}
                <a
                  href='https://biz.payulatam.com/L0f83572D8D5B13' /* <--- ¡PEGA AQUÍ TU LINK DE COBRO DE PAYU! */
                  target='_blank'
                  rel='noopener noreferrer'
                  title='Donar vía PayU'
                  className='flex justify-center items-center py-2 bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[#A5C313] hover:text-[#A5C313] rounded-lg transition-colors shadow-sm hover:shadow-md'
                >
                  <span className='font-bold text-[10px] md:text-[11px]'>
                    PayU
                  </span>
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* ÁREA DE TRABAJO PRINCIPAL */}
        <main className='flex-grow bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 md:p-10 shadow-sm min-h-[600px] overflow-hidden'>
          {activeTab === 'analyzer' && <TextAnalyzerModule />}
          {activeTab === 'counter' && <WordCounterModule />}{' '}
          {/* NUEVA PESTAÑA */}
          {activeTab === 'transform' && <TextTransformerModule />}
          {activeTab === 'converters' && <TextConvertersModule />}
          {activeTab === 'hashtags' && <HashtagModule />}
          {activeTab === 'passwords' && <PasswordModule />}
          {activeTab === 'lorem' && <LoremIpsumModule />}
          {activeTab === 'whatsapp' && <WhatsAppModule />}
          {activeTab === 'qr' && <QrGeneratorModule />}
          {activeTab === 'images' && <ImageOptimizerModule />}
        </main>
      </div>
    </div>
  )
}
