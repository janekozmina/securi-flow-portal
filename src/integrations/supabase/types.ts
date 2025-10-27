export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          account_code: string
          account_name: string
          account_type: string
          agent_code: string | null
          agent_name: string | null
          agent_type: string | null
          closing_date: string | null
          created_at: string
          id: string
          management_participant: string | null
          owner_code: string
          owner_name: string
          registration_date: string | null
          updated_at: string
        }
        Insert: {
          account_code: string
          account_name: string
          account_type: string
          agent_code?: string | null
          agent_name?: string | null
          agent_type?: string | null
          closing_date?: string | null
          created_at?: string
          id?: string
          management_participant?: string | null
          owner_code: string
          owner_name: string
          registration_date?: string | null
          updated_at?: string
        }
        Update: {
          account_code?: string
          account_name?: string
          account_type?: string
          agent_code?: string | null
          agent_name?: string | null
          agent_type?: string | null
          closing_date?: string | null
          created_at?: string
          id?: string
          management_participant?: string | null
          owner_code?: string
          owner_name?: string
          registration_date?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      auctions: {
        Row: {
          close_date: string
          code: string
          created_at: string
          flex: string
          id: string
          instrument: string
          instrument_code: string
          recommended_price: number | null
          reference: string
          start_date: string
          status: string
          status_name: string
          updated_at: string
        }
        Insert: {
          close_date: string
          code: string
          created_at?: string
          flex?: string
          id?: string
          instrument: string
          instrument_code?: string
          recommended_price?: number | null
          reference: string
          start_date: string
          status?: string
          status_name?: string
          updated_at?: string
        }
        Update: {
          close_date?: string
          code?: string
          created_at?: string
          flex?: string
          id?: string
          instrument?: string
          instrument_code?: string
          recommended_price?: number | null
          reference?: string
          start_date?: string
          status?: string
          status_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      balances: {
        Row: {
          account_code: string
          available_units: number
          blocked_units: number
          created_at: string
          delivery_pending_units: number
          id: string
          instrument_code: string
          pledged_units: number
          restricted_units: number
          total_units: number
          updated_at: string
        }
        Insert: {
          account_code: string
          available_units?: number
          blocked_units?: number
          created_at?: string
          delivery_pending_units?: number
          id?: string
          instrument_code: string
          pledged_units?: number
          restricted_units?: number
          total_units?: number
          updated_at?: string
        }
        Update: {
          account_code?: string
          available_units?: number
          blocked_units?: number
          created_at?: string
          delivery_pending_units?: number
          id?: string
          instrument_code?: string
          pledged_units?: number
          restricted_units?: number
          total_units?: number
          updated_at?: string
        }
        Relationships: []
      }
      bids: {
        Row: {
          auction_id: string
          bid_price: number
          created_at: string
          id: string
          quantity: number
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          auction_id: string
          bid_price: number
          created_at?: string
          id?: string
          quantity: number
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          auction_id?: string
          bid_price?: number
          created_at?: string
          id?: string
          quantity?: number
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bids_auction_id_fkey"
            columns: ["auction_id"]
            isOneToOne: false
            referencedRelation: "auctions"
            referencedColumns: ["id"]
          },
        ]
      }
      kyc_documents: {
        Row: {
          document_type: string
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          uploaded_at: string | null
          user_id: string
          verification_notes: string | null
          verification_status: string | null
        }
        Insert: {
          document_type: string
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          uploaded_at?: string | null
          user_id: string
          verification_notes?: string | null
          verification_status?: string | null
        }
        Update: {
          document_type?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          uploaded_at?: string | null
          user_id?: string
          verification_notes?: string | null
          verification_status?: string | null
        }
        Relationships: []
      }
      onboarding_status: {
        Row: {
          account_type: string | null
          created_at: string | null
          current_step: number | null
          id: string
          is_completed: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_type?: string | null
          created_at?: string | null
          current_step?: number | null
          id?: string
          is_completed?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_type?: string | null
          created_at?: string | null
          current_step?: number | null
          id?: string
          is_completed?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          beneficiary_account: string | null
          beneficiary_name: string | null
          bic_of_investors_bank: string | null
          branch_code: string | null
          branch_name: string | null
          citizenship: string | null
          city: string | null
          country_of_residence: string | null
          created_at: string | null
          date_of_birth: string | null
          dividend_payment_option: string | null
          email: string | null
          employer: string | null
          first_name: string | null
          full_name: string | null
          gender: string | null
          gov_id_number: string | null
          id: string
          id_document_type: string | null
          institution_type: string | null
          investor_code: string | null
          is_foreign: boolean | null
          is_legal: boolean | null
          is_underage: boolean | null
          kin_address: string | null
          kin_email: string | null
          kin_full_name: string | null
          kin_phone: string | null
          kin_relationship: string | null
          last_name: string | null
          middle_name: string | null
          name_of_investors_bank: string | null
          occupation: string | null
          phone: string | null
          postal_address: string | null
          tax_number: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          beneficiary_account?: string | null
          beneficiary_name?: string | null
          bic_of_investors_bank?: string | null
          branch_code?: string | null
          branch_name?: string | null
          citizenship?: string | null
          city?: string | null
          country_of_residence?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          dividend_payment_option?: string | null
          email?: string | null
          employer?: string | null
          first_name?: string | null
          full_name?: string | null
          gender?: string | null
          gov_id_number?: string | null
          id: string
          id_document_type?: string | null
          institution_type?: string | null
          investor_code?: string | null
          is_foreign?: boolean | null
          is_legal?: boolean | null
          is_underage?: boolean | null
          kin_address?: string | null
          kin_email?: string | null
          kin_full_name?: string | null
          kin_phone?: string | null
          kin_relationship?: string | null
          last_name?: string | null
          middle_name?: string | null
          name_of_investors_bank?: string | null
          occupation?: string | null
          phone?: string | null
          postal_address?: string | null
          tax_number?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          beneficiary_account?: string | null
          beneficiary_name?: string | null
          bic_of_investors_bank?: string | null
          branch_code?: string | null
          branch_name?: string | null
          citizenship?: string | null
          city?: string | null
          country_of_residence?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          dividend_payment_option?: string | null
          email?: string | null
          employer?: string | null
          first_name?: string | null
          full_name?: string | null
          gender?: string | null
          gov_id_number?: string | null
          id?: string
          id_document_type?: string | null
          institution_type?: string | null
          investor_code?: string | null
          is_foreign?: boolean | null
          is_legal?: boolean | null
          is_underage?: boolean | null
          kin_address?: string | null
          kin_email?: string | null
          kin_full_name?: string | null
          kin_phone?: string | null
          kin_relationship?: string | null
          last_name?: string | null
          middle_name?: string | null
          name_of_investors_bank?: string | null
          occupation?: string | null
          phone?: string | null
          postal_address?: string | null
          tax_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      securities: {
        Row: {
          created_at: string
          currency: string
          face_value: number | null
          id: string
          instrument_code: string
          instrument_name: string
          isin: string | null
          issue_date: string | null
          issuer: string | null
          maturity_date: string | null
          payment_frequency: string | null
          rate: number | null
          rate_type: string | null
          term: string | null
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string
          face_value?: number | null
          id?: string
          instrument_code: string
          instrument_name: string
          isin?: string | null
          issue_date?: string | null
          issuer?: string | null
          maturity_date?: string | null
          payment_frequency?: string | null
          rate?: number | null
          rate_type?: string | null
          term?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string
          face_value?: number | null
          id?: string
          instrument_code?: string
          instrument_name?: string
          isin?: string | null
          issue_date?: string | null
          issuer?: string | null
          maturity_date?: string | null
          payment_frequency?: string | null
          rate?: number | null
          rate_type?: string | null
          term?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      trades: {
        Row: {
          auction_id: string
          created_at: string
          id: string
          quantity: number
          settlement_date: string | null
          status: string
          trade_date: string
          trade_price: number
          updated_at: string
          user_id: string
        }
        Insert: {
          auction_id: string
          created_at?: string
          id?: string
          quantity: number
          settlement_date?: string | null
          status?: string
          trade_date?: string
          trade_price: number
          updated_at?: string
          user_id: string
        }
        Update: {
          auction_id?: string
          created_at?: string
          id?: string
          quantity?: number
          settlement_date?: string | null
          status?: string
          trade_date?: string
          trade_price?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trades_auction_id_fkey"
            columns: ["auction_id"]
            isOneToOne: false
            referencedRelation: "auctions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_live_auction_data: { Args: never; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
