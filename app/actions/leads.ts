'use server'

// ✅ CAMBIO 1: Importamos el cliente con superpoderes (Admin)
import { supabaseAdmin } from '@/lib/supabase' 
import { LeadData } from '@/types/leads'

/**
 * Server Action Universal para registrar leads desde cualquier formulario
 */
export async function submitLead(data: LeadData) {
  try {
    if (!data.email) {
      return { success: false, error: 'Email requerido' };
    }

    // ✅ CAMBIO 2: Usamos supabaseAdmin para saltarnos cualquier restricción de RLS
    const { error } = await supabaseAdmin
      .from('leads')
      .insert([ // Cambiamos upsert por insert para la primera prueba limpia
        { 
          email: data.email,
          nombre: data.nombre,
          telefono: data.telefono,
          source: data.source,
          lang: data.lang,
          metadata: data.metadata || {},
          is_active: true
        }
      ])

    if (error) {
      console.error('Error de Supabase:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error crítico al guardar lead:', error);
    return { success: false, error: 'Error de conexión' };
  }
}