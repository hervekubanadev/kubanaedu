import type { PropsWithChildren } from 'react'
import { uiConstants } from '../../shared/config/design-system'
import { cn } from '../../shared/lib/cn'

type CardProps = PropsWithChildren<{
  className?: string
  interactive?: boolean
}>

export function Card({ className, interactive = false, children }: CardProps) {
  return (
    <section
      tabIndex={interactive ? 0 : undefined}
      className={cn(
        uiConstants.surface.card,
        uiConstants.motion.smooth,
        interactive && uiConstants.interaction.cardInteractive,
        interactive && uiConstants.interaction.focusRing,
        className,
      )}
    >
      {children}
    </section>
  )
}
