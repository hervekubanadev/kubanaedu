import type { PropsWithChildren } from 'react'
import { uiConstants } from '../../shared/config/design-system'
import { BrandMark } from '../../components/branding/BrandMark'
import { cn } from '../../shared/lib/cn'

type AuthShellProps = PropsWithChildren<{
  title: string
  subtitle: string
  className?: string
}>

export function AuthShell({ title, subtitle, className, children }: AuthShellProps) {
  return (
    <main className={cn(`relative flex min-h-screen items-center justify-center overflow-hidden ${uiConstants.layout.shellBackground} px-4 py-8 sm:px-6`, className)}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_6%,rgba(191,219,254,0.32),transparent_35%),radial-gradient(circle_at_16%_86%,rgba(15,23,42,0.1),transparent_25%),radial-gradient(circle_at_84%_84%,rgba(233,213,255,0.12),transparent_30%)]" />

      <section className="relative w-full max-w-lg">
        <div className="mb-5 flex justify-center">
          <div className="rounded-[1.75rem] border border-blue-100/80 bg-white/65 p-3 shadow-[0_20px_55px_rgba(15,23,42,0.12)] backdrop-blur-xl">
            <BrandMark size="lg" showText={false} className="animate-[float_6s_ease-in-out_infinite]" />
          </div>
        </div>

        <div className={cn(`rounded-3xl p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)] sm:p-8 ${uiConstants.surface.glassPanel} ${uiConstants.motion.smooth} ${uiConstants.interaction.glassSurface}`)}>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-[1.75rem]">{title}</h1>
          <p className="mt-1 text-sm text-slate-500 sm:text-base">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </section>
    </main>
  )
}
