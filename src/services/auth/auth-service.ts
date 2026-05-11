import type { Session } from '@supabase/supabase-js'
import { supabase } from '../../supabase/client'

type GuardianSetPinPayload = {
  phoneE164: string
  pin: string
}

type GuardianPinSignInPayload = {
  phoneE164: string
  pin: string
  trustedDeviceLabel?: string
}

export const authService = {
  async signInWithPassword(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      throw error
    }

    return data
  },

  async requestPhoneOtp(phone: string, shouldCreateUser: boolean) {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
      options: {
        shouldCreateUser,
      },
    })

    if (error) {
      throw error
    }

    return data
  },

  async verifyPhoneOtp(phone: string, token: string) {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    })

    if (error) {
      throw error
    }

    return data
  },

  async setGuardianPin(payload: GuardianSetPinPayload) {
    const { data, error } = await supabase.rpc('guardian_set_pin', {
      p_phone_e164: payload.phoneE164,
      p_pin: payload.pin,
    })

    if (error) {
      throw error
    }

    return data
  },

  async signInGuardianWithPin(payload: GuardianPinSignInPayload) {
    const { data, error } = await supabase.rpc('guardian_pin_sign_in', {
      p_phone_e164: payload.phoneE164,
      p_pin: payload.pin,
      p_device_label: payload.trustedDeviceLabel ?? null,
    })

    if (error) {
      throw error
    }

    return data
  },

  async updatePassword(newPassword: string) {
    const { data, error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      throw error
    }

    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
  },

  async getSession(): Promise<Session | null> {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      throw error
    }

    return data.session
  },
}
