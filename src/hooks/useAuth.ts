import { useShallow } from 'zustand/react/shallow'
import { useAuthStore } from '../auth/store/auth-store'

export function useAuth() {
  return useAuthStore(
    useShallow((state) => ({
      status: state.status,
      isHydrated: state.isHydrated,
      session: state.session,
      user: state.user,
      context: state.context,
      error: state.error,
    })),
  )
}
