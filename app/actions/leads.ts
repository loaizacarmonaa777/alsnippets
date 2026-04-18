'use server'

// ✅ CAMBIO 1: Importamos el nuevo cliente de Turso
import { turso } from '@/lib/turso' 
import { LeadData } from '@/types/leads'

/**
 * Server Action Universal para registrar leads desde cualquier formulario
 * Ahora utilizando Turso (SQLite) para evitar congelamientos.
 */
export async function submitLead(data: LeadData) {
  try {
    if (!data.email) {
      return { success: false, error: 'Email requerido' };
    }

    // ✅ CAMBIO 2: Usamos SQL puro con turso.execute
    // Los campos deben coincidir con tu tabla en Turso
    await turso.execute({
      sql: `INSERT INTO leads (
        email, 
        nombre, 
        telefono, 
        source, 
        lang, 
        metadata, 
        is_active,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      args: [
        data.email,
        data.nombre || null,
        data.telefono || null,
        data.source || 'direct',
        data.lang || 'es',
        JSON.stringify(data.metadata || {}), // SQLite guarda objetos como strings JSON
        1, // is_active (true en SQLite es 1)
      ],
    });

    // Si llegamos aquí, la inserción fue exitosa
    return { success: true };

  } catch (error: any) {
    // Manejo de errores específico para Turso (ej: email duplicado)
    console.error('Error de Turso:', error.message);
    
    // Si el error es por email único/duplicado
    if (error.message?.includes('UNIQUE constraint failed')) {
      return { success: false, error: 'El email ya está registrado' };
    }

    return { success: false, error: 'Error al guardar en base de datos' };
  }
}