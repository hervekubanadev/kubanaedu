import type { ComponentType } from 'react'
import { GraduationCap, ShieldCheck, UserRound, Users } from 'lucide-react'
import type { AuthRole } from '../types'

const roleOptions: { id: AuthRole; title: string; description: string; icon: ComponentType<{ className?: string }> }[] = [
  { id: 'director', title: 'Director / Owner', description: 'Manage school workspace and teams.', icon: ShieldCheck },
  { id: 'teacher', title: 'Teacher', description: 'Access classes, attendance, and learning tools.', icon: UserRound },
  { id: 'student', title: 'Student', description: 'Enter using school-issued access credentials.', icon: GraduationCap },
  { id: 'parent', title: 'Parent', description: 'Track child progress and school updates.', icon: Users },
]

type RoleSelectorProps = {
  value: AuthRole | null
  onSelect: (role: AuthRole) => void
}

export function RoleSelector({ value, onSelect }: RoleSelectorProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {roleOptions.map((option) => {
        const isSelected = value === option.id
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={`rounded-2xl border p-4 text-left transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${isSelected ? 'border-blue-200 bg-blue-50/70 shadow-[0_12px_30px_rgba(15,23,42,0.08)]' : 'border-blue-100/80 bg-white/70 hover:border-blue-200 hover:bg-white'}`}
          >
            <option.icon className="size-5 text-slate-700" />
            <p className="mt-3 text-sm font-semibold text-slate-900">{option.title}</p>
            <p className="mt-1 text-xs text-slate-500">{option.description}</p>
          </button>
        )
      })}
    </div>
  )
}
