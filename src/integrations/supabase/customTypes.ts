
import { Database } from "@/integrations/supabase/types";
import { User as AuthUser } from "@supabase/supabase-js";
import { UserRole } from "@/types";

// Tipos da tabela profiles
export type Profile = Database['public']['Tables']['profiles']['Row'];

// Tipo base de usuário autenticado
export type User = AuthUser & {
  role?: UserRole;
  name?: string;
  email?: string;
};

// Usuário com perfil
export type UserWithProfile = User & {
  profile: Profile | null;
};

// Reexportar tipos de tabelas e enums
export type Tables = Database['public']['Tables'];
export type Enums = Database['public']['Enums'];

export * from "@/types";
