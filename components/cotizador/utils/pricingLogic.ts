// components/cotizador/utils/pricingLogic.ts

export type Currency = 'COP' | 'EUR' | 'USD';

export interface CountryData {
  name: string;
  currency: Currency;
  code: string;
}

// 1. DICCIONARIO MUNDIAL DE PREFIJOS
// Si un país usa Euro, le asignamos 'EUR'. Colombia 'COP'. El resto del mundo usará 'USD'.
const countryPrefixes: Record<string, { name: string; currency: Currency }> = {
  // === COLOMBIA ===
  '+57': { name: 'Colombia', currency: 'COP' },
  
  // === LATAM (Facturación en USD) ===
  '+52': { name: 'México', currency: 'USD' },
  '+54': { name: 'Argentina', currency: 'USD' },
  '+56': { name: 'Chile', currency: 'USD' },
  '+51': { name: 'Perú', currency: 'USD' },
  '+593': { name: 'Ecuador', currency: 'USD' },
  '+58': { name: 'Venezuela', currency: 'USD' },
  '+591': { name: 'Bolivia', currency: 'USD' },
  '+595': { name: 'Paraguay', currency: 'USD' },
  '+598': { name: 'Uruguay', currency: 'USD' },
  '+55': { name: 'Brasil', currency: 'USD' },
  '+501': { name: 'Belice', currency: 'USD' },
  '+502': { name: 'Guatemala', currency: 'USD' },
  '+503': { name: 'El Salvador', currency: 'USD' },
  '+504': { name: 'Honduras', currency: 'USD' },
  '+505': { name: 'Nicaragua', currency: 'USD' },
  '+506': { name: 'Costa Rica', currency: 'USD' },
  '+507': { name: 'Panamá', currency: 'USD' },
  '+53': { name: 'Cuba', currency: 'USD' },
  '+1809': { name: 'Rep. Dominicana', currency: 'USD' },
  '+1829': { name: 'Rep. Dominicana', currency: 'USD' },
  '+1849': { name: 'Rep. Dominicana', currency: 'USD' },
  '+1787': { name: 'Puerto Rico', currency: 'USD' },
  '+1939': { name: 'Puerto Rico', currency: 'USD' },
  
  // === NORTEAMÉRICA (Facturación en USD) ===
  '+1': { name: 'Estados Unidos / Canadá', currency: 'USD' },

  // === EUROPA ZONA EURO (Facturación en EUR) ===
  '+34': { name: 'España', currency: 'EUR' },
  '+33': { name: 'Francia', currency: 'EUR' },
  '+49': { name: 'Alemania', currency: 'EUR' },
  '+39': { name: 'Italia', currency: 'EUR' },
  '+351': { name: 'Portugal', currency: 'EUR' },
  '+31': { name: 'Países Bajos', currency: 'EUR' },
  '+32': { name: 'Bélgica', currency: 'EUR' },
  '+43': { name: 'Austria', currency: 'EUR' },
  '+30': { name: 'Grecia', currency: 'EUR' },
  '+353': { name: 'Irlanda', currency: 'EUR' },
  '+358': { name: 'Finlandia', currency: 'EUR' },
  '+372': { name: 'Estonia', currency: 'EUR' },
  '+371': { name: 'Letonia', currency: 'EUR' },
  '+370': { name: 'Lituania', currency: 'EUR' },
  '+421': { name: 'Eslovaquia', currency: 'EUR' },
  '+386': { name: 'Eslovenia', currency: 'EUR' },
  '+357': { name: 'Chipre', currency: 'EUR' },
  '+356': { name: 'Malta', currency: 'EUR' },
  '+352': { name: 'Luxemburgo', currency: 'EUR' },

  // === EUROPA NO-EURO Y RESTO DEL MUNDO (Facturación en USD) ===
  '+44': { name: 'Reino Unido', currency: 'USD' },
  '+41': { name: 'Suiza', currency: 'USD' },
  '+46': { name: 'Suecia', currency: 'USD' },
  '+47': { name: 'Noruega', currency: 'USD' },
  '+45': { name: 'Dinamarca', currency: 'USD' },
  '+48': { name: 'Polonia', currency: 'USD' },
  '+420': { name: 'República Checa', currency: 'USD' },
  '+81': { name: 'Japón', currency: 'USD' },
  '+86': { name: 'China', currency: 'USD' },
  '+91': { name: 'India', currency: 'USD' },
  '+61': { name: 'Australia', currency: 'USD' },
  '+64': { name: 'Nueva Zelanda', currency: 'USD' },
};

// 2. FUNCIÓN INTELIGENTE DE DETECCIÓN
export const getCountryFromPhone = (phone: string): CountryData => {
  const cleanPhone = phone.trim();
  
  // Magia técnica: Ordenamos las llaves por longitud de mayor a menor.
  // Así evitamos que "+1809" (Rep. Dominicana) se confunda con "+1" (USA).
  const prefixes = Object.keys(countryPrefixes).sort((a, b) => b.length - a.length);

  for (const prefix of prefixes) {
    if (cleanPhone.startsWith(prefix)) {
      return {
        name: countryPrefixes[prefix].name,
        currency: countryPrefixes[prefix].currency,
        code: prefix
      };
    }
  }

  // Si escribe un código que no tenemos en la lista (ej: +971 Emiratos Árabes)
  if (cleanPhone.startsWith('+') && cleanPhone.length >= 3) {
    return { name: 'Internacional', currency: 'USD', code: 'INT' };
  }

  // Si aún no ha escrito nada o faltan números
  return { name: '', currency: 'USD', code: '' };
};


// 3. TARIFA BASE DE MIS SERVICIOS
export const PRICES = {
  USD: {
    webBase: 450,
    wooCommerce: 250,
    branding: 150,
    soporteModulo: 85,     // Precio por cada tarea individual de soporte
    soporteGlobal: 350,    // Precio si eligen "Soporte Global Integral"
    horaNoCode: 30,
    horaCode: 45,
    seo: 200               // Auditoría SEO inicial
  },
  EUR: {
    webBase: 400,
    wooCommerce: 230,
    branding: 140,
    soporteModulo: 80,
    soporteGlobal: 320,
    horaNoCode: 28,
    horaCode: 42,
    seo: 180
  },
  COP: {
    webBase: 1800000,
    wooCommerce: 1000000,
    branding: 600000,
    soporteModulo: 350000,
    soporteGlobal: 1400000,
    horaNoCode: 120000,
    horaCode: 180000,
    seo: 800000
  }
};