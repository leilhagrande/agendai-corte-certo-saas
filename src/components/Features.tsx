
import React from 'react';
import { 
  Calendar,
  Clock,
  Bell,
  MessageSquare,
  User,
  Settings
} from "lucide-react";

const features = [
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Agendamento Inteligente",
    description: "Sistema de agendamento online que permite que clientes escolham serviços, barbeiros e horários conforme disponibilidade."
  },
  {
    icon: <User className="h-6 w-6" />,
    title: "CRM de Clientes",
    description: "Histórico completo de atendimentos, preferências e datas importantes dos seus clientes para um atendimento personalizado."
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Notificações Automáticas",
    description: "Envie lembretes automáticos por WhatsApp e email para reduzir faltas e manter sua agenda sempre completa."
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Avaliações de Clientes",
    description: "Sistema de feedback que destaca avaliações positivas e permite gestão discreta das negativas para melhorar seu serviço."
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Controle da Agenda",
    description: "Painel de administração completo para configurar serviços, barbeiros, horários disponíveis e visualizar agendamentos."
  },
  {
    icon: <Settings className="h-6 w-6" />,
    title: "Dashboard e Relatórios",
    description: "Análise detalhada de agendamentos e faturamento por período para tomar decisões estratégicas para seu negócio."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Funcionalidades Poderosas para sua Barbearia
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Tudo o que você precisa para otimizar seus agendamentos e fazer sua barbearia crescer.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-start space-y-4 rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                {feature.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
