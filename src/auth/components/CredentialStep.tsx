import type { FormEvent } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

type CredentialStepProps = {
  schoolCode: string
  email: string
  password: string
  onSchoolCodeChange: (value: string) => void
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: () => Promise<void>
  pending: boolean
  error: string | null
}

export function CredentialStep(props: CredentialStepProps) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await props.onSubmit()
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="School code"
        aria-label="School code"
        value={props.schoolCode}
        onChange={(event) => props.onSchoolCodeChange(event.target.value)}
        required
      />
      <Input
        type="email"
        autoComplete="email"
        placeholder="School email"
        aria-label="School email"
        value={props.email}
        onChange={(event) => props.onEmailChange(event.target.value)}
        required
      />
      <Input
        type="password"
        autoComplete="current-password"
        placeholder="Password"
        aria-label="Password"
        value={props.password}
        onChange={(event) => props.onPasswordChange(event.target.value)}
        required
      />

      {props.error ? <p className="text-sm text-red-600">{props.error}</p> : null}

      <Button type="submit" variant="primary" className="h-11 w-full" disabled={props.pending}>
        {props.pending ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  )
}
