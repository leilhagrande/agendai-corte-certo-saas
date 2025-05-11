
import { Database } from "@/integrations/supabase/types";
import { User as AuthUser } from "@supabase/supabase-js";
import { UserRole } from "@/types";

// Verifica se a estrutura da tabela 'profiles' existe
// Se não existir na estrutura do banco, cria um tipo genérico
export type Profile = Database['public']['Tables'] extends { profiles: infer P }
  ? P['Row']
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
