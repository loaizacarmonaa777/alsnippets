export type LeadSource = 
  | 'newsletter' 
  | 'barber_short' 
  | 'contacto' 
  | 'auditoria' 
  | 'cotizacion';

export interface LeadData {
  email: string;
  nombre?: string;
  telefono?: string;
  source: LeadSource;
  lang: string;
  metadata?: Record<string, any>; // Para guardar URLs de auditoría, servicios, etc.
}