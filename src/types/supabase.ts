
import { Database } from "@/integrations/supabase/types";

// Profile types
export type Profile = {
  id: string;
  name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// Extend the User type with profile information
export type UserWithProfile = User & {
  profile: Profile | null;
}

// Export typed version of database
export type Tables = Database['public']['Tables'];
export type Enums = Database['public']['Enums'];

// Re-export types from our main types file
export * from '@/types';
