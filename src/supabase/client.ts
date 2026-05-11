import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase'
import { supabaseEnv } from './env'

export const supabase = createClient<Database>(supabaseEnv.url, supabaseEnv.publishableKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})
