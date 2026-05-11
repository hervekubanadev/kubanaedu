import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthMethodSelector } from '../../auth/components/AuthMethodSelector'
import { AuthShell } from '../../auth/components/AuthShell'
import { AuthStepIndicator } from '../../auth/components/AuthStepIndicator'
import { CredentialStep } from '../../auth/components/CredentialStep'
import { PasswordSetupStep } from '../../auth/components/PasswordSetupStep'
import { PhoneInputStep } from '../../auth/components/PhoneInputStep'
import { PinPadStep } from '../../auth/components/PinPadStep'
import { RoleSelector } from '../../auth/components/RoleSelector'
import { TrustedDevicePrompt } from '../../auth/components/TrustedDevicePrompt'
import { getFlowSteps, getStepSubtitle } from '../../auth/hooks/useAuthOnboardingFlow'
import type { AuthFlowState, AuthMethod, AuthRole, AuthStepId } from '../../auth/types'
import { getTrustedDevice, saveTrustedDevice } from '../../auth/utils/trusted-device'
import { isStrongPassword, isValidPhoneNumber, isValidPin, normalizePhoneNumberToE164 } from '../../auth/utils/validation'
import { Button } from '../../components/ui/Button'
import {
  useGuardianPinSignInMutation,
  useSetGuardianPinMutation,
  useSetPasswordMutation,
  useSignInMutation,
} from '../../hooks/useAuthActions'
import { defaultAppRoute } from '../../shared/config/routes'

type LocationState = {
  redirectTo?: string
}

