import { uiConstants } from '../../shared/config/design-system'
import { BrandMark } from '../branding/BrandMark'
import { NavLinkItem } from './NavLinkItem'
import { navigationItems } from './nav-items'

export function SidebarNav() {
  return (
    <aside className={uiConstants.navigation.sidebar}>
      <div className="px-2">
        <BrandMark size="md" />
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1.5">
        {navigationItems.map((item) => (
          <NavLinkItem key={item.to} item={item} />
        ))}
      </nav>
    </aside>
  )
}
