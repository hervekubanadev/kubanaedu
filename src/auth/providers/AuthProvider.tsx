import { useQueryClient } from '@tanstack/react-query'
import type { Session } from '@supabase/supabase-js'
import type { PropsWithChildren } from 'react'
import { useEffect, useRef } from 'react'
import { supabase } from '../../supabase/client'
import { userContextQueryOptions } from '../../services/auth/user-context-service'
import { useAuthStore } from '../store/auth-store'

export function AuthProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient()
  const lastSyncedTokenRef = useRef<string | null>(null)

  useEffect(() => {
    let isDisposed = false

    const syncSession = async (session: Session | null, mode: 'initial' | 'event') => {
      if (isDisposed) {
        return
      }

      const sessionToken = session?.access_token ?? null
      if (mode === 'event' && lastSyncedTokenRef.current === sessionToken) {
        return
      }

      useAuthStore.getState().beginHydration()

      if (!session) {
        lastSyncedTokenRef.current = null
        useAuthStore.getState().setUnauthenticated()
        return
      }

      try {
        const context = await queryClient.fetchQuery(userContextQueryOptions(session.user))

        if (isDisposed) {
          return
        }

        lastSyncedTokenRef.current = sessionToken
        useAuthStore.getState().setAuthenticated({
          session,
          user: session.user,
          context,
        })
      } catch (error) {
        if (isDisposed) {
          return
        }

        const message = error instanceof Error ? error.message : 'Unable to hydrate authentication state'
        useAuthStore.getState().setError(message)
        useAuthStore.getState().setUnauthenticated()
      }
    }

    void supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (error) {
          throw error
        }

        return syncSession(data.session, 'initial')
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unable to initialize authentication'
        useAuthStore.getState().setError(message)
        useAuthStore.getState().setUnauthenticated()
      })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      void syncSession(session, 'event')
    })

    return () => {
      isDisposed = true
      subscription.subscription.unsubscribe()
    }
  }, [queryClient])

  return children
}
