import type { FormEvent } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

type TrustedDevicePromptProps = {
  rememberDevice: boolean
  deviceName: string
  onRememberChange: (value: boolean) => void
  onDeviceNameChange: (value: string) => void
  onSubmit: () => void
}

export function TrustedDevicePrompt({ rememberDevice, deviceName, onRememberChange, onDeviceNameChange, onSubmit }: TrustedDevicePromptProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <label className="flex items-center gap-2 rounded-xl border border-blue-100/80 bg-white/70 px-3 py-2 text-sm text-slate-700">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-blue-200"
          checked={rememberDevice}
          onChange={(event) => onRememberChange(event.target.checked)}
        />
        Remember this device for faster sign-in
      </label>

      {rememberDevice ? (
        <Input
          type="text"
          placeholder="Device label (e.g. My iPhone)"
          value={deviceName}
          onChange={(event) => onDeviceNameChange(event.target.value)}
          required
        />
      ) : null}

      <Button type="submit" variant="primary" className="h-11 w-full">
        Continue to workspace
      </Button>
    </form>
  )
}
