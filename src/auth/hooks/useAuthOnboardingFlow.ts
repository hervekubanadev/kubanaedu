import type { AuthMethod, AuthRole, AuthStep, AuthStepId } from '../types'

export function getFlowSteps(role: AuthRole | null, method: AuthMethod | null): AuthStep[] {
  if (!role) {
    return [{ id: 'role', label: 'Role' }]
  }

  if (!method) {
    return [
      { id: 'role', label: 'Role' },
      { id: 'method', label: 'Method' },
    ]
  }

  if (method === 'school-credentials') {
    if (role === 'director' || role === 'teacher') {
      return [
        { id: 'role', label: 'Role' },
        { id: 'method', label: 'Method' },
        { id: 'credentials', label: 'Sign in' },
        { id: 'pin-setup', label: 'PIN' },
        { id: 'trusted-device', label: 'Device' },
      ]
    }

    return [
      { id: 'role', label: 'Role' },
      { id: 'method', label: 'Method' },
      { id: 'credentials', label: 'Access' },
    ]
  }

  if (method === 'phone-pin') {
    return [
      { id: 'role', label: 'Role' },
      { id: 'method', label: 'Method' },
      { id: 'phone', label: 'Phone' },
      { id: 'pin-entry', label: 'PIN' },
      { id: 'trusted-device', label: 'Device' },
    ]
  }

  return [
    { id: 'role', label: 'Role' },
    { id: 'method', label: 'Method' },
    { id: 'phone', label: 'Phone' },
    { id: 'otp', label: 'Verify' },
  ]
}

export function getStepSubtitle(step: AuthStepId, role: AuthRole | null): string {
  switch (step) {
    case 'role':
      return 'Select how you access KubanaEdu.'
    case 'method':
      return role === 'parent'
        ? 'Parent access uses school-managed phone and PIN sign-in.'
        : 'Staff access uses secure email sign-in and trusted devices.'
    case 'phone':
      return 'Enter the guardian phone number linked by your school.'
    case 'otp':
      return 'Confirm access using your secure code.'
    case 'credentials':
      return role === 'teacher'
        ? 'Use your invited school email and password.'
        : 'Sign in with your school workspace credentials.'
    case 'password-setup':
      return 'Create a password for fallback sign-in.'
    case 'pin-setup':
      return 'Set a secure quick PIN for trusted devices.'
    case 'pin-entry':
      return role === 'parent'
        ? 'Enter your guardian PIN to continue.'
        : 'Enter your quick PIN to continue.'
    case 'trusted-device':
      return 'Remember this device for faster and secure sign-in.'
    default:
      return 'Secure access to your school workspace.'
  }
}
