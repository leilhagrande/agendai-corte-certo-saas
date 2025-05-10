
import { Database } from "@/integrations/supabase/types";
import { User as AuthUser } from "@supabase/supabase-js";
import { UserRole } from "@/types";

// Profile types
export type Profile = {
  id: string;
  name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// Define our base User type
export type User = AuthUser & {
  role?: UserRole;
  name?: string;
  email?: string;
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
