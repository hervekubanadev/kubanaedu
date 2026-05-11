import { uiConstants } from '../../shared/config/design-system'
import { cn } from '../../shared/lib/cn'

type BrandMarkProps = {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

const sizeStyles: Record<NonNullable<BrandMarkProps['size']>, { wrap: string; image: string }> = {
  sm: {
    wrap: 'h-10 w-10 rounded-xl',
    image: 'h-7 w-7',
  },
  md: {
    wrap: 'h-12 w-12 rounded-2xl',
    image: 'h-9 w-9',
  },
  lg: {
    wrap: 'h-16 w-16 rounded-2xl',
    image: 'h-12 w-12',
  },
}

export function BrandMark({ size = 'md', showText = true, className }: BrandMarkProps) {
  const styles = sizeStyles[size]

  return (
    <div className={cn('inline-flex items-center gap-3', className)}>
      <div
        className={cn(
          'relative inline-flex items-center justify-center border border-blue-100/80 bg-gradient-to-br from-white via-blue-50/90 to-blue-100/50',
          uiConstants.surface.glassPanel,
          uiConstants.motion.interactive,
          uiConstants.interaction.glassSurface,
          styles.wrap,
        )}
      >
        <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_30%_24%,rgba(191,219,254,0.5),transparent_62%)]" />
        <img src="/brand/kubanaedu-icon.png" alt="KubanaEdu" className={cn('relative object-contain', styles.image)} />
      </div>

      {showText ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">KubanaEdu</p>
          <p className="text-sm font-semibold text-slate-900">School OS</p>
        </div>
      ) : null}
    </div>
  )
}
