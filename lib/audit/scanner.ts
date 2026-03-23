import * as cheerio from 'cheerio';
import { AuditResult } from './types';

export const scanSourceCode = (html: string): Partial<AuditResult> => {
  const $ = cheerio.load(html);

  // Inicializamos el objeto siguiendo la estructura de AuditResult
  // Usamos Partial<AuditResult> para que TS sepa que estamos construyendo el objeto
  const results: Partial<AuditResult> = {
    meta: {
      domain: '',
      date: new Date().toISOString(),
      auditLevel: 'source_code',
      overallScore: 0,
    },
    security: {
      vulnerabilities: [],
      malwareDetected: false,
      isWordPress: false,
      pluginsDetected: [],
    },
    seo: {
      title: $('title').text() || '',
      description: $('meta[name="description"]').attr('content') || '',
      h1Count: $('h1').length,
      h2ToH6: [],
      imgAltMissing: 0,
      hasSchema: html.includes('application/ld+json'),
      hasSitemap: false,
    },
    performance: {
      ttfb: 0,
      lcp: 0,
      cls: 0,
      loadTime: 0,
      pageSize: 0,
      requests: 0,
    },
    businessImpact: {
      estimatedLossAnnual: 0,
      conversionImprovement: 0,
      suggestedBudget: '',
      estimatedHours: 0,
    }
  };

  // 1. DETECCIÓN DE MALWARE (TEXTO JAPONÉS / INYECCIONES)
  const japanesePattern = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
  const obfuscationPattern = /eval\(base64_decode|eval\(atob|gzinflate\(base64/i;

  if (japanesePattern.test(html)) {
    results.security!.malwareDetected = true;
    results.security!.malwareType = 'japanese_injection';
    results.security!.vulnerabilities.push({ 
      severity: 'critical', 
      message: 'Inyección de palabras clave en japonés detectada.' 
    });
  }

  if (obfuscationPattern.test(html)) {
    results.security!.malwareDetected = true;
    results.security!.malwareType = 'base64_obfuscation';
    results.security!.vulnerabilities.push({ 
      severity: 'high', 
      message: 'Código ofuscado sospechoso detectado.' 
    });
  }

  // 2. DETECCIÓN DE TECH STACK (WordPress)
  const isWP = html.includes('wp-content') || html.includes('wp-includes');
  results.security!.isWordPress = isWP;
  
  // Extraer Plugins de las rutas
  const pluginMatches = html.match(/\/wp-content\/plugins\/([^/]+)\//g);
  if (pluginMatches) {
    results.security!.pluginsDetected = [...new Set(pluginMatches.map(p => p.split('/')[3]))];
  }

  // 3. ANÁLISIS DE IMÁGENES
  $('img').each((_, el) => {
    const alt = $(el).attr('alt');
    if (!alt || alt.trim() === '') {
      results.seo!.imgAltMissing++;
    }
  });

  // 4. SEO ESTRUCTURAL
  results.seo!.h1Count = $('h1').length;
  $('h2, h3, h4, h5, h6').each((_, el) => {
    results.seo!.h2ToH6.push({ 
      tag: el.tagName.toLowerCase(), 
      text: $(el).text().trim() 
    });
  });

  return results;
};