const initialFlowState: AuthFlowState = {
  role: null,
  method: null,
  phone: '',
  otp: '',
  email: '',
  password: '',
  passwordConfirm: '',
  schoolCode: '',
  pin: '',
  pinConfirm: '',
  rememberDevice: true,
  trustedDeviceName: '',
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = (location.state as LocationState | null)?.redirectTo ?? defaultAppRoute

  const [flow, setFlow] = useState<AuthFlowState>(initialFlowState)
  const [currentStep, setCurrentStep] = useState<AuthStepId>('role')
  const [localError, setLocalError] = useState<string | null>(null)

  const signInMutation = useSignInMutation()
  const setPasswordMutation = useSetPasswordMutation()
  const guardianSetPinMutation = useSetGuardianPinMutation()
  const guardianPinSignInMutation = useGuardianPinSignInMutation()

  const steps = useMemo(() => getFlowSteps(flow.role, flow.method), [flow.method, flow.role])
  const subtitle = getStepSubtitle(currentStep, flow.role)

  const normalizedPhone = normalizePhoneNumberToE164(flow.phone, { defaultCountry: 'RW' })
  const trustedDevice = flow.role && normalizedPhone ? getTrustedDevice(flow.role, normalizedPhone) : null

  const applyStep = (step: AuthStepId) => {
    setLocalError(null)
    setCurrentStep(step)
  }

  const handleRoleSelect = (role: AuthRole) => {
    const defaultMethod: AuthMethod = role === 'parent' ? 'phone-pin' : 'school-credentials'
    setFlow((prev) => ({ ...prev, role, method: defaultMethod }))
  }

  const handleMethodSelect = (method: AuthMethod) => {
    setFlow((prev) => ({ ...prev, method }))
  }

  const continueFromRole = () => {
    if (!flow.role) {
      setLocalError('Select an account role to continue.')
      return
    }

    applyStep('method')
  }

  const continueFromMethod = () => {
    if (!flow.role || !flow.method) {
      setLocalError('Choose an access method to continue.')
      return
    }

    if (flow.method === 'phone-pin') {
      applyStep('phone')
      return
    }

    applyStep('credentials')
  }

  const handleParentPhoneContinue = async () => {
    if (flow.role !== 'parent') {
      setLocalError('Phone and PIN access is reserved for parent accounts.')
      return
    }

    if (!isValidPhoneNumber(flow.phone) || !normalizedPhone) {
      setLocalError('Enter a valid Rwanda phone number (e.g. +25079XXXXXXX or 079XXXXXXX).')
      return
    }

    if (trustedDevice?.pinEnabled) {
      applyStep('pin-entry')
      return
    }

    applyStep('pin-setup')
  }

  const handleCredentialSignIn = async () => {
    if (!flow.email.trim()) {
      setLocalError('Enter your school email address.')
      return
    }

    await signInMutation.mutateAsync({ email: flow.email.trim(), password: flow.password })

    if (flow.role === 'teacher' || flow.role === 'director') {
      applyStep('pin-setup')
      return
    }

    navigate(redirectTo, { replace: true })
  }

  const handlePasswordSetup = async () => {
    if (!isStrongPassword(flow.password)) {
      setLocalError('Use at least 8 characters with letters and numbers.')
      return
    }

    if (flow.password !== flow.passwordConfirm) {
      setLocalError('Passwords do not match.')
      return
    }

    await setPasswordMutation.mutateAsync({ password: flow.password })
    applyStep('pin-setup')
  }

  const handlePinSetupContinue = async () => {
    if (!isValidPin(flow.pin)) {
      setLocalError('PIN must be 4 to 6 digits.')
      return
    }

    if (!isValidPin(flow.pinConfirm) || flow.pin !== flow.pinConfirm) {
      setLocalError('PIN confirmation does not match.')
      return
    }

    if (flow.role === 'parent') {
      if (!normalizedPhone) {
        setLocalError('A valid guardian phone number is required to secure PIN setup.')
        return
      }

      await guardianSetPinMutation.mutateAsync({
        phoneE164: normalizedPhone,
        pin: flow.pin,
      })
    }

    applyStep('trusted-device')
  }

  const handlePinEntryContinue = async () => {
    if (!isValidPin(flow.pin)) {
      setLocalError('Enter your 4 to 6 digit PIN.')
      return
    }

    if (flow.role === 'parent') {
      if (!normalizedPhone) {
        setLocalError('A valid guardian phone number is required.')
        return
      }

      await guardianPinSignInMutation.mutateAsync({
        phoneE164: normalizedPhone,
        pin: flow.pin,
        trustedDeviceLabel: flow.trustedDeviceName || undefined,
      })
    }

    applyStep('trusted-device')
  }

  const completeTrustedDevice = () => {
    if (!flow.role) {
      setLocalError('Unable to complete device setup. Please restart sign-in.')
      return
    }

    if (flow.rememberDevice && normalizedPhone) {
      saveTrustedDevice({
        role: flow.role,
        phone: normalizedPhone,
        trustedAt: new Date().toISOString(),
        pinEnabled: isValidPin(flow.pin),
        deviceName: flow.trustedDeviceName || 'My Device',
      })
    }

    navigate(redirectTo, { replace: true })
  }

  const mutationError =
    signInMutation.error?.message ??
    setPasswordMutation.error?.message ??
    guardianSetPinMutation.error?.message ??
    guardianPinSignInMutation.error?.message

  return (
    <AuthShell title="Welcome to KubanaEdu" subtitle={subtitle}>
      <AuthStepIndicator steps={steps} currentStep={currentStep} />

      {currentStep === 'role' ? (
        <div className="space-y-4">
          <RoleSelector value={flow.role} onSelect={handleRoleSelect} />
          <Button type="button" variant="primary" className="h-11 w-full" onClick={continueFromRole} disabled={!flow.role}>
            Continue
          </Button>
        </div>
      ) : null}

      {currentStep === 'method' && flow.role ? (
        <div className="space-y-4">
          <AuthMethodSelector role={flow.role} value={flow.method} onSelect={handleMethodSelect} />
          <Button type="button" variant="primary" className="h-11 w-full" onClick={continueFromMethod} disabled={!flow.method}>
            Continue
          </Button>
        </div>
      ) : null}

      {currentStep === 'phone' ? (
        <PhoneInputStep
          phone={flow.phone}
          onPhoneChange={(phone) => setFlow((prev) => ({ ...prev, phone }))}
          onSubmit={handleParentPhoneContinue}
          pending={guardianPinSignInMutation.isPending || guardianSetPinMutation.isPending}
          error={localError ?? mutationError ?? null}
          trustedHint={trustedDevice ? `Trusted device found: ${trustedDevice.deviceName}. Continue with your PIN.` : null}
        />
      ) : null}

      {currentStep === 'credentials' ? (
        <CredentialStep
          schoolCode={flow.schoolCode}
          email={flow.email}
          password={flow.password}
          onSchoolCodeChange={(schoolCode) => setFlow((prev) => ({ ...prev, schoolCode }))}
          onEmailChange={(email) => setFlow((prev) => ({ ...prev, email }))}
          onPasswordChange={(password) => setFlow((prev) => ({ ...prev, password }))}
          onSubmit={handleCredentialSignIn}
          pending={signInMutation.isPending}
          error={localError ?? mutationError ?? null}
        />
      ) : null}

      {currentStep === 'password-setup' ? (
        <PasswordSetupStep
          password={flow.password}
          confirmPassword={flow.passwordConfirm}
          onPasswordChange={(password) => setFlow((prev) => ({ ...prev, password }))}
          onConfirmPasswordChange={(passwordConfirm) => setFlow((prev) => ({ ...prev, passwordConfirm }))}
          onSubmit={handlePasswordSetup}
          pending={setPasswordMutation.isPending}
          error={localError ?? mutationError ?? null}
        />
      ) : null}

      {currentStep === 'pin-setup' ? (
        <div className="space-y-4">
          <PinPadStep
            title={flow.role === 'parent' ? 'Create guardian PIN' : 'Create a quick PIN'}
            subtitle={
              flow.role === 'parent'
                ? 'Your PIN is secured server-side using a hashed storage strategy.'
                : 'This PIN enables faster trusted-device access with password fallback.'
            }
            ctaLabel="Continue"
            pin={flow.pin}
            onPinChange={(pin) => setFlow((prev) => ({ ...prev, pin }))}
            onSubmit={() => applyStep('pin-entry')}
          />

          <PinPadStep
            title="Confirm PIN"
            subtitle="Re-enter your PIN to continue."
            ctaLabel="Save PIN"
            pin={flow.pinConfirm}
            onPinChange={(pinConfirm) => setFlow((prev) => ({ ...prev, pinConfirm }))}
            onSubmit={() => void handlePinSetupContinue()}
          />

          {localError ? <p className="text-sm text-red-600">{localError}</p> : null}
        </div>
      ) : null}

      {currentStep === 'pin-entry' ? (
        <div className="space-y-4">
          <PinPadStep
            title={flow.role === 'parent' ? 'Guardian PIN' : 'Quick PIN'}
            subtitle={
              flow.role === 'parent'
                ? 'Enter the PIN configured by guardian account setup.'
                : 'Trusted device PIN path is prepared for biometric-enabled sessions.'
            }
            ctaLabel="Continue"
            pin={flow.pin}
            onPinChange={(pin) => setFlow((prev) => ({ ...prev, pin }))}
            onSubmit={() => void handlePinEntryContinue()}
          />
          <p className="text-xs text-slate-500">
            {flow.role === 'parent'
              ? 'If you forgot your PIN, contact your school administrator for reset support.'
              : 'If PIN fails, you can always use password sign-in again.'}
          </p>
          {localError ? <p className="text-sm text-red-600">{localError}</p> : null}
        </div>
      ) : null}

      {currentStep === 'trusted-device' ? (
        <TrustedDevicePrompt
          rememberDevice={flow.rememberDevice}
          deviceName={flow.trustedDeviceName}
          onRememberChange={(rememberDevice) => setFlow((prev) => ({ ...prev, rememberDevice }))}
          onDeviceNameChange={(trustedDeviceName) => setFlow((prev) => ({ ...prev, trustedDeviceName }))}
          onSubmit={completeTrustedDevice}
        />
      ) : null}

      {currentStep !== 'role' ? (
        <Button
          type="button"
          variant="ghost"
          className="mt-4 h-10 w-full"
          onClick={() => {
            const index = steps.findIndex((step) => step.id === currentStep)
            if (index > 0) {
              applyStep(steps[index - 1].id)
            }
          }}
        >
          Back
        </Button>
      ) : null}
    </AuthShell>
  )
}
