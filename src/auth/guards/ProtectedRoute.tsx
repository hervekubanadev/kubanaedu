import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AppSplash } from '../../components/branding/AppSplash'
import { routes } from '../../shared/config/routes'
import type { AppRole } from '../../types/auth'
import { useAuth } from '../../hooks/useAuth'

type ProtectedRouteProps = {
  allowedRoles?: readonly AppRole[]
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const location = useLocation()
  const { isHydrated, status, context } = useAuth()

  if (!isHydrated || status === 'loading') {
    return <AppSplash label="Loading secure workspace" />
  }

  if (status !== 'authenticated') {
    return <Navigate to={routes.authLogin} replace state={{ redirectTo: location.pathname }} />
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const role = context?.role
    if (!role || !allowedRoles.includes(role)) {
      return <Navigate to={routes.dashboard} replace />
    }
  }

  return <Outlet />
}
