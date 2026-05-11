import { uiConstants } from '../../shared/config/design-system'
import { cn } from '../../shared/lib/cn'
import { NavLink } from 'react-router-dom'
import type { NavigationItem } from './nav-items'

type NavLinkItemProps = {
  item: NavigationItem
  compact?: boolean
}

export function NavLinkItem({ item, compact = false }: NavLinkItemProps) {
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        cn(
          'group inline-flex items-center rounded-xl text-sm font-medium text-slate-600',
          uiConstants.motion.interactive,
          uiConstants.interaction.focusRing,
          uiConstants.interaction.navigationItem,
          uiConstants.interaction.pressable,
          compact ? 'w-full justify-center gap-2 px-2 py-2.5' : 'w-full gap-3 px-3 py-2.5',
          isActive &&
            'border-blue-100/90 bg-gradient-to-r from-white/95 to-blue-50/70 text-slate-950 shadow-[0_10px_28px_rgba(15,23,42,0.08)]',
        )
      }
    >
      <item.icon className={cn('shrink-0 transition-colors', compact ? 'size-5' : 'size-4.5')} />
      <span className={cn(compact && 'text-xs')}>{item.label}</span>
    </NavLink>
  )
}
