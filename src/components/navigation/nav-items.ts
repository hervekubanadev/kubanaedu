import type { LucideIcon } from 'lucide-react'
import {
  BookOpenCheck,
  ChartColumn,
  Cog,
  GraduationCap,
  House,
  NotebookPen,
  UserSquare2,
} from 'lucide-react'
import type { PrimaryNavigationRoute } from '../../shared/config/routes'
import { routes } from '../../shared/config/routes'

export type NavigationItem = {
  label: string
  to: PrimaryNavigationRoute
  icon: LucideIcon
}

export const navigationItems: NavigationItem[] = [
  { label: 'Dashboard', to: routes.dashboard, icon: House },
  { label: 'Students', to: routes.students, icon: GraduationCap },
  { label: 'Teachers', to: routes.teachers, icon: UserSquare2 },
  { label: 'Attendance', to: routes.attendance, icon: BookOpenCheck },
  { label: 'Marks', to: routes.marks, icon: NotebookPen },
  { label: 'Parents', to: routes.parents, icon: ChartColumn },
  { label: 'Settings', to: routes.settings, icon: Cog },
]
