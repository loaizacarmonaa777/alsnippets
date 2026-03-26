import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan las variables de entorno de Supabase')
}
// 1. Cliente estándar: Se usa en componentes visuales (Frontend)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 2. Cliente Admin: Se usa en las Server Actions (Backend) 
// ✅ Este es el que tiene "superpoderes" para escribir en la base de datos
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey || supabaseAnonKey // Fallback a anon si no hay service key (local)
)