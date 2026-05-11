export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          school_id: string | null
          role: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          school_id?: string | null
          role?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          school_id?: string | null
          role?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      guardians: {
        Row: {
          id: string
          school_id: string
          full_name: string
          phone_e164: string
          pin_hash: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          school_id: string
          full_name: string
          phone_e164: string
          pin_hash?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          school_id?: string
          full_name?: string
          phone_e164?: string
          pin_hash?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      guardian_students: {
        Row: {
          guardian_id: string
          student_id: string
          school_id: string
          relationship: string | null
          created_at: string | null
        }
        Insert: {
          guardian_id: string
          student_id: string
          school_id: string
          relationship?: string | null
          created_at?: string | null
        }
        Update: {
          guardian_id?: string
          student_id?: string
          school_id?: string
          relationship?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      guardian_set_pin: {
        Args: {
          p_phone_e164: string
          p_pin: string
        }
        Returns: Json
      }
      guardian_pin_sign_in: {
        Args: {
          p_phone_e164: string
          p_pin: string
          p_device_label?: string | null
        }
        Returns: Json
      }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
