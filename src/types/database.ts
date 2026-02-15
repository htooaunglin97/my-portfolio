export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          user_id?: string;
        };
      };
      projects: {
        Row: {
          content: string | null;
          created_at: string;
          description: string;
          github_url: string | null;
          id: string;
          live_url: string | null;
          slug: string;
          thumbnail_url: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          description: string;
          github_url?: string | null;
          id?: string;
          live_url?: string | null;
          slug: string;
          thumbnail_url?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          description?: string;
          github_url?: string | null;
          id?: string;
          live_url?: string | null;
          slug?: string;
          thumbnail_url?: string | null;
          title?: string;
          updated_at?: string;
        };
      };
      blog_posts: {
        Row: {
          content: string;
          cover_image_url: string | null;
          created_at: string;
          excerpt: string;
          id: string;
          slug: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          content: string;
          cover_image_url?: string | null;
          created_at?: string;
          excerpt: string;
          id?: string;
          slug: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          content?: string;
          cover_image_url?: string | null;
          created_at?: string;
          excerpt?: string;
          id?: string;
          slug?: string;
          title?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          message: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          message: string;
          name: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          message?: string;
          name?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

