
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { Appointment, Staff, Service, Subscription, Plan } from "../types";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface AppointmentContextType {
  appointments: Appointment[];
  staffList: Staff[];
  services: Service[];
  userSubscription: Subscription | null;
  plans: Plan[];
  loading: boolean;
  createAppointment: (appointment: Omit<Appointment, "id" | "status">) => Promise<boolean>;
  cancelAppointment: (id: string) => Promise<boolean>;
  getUserAppointments: () => Appointment[];
  canScheduleAppointment: () => boolean;
  remainingAppointments: number | null;
  getStaff: () => Staff[];
  getServices: () => Service[];
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [userSubscription, setUserSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  // Inicializa dados demo se não existirem no localStorage
  useEffect(() => {
    // Inicializar planos
    const savedPlans = localStorage.getItem("agendai_plans");
    if (!savedPlans) {
      const defaultPlans: Plan[] = [
        {
          id: "plan_starter",
          name: "Starter",
          price: 0,
          description: "Ideal para barbearias iniciantes",
          appointmentLimit: 30, // limite de 30 agendamentos
          features: [
            "Até 30 agendamentos/mês",
            "Sistema de agendamento online",
            "Dashboard básico",
            "Integrações externas",
            "Notificações por email"
          ]
        },
        {
          id: "plan_essencial",
          name: "Essencial",
          price: 29,
          description: "Para barbearias em crescimento",
          appointmentLimit: null, // ilimitado
          features: [
            "Agendamentos ilimitados",
            "CRM de clientes",
            "Notificações por WhatsApp",
            "Histórico de atendimentos",
            "Suporte prioritário"
          ]
        },
        {
          id: "plan_pro",
          name: "Pro",
          price: 59,
          description: "Para barbearias estabelecidas",
          appointmentLimit: null, // ilimitado
          features: [
            "Tudo do plano Essencial",
            "IA para sugestões automáticas",
            "Automação de marketing",
            "Análise avançada",
            "API para integrações"
          ]
        },
        {
          id: "plan_empresarial",
          name: "Empresarial",
          price: 129,
          description: "Para redes de barbearias",
          appointmentLimit: null, // ilimitado
          features: [
            "Tudo do plano Pro",
            "Múltiplas unidades",
            "Controle de equipe",
            "Acesso por filial",
            "Gerente de conta dedicado"
          ]
        }
      ];
      localStorage.setItem("agendai_plans", JSON.stringify(defaultPlans));
      setPlans(defaultPlans);
    } else {
      setPlans(JSON.parse(savedPlans));
    }

    // Inicializar funcionários demo
    const savedStaff = localStorage.getItem("agendai_staff");
    if (!savedStaff) {
      const defaultStaff: Staff[] = [
        {
          id: "staff1",
          name: "João Silva",
          email: "joao@barbershop.com",
          phone: "(11) 91234-5678",
          barbershopId: "barbershop1",
          position: "Barbeiro Senior",
          available: true
        },
        {
          id: "staff2",
          name: "Carlos Oliveira",
          email: "carlos@barbershop.com",
          phone: "(11) 98765-4321",
          barbershopId: "barbershop1",
          position: "Barbeiro",
          available: true
        },
        {
          id: "staff3",
          name: "André Souza",
          email: "andre@barbershop.com",
          phone: "(11) 99876-5432",
          barbershopId: "barbershop1",
          position: "Barbeiro Junior",
          available: true
        }
      ];
      localStorage.setItem("agendai_staff", JSON.stringify(defaultStaff));
      setStaffList(defaultStaff);
    } else {
      setStaffList(JSON.parse(savedStaff));
    }

    // Inicializar serviços demo
    const savedServices = localStorage.getItem("agendai_services");
    if (!savedServices) {
      const defaultServices: Service[] = [
        {
          id: "service1",
          name: "Corte de Cabelo",
          description: "Corte masculino tradicional",
          price: 35,
          duration: 30,
          barbershopId: "barbershop1"
        },
        {
          id: "service2",
          name: "Barba",
          description: "Modelagem e hidratação de barba",
          price: 25,
          duration: 20,
          barbershopId: "barbershop1"
        },
        {
          id: "service3",
          name: "Combo (Cabelo + Barba)",
          description: "Corte masculino com modelagem de barba",
          price: 55,
          duration: 50,
          barbershopId: "barbershop1"
        },
        {
          id: "service4",
          name: "Degradê",
          description: "Corte masculino com técnica degradê",
          price: 40,
          duration: 40,
          barbershopId: "barbershop1"
        }
      ];
      localStorage.setItem("agendai_services", JSON.stringify(defaultServices));
      setServices(defaultServices);
    } else {
      setServices(JSON.parse(savedServices));
    }

    // Carregar agendamentos
    const savedAppointments = localStorage.getItem("agendai_appointments");
    if (savedAppointments) {
      // Converter strings de data para objetos Date
      const parsedAppointments = JSON.parse(savedAppointments).map((app: any) => ({
        ...app,
        date: new Date(app.date)
      }));
      setAppointments(parsedAppointments);
    }

    setLoading(false);
  }, []);

  // Carregar assinatura do usuário atual quando ele mudar
  useEffect(() => {
    if (user) {
      const subscriptions = JSON.parse(localStorage.getItem("agendai_subscriptions") || "[]");
      const userSub = subscriptions.find((sub: Subscription) => sub.userId === user.id);
      
      if (userSub) {
        setUserSubscription({
          ...userSub,
          startDate: new Date(userSub.startDate),
          endDate: userSub.endDate ? new Date(userSub.endDate) : undefined
        });
      } else if (user.role === "client") {
        // Criar assinatura gratuita padrão para novos clientes
        const freePlan = plans.find(p => p.name === "Starter");
        if (freePlan) {
          const newSubscription = {
            id: `sub_${Date.now()}`,
            userId: user.id,
            planId: freePlan.id,
            planName: freePlan.name as any,
            startDate: new Date(),
            status: "active" as const,
            appointmentsUsed: 0
          };
          
          subscriptions.push(newSubscription);
          localStorage.setItem("agendai_subscriptions", JSON.stringify(subscriptions));
          setUserSubscription(newSubscription);
        }
      }
    } else {
      setUserSubscription(null);
    }
  }, [user, plans]);

  // Verifica e reseta o contador mensal de agendamentos
  useEffect(() => {
    if (!userSubscription) return;

    const today = new Date();
    const startDate = new Date(userSubscription.startDate);
    
    // Se já passou um mês desde o início da assinatura ou desde o último reset
    if (today.getMonth() !== startDate.getMonth() || today.getFullYear() !== startDate.getFullYear()) {
      const subscriptions = JSON.parse(localStorage.getItem("agendai_subscriptions") || "[]");
      const updatedSubscriptions = subscriptions.map((sub: any) => {
        if (sub.id === userSubscription.id) {
          return {...sub, appointmentsUsed: 0};
        }
        return sub;
      });
      
      localStorage.setItem("agendai_subscriptions", JSON.stringify(updatedSubscriptions));
      
      // Atualiza o estado local também
      setUserSubscription({...userSubscription, appointmentsUsed: 0});
    }
  }, [userSubscription]);

  // Obter agendamentos do usuário atual
  const getUserAppointments = () => {
    if (!user) return [];
    
    // Para clientes, filtrar por clientId
    if (user.role === "client") {
      return appointments.filter(app => app.clientId === user.id);
    }
    
    // Para barbeiros, filtrar por staffId (implementar depois)
    // Para admins, retornar todos
    return appointments;
  };

  // Verificar se o usuário pode agendar mais serviços (baseado no limite do plano)
  const canScheduleAppointment = () => {
    if (!user || user.role !== "client" || !userSubscription) return false;
    
    const plan = plans.find(p => p.id === userSubscription.planId);
    if (!plan) return false;
    
    // Se o plano é ilimitado
    if (plan.appointmentLimit === null) return true;
    
    // Verificar limite mensal
    return userSubscription.appointmentsUsed < plan.appointmentLimit;
  };

  // Calcular agendamentos restantes
  const calculateRemainingAppointments = (): number | null => {
    if (!user || user.role !== "client" || !userSubscription) return null;
    
    const plan = plans.find(p => p.id === userSubscription.planId);
    if (!plan || plan.appointmentLimit === null) return null;
    
    return plan.appointmentLimit - userSubscription.appointmentsUsed;
  };

  // Criar novo agendamento
  const createAppointment = async (appointment: Omit<Appointment, "id" | "status">) => {
    if (!user) {
      toast.error("Você precisa estar logado para agendar");
      return false;
    }
    
    if (user.role === "client" && !canScheduleAppointment()) {
      toast.error("Você atingiu o limite de agendamentos do seu plano");
      return false;
    }
    
    try {
      setLoading(true);
      
      // Criar novo agendamento
      const newAppointment: Appointment = {
        ...appointment,
        id: `app_${Date.now()}`,
        status: "scheduled"
      };
      
      // Salvar no localStorage
      const updatedAppointments = [...appointments, newAppointment];
      localStorage.setItem("agendai_appointments", JSON.stringify(updatedAppointments));
      setAppointments(updatedAppointments);
      
      // Atualizar contagem de agendamentos usados para planos com limite
      if (user.role === "client" && userSubscription) {
        const subscriptions = JSON.parse(localStorage.getItem("agendai_subscriptions") || "[]");
        const updatedSubscriptions = subscriptions.map((sub: any) => {
          if (sub.id === userSubscription.id) {
            return {...sub, appointmentsUsed: sub.appointmentsUsed + 1};
          }
          return sub;
        });
        
        localStorage.setItem("agendai_subscriptions", JSON.stringify(updatedSubscriptions));
        
        // Atualiza o estado local também
        setUserSubscription({...userSubscription, appointmentsUsed: userSubscription.appointmentsUsed + 1});
      }
      
      toast.success("Agendamento criado com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      toast.error("Erro ao criar agendamento. Tente novamente.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Cancelar agendamento
  const cancelAppointment = async (id: string) => {
    try {
      setLoading(true);
      
      // Atualizar status do agendamento para cancelado
      const updatedAppointments = appointments.map(app => 
        app.id === id ? {...app, status: "cancelled"} : app
      );
      
      localStorage.setItem("agendai_appointments", JSON.stringify(updatedAppointments));
      setAppointments(updatedAppointments);
      
      toast.success("Agendamento cancelado com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao cancelar agendamento:", error);
      toast.error("Erro ao cancelar agendamento. Tente novamente.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Obter lista de funcionários
  const getStaff = () => staffList;

  // Obter lista de serviços
  const getServices = () => services;

  return (
    <AppointmentContext.Provider value={{
      appointments,
      staffList,
      services,
      userSubscription,
      plans,
      loading,
      createAppointment,
      cancelAppointment,
      getUserAppointments,
      canScheduleAppointment,
      remainingAppointments: calculateRemainingAppointments(),
      getStaff,
      getServices
    }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error("useAppointment deve ser usado dentro de um AppointmentProvider");
  }
  return context;
};
