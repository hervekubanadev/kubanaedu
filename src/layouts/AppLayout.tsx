import { Outlet } from 'react-router-dom'
import { TopHeader } from '../components/layout/TopHeader'
import { BottomNav } from '../components/navigation/BottomNav'
import { SidebarNav } from '../components/navigation/SidebarNav'
import { uiConstants } from '../shared/config/design-system'

export function AppLayout() {
  return (
    <div className={`min-h-screen ${uiConstants.layout.shellBackground}`}>
      <div className={`pointer-events-none fixed inset-0 ${uiConstants.layout.shellLighting}`} />
      <div className="relative mx-auto flex w-full max-w-[1600px]">
        <SidebarNav />

        <div className="flex min-h-screen w-full flex-col overflow-x-clip">
          <TopHeader />
          <Outlet />
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
