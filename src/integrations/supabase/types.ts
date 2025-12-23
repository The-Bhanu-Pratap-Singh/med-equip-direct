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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          billing_address: Json | null
          courier: string | null
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          discount_amount: number | null
          id: string
          invoice_number: string | null
          invoice_url: string | null
          items: Json
          notes: string | null
          order_number: string
          payment_intent_id: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          shipping_address: Json
          shipping_amount: number | null
          status: Database["public"]["Enums"]["order_status"] | null
          stripe_session_id: string | null
          subtotal: number
          tax_amount: number | null
          total_amount: number
          tracking_number: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          billing_address?: Json | null
          courier?: string | null
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          discount_amount?: number | null
          id?: string
          invoice_number?: string | null
          invoice_url?: string | null
          items: Json
          notes?: string | null
          order_number: string
          payment_intent_id?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          shipping_address: Json
          shipping_amount?: number | null
          status?: Database["public"]["Enums"]["order_status"] | null
          stripe_session_id?: string | null
          subtotal: number
          tax_amount?: number | null
          total_amount: number
          tracking_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          billing_address?: Json | null
          courier?: string | null
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          discount_amount?: number | null
          id?: string
          invoice_number?: string | null
          invoice_url?: string | null
          items?: Json
          notes?: string | null
          order_number?: string
          payment_intent_id?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          shipping_address?: Json
          shipping_amount?: number | null
          status?: Database["public"]["Enums"]["order_status"] | null
          stripe_session_id?: string | null
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
          tracking_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          bulk_min_quantity: number | null
          bulk_price: number | null
          category: string
          certifications: string[] | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          images: string[] | null
          in_stock: boolean | null
          is_consumable: boolean | null
          name: string
          price: number
          sku: string | null
          slug: string
          specifications: Json | null
          stock_quantity: number | null
          sub_category: string | null
          updated_at: string
          warranty: string | null
        }
        Insert: {
          bulk_min_quantity?: number | null
          bulk_price?: number | null
          category: string
          certifications?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          in_stock?: boolean | null
          is_consumable?: boolean | null
          name: string
          price?: number
          sku?: string | null
          slug: string
          specifications?: Json | null
          stock_quantity?: number | null
          sub_category?: string | null
          updated_at?: string
          warranty?: string | null
        }
        Update: {
          bulk_min_quantity?: number | null
          bulk_price?: number | null
          category?: string
          certifications?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          in_stock?: boolean | null
          is_consumable?: boolean | null
          name?: string
          price?: number
          sku?: string | null
          slug?: string
          specifications?: Json | null
          stock_quantity?: number | null
          sub_category?: string | null
          updated_at?: string
          warranty?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          city: string | null
          company_name: string | null
          created_at: string
          email: string
          full_name: string | null
          gst_number: string | null
          id: string
          is_hospital: boolean | null
          phone: string | null
          pincode: string | null
          state: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          company_name?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          gst_number?: string | null
          id?: string
          is_hospital?: boolean | null
          phone?: string | null
          pincode?: string | null
          state?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          city?: string | null
          company_name?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          gst_number?: string | null
          id?: string
          is_hospital?: boolean | null
          phone?: string | null
          pincode?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      quotations: {
        Row: {
          admin_notes: string | null
          company_name: string | null
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          gst_number: string | null
          id: string
          items: Json
          message: string | null
          quotation_number: string
          quoted_amount: number | null
          status: Database["public"]["Enums"]["quotation_status"] | null
          updated_at: string
          user_id: string | null
          valid_until: string | null
        }
        Insert: {
          admin_notes?: string | null
          company_name?: string | null
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          gst_number?: string | null
          id?: string
          items: Json
          message?: string | null
          quotation_number: string
          quoted_amount?: number | null
          status?: Database["public"]["Enums"]["quotation_status"] | null
          updated_at?: string
          user_id?: string | null
          valid_until?: string | null
        }
        Update: {
          admin_notes?: string | null
          company_name?: string | null
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          gst_number?: string | null
          id?: string
          items?: Json
          message?: string | null
          quotation_number?: string
          quoted_amount?: number | null
          status?: Database["public"]["Enums"]["quotation_status"] | null
          updated_at?: string
          user_id?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "customer"
      order_status:
        | "pending"
        | "confirmed"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
      payment_status: "pending" | "paid" | "failed" | "refunded"
      quotation_status:
        | "pending"
        | "reviewed"
        | "quoted"
        | "accepted"
        | "rejected"
        | "expired"
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
    Enums: {
      app_role: ["admin", "customer"],
      order_status: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      payment_status: ["pending", "paid", "failed", "refunded"],
      quotation_status: [
        "pending",
        "reviewed",
        "quoted",
        "accepted",
        "rejected",
        "expired",
      ],
    },
  },
} as const
