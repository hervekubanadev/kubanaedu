type NormalizePhoneNumberOptions = {
  defaultCountry?: 'RW'
}

const RWANDA_E164_REGEX = /^\+2507[89]\d{7}$/
const RWANDA_LOCAL_REGEX = /^07[89]\d{7}$/
const E164_GENERIC_REGEX = /^\+[1-9]\d{7,14}$/

export function normalizePhoneNumber(value: string): string {
  const compact = value.trim().replace(/[()\s-]/g, '')
  if (!compact) {
    return ''
  }

  if (compact.startsWith('+')) {
    return `+${compact.slice(1).replace(/\+/g, '')}`
  }

  return compact
}

export function normalizePhoneNumberToE164(
  value: string,
  options: NormalizePhoneNumberOptions = { defaultCountry: 'RW' },
): string | null {
  const normalized = normalizePhoneNumber(value)
  if (!normalized) {
    return null
  }

  if (RWANDA_E164_REGEX.test(normalized)) {
    return normalized
  }

  if (options.defaultCountry === 'RW' && RWANDA_LOCAL_REGEX.test(normalized)) {
    return `+250${normalized.slice(1)}`
  }

  if (E164_GENERIC_REGEX.test(normalized)) {
    return normalized
  }

  return null
}

export function isValidPhoneNumber(value: string): boolean {
  return normalizePhoneNumberToE164(value) !== null
}

export function isValidOtp(value: string): boolean {
  return /^\d{6}$/.test(value)
}

export function isValidPin(value: string): boolean {
  return /^\d{4,6}$/.test(value)
}

export function isStrongPassword(value: string): boolean {
  return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value)
}
