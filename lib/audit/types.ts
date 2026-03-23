/**
 * Define el nivel de profundidad de la auditoría según el acceso proporcionado.
 */
export type AuditLevel = 'public' | 'source_code' | 'privileged';

/**
 * Interfaz maestra que representa el resultado completo de una auditoría.
 * Se divide en capas de información (OSINT, Análisis de Código, Servidor e Impacto).
 */
export interface AuditResult {
  meta: {
    domain: string;
    date: string;
    auditLevel: AuditLevel;
    overallScore: number;
  };

  // CAPA 1: OSINT & PUBLIC (Métricas de rendimiento y SEO básico)
  performance: {
    ttfb: number;
    lcp: number;
    cls: number;
    loadTime: number;
    pageSize: number;
    requests: number;
  };

  seo: {
    title: string;
    description: string;
    h1Count: number;
    h2ToH6: { tag: string; text: string }[];
    imgAltMissing: number;
    hasSchema: boolean;
    hasSitemap: boolean;
  };

  // CAPA 2: CODE ANALYSIS (Resultados del escaneo de malware y tecnología)
  security: {
    vulnerabilities: { 
      severity: 'low' | 'medium' | 'high' | 'critical'; 
      message: string; 
    }[];
    malwareDetected: boolean;
    malwareType?: 'japanese_injection' | 'base64_obfuscation' | 'backdoor' | 'none';
    isWordPress: boolean;
    wpVersion?: string;
    pluginsDetected: string[];
  };

  // CAPA 3: PRIVILEGED (Datos profundos de CPanel / Plesk / WP-Admin)
  // Esta sección es opcional (?) ya que depende del nivel de acceso
  server?: {
    phpVersion: string;
    memoryLimit: string;
    maxExecutionTime: string;
    filePermissions: 'secure' | 'vulnerable';
    databaseSize: string;
    unusedImagesCount: number;
    unusedImagesList: string[];
  };

  // CAPA 4: BUSINESS INTELLIGENCE (Traducción de datos técnicos a negocio)
  businessImpact: {
    estimatedLossAnnual: number;
    conversionImprovement: number;
    suggestedBudget: string;
    estimatedHours: number;
    executiveSummary?: string; // Resumen generado por la IA
  };
}

/**
 * Interfaz para los items individuales del IssueAccordion
 */
export interface AuditIssue {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'security' | 'seo' | 'performance';
  recommendation: string;
}