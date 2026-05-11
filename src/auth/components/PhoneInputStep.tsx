import type { FormEvent } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

type PhoneInputStepProps = {
  phone: string
  onPhoneChange: (value: string) => void
  onSubmit: () => Promise<void>
  pending: boolean
  error: string | null
  trustedHint?: string | null
}

export function PhoneInputStep({ phone, onPhoneChange, onSubmit, pending, error, trustedHint }: PhoneInputStepProps) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await onSubmit()
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <Input
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="+2348012345678"
        aria-label="Phone number"
        value={phone}
        onChange={(event) => onPhoneChange(event.target.value)}
        required
      />

      {trustedHint ? <p className="text-xs text-slate-500">{trustedHint}</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <Button type="submit" variant="primary" className="h-11 w-full" disabled={pending}>
        {pending ? 'Sending code...' : 'Send verification code'}
      </Button>
    </form>
  )
}
