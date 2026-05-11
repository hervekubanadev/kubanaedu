import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PublicRoute } from '../auth/guards/PublicRoute'
import { ProtectedRoute } from '../auth/guards/ProtectedRoute'
import { AppLayout } from '../layouts/AppLayout'
import { defaultAppRoute, routes } from '../shared/config/routes'

const DashboardPage = lazy(() => import('../pages/DashboardPage').then((m) => ({ default: m.DashboardPage })))
const StudentsPage = lazy(() => import('../pages/StudentsPage').then((m) => ({ default: m.StudentsPage })))
const TeachersPage = lazy(() => import('../pages/TeachersPage').then((m) => ({ default: m.TeachersPage })))
const AttendancePage = lazy(() => import('../pages/AttendancePage').then((m) => ({ default: m.AttendancePage })))
const MarksPage = lazy(() => import('../pages/MarksPage').then((m) => ({ default: m.MarksPage })))
const ParentsPage = lazy(() => import('../pages/ParentsPage').then((m) => ({ default: m.ParentsPage })))
const SettingsPage = lazy(() => import('../pages/SettingsPage').then((m) => ({ default: m.SettingsPage })))
const LoginPage = lazy(() => import('../pages/auth/LoginPage').then((m) => ({ default: m.LoginPage })))

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={routes.authLogin} element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to={defaultAppRoute} replace />} />
          <Route path={routes.dashboard} element={<DashboardPage />} />
          <Route path={routes.students} element={<StudentsPage />} />
          <Route path={routes.teachers} element={<TeachersPage />} />
          <Route path={routes.attendance} element={<AttendancePage />} />
          <Route path={routes.marks} element={<MarksPage />} />
          <Route path={routes.parents} element={<ParentsPage />} />
          <Route path={routes.settings} element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={defaultAppRoute} replace />} />
    </Routes>
  )
}
