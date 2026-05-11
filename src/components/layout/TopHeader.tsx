import { Bell, Search } from 'lucide-react'
import { uiConstants } from '../../shared/config/design-system'
import { Button } from '../ui/Button'
import { BrandMark } from '../branding/BrandMark'

export function TopHeader() {
  return (
    <header className={uiConstants.navigation.header}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
        <div className="lg:hidden">
          <BrandMark size="sm" />
        </div>

        <div className="hidden lg:block">
          <p className="text-sm font-medium text-slate-500">School management</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="icon" aria-label="Search">
            <Search className="size-4.5" />
          </Button>
          <Button variant="icon" aria-label="Notifications">
            <Bell className="size-4.5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
