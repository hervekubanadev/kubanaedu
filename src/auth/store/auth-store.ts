import type { Session, User } from '@supabase/supabase-js'
import { create } from 'zustand'
import type { AuthState, UserContext } from '../../types/auth'

type AuthActions = {
  beginHydration: () => void
  setAuthenticated: (payload: { session: Session; user: User; context: UserContext | null }) => void
  setUnauthenticated: () => void
  setError: (message: string | null) => void
}

type AuthStore = AuthState & AuthActions

const initialState: AuthState = {
  status: 'loading',
  isHydrated: false,
  session: null,
  user: null,
  context: null,
  error: null,
}

function isSameContext(a: UserContext | null, b: UserContext | null): boolean {
  if (a === b) {
    return true
  }

  if (!a || !b) {
    return false
  }

  return a.userId === b.userId && a.schoolId === b.schoolId && a.role === b.role && a.email === b.email
}

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,

  beginHydration: () => {
    set((state) => {
      if (state.status === 'loading' && state.error === null) {
        return state
      }

      return { ...state, status: 'loading', error: null }
    })
  },

  setAuthenticated: ({ session, user, context }) => {
    set((state) => {
      const isSameSession = state.session?.access_token === session.access_token
      const isSameUser = state.user?.id === user.id
      const contextUnchanged = isSameContext(state.context, context)

      if (
        state.status === 'authenticated' &&
        state.isHydrated &&
        isSameSession &&
        isSameUser &&
        contextUnchanged &&
        state.error === null
      ) {
        return state
      }

      return {
        status: 'authenticated',
        isHydrated: true,
        session,
        user,
        context,
        error: null,
      }
    })
  },

  setUnauthenticated: () => {
    set((state) => {
      if (
        state.status === 'unauthenticated' &&
        state.isHydrated &&
        state.session === null &&
        state.user === null &&
        state.context === null &&
        state.error === null
      ) {
        return state
      }

      return {
        status: 'unauthenticated',
        isHydrated: true,
        session: null,
        user: null,
        context: null,
        error: null,
      }
    })
  },

  setError: (message) => {
    set((state) => {
      if (state.error === message) {
        return state
      }

      return { ...state, error: message }
    })
  },
}))
