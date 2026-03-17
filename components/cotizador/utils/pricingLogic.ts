/* =====================================================
    PRICING LOGIC & I18N DATA - FULL VERSION
   ===================================================== */
import {
  parsePhoneNumber,
  getCountries,
  getCountryCallingCode,
  CountryCode
} from 'libphonenumber-js'

export type Currency = 'COP' | 'EUR' | 'USD'

export interface CountryData {
  name: string
  currency: Currency
  code: string
}

export interface CountryOption {
  n: string
  v: string
  iso: string
}

// 1. MAPEO DE MONEDAS
const CURRENCY_MAP: Record<string, Currency> = {
  CO: 'COP',
  ES: 'EUR',
  FR: 'EUR',
  DE: 'EUR',
  IT: 'EUR',
  PT: 'EUR',
  BE: 'EUR',
  NL: 'EUR',
  AT: 'EUR',
  GR: 'EUR',
  IE: 'EUR'
}

// 2. MULTIPLICADORES POR TECNOLOGÍA (El "cerebro" del cotizador)
export const TECH_MULTIPLIERS: Record<string, number> = {
  WordPress: 1.0,
  Wix: 0.85, // Menos complejidad técnica
  Shopify: 1.25, // Especialidad Liquid + Ecosistema cerrado
  Prestashop: 1.4, // Alta complejidad en BD y Smarty
  Joomla: 1.5, // Escasez de especialistas
  Drupal: 1.6, // Arquitectura corporativa
  Otro: 1.3
}

// 3. TARIFAS BASE (WordPress como estándar)
export const PRICES = {
  USD: {
    // Servicios de Soporte
    mantenimiento: 120,
    wpo: 180,
    diseno: 100,
    ecommerce: 220,
    infraestructura: 150,
    soporteGlobal: 350,
    // Servicios de Creación / Cimientos
    webBase: 450, // Estructura inicial del sitio
    seoAuditoria: 200, // Auditoría inicial y Setup
    gestionDominio: 25, // Compra y DNS
    gestionHosting: 180, // Configuración anual
    setupTextos: 150, // Arquitectura de información
    brandingBase: 250, // Identidad visual
    horaCode: 45,
    horaNoCode: 30
  },
  EUR: {
    mantenimiento: 110,
    wpo: 165,
    diseno: 95,
    ecommerce: 200,
    infraestructura: 140,
    soporteGlobal: 320,
    webBase: 400,
    seoAuditoria: 180,
    gestionDominio: 22,
    gestionHosting: 165,
    setupTextos: 140,
    brandingBase: 230,
    horaCode: 42,
    horaNoCode: 28
  },
  COP: {
    mantenimiento: 450000,
    wpo: 750000,
    diseno: 400000,
    ecommerce: 900000,
    infraestructura: 600000,
    soporteGlobal: 1400000,
    webBase: 1800000,
    seoAuditoria: 800000,
    gestionDominio: 100000,
    gestionHosting: 750000,
    setupTextos: 600000,
    brandingBase: 1000000,
    horaCode: 180000,
    horaNoCode: 120000
  }
}

// 4. FUNCIONES DE APOYO (Para evitar errores de TypeScript)

export const COUNTRY_OPTIONS = [
  {
    group: 'Países',
    options: getCountries()
      .map(countryCode => ({
        n:
          new Intl.DisplayNames(['es'], { type: 'region' }).of(countryCode) ||
          countryCode,
        v: `+${getCountryCallingCode(countryCode)}`,
        iso: countryCode
      }))
      .sort((a, b) => a.n.localeCompare(b.n))
  }
]

export const getCountryFromPhone = (
  phone: string,
  lang: string = 'es'
): CountryData => {
  const currentLang = lang as 'es' | 'en'
  try {
    const phoneNumber = parsePhoneNumber(phone)
    if (phoneNumber && phoneNumber.country) {
      const countryCode = phoneNumber.country as string
      const currency = CURRENCY_MAP[countryCode] || 'USD'
      const name =
        new Intl.DisplayNames([currentLang], { type: 'region' }).of(
          countryCode
        ) || countryCode

      return { name, currency, code: `+${phoneNumber.countryCallingCode}` }
    }
  } catch (e) {}
  return { name: '', currency: 'USD', code: '' }
}

/**
 * Aplica el multiplicador tecnológico y redondea
 */
export const calculateAdjustedPrice = (
  basePrice: number,
  tech: string
): number => {
  const multiplier = TECH_MULTIPLIERS[tech] || 1.0
  return Math.round(basePrice * multiplier)
}
