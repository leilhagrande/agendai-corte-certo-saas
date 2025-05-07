
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Gratuito",
    description: "Ideal para barbearias iniciantes",
    features: [
      "Até 30 agendamentos/mês",
      "Sistema de agendamento online",
      "Dashboard básico",
      "Integrações externas",
      "Notificações por email"
    ],
    popular: false,
    buttonText: "Começar Agora"
  },
  {
    name: "Essencial",
    price: "R$29",
    description: "Para barbearias em crescimento",
    features: [
      "Agendamentos ilimitados",
      "CRM de clientes",
      "Notificações por WhatsApp",
      "Histórico de atendimentos",
      "Suporte prioritário"
    ],
    popular: true,
    buttonText: "Iniciar Teste Grátis"
  },
  {
    name: "Pro",
    price: "R$59",
    description: "Para barbearias estabelecidas",
    features: [
      "Tudo do plano Essencial",
      "IA para sugestões automáticas",
      "Automação de marketing",
      "Análise avançada",
      "API para integrações"
    ],
    popular: false,
    buttonText: "Iniciar Teste Grátis"
  },
  {
    name: "Empresarial",
    price: "R$129",
    description: "Para redes de barbearias",
    features: [
      "Tudo do plano Pro",
      "Múltiplas unidades",
      "Controle de equipe",
      "Acesso por filial",
      "Gerente de conta dedicado"
    ],
    popular: false,
    buttonText: "Fale com Vendas"
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Planos Simples e Transparentes
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Escolha o plano perfeito para a sua barbearia. Sem taxas ocultas.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`flex flex-col overflow-hidden rounded-lg border ${
                plan.popular ? "border-primary shadow-lg" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="bg-primary py-1 text-center text-sm font-medium text-white">
                  Mais Popular
                </div>
              )}
              <div className="flex flex-col space-y-6 bg-card p-6">
                <div className="space-y-2">
                  <h3 className="font-bold text-xl">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold">{plan.price}{plan.price !== "Gratuito" && <span className="text-sm font-normal text-muted-foreground">/mês</span>}</div>
                </div>
                <div className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button variant={plan.popular ? "default" : "outline"} className="w-full">
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Todos os planos incluem teste grátis de 14 dias. Sem cartão de crédito.
        </div>
      </div>
    </section>
  );
};

export default Pricing;
