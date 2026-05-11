import { useMutation } from '@tanstack/react-query'
import { authService } from '../services/auth/auth-service'

export function useSignInMutation() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.signInWithPassword(email, password),
  })
}

export function useRequestPhoneOtpMutation() {
  return useMutation({
    mutationFn: ({ phone, shouldCreateUser }: { phone: string; shouldCreateUser: boolean }) =>
      authService.requestPhoneOtp(phone, shouldCreateUser),
  })
}

export function useVerifyPhoneOtpMutation() {
  return useMutation({
    mutationFn: ({ phone, token }: { phone: string; token: string }) => authService.verifyPhoneOtp(phone, token),
  })
}

export function useSetGuardianPinMutation() {
  return useMutation({
    mutationFn: ({ phoneE164, pin }: { phoneE164: string; pin: string }) => authService.setGuardianPin({ phoneE164, pin }),
  })
}

export function useGuardianPinSignInMutation() {
  return useMutation({
    mutationFn: ({ phoneE164, pin, trustedDeviceLabel }: { phoneE164: string; pin: string; trustedDeviceLabel?: string }) =>
      authService.signInGuardianWithPin({ phoneE164, pin, trustedDeviceLabel }),
  })
}

export function useSetPasswordMutation() {
  return useMutation({
    mutationFn: ({ password }: { password: string }) => authService.updatePassword(password),
  })
}

export function useSignOutMutation() {
  return useMutation({
    mutationFn: () => authService.signOut(),
  })
}
