import { useMemo } from 'react'
import { Button } from '../../components/ui/Button'
import { isValidPin } from '../utils/validation'

type PinPadStepProps = {
  pin: string
  onPinChange: (value: string) => void
  onSubmit: () => void
  title: string
  subtitle: string
  ctaLabel: string
}

const keypadValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

export function PinPadStep({ pin, onPinChange, onSubmit, title, subtitle, ctaLabel }: PinPadStepProps) {
  const maskedPin = useMemo(() => pin.padEnd(6, '•').slice(0, 6), [pin])

  const appendDigit = (digit: string) => {
    if (pin.length >= 6) {
      return
    }

    onPinChange(`${pin}${digit}`)
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>

      <div className="rounded-2xl border border-blue-100/80 bg-white/70 p-4 text-center">
        <p className="font-mono text-2xl tracking-[0.38em] text-slate-900">{maskedPin}</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {keypadValues.map((digit) => (
          <Button key={digit} type="button" variant="glass" className="h-12 w-full text-base" onClick={() => appendDigit(digit)}>
            {digit}
          </Button>
        ))}
        <Button type="button" variant="secondary" className="h-12 w-full" onClick={() => onPinChange(pin.slice(0, -1))}>
          Delete
        </Button>
        <Button type="button" variant="secondary" className="h-12 w-full" onClick={() => onPinChange('')}>
          Clear
        </Button>
      </div>

      <Button type="button" variant="primary" className="h-11 w-full" onClick={onSubmit} disabled={!isValidPin(pin)}>
        {ctaLabel}
      </Button>
    </div>
  )
}
