'use server'

import { supabase } from '@/lib/supabase'
import { LeadData } from '@/types/leads'

/**
 * Server Action Universal para registrar leads desde cualquier formulario
 * Si el email ya existe, actualiza los datos (Upsert)
 */
export async function submitLead(data: LeadData) {
  try {
    // Validamos que el email exista al menos
    if (!data.email) {
      return { success: false, error: 'Email requerido' };
    }

    const { error } = await supabase
      .from('leads')
      .upsert(
        { 
          email: data.email,
          nombre: data.nombre,
          telefono: data.telefono,
          source: data.source,
          lang: data.lang,
          metadata: data.metadata || {},
          is_active: true
        }, 
        { 
          onConflict: 'email', // Si el email se repite, actualiza el registro
          ignoreDuplicates: false 
        } 
      )

    if (error) {
      console.error('Error de Supabase:', error.message);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error crítico al guardar lead:', error);
    return { success: false, error: 'No se pudo procesar tu solicitud. Intenta más tarde.' };
  }
}