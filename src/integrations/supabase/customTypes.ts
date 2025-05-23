
import { Database } from "@/integrations/supabase/types";
import { User as AuthUser } from "@supabase/supabase-js";
import { UserRole } from "@/types";

// Tipo auxiliar para extrair 'Row' com segurança
type ExtractRow<T> = T extends { Row: infer R } ? R : never;

// Tabelas disponíveis
type Tables = Database['public']['Tables'];

// Se a tabela 'profiles' existir, extrai o tipo Row, senão usa fallback
export type Profile = 'profiles' extends keyof Tables
  ? ExtractRow<Tables['profiles']>
  : {
      id: string;
      user_id: string;
      name?: string;
      avatar_url?: string;
      created_at?: string;
    };

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
