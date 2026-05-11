import type { FormEvent } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

type OtpVerificationStepProps = {
  otp: string
  onOtpChange: (value: string) => void
  onSubmit: () => Promise<void>
  onResend: () => Promise<void>
  pending: boolean
  error: string | null
  phone: string
}

export function OtpVerificationStep({ otp, onOtpChange, onSubmit, onResend, pending, error, phone }: OtpVerificationStepProps) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await onSubmit()
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <p className="text-xs text-slate-500">Enter the 6-digit code sent to {phone}.</p>
      <Input
        type="text"
        inputMode="numeric"
        maxLength={6}
        placeholder="000000"
        aria-label="One-time verification code"
        value={otp}
        onChange={(event) => onOtpChange(event.target.value.replace(/\D/g, '').slice(0, 6))}
        required
      />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="secondary" className="h-11 w-full" onClick={() => void onResend()} disabled={pending}>
          Resend
        </Button>
        <Button type="submit" variant="primary" className="h-11 w-full" disabled={pending}>
          {pending ? 'Verifying...' : 'Verify'}
        </Button>
      </div>
    </form>
  )
}
