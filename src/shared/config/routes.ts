export const routes = {
  dashboard: '/dashboard',
  students: '/students',
  teachers: '/teachers',
  attendance: '/attendance',
  marks: '/marks',
  parents: '/parents',
  settings: '/settings',
  authLogin: '/auth/login',
} as const

export type AppRoutePath = (typeof routes)[keyof typeof routes]

export const primaryNavigationRoutes = [
  routes.dashboard,
  routes.students,
  routes.teachers,
  routes.attendance,
  routes.marks,
  routes.parents,
  routes.settings,
] as const

export const publicRoutes = [routes.authLogin] as const
export const protectedRoutes = primaryNavigationRoutes

export type PrimaryNavigationRoute = (typeof primaryNavigationRoutes)[number]

export const defaultAppRoute: PrimaryNavigationRoute = routes.dashboard
