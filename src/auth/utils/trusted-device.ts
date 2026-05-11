import type { AuthRole } from '../types'

const STORAGE_KEY = 'kubanaedu.auth.trustedDevice'

type TrustedDeviceRecord = {
  role: AuthRole
  phone: string
  trustedAt: string
  pinEnabled: boolean
  deviceName: string
}

type TrustedDeviceStore = {
  records: TrustedDeviceRecord[]
}

function readStore(): TrustedDeviceStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return { records: [] }
    }

    const parsed = JSON.parse(raw) as TrustedDeviceStore
    return Array.isArray(parsed.records) ? parsed : { records: [] }
  } catch {
    return { records: [] }
  }
}

function writeStore(store: TrustedDeviceStore) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function getTrustedDevice(role: AuthRole, phone: string): TrustedDeviceRecord | null {
  const store = readStore()
  return store.records.find((record) => record.role === role && record.phone === phone) ?? null
}

export function saveTrustedDevice(record: TrustedDeviceRecord) {
  const store = readStore()
  const records = store.records.filter((item) => !(item.role === record.role && item.phone === record.phone))
  records.push(record)
  writeStore({ records })
}
