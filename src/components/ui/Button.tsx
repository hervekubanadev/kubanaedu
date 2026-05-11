import type { ButtonHTMLAttributes } from 'react'
import { uiConstants, type ButtonVariant } from '../../shared/config/design-system'
import { cn } from '../../shared/lib/cn'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary', className, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        uiConstants.button.base,
        uiConstants.button.variants[variant],
        uiConstants.motion.interactive,
        uiConstants.interaction.focusRing,
        uiConstants.interaction.pressable,
        className,
      )}
      {...props}
    />
  )
}
