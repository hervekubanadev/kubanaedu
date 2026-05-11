import type { InputHTMLAttributes } from 'react'
import { uiConstants } from '../../shared/config/design-system'
import { cn } from '../../shared/lib/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className, type = 'text', ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        uiConstants.field.input,
        uiConstants.motion.interactive,
        uiConstants.interaction.focusRing,
        'hover:border-blue-200/80 focus:border-blue-200/90 focus:bg-white',
        className,
      )}
      {...props}
    />
  )
}
