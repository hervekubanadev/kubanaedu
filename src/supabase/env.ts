function getRequiredEnv(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

function getSupabasePublishableKey(): string {
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY
  if (!key) {
    throw new Error('Missing required environment variable: VITE_SUPABASE_PUBLISHABLE_KEY or VITE_SUPABASE_ANON_KEY')
  }

  return key
}

export const supabaseEnv = {
  url: getRequiredEnv('VITE_SUPABASE_URL'),
  publishableKey: getSupabasePublishableKey(),
} as const
