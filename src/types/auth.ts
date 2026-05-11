import type { Session, User } from '@supabase/supabase-js'

export type AppRole = 'owner' | 'admin' | 'staff' | 'parent' | 'student'

export type UserContext = {
  userId: string
  schoolId: string | null
  role: AppRole | null
  email: string | null
}

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export type AuthState = {
  status: AuthStatus
  isHydrated: boolean
  session: Session | null
  user: User | null
  context: UserContext | null
  error: string | null
}
