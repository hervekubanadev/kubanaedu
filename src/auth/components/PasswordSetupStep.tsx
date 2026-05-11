import type { FormEvent } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

type PasswordSetupStepProps = {
  password: string
  confirmPassword: string
  onPasswordChange: (value: string) => void
  onConfirmPasswordChange: (value: string) => void
  onSubmit: () => Promise<void>
  pending: boolean
  error: string | null
}

export function PasswordSetupStep(props: PasswordSetupStepProps) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await props.onSubmit()
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <Input
        type="password"
        autoComplete="new-password"
        placeholder="Create password"
        aria-label="Create password"
        value={props.password}
        onChange={(event) => props.onPasswordChange(event.target.value)}
        required
      />
      <Input
        type="password"
        autoComplete="new-password"
        placeholder="Confirm password"
        aria-label="Confirm password"
        value={props.confirmPassword}
        onChange={(event) => props.onConfirmPasswordChange(event.target.value)}
        required
      />
      {props.error ? <p className="text-sm text-red-600">{props.error}</p> : null}
      <Button type="submit" variant="primary" className="h-11 w-full" disabled={props.pending}>
        {props.pending ? 'Saving...' : 'Save password'}
      </Button>
    </form>
  )
}
