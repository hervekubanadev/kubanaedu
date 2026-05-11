import type { AuthStepId } from '../types'
import { cn } from '../../shared/lib/cn'

type AuthStepIndicatorProps = {
  steps: { id: AuthStepId; label: string }[]
  currentStep: AuthStepId
}

export function AuthStepIndicator({ steps, currentStep }: AuthStepIndicatorProps) {
  const currentIndex = steps.findIndex((step) => step.id === currentStep)

  return (
    <ol className="mb-5 flex items-center gap-2 overflow-x-auto pb-1" aria-label="Authentication progress">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep
        const isComplete = index < currentIndex

        return (
          <li key={step.id} className="flex items-center gap-2 whitespace-nowrap">
            <span
              className={cn(
                'inline-flex h-7 min-w-7 items-center justify-center rounded-full border px-2 text-xs font-semibold',
                isActive && 'border-blue-200 bg-blue-50 text-slate-900',
                isComplete && 'border-slate-900 bg-slate-900 text-white',
                !isActive && !isComplete && 'border-blue-100 bg-white/70 text-slate-500',
              )}
            >
              {index + 1}
            </span>
            <span className={cn('text-xs font-medium', isActive ? 'text-slate-800' : 'text-slate-500')}>{step.label}</span>
          </li>
        )
      })}
    </ol>
  )
}
