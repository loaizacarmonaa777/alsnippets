'use server'

// ✅ CORRECCIÓN: Asegúrate de que coincida con cómo exportaste en lib/turso.ts
import { turso } from '@/lib/turso' 
import { LeadData } from '@/types/leads'

export async function submitLead(data: LeadData) {
  try {
    // 1. Validación básica
    if (!data.email) {
      return { success: false, error: 'Email requerido' };
    }

    // 2. Ejecución en Turso
    await turso.execute({
      sql: `INSERT INTO leads (
        email, 
        nombre, 
        telefono, 
        source, 
        lang, 
        metadata, 
        is_active
      ) VALUES (?, ?, ?, ?, ?, ?, 1)`, // Eliminamos created_at de aquí porque el DEFAULT del SQL ya lo pone solo
      args: [
        data.email,
        data.nombre || null,
        data.telefono || null,
        data.source || 'direct',
        data.lang || 'es',
        JSON.stringify(data.metadata || {}), 
      ],
    });

    return { success: true };

  } catch (error: any) {
    console.error('Error detectado en Action:', error.message);
    
    // Si el email ya existe (Turso tira este error específico)
    if (error.message?.includes('UNIQUE')) {
      return { success: false, error: 'Email ya registrado' };
    }

    return { success: false, error: 'Error técnico en la base de datos' };
  }
}