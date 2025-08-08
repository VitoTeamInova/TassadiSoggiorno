export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      stays: {
        Row: {
          id: string
          entry_date: string
          first_name: string
          last_name: string
          num_guests: number
          num_minors: number
          num_nights: number
          daily_tax: number
          total_tax: number
          month: number
          pre_stay_notes: string
          post_stay_notes: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          entry_date: string
          first_name: string
          last_name: string
          num_guests: number
          num_minors?: number
          num_nights: number
          daily_tax: number
          total_tax: number
          month: number
          pre_stay_notes?: string
          post_stay_notes?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          entry_date?: string
          first_name?: string
          last_name?: string
          num_guests?: number
          num_minors?: number
          num_nights?: number
          daily_tax?: number
          total_tax?: number
          month?: number
          pre_stay_notes?: string
          post_stay_notes?: string
          created_at?: string
          updated_at?: string
        }
      }
      app_config: {
        Row: {
          id: string
          app_name: string
          year: number
          month: number
          default_daily_tax: number
          logo_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          app_name?: string
          year?: number
          month?: number
          default_daily_tax?: number
          logo_url?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          app_name?: string
          year?: number
          month?: number
          default_daily_tax?: number
          logo_url?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}