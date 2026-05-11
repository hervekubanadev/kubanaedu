import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { routes, defaultAppRoute } from '../shared/config/routes'
import { AppLayout } from '../layouts/AppLayout'

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
      <Route path={routes.authLogin} element={<LoginPage />} />

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

      <Route path="*" element={<Navigate to={defaultAppRoute} replace />} />
    </Routes>
  )
}
