
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { User, UserRole } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("agendai_user");
    const authenticated = localStorage.getItem("agendai_authenticated");

    if (storedUser && authenticated === "true") {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  // Função de login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulação de login (em produção seria uma chamada API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Buscar usuários simulados do localStorage ou criar uma lista padrão
      const usersStr = localStorage.getItem("agendai_users");
      const users = usersStr ? JSON.parse(usersStr) : [
        { 
          id: "1", 
          name: "Admin", 
          email: "admin@agendai.com", 
          password: "admin123", 
          role: "admin",
          createdAt: new Date()
        },
        { 
          id: "2", 
          name: "Barbeiro Demo", 
          email: "barbeiro@agendai.com", 
          password: "barbeiro123", 
          role: "barber",
          createdAt: new Date()
        },
        { 
          id: "3", 
          name: "Cliente Demo", 
          email: "cliente@agendai.com", 
          password: "cliente123", 
          role: "client",
          createdAt: new Date()
        }
      ];
      
      // Verificar credenciais
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        // Remover senha antes de armazenar no estado
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        
        // Salvar no localStorage
        localStorage.setItem("agendai_user", JSON.stringify(userWithoutPassword));
        localStorage.setItem("agendai_authenticated", "true");
        
        toast.success("Login realizado com sucesso!");
      } else {
        toast.error("Credenciais inválidas!");
      }
    } catch (error) {
      toast.error("Erro ao fazer login. Tente novamente.");
      console.error("Erro no login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função de registro
  const register = async (name: string, email: string, password: string, role: UserRole = "client") => {
    setIsLoading(true);
    
    try {
      // Simulação de registro (em produção seria uma chamada API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Buscar usuários existentes ou criar lista
      const usersStr = localStorage.getItem("agendai_users");
      const users = usersStr ? JSON.parse(usersStr) : [];
      
      // Verificar se e-mail já está em uso
      const existingUser = users.find((u: any) => u.email === email);
      if (existingUser) {
        toast.error("Este e-mail já está em uso!");
        setIsLoading(false);
        return;
      }
      
      // Criar novo usuário
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        role,
        createdAt: new Date()
      };
      
      // Adicionar à lista e salvar
      users.push(newUser);
      localStorage.setItem("agendai_users", JSON.stringify(users));
      
      // Criar assinatura para o plano gratuito se for cliente
      if (role === "client") {
        const subscriptions = JSON.parse(localStorage.getItem("agendai_subscriptions") || "[]");
        const plans = JSON.parse(localStorage.getItem("agendai_plans") || "[]");
        const freePlan = plans.find((p: any) => p.name === "Starter") || {
          id: "plan_starter",
          name: "Starter",
          price: 0,
          description: "Ideal para barbearias iniciantes",
          appointmentLimit: 30,
          features: [
            "Até 30 agendamentos/mês",
            "Sistema de agendamento online",
            "Dashboard básico",
            "Integrações externas",
            "Notificações por email"
          ]
        };
        
        const newSubscription = {
          id: `sub_${Date.now()}`,
          userId: newUser.id,
          planId: freePlan.id,
          planName: freePlan.name,
          startDate: new Date(),
          status: "active",
          appointmentsUsed: 0
        };
        
        subscriptions.push(newSubscription);
        localStorage.setItem("agendai_subscriptions", JSON.stringify(subscriptions));
      }
      
      // Login automático após registro
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      
      localStorage.setItem("agendai_user", JSON.stringify(userWithoutPassword));
      localStorage.setItem("agendai_authenticated", "true");
      
      toast.success("Cadastro realizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao cadastrar. Tente novamente.");
      console.error("Erro no cadastro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("agendai_user");
    localStorage.removeItem("agendai_authenticated");
    toast.success("Logout realizado com sucesso!");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
