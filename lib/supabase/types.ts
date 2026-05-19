export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: "admin" | "client";
          business_name: string | null;
          business_type: string | null;
          location: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "created_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      leads: {
        Row: {
          id: string;
          name: string;
          phone: string;
          business_type: string | null;
          goal: string | null;
          budget: string | null;
          status: "new" | "contacted" | "warm" | "converted";
          tags: string[];
          source: "smart_form" | "whatsapp" | "phone" | "manual" | "ai_chat";
          client_id: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["leads"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
      };
      campaigns: {
        Row: {
          id: string;
          client_id: string;
          campaign_name: string;
          platform: "google" | "meta" | "seo" | "website" | null;
          monthly_budget: number | null;
          leads_generated: number;
          status: "active" | "paused" | "completed";
          start_date: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["campaigns"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["campaigns"]["Insert"]>;
      };
      monthly_reports: {
        Row: {
          id: string;
          client_id: string;
          month: string;
          organic_traffic: number;
          google_ads_leads: number;
          google_ads_spend: number;
          meta_ads_leads: number;
          meta_ads_spend: number;
          total_leads: number;
          calls: number;
          whatsapp_enquiries: number;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["monthly_reports"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["monthly_reports"]["Insert"]>;
      };
    };
  };
};

/* Convenience aliases */
export type Profile       = Database["public"]["Tables"]["profiles"]["Row"];
export type DbLead        = Database["public"]["Tables"]["leads"]["Row"];
export type Campaign      = Database["public"]["Tables"]["campaigns"]["Row"];
export type MonthlyReport = Database["public"]["Tables"]["monthly_reports"]["Row"];
