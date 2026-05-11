export type AuthRole = 'director' | 'teacher' | 'student' | 'parent'

export type AuthMethod = 'school-credentials' | 'phone-pin' | 'phone-otp'

export type AuthStepId =
  | 'role'
  | 'method'
  | 'phone'
  | 'otp'
  | 'credentials'
  | 'password-setup'
  | 'pin-setup'
  | 'pin-entry'
  | 'trusted-device'

export type AuthStep = {
  id: AuthStepId
  label: string
}

export type AuthFlowState = {
  role: AuthRole | null
  method: AuthMethod | null
  phone: string
  otp: string
  email: string
  password: string
  passwordConfirm: string
  schoolCode: string
  pin: string
  pinConfirm: string
  rememberDevice: boolean
  trustedDeviceName: string
}
