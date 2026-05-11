import type { AuthMethod, AuthRole } from '../types'

type AuthMethodSelectorProps = {
  role: AuthRole
  value: AuthMethod | null
  onSelect: (method: AuthMethod) => void
}

export function AuthMethodSelector({ role, value, onSelect }: AuthMethodSelectorProps) {
  const methods: { id: AuthMethod; title: string; description: string }[] =
    role === 'parent'
      ? [
          {
            id: 'phone-pin',
            title: 'Phone + PIN access',
            description: 'Use your school-linked guardian phone number and secure PIN.',
          },
        ]
      : [
          {
            id: 'school-credentials',
            title: 'School email credentials',
            description:
              role === 'teacher'
                ? 'Sign in with your invited staff email and password.'
                : 'Use your workspace email verification and password flow.',
          },
        ]

  return (
    <div className="space-y-2">
      {methods.map((method) => {
        const selected = value === method.id
        return (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelect(method.id)}
            className={`w-full rounded-2xl border p-4 text-left transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${selected ? 'border-blue-200 bg-blue-50/70 shadow-[0_12px_30px_rgba(15,23,42,0.08)]' : 'border-blue-100/80 bg-white/70 hover:border-blue-200 hover:bg-white'}`}
          >
            <p className="text-sm font-semibold text-slate-900">{method.title}</p>
            <p className="mt-1 text-xs text-slate-500">{method.description}</p>
          </button>
        )
      })}
    </div>
  )
}
