
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="mx-auto max-w-3xl text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Pronto para Transformar o Agendamento da Sua Barbearia?
          </h2>
          <p className="text-lg text-muted-foreground md:text-xl">
            Junte-se a milhares de barbearias que estão economizando tempo e encantando seus clientes com o AgendAi.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-1">
              Comece seu Teste Grátis
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Agendar uma Demonstração
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Não é necessário cartão de crédito. Teste grátis de 14 dias.
          </p>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
    </section>
  );
};

export default CTA;
