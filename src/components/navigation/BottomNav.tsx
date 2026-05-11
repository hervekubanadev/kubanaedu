import { uiConstants } from '../../shared/config/design-system'
import { BrandMark } from '../branding/BrandMark'
import { NavLinkItem } from './NavLinkItem'
import { navigationItems } from './nav-items'

export function BottomNav() {
  return (
    <nav className={uiConstants.navigation.bottom}>
      <div className="px-2 pb-2">
        <BrandMark size="sm" />
      </div>
      <ul className="grid grid-cols-4 gap-1">
        {navigationItems.slice(0, 4).map((item) => (
          <li key={item.to}>
            <NavLinkItem item={item} compact />
          </li>
        ))}
      </ul>
    </nav>
  )
}
