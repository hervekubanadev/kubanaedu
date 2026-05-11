import { uiConstants } from '../../shared/config/design-system'
import { BrandMark } from '../../components/branding/BrandMark'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export function LoginPage() {
  return (
    <main className={`relative flex min-h-screen items-center justify-center overflow-hidden ${uiConstants.layout.shellBackground} px-4 py-10 sm:px-6`}>
      <div className="pointer-events-none absolute -top-16 left-[-3rem] h-52 w-52 rounded-full bg-blue-200/28 blur-3xl" />
      <div className="pointer-events-none absolute bottom-6 right-[-2rem] h-48 w-48 rounded-full bg-blue-100/40 blur-3xl" />

      <section
        className={`relative w-full max-w-md rounded-3xl p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)] sm:p-8 ${uiConstants.surface.glassPanel} ${uiConstants.motion.smooth} ${uiConstants.interaction.glassSurface}`}
      >
        <BrandMark size="lg" />
        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">Sign in</h1>
        <p className="mt-1 text-sm text-slate-500">Access your school workspace securely.</p>

        <form className="mt-6 space-y-3" onSubmit={(event) => event.preventDefault()}>
          <Input type="email" placeholder="School email" aria-label="School email" />
          <Input type="password" placeholder="Password" aria-label="Password" />
          <Button type="submit" variant="primary" className="mt-1 h-11 w-full">
            Continue
          </Button>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button type="button" variant="secondary" className="h-10 w-full">
              SSO
            </Button>
            <Button type="button" variant="ghost" className="h-10 w-full">
              Need help?
            </Button>
          </div>
        </form>
      </section>
    </main>
  )
}
