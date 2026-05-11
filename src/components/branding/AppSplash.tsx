import { uiConstants } from '../../shared/config/design-system'
import { BrandMark } from './BrandMark'

type AppSplashProps = {
  label?: string
}

export function AppSplash({ label = 'Preparing your workspace' }: AppSplashProps) {
  return (
    <div className={`relative flex min-h-screen items-center justify-center overflow-hidden ${uiConstants.layout.shellBackground} px-6`}>
      <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-[-8rem] h-60 w-60 rounded-full bg-blue-100/30 blur-3xl" />

      <div
        className={`relative flex flex-col items-center gap-4 rounded-3xl px-8 py-10 ${uiConstants.surface.glassPanel} ${uiConstants.motion.smooth} ${uiConstants.interaction.glassSurface}`}
      >
        <BrandMark size="lg" showText={false} />
        <p className="text-lg font-semibold tracking-tight text-slate-900">KubanaEdu</p>
        <p className="text-sm text-slate-500">{label}</p>
        <div className="h-1.5 w-40 overflow-hidden rounded-full bg-blue-100">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500/80" />
        </div>
      </div>
    </div>
  )
}
