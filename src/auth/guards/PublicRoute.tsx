import { Navigate, Outlet } from 'react-router-dom'
import { AppSplash } from '../../components/branding/AppSplash'
import { defaultAppRoute } from '../../shared/config/routes'
import { useAuth } from '../../hooks/useAuth'

export function PublicRoute() {
  const { isHydrated, status } = useAuth()

  if (!isHydrated || status === 'loading') {
    return <AppSplash label="Checking session" />
  }

  if (status === 'authenticated') {
    return <Navigate to={defaultAppRoute} replace />
  }

  return <Outlet />
}
