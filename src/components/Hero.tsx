
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, MessageSquare, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-16 md:pt-20 lg:pt-24 hero-pattern">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Agende Compromissos Facilmente com <span className="gradient-text">AgendAI</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Aumente a eficiência do seu negócio com nosso sistema de agendamento com IA. Economize tempo e aumente a satisfação dos clientes.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-1" asChild>
                <Link to="/cadastro">
                  Comece Agora
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/demo">
                  Assista Demo
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-gray-200" />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Junte-se a mais de 10.000 barbearias usando o AgendAI
              </div>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
            <div className="aspect-video overflow-hidden rounded-xl border bg-card p-2 shadow-xl md:p-6">
              <div className="h-full w-full rounded-md bg-gradient-to-br from-primary/20 to-secondary/20 p-6 relative">
                <div className="absolute top-6 right-6 flex space-x-1">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
                <div className="grid gap-6">
                  <div className="h-8 w-32 rounded-md bg-white/20"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center justify-center rounded-lg bg-white/30 p-4">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-center justify-center rounded-lg bg-white/30 p-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-center justify-center rounded-lg bg-white/30 p-4">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="h-24 rounded-md bg-white/20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